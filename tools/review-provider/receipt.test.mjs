import test from "node:test";
import assert from "node:assert/strict";
import { evaluateProviderAttempt } from "./receipt.mjs";
const SHA = "a".repeat(40);
const attempt = () => ({
  schemaVersion: 1, repository: "SethDKelly/TreatFlow", pullRequest: 120, headSha: SHA,
  provider: "codex", purpose: "standard", attemptId: "test-1",
  dispatch: {mechanism: "github-comment", requestUrl: "https://github.com/example/request", requestedAt: "2026-10-22T04:00:00Z"},
  receipt: {source: "provider-authored", sourceUrl: "https://github.com/example/review", reviewedSha: SHA, observedAt: "2026-10-22T04:01:00Z", verdict: "PASS"},
});
const source = () => ({authenticated: true, repository: "SethDKelly/TreatFlow", pullRequest: 120,
  provider: "codex", sourceUrl: "https://github.com/example/review", reviewedSha: SHA, verdict: "PASS"});
test("valid source receipt remains advisory only", () => {
  const result = evaluateProviderAttempt(attempt(), source());
  assert.equal(result.state, "RECEIPT_OBSERVED");
  assert.equal(result.canApprove, false);
  assert.equal(result.canMerge, false);
  assert.equal(Object.isFrozen(result), true);
});
test("missing receipt fails closed", () => {
  const a = attempt(); delete a.receipt;
  assert.equal(evaluateProviderAttempt(a, source()).state, "HOLD");
});
test("spoofed sender and stale SHA fail closed", () => {
  const s = source(); s.authenticated = false;
  assert.equal(evaluateProviderAttempt(attempt(), s).state, "HOLD");
  const a = attempt(); a.receipt.reviewedSha = "b".repeat(40);
  assert.equal(evaluateProviderAttempt(a, source()).state, "HOLD");
});
test("provider mismatch and purpose mismatch fail closed", () => {
  const a = attempt(); a.provider = "cursor-agent";
  assert.equal(evaluateProviderAttempt(a, source()).state, "HOLD");
  a.purpose = "targeted-adversarial";
  assert.equal(evaluateProviderAttempt(a, source()).state, "HOLD");
});
test("findings and quota errors never count as clean receipts", () => {
  for (const verdict of ["FINDINGS", "ERROR", "UNKNOWN"]) {
    const a = attempt(); const s = source(); a.receipt.verdict = verdict; s.verdict = verdict;
    assert.equal(evaluateProviderAttempt(a, s).state, "HOLD");
  }
});
test("duplicate receipt input cannot pass as a record", () => {
  const a = attempt(); a.receipt = [a.receipt, a.receipt];
  assert.equal(evaluateProviderAttempt(a, source()).state, "HOLD");
});
