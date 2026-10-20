# TreatFlow Repository Agent Instructions

These instructions apply to agents working on TreatFlow. TreatFlow inherits Base methodology, but the project-specific [Phase 000 exit](docs/phases/000/000-e-treatflow-exit-review.md) and [current intake](docs/canonical/project/intake.md) establish the active baseline; inherited Base template execution is not TreatFlow completion evidence.

## Start with repository authority

Use progressive disclosure: read `docs/index.md`, then only the relevant canonical owner(s), current phase state, and applicable methodology contracts. Consult phase history only for evidence or unresolved authority conflicts. `README.md` is orientation, not a competing specification. The durable shared rules live in `docs/methodology/agentic-development-governance.md`.

Do not treat phase history as current truth when a canonical owner exists.

## Knowledge authority

Interpret repository knowledge in this order:

1. current canonical knowledge;
2. current methodology/process contracts;
3. active phase handoff and explicitly provisional work;
4. historical phase records;
5. incidental notes or suggestions not promoted into the knowledge bundle.

If a requested change conflicts materially with current design authority, surface the conflict and update the natural design owner when the design itself is intentionally changing. Do not silently code around it.

## Lifecycle boundary

- Phases `000–011` are the Jackson-aligned concept-design lifecycle.
- Before successful Phase `011` closure, application implementation is not ready and must not begin.
- Phase `012` is post-closure pre-implementation preparation: documentation/OKF audit, stale-document cleanup, README/rule maintenance, and engineering handoff preparation.
- Phase `012` does not itself start feature implementation or authorize implementation execution.
- **TreatFlow Phase 012 forbids application code, schemas, APIs, infrastructure/deployment, real participant data collection or processing, and disclosure.** Passing a documentation audit does not relax these prohibitions.
- A separate downstream representation/architecture/engineering process must decide when implementation execution begins.
- **TreatFlow Phase 013-A–G is engineering design, not implementation authorization; 013-H must independently authorize specifically bounded future implementation.** When authorized, follow the scoped [013-F agentic/test-control design](docs/phases/013/013-f-agentic-independent-test-control.md); neither agent instructions nor successful CI confer production or real-person collection/disclosure permission.
- **After Phase 013-H:** work may proceed only within currently approved bounded packages. Earlier Phase 012 design-only restrictions describe that historical phase, not a blanket prohibition on later authorized code. Source changes, cloud reads/writes, deployment, and protected real-person operations have distinct authorization gates; check the active phase, Linear dependencies, and approval evidence rather than guessing from chronology.

## OKF documentation rules

Treat `docs/` as an Open Knowledge Format (OKF) v0.2 bundle.

When editing it:

- ordinary concept documents require YAML frontmatter with non-empty `type`;
- non-root `index.md` files are frontmatter-free navigation documents;
- `docs/index.md` is the bundle root and may declare `okf_version: "0.2"`;
- `log.md`, if present, is reserved for chronological history;
- use `sources` when durable knowledge materially derives from another artifact;
- use lifecycle/freshness metadata only when it adds real maintenance value;
- update affected indexes and links after moves, renames, supersession, or new current knowledge;
- prefer links to current authority over copied summaries.

## Inspect before creating

Before adding a file, abstraction, service, helper, test, configuration, or document:

- inspect existing natural owners/patterns;
- confirm the new artifact has a current purpose;
- prefer modifying an existing owner over creating duplicate truth;
- avoid speculative scaffolding for hypothetical future needs.

Temporary reasoning or migration files should not remain unless they have durable value.

## Stale knowledge

Do not implement against documentation you know is stale.

Check whether a document:

- is canonical or historical;
- uses current terminology and paths;
- has been superseded by later current knowledge;
- carries lifecycle/freshness metadata that changes how it should be interpreted.

Correct stale current authority when it is within the requested change's scope.

## Design-to-implementation fidelity

Implementation should preserve current conceptual obligations, including relevant:

- purposes and concept semantics;
- application actions and synchronizations;
- authority boundaries;
- lifecycle/history/correction/recovery behavior;
- product/variant scope;
- user-visible mapping/disclosure requirements;
- accepted limitations/non-goals;
- conceptual safety/privacy/interoperability/consistency constraints.

If implementation work exposes a missing or contradictory design rule, update/reopen the natural design owner rather than making source code the only authority for new user-facing semantics.

## Agentic anti-bloat

Before adding or moving documentation, inspect current natural owners and indexes. Prefer correcting, cross-linking or consolidating redundant navigational prose over creating parallel authority. Do not merge distinct concept specifications merely to reduce file count. Keep inherited Base template records explicitly separate from TreatFlow progress.

- Make the smallest coherent change that satisfies the task.
- Do not create documentation merely to narrate work already represented by code or phase evidence.
- Do not duplicate canonical design into agent rules, source comments, or new summaries.
- Avoid speculative abstractions and premature generalization.
- Remove scratch artifacts before completion.
- Keep tool-specific rules thin; shared policy belongs in repository authority.

## Verification

Once implementation execution is actually authorized:

- use the narrowest meaningful verification for the changed behavior;
- broaden checks only when risk, failures, or repository policy justify it;
- update current documentation when public/user-facing semantics change;
- check affected references after renames/moves;
- report material uncertainty or intentionally unperformed validation.

Do not create tests that only mirror implementation details without meaningful behavioral value.

## Pull requests, Linear linkage, and defect intake

Linear is the **work/dependency ledger** for the TreatFlow MVP; GitHub PRs, code, CI checks, and approved deployments provide engineering evidence. Neither an issue label nor a Linear status grants permission to bypass blocked dependencies, human decisions, AWS-write gates, or independent verification.

- **Before implementation:** find the existing eligible Linear story (`S-<number>`), its blocking issues, current acceptance criteria, and authorized scope. Do not start blocked work merely because the agent can open a branch. If Linear is unreachable, disclose that limitation; do not invent an issue ID or silently mark dependencies resolved.
- **Native PR linkage:** prefer Linear's copied branch name (containing `S-<number>`) when branch naming is under your control; if Cursor cloud assigns a `cursor/…` branch, keep it rather than opening a second branch solely for naming. Always include the issue ID in the PR title, e.g., `S-31: Validate PR linkage`. For a PR that should participate in review without invoking the configured merge-status automation, use an explicit non-closing reference such as `References S-31`: Linear may still run configured PR-open/review transitions, but its documented non-closing behavior does **not** apply the `On PR or commit merge` status. To associate a PR **without any automatic status change**, use relation-only `Relates to S-31`. Use a deliberate closing reference such as `Fixes S-31` only when the team's effective merge mapping is verified as **Verification, never Done**. Do not mix closing and non-closing magic words for the same issue anywhere in the PR title/body, even in explanatory examples: such a PR does not provide a clean causal test. The merged PR #111 combined `References S-31` with explanatory `Fixes S-31`; its observed move to Verification therefore does **not** establish that a non-closing reference triggered merge automation. Inspect the actual issue link, configured automation and event history before attributing a transition. These rules govern Linear **PR linking**, not the separate GitHub Issues Sync setting.
- **PR handoff:** include the linked issue, scoped changes, canonical contracts/acceptance cases, exact verification run or commands, untested risks, and any protected approval needed. Request a separate code review after the implementation is ready; keep review findings and follow-up evidence on the PR rather than generating a parallel report file.
- **Status discipline:** an opened PR is review work; a merged PR is not necessarily an independently accepted story. Use the team's configured review/verification statuses and move to Done only after required code review, meaningful tests, and any milestone-specific independent verification. These transitions require actual Linear integration configuration; instructions alone do not enforce them.
- **New defects:** first check for an existing Linear story or linked GitHub issue. Put defects that must block the current PR in the PR review; create a distinct Linear `Bug` issue (with appropriate project/epic, reproduction, severity, and PR reference) only for independently trackable or deferred work. Avoid duplicate tickets and auto-filing stylistic nits. Use `S-NEW` in a PR description only when deliberately creating an unplanned new Linear issue through the configured integration, then triage its ownership, project, and dependencies.
- **GitHub Issues:** native GitHub issue synchronization to Linear is a separate, explicit admin configuration. If enabled, use the synchronized issue rather than manually creating its duplicate; do not presume that tagging a GitHub issue automatically imports it. Keep secrets and restricted security details out of public issue/PR descriptions.

## Code review — shared Cursor and Codex principles

These instructions are the execution-facing form of the [durable shared review policy](docs/methodology/agentic-development-governance.md). Cursor **cloud/IDE agents** and Codex agents use this root guidance; **Cursor Bugbot** consumes the minimal `.cursor/BUGBOT.md` adapter, and both native review integrations may constrain findings output.

When acting as a **code reviewer**, use the same principles regardless of whether Cursor or Codex implemented the change:

- Review the **exact PR diff against its current target branch**, relevant call sites, tests, linked Linear story acceptance criteria, and affected canonical contracts. Do not accept the implementer's description or passing tests as proof of correctness.
- Report concrete, actionable findings with severity, file/line when available, realistic failure scenario, and evidence. Distinguish confirmed defects from plausible risks and **insufficient evidence**; avoid ungrounded findings and style-only noise already covered by CI.
- Prioritize correctness, security, authorization, privacy, data integrity, recovery, and conceptual fidelity. For Observation changes, check people versus groups, near-present versus interval totals, reported versus receipt time, coverage/completeness, observed-zero claims, conflicting assertions, closure, and unresolved submission outcomes.
- For API, persistence, authentication, IaC, or CI changes, inspect authorization boundaries, cross-record/environment access, replay and concurrent writes, secret handling, unexpected cost amplification, and protected approval bypasses as relevant to the diff.
- Check the smallest meaningful negative cases and whether tests prove external behavior, not merely the implementation's assumptions. Identify critical missing verification without claiming tests were run when they were not.
- Review from a separate bounded context where feasible; a second agent using the implementer's conclusions verbatim is not independent evidence. **Do not edit the implementer's branch, self-approve, self-merge, or deploy while serving as reviewer.**
- **Respect the native review surface.** On Codex or Cursor Bugbot PR review interfaces that accept **findings only**, report supported actionable findings in that format; do not append incompatible PASS/HOLD prose. For a separate narrative/manual review that permits a summary, finish with **PASS**, **HOLD**, or **INSUFFICIENT EVIDENCE**, actual verification scope, and remaining risks. Neither output replaces protected checks, independent exit review, or human authorization.

This section covers **ordinary code review only**. A separate adversarial-verification role, prompt, hidden test corpus, and enforcement mechanism will be established independently; do not present this code review as that distinct assessment. See [013-F independent verification design](docs/phases/013/013-f-agentic-independent-test-control.md) for the existing methodology and the [single MVP roadmap](docs/phases/013/mvp-roadmap.md) for package-specific gates.

## Protected authority and security

Agent instructions are guidance, not a security boundary. Do not treat file-write capability as authorization to bypass protected human/organizational decisions, production controls, secrets handling, deployment approval, or other high-consequence authority established by the design.

## Canonical governance

For the full shared rule contract, read:

`docs/methodology/agentic-development-governance.md`
