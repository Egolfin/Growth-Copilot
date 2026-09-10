import { describe, expect, it } from "vitest";
import { classifyObjection } from "@/lib/objection-engine";

describe("objection engine", () => {
  it("identifies profitability", () => expect(classifyObjection("I am not making profit after fees").id).toBe("PROFITABILITY"));
  it("routes previous ad failure to diagnosis", () => expect(classifyObjection("I tried sponsored and did not see results").nextAction).toContain("Diagnose"));
  it("identifies capacity", () => expect(classifyObjection("We can't handle more orders").id).toBe("CAPACITY"));
});
