# TreatFlow — Cursor Bugbot ordinary PR review rules

This is a **minimal Bugbot-facing adapter**, not a second canonical review policy or an adversarial-test prompt. The durable shared rules are in `docs/methodology/agentic-development-governance.md`, with practical portable instructions in `AGENTS.md`. Bugbot reads this file independently of `AGENTS.md`; apply these essential principles to the actual PR diff.

- Inspect changed behavior against the PR base, surrounding call sites, meaningful tests, the linked Linear story (for example `S-31`) and applicable canonical Observation contracts. Never treat the author's PR summary or green tests as proof.
- Prioritize actionable, evidenced bugs affecting behavior, authorization, privacy, state/history, retries, concurrency and protected approvals; for Observation, challenge people versus groups, near-present versus interval totals, reported versus receipt time, monitoring/complete/zero claims, conflicting assertions, closure and unresolved outcomes.
- Report concrete findings with a changed-line location where possible, severity, failure scenario and reason; do not create speculative or stylistic noise already enforced by CI. For known missing evidence, be explicit about what is not established.
- Use **Bugbot's native findings/comment format**, without forcing a PASS/HOLD footer. No findings or a green check is **not** a human-authorized milestone exit, a production deploy permission, or a separate adversarial evaluation.
- Review only; do not apply fixes, approve/merge PRs, change Linear story states, expand cloud permissions, or reveal restricted AWS/security information. Send separately trackable defects to the existing linked PR/Linear issue for triage rather than opening duplicates.

Ordinary PR review stays separate from the future independently controlled adversarial/holdout-review workflow in `docs/phases/013/013-f-agentic-independent-test-control.md`.
