import type { ProductConfig } from "./types";

export const product: ProductConfig = {
  id: "watchtower",
  name: "Watchtower",
  category: "Platform & Ops",
  tagline: "Metrics, logs and traces on OpenTelemetry, in your account.",
  description: "An observability platform for OpenTelemetry ingestion, service views, dashboards, alerting, and service-level objectives.",
  repositoryUrl: "https://github.com/ConseilTek-Tektons/watchtower",
  nav: [
  {
    "label": "Services",
    "badge": "4"
  },
  {
    "label": "Metrics"
  },
  {
    "label": "Logs"
  },
  {
    "label": "Traces"
  },
  {
    "label": "SLOs"
  }
],
  demoUsers: [
    { id: "demo-admin", name: "Morgan Lee", email: "morgan@northstar.example", role: "admin", label: "Workspace administrator" },
    { id: "demo-manager", name: "Avery Brooks", email: "avery@northstar.example", role: "observability_admin", label: "Observability administrator" },
    { id: "demo-operator", name: "Jordan Patel", email: "jordan@northstar.example", role: "responder", label: "Service responder" },
  ],
  ai: {
    name: "Watchtower knowledge guide",
    description: "Ask grounded questions about opentelemetry-native ingest, correlated metrics, logs, and traces, dashboards and saved queries, or operating policy.",
    systemPrompt: "You are Watchtower's grounded knowledge guide. Answer only from authorised workspace context and approved knowledge. Cite the supporting record or policy. Never mutate data, approve a workflow, or make a regulated decision.",
    suggestedQuestions: ["Explain telemetry cardinality controls.","Explain service-level objectives.","Explain alert evaluation."],
  },
};
