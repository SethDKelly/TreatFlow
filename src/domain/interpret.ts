import {
  activityConflictsWithExtent,
  extentsSemanticallyEqual,
  intervalOverlapRelation,
  intervalsOverlap,
} from "./validation";
import type {
  ContestedOverlap,
  CoverageClaim,
  EvidenceItem,
  ObservedZeroInterpretation,
  TimeExtent,
} from "./types";

/**
 * Empty evidence and missing coverage are unknown monitoring — never watched zero.
 */
export function monitoringWithoutCoverage(): "unknown" {
  return "unknown";
}

/**
 * A Report of quantity 0 alone is not an observed zero (E-T06).
 * Reported observed zero requires observed coverage + complete_claimed for the
 * same unit/extent, with no contested coverage, no unresolved contradictory
 * activity evidence, and a matching zero evidence (E-T07).
 */
export function interpretObservedZeros(
  coverage: CoverageClaim[],
  evidence: EvidenceItem[],
): ObservedZeroInterpretation[] {
  const results: ObservedZeroInterpretation[] = [];
  const contested = findContestedCoverage(coverage);
  const contestedIds = new Set(contested.flatMap((c) => [c.a, c.b]));

  for (const claim of coverage) {
    if (claim.status !== "observed") continue;
    if (claim.completeness !== "complete_claimed") continue;

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

/**
 * Contested coverage:
 * - incompatible monitoring status over overlapping/undecidable extents contests
 *   regardless of unit (attention contradiction);
 * - completeness is compared only within the same declared measurement unit.
 */
export function findContestedCoverage(
  coverage: CoverageClaim[],
): ContestedOverlap[] {
  const contested: ContestedOverlap[] = [];
  for (let i = 0; i < coverage.length; i += 1) {
    for (let j = i + 1; j < coverage.length; j += 1) {
      const a = coverage[i];
      const b = coverage[j];
      if (!intervalsOverlap(a.timeExtent, b.timeExtent)) continue;

      const statusConflict = a.status !== b.status;
      const completenessConflict =
        a.unit === b.unit && a.completeness !== b.completeness;
      if (!statusConflict && !completenessConflict) continue;

      const relation = intervalOverlapRelation(a.timeExtent, b.timeExtent);
      contested.push({
        a: a.id,
        b: b.id,
        note: statusConflict
          ? relation === "unknown"
            ? "Incompatible monitoring status with undecidable overlap remains contested."
            : "Overlapping incompatible monitoring status remains contested; not last-write-wins."
          : "Incompatible reporting-completeness claims for the same measurement unit remain contested.",
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
