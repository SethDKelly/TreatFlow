# S-42 — Offline review-event completion reconciliation

This is **synthetic fixture logic only**. It is not a GitHub webhook, Actions receiver, Codex invoker, CI evidence collector, Linear status publisher, holdout verifier, or live security authorization. It makes no network, filesystem, subprocess, credential, paid-provider, AWS or status-writing calls.

## Run

`npm run test:review-events` runs the Node 22 built-in test suite. The shared integration owner wires that command into the existing `npm test` execution. CI success proves only synthetic behavior.

## Separation of duties

- `normalizeWakeHint`: accepts bounded, declared fixture event types and target IDs as **untrusted wake hints**; event contents never determine success.
- `coalesceWakeHints`: in-memory demonstration of duplicate/out-of-order signals. No persistence, source-authenticated HMAC, guarantees about event delivery, leasing or exactly-once semantics.
- `reconcileOffline`: evaluates a **caller-supplied** simulated source snapshot for exact PR head, reviewer App ID, completed provider-authored receipt, unresolved findings, a unique `Verify` workflow path/run/attempt, and two ordered post-receipt source-read generations. Missing settling evidence stays PENDING/INSUFFICIENT rather than being labeled ready. In a real system, only an independently permission-qualified authenticated source collector may supply these observations.
- Missing receipt stays `PENDING` until a bounded retry ceiling produces `REVIEW_STALLED`; a missed/reaction-only event must still get a delayed post-request recheck. No permanent polling loop is installed here.
- Even a clean synthetic snapshot yields only `READY_FOR_SPONSOR_DECISION` with `canApprove/canWrite/canDispatch/canMerge=false`; it cannot complete S-32 or S-42 without separate independent tests and sponsor authorization.

See Linear S-42 R1 event coverage, S-32 B/C contracts, S-74 independent holdout and S-75 permission/security qualification. Live event intake, trust binding, source collection, retention, delivery recovery, privileged CI context and Linear publication all remain **HOLD**.

The in-process fixture boundary rejects JavaScript Proxies, getters, cycles, overly deep/large objects and sparse or oversized evidence collections before inspecting their contents. This is input hardening for the shadow tool, **not** verification of the actual GitHub API source or clock.
