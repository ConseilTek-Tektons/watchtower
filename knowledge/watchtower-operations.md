# Watchtower operations knowledge

## Telemetry cardinality controls

Attribute allowlists, budgets, and drop rules are applied before high-cardinality data reaches long-term storage.

Rejected series are counted and visible so cost controls do not silently hide telemetry.

## Service-level objectives

SLOs define indicator, objective, window, exclusions, and owner as versioned configuration.

Error budget is recomputed from source telemetry and historical definitions remain reproducible.

## Alert evaluation

Rules specify query, threshold, sustain window, missing-data behavior, and route.

Suppressions are bounded and audited; AI summaries cannot acknowledge or close alerts.

## Product boundary

Watchtower does not provide a proprietary cross-customer anomaly corpus. Storage cost and query performance depend directly on retention, sampling, and cardinality discipline.
