---
type: policy
status: draft
title: TreatFlow independent review orchestration policy
---

# TreatFlow independent review orchestration policy (v1)

## Authority and scope
This policy governs new TreatFlow engineering PR review cycles, including S-32/S-42/S-74 evidence-sensitive changes. It is a process specification, **not** proof that an agent was dispatched. GitHub CI is not independent code review; an automated review receipt is not a merge authorization. Explicit sponsor approval is mandatory before merge.

## Reviewer assignment and rotation
1. Record implementation agent (Codex, Cursor, human, or unknown), exact PR head SHA, risk class, and reviewer availability before dispatch.
2. Eligible reviewers are Codex and Cursor **only if a working, authorized dispatch path is verified**. A GitHub comment tagging Codex is a request, not proof of execution. Do not claim Cursor was dispatched merely by mentioning it in a comment.
3. Exclude the implementation agent from the primary independent review when possible. If both are eligible, alternate the primary agent relative to the preceding completed cycle; use a documented random tie-break for equal-history candidates (record the random draw and selection). Never use randomness to bypass a required reviewer, security gate, or sponsor decision.
4. Security-sensitive, authorization, evidence-provenance, workflow, and CI-gating changes receive an independent adversarial pass, ideally by the other available agent. If only one reviewer is operable, document the independence limitation and request a separate human/security review before final security-exit acceptance.

## Blind-first, cumulative-second review
- First pass: provide scope, acceptance criteria, threat model, diff, and exact head, but not the other reviewer's conclusions where independent blind review is feasible.
- Second pass: provide all historical findings, dispositions, reproductions, and new regression evidence; challenge the entire vulnerability class and interactions, not just the last reported line.
- Every review must state reviewer identity, head SHA, dispatch mechanism, request time, response time, and verdict; absent or mismatched receipts mean **pending**, never passed.

## Timeout, polling, and fallback
- Poll the GitHub review timeline, threads, and exact-head checks after request. Treat missing, failed, timed-out, or non-exact-head reviews as incomplete.
- If no valid exact-head receipt appears within 15 minutes, retry **once** with a new explicitly recorded request. After another 15 minutes, route to the alternate **verified** reviewer, or escalate to a human reviewer if the alternate cannot be dispatched. Do not endlessly spam requests.
- Record attempts, failures, fallback reason, and identity of the reviewer actually completing the pass. An unavailable Cursor integration is a blocked fallback, not an implicit review.
- Any code change invalidates previous exact-head review and CI clearance; restart relevant checks.

## Closure and non-bypassable gates
- CI passes at the exact reviewed head; review comments are reconciled against that head; new blockers have regression tests and independent verification; stale threads receive explicit evidence-backed dispositions.
- Adversarial tests must cover alternate mutation paths, cross-field interactions, provenance spoofing, and false-positive readiness. Avoid narrowing the threat model merely to satisfy a reviewer.
- The PR stays on HOLD until the above evidence is complete. Merge requires separate explicit user/sponsor authorization; security-exit acceptance is a distinct decision.

## Cycle ledger template
```yaml
pr: 0
head_sha: ""
implementation_agent: unknown
risk: security-sensitive
eligible_reviewers: [codex] # only verified working dispatches
selection_method: rotation # or recorded random tie-break
primary_reviewer: codex
secondary_reviewer: pending
first_pass_blind: true
dispatch_method: github-review-request
requested_at: ""
retry_count: 0
fallback_reason: null
reviewed_sha: null
ci_run: null
findings_reconciled: false
independent_disposition: pending
sponsor_merge_approval: false
```

## Adoption
Effective for the **next TreatFlow review cycle**. Existing PR #117 and #119 remain under their current exact-head review gates; this policy must not retroactively assert a Cursor review. A future automation may implement deterministic selection, verified dispatch, timed polling and audit ledger, but must not mark a review complete without an actual reviewer receipt.

## Availability override and timed reviewer switch (v1.1)
- Default: eligible, independent reviewers are chosen by recorded rotation with a random tie-break. Eligibility is checked **before** randomization.
- An explicit provider rate-limit notice, exhausted quota, provider error, failed dispatch, or operator-defined maintenance interval sets that provider to `unavailable` until the documented recovery deadline or a successful capability probe. Never repeatedly dispatch to a known-exhausted provider.
- A manual switch gate may pin the preferred provider for a bounded interval (e.g., 40 minutes). Record requester, start time, end time, reason, affected PRs, and the exact head at dispatch. The override expires automatically in the selection logic at its deadline; after expiry, re-evaluate availability and resume the default rotation. No override can waive independence or exact-head checks.
- Switch eligibility must require a **verified operational dispatch mechanism** and an observable exact-head review receipt. If the alternate is not connected, record `BLOCKED_NO_DISPATCH` and route to a human/security reviewer or HOLD. A comment merely mentioning Cursor is not a Cursor dispatch.
- On failure: one bounded retry of the eligible provider, then switch to another verified provider. If no provider is operational, preserve the pending review and request manual intervention. CI success does not satisfy the missing independent review.
- During a provider outage, preserve the queue of pending reviews; don't request Codex reviews until quota recovery is confirmed. Do not fabricate completion timestamps, review identities, or outcomes.

### Historical outage note (expired; non-operative)
- The original operator-reported Codex outage and 40-minute Cursor preference had no recorded absolute start/end and **must not be interpreted as an active switch**.
- On 2026-10-22, exact-head Codex review receipts were observed on PR #117 at `5a79f77d9f074fcc6dea2b99c0f8510165e29c2d` and PR #119 at `c5d08d9605c68f20c6b1fe56719e70fa926e3023`; these demonstrate recovery for those attempts, not future availability guarantees.
- Cursor `@cursoragent` was also operational for prior exact-head HOLD reviews. This is a historical observation, not authorization to merge.
- Any new timed override requires explicit absolute UTC start/end, a dispatch ledger and expiry enforcement; absent these it is **inactive**.
