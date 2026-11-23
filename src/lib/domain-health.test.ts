import { describe, expect, it } from "vitest";
import { assessDomainHealth } from "./domain-health";

describe("Watchtower domain health", () => {
  it("keeps controlled work healthy", () => expect(assessDomainHealth(0, 0, 96)).toEqual({ risk: 0, level: "healthy" }));
  it("escalates combined exception pressure", () => expect(assessDomainHealth(8, 3, 72).level).toBe("critical"));
});
