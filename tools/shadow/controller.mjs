// S-32-D: deterministic OFFLINE shadow harness. No IO, network, tokens or status writes.
import { createHash } from "node:crypto";

const SHA = /^[a-f0-9]{40}$/i;
const validSha = (value) => typeof value === "string" && SHA.test(value);
const validDigest = (value) => typeof value === "string" && /^[a-f0-9]{64}$/i.test(value);
const SENSITIVE_PATH = /^(?:\.github\/|\.cursor\/|docs\/methodology\/agentic-development-governance\.md$|(?:infra|terraform|security)\/)|(?:^|\/)AGENTS\.md$/i;

// Capture one detached, inert snapshot BEFORE validation and hashing.
// Reject accessors, sparse arrays, exotic objects, cycles and oversized inputs.
function inertCopy(value, seen = new WeakSet(), depth = 0) {
  if (depth > 40) throw new TypeError("Evidence nesting too deep");
  if (value === null || typeof value === "string" || typeof value === "boolean") return value;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "object" || seen.has(value)) throw new TypeError("Invalid or cyclic evidence");
  seen.add(value);
  if (Array.isArray(value)) {
    if (value.length > 10000 || Reflect.ownKeys(value).length !== value.length + 1)
      throw new TypeError("Sparse or extended evidence array");
    const output = [];
    for (let index = 0; index < value.length; index++) {
      const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
      if (!descriptor || !("value" in descriptor)) throw new TypeError("Non-inert array");
      output.push(inertCopy(descriptor.value, seen, depth + 1));
    }
    seen.delete(value);
    return output;
  }
  if (Object.getPrototypeOf(value) !== Object.prototype || Reflect.ownKeys(value).some((k) => typeof k !== "string"))
    throw new TypeError("Non-plain evidence object");
  const output = {};
  const descriptors = Object.getOwnPropertyDescriptors(value);
  for (const key of Object.keys(descriptors)) {
    const descriptor = descriptors[key];
    if (!descriptor.enumerable || !("value" in descriptor) || descriptor.value === undefined)
      throw new TypeError("Non-inert evidence field");
    Object.defineProperty(output, key, {
      enumerable: true, configurable: true, writable: true,
      value: inertCopy(descriptor.value, seen, depth + 1),
    });
  }
  seen.delete(value);
  return output;
}

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
  return createHash("sha256").update(canonical(inertCopy(value)), "utf8").digest("hex");
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

const validPath = (path) => typeof path === "string" && path.length > 0 &&
  !path.startsWith("/") && !path.includes("\\") && !/[\u0000-\u001f]/.test(path) &&
  path.split("/").every((part) => part !== "" && part !== "." && part !== "..");

function validFiles(change) {
  return change && change.complete === true && Array.isArray(change.files) &&
    change.files.length > 0 && change.files.every((f) =>
      validPath(f.path) && ["added", "modified", "deleted", "renamed"].includes(f.status) &&
      (f.status !== "renamed" ||
        (validPath(f.previousPath) && f.previousPath !== f.path)) &&
      (f.kind === "text" ? validDigest(f.patchDigest) :
        f.kind === "nontext" && validDigest(f.objectDigest)));
}

// Derive the same work identity from the ACTUAL evidence content on both
// production of the shadow snapshot and recording of an untrusted mock result.
function workKeyFor(manifest, manifestDigest) {
  const { event, observations: o, policy: p } = manifest;
  return evidenceDigest({
    repo: event.repositoryId, pr: event.prNumber,
    head: o.reviewedHead, tip: o.integratedTip,
    issue: p.issueId, policy: p.policySha, envelope: manifestDigest,
  });
}

/**
 * Offline fixtures can demonstrate contract behavior but CANNOT authenticate
 * GitHub, Linear, the CI workflow, or their claimed evidence.
 * All accepted inputs are explicitly untrusted; no result means real PASS.
 */
export function evaluateOffline(input) {
  try {
    if (!input || typeof input !== "object") return missing("NO_INPUT");
    const captured = frozen(inertCopy(input));
    const { event, observations: o, policy: p, capture } = captured;
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
    if (!validSha(o.reviewedHead) || !validSha(o.integratedTip) ||
        !validSha(o.mergeBaseSha) || !validSha(o.preIntegrationBaseSha) ||
        !validSha(p.policySha) || !validSha(p.workflowRevision))
      return missing("UNPINNED_GIT_OR_POLICY");
    if (!["merge", "squash", "rebase"].includes(o.mergeStrategy))
      return missing("UNSUPPORTED_INTEGRATION_STRATEGY");
    if (!Number.isSafeInteger(p.checkAppId) || p.checkAppId <= 0 ||
        !validPath(p.workflowPath) || !p.workflowPath.startsWith(".github/workflows/") ||
        typeof p.baseRef !== "string" || !p.baseRef) return missing("UNTRUSTED_CHECK_POLICY_SOURCE");
    if (!Array.isArray(o.parentShas) || o.parentShas.length === 0 ||
        !o.parentShas.every((sha) => validSha(sha)))
      return missing("MISSING_GIT_GRAPH");
    if (o.mergeStrategy === "merge" && o.parentShas.length !== 2 ||
        o.mergeStrategy === "squash" && o.parentShas.length !== 1 ||
        o.mergeStrategy === "rebase" && o.parentShas.length !== 1)
      return hold("INCONSISTENT_PARENT_GRAPH");
    if (o.mergeStrategy !== "rebase" && o.parentShas[0] !== o.preIntegrationBaseSha)
      return hold("WRONG_PRE_INTEGRATION_PARENT");
    if (o.mergeStrategy === "merge" && o.parentShas[1] !== o.reviewedHead)
      return hold("WRONG_MERGE_SECOND_PARENT");
    if (o.mergeStrategy === "rebase" &&
        (o.rebaseRangeProven !== true || o.integratedChange.rangeProven !== true))
      return missing("REBASE_LANDING_RANGE_UNPROVEN");
    if (!validFiles(o.authoredChange) || !validFiles(o.integratedChange) ||
        o.authoredChange.fromSha !== o.mergeBaseSha ||
        o.authoredChange.toSha !== o.reviewedHead ||
        o.integratedChange.fromSha !== o.preIntegrationBaseSha ||
        o.integratedChange.toSha !== o.integratedTip)
      return missing("INCOMPLETE_OR_WRONG_DIFF");
    if ([...o.authoredChange.files, ...o.integratedChange.files].some((f) =>
        SENSITIVE_PATH.test(f.path) || (f.previousPath && SENSITIVE_PATH.test(f.previousPath))))
      return hold("PREMERGE_SECURITY_GATE_UNATTESTED");
    if (!o.issue || typeof p.issueId !== "string" || !/^[A-Z][A-Z0-9]*-[1-9][0-9]*$/.test(p.issueId) ||
        typeof o.issue.id !== "string" || !Array.isArray(o.issue.linkedIds) ||
        o.issue.linkedIds.length !== 1 || o.issue.linkedIds[0] !== o.issue.id ||
        o.issue.id !== p.issueId)
      return hold("AMBIGUOUS_OR_WRONG_LINEAR_ISSUE");
    if (o.issue.status !== "Verification" || o.issue.blockersComplete !== true)
      return hold("ISSUE_NOT_ACCEPTANCE_ELIGIBLE");
    if (!Array.isArray(p.requiredChecks) || p.requiredChecks.length === 0 ||
        !p.requiredChecks.every((name) => typeof name === "string" && name.trim().length > 0 && name === name.trim()) ||
        new Set(p.requiredChecks).size !== p.requiredChecks.length ||
        !Array.isArray(o.checks)) return missing("REQUIRED_CHECK_POLICY_MISSING");
    for (const name of p.requiredChecks) {
      const matches = o.checks.filter((c) => c.name === name);
      if (matches.length !== 1) return hold("MISSING_OR_DUPLICATE_REQUIRED_CHECK", name);
      const c = matches[0];
      if (c.sha !== o.integratedTip || c.appId !== p.checkAppId ||
          c.workflowRevision !== p.workflowRevision || c.workflowPath !== p.workflowPath ||
          !Number.isSafeInteger(c.runId) || c.runId <= 0 ||
          !Number.isSafeInteger(c.attempt) || c.attempt <= 0 ||
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
    const workKey = workKeyFor(copied, manifestDigest);
    return outcome("SHADOW_EVIDENCE_READY", "SIMULATED_PREREQUISITES_ONLY", "",
      frozen({ manifest: frozen(copied), manifestDigest, workKey, authenticated: false }));
  } catch {
    return missing("UNSERIALIZABLE_OR_INVALID_FIXTURE");
  }
}

/** An untrusted mock evaluator NEVER emits trusted PASS or status authorization. */
export function reviewWithMock(shadow, mock) {
  try {
    // Callers may clone or deserialize a result; do not trust its stored
    // digest/work key, and snapshot it before inspecting anything mutable.
    const candidate = inertCopy(shadow);
    if (candidate?.mode !== "OFFLINE_SHADOW_ONLY" ||
        candidate?.state !== "SHADOW_EVIDENCE_READY" ||
        candidate.envelope?.authenticated !== false ||
        !validDigest(candidate.envelope.manifestDigest) ||
        !validDigest(candidate.envelope.workKey) ||
        candidate.envelope.manifest?.sourceClass !== "SYNTHETIC_UNATTESTED")
      return hold("MOCK_REQUIRES_READY_SHADOW");

    const { manifest, manifestDigest, workKey } = candidate.envelope;
    if (evidenceDigest(manifest) !== manifestDigest ||
        workKeyFor(manifest, manifestDigest) !== workKey)
      return hold("MOCK_ENVELOPE_DIGEST_MISMATCH");

    // The manifest also binds each source object's content digest, rather
    // than merely hashing an internally inconsistent manifest as a whole.
    const { objectDigests, event, observations, policy, capture } = manifest;
    if (!objectDigests ||
        objectDigests.event !== evidenceDigest(event) ||
        objectDigests.observations !== evidenceDigest(observations) ||
        objectDigests.policy !== evidenceDigest(policy) ||
        objectDigests.capture !== evidenceDigest(capture))
      return hold("MOCK_OBJECT_DIGEST_MISMATCH");

    const proposal = inertCopy(mock);
    if (proposal?.manifestDigest !== manifestDigest ||
        !["PASS", "HOLD", "INSUFFICIENT_EVIDENCE"].includes(proposal.verdict))
      return hold("MOCK_RECEIPT_MISMATCH");
    return frozen({
      mode: "OFFLINE_SHADOW_ONLY",
      state: "SHADOW_REVIEW_RECORDED",
      code: "UNTRUSTED_MOCK_VERDICT",
      detail: proposal.verdict,
      envelope: frozen({ manifestDigest, workKey, authenticated: false }),
      canApprove: false, canWrite: false, canDispatch: false,
    });
  } catch {
    return hold("MALFORMED_MOCK_RECEIPT");
  }
}
