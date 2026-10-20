import { describe, expect, it } from "vitest";
import {
  intervalOverlapRelation,
  intervalsOverlap,
  isValidQuantity,
  parseFixtureClock,
  parseQuantityInput,
  validateMeasure,
  validateTimeExtent,
} from "../../src/domain";

describe("L02 validation primitives", () => {
  it("rejects invalid quantities without inventing precision", () => {
    expect(isValidQuantity(0)).toBe(true);
    expect(isValidQuantity(4)).toBe(true);
    expect(isValidQuantity(-1)).toBe(false);
    expect(isValidQuantity(1.5)).toBe(false);
    expect(
      validateMeasure({
        unit: "people",
        quantity: -3,
        uncertainty: "none",
      }),
    ).toMatch(/nonnegative/i);
  });

  it("rejects blank quantity input while accepting an explicit zero", () => {
    expect(parseQuantityInput("").ok).toBe(false);
    expect(parseQuantityInput("   ").ok).toBe(false);
    expect(parseQuantityInput("0")).toEqual({ ok: true, quantity: 0 });
    expect(parseQuantityInput("4")).toEqual({ ok: true, quantity: 4 });
  });

  it("requires declared time labels for near-present and interval extents", () => {
    expect(
      validateTimeExtent({
        kind: "near_present",
        assertedLabel: "NOW",
        precision: "approximate",
      }),
    ).toBeNull();
    expect(
      validateTimeExtent({
        kind: "interval",
        startLabel: "",
        endLabel: "10 PM",
        precision: "approximate",
      }),
    ).toMatch(/start and end/i);
  });

  it("parses fixture clock labels used by overlap checks", () => {
    expect(parseFixtureClock("18:00")).toBe(18 * 60);
    expect(parseFixtureClock("6 PM")).toBe(18 * 60);
    expect(parseFixtureClock("6:30 PM")).toBe(18 * 60 + 30);
    expect(parseFixtureClock("not-a-time")).toBeNull();
  });

  it("treats unparseable identical extents as overlap, not proven disjoint", () => {
    const evening = {
      kind: "interval" as const,
      startLabel: "evening",
      endLabel: "later",
      precision: "approximate" as const,
    };
    expect(intervalOverlapRelation(evening, evening)).toBe("overlap");
    expect(intervalsOverlap(evening, evening)).toBe(true);

    const other = {
      ...evening,
      startLabel: "night",
      endLabel: "dawn",
    };
    expect(intervalOverlapRelation(evening, other)).toBe("unknown");
    expect(intervalsOverlap(evening, other)).toBe(true);
  });
});
