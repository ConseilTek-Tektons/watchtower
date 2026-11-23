export const rbacConfig = {
  roles: {
    owner: { label: "Owner", description: "Full control of security, policy, and workspace data." },
    admin: { label: "Admin", description: "Manages configuration, integrations, identities, and access." },
    observability_admin: { label: "Observability administrator", description: "Owns opentelemetry-native ingest and correlated metrics, logs, and traces." },
    responder: { label: "Service responder", description: "Operates authorised alert workflows and records." },
    viewer: { label: "Viewer", description: "Reads permitted operational data." },
    auditor: { label: "Auditor", description: "Reads immutable history, controls, and evidence." },
  },
  permissions: {
    "dashboard.view": "View operational dashboard",
    "alert.manage": "Create and update alert records",
    "workflow.approve": "Approve controlled workflow transitions",
    "reports.view": "View operational reports",
    "sensitive.export": "Export sensitive workspace data",
    "assistant.ask": "Ask the Watchtower knowledge guide",
    "audit.view": "Read audit history",
    "access.manage": "Configure roles and identity mappings",
    "settings.manage": "Manage workspace settings and integrations",
  },
  rolePermissions: {
    owner: ["*"], admin: ["*"],
    observability_admin: ["dashboard.view", "alert.manage", "workflow.approve", "reports.view", "assistant.ask", "audit.view"],
    responder: ["dashboard.view", "alert.manage", "reports.view", "assistant.ask"],
    viewer: ["dashboard.view", "reports.view"], auditor: ["dashboard.view", "reports.view", "audit.view"],
  } as Record<string, readonly string[]>,
  identityGroupMappings: {
    "watchtower-owners": "owner", "watchtower-admins": "admin",
    "watchtower-managers": "observability_admin", "watchtower-operators": "responder",
    "watchtower-viewers": "viewer", "internal-audit": "auditor",
  } as Record<string, string>,
  defaultRole: "viewer",
};
