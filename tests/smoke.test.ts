import { describe, expect, it } from "vitest";
import { createStore, establish } from "../src/domain";

describe("L01 local substrate", () => {
  it("boots a pure in-memory Observation store without network or persistence", () => {
    const store = createStore();
    const result = establish(store, "syn-principal-smoke");
    expect(result.outcome).toBe("confirmed_effected");
    if (result.outcome === "confirmed_effected") {
      expect(result.value.status).toBe("open");
      expect(result.value.evidence).toEqual([]);
      expect(result.value.coverage).toEqual([]);
    }
  });
});
