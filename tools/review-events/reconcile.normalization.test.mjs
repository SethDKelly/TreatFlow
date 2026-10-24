// S-42 Gate A negative-control tests derived from independent Cursor near-miss probes.
// Offline synthetic fixtures only; NOT independently executed merged-artifact acceptance.
import test from "node:test";
import assert from "node:assert/strict";
import { reconcileOffline } from "./reconcile.mjs";

const HEAD = "a".repeat(40);
const OLD = "c".repeat(40);
const WORKFLOW = "b".repeat(40);
const clean = () => ({
  id: 10, appId: 23, source: "provider-authored", commitSha: HEAD,
  state: "completed", hasFindings: false, unresolvedFindings: false,
});
const negative = (id, changes = {}) => ({
  id, appId: 23, source: "provider-authored", commitSha: HEAD,
  state: "dismissed", ...changes,
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
      name: "Verify", appId: 15368, headSha: HEAD, workflowRevision: WORKFLOW,
      workflowPath: ".github/workflows/ci.yml", runId: 123456, attempt: 1,
      status: "completed", conclusion: "success",
    }],
    unresolvedThreads: 0,
    postReceiptReads: [
      { generation: 20, afterReceipt: true, headSha: HEAD, receiptId: 10 },
      { generation: 21, afterReceipt: true, headSha: HEAD, receiptId: 10,
        reviewThreadReadComplete: true, checkReadComplete: true, unresolvedThreads: 0 },
    ],
  },
  retry: { attempt: 0, maxAttempts: 3 },
});
function expect(input, state, reason) {
  const got = reconcileOffline(input);
  assert.equal(got.state, state, got.reason);
  if (reason) assert.equal(got.reason, reason);
  assert.equal(got.mode, "OFFLINE_SYNTHETIC_UNATTESTED");
  for (const key of ["canApprove", "canWrite", "canDispatch", "canMerge"])
    assert.equal(got[key], false, key);
  assert.equal(Object.isFrozen(got), true);
}

test("post-import String.prototype[Symbol.replace] mutation cannot suppress negative-state veto", () => {
  const original = Object.getOwnPropertyDescriptor(String.prototype, Symbol.replace);
  Object.defineProperty(String.prototype, Symbol.replace, {
    configurable: true, writable: true, value: () => "",
  });
  try {
    for (const state of ["dismissed", "changes-requested", "CHANGES_REQUESTED "]) {
      const input = fixture();
      input.observed.reviews.push(negative(11, { state }));
      expect(input, "HOLD_FINDINGS", "NEGATIVE_REVIEW_STATE");
    }
    // The adversarial mutation must not turn a clean receipt into a false HOLD.
    expect(fixture(), "READY_FOR_SPONSOR_DECISION");
  } finally {
    if (original) Object.defineProperty(String.prototype, Symbol.replace, original);
    else Reflect.deleteProperty(String.prototype, Symbol.replace);
  }
});

test("control: canonical clean receipt remains advisory only", () => {
  expect(fixture(), "READY_FOR_SPONSOR_DECISION");
});

for (const state of ["Dismissed", "changes-requested", "CHANGES_REQUESTED "]) {
  test(`near-miss state ${JSON.stringify(state)} must veto clean receipt in either order`, () => {
    for (const reverse of [false, true]) {
      const input = fixture();
      input.observed.reviews = reverse
        ? [negative(11, { state }), clean()]
        : [clean(), negative(11, { state })];
      expect(input, "HOLD_FINDINGS", "NEGATIVE_REVIEW_STATE");
    }
  });
}

test("string-typed dismissed flag on same-app current-head review is insufficient evidence", () => {
  const input = fixture();
  input.observed.reviews.push(negative(11, { state: "COMMENTED", dismissed: "true" }));
  expect(input, "INSUFFICIENT_EVIDENCE", "MALFORMED_DISMISSAL_FLAG");
});

test("string-typed same-ID reviewer app on current head is not silently ignored", () => {
  const input = fixture();
  input.observed.reviews.push(negative(11, { appId: "23", state: "Dismissed" }));
  expect(input, "INSUFFICIENT_EVIDENCE", "MALFORMED_REVIEW_IDENTITY");
});

test("control: wrong-app review cannot veto independently clean reviewer receipt", () => {
  const input = fixture();
  input.observed.reviews.push(negative(11, { appId: 999, state: "Dismissed" }));
  expect(input, "READY_FOR_SPONSOR_DECISION");
});

test("control: previous-head malformed reviewer identity cannot poison current-head clean evidence", () => {
  const input = fixture();
  input.observed.reviews.push(negative(11, { appId: "23", commitSha: OLD, state: "Dismissed" }));
  expect(input, "READY_FOR_SPONSOR_DECISION");
});

test("control: benign COMMENTED observation and explicit dismissed:false do not grant extra authority", () => {
  const input = fixture();
  input.observed.reviews.push(negative(11, { state: "COMMENTED", dismissed: false }));
  expect(input, "READY_FOR_SPONSOR_DECISION");
});
