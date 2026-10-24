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

## Qualification evidence checkpoint — 2026-10-23 (read-only)

The offline contract and evaluator from [PR #120](https://github.com/SethDKelly/TreatFlow/pull/120) are merged at `01b2001fd0b40686b231171d91356080e91fb577`. The receipt evaluator's negative-case suite covers forged caller sources, missing/stale/wrong-head receipts, mismatched provider and purpose, duplicate evidence, accessor/proxy attacks, timestamp ordering, and ambient intrinsic mutation. These tests establish **offline fail-closed behavior only**, not authenticated provider observations.

On [PR #121](https://github.com/SethDKelly/TreatFlow/pull/121), Codex's [review receipt](https://github.com/SethDKelly/TreatFlow/pull/121#issuecomment-6372527888) identifies exact head `b08ac68bad` and reports no major issues; Cursor Cloud Agent's [adversarial review](https://github.com/SethDKelly/TreatFlow/pull/121#issuecomment-6370335186) reports PASS on full head `b08ac68bad683b7dd0222bfbf19260f09b04a12c`. [Exact-head CI](https://github.com/SethDKelly/TreatFlow/actions/runs/39991749268) succeeded. These are read-only **observed review signals**, not proof that the S-77 evaluator can authenticate provider identity, source provenance, or a dispatch/receipt round trip. Cloud Agent remains distinct from unverified Bugbot.

| Acceptance dimension | Current evidence | Remaining gate |
| --- | --- | --- |
| Offline contract and adversarial validation | Merged PR #120 and executable negative tests | Preserve fail-closed behavior under subsequent changes |
| Codex review observation | Exact-head GitHub receipt on PR #121 | Independently authenticate actor/source and provider-specific dispatch, quota, retry and failure semantics |
| Cursor Cloud Agent observation | Exact-head read-only PASS on PR #121 | Independently authenticate actor/source and provider run/receipt semantics |
| Cursor Bugbot | **UNKNOWN / unverified** — installation and transport have not been independently established | Read existing installation and actor evidence; use NOT_CONFIGURED only after independently verifying absence or an explicit disabled configuration |
| Cursor Automations | **UNKNOWN / unverified** — entitlement and configuration have not been independently established | Confirm feature availability and event/permission/audit semantics; use NOT_CONFIGURED only after independently verifying absence or an explicit disabled configuration |
| Trusted collector and source custody | No authenticated collector verified; S-75 security qualification **INCOMPLETE / HOLD** | Verify observed effective least privilege, provenance, replay/fencing, denied unsafe writes and obtain a separate S-75 security decision |
| Operational authority | None from these observations | Separate sponsor authorization for live intake, dispatch, status publication or credential changes |

**S-77 remains Verification/HOLD.** Its merged offline baseline and observed PR #121 reviews do not satisfy the provider-qualification exit gate. [S-78](https://linear.app/s-kelly/issue/S-78) may retain its offline reviewed implementation but cannot exit until S-77 qualification; [S-79](https://linear.app/s-kelly/issue/S-79) remains blocked by S-75, S-77 and S-78. Next source-only step is independent review of this evidence classification and a bounded, non-operational qualification test plan; live activity is out of scope.

## Next bounded gate — source-only qualification protocol (2026-10-23)

This is a **proposed read-only evidence collection protocol**, not a provider activation, security approval, or claim of observed capability. The evaluator continues to HOLD all caller-asserted authenticated sources. Each row must carry the observation timestamp, immutable source URL, PR/head, observed GitHub actor and actor type, the actual API identity provenance if independently available, and an explicit VERIFIED / UNKNOWN / NOT_CONFIGURED disposition. UNKNOWN means evidence has not established a fact; NOT_CONFIGURED requires positive evidence of disabled or absent configuration, not a failed or incomplete search. A GitHub comment author field is an observed API field, not independent provider authentication. Absence of evidence is UNKNOWN, never PASS.

| Probe | Permitted source-only action | Negative control / rejection criterion |
| --- | --- | --- |
| Codex identity and exact head | Read GitHub PR review objects, issue comments, check runs and provider-run references for an already completed request | A comment body, reaction or matching bot display name without independently authenticated actor provenance cannot become a trusted receipt |
| Cursor Cloud Agent | Read existing `@cursoragent` request and `cursor[bot]` response records; correlate repository, PR, requested head, response head and provider-run identity | No assumption that Cloud Agent evidence establishes Bugbot identity or availability |
| Cursor Bugbot | Inspect existing repository configuration, installation evidence and historical review records if readable | If installation/transport/actor cannot be established, classify UNKNOWN; NOT_CONFIGURED requires positive evidence of disabled/absent configuration. Do not trigger a trial dispatch |
| Cursor Automations | Inspect documented availability and any already-existing configuration without enabling it | Unverified entitlement/configuration is UNKNOWN, not NOT_CONFIGURED; no inferred trigger, callback, or secret permission |
| Collector/source custody | Separate **observed** API principal, token scope, field provenance and revision binding (with evidence URL/time) from **proposed** principals and permissions | Hypothetical reader capabilities and designed permission matrices are UNVERIFIED; a caller-supplied `authenticated: true`, quoted comment, or untrusted webhook payload is not trusted evidence. S-75 remains INCOMPLETE / HOLD |
| Failure and retry | Record **executed** offline fixture coverage separately from **required but not yet implemented** cases; current merged S-77 tests cover forged caller source, missing receipt, mismatched head, duplicate receipt arrays and timestamp ordering, but **not** contradictory receipt adjudication, rate-limit handling or provider switching. Provider switching is S-78 draft scope, not a merged S-77 test. | For every unimplemented case record NOT_TESTED / HOLD and owning issue; do not cite `npm test` or unmerged S-78 as proof. Fail closed to UNKNOWN/HOLD; never upgrade from event notification or status text alone |

**Required acceptance packet:** per-provider capability/identity table with primary evidence links and uncertainty labels; separately labeled **observed** provenance and effective-permissions evidence versus **proposed** permissions design cross-referenced to S-75 (**not yet qualified; HOLD**); case-by-case offline negative-test ledger distinguishing PASS, FAIL and NOT_TESTED with owning issue and exact commit/CI; independent Codex/Cursor exact-head reviews; explicit unresolved risks and decision. A design-only permissions matrix is not an S-75 security decision. A source-only PASS means the documentation/negative-test packet is sound, **not** S-77 provider qualification complete. S-77 may exit only when every enabled provider's required authenticated identity, dispatch and receipt semantics are verified under separately authorized conditions, or the provider is explicitly disabled and the acceptance scope is adjusted through the appropriate gate.

**Operational STOP:** no live provider dispatch, webhooks, tokens, Apps, Actions workflows, GitHub status writes, Linear status writers, AWS/IAM operations, or live collector. Read-only independent review requests of this Draft PR remain permitted; these do not qualify live provider transport. S-75 security and sponsor-controlled activation remain separate. PR #122 stays Draft/HOLD pending fresh exact-head CI and independent review of this addition; S-78 acceptance and S-79 implementation remain dependency-blocked.
