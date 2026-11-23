# Grounded AI in Watchtower

Watchtower includes question answering, not an autonomous agent layer. The assistant can explain approved operating knowledge and permission-filtered workspace context. It cannot create records, change status, approve work, invoke connectors, or make regulated decisions.

## Modes

- **Local knowledge:** deterministic retrieval over the articles in src/data/knowledge.ts; works without an external model.
- **OpenAI context mode:** sends the authorised local context to the configured model with storage disabled.
- **OpenAI RAG mode:** adds a configured vector store and returns citations from file search.

Requests require assistant.ask, are rate limited, and receive only context the caller is allowed to read. Add operating material under knowledge/, review it as code, then run pnpm knowledge:ingest for a configured vector store.

The assistant must never calculate or authorise a material outcome. Watchtower does not provide a proprietary cross-customer anomaly corpus. Storage cost and query performance depend directly on retention, sampling, and cardinality discipline.
