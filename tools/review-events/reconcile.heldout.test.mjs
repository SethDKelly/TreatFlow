// S-42 held-out PREPARATION: contract-derived synthetic source scenarios.
// These fixtures are authored separately from PR #127's implementation batch,
// but are NOT independent post-merge execution or authenticated source evidence.
// No network, credentials, provider dispatch, or operational authority.
import test from "node:test";
import assert from "node:assert/strict";
import { reconcileOffline, normalizeWakeHint } from "./reconcile.mjs";

const HEAD = "a".repeat(40);
const OLD = "c".repeat(40);
const WORKFLOW = "b".repeat(40);
const clean = () => ({
  id: 10, appId: 23, source: "provider-authored", commitSha: HEAD,
  state: "completed", hasFindings: false, unresolvedFindings: false,
});
const negative = (id, state, changes = {}) => ({
  id, appId: 23, source: "provider-authored", commitSha: HEAD, state, ...changes,
});
const fixture = () => ({
  policy: {
    repositoryId: 75, prNumber: 116, headSha: HEAD, reviewerAppId: 23,
    checkAppId: 15368, workflowRevision: WORKFLOW,
    workflowPath: ".github/workflows/ci.yml",
  },
  observed: {
    readStatus: "complete",
    pr: { repositoryId: 75, number: 116, headSha: HEAD },
    reviews: [clean()],
    checks: [{
      name: "Verify", appId: 15368, headSha: HEAD,
      workflowRevision: WORKFLOW, workflowPath: ".github/workflows/ci.yml",
      runId: 123456, attempt: 1, status: "completed", conclusion: "success",
    }],
    unresolvedThreads: 0,
    postReceiptReads: [
      { generation: 20, afterReceipt: true, headSha: HEAD, receiptId: 10 },
      {
        generation: 21, afterReceipt: true, headSha: HEAD, receiptId: 10,
        reviewThreadReadComplete: true, checkReadComplete: true,
        unresolvedThreads: 0,
      },
    ],
  },
  retry: { attempt: 0, maxAttempts: 3 },
});

function expectAdvisory(input, state, reason) {
  const actual = reconcileOffline(input);
  assert.equal(actual.state, state, JSON.stringify(actual));
  if (reason) assert.equal(actual.reason, reason);
  assert.equal(actual.mode, "OFFLINE_SYNTHETIC_UNATTESTED");
  for (const key of ["canApprove", "canWrite", "canDispatch", "canMerge"]) {
    assert.equal(actual[key], false, key);
  }
  assert.equal(Object.isFrozen(actual), true);
}

test("held-out control: clean current-head source remains advisory only", () => {
  expectAdvisory(fixture(), "READY_FOR_SPONSOR_DECISION");
});

for (const state of ["dismissed", "DISMISSED", "changes_requested", "CHANGES_REQUESTED"]) {
  test(`held-out: ${state} is a veto despite a distinct clean receipt, regardless of arrival order`, () => {
    for (const reverse of [false, true]) {
      const f = fixture();
      f.observed.reviews = reverse
        ? [negative(11, state), clean()]
        : [clean(), negative(11, state)];
      expectAdvisory(f, "HOLD_FINDINGS", "NEGATIVE_REVIEW_STATE");
    }
  });
}

test("held-out: negative current-head receipt without any clean receipt cannot imply completion", () => {
  const f = fixture();
  f.observed.reviews = [negative(11, "dismissed")];
  expectAdvisory(f, "HOLD_FINDINGS", "NEGATIVE_REVIEW_STATE");
});

test("held-out: late prior-head negative and wrong-app negative cannot veto current-head clean evidence", () => {
  const f = fixture();
  f.observed.reviews = [
    negative(11, "CHANGES_REQUESTED", { commitSha: OLD }),
    clean(),
    negative(12, "dismissed", { appId: 999 }),
  ];
  expectAdvisory(f, "READY_FOR_SPONSOR_DECISION");
});

test("held-out: a stale current PR head invalidates every previously observed receipt", () => {
  const f = fixture();
  f.observed.reviews.push(negative(11, "dismissed"));
  f.observed.pr.headSha = OLD;
  expectAdvisory(f, "STALE_HEAD", "HEAD_CHANGED_REEVALUATE_POLICY");
});

test("held-out: duplicate review identity is insufficient, never accepted as clean", () => {
  const f = fixture();
  f.observed.reviews.push(negative(10, "changes_requested"));
  expectAdvisory(f, "INSUFFICIENT_EVIDENCE", "DUPLICATE_REVIEW_ID");
});

test("held-out: incomplete source read cannot be repaired by a negative or positive receipt", () => {
  const f = fixture();
  f.observed.reviews.push(negative(11, "dismissed"));
  f.observed.readStatus = "partial";
  expectAdvisory(f, "INSUFFICIENT_EVIDENCE", "SOURCE_READ_NOT_COMPLETE");
});

test("held-out: review event is only a wake hint, never an authenticated verdict", () => {
  const f = fixture();
  const result = normalizeWakeHint({
    event: "pull_request_review", action: "dismissed", repositoryId: 75,
    prNumber: 116, deliveryId: "heldout-1",
  }, f.policy);
  assert.equal(result.state, "WAKE_RECONCILIATION");
  for (const key of ["canApprove", "canWrite", "canDispatch", "canMerge"]) {
    assert.equal(result[key], false, key);
  }
});
