import type { DashboardConfig } from "./dashboard-schema";
export type { DashboardItem } from "./dashboard-schema";

export const dashboard: DashboardConfig = {
  eyebrow: "PLATFORM & OPS · OPERATIONS",
  heading: "Watchtower keeps the operating record visible, governed, and ready for action.",
  summary: "OpenTelemetry-native ingest, Correlated metrics, logs, and traces, Dashboards and saved queries are backed by PostgreSQL records and explicit workflow history.",
  primaryAction: "Create alert", secondaryAction: "Open workspace",
  secondaryNotice: "Workspace opened with current identity, role, and record filters.",
  managePermission: "alert.manage", metricLabel: "Watchtower operating health",
  metrics: [{"label":"Telemetry ingest","value":"18.6 TB","change":"30 days","context":"current workspace","tone":"positive","progress":"82%"},{"label":"Services","value":"428","change":"96% owned","context":"operational window","tone":"positive","progress":"76%"},{"label":"SLO compliance","value":"97.8%","change":"84 objectives","context":"current workspace","tone":"warning","progress":"91%"},{"label":"Alert noise","value":"6.2%","change":"↓ 18%","context":"operational window","tone":"positive","progress":"96%"}],
  trend: [46,52,49,64,71,78,86].map((value, index) => ({ label: String(index), value })),
  listTitle: "Active alert rules", workspaceAction: "Open governed workspace",
  items: [{"id":1,"primary":"WAT-842 · Checkout latency burn","secondary":"OpenTelemetry-native ingest","tertiary":"Updated today","status":"Healthy","accent":"violet"},{"id":2,"primary":"WAT-831 · API error-rate regression","secondary":"Correlated metrics, logs, and traces","tertiary":"Evidence current","status":"Warning","accent":"lime"},{"id":3,"primary":"WAT-820 · Queue backlog saturation","secondary":"Dashboards and saved queries","tertiary":"Updated today","status":"Firing","accent":"cyan"},{"id":4,"primary":"WAT-809 · Database connection exhaustion","secondary":"Alert routing and suppression","tertiary":"Evidence current","status":"Suppressed","accent":"lime"}],
  sideTitle: "Control posture", sideSubtitle: "Derived from workflow and evidence",
  sideItems: [
    { title: "OpenTelemetry-native ingest", detail: "Policy and evidence current", value: "Healthy" },
    { title: "Correlated metrics, logs, and traces", detail: "A small review queue needs attention", value: "Review", warning: true },
    { title: "Dashboards and saved queries", detail: "Within the configured operating target", value: "On track" },
  ],
  insightTitle: "Correlated metrics, logs, and traces has the clearest next action.",
  insightBody: "The recommendation is grounded in current alert records, workflow events, and approved operating policy. It remains advisory until an authorised user acts.",
  insightNotice: "Recommendation opened with its supporting records and policy citations.",
  itemNoun: "Alert rule", modalEyebrow: "NEW ALERT RULE", modalTitle: "Add alert rule",
  formFields: [
    { name: "title", label: "Alert rule title", placeholder: "Checkout latency burn" },
    { name: "owner", label: "Owner", placeholder: "Service responder" },
    { name: "reference", label: "Reference", placeholder: "WAT-843" },
  ],
  defaultSecondary: "OpenTelemetry-native ingest", defaultTertiary: "Created now", newItemStatus: "Draft",
  policyPreview: "The alert inherits workspace visibility, requires alert.manage, and records its creator and changes in the audit trail.",
  submitLabel: "Create alert",
};
