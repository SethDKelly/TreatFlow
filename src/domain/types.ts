/**
 * Pure Observation domain types for local synthetic work
 * (014-B L01–L04 foundation + 016-B/C seven-action local slice).
 * These are conceptual values, not API/DTO or persistence schemas.
 */

export type ObservationId = string;
export type EvidenceId = string;
export type CoverageId = string;
export type QualificationId = string;
export type AttemptId = string;

/** Simulated local principal — not authentication or security enforcement. */
export type SyntheticPrincipalId = string;

export type MeasureUnit = "people" | "groups";

export type ProvenanceKind = "contemporaneous" | "recalled";

export type CoverageStatus = "observed" | "not_observed" | "uncertain";

export type CompletenessClaim = "complete_claimed" | "partial" | "unknown";

export type LifecycleStatus = "open" | "closed";

export type EffectOutcome =
  | "confirmed_effected"
  | "confirmed_not_effected"
  | "unresolved";

export type TimeExtent =
  | {
      kind: "near_present";
      /** Human-facing asserted label; not exact event precision. */
      assertedLabel: string;
      precision: "approximate" | "uncertain";
    }
  | {
      kind: "interval";
      startLabel: string;
      endLabel: string;
      precision: "approximate" | "uncertain" | "bounded";
    };

export interface Measure {
  unit: MeasureUnit;
  quantity: number;
  uncertainty: "none" | "low" | "high";
}

export interface EvidenceItem {
  id: EvidenceId;
  measure: Measure;
  timeExtent: TimeExtent;
  provenance: ProvenanceKind;
  /** Wall-clock receipt of the local action — distinct from asserted activity time. */
  receiptAt: string;
}

export interface CoverageClaim {
  id: CoverageId;
  status: CoverageStatus;
  timeExtent: TimeExtent;
  completeness: CompletenessClaim;
  unit: MeasureUnit;
  receiptAt: string;
}

/**
 * Semantic qualifier history. Qualifiers refine meaning; they never replace
 * factual measure quantity/unit (Revision boundary).
 */
export interface QualificationRecord {
  id: QualificationId;
  targetKind: "evidence" | "coverage";
  targetId: EvidenceId | CoverageId;
  note?: string;
  priorUncertainty?: Measure["uncertainty"];
  appliedUncertainty?: Measure["uncertainty"];
  priorCompleteness?: CompletenessClaim;
  appliedCompleteness?: CompletenessClaim;
  receiptAt: string;
}

export interface ObservationAccount {
  id: ObservationId;
  ownerPrincipalId: SyntheticPrincipalId;
  status: LifecycleStatus;
  evidence: EvidenceItem[];
  coverage: CoverageClaim[];
  qualifications: QualificationRecord[];
  establishedAt: string;
  closedAt?: string;
}

export type ActionResult<T> =
  | { outcome: "confirmed_effected"; value: T }
  | { outcome: "confirmed_not_effected"; reason: string }
  | { outcome: "unresolved"; reason: string; attemptId: AttemptId };

export interface InspectView {
  observationId: ObservationId;
  status: LifecycleStatus;
  evidence: EvidenceItem[];
  coverage: CoverageClaim[];
  qualifications: QualificationRecord[];
  /** Monitoring without coverage remains unknown — never inferred as watched zero. */
  unassertedMonitoring: "unknown";
  contestedCoverage: ContestedOverlap[];
  observedZeroInterpretations: ObservedZeroInterpretation[];
  closedAt?: string;
}

export interface ContestedOverlap {
  a: CoverageId;
  b: CoverageId;
  note: string;
}

export interface ObservedZeroInterpretation {
  coverageId: CoverageId;
  evidenceId: EvidenceId;
  interpretableAsReportedObservedZero: boolean;
  note: string;
}

export interface ReportInput {
  measure: Measure;
  timeExtent: TimeExtent;
  provenance: ProvenanceKind;
  /** Client attempt id; same attempt + same payload may reconcile; equal counts alone do not dedupe. */
  attemptId: AttemptId;
  /** When true, simulates a dropped/interrupted attempt with unresolved outcome. */
  simulateInterrupt?: boolean;
}

export interface CoverageInput {
  status: CoverageStatus;
  timeExtent: TimeExtent;
  completeness: CompletenessClaim;
  unit: MeasureUnit;
  attemptId: AttemptId;
}

export type QualifyInput = {
  attemptId: AttemptId;
} & (
  | {
      targetKind: "evidence";
      evidenceId: EvidenceId;
      /** Refine uncertainty only — quantity/unit are immutable under O.Qualify. */
      uncertainty?: Measure["uncertainty"];
      note?: string;
      /**
       * If present, always denied: documents the Revision boundary (E-T16).
       * Callers must not use this to change counts.
       */
      forbiddenQuantityChange?: number;
    }
  | {
      targetKind: "coverage";
      coverageId: CoverageId;
      completeness?: CompletenessClaim;
      note?: string;
      forbiddenQuantityChange?: number;
    }
);
