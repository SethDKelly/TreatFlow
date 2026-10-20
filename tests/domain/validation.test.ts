import { describe, expect, it } from "vitest";
import {
  isValidQuantity,
  parseFixtureClock,
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
});
