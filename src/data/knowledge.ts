export const knowledgeArticles = [
  {
    "id": "cardinality",
    "title": "Telemetry cardinality controls",
    "summary": "Attribute allowlists, budgets, and drop rules are applied before high-cardinality data reaches long-term storage.",
    "content": "Rejected series are counted and visible so cost controls do not silently hide telemetry.",
    "tags": [
      "telemetry",
      "cardinality",
      "attribute"
    ]
  },
  {
    "id": "slo",
    "title": "Service-level objectives",
    "summary": "SLOs define indicator, objective, window, exclusions, and owner as versioned configuration.",
    "content": "Error budget is recomputed from source telemetry and historical definitions remain reproducible.",
    "tags": [
      "slo",
      "error",
      "budget"
    ]
  },
  {
    "id": "alerting",
    "title": "Alert evaluation",
    "summary": "Rules specify query, threshold, sustain window, missing-data behavior, and route.",
    "content": "Suppressions are bounded and audited; AI summaries cannot acknowledge or close alerts.",
    "tags": [
      "alert",
      "threshold",
      "suppression"
    ]
  }
];
