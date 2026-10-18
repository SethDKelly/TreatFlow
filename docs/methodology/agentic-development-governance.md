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

## Tool-specific adapter policy

Base uses one shared instruction model with thin adapters:

- `AGENTS.md` — portable root instructions for Codex and agents that support the convention; Cursor also supports this format.
- `CLAUDE.md` — imports `AGENTS.md` and adds only Claude-specific behavior when necessary.
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
