---
type: design
status: draft
title: S-78 offline reviewer selection and HOLD model
---

# S-78 — Offline reviewer selection

This is a **pure simulation** with no GitHub dispatch, provider authentication, secret, CI status publishing, Linear writer, or merge authority. `selectOffline` produces `OFFLINE_SELECTION` or `HOLD`; **every** outcome has `canDispatch: false`, `canApprove: false`, and `canMerge: false`. A selected provider is a candidate, not a real dispatch or verified review.

The caller supplies a recorded seed, exact repository/PR/head, current time in Unix milliseconds, implementation agent, provider capability/health/cooldown/weight, and an append-only logical ledger. Repository and SHA normalization are case-insensitive; noncanonical persisted keys fail closed. Cursor Cloud Agent requires `purpose: "targeted-adversarial"`; targeted selection admits only Cloud Agent, while standard selection excludes it. Deterministic SHA-256 seeded draws and effective weights (weight divided by one plus validated historical completed-cycle count) permit replay and audit; weights never bypass eligibility. No external randomness or clock reads occur.

Manual pins require requester, reason, start and expiry, with a maximum one-hour TTL. A pin is only honored while active and if the provider remains eligible. Implementer independence, verified transport, health, provider cooldown, ledger-recorded `RATE_LIMITED.retryAfter` recovery deadline, and retry bounds always take precedence. A known unverified provider is excluded, including Cursor Bugbot unless separately qualified. Cursor Cloud Agent is distinct from Bugbot.

The ledger keys attempts by repository/PR/exact head. Pending attempts HOLD idempotently; failure events permit one retry of the same provider, then selection of a verified alternate, otherwise HOLD. A head change must invalidate old evidence; `invalidateHead(ledger, repository, pr, newHeadSha, now)` requires an explicit nonnegative Unix-millisecond `now` (missing or invalid time fails closed), retains current-head attempts and validated completed-cycle records for rotation, and retains only unexpired rate-limit recovery evidence for the same repository/PR, while discarding stale incomplete attempts. Attempt 2 requires a recorded terminal failure of attempt 1. A successful invalidation returns a frozen ledger array (possibly empty). Invalid input, including missing `now`, or malformed ledger history instead returns a frozen `{state: "HOLD", reason: "INVALID_INPUT" | "INVALID_LEDGER", canDispatch: false, canApprove: false, canMerge: false}` result **without a `ledger` property**. Callers must branch on `Array.isArray(result)` before persisting any ledger; a HOLD is not an empty history or permission to retry. Passing the HOLD result (or its missing `.ledger`) to `selectOffline` fails input validation. Function-valued evidence is rejected during descriptor-safe copying without invoking function getters. Provider receipts still require S-77's independently authenticated source observation and S-75 security clearance, not this selector. Offline tests run under `npm run test:review-provider` in CI.

**Deferred:** persistent cross-process ledger storage, concurrency fencing, secure actor identity, real provider qualification and dispatch, live webhook intake, status writes, and S-75 permission activation. This is an initial design and executable test baseline, not S-78 exit.


## 2026-10-23 intrinsic-hardening gate

The offline engine captures `Object.create`, `Object.hasOwn`, `Math.max`, Map/Set size getters, `Number.parseInt`, and string slicing at module initialization. Adversarial tests mutate these ambient intrinsics after import and verify fail-closed eligibility, pending-ledger handling, cooldown enforcement, and deterministic draws. This is a bounded mitigation, not proof of comprehensive runtime-intrinsic immunity; further independent review must evaluate remaining mutable operations and runtime assumptions. PR #121 stays Draft/HOLD until exact-head CI and independent Codex/Cursor reviews pass. No live dispatch or privileged cloud operations are authorized.


## 2026-10-23 array-iterator ledger integrity remediation

Selection appends a new REQUESTED event by copying the validated ledger with the captured `Array.prototype.map` binding, not with iterable spread. The adversarial regression poisons `Array.prototype[Symbol.iterator]` after module initialization and asserts the complete three-event request/failure/retry history is preserved. This is not an independent review verdict. Require green CI and fresh exact-head Codex and Cursor reviews before changing Draft/HOLD or considering merge eligibility.


## 2026-10-23 iterator/species and retention hardening

Provider uniqueness uses indexed traversal rather than the ambient array iterator. Internal map/filter copies are indexed and do not consult mutable `Array[Symbol.species]`; the returned append-only ledger is copied by index. Collection constructors are captured before any caller-controlled evidence is evaluated. Canonical ledger and draw tuples serialize individual primitives, avoiding array `toJSON` hooks. Head invalidation now requires caller-supplied `now` to prune expired recovery evidence and excludes rate limits from unrelated repository/PR identities. These changes are bounded offline protections, not permission to dispatch, approve, or merge. Fresh exact-head CI and independent reviews remain mandatory.


## 2026-10-23 function evidence and invalidation-result safety

Independent Codex review on exact head `f710ea6fa2a5ffa6922d0f9f75c38d28af36bea3` identified function-valued evidence bypassing object-descriptor checks and an ambiguous empty-array invalidation failure. The offline copier now rejects functions before inspecting their properties. `invalidateHead` now returns a discriminated HOLD object (no usable ledger) for invalid arguments or malformed history; only an actual array represents successful invalidation. Callers must refuse to persist or dispatch from HOLD, even when a successful invalidation would also yield an empty array. Added tests cover hostile function getters, invalidation failure propagation, and successful empty-history distinction. These corrections require fresh exact-head CI and independent review before S-78 exit.

## 2026-10-23 inherited-ledger invalidation HOLD hardening

Exact-head Codex and Cursor reviews of `2b6f11b542fb8fefceb75b7ba7581d4533bd914d` both returned HOLD: an ordinary-object invalidation failure could inherit `Object.prototype.ledger`, allowing a caller reading `result.ledger` to persist an attacker-supplied empty array and erase pending or rate-limit evidence. The failure result now uses a frozen null-prototype object with no `ledger` property, inherited or own. A targeted regression poisons `Object.prototype.ledger`, checks that invalidation failure cannot supply a ledger, and verifies that correctly invalidated future cooldown evidence still blocks offline selection. This correction is not independent approval; require green CI and fresh Codex/Cursor exact-head verdicts. PR #121 remains Draft/HOLD, with no live dispatch, merge, or privileged infrastructure authorization.
