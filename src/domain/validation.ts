import type { Measure, MeasureUnit, TimeExtent } from "./types";

export function isValidQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity >= 0 && Number.isFinite(quantity);
}

/**
 * Distinguishes omitted UI input from an explicit zero.
 * Blank/whitespace is not a quantity; domain validation never sees fabricated 0.
 */
export function parseQuantityInput(raw: string):
  | { ok: true; quantity: number }
  | { ok: false; reason: string } {
  if (raw.trim() === "") {
    return {
      ok: false,
      reason: "Quantity is required; blank input is not an explicit zero count.",
    };
  }
  const quantity = Number(raw.trim());
  if (!isValidQuantity(quantity)) {
    return {
      ok: false,
      reason: "Quantity must be a nonnegative integer; precision is not invented.",
    };
  }
  return { ok: true, quantity };
}

export function isValidUnit(unit: string): unit is MeasureUnit {
  return unit === "people" || unit === "groups";
}

export function validateMeasure(measure: Measure): string | null {
  if (!isValidUnit(measure.unit)) {
    return "Measure unit must be an explicit declared unit (people or groups).";
  }
  if (!isValidQuantity(measure.quantity)) {
    return "Quantity must be a nonnegative integer; precision is not invented.";
  }
  return null;
}

export function validateTimeExtent(extent: TimeExtent): string | null {
  if (extent.kind === "near_present") {
    if (!extent.assertedLabel.trim()) {
      return "Near-present reports need an asserted time label.";
    }
    return null;
  }
  if (!extent.startLabel.trim() || !extent.endLabel.trim()) {
    return "Interval totals need asserted start and end labels.";
  }
  return null;
}

export type OverlapRelation = "overlap" | "disjoint" | "unknown";

/**
 * Interval overlap for synthetic fixture labels.
 * Unparseable clocks are **unknown**, never proven disjoint — identical or
 * undecidable contradictory extents must not bypass contested/zero checks.
 */
export function intervalOverlapRelation(
  a: TimeExtent,
  b: TimeExtent,
): OverlapRelation {
  if (a.kind !== "interval" || b.kind !== "interval") {
    return "unknown";
  }
  if (
    a.startLabel.trim() === b.startLabel.trim() &&
    a.endLabel.trim() === b.endLabel.trim()
  ) {
    return "overlap";
  }
  const aStart = parseFixtureClock(a.startLabel);
  const aEnd = parseFixtureClock(a.endLabel);
  const bStart = parseFixtureClock(b.startLabel);
  const bEnd = parseFixtureClock(b.endLabel);
  if (
    aStart === null ||
    aEnd === null ||
    bStart === null ||
    bEnd === null
  ) {
    return "unknown";
  }
  return aStart < bEnd && bStart < aEnd ? "overlap" : "disjoint";
}

/** True when overlap is proven or undecidable (conservative for conflict checks). */
export function intervalsOverlap(a: TimeExtent, b: TimeExtent): boolean {
  const relation = intervalOverlapRelation(a, b);
  return relation === "overlap" || relation === "unknown";
}

/** Accepts fixture labels like "18:00", "6 PM", "6:30 PM". */
export function parseFixtureClock(label: string): number | null {
  const trimmed = label.trim();
  const twentyFour = /^(\d{1,2}):(\d{2})$/.exec(trimmed);
  if (twentyFour) {
    const hours = Number(twentyFour[1]);
    const minutes = Number(twentyFour[2]);
    if (hours > 23 || minutes > 59) return null;
    return hours * 60 + minutes;
  }
  const twelve = /^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i.exec(trimmed);
  if (!twelve) return null;
  let hours = Number(twelve[1]);
  const minutes = twelve[2] ? Number(twelve[2]) : 0;
  const meridiem = twelve[3].toUpperCase();
  if (hours < 1 || hours > 12 || minutes > 59) return null;
  if (meridiem === "AM") {
    if (hours === 12) hours = 0;
  } else if (hours !== 12) {
    hours += 12;
  }
  return hours * 60 + minutes;
}
