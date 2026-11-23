import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/auth";
import { database } from "@/lib/db";
import { hasEffectivePermission } from "@/lib/rbac-server";

export const runtime = "nodejs";
const organisationId = process.env.WORKSPACE_ID ?? "00000000-0000-4000-8000-000000000001";
const recordSchema = z.object({
  reference: z.string().trim().regex(/^WAT-[0-9]{3,8}$/),
  title: z.string().trim().min(3).max(240),
  owner: z.string().trim().max(160).nullable().default(null),
  status: z.enum(["draft", "pending", "active", "approved", "completed", "cancelled"]).default("draft"),
  dueAt: z.string().datetime().nullable().default(null),
  attributes: z.record(z.string(), z.json()).default({}),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  if (!await hasEffectivePermission(session.user.roles, "dashboard.view")) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  if (!process.env.DATABASE_URL && !process.env.PGHOST) return NextResponse.json({ data: [], mode: "demo-ui" });
  const rows = await database()`select id, reference, title, owner, status, risk_score, due_at, attributes, updated_at
    from alert_rule
    where organisation_id = ${organisationId}
    order by updated_at desc
    limit 100`;
  return NextResponse.json({ data: rows, mode: "postgres" });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  if (!await hasEffectivePermission(session.user.roles, "alert.manage")) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  if (!process.env.DATABASE_URL && !process.env.PGHOST) return NextResponse.json({ error: "PostgreSQL is required." }, { status: 503 });
  const parsed = recordSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid alert.", details: parsed.error.flatten() }, { status: 400 });
  const sql = database();
  const [record] = await sql.begin(async (transaction) => {
    const [created] = await transaction`insert into alert_rule (organisation_id, reference, title, owner, status, due_at, attributes, created_by)
      values (${organisationId}, ${parsed.data.reference}, ${parsed.data.title}, ${parsed.data.owner}, ${parsed.data.status}, ${parsed.data.dueAt}, ${transaction.json(parsed.data.attributes)}, ${session.user.id})
      returning *`;
    await transaction`insert into workflow_event (organisation_id, record_id, event_type, actor_id, to_status, evidence)
      values (${organisationId}, ${created.id}, 'record.created', ${session.user.id}, ${created.status}, ${transaction.json({ reference: created.reference })})`;
    await transaction`insert into audit_event (organisation_id, actor_id, action, entity_type, entity_id)
      values (${organisationId}, ${session.user.id}, 'alert.created', 'alert_rule', ${created.id})`;
    return [created];
  });
  return NextResponse.json({ data: record }, { status: 201 });
}
