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

/** Minutes in a calendar day — used to unwrap overnight clock intervals. */
const DAY_MINUTES = 24 * 60;

/**
 * Interval overlap for synthetic fixture labels.
 * Unparseable clocks are **unknown**, never proven disjoint — identical or
 * undecidable contradictory extents must not bypass contested/zero checks.
 * Overnight windows (end ≤ start, e.g. 23:50–00:10) unwrap across midnight
 * instead of being treated as empty/disjoint.
 */
export function intervalOverlapRelation(
  a: TimeExtent,
  b: TimeExtent,
): OverlapRelation {
  const resolved = resolveIntervalBounds(a, b);
  if (resolved === "unknown") return "unknown";
  if (resolved === "kind_mismatch") return "unknown";
  const { aStart, aEnd, bStart, bEnd } = resolved;
  return clockIntervalsOverlap(aStart, aEnd, bStart, bEnd)
    ? "overlap"
    : "disjoint";
}

/** True when overlap is proven or undecidable (conservative for conflict checks). */
export function intervalsOverlap(a: TimeExtent, b: TimeExtent): boolean {
  const relation = intervalOverlapRelation(a, b);
  return relation === "overlap" || relation === "unknown";
}

/**
 * Semantic equality of extents: identical labels, or equivalent parseable clocks
 * (e.g. 18:00–18:20 equals 6 PM–6:20 PM).
 */
export function extentsSemanticallyEqual(a: TimeExtent, b: TimeExtent): boolean {
  if (a.kind === "near_present" && b.kind === "near_present") {
    if (a.assertedLabel.trim() === b.assertedLabel.trim()) return true;
    const aClock = parseFixtureClock(a.assertedLabel);
    const bClock = parseFixtureClock(b.assertedLabel);
    return aClock !== null && bClock !== null && aClock === bClock;
  }
  if (a.kind !== "interval" || b.kind !== "interval") return false;
  if (
    a.startLabel.trim() === b.startLabel.trim() &&
    a.endLabel.trim() === b.endLabel.trim()
  ) {
    return true;
  }
  const resolved = resolveIntervalBounds(a, b);
  if (resolved === "unknown" || resolved === "kind_mismatch") return false;
  const aEnd = normalizeOvernightEnd(resolved.aStart, resolved.aEnd);
  const bEnd = normalizeOvernightEnd(resolved.bStart, resolved.bEnd);
  return resolved.aStart === resolved.bStart && aEnd === bEnd;
}

/**
 * Whether activity extent A conflicts with zero/coverage extent Z.
 * Contained, equal, overlapping, or undecidable temporal relations conflict;
 * proven disjoint does not.
 */
export function activityConflictsWithExtent(
  activity: TimeExtent,
  zeroExtent: TimeExtent,
): boolean {
  if (extentsSemanticallyEqual(activity, zeroExtent)) return true;
  const relation = intervalOverlapRelation(activity, zeroExtent);
  return relation === "overlap" || relation === "unknown";
}

type ResolvedBounds =
  | {
      aStart: number;
      aEnd: number;
      bStart: number;
      bEnd: number;
    }
  | "unknown"
  | "kind_mismatch";

/**
 * When end is at or before start in minute-of-day, the interval crosses midnight
 * (or is empty). Unwrap the end into the next day so geometry stays non-empty.
 */
export function normalizeOvernightEnd(start: number, end: number): number {
  return end <= start ? end + DAY_MINUTES : end;
}

function linearOverlap(
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number,
): boolean {
  return aStart < bEnd && bStart < aEnd;
}

/** Overlap on a 24h clock, including overnight unwrap and one-day shifts. */
export function clockIntervalsOverlap(
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number,
): boolean {
  const ae = normalizeOvernightEnd(aStart, aEnd);
  const be = normalizeOvernightEnd(bStart, bEnd);
  return (
    linearOverlap(aStart, ae, bStart, be) ||
    linearOverlap(aStart, ae, bStart + DAY_MINUTES, be + DAY_MINUTES) ||
    linearOverlap(aStart + DAY_MINUTES, ae + DAY_MINUTES, bStart, be)
  );
}

function resolveIntervalBounds(a: TimeExtent, b: TimeExtent): ResolvedBounds {
  if (a.kind !== "interval" || b.kind !== "interval") {
    return "kind_mismatch";
  }
  if (
    a.startLabel.trim() === b.startLabel.trim() &&
    a.endLabel.trim() === b.endLabel.trim()
  ) {
    const start = parseFixtureClock(a.startLabel);
    const end = parseFixtureClock(a.endLabel);
    if (start !== null && end !== null) {
      return { aStart: start, aEnd: end, bStart: start, bEnd: end };
    }
    // Identical unparseable labels: treat as overlapping equal windows.
    return { aStart: 0, aEnd: 1, bStart: 0, bEnd: 1 };
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
  return { aStart, aEnd, bStart, bEnd };
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
