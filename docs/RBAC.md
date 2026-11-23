# Role-based access control

Watchtower enforces permissions in server routes and persists optional organisation-specific policy in PostgreSQL. Hiding a control in the browser is never the authorisation boundary.

## Built-in roles

| Role | Purpose |
| --- | --- |
| Owner | Full security, policy, identity, and workspace control |
| Admin | Configuration, integrations, access, and operations |
| Observability administrator | Governed management of alert workflows, approvals, reports, and audit |
| Service responder | Day-to-day alert operation without access-policy administration |
| Viewer | Read-only operational visibility |
| Auditor | Reports and immutable audit history |

Permissions include dashboard.view, alert.manage, workflow.approve, reports.view, sensitive.export, assistant.ask, audit.view, access.manage, and settings.manage.

OIDC group mappings live in src/config/rbac.ts. Administrators with access.manage can configure role permissions in the access workspace; the owner wildcard cannot be removed. Every policy update is audited.
