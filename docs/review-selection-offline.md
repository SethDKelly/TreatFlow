---
type: design
status: draft
title: S-78 offline reviewer selection and HOLD model
---

# S-78 — Offline reviewer selection

This is a **pure simulation** with no GitHub dispatch, provider authentication, secret, CI status publishing, Linear writer, or merge authority. `selectOffline` produces `OFFLINE_SELECTION` or `HOLD`; **every** outcome has `canDispatch: false`, `canApprove: false`, and `canMerge: false`. A selected provider is a candidate, not a real dispatch or verified review.

The caller supplies a recorded seed, exact repository/PR/head, current time in Unix milliseconds, implementation agent, provider capability/health/cooldown/weight, and an append-only logical ledger. SHA normalization is case-insensitive. Deterministic SHA-256 seeded draws and effective weights (weight divided by one plus historical request count) permit replay and audit; weights never bypass eligibility. No external randomness or clock reads occur.

Manual pins require requester, reason, start and expiry, with a maximum one-hour TTL. A pin is only honored while active and if the provider remains eligible. Implementer independence, verified transport, health, cooldown, and retry bounds always take precedence. A known unverified provider is excluded, including Cursor Bugbot unless separately qualified. Cursor Cloud Agent is distinct from Bugbot.

The ledger keys attempts by repository/PR/exact head. Pending attempts HOLD idempotently; failure events permit one retry of the same provider, then selection of a verified alternate, otherwise HOLD. A head change must invalidate old evidence; `invalidateHead` retains only the current-head ledger entries. Provider receipts still require S-77's independently authenticated source observation and S-75 security clearance, not this selector. Offline tests run under `npm run test:review-provider` in CI.

**Deferred:** persistent cross-process ledger storage, concurrency fencing, secure actor identity, real provider qualification and dispatch, live webhook intake, status writes, and S-75 permission activation. This is an initial design and executable test baseline, not S-78 exit.
