import {
  activityConflictsWithExtent,
  extentsSemanticallyEqual,
  intervalOverlapRelation,
  intervalsOverlap,
} from "./validation";
import type {
  CompletenessClaim,
  ContestedOverlap,
  CoverageClaim,
  EvidenceItem,
  ObservedZeroInterpretation,
  QualificationRecord,
  TimeExtent,
} from "./types";

/**
 * Empty evidence and missing coverage are unknown monitoring — never watched zero.
 */
export function monitoringWithoutCoverage(): "unknown" {
  return "unknown";
}

/**
 * Latest Qualify completeness for a coverage claim, if any.
 * AssertCoverage completeness remains on the claim (immutable under Qualify).
 */
export function effectiveCompleteness(
  claim: CoverageClaim,
  qualifications: QualificationRecord[],
): CompletenessClaim {
  const applied = [...qualifications]
    .reverse()
    .find(
      (item) =>
        item.targetKind === "coverage" &&
        item.targetId === claim.id &&
        item.appliedCompleteness !== undefined,
    );
  return applied?.appliedCompleteness ?? claim.completeness;
}

/**
 * A Report of quantity 0 alone is not an observed zero (E-T06).
 * Reported observed zero requires observed coverage + complete_claimed for the
 * same unit/extent, with no contested coverage, no unresolved contradictory
 * activity evidence, and a matching zero evidence (E-T07).
 *
 * Contests consider AssertCoverage-asserted conflicts and sticky historical
 * Qualify-effective conflicts (replayed), so later Qualify cannot erase either
 * original or qualification-created contradictions (013-E).
 */
export function interpretObservedZeros(
  coverage: CoverageClaim[],
  evidence: EvidenceItem[],
  qualifications: QualificationRecord[] = [],
): ObservedZeroInterpretation[] {
  const results: ObservedZeroInterpretation[] = [];
  const contested = findContestedCoverage(coverage, qualifications);
  const contestedIds = new Set(contested.flatMap((c) => [c.a, c.b]));

  for (const claim of coverage) {
    if (claim.status !== "observed") continue;
    if (effectiveCompleteness(claim, qualifications) !== "complete_claimed") {
      continue;
    }

    const zeroEvidence = evidence.filter(
      (item) =>
        item.measure.unit === claim.unit &&
        item.measure.quantity === 0 &&
        extentsSemanticallyEqual(item.timeExtent, claim.timeExtent),
    );

    for (const item of zeroEvidence) {
      const contestedBlock = contestedIds.has(claim.id);
      const contradictory = findContradictoryActivity(
        evidence,
        claim.unit,
        claim.timeExtent,
        item.id,
      );
      const blocked = contestedBlock || contradictory.length > 0;
      results.push({
        coverageId: claim.id,
        evidenceId: item.id,
        interpretableAsReportedObservedZero: !blocked,
        note: contestedBlock
          ? "Contested overlapping coverage blocks observed-zero interpretation."
          : contradictory.length > 0
            ? `Unresolved contradictory activity (${contradictory.join(", ")}) blocks observed-zero interpretation.`
            : "Interpretable as reported observed zero for the declared unit/extent; not certified perfect detection.",
      });
    }
  }

  // Explicit zeros without supporting observed+complete coverage stay non-interpretable.
  for (const item of evidence) {
    if (item.measure.quantity !== 0) continue;
    const already = results.some((r) => r.evidenceId === item.id);
    if (already) continue;
    results.push({
      coverageId: "(none)",
      evidenceId: item.id,
      interpretableAsReportedObservedZero: false,
      note: "Quantity zero without matching observed + complete_claimed coverage is not observed zero.",
    });
  }

  return results;
}

function coveragePairKey(aId: string, bId: string): string {
  return aId < bId ? `${aId}|${bId}` : `${bId}|${aId}`;
}

/**
 * Contested coverage:
 * - incompatible monitoring status over overlapping/undecidable extents contests
 *   regardless of unit;
 * - completeness conflicts within the same unit are sticky: AssertCoverage
 *   conflicts seed the set, and any historical Qualify prefix that made
 *   effective completeness disagree keeps the pair contested even if a later
 *   Qualify realigns latest values (no authorized conflict resolution).
 */
export function findContestedCoverage(
  coverage: CoverageClaim[],
  qualifications: QualificationRecord[] = [],
): ContestedOverlap[] {
  const stickyCompletenessPairs = new Set<string>();

  for (let i = 0; i < coverage.length; i += 1) {
    for (let j = i + 1; j < coverage.length; j += 1) {
      const a = coverage[i];
      const b = coverage[j];
      if (!intervalsOverlap(a.timeExtent, b.timeExtent)) continue;
      if (a.unit === b.unit && a.completeness !== b.completeness) {
        stickyCompletenessPairs.add(coveragePairKey(a.id, b.id));
      }
    }
  }

  // Replay qualifications in order: once effective values conflict, stick.
  for (let q = 0; q < qualifications.length; q += 1) {
    const prefix = qualifications.slice(0, q + 1);
    for (let i = 0; i < coverage.length; i += 1) {
      for (let j = i + 1; j < coverage.length; j += 1) {
        const a = coverage[i];
        const b = coverage[j];
        if (!intervalsOverlap(a.timeExtent, b.timeExtent)) continue;
        if (a.unit !== b.unit) continue;
        if (
          effectiveCompleteness(a, prefix) !==
          effectiveCompleteness(b, prefix)
        ) {
          stickyCompletenessPairs.add(coveragePairKey(a.id, b.id));
        }
      }
    }
  }

  const contested: ContestedOverlap[] = [];
  for (let i = 0; i < coverage.length; i += 1) {
    for (let j = i + 1; j < coverage.length; j += 1) {
      const a = coverage[i];
      const b = coverage[j];
      if (!intervalsOverlap(a.timeExtent, b.timeExtent)) continue;

      const statusConflict = a.status !== b.status;
      const assertedCompletenessConflict =
        a.unit === b.unit && a.completeness !== b.completeness;
      const stickyCompletenessConflict = stickyCompletenessPairs.has(
        coveragePairKey(a.id, b.id),
      );

      if (
        !statusConflict &&
        !assertedCompletenessConflict &&
        !stickyCompletenessConflict
      ) {
        continue;
      }

      const relation = intervalOverlapRelation(a.timeExtent, b.timeExtent);
      contested.push({
        a: a.id,
        b: b.id,
        note: statusConflict
          ? relation === "unknown"
            ? "Incompatible monitoring status with undecidable overlap remains contested."
            : "Overlapping incompatible monitoring status remains contested; not last-write-wins."
          : assertedCompletenessConflict
            ? "Incompatible AssertCoverage completeness claims for the same measurement unit remain contested; Qualify cannot erase the conflict."
            : "Qualification-created completeness conflict remains unresolved; subsequent Qualify cannot erase it.",
      });
    }
  }
  return contested;
}

function findContradictoryActivity(
  evidence: EvidenceItem[],
  unit: CoverageClaim["unit"],
  extent: TimeExtent,
  zeroEvidenceId: string,
): string[] {
  return evidence
    .filter(
      (item) =>
        item.id !== zeroEvidenceId &&
        item.measure.unit === unit &&
        item.measure.quantity > 0 &&
        activityConflictsWithExtent(item.timeExtent, extent),
    )
    .map((item) => item.id);
}
