import { describe, expect, it } from "vitest";
import { knowledgeArticles } from "../data/knowledge";
import { buildLocalAnswer, retrieveLocalKnowledge } from "./assistant";

describe("Watchtower local knowledge retrieval", () => {
  it("prioritises the relevant operating article", () => {
    const [match] = retrieveLocalKnowledge("Explain telemetry operating policy", knowledgeArticles);
    expect(match?.id).toBe("cardinality");
  });
  it("does not invent an unsupported answer", () => {
    const result = buildLocalAnswer("How do I configure an unrelated orbital engine?", knowledgeArticles);
    expect(result.citations).toHaveLength(0);
    expect(result.answer).toContain("could not find");
  });
});
