// S-42 offline-only synthetic event/review reconciler.
// No network, filesystem, credentials, webhook listener, actions, or status writes.
// All observations are caller-controlled test data, NOT authenticated evidence.
const SHA = /^[a-f0-9]{40}$/i;
const safeId = (x) => Number.isSafeInteger(x) && x > 0;
const sameSha = (a, b) => typeof a === "string" && typeof b === "string" &&
  SHA.test(a) && SHA.test(b) && a.toLowerCase() === b.toLowerCase();
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
  if (!event || !policy || typeof event !== "object" || typeof policy !== "object" ||
      typeof event.event !== "string" ||
      !Object.hasOwn(actions, event.event) ||
      !actions[event.event].includes(event.action)) return invalid("UNRECOGNIZED_SIGNAL");
  if (!safeId(event.repositoryId) || !safeId(event.prNumber) ||
      event.repositoryId !== policy.repositoryId ||
      event.prNumber !== policy.prNumber) return invalid("WRONG_TARGET");
  if (typeof event.deliveryId !== "string" ||
      !/^[A-Za-z0-9_-]{1,128}$/.test(event.deliveryId))
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
  if (!Array.isArray(events) || events.length > 256)
    return Object.freeze({ accepted: 0, duplicates: 0, rejected: 0, needsRecheck: true });
  const seen = new Set();
  let accepted = 0, duplicates = 0, rejected = 0;
  for (const event of events) {
    const normalized = normalizeWakeHint(event, policy);
    if (normalized.state !== "WAKE_RECONCILIATION") { rejected++; continue; }
    if (seen.has(event.deliveryId)) { duplicates++; continue; }
    seen.add(event.deliveryId);
    accepted++;
  }
  return Object.freeze({ accepted, duplicates, rejected, needsRecheck: true });
}

// All inputs are synthetic fixtures. In a future live integration, only a
// separate, authenticated source collector can construct observed facts;
// no event/comment payload may be substituted for those observations.
export function reconcileOffline({ policy, observed, retry } = {}) {
  if (!policy || !observed || !retry || typeof policy !== "object" ||
      typeof observed !== "object" || typeof retry !== "object")
    return invalid("MISSING_GROUP");
  if (!safeId(policy.repositoryId) || !safeId(policy.prNumber) ||
      !safeId(policy.reviewerAppId) || !safeId(policy.checkAppId) ||
      !sameSha(policy.headSha, policy.headSha) ||
      !sameSha(policy.workflowRevision, policy.workflowRevision))
    return invalid("INVALID_POLICY");
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
  if (!Array.isArray(observed.reviews) || !Array.isArray(observed.checks) ||
      !Number.isSafeInteger(observed.unresolvedThreads) ||
      observed.unresolvedThreads < 0)
    return invalid("INCOMPLETE_SOURCE_OBSERVATION");

  const current = observed.reviews.filter((review) =>
    review && safeId(review.id) &&
    review.appId === policy.reviewerAppId &&
    sameSha(review.commitSha, policy.headSha));
  const dismissed = current.some((review) => review.dismissed === true);
  if (dismissed) return result("HOLD_FINDINGS", "REVIEW_DISMISSED");

  const terminal = current.filter((review) => review.state === "completed" &&
    review.source === "provider-authored" &&
    typeof review.hasFindings === "boolean" &&
    typeof review.unresolvedFindings === "boolean");

  if (terminal.some((review) => review.hasFindings || review.unresolvedFindings) ||
      observed.unresolvedThreads > 0)
    return result("HOLD_FINDINGS", "OPEN_REVIEW_FINDINGS");
  if (!terminal.length) {
    // Reaction-only and missing event deliveries are never proof of PASS.
    return retry.attempt >= retry.maxAttempts
      ? result("REVIEW_STALLED", "RETRY_CEILING_REACHED")
      : result("PENDING", "BOUNDED_RECHECK_REQUIRED");
  }
  // Conflicting terminal review records cannot be resolved by arrival order.
  if (new Set(terminal.map((review) => review.id)).size !== terminal.length)
    return invalid("DUPLICATE_REVIEW_ID");
  if (observed.reviews.some((review) =>
      review && review.appId === policy.reviewerAppId &&
      review.state === "completed" && review.source === "provider-authored" &&
      !sameSha(review.commitSha, policy.headSha)))
    return result("STALE_HEAD", "STALE_PROVIDER_RECEIPT_PRESENT");

  const trustedChecks = observed.checks.filter((check) => check &&
    check.name === "Verify" && check.appId === policy.checkAppId &&
    sameSha(check.headSha, policy.headSha) &&
    sameSha(check.workflowRevision, policy.workflowRevision));
  if (!trustedChecks.length) return invalid("TRUSTED_EXACT_HEAD_CI_MISSING");
  if (trustedChecks.some((check) => check.status !== "completed" ||
      check.conclusion !== "success"))
    return result("HOLD_FINDINGS", "REQUIRED_CI_NOT_SUCCESSFUL");
  // Even this positive fixture is not independent acceptance or permission.
  return result("READY_FOR_SPONSOR_DECISION", "OFFLINE_ONLY_SOURCE_RECHECK_REQUIRED");
}
