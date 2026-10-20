import {
  effectiveCompleteness,
  findContestedCoverage,
  interpretObservedZeros,
  monitoringWithoutCoverage,
} from "./interpret";
import { validateMeasure, validateTimeExtent } from "./validation";
import type {
  ActionResult,
  AttemptId,
  CoverageInput,
  EvidenceItem,
  InspectView,
  ObservationAccount,
  ObservationId,
  QualificationRecord,
  QualifyInput,
  ReportInput,
  SyntheticPrincipalId,
} from "./types";

interface AttemptRecord {
  attemptId: AttemptId;
  observationId: ObservationId;
  action: "report" | "assert_coverage" | "qualify";
  payloadFingerprint: string;
  // Cached prior outcome for idempotent attempt replay (payload must match).
  result: ActionResult<unknown>;
}

export interface ObservationStore {
  accounts: Map<ObservationId, ObservationAccount>;
  attempts: Map<string, AttemptRecord>;
  /** Monotonic counters for synthetic opaque ids — not persistence keys. */
  nextObservation: number;
  nextEvidence: number;
  nextCoverage: number;
  nextQualification: number;
}

export function createStore(): ObservationStore {
  return {
    accounts: new Map(),
    attempts: new Map(),
    nextObservation: 1,
    nextEvidence: 1,
    nextCoverage: 1,
    nextQualification: 1,
  };
}

function attemptKey(
  observationId: ObservationId,
  attemptId: AttemptId,
): string {
  return `${observationId}::${attemptId}`;
}

function fingerprintReport(input: ReportInput): string {
  return JSON.stringify({
    measure: input.measure,
    timeExtent: input.timeExtent,
    provenance: input.provenance,
  });
}

function fingerprintCoverage(input: CoverageInput): string {
  return JSON.stringify({
    status: input.status,
    timeExtent: input.timeExtent,
    completeness: input.completeness,
    unit: input.unit,
  });
}

function fingerprintQualify(input: QualifyInput): string {
  if (input.targetKind === "evidence") {
    return JSON.stringify({
      targetKind: input.targetKind,
      evidenceId: input.evidenceId,
      uncertainty: input.uncertainty,
      note: input.note,
      forbiddenQuantityChange: input.forbiddenQuantityChange,
    });
  }
  return JSON.stringify({
    targetKind: input.targetKind,
    coverageId: input.coverageId,
    completeness: input.completeness,
    note: input.note,
    forbiddenQuantityChange: input.forbiddenQuantityChange,
  });
}

function nowIso(): string {
  return new Date().toISOString();
}

type AccountGate =
  | { outcome: "ok"; account: ObservationAccount }
  | { outcome: "confirmed_not_effected"; reason: string };

function requireAccount(
  store: ObservationStore,
  observationId: ObservationId,
  principalId: SyntheticPrincipalId,
  options?: { requireOpen?: boolean },
): AccountGate {
  const account = store.accounts.get(observationId);
  if (!account) {
    return {
      outcome: "confirmed_not_effected",
      reason: "Observation not found for this synthetic store.",
    };
  }
  if (account.ownerPrincipalId !== principalId) {
    return {
      outcome: "confirmed_not_effected",
      reason:
        "Simulated entitlement denial: principal does not own this Observation (local simulation only).",
    };
  }
  if (options?.requireOpen && account.status !== "open") {
    return {
      outcome: "confirmed_not_effected",
      reason: "Closed Observation denies direct additions.",
    };
  }
  return { outcome: "ok", account };
}

function buildInspectView(account: ObservationAccount): InspectView {
  return {
    observationId: account.id,
    status: account.status,
    evidence: structuredClone(account.evidence),
    coverage: structuredClone(account.coverage),
    qualifications: structuredClone(account.qualifications),
    unassertedMonitoring: monitoringWithoutCoverage(),
    contestedCoverage: findContestedCoverage(
      account.coverage,
      account.qualifications,
    ),
    observedZeroInterpretations: interpretObservedZeros(
      account.coverage,
      account.evidence,
      account.qualifications,
    ),
    closedAt: account.closedAt,
  };
}

export function establish(
  store: ObservationStore,
  ownerPrincipalId: SyntheticPrincipalId,
): ActionResult<ObservationAccount> {
  const id = `syn-obs-${store.nextObservation}`;
  store.nextObservation += 1;
  const account: ObservationAccount = {
    id,
    ownerPrincipalId,
    status: "open",
    evidence: [],
    coverage: [],
    qualifications: [],
    establishedAt: nowIso(),
  };
  store.accounts.set(id, account);
  return { outcome: "confirmed_effected", value: structuredClone(account) };
}

export function report(
  store: ObservationStore,
  observationId: ObservationId,
  principalId: SyntheticPrincipalId,
  input: ReportInput,
): ActionResult<EvidenceItem> {
  const gate = requireAccount(store, observationId, principalId, {
    requireOpen: true,
  });
  if (gate.outcome !== "ok") return gate;
  const account = gate.account;

  const measureError = validateMeasure(input.measure);
  if (measureError) {
    return { outcome: "confirmed_not_effected", reason: measureError };
  }
  const timeError = validateTimeExtent(input.timeExtent);
  if (timeError) {
    return { outcome: "confirmed_not_effected", reason: timeError };
  }

  const key = attemptKey(observationId, input.attemptId);
  const fingerprint = fingerprintReport(input);
  const prior = store.attempts.get(key);
  if (prior) {
    if (prior.payloadFingerprint !== fingerprint) {
      return {
        outcome: "confirmed_not_effected",
        reason:
          "Same attempt id with a changed payload is rejected; no silent altered fact.",
      };
    }
    return prior.result as ActionResult<EvidenceItem>;
  }

  if (input.simulateInterrupt) {
    const unresolved: ActionResult<EvidenceItem> = {
      outcome: "unresolved",
      reason:
        "Interrupted mock attempt: neither success nor failure is proven until reconciled.",
      attemptId: input.attemptId,
    };
    store.attempts.set(key, {
      attemptId: input.attemptId,
      observationId,
      action: "report",
      payloadFingerprint: fingerprint,
      result: unresolved,
    });
    return unresolved;
  }

  const evidence: EvidenceItem = {
    id: `syn-ev-${store.nextEvidence}`,
    measure: { ...input.measure },
    timeExtent: structuredClone(input.timeExtent),
    provenance: input.provenance,
    receiptAt: nowIso(),
  };
  store.nextEvidence += 1;
  account.evidence.push(evidence);

  const effected: ActionResult<EvidenceItem> = {
    outcome: "confirmed_effected",
    value: structuredClone(evidence),
  };
  store.attempts.set(key, {
    attemptId: input.attemptId,
    observationId,
    action: "report",
    payloadFingerprint: fingerprint,
    result: effected,
  });
  return effected;
}

export function assertCoverage(
  store: ObservationStore,
  observationId: ObservationId,
  principalId: SyntheticPrincipalId,
  input: CoverageInput,
): ActionResult<CoverageInput & { id: string; receiptAt: string }> {
  const gate = requireAccount(store, observationId, principalId, {
    requireOpen: true,
  });
  if (gate.outcome !== "ok") return gate;
  const account = gate.account;

  const timeError = validateTimeExtent(input.timeExtent);
  if (timeError) {
    return { outcome: "confirmed_not_effected", reason: timeError };
  }

  const key = attemptKey(observationId, input.attemptId);
  const fingerprint = fingerprintCoverage(input);
  const prior = store.attempts.get(key);
  if (prior) {
    if (prior.payloadFingerprint !== fingerprint) {
      return {
        outcome: "confirmed_not_effected",
        reason:
          "Same attempt id with a changed payload is rejected; no silent altered fact.",
      };
    }
    return prior.result as ActionResult<
      CoverageInput & { id: string; receiptAt: string }
    >;
  }

  const claim = {
    id: `syn-cov-${store.nextCoverage}`,
    status: input.status,
    timeExtent: structuredClone(input.timeExtent),
    completeness: input.completeness,
    unit: input.unit,
    receiptAt: nowIso(),
  };
  store.nextCoverage += 1;
  account.coverage.push(claim);

  const effected = {
    outcome: "confirmed_effected" as const,
    value: { ...input, id: claim.id, receiptAt: claim.receiptAt },
  };
  store.attempts.set(key, {
    attemptId: input.attemptId,
    observationId,
    action: "assert_coverage",
    payloadFingerprint: fingerprint,
    result: effected,
  });
  return effected;
}

/**
 * O.Qualify — refine semantic qualifiers only.
 * Never replaces factual quantity/unit (E-T16 / Revision boundary).
 */
export function qualify(
  store: ObservationStore,
  observationId: ObservationId,
  principalId: SyntheticPrincipalId,
  input: QualifyInput,
): ActionResult<QualificationRecord> {
  const gate = requireAccount(store, observationId, principalId, {
    requireOpen: true,
  });
  if (gate.outcome !== "ok") return gate;
  const account = gate.account;

  if (input.forbiddenQuantityChange !== undefined) {
    return {
      outcome: "confirmed_not_effected",
      reason:
        "O.Qualify cannot replace factual counts; protected Revision authority is required (E-T16).",
    };
  }

  const key = attemptKey(observationId, input.attemptId);
  const fingerprint = fingerprintQualify(input);
  const prior = store.attempts.get(key);
  if (prior) {
    if (prior.payloadFingerprint !== fingerprint) {
      return {
        outcome: "confirmed_not_effected",
        reason:
          "Same attempt id with a changed payload is rejected; no silent altered fact.",
      };
    }
    return prior.result as ActionResult<QualificationRecord>;
  }

  let record: QualificationRecord;

  if (input.targetKind === "evidence") {
    const evidence = account.evidence.find(
      (item) => item.id === input.evidenceId,
    );
    if (!evidence) {
      return {
        outcome: "confirmed_not_effected",
        reason: "Evidence target not found on this Observation.",
      };
    }
    if (
      input.uncertainty === undefined &&
      (input.note === undefined || input.note.trim() === "")
    ) {
      return {
        outcome: "confirmed_not_effected",
        reason: "Qualify requires an uncertainty refinement and/or note.",
      };
    }
    const priorUncertainty = evidence.measure.uncertainty;
    if (input.uncertainty !== undefined) {
      evidence.measure = {
        ...evidence.measure,
        uncertainty: input.uncertainty,
      };
    }
    record = {
      id: `syn-qual-${store.nextQualification}`,
      targetKind: "evidence",
      targetId: evidence.id,
      note: input.note?.trim() || undefined,
      priorUncertainty,
      appliedUncertainty: input.uncertainty,
      receiptAt: nowIso(),
    };
  } else {
    const coverage = account.coverage.find(
      (item) => item.id === input.coverageId,
    );
    if (!coverage) {
      return {
        outcome: "confirmed_not_effected",
        reason: "Coverage target not found on this Observation.",
      };
    }
    if (
      input.completeness === undefined &&
      (input.note === undefined || input.note.trim() === "")
    ) {
      return {
        outcome: "confirmed_not_effected",
        reason: "Qualify requires a completeness refinement and/or note.",
      };
    }
    // Do not mutate asserted AssertCoverage completeness — Qualify appends
    // history only so contested overlaps cannot be erased (013-E / PR #106).
    // priorCompleteness is the preceding *effective* value (may itself be from Qualify).
    const priorCompleteness = effectiveCompleteness(
      coverage,
      account.qualifications,
    );
    record = {
      id: `syn-qual-${store.nextQualification}`,
      targetKind: "coverage",
      targetId: coverage.id,
      note: input.note?.trim() || undefined,
      priorCompleteness,
      appliedCompleteness: input.completeness,
      receiptAt: nowIso(),
    };
  }

  store.nextQualification += 1;
  account.qualifications.push(record);

  const effected: ActionResult<QualificationRecord> = {
    outcome: "confirmed_effected",
    value: structuredClone(record),
  };
  store.attempts.set(key, {
    attemptId: input.attemptId,
    observationId,
    action: "qualify",
    payloadFingerprint: fingerprint,
    result: effected,
  });
  return effected;
}

/** Inspect an open Observation (016-B). */
export function inspect(
  store: ObservationStore,
  observationId: ObservationId,
  principalId: SyntheticPrincipalId,
): ActionResult<InspectView> {
  const gate = requireAccount(store, observationId, principalId);
  if (gate.outcome !== "ok") return gate;
  const account = gate.account;
  if (account.status !== "open") {
    return {
      outcome: "confirmed_not_effected",
      reason:
        "Observation is closed; use InspectAfterClose for entitled closed review.",
    };
  }
  return {
    outcome: "confirmed_effected",
    value: buildInspectView(account),
  };
}

/** Inspect a closed Observation without reopening (016-C / E-T15). */
export function inspectAfterClose(
  store: ObservationStore,
  observationId: ObservationId,
  principalId: SyntheticPrincipalId,
): ActionResult<InspectView> {
  const gate = requireAccount(store, observationId, principalId);
  if (gate.outcome !== "ok") return gate;
  const account = gate.account;
  if (account.status !== "closed") {
    return {
      outcome: "confirmed_not_effected",
      reason: "InspectAfterClose requires a closed Observation.",
    };
  }
  return {
    outcome: "confirmed_effected",
    value: buildInspectView(account),
  };
}

export function close(
  store: ObservationStore,
  observationId: ObservationId,
  principalId: SyntheticPrincipalId,
): ActionResult<ObservationAccount> {
  const gate = requireAccount(store, observationId, principalId);
  if (gate.outcome !== "ok") return gate;
  const account = gate.account;
  if (account.status === "closed") {
    return {
      outcome: "confirmed_not_effected",
      reason: "Observation is already closed; no mutation.",
    };
  }
  account.status = "closed";
  account.closedAt = nowIso();
  return { outcome: "confirmed_effected", value: structuredClone(account) };
}
