// S-42 offline-only synthetic event/review reconciler.
// No network, filesystem, credentials, webhook listener, actions, or status writes.
// All observations are caller-controlled test data, NOT authenticated evidence.
import { types } from "node:util";
const stableGetDescriptor = Object.getOwnPropertyDescriptor;
const stableDefineProperty = Object.defineProperty;
const stableOwnKeys = Reflect.ownKeys;
const stableGetPrototype = Object.getPrototypeOf;
const stableArrayIsArray = Array.isArray;
const stableIsProxy = types.isProxy;
const stableHasOwn = Function.prototype.call.bind(Object.prototype.hasOwnProperty);
const stableIncludes = Function.prototype.call.bind(Array.prototype.includes);
const stableRegexTest = Function.prototype.call.bind(RegExp.prototype.test);
const StableSet = Set;
const stableSetHas = Function.prototype.call.bind(Set.prototype.has);
const stableSetAdd = Function.prototype.call.bind(Set.prototype.add);
const nativeArrayPrototype = Array.prototype;
const nativeFilter = Function.prototype.call.bind(Array.prototype.filter);
const nativeSome = Function.prototype.call.bind(Array.prototype.some);
const stableLowerCase = Function.prototype.call.bind(String.prototype.toLowerCase);
const ownValue = (obj, key) => stableGetDescriptor(obj, key)?.value;
function detach(value) {
  if (value === null || typeof value !== "object") return value;
  if (stableArrayIsArray(value)) {
    const out = [];
    for (let i = 0; i < value.length; i++) stableDefineProperty(out, String(i), {value: detach(ownValue(value, String(i))), enumerable: true, writable: true, configurable: true});
    return out;
  }
  const out = Object.create(null);
  for (const key of stableOwnKeys(value)) stableDefineProperty(out, key, {value: detach(ownValue(value, key)), enumerable: true, writable: true, configurable: true});
  return out;
}

const SHA = /^[a-f0-9]{40}$/i;
// Do not read Proxy/accessor fields before rejecting them. Non-inert objects
// can cause arbitrary caller-side effects even in a "pure" test harness.
function safeFixture(value, budget = { nodes: 0, bytes: 0, seen: new WeakSet() }, depth = 0) {
  if (++budget.nodes > 4096 || depth > 32) return false;
  if (typeof value === "string") {
    if (value.length > 786432) return false;
    budget.bytes += Buffer.byteLength(value, "utf8");
    return budget.bytes <= 786432;
  }
  if (value === null || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value !== "object" || stableIsProxy(value) || budget.seen.has(value))
    return false;
  budget.seen.add(value);
  const array = stableArrayIsArray(value);
  if ((!array && stableGetPrototype(value) !== Object.prototype) ||
      (array && (stableGetPrototype(value) !== nativeArrayPrototype || value.length > 256))) return false;
  const keys = stableOwnKeys(value);
  if (keys.length > 256 + (array ? 1 : 0)) return false;
  if (array && keys.length !== value.length + 1) return false;
  for (const key of keys) {
    if (array && key === "length") continue;
    if (typeof key !== "string") return false;
    budget.bytes += Buffer.byteLength(key, "utf8");
    if (budget.bytes > 786432) return false;
    const descriptor = stableGetDescriptor(value, key);
    if (!descriptor || !("value" in descriptor) ||
        !safeFixture(descriptor.value, budget, depth + 1)) return false;
  }
  return true;
}
const safeId = (x) => Number.isSafeInteger(x) && x > 0;
const sameSha = (a, b) => typeof a === "string" && typeof b === "string" &&
  stableRegexTest(SHA, a) && stableRegexTest(SHA, b) && stableLowerCase(a) === stableLowerCase(b);
const result = (state, reason) => Object.freeze({
  mode: "OFFLINE_SYNTHETIC_UNATTESTED", state, reason,
  canApprove: false, canWrite: false, canDispatch: false, canMerge: false,
});
const invalid = (why) => result("INSUFFICIENT_EVIDENCE", why);

const actions = Object.freeze({
  pull_request: ["synchronize", "closed", "reopened"],
  pull_request_review: ["submitted", "edited", "dismissed"],
  pull_request_review_comment: ["created", "edited", "deleted"],
  issue_comment: ["created", "edited"],
  workflow_run: ["completed"],
  check_run: ["completed"],
});

// A delivery only wakes a later source reconciliation. Even a valid-looking
// GitHub/Codex marker, reaction, or check_run event never creates a verdict.
export function normalizeWakeHint(event, policy) {
  if (!safeFixture(event) || !safeFixture(policy))
    return invalid("NON_INERT_FIXTURE");
  event = detach(event);
  policy = detach(policy);
  if (!event || !policy || typeof event !== "object" || typeof policy !== "object" ||
      typeof event.event !== "string" ||
      !stableHasOwn(actions, event.event) ||
      !stableIncludes(actions[event.event], event.action)) return invalid("UNRECOGNIZED_SIGNAL");
  if (!safeId(event.repositoryId) || !safeId(event.prNumber) ||
      event.repositoryId !== policy.repositoryId ||
      event.prNumber !== policy.prNumber) return invalid("WRONG_TARGET");
  if (typeof event.deliveryId !== "string" ||
      !stableRegexTest(/^[A-Za-z0-9_-]{1,128}$/, event.deliveryId))
    return invalid("INVALID_DELIVERY_ID");
  // A comment event on an issue is not a PR event unless proven by source.
  if (event.event === "issue_comment" && event.isPullRequest !== true)
    return invalid("NOT_PR_CONVERSATION");
  // These are untrusted synthetic hints; no HMAC/installation attestation here.
  return result("WAKE_RECONCILIATION", "SOURCE_RECHECK_REQUIRED");
}

// Models duplicates/out-of-order/missed wakeups. An absent webhook must not
// block a separately scheduled, bounded post-request source recheck.
export function coalesceWakeHints(events, policy) {
  if (!safeFixture(events) || !safeFixture(policy) || !stableArrayIsArray(events) || events.length > 256)
    return Object.freeze({ accepted: 0, duplicates: 0, rejected: 0, needsRecheck: true });
  events = detach(events);
  policy = detach(policy);
  const seen = new StableSet();
  let accepted = 0, duplicates = 0, rejected = 0;
  for (const event of events) {
    const normalized = normalizeWakeHint(event, policy);
    if (normalized.state !== "WAKE_RECONCILIATION") { rejected++; continue; }
    if (stableSetHas(seen, event.deliveryId)) { duplicates++; continue; }
    stableSetAdd(seen, event.deliveryId);
    accepted++;
  }
  return Object.freeze({ accepted, duplicates, rejected, needsRecheck: true });
}

// All inputs are synthetic fixtures. In a future live integration, only a
// separate, authenticated source collector can construct observed facts;
// no event/comment payload may be substituted for those observations.
export function reconcileOffline(input = {}) {
  if (!safeFixture(input)) return invalid("NON_INERT_FIXTURE");
  input = detach(input);
  const { policy, observed, retry } = input;
  if (!policy || !observed || !retry || typeof policy !== "object" ||
      typeof observed !== "object" || typeof retry !== "object")
    return invalid("MISSING_GROUP");
  if (!safeId(policy.repositoryId) || !safeId(policy.prNumber) ||
      !safeId(policy.reviewerAppId) || !safeId(policy.checkAppId) ||
      !sameSha(policy.headSha, policy.headSha) ||
      !sameSha(policy.workflowRevision, policy.workflowRevision))
    return invalid("INVALID_POLICY");
  if (policy.workflowPath !== ".github/workflows/ci.yml")
    return invalid("INVALID_WORKFLOW_POLICY");
  if (!Number.isSafeInteger(retry.attempt) || retry.attempt < 0 ||
      !Number.isSafeInteger(retry.maxAttempts) ||
      retry.maxAttempts < 1 || retry.maxAttempts > 12)
    return invalid("INVALID_RETRY_BUDGET");
  if (observed.readStatus !== "complete")
    return invalid("SOURCE_READ_NOT_COMPLETE");
  const pr = observed.pr;
  if (!pr || pr.repositoryId !== policy.repositoryId ||
      pr.number !== policy.prNumber ||
      !sameSha(pr.headSha, pr.headSha)) return invalid("PR_SOURCE_MISMATCH");
  if (!sameSha(pr.headSha, policy.headSha))
    return result("STALE_HEAD", "HEAD_CHANGED_REEVALUATE_POLICY");
  // Observations are not provenance attestations. Missing or contradictory
  // source facts remain unknown rather than being inferred from an event.
  if (!stableArrayIsArray(observed.reviews) || observed.reviews.length > 256 ||
      !stableArrayIsArray(observed.checks) || observed.checks.length > 256 ||
      !Number.isSafeInteger(observed.unresolvedThreads) ||
      observed.unresolvedThreads < 0)
    return invalid("INCOMPLETE_SOURCE_OBSERVATION");

  // Only own data properties may establish reviewer identity or terminal facts.
  const own = ownValue;
  const current = nativeFilter(observed.reviews, (review) =>
    review && own(review, "appId") === policy.reviewerAppId &&
    sameSha(own(review, "commitSha"), policy.headSha));
  // Reject malformed same-app/current-head receipts before terminal filtering.
  if (nativeSome(current, (review) =>
      (own(review, "state") === "completed" &&
       (!safeId(own(review, "id")) ||
        own(review, "source") !== "provider-authored" ||
        typeof own(review, "hasFindings") !== "boolean" ||
        typeof own(review, "unresolvedFindings") !== "boolean"))))
    return invalid("MALFORMED_CURRENT_REVIEW");
  for (let i = 0; i < current.length; i++) {
    for (let j = i + 1; j < current.length; j++) {
      if (own(current[i], "id") === own(current[j], "id")) return invalid("DUPLICATE_REVIEW_ID");
    }
  }
  const dismissed = nativeSome(current, (review) => own(review, "dismissed") === true);
  if (dismissed) return result("HOLD_FINDINGS", "REVIEW_DISMISSED");

  const terminal = nativeFilter(current, (review) => own(review, "state") === "completed" &&
    own(review, "source") === "provider-authored" &&
    typeof own(review, "hasFindings") === "boolean" &&
    typeof own(review, "unresolvedFindings") === "boolean");

  if (nativeSome(terminal, (review) => own(review, "hasFindings") || own(review, "unresolvedFindings")) ||
      observed.unresolvedThreads > 0)
    return result("HOLD_FINDINGS", "OPEN_REVIEW_FINDINGS");
  if (!terminal.length) {
    // Reaction-only and missing event deliveries are never proof of PASS.
    return retry.attempt >= retry.maxAttempts
      ? result("REVIEW_STALLED", "RETRY_CEILING_REACHED")
      : result("PENDING", "BOUNDED_RECHECK_REQUIRED");
  }
  // Conflicting terminal review records cannot be resolved by arrival order.
  // Duplicate IDs were rejected pairwise in current reviews above.
  // Historical receipts on earlier heads are normal. Ignore them when the
  // authenticated-source fixture contains a current-head terminal receipt;
  // stale-only history above remains PENDING and never confers clearance.

  // Scope candidates before validating their provenance: malformed duplicates
  // must not disappear from the candidate set and falsely confer readiness.
  const trustedChecks = nativeFilter(observed.checks, (check) => check &&
    check.name === "Verify" && check.appId === policy.checkAppId &&
    sameSha(check.headSha, policy.headSha));
  // No ambiguity about the single explicitly scoped required run.
  if (trustedChecks.length !== 1)
    return invalid("TRUSTED_UNIQUE_CI_RUN_MISSING");
  if (trustedChecks[0].workflowPath !== policy.workflowPath ||
      !sameSha(trustedChecks[0].workflowRevision, policy.workflowRevision) ||
      !safeId(trustedChecks[0].runId) || !safeId(trustedChecks[0].attempt))
    return invalid("INVALID_VERIFY_PROVENANCE");
  if (nativeSome(trustedChecks, (check) => check.status !== "completed" ||
      check.conclusion !== "success"))
    return result("HOLD_FINDINGS", "REQUIRED_CI_NOT_SUCCESSFUL");
  // A terminal bot receipt can precede delayed inline findings. Require a
  // second, strictly later source read after the receipt; absence is PENDING.
  const reads = observed.postReceiptReads;
  if (!stableArrayIsArray(reads) || reads.length !== 2)
    return result("PENDING", "SETTLING_RECHECK_REQUIRED");
  const first = reads[0], second = reads[1];
  if (!first || !second || !safeId(first.generation) ||
      !safeId(second.generation) || second.generation <= first.generation ||
      !sameSha(first.headSha, policy.headSha) ||
      !sameSha(second.headSha, policy.headSha) ||
      first.afterReceipt !== true || second.afterReceipt !== true ||
      !nativeSome(terminal, (review) => own(review, "id") === first.receiptId &&
        own(review, "id") === second.receiptId) ||
      second.reviewThreadReadComplete !== true ||
      second.checkReadComplete !== true ||
      second.unresolvedThreads !== observed.unresolvedThreads)
    return invalid("SETTLING_EVIDENCE_INCOMPLETE");
  // Even this positive fixture is not independent acceptance or permission.
  return result("READY_FOR_SPONSOR_DECISION", "OFFLINE_ONLY_SOURCE_RECHECK_REQUIRED");
}
