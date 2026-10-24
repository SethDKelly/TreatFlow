import test from "node:test";
import assert from "node:assert/strict";
import { evaluateProviderAttempt } from "./receipt.mjs";

const SHA = "a".repeat(40);
const attempt = () => ({
  schemaVersion: 1, repository: "SethDKelly/TreatFlow", pullRequest: 120,
  headSha: SHA, provider: "codex", purpose: "standard", attemptId: "test-1",
  dispatch: {
    mechanism: "github-comment", requestUrl: "https://github.com/example/request",
    requestedAt: "2026-10-22T04:00:00Z",
  },
  receipt: {
    source: "provider-authored", sourceUrl: "https://github.com/example/review",
    reviewedSha: SHA, observedAt: "2026-10-22T04:01:00Z", verdict: "PASS",
  },
});
const source = () => ({
  authenticated: true, repository: "SethDKelly/TreatFlow", pullRequest: 120,
  provider: "codex", sourceUrl: "https://github.com/example/review",
  reviewedSha: SHA, verdict: "PASS",
});
function hold(a = attempt(), s = source(), reason) {
  const result = evaluateProviderAttempt(a, s);
  assert.equal(result.state, "HOLD");
  assert.equal(result.canApprove, false);
  assert.equal(result.canMerge, false);
  assert.equal(result.canDispatch, false);
  assert.equal(Object.isFrozen(result), true);
  if (reason) assert.equal(result.reason, reason);
  return result;
}

test("matching caller-forged source is never authenticated", () => {
  hold(attempt(), source(), "UNVERIFIED_PROVIDER_SOURCE");
  hold(attempt(), { authenticated: true }, "UNVERIFIED_PROVIDER_SOURCE");
  hold(attempt(), { authenticated: false }, "UNVERIFIED_PROVIDER_SOURCE");
});
test("missing receipt fails closed at the intended gate", () => {
  const a = attempt(); delete a.receipt;
  hold(a, source(), "RECEIPT_MISSING");
});
test("invalid SHA fails attempt validation", () => {
  const a = attempt(); a.headSha = "not-a-sha";
  hold(a, source(), "INVALID_ATTEMPT");
});
test("equivalent uppercase and lowercase SHA spellings reach provenance HOLD", () => {
  const a = attempt(); a.headSha = "A".repeat(40);
  hold(a, source(), "UNVERIFIED_PROVIDER_SOURCE");
  a.headSha = SHA; a.receipt.reviewedSha = "A".repeat(40);
  hold(a, source(), "UNVERIFIED_PROVIDER_SOURCE");
});
test("mismatched reviewed SHA is rejected before provenance", () => {
  const a = attempt(); a.receipt.reviewedSha = "b".repeat(40);
  hold(a, source(), "SOURCE_MISMATCH");
});
test("unknown provider fails the provider allowlist", () => {
  const a = attempt(); a.provider = "attacker";
  hold(a, source(), "INVALID_ATTEMPT");
});
test("provider-purpose mismatches reject in both directions", () => {
  const a = attempt(); a.provider = "cursor-agent";
  hold(a, source(), "PROVIDER_PURPOSE_MISMATCH");
  const b = attempt(); b.purpose = "targeted-adversarial";
  hold(b, source(), "PROVIDER_PURPOSE_MISMATCH");
});
test("known non-PASS verdicts remain unverified and non-authoritative", () => {
  for (const verdict of ["FINDINGS", "ERROR", "UNKNOWN"]) {
    const a = attempt(); a.receipt.verdict = verdict;
    hold(a, source(), "UNVERIFIED_PROVIDER_SOURCE");
  }
});
test("unknown verdict is rejected by receipt validation", () => {
  const a = attempt(); a.receipt.verdict = "NOT_A_VERDICT";
  hold(a, source(), "INVALID_RECEIPT");
});
test("duplicate receipt array cannot be a record", () => {
  const a = attempt(); a.receipt = [a.receipt, a.receipt];
  hold(a, source(), "INVALID_RECEIPT");
});
test("inherited fields never substitute for own evidence", () => {
  const a = attempt(); delete a.provider;
  Object.prototype.provider = "codex";
  try { hold(a, source(), "INVALID_ATTEMPT"); }
  finally { delete Object.prototype.provider; }
});
test("accessors are rejected without execution", () => {
  const a = attempt(); let calls = 0;
  Object.defineProperty(a, "provider", {
    enumerable: true, get() { calls++; return "codex"; },
  });
  hold(a, source(), "INVALID_RECORD");
  assert.equal(calls, 0);
});
test("top-level and nested proxies are rejected without traps", () => {
  let calls = 0;
  const trap = { get() { calls++; throw Error("proxy getter"); } };
  hold(new Proxy(attempt(), trap), source(), "INVALID_RECORD");
  const a = attempt(); a.dispatch = new Proxy(a.dispatch, trap);
  hold(a, source(), "INVALID_RECORD");
  assert.equal(calls, 0);
});
test("malformed UTC-Z timestamps reject at the attempt gate", () => {
  for (const value of [
    "0Z", "2026-1-1Z", "2026-02-30T00:00:00Z",
    "2026-02-29T00:00:00Z", "1900-02-29T00:00:00Z",
    "2026-04-31T00:00:00Z", "2026-10-22T24:00:00Z",
    "2026-10-22T04:00:60Z", "2026-10-22 04:00:00Z",
    "2026-10-22T04:00:00-04:00", "2026-10-22T04:00:00z",
    "2026-10-22T04:00:00.1234567890Z",
  ]) {
    const a = attempt(); a.dispatch.requestedAt = value;
    hold(a, source(), "INVALID_ATTEMPT");
  }
});
test("malformed receipt timestamps reject at the receipt gate", () => {
  const a = attempt(); a.receipt.observedAt = "2026-02-30T04:00:00Z";
  hold(a, source(), "INVALID_RECEIPT");
});
test("valid leap days and nine-digit fractions reach the provenance boundary", () => {
  for (const year of [2024, 2000]) {
    const a = attempt();
    a.dispatch.requestedAt = year + "-02-29T04:00:00.123456789Z";
    a.receipt.observedAt = year + "-02-29T04:00:00.123456790Z";
    hold(a, source(), "UNVERIFIED_PROVIDER_SOURCE");
  }
});
test("earlier whole-second observation rejects stale receipt", () => {
  const a = attempt(); a.receipt.observedAt = "2026-10-22T03:59:59Z";
  hold(a, source(), "SOURCE_MISMATCH");
});
test("sub-millisecond ordering rejects earlier observation", () => {
  const a = attempt();
  a.dispatch.requestedAt = "2026-10-22T04:00:00.0009Z";
  a.receipt.observedAt = "2026-10-22T04:00:00.0001Z";
  hold(a, source(), "SOURCE_MISMATCH");
  a.dispatch.requestedAt = "2026-10-22T04:00:00.1009Z";
  a.receipt.observedAt = "2026-10-22T04:00:00.1001Z";
  hold(a, source(), "SOURCE_MISMATCH");
});
test("later fractional observation reaches provenance gate", () => {
  const a = attempt();
  a.receipt.observedAt = "2026-10-22T04:00:00.1Z";
  hold(a, source(), "UNVERIFIED_PROVIDER_SOURCE");
  a.dispatch.requestedAt = "2026-10-22T04:00:00.0001Z";
  a.receipt.observedAt = "2026-10-22T04:00:00.0009Z";
  hold(a, source(), "UNVERIFIED_PROVIDER_SOURCE");
});
test("equivalent fractional timestamp representations are not stale", () => {
  const a = attempt();
  a.dispatch.requestedAt = "2026-10-22T04:00:00.1Z";
  a.receipt.observedAt = "2026-10-22T04:00:00.100000000Z";
  hold(a, source(), "UNVERIFIED_PROVIDER_SOURCE");
});
test("post-import intrinsic mutation cannot forge outcome", () => {
  const originals = {
    freeze: Object.freeze, has: Set.prototype.has, test: RegExp.prototype.test,
    exec: RegExp.prototype.exec, parse: Date.parse, includes: Array.prototype.includes,
    weakDelete: WeakSet.prototype.delete, lower: String.prototype.toLowerCase,
  };
  let result;
  try {
    Object.freeze = x => x;
    Set.prototype.has = () => true;
    RegExp.prototype.test = () => true;
    RegExp.prototype.exec = () => null;
    Date.parse = () => NaN;
    Array.prototype.includes = () => true;
    WeakSet.prototype.delete = () => { throw Error("poison"); };
    String.prototype.toLowerCase = () => { throw Error("poison"); };
    result = evaluateProviderAttempt(attempt(), source());
  } finally {
    Object.freeze = originals.freeze;
    Set.prototype.has = originals.has;
    RegExp.prototype.test = originals.test;
    RegExp.prototype.exec = originals.exec;
    Date.parse = originals.parse;
    Array.prototype.includes = originals.includes;
    WeakSet.prototype.delete = originals.weakDelete;
    String.prototype.toLowerCase = originals.lower;
  }
  assert.equal(result.state, "HOLD");
  assert.equal(result.reason, "UNVERIFIED_PROVIDER_SOURCE");
  assert.equal(Object.isFrozen(result), true);
  assert.equal(result.canMerge, false);
});
test("post-import global WeakSet replacement is inert", () => {
  const original = globalThis.WeakSet;
  let result;
  try {
    globalThis.WeakSet = class { constructor() { throw Error("poison"); } };
    result = evaluateProviderAttempt(attempt(), source());
  } finally { globalThis.WeakSet = original; }
  assert.equal(result.reason, "UNVERIFIED_PROVIDER_SOURCE");
  assert.equal(Object.isFrozen(result), true);
});

test("shared-object graph expansion is bounded and fails closed", () => {
  let shared = {leaf: "value"};
  for (let i = 0; i < 22; i++) shared = {left: shared, right: shared};
  const a = attempt(); a.extra = shared;
  hold(a, source(), "INVALID_RECORD");
});
test("excessively deep nested input fails closed", () => {
  let nested = {leaf: "value"};
  for (let i = 0; i < 40; i++) nested = {next: nested};
  const a = attempt(); a.extra = nested;
  hold(a, source(), "INVALID_RECORD");
});

/*
 * S-77 Gate A: preparatory parser/provenance negative controls only.
 * These tests do NOT establish authenticated conflicting-receipt adjudication,
 * measured quota/reset behavior, or S-78 cross-provider retry semantics.
 */
test("contradictory PASS/FINDINGS receipt arrays fail closed at the parser boundary", () => {
  const a = attempt();
  a.receipt = [
    { ...a.receipt, verdict: "PASS" },
    { ...a.receipt, verdict: "FINDINGS" },
  ];
  hold(a, source(), "INVALID_RECEIPT");
});

test("contradictory reviewed-head receipt arrays cannot bypass record validation", () => {
  const a = attempt();
  a.receipt = [
    { ...a.receipt, reviewedSha: SHA },
    { ...a.receipt, reviewedSha: "b".repeat(40) },
  ];
  hold(a, source(), "INVALID_RECEIPT");
});

test("caller-forged quota and rate-limit reset claims cannot authenticate a receipt", () => {
  const s = source();
  s.quota = { state: "AVAILABLE", resetAt: "2026-10-22T04:00:00Z" };
  s.rateLimit = { limited: false, observedBy: "provider", resetVerified: true };
  hold(attempt(), s, "UNVERIFIED_PROVIDER_SOURCE");
});

test("caller-forged fallback and provider-switch metadata cannot authenticate a receipt", () => {
  const s = source();
  s.provider = "cursor-bugbot";
  s.fallback = { from: "codex", to: "cursor-bugbot", verified: true };
  s.authenticated = true;
  hold(attempt(), s, "UNVERIFIED_PROVIDER_SOURCE");
});

test("stale head remains rejected despite forged quota and fallback metadata", () => {
  const a = attempt();
  a.receipt.reviewedSha = "b".repeat(40);
  const s = source();
  s.quota = { state: "AVAILABLE", verified: true };
  s.fallback = { from: "codex", to: "cursor-agent", verified: true };
  hold(a, s, "SOURCE_MISMATCH");
});

test("Bugbot-labelled caller source remains unverified even with matching provider", () => {
  const a = attempt();
  a.provider = "cursor-bugbot";
  const s = source();
  s.provider = "cursor-bugbot";
  s.authenticated = true;
  hold(a, s, "UNVERIFIED_PROVIDER_SOURCE");
});

// Deliberately NOT_TESTED: these require separately qualified contracts/actors.
// TODOs are not passing coverage or S-77 exit evidence.
test.todo("NOT_TESTED: adjudicate contradictory independently authenticated receipts across attempts");
test.todo("NOT_TESTED: measure provider quota cooldown, reset and rate-limit retry outcomes");
test.todo("NOT_TESTED: S-78 cross-provider retry/switch and verified alternate selection");
