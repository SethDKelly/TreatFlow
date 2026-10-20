import type { CoverageInput, ReportInput, TimeExtent } from "./types";

/**
 * Deterministic synthetic fixtures (014-B L02).
 * Identifiers are synthetic namespaces — not real household metadata.
 */

export const SYNTHETIC_PRINCIPAL_A = "syn-principal-a";
export const SYNTHETIC_PRINCIPAL_B = "syn-principal-b";

export const nearPresentPeopleFour: ReportInput = {
  attemptId: "attempt-et02",
  provenance: "contemporaneous",
  measure: { unit: "people", quantity: 4, uncertainty: "low" },
  timeExtent: {
    kind: "near_present",
    assertedLabel: "NOW",
    precision: "approximate",
  },
};

export const intervalPeopleEightyThree: ReportInput = {
  attemptId: "attempt-et03",
  provenance: "recalled",
  measure: { unit: "people", quantity: 83, uncertainty: "high" },
  timeExtent: {
    kind: "interval",
    startLabel: "6 PM",
    endLabel: "10 PM",
    precision: "approximate",
  },
};

export const groupEncounterFive: ReportInput = {
  attemptId: "attempt-et04-groups",
  provenance: "contemporaneous",
  measure: { unit: "groups", quantity: 1, uncertainty: "none" },
  timeExtent: {
    kind: "near_present",
    assertedLabel: "approx 18:07",
    precision: "approximate",
  },
};

export const peopleInSameGroupEncounter: ReportInput = {
  attemptId: "attempt-et04-people",
  provenance: "contemporaneous",
  measure: { unit: "people", quantity: 5, uncertainty: "none" },
  timeExtent: {
    kind: "near_present",
    assertedLabel: "approx 18:07",
    precision: "approximate",
  },
};

export const explicitZeroWithoutCoverage: ReportInput = {
  attemptId: "attempt-et06",
  provenance: "contemporaneous",
  measure: { unit: "groups", quantity: 0, uncertainty: "none" },
  timeExtent: {
    kind: "interval",
    startLabel: "18:00",
    endLabel: "18:20",
    precision: "bounded",
  },
};

export const observedCompleteZeroCoverage: CoverageInput = {
  attemptId: "attempt-et07-cov",
  status: "observed",
  completeness: "complete_claimed",
  unit: "groups",
  timeExtent: {
    kind: "interval",
    startLabel: "18:00",
    endLabel: "18:20",
    precision: "bounded",
  },
};

export const observedCompleteZeroReport: ReportInput = {
  attemptId: "attempt-et07-report",
  provenance: "contemporaneous",
  measure: { unit: "groups", quantity: 0, uncertainty: "none" },
  timeExtent: {
    kind: "interval",
    startLabel: "18:00",
    endLabel: "18:20",
    precision: "bounded",
  },
};

export const coverageObservedSixToSeven: CoverageInput = {
  attemptId: "attempt-et08-a",
  status: "observed",
  completeness: "unknown",
  unit: "people",
  timeExtent: {
    kind: "interval",
    startLabel: "6 PM",
    endLabel: "7 PM",
    precision: "bounded",
  },
};

export const coverageNotObservedSixThirty: CoverageInput = {
  attemptId: "attempt-et08-b",
  status: "not_observed",
  completeness: "unknown",
  unit: "people",
  timeExtent: {
    kind: "interval",
    startLabel: "6:30 PM",
    endLabel: "7:30 PM",
    precision: "bounded",
  },
};

export const recalledUncertainTime: ReportInput = {
  attemptId: "attempt-et09",
  provenance: "recalled",
  measure: { unit: "people", quantity: 12, uncertainty: "high" },
  timeExtent: {
    kind: "interval",
    startLabel: "18:35",
    endLabel: "18:50",
    precision: "uncertain",
  },
};

export const invalidNegativeQuantity: ReportInput = {
  attemptId: "attempt-invalid-qty",
  provenance: "contemporaneous",
  measure: { unit: "people", quantity: -1, uncertainty: "none" },
  timeExtent: {
    kind: "near_present",
    assertedLabel: "NOW",
    precision: "approximate",
  },
};

export const equalCountSecondAttempt: ReportInput = {
  attemptId: "attempt-et13-b",
  provenance: "contemporaneous",
  measure: { unit: "people", quantity: 4, uncertainty: "low" },
  timeExtent: {
    kind: "near_present",
    assertedLabel: "NOW",
    precision: "approximate",
  },
};

export function cloneExtent(extent: TimeExtent): TimeExtent {
  return structuredClone(extent);
}
