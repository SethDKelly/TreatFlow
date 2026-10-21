// S-32-D: deterministic OFFLINE shadow harness. No IO, network, tokens or status writes.
import { createHash } from "node:crypto";

const SHA = /^[a-f0-9]{40}$/i;
const SENSITIVE_PATH = /^(?:\.github\/|AGENTS\.md$|\.cursor\/|docs\/methodology\/agentic-development-governance\.md$|(?:infra|terraform|security)\/)/i;

function canonical(value) {
  if (value === null || typeof value === "string" || typeof value === "boolean") return JSON.stringify(value);
  if (typeof value === "number" && Number.isFinite(value)) return JSON.stringify(value);
  if (Array.isArray(value)) return "[" + value.map(canonical).join(",") + "]";
  if (value && Object.getPrototypeOf(value) === Object.prototype) {
    return "{" + Object.keys(value).sort().map((key) => {
      if (value[key] === undefined) throw new TypeError("Undefined evidence field");
      return JSON.stringify(key) + ":" + canonical(value[key]);
    }).join(",") + "}";
  }
  throw new TypeError("Evidence must be finite JSON values");
}

export function evidenceDigest(value) {
  return createHash("sha256").update(canonical(value), "utf8").digest("hex");
}

function frozen(value) {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) frozen(child);
    Object.freeze(value);
  }
  return value;
}

function outcome(state, code, detail = "", envelope = null) {
  return frozen({ mode: "OFFLINE_SHADOW_ONLY", state, code, detail, envelope, canApprove: false, canWrite: false, canDispatch: false });
}

const hold = (code, detail) => outcome("SHADOW_HOLD", code, detail);
const missing = (code, detail) => outcome("SHADOW_INSUFFICIENT_EVIDENCE", code, detail);

function validFiles(change) {
  return change && change.complete === true && Array.isArray(change.files) &&
    change.files.length > 0 && change.files.every((f) =>
      typeof f.path === "string" && f.path.length > 0 && !f.path.startsWith("/") &&
      !f.path.includes("..") && ["added", "modified", "deleted", "renamed"].includes(f.status) &&
      (f.kind === "text" ? /^[a-f0-9]{64}$/i.test(f.patchDigest) :
        f.kind === "nontext" && /^[a-f0-9]{64}$/i.test(f.objectDigest)));
}

/**
 * Offline fixtures can demonstrate contract behavior but CANNOT authenticate
 * GitHub, Linear, the CI workflow, or their claimed evidence.
 * All accepted inputs are explicitly untrusted; no result means real PASS.
 */
export function evaluateOffline(input) {
  try {
    if (!input || typeof input !== "object") return missing("NO_INPUT");
    const { event, observations: o, policy: p, capture } = input;
    if (!event || !o || !p || !capture) return missing("MISSING_GROUP");
    if (capture.source !== "synthetic-fixture" || capture.complete !== true ||
        typeof capture.producer !== "string" || !capture.producer ||
        !Number.isFinite(Date.parse(capture.capturedAt))) return missing("CAPTURE_NOT_ATTESTED");
    if (event.action !== "closed") return outcome("SHADOW_IGNORED", "NON_CLOSED_EVENT");
    if (event.merged !== true) return outcome("SHADOW_IGNORED", "NOT_MERGED");
    if (!Number.isSafeInteger(event.repositoryId) || event.repositoryId <= 0 ||
        !Number.isSafeInteger(event.prNumber) || event.prNumber <= 0 ||
        event.repositoryId !== p.repositoryId || event.baseRef !== p.baseRef)
      return hold("UNAUTHORIZED_REPOSITORY_OR_BASE");
    if (o.repositoryId !== event.repositoryId || o.prNumber !== event.prNumber ||
        o.baseRef !== event.baseRef || o.merged !== true)
      return hold("EVENT_API_MISMATCH");
    if (!SHA.test(o.reviewedHead) || !SHA.test(o.integratedTip) ||
        !SHA.test(o.mergeBaseSha) || !SHA.test(o.preIntegrationBaseSha) ||
        !SHA.test(p.policySha) || !SHA.test(p.workflowRevision))
      return missing("UNPINNED_GIT_OR_POLICY");
    if (!["merge", "squash", "rebase"].includes(o.mergeStrategy))
      return missing("UNSUPPORTED_INTEGRATION_STRATEGY");
    if (!Array.isArray(o.parentShas) ||
        !o.parentShas.every((sha) => SHA.test(sha)))
      return missing("MISSING_GIT_GRAPH");
    if (o.mergeStrategy === "merge" && o.parentShas.length !== 2 ||
        o.mergeStrategy === "squash" && o.parentShas.length !== 1)
      return hold("INCONSISTENT_PARENT_GRAPH");
    if (o.mergeStrategy !== "rebase" && o.parentShas[0] !== o.preIntegrationBaseSha)
      return hold("WRONG_PRE_INTEGRATION_PARENT");
    if (o.mergeStrategy === "rebase" &&
        (o.rebaseRangeProven !== true || o.integratedChange.rangeProven !== true))
      return missing("REBASE_LANDING_RANGE_UNPROVEN");
    if (!validFiles(o.authoredChange) || !validFiles(o.integratedChange) ||
        o.authoredChange.fromSha !== o.mergeBaseSha ||
        o.authoredChange.toSha !== o.reviewedHead ||
        o.integratedChange.fromSha !== o.preIntegrationBaseSha ||
        o.integratedChange.toSha !== o.integratedTip)
      return missing("INCOMPLETE_OR_WRONG_DIFF");
    if ([...o.authoredChange.files, ...o.integratedChange.files].some((f) => SENSITIVE_PATH.test(f.path)))
      return hold("PREMERGE_SECURITY_GATE_UNATTESTED");
    if (!o.issue || !Array.isArray(o.issue.linkedIds) ||
        o.issue.linkedIds.length !== 1 || o.issue.linkedIds[0] !== o.issue.id ||
        o.issue.id !== p.issueId)
      return hold("AMBIGUOUS_OR_WRONG_LINEAR_ISSUE");
    if (o.issue.status !== "Verification" || o.issue.blockersComplete !== true)
      return hold("ISSUE_NOT_ACCEPTANCE_ELIGIBLE");
    if (!Array.isArray(p.requiredChecks) || p.requiredChecks.length === 0 ||
        new Set(p.requiredChecks).size !== p.requiredChecks.length ||
        !Array.isArray(o.checks)) return missing("REQUIRED_CHECK_POLICY_MISSING");
    for (const name of p.requiredChecks) {
      const matches = o.checks.filter((c) => c.name === name);
      if (matches.length !== 1) return hold("MISSING_OR_DUPLICATE_REQUIRED_CHECK", name);
      const c = matches[0];
      if (c.sha !== o.integratedTip || c.appId !== p.checkAppId ||
          c.workflowRevision !== p.workflowRevision || c.workflowPath !== p.workflowPath ||
          !Number.isSafeInteger(c.runId) || !Number.isSafeInteger(c.attempt) ||
          c.status !== "completed" || c.conclusion !== "success")
        return hold("CI_PROVENANCE_OR_RESULT_MISMATCH", name);
    }
    if (!Array.isArray(o.unresolvedThreads) || o.unresolvedThreads.length !== 0)
      return hold("UNRESOLVED_REVIEW_THREADS");

    const snapshot = {
      schema: "shadow-review-envelope/0.1",
      sourceClass: "SYNTHETIC_UNATTESTED",
      event, observations: o, policy: p, capture,
      objectDigests: {
        event: evidenceDigest(event),
        observations: evidenceDigest(o),
        policy: evidenceDigest(p),
        capture: evidenceDigest(capture),
      },
    };
    // Canonical deep copy prevents later fixture mutations affecting the frozen result.
    const copied = JSON.parse(canonical(snapshot));
    const manifestDigest = evidenceDigest(copied);
    const workKey = evidenceDigest({
      repo: event.repositoryId, pr: event.prNumber,
      head: o.reviewedHead, tip: o.integratedTip,
      issue: p.issueId, policy: p.policySha, envelope: manifestDigest,
    });
    return outcome("SHADOW_EVIDENCE_READY", "SIMULATED_PREREQUISITES_ONLY", "",
      frozen({ manifest: frozen(copied), manifestDigest, workKey, authenticated: false }));
  } catch {
    return missing("UNSERIALIZABLE_OR_INVALID_FIXTURE");
  }
}

/** An untrusted mock evaluator NEVER emits trusted PASS or status authorization. */
export function reviewWithMock(shadow, mock) {
  if (shadow?.state !== "SHADOW_EVIDENCE_READY")
    return hold("MOCK_REQUIRES_READY_SHADOW");
  if (!mock || mock.manifestDigest !== shadow.envelope.manifestDigest ||
      !["PASS", "HOLD", "INSUFFICIENT_EVIDENCE"].includes(mock.verdict))
    return hold("MOCK_RECEIPT_MISMATCH");
  return outcome("SHADOW_REVIEW_RECORDED", "UNTRUSTED_MOCK_VERDICT", mock.verdict);
}
