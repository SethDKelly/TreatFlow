import {
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
  ReportInput,
  SyntheticPrincipalId,
} from "./types";

interface AttemptRecord {
  attemptId: AttemptId;
  observationId: ObservationId;
  action: "report" | "assert_coverage";
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
}

export function createStore(): ObservationStore {
  return {
    accounts: new Map(),
    attempts: new Map(),
    nextObservation: 1,
    nextEvidence: 1,
    nextCoverage: 1,
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

function nowIso(): string {
  return new Date().toISOString();
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
  if (account.status !== "open") {
    return {
      outcome: "confirmed_not_effected",
      reason: "Closed Observation denies direct Report additions.",
    };
  }

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
  if (account.status !== "open") {
    return {
      outcome: "confirmed_not_effected",
      reason: "Closed Observation denies direct AssertCoverage additions.",
    };
  }
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

export function inspect(
  store: ObservationStore,
  observationId: ObservationId,
  principalId: SyntheticPrincipalId,
): ActionResult<InspectView> {
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
        "Simulated entitlement denial: no private state is returned to an unentitled principal.",
    };
  }

  const view: InspectView = {
    observationId: account.id,
    status: account.status,
    evidence: structuredClone(account.evidence),
    coverage: structuredClone(account.coverage),
    unassertedMonitoring: monitoringWithoutCoverage(),
    contestedCoverage: findContestedCoverage(account.coverage),
    observedZeroInterpretations: interpretObservedZeros(
      account.coverage,
      account.evidence,
    ),
  };
  return { outcome: "confirmed_effected", value: view };
}

export function close(
  store: ObservationStore,
  observationId: ObservationId,
  principalId: SyntheticPrincipalId,
): ActionResult<ObservationAccount> {
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
      reason: "Simulated entitlement denial on Close.",
    };
  }
  if (account.status === "closed") {
    return {
      outcome: "confirmed_not_effected",
      reason: "Observation is already closed; no mutation.",
    };
  }
  account.status = "closed";
  return { outcome: "confirmed_effected", value: structuredClone(account) };
}
