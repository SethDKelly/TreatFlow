import type { Measure, MeasureUnit, TimeExtent } from "./types";

export function isValidQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity >= 0 && Number.isFinite(quantity);
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

/**
 * Coarse overlap heuristic for synthetic labels used in fixtures/tests.
 * Does not invent calendar precision beyond the declared fixture windows.
 */
export function intervalsOverlap(
  a: TimeExtent,
  b: TimeExtent,
): boolean {
  if (a.kind !== "interval" || b.kind !== "interval") {
    return false;
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
    return false;
  }
  return aStart < bEnd && bStart < aEnd;
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
