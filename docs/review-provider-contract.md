---
type: design
status: draft
title: S-77 review provider contract (offline design baseline)
---

# S-77 — Review provider contract (offline design baseline)

Status: **design / offline qualification only**. The current executable evaluator always returns HOLD for caller-supplied provider sources, including matching `authenticated: true` assertions. No trusted collector capability or receipt authentication exists yet. This document is not a verified live provider adapter, authorization, CI check, or security-exit acceptance.

## Boundaries
- Standard providers: Codex and Cursor Bugbot (subject to individually verified dispatch).
- Targeted escalation: Cursor Cloud Agent invoked by `@cursoragent`, **not interchangeable** with Bugbot.
- Cursor Automations is a possible event trigger/orchestrator, **not a reviewer identity**.
- The implementing agent must not serve as the sole independent reviewer. A second adversarial review is required for security-sensitive trust-boundary changes.
- A GitHub mention is only a dispatch request. Provider-authored response with an exact-head SHA and verifiable origin is required before counting a receipt.
- No adapter can approve, merge, write deployment status, grant authorization, or mark security exit accepted.

## Normalized review attempt (v0)
A single immutable attempt is keyed by `repository + pullRequest + headSha + provider + attemptId`.

Required fields:
```json
{
  "schemaVersion": 1,
  "repository": "owner/repo",
  "pullRequest": 0,
  "headSha": "40-character hex SHA",
  "provider": "codex | cursor-bugbot | cursor-agent",
  "purpose": "standard | targeted-adversarial",
  "attemptId": "operator-assigned-unique-id",
  "dispatch": {
    "mechanism": "verified provider-specific transport",
    "requestUrl": "provider/GitHub URL",
    "requestedAt": "UTC-Z RFC3339 subset timestamp"
  },
  "receipt": {
    "source": "provider-authored authenticated observation",
    "sourceUrl": "GitHub review/comment or provider run",
    "reviewedSha": "40-character hex SHA",
    "observedAt": "UTC-Z RFC3339 subset timestamp",
    "verdict": "PASS | FINDINGS | ERROR | UNKNOWN"
  }
}
```
`receipt` is absent until verified. Text alone is never authentication; the collector must independently read trusted GitHub/provider identity and repository/head provenance. Unverified identities, mismatched SHAs, stale receipts, or missing source reads yield `UNKNOWN` / HOLD, never PASS. **A caller-provided `authenticatedSource` object is untrusted, regardless of its `authenticated` field; it cannot produce `RECEIPT_OBSERVED`.** A future S-75-qualified collector must derive provenance through an independently authenticated provider/GitHub read and a non-caller-forgeable boundary before a verified state is implemented. The executable tests are included in `npm test` and Verify CI.

## Timestamp profile (v0)
Both `requestedAt` and `observedAt` use a deliberately bounded **UTC-Z RFC 3339 subset**: `YYYY-MM-DDTHH:mm:ss[.fraction]Z`, uppercase `T` and `Z`, with **1–9 decimal digits** when a fraction is present. Numeric timezone offsets and fractions longer than nine digits are intentionally rejected; a future trusted collector must normalize such provider timestamps into this canonical profile before passing them to the evaluator. Calendar validity and full nine-digit fractional ordering are checked, so an earlier observation cannot be treated as timely merely because `Date.parse` truncates sub-millisecond precision. This narrower contract does **not** imply any provider-authenticated provenance.

## Adapter states
`NOT_CONFIGURED -> CAPABILITY_VERIFIED -> REQUESTED -> ACKNOWLEDGED -> RECEIPT_VERIFIED` or `FAILED | RATE_LIMITED | TIMED_OUT | UNKNOWN`. State transitions must be monotonic per attempt; a new commit creates a new cycle. A reaction-only receipt is not sufficient without independently established provider-specific semantics.

## Provider qualification matrix
| Provider | Dispatch candidate | Verified here | Qualification required |
| --- | --- | --- | --- |
| Codex | GitHub `@codex review` | Historical review receipts and quota errors on PRs #117/#119 | Recheck exact-head identity, quota behavior and independent verdict semantics |
| Cursor Cloud Agent | GitHub `@cursoragent` comment | GitHub `cursor[bot]` exact-head read-only HOLD receipts on PRs #117/#119 | Independently authenticate sender, provider run and receipt source; test retry/error handling |
| Cursor Bugbot | `cursor review` / `bugbot run` where enabled | **Not verified in TreatFlow** | Establish installation, actual dispatch, sender identity, completion and findings mapping |
| Cursor Automations | GitHub-triggered automation | **Not verified in TreatFlow** | Establish feature entitlement, trigger, permissions, idempotency and audit records |

## Dispatch and error policy
1. Verify provider capability, health, quota, independence, and scope before selection.
2. Record exact head and immutable request ID; send only through verified transport.
3. Collect actual source observations, not agent-authored claims about other systems.
4. On quota error mark provider unavailable until measured reset; use bounded alternate selection.
5. On missing receipt after configured timeout, retry at most once and then switch to verified alternate or HOLD.
6. Reject spoofed provider messages, wrong head, missing verdict, conflicting receipts, and late receipts after head change.
7. Keep CI, unresolved review findings, sponsor merge approval and security-exit acceptance as distinct gates.

## S-78 handoff
S-78 owns weighted selection, recorded random draw, timed override, health/cooldown, durable ledger and fail-closed transition logic. S-77 defines provider adapter observations only; it must not implement scheduling, automated GitHub dispatch or status publication before S-75 permission qualification.

## S-77 exit evidence
- Contract schema with executable negative tests for stale SHA, missing receipt, unknown provider, mismatched provider/purpose, spoofed sender, duplicate/conflicting receipts and rate limit.
- Demonstrated read-only exact-head dispatch and receipt for each **enabled** provider; otherwise record provider as NOT_CONFIGURED.
- Independent review of adapter code and a documented S-75 permission boundary.
- Do not declare S-77 complete merely because a contract document exists.
