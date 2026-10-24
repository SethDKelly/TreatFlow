---
type: Agentic Development Governance Contract
title: Agentic Development Governance for OKF-Grounded Repositories
description: Defines shared repository instructions for Claude, Cursor, Codex, and other coding agents so development remains grounded in canonical OKF knowledge without duplicating or bypassing design authority.
tags: [agents, development, okf, claude, cursor, codex, governance]
sources:
  - id: okf-v02
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: Open Knowledge Format v0.2 Specification
  - id: claude-project-memory
    resource: https://code.claude.com/docs/en/memory
    title: Claude Code — project memory and CLAUDE.md
  - id: cursor-rules
    resource: https://cursor.com/docs/rules
    title: Cursor — Rules
  - id: codex-agents
    resource: https://openai.com/business/guides-and-resources/how-openai-uses-codex/
    title: How OpenAI uses Codex — AGENTS.md guidance
  - id: linear-github
    resource: https://linear.app/docs/github
    title: Linear — GitHub PR linking, magic words, status automation, and issue sync
---

# Agentic Development Governance for OKF-Grounded Repositories

## Purpose

Repositories cloned from Base are expected to be usable by both humans and coding agents without requiring every agent session to reconstruct design authority from phase history.

This contract defines the shared development behavior that agent-specific instruction files should preserve. Tool-specific files are adapters; this document is the durable methodology-level authority for how agents should use the repository knowledge system.

## Governing principle

**Inspect current knowledge before changing implementation, and preserve the distinction between canonical truth, methodology/process rules, and historical phase evidence.**

Agents must not treat the nearest markdown file, newest phase record, prior implementation, or generated suggestion as authority merely because it is convenient.

## Knowledge authority order

When instructions or repository statements appear to conflict, use the repository's [Canonical and Historical Knowledge Authority](knowledge-authority.md):

1. current canonical knowledge;
2. current methodology/process contracts;
3. active phase handoff and explicitly provisional work;
4. historical phase records;
5. incidental notes or external suggestions not promoted into the knowledge bundle.

Explicit user instructions still govern the requested task, but an agent should surface material conflicts rather than silently making canonical design inconsistent.

## Required orientation before substantive development

Before making a substantive application or architecture change, an agent should inspect, as relevant:

- the root `README.md`;
- [`docs/index.md`](../index.md);
- the current canonical knowledge entry points under [`docs/canonical/`](../canonical/);
- the lifecycle/readiness state;
- the Phase 011 closure handoff and Phase 012 pre-implementation handoff for a project that has completed them;
- canonical concepts, synchronizations, dependencies, authority boundaries, experience contracts, limitations, and implementation-facing obligations related to the change.

Read only the knowledge needed for the task. Do not load the entire phase history unless evidence or rationale is required.

## Lifecycle-aware action rules

### Before Phase 011 concept-design closure

Implementation is not ready and must not begin. Follow the [Design-Only Guardrails](design-only-guardrails.md).

### After Phase 011 closure but before Phase 012 completion

Concept design may be ready, but the repository is still in pre-implementation preparation. Agents may perform documentation reconciliation, OKF hardening, README/rule maintenance, audit work, and downstream planning allowed by Phase 012. They must not begin feature implementation merely because Phase 011 passed.

### After Phase 012 completion

The repository may enter a separate downstream representation/architecture/engineering process. Implementation execution still requires authorization from that downstream process; Phase 012 itself does not imply that coding has started.

## OKF document rules

When changing the `docs/` knowledge bundle:

- Treat `docs/` as an OKF v0.2 bundle.
- Ordinary concept documents must have YAML frontmatter and a non-empty `type`.
- `index.md` and `log.md` are reserved files and are not ordinary concept documents.
- Non-root `index.md` files must remain frontmatter-free navigation/progressive-disclosure documents.
- `docs/index.md` is the bundle root and may declare `okf_version: "0.2"`.
- Prefer the smallest useful frontmatter. Do not invent metadata merely because OKF permits extensions.
- Use `sources` when durable knowledge materially derives from internal or external artifacts.
- Use lifecycle/freshness metadata such as `status` or `stale_after` only where it carries real maintenance value; do not timestamp every hand-authored design document mechanically.
- Preserve standard Markdown links as meaningful graph edges.
- Update affected indexes and cross-links when files are created, moved, renamed, superseded, or retired.

## Current truth before new documents

Before creating a document, ask whether an existing canonical owner already owns the meaning.

Prefer:

- refining the current owner;
- linking to current authority;
- adding a distinct document only when it has a distinct semantic identity.

Do not create a new file merely because an agent wants a scratchpad, a subtask exists, or a phase/work item has a name.

Temporary work should be removed before completion unless it has durable value.

## Staleness and supersession

Before relying on a design document as current authority, check whether:

- its terminology matches current canonical indexes;
- linked concepts still exist under the same identities;
- a later canonical document supersedes it;
- it is phase evidence rather than current truth;
- any explicit lifecycle/freshness metadata marks it as deprecated, superseded, or stale;
- repository changes since its creation materially invalidate its claims.

When stale current documentation is found, update or supersede it as part of the change when reasonably within scope. Do not silently code against known-stale design knowledge.

## Design-to-implementation fidelity

Implementation should realize conceptual obligations, not reinterpret them opportunistically.

If code work exposes a contradiction or missing design rule:

1. identify the affected canonical owner;
2. determine whether the design must be clarified/reopened or the implementation proposal is wrong;
3. update design authority when the design changes;
4. propagate the consequence to implementation;
5. preserve traceability between the implemented behavior and the conceptual rule.

Do not make source code the sole new authority for user-facing semantics that belong in canonical knowledge.

## Agentic anti-bloat rules

Agents should actively avoid repository growth that does not improve semantic ownership, verification, or maintainability.

- Inspect before creating.
- Modify existing natural owners when possible.
- Do not create duplicate summaries of documents already indexed clearly.
- Do not create speculative abstractions, interfaces, services, tests, helpers, or configuration solely because they might be useful later.
- Keep agent instruction files concise and point to repository authority instead of copying large sections into each agent format.
- Keep phase evidence separate from canonical current truth.
- Remove temporary scripts/files created only for local reasoning unless the user explicitly wants them retained.

## Change scope and verification

Agents should make the smallest coherent change that satisfies the requested intent and current repository contracts.

Before finishing substantive implementation work, when implementation is authorized:

- run the narrowest meaningful checks for the changed behavior;
- widen verification only when risk, failures, or repository policy justify it;
- review affected documentation/canonical knowledge when behavior or public semantics changed;
- check for stale references created by renames or moves;
- summarize material deviations, remaining uncertainty, and any intentionally unperformed work.

Do not manufacture tests that only mirror the implementation or repeatedly run broad suites without a reason.

## Qualified implementation and delegated verification gates (proposed bounded adoption)

This is a **process contract for future eligible implementation packages**, not retroactive acceptance of an existing PR, permission to start a blocked story, evidence that multiple agents actually ran, or authorization for live provider dispatch. Use the current canonical concept/phase owner and Linear dependency graph as authority; [013-F](../phases/013/013-f-agentic-independent-test-control.md) continues to govern independent test-control and protected operational boundaries. One PR should represent **one coherent, independently verifiable behavior or integration slice** rather than a phase-wide grab bag or a series of trivial review-triggering edits.

### Gate A — qualify scope before implementation

The bounded package owner records in the Linear story and PR plan, **before coding**:

- **Identity and authority:** issue/phase, current base SHA, current canonical owner, entry prerequisites, relevant dependencies, risk class, responsible integrator and permitted files/operations.
- **Behavioral contract:** observable inputs/outputs, invariants, failure/UNKNOWN/HOLD outcomes, relevant interfaces and data/authority boundaries; explicit in-scope and excluded behavior.
- **Acceptance examples:** representative success, boundary and negative scenarios, including spoofing, stale-head, replay, concurrency, malformed input, quota/error and denial cases where applicable. Distinguish *required observable behavior* from implementation-specific test design.
- **Independent evaluation plan:** which obligations will be checked by unit/contract tests, integration or black-box tests, and independent adversarial/holdout evaluation; what evidence is needed for each. A test's existence is not proof it passed, and an unimplemented scenario remains NOT_TESTED/HOLD.
- **Stop conditions:** unresolved design contradiction, unauthorized cloud/credential/real-person change, unqualified dependency, unexpected privilege or cost, or scope drift require HOLD and explicit reopening of the appropriate owner. An unavailable independent evaluator or missing separate holdout custody must be recorded at Gate A as an **unfulfilled Gate C dependency / HOLD for independent exit**; it does not prohibit separately authorized, bounded Gate A/B preparation, but preparation and implementer-authored tests cannot clear that HOLD.

A package is **Gate A qualified** only when the above is specific enough for implementer and test author to work from the same observable contract. Qualification does not mean implementation, testing, security exit, or merge acceptance has passed.

### Delegated, isolated work packages

Where independent authorized workers and tools are available, the integrator may prepare parallel bounded assignments from Gate A:

| Workstream | Deliverable | Isolation / independence |
| --- | --- | --- |
| Implementation | Production code and narrow implementation-facing unit tests | Own branch/worktree and scoped source paths; no final acceptance verdict |
| Unit and regression test author | Behavioral unit/contract and negative tests traced to Gate A, including boundary/failure controls | Prefer separate branch/worktree and test paths; derive assertions from the qualified contract, **not** from production code's chosen behavior |
| Independent adversarial test designer | Threat hypotheses, black-box/holdout cases, mutation and bypass probes, negative controls | Separate context/fixture custody; do not reveal protected expected outputs to implementer or accept implementer-selected tests as independent |
| Documentation/evidence owner | Requirement-to-test matrix, change inventory, current-authority reconciliation, run and review links | No fabricated execution or provenance; transient verdicts belong in PR/Linear and stable evidence snapshots, not commits to candidate head |
| Integrator | Resolve interface conflicts, integrate reviewed branches, run checks and present one candidate | Does not silently reinterpret canonical behavior, merge a blocked dependency, or count self-review as independent |

Delegation is **conditional**, not a claim that separate agents are connected or can be dispatched. Agree on file ownership and interfaces first; avoid simultaneous edits to the same branch or cherry-picking an unreviewed change after candidate freeze. If separate workers are unavailable, bounded implementation and ordinary unit/regression test preparation may proceed sequentially with the independence limitation disclosed. **Sequential work by the same worker is not an independent adversarial/holdout evaluation**, even when tests are derived from Gate A rather than production code. Keep Gate C independent exit **HOLD** until a separately qualified evaluator with appropriate withheld-case custody performs the required independent assessment; never count disclosure, self-review, or implementer-authored tests as its substitute. Do not build a new orchestration service merely to delegate.

### Gate B — integrate, verify, freeze candidate

The integrator consolidates compatible changes and fixes into a **coherent review batch**, reconciles the Gate A requirement-to-test matrix, verifies negative controls and regression coverage, checks no scope drift or stale canonical references, and runs local/static/unit/contract checks. Verify CI against the candidate's **exact full head SHA** before asking for final deep reviews when CI is available. Record absent tests as NOT_TESTED, inaccessible evidence as UNKNOWN, and unresolved material defects as HOLD. Freeze the candidate SHA for independent exit; avoid review-request churn from small wording-only or evidence-only commits. High-risk design questions may receive early **advisory** review, which is not Gate C acceptance.

### Gate C — deep independent exit and merge decision

Request independent Codex/Cursor exact-head reviews only on the stable Gate B candidate, where those reviewers are actually available; use a blind-first pass and cumulative adversarial recheck as required by the [review orchestration policy](../review-orchestration-policy.md). Independently designed tests and CI must assess the **qualified observable contract**, not just author-written tests. Recheck reviewer identity, reviewed SHA, substantive findings, review threads, base/head changes, required GitHub checks, dependencies, security evidence, and sponsor authorization **at decision time**. Native bot comments are not authenticated S-77 provider receipts or formal protected approvals.

On a finding, triage root cause, **batch related remediations and regression tests**, rerun checks, freeze a **new** exact SHA and obtain fresh reviews; never transfer a prior SHA's PASS. Avoid duplicate pending review requests, while preserving the policy's bounded timeout/retry/fallback procedure. Maintain a source-linked stable ledger at `docs/review-orchestration-evidence-ledger.md` **only after** the separately reviewed [draft PR #124](https://github.com/SethDKelly/TreatFlow/pull/124) is merged and the file exists on the target branch. Until then, use PR/Linear comments for transient evidence; the unmerged proposal is not active policy, and its absent file path must not be presented as a live Markdown knowledge edge. A documentation-only review PASS never clears an unrelated operational/security HOLD.

**Exit:** merge only after all applicable exact-head CI, independent tests/reviews, branch-protection, dependency, scope and separately authorized security/human gates are satisfied. An existing explicit sponsor authorization may cover qualifying merges but never waives those gates. Following merge, reconcile Linear and current repository documentation before admitting the next bounded package. Track review requests per candidate, remediations per root cause, Gate A-to-C lead time and independently found regressions to assess whether batching improves throughput without suppressing defects.

## Pull-request traceability and ordinary review authority

This methodology is the **durable shared policy** for Cursor, Codex, Claude, and other agents. The root [AGENTS.md](../../AGENTS.md) is its **portable, immediately executable repository adapter**: it contains short working instructions for agents that consume AGENTS.md directly. These two owners must remain consistent; changing shared review/workflow expectations requires updating this methodology and, when relevant, its root adapter. Do not proliferate tool-specific full policy copies.

- **Work identity and status semantics:** eligible implementation work traces to an existing, dependency-qualified Linear story such as `S-31`; include its ID in the branch name when naming is under agent control, and always include it in the PR title. When Cursor cloud assigns its own branch name, keep it rather than opening a second branch solely for naming compliance; use the PR title/description for issue linkage. Linear documents three PR relationship classes: non-closing `References S-31` may still cause configured PR-open/review status transitions but **does not** apply `On PR or commit merge`; relation-only `Relates to S-31` itself causes **no** status change, though branch-name/title/other linkage can independently run automations; use documented `Skip S-31` or `Ignore S-31` to suppress automatic issue linking when necessary; closing `Fixes S-31` may apply the team's configured merge status. Never use a closing reference until the **effective** team/branch merge mapping is independently verified as **Verification, not Done**. Never mix closing and non-closing magic words for the same issue anywhere in a PR title or description, including explanatory prose; this prohibition applies to ordinary work as well as integration tests. PR #111 contained `References S-31` and an explanatory `Fixes S-31`; its temporal merge→Verification association cannot prove how an isolated non-closing reference behaves, nor identify the transition actor. PR #112's non-closing `References S-35` relationship demonstrated a PR-open review transition; S-35 records the later Verification move as manual, but `stateHistory` does not attribute its actor. Inspect configuration, other linked PRs and actual event provenance, not timing alone, before making stronger claims. Linear is the work ledger; the actual Git diff, exact-SHA CI and authorized reviews are engineering evidence.
- **Status and defects:** an opened PR indicates review, and a merged PR **does not prove independent acceptance**. Linear may move to a verification status when configured; only separately verified evidence permits Done. First check for an existing defect; record blocking findings in the PR; create/link a distinct Linear Bug issue for independently actionable follow-up, and avoid automatic duplicate tickets. GitHub-to-Linear issue synchronization needs explicit integration setup.
- **Review substance:** inspect actual head/base diff, adjacent call sites and behavior, tests, linked acceptance criteria and canonical concepts; prioritize justified, reproducible defects in correctness, authority, privacy, recovery and observation meaning. Check negative cases instead of relying solely on author-written tests. Record severity and evidence; avoid speculative/style-only noise.
- **Review independence:** a reviewer does not edit the author branch, self-approve, merge or deploy, and cannot override a dependency, IAM/budget, real-person or disclosure gate. A different agent in the same inherited context is not inherently independent.
- **Output-surface compatibility:** native Codex and Cursor Bugbot PR review integrations can constrain output to findings/comments. Comply with those host formats and **do not require an extra PASS/HOLD footer they cannot emit**. A separate narrative review may report `PASS`, `HOLD` or `INSUFFICIENT EVIDENCE` with actual checks performed. No native bot review alone is an independently accepted milestone or required human approval.
- **Role separation:** ordinary code review is not the future deliberately adversarial/holdout evaluation. Keep adversarial prompts, secrets and protected outcomes in separately controlled review/evaluation mechanisms under [013-F](../phases/013/013-f-agentic-independent-test-control.md).

## Tool-specific adapter policy

Base uses one shared instruction model with thin adapters:

- `AGENTS.md` — portable root instructions for Codex and agents that support the convention; Cursor also supports this format.
- `CLAUDE.md` — imports `AGENTS.md` and adds only Claude-specific behavior when necessary.
- `.cursor/BUGBOT.md` — thin adapter for Cursor Bugbot's independent, findings-only PR review rules; keep it aligned with shared review policy.
- `.cursor/rules/*.mdc` — focused Cursor rules for path- or task-specific concerns that are not efficiently expressed by the shared root instructions.

Tool-specific adapters must not become independent copies of architecture, concept definitions, or workflow policy. When shared policy changes, update this contract and the smallest necessary adapters.

## Agent instruction maintenance

Treat agent rules as maintained repository behavior rather than static boilerplate.

Review them when:

- a tool's supported instruction mechanism changes;
- an agent repeatedly makes the same repository-specific mistake;
- canonical knowledge organization changes materially;
- implementation lifecycle/readiness semantics change;
- rules conflict, duplicate one another, or consume excessive context;
- a rule encodes a workaround that is no longer needed.

Prefer deleting obsolete rules to stacking new exceptions on top of them.

## Security and authority

Agent instructions are guidance, not a security boundary. Do not rely on prompts/rules as the only enforcement for secrets, production access, protected approvals, deployment authorization, or other high-consequence controls.

Where the conceptual design establishes a protected human/organizational authority, an agent must not assume that its ability to modify files substitutes for that authority.

## Completion standard

Agentic development governance is healthy when:

- agents can discover current design truth quickly;
- the same shared rules guide Claude, Cursor, and Codex without major duplication;
- documentation edits preserve OKF structure and authority;
- stale phase/history documents are not mistaken for current requirements;
- implementation changes remain traceable to current conceptual obligations;
- agent activity does not create uncontrolled documentation or code bloat;
- tool-specific adapters remain concise and replaceable as agent products evolve.
