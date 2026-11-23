# Operations

## Health and readiness

GET /api/health reports the application version and configured dependency state. Deployment health checks should require the application process and database migration level; do not treat optional AI availability as core readiness.

## Database

Run pnpm db:migrate as a controlled pre-deployment step and pnpm db:seed only in reference environments. Use point-in-time recovery, encrypted backups, connection pooling, and tested restore procedures. The central table is alert_rule.

## Background work

Queue consumers must use idempotency keys, bounded retries, dead-letter handling, and trace correlation. A web request should record intent before asynchronous execution.

## Observability

Collect structured authentication, authorisation, workflow, queue, database, and assistant events without logging tokens, prompts containing sensitive records, or secrets. Alert on denied-action spikes, migration failure, queue age, database saturation, and audit-write failure.

## Managed runtime

AWS App Runner and Azure App Service are the supported application runtimes. Managed PostgreSQL, Redis, queue, secrets, and object storage reduce maintenance. Static web hosting is unsupported because Watchtower performs server-side authentication, RBAC, transactional writes, and controlled retrieval.
