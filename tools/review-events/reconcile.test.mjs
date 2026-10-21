import test from "node:test";
import assert from "node:assert/strict";
import { normalizeWakeHint, coalesceWakeHints, reconcileOffline } from "./reconcile.mjs";

const SHA = "a".repeat(40);
const WF = "b".repeat(40);
const BASE = {
  policy: { repositoryId: 75, prNumber: 116, headSha: SHA, reviewerAppId: 23, checkAppId: 15368, workflowRevision: WF,
    workflowPath: ".github/workflows/ci.yml" },
  observed: {
    readStatus: "complete",
    pr: { repositoryId: 75, number: 116, headSha: SHA },
    reviews: [{ id: 1, appId: 23, source: "provider-authored", commitSha: SHA,
      state: "completed", hasFindings: false, unresolvedFindings: false }],
    checks: [{ name: "Verify", appId: 15368, headSha: SHA, workflowRevision: WF,
      workflowPath: ".github/workflows/ci.yml", runId: 123456, attempt: 1,
      status: "completed", conclusion: "success" }],
    unresolvedThreads: 0,
    postReceiptReads: [
      { generation: 10, afterReceipt: true, headSha: SHA, receiptId: 1 },
      { generation: 11, afterReceipt: true, headSha: SHA, receiptId: 1,
        reviewThreadReadComplete: true, checkReadComplete: true, unresolvedThreads: 0 },
    ],
  },
  retry: { attempt: 0, maxAttempts: 3 },
};
const make = () => structuredClone(BASE);
const checkSafe = (result) => {
  assert.equal(result.mode, "OFFLINE_SYNTHETIC_UNATTESTED");
  for (const key of ["canApprove", "canWrite", "canDispatch", "canMerge"]) {
    assert.equal(result[key], false, key);
  }
  assert.equal(Object.isFrozen(result), true);
};
const verdict = (state, customize) => {
  const fixture = make();
  customize?.(fixture);
  const got = reconcileOffline(fixture);
  assert.equal(got.state, state, got.reason);
  checkSafe(got);
};
const hint = (overrides = {}) => ({
  event: "pull_request_review", action: "submitted", repositoryId: 75,
  prNumber: 116, deliveryId: "gh_123", ...overrides,
});

test("clean current head + exact Verify is advisory only", () =>
  verdict("READY_FOR_SPONSOR_DECISION"));

test("review submitted before summary / findings: bounded PENDING", () =>
  verdict("PENDING", (f) => { f.observed.reviews = [{ id: 1, appId: 23, state: "commented", commitSha: SHA }]; }));

test("reaction-only clean review never completes", () =>
  verdict("PENDING", (f) => { f.observed.reviews = []; }));

test("missing delivery reaches stalled state at bounded retry ceiling", () =>
  verdict("REVIEW_STALLED", (f) => {
    f.observed.reviews = [];
    f.retry.attempt = f.retry.maxAttempts;
  }));

test("missing authenticated source read is unknown", () =>
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.readStatus = "forbidden"; }));

test("wrong repository or PR fails", () => {
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.pr.repositoryId = 76; });
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.pr.number = 117; });
});

test("new head invalidates previous positive outcome", () =>
  verdict("STALE_HEAD", (f) => { f.observed.pr.headSha = "c".repeat(40); }));

test("older-head clean receipt without current receipt is pending, not approved", () =>
  verdict("PENDING", (f) => { f.observed.reviews[0].commitSha = "c".repeat(40); }));

test("falsified Codex marker from wrong app/user never completes", () =>
  verdict("PENDING", (f) => { f.observed.reviews[0].appId = 999; }));

test("user-authored response and reaction cannot impersonate the provider", () =>
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.reviews[0].source = "issue-comment"; }));

test("real finding blocks even if Verify succeeds", () =>
  verdict("HOLD_FINDINGS", (f) => { f.observed.reviews[0].hasFindings = true; }));

test("new unresolved thread blocks even with a clean bot summary", () =>
  verdict("HOLD_FINDINGS", (f) => { f.observed.unresolvedThreads = 1; }));

test("dismissal makes the previous review unsafe", () =>
  verdict("HOLD_FINDINGS", (f) => { f.observed.reviews[0].dismissed = true; }));

test("wrong check app, stale SHA and mismatched workflow revision all hold", () => {
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.checks[0].appId = 99; });
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.checks[0].headSha = "c".repeat(40); });
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.checks[0].workflowRevision = "c".repeat(40); });
});

test("failed or in-progress CI is not review clearance", () => {
  verdict("HOLD_FINDINGS", (f) => { f.observed.checks[0].conclusion = "failure"; });
  verdict("HOLD_FINDINGS", (f) => { f.observed.checks[0].status = "queued"; });
});

test("missing/ambiguous facts do not become PASS", () => {
  verdict("INSUFFICIENT_EVIDENCE", (f) => { delete f.observed.unresolvedThreads; });
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.checks = null; });
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.policy.headSha = "head"; });
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.retry.maxAttempts = 1000000; });
});

test("duplicate provider review IDs cannot be double-counted", () =>
  verdict("INSUFFICIENT_EVIDENCE", (f) => {
    f.observed.reviews.push(structuredClone(f.observed.reviews[0]));
  }));

test("late older-head receipt does not undo an independently observed current-head clean review", () =>
  verdict("READY_FOR_SPONSOR_DECISION", (f) => {
    f.observed.reviews.unshift({ id: 99, appId: 23, source: "provider-authored",
      commitSha: "c".repeat(40), state: "completed",
      hasFindings: false, unresolvedFindings: false });
  }));

test("terminal clean receipt does not bypass missing settling read", () =>
  verdict("PENDING", (f) => { f.observed.postReceiptReads = []; }));

test("post-receipt reads must advance monotonically on the exact head", () => {
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.postReceiptReads[1].generation = 9; });
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.postReceiptReads[1].headSha = "c".repeat(40); });
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.postReceiptReads[1].receiptId = 22; });
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.postReceiptReads[1].reviewThreadReadComplete = false; });
});

test("late inline P2 invalidates previously clean evidence", () =>
  verdict("HOLD_FINDINGS", (f) => {
    f.observed.unresolvedThreads = 1;
    f.observed.postReceiptReads[1].unresolvedThreads = 1;
  }));

test("only one configured workflow run with valid path/attempt is trusted", () => {
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.checks[0].workflowPath = ".github/workflows/other.yml"; });
  verdict("INSUFFICIENT_EVIDENCE", (f) => { delete f.observed.checks[0].runId; });
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.checks[0].attempt = 0; });
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.checks.push(structuredClone(f.observed.checks[0])); });
});

test("oversized and sparse review/check collections fail before traversal", () => {
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.reviews = Array(4294967294); });
  verdict("INSUFFICIENT_EVIDENCE", (f) => { f.observed.checks = Array(257).fill(f.observed.checks[0]); });
});

test("malicious Proxy input is rejected before side-effectful trap access", () => {
  let traps = 0;
  const evil = new Proxy(make(), {
    get(target, key) { traps++; return Reflect.get(target, key); },
    ownKeys(target) { traps++; return Reflect.ownKeys(target); },
    getPrototypeOf(target) { traps++; return Reflect.getPrototypeOf(target); },
  });
  const got = reconcileOffline(evil);
  assert.equal(got.state, "INSUFFICIENT_EVIDENCE");
  assert.equal(traps, 0);
  checkSafe(got);
});

test("review event is only a wake hint with no approval capability", () => {
  const got = normalizeWakeHint(hint(), BASE.policy);
  assert.equal(got.state, "WAKE_RECONCILIATION");
  checkSafe(got);
});

test("untrusted source / wrong target cannot trigger accepted wake", () => {
  for (const e of [
    hint({ event: "issue_comment", action: "created" }),
    hint({ repositoryId: 999 }),
    hint({ prNumber: 20 }),
    hint({ deliveryId: "" }),
    hint({ event: "push", action: "created" }),
    hint({ event: "pull_request_review", action: "approved" }),
  ]) {
    const got = normalizeWakeHint(e, BASE.policy);
    assert.equal(got.state, "INSUFFICIENT_EVIDENCE");
    checkSafe(got);
  }
  assert.equal(normalizeWakeHint(hint({ event: "issue_comment", action: "edited", isPullRequest: true }), BASE.policy).state, "WAKE_RECONCILIATION");
});

test("duplicate and out-of-order hints are coalesced but never adjudicate", () => {
  const got = coalesceWakeHints([
    hint({ deliveryId: "second" }), hint({ deliveryId: "first" }),
    hint({ deliveryId: "second" }), hint({ deliveryId: "bad", repositoryId: 77 }),
  ], BASE.policy);
  assert.deepEqual(got, { accepted: 2, duplicates: 1, rejected: 1, needsRecheck: true });
});

test("no webhook event still requires bounded reconciliation", () => {
  assert.deepEqual(coalesceWakeHints([], BASE.policy),
    { accepted: 0, duplicates: 0, rejected: 0, needsRecheck: true });
  verdict("READY_FOR_SPONSOR_DECISION");
});

test("adversarially large or malformed event batches never cause dispatch", () => {
  const got = coalesceWakeHints(Array(257).fill(hint()), BASE.policy);
  assert.equal(got.needsRecheck, true);
  assert.equal(got.accepted, 0);
});


test("malformed duplicate Verify cannot be filtered into readiness", () => {
  verdict("INSUFFICIENT_EVIDENCE", (f) => {
    const duplicate = structuredClone(f.observed.checks[0]);
    delete duplicate.runId;
    delete duplicate.attempt;
    duplicate.conclusion = "failure";
    f.observed.checks.push(duplicate);
  });
});


test("malformed same-head duplicate receipt cannot bypass terminal validation", () => {
  verdict("INSUFFICIENT_EVIDENCE", (f) => {
    f.observed.reviews.push({ id: 1, appId: 23, source: "provider-authored",
      commitSha: SHA, state: "completed", hasFindings: true });
  });
});

test("nonstandard array prototype cannot fabricate a terminal review", () => {
  const f = make();
  f.observed.reviews = [];
  Object.setPrototypeOf(f.observed.reviews, { filter() { return [BASE.observed.reviews[0]]; } });
  const got = reconcileOffline(f);
  assert.equal(got.state, "INSUFFICIENT_EVIDENCE");
  checkSafe(got);
});

test("mutated array push cannot fabricate detached review evidence", () => {
  const original = Array.prototype.push;
  const fixture = make();
  fixture.observed.reviews[0].hasFindings = true;
  try {
    Array.prototype.push = function(value) { if (value && typeof value === "object" && value.hasFindings === true) return this.length; return Reflect.apply(original, this, [value]); };
    const got = reconcileOffline(fixture);
    assert.notEqual(got.state, "READY_FOR_SPONSOR_DECISION");
    checkSafe(got);
  } finally { Array.prototype.push = original; }
});

test("mutated SHA case normalizer cannot fabricate matching review head", () => {
  const original = String.prototype.toLowerCase;
  const fixture = make();
  fixture.observed.pr.headSha = "c".repeat(40);
  try {
    String.prototype.toLowerCase = function() { return SHA; };
    const got = reconcileOffline(fixture);
    assert.notEqual(got.state, "READY_FOR_SPONSOR_DECISION");
    checkSafe(got);
  } finally { String.prototype.toLowerCase = original; }
});

test("mutated RegExp.test cannot qualify invalid SHA provenance", () => {
  const original = RegExp.prototype.test;
  const f = make();
  f.policy.headSha = "not-a-sha";
  f.observed.pr.headSha = "not-a-sha";
  f.observed.reviews[0].commitSha = "not-a-sha";
  f.observed.checks[0].headSha = "not-a-sha";
  for (const read of f.observed.postReceiptReads) read.headSha = "not-a-sha";
  try {
    RegExp.prototype.test = function() { return true; };
    const got = reconcileOffline(f);
    assert.notEqual(got.state, "READY_FOR_SPONSOR_DECISION");
    checkSafe(got);
  } finally { RegExp.prototype.test = original; }
});
