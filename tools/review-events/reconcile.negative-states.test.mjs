// S-42 Gate A independently specified negative-state qualification fixtures.
// Offline synthetic observations only; no provider authentication or live dispatch.
import test from "node:test";
import assert from "node:assert/strict";
import { reconcileOffline } from "./reconcile.mjs";

const SHA = "a".repeat(40);
const WF = "b".repeat(40);
const clean = () => ({
  id: 1, appId: 23, source: "provider-authored", commitSha: SHA,
  state: "completed", hasFindings: false, unresolvedFindings: false,
});
const fixture = () => ({
  policy: {
    repositoryId: 75, prNumber: 116, headSha: SHA, reviewerAppId: 23,
    checkAppId: 15368, workflowRevision: WF,
    workflowPath: ".github/workflows/ci.yml",
  },
  observed: {
    readStatus: "complete",
    pr: { repositoryId: 75, number: 116, headSha: SHA },
    reviews: [clean()],
    checks: [{
      name: "Verify", appId: 15368, headSha: SHA, workflowRevision: WF,
      workflowPath: ".github/workflows/ci.yml", runId: 123456, attempt: 1,
      status: "completed", conclusion: "success",
    }],
    unresolvedThreads: 0,
    postReceiptReads: [
      { generation: 10, afterReceipt: true, headSha: SHA, receiptId: 1 },
      {
        generation: 11, afterReceipt: true, headSha: SHA, receiptId: 1,
        reviewThreadReadComplete: true, checkReadComplete: true,
        unresolvedThreads: 0,
      },
    ],
  },
  retry: { attempt: 0, maxAttempts: 3 },
});
function assertState(input, expected) {
  const result = reconcileOffline(input);
  assert.equal(result.state, expected, result.reason);
  assert.equal(result.mode, "OFFLINE_SYNTHETIC_UNATTESTED");
  for (const key of ["canApprove", "canWrite", "canDispatch", "canMerge"])
    assert.equal(result[key], false, key);
  assert.equal(Object.isFrozen(result), true);
}
function negative(id, state, commitSha = SHA) {
  return { id, appId: 23, source: "provider-authored", commitSha, state };
}

test("S-42 Gate A positive control: one clean terminal review remains advisory", () => {
  assertState(fixture(), "READY_FOR_SPONSOR_DECISION");
});

for (const state of ["dismissed", "DISMISSED", "changes_requested", "CHANGES_REQUESTED"]) {
  test(`S-42 Gate A: current-head ${state} blocks a separate clean review in either order`, () => {
    for (const reverse of [false, true]) {
      const input = fixture();
      const reviews = [clean(), negative(2, state)];
      input.observed.reviews = reverse ? reviews.reverse() : reviews;
      assertState(input, "HOLD_FINDINGS");
    }
  });
}

test("S-42 Gate A: prior-head negative review does not poison current-head clean evidence", () => {
  const input = fixture();
  input.observed.reviews.push(negative(2, "changes_requested", "c".repeat(40)));
  assertState(input, "READY_FOR_SPONSOR_DECISION");
});

test("S-42 Gate A: explicit dismissal flag blocks even if record claims completed", () => {
  const input = fixture();
  input.observed.reviews.push({ ...clean(), id: 2, dismissed: true });
  assertState(input, "HOLD_FINDINGS");
});
