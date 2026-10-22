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
