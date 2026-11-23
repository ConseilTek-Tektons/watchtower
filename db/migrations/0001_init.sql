create extension if not exists pgcrypto;

create table organisation (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table app_user (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references organisation(id) on delete cascade,
  identity_subject text not null,
  email text not null,
  display_name text not null,
  active boolean not null default true,
  unique (organisation_id, identity_subject),
  unique (organisation_id, email)
);

create table alert_rule (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references organisation(id) on delete cascade,
  reference text not null,
  title text not null,
  owner text,
  status text not null default 'draft' check (status in ('draft','pending','active','approved','completed','cancelled')),
  risk_score integer not null default 0 check (risk_score between 0 and 100),
  due_at timestamptz,
  attributes jsonb not null default '{}'::jsonb,
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organisation_id, reference)
);

create index alert_rule_search_idx on alert_rule using gin (to_tsvector('english', reference || ' ' || title));
create index alert_rule_status_idx on alert_rule (organisation_id, status, updated_at desc);

create table workflow_event (
  id bigint generated always as identity primary key,
  organisation_id uuid not null references organisation(id) on delete cascade,
  record_id uuid not null references alert_rule(id) on delete cascade,
  event_type text not null,
  actor_id text not null,
  from_status text,
  to_status text,
  evidence jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table record_attachment (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references organisation(id) on delete cascade,
  record_id uuid not null references alert_rule(id) on delete cascade,
  object_key text not null,
  sha256 text not null check (sha256 ~ '^[0-9a-f]{64}$'),
  classification text not null default 'internal',
  created_at timestamptz not null default now(),
  unique (organisation_id, object_key)
);

create table audit_event (
  id bigint generated always as identity primary key,
  organisation_id uuid not null references organisation(id) on delete cascade,
  actor_id text not null,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  payload jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table role_policy (
  organisation_id uuid not null references organisation(id) on delete cascade,
  role_key text not null,
  permissions text[] not null default '{}',
  updated_by text not null,
  updated_at timestamptz not null default now(),
  primary key (organisation_id, role_key)
);
