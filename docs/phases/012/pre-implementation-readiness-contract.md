---
type: Pre-Implementation Readiness Contract
title: Pre-Implementation Repository Readiness Contract
description: Defines the repository, OKF, staleness, README, agentic-governance, and downstream-handoff obligations that must be satisfied before implementation planning proceeds from a Base-derived repository.
tags: [phase-012, pre-implementation, readiness, okf, stale-documentation, agents, handoff]
sources:
  - id: okf-v02
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: Open Knowledge Format v0.2 Specification
  - id: claude-memory
    resource: https://code.claude.com/docs/en/memory
    title: Claude Code — project memory
  - id: cursor-rules
    resource: https://cursor.com/docs/rules
    title: Cursor — Rules
  - id: codex-agents
    resource: https://openai.com/business/guides-and-resources/how-openai-uses-codex/
    title: How OpenAI uses Codex
---

# Pre-Implementation Repository Readiness Contract

## Purpose

A project can be conceptually ready and still be operationally unsafe to hand to implementation agents if current truth is difficult to locate, old phase language looks authoritative, the README is stale, or agent rules encourage coding against incidental files rather than canonical knowledge.

This contract defines the repository-quality baseline Phase 012 should establish before a separate engineering lifecycle begins.

## 1. Knowledge corpus inventory

Review the repository as a knowledge system rather than a pile of Markdown files.

The audit should be able to distinguish:

- root orientation/governance files;
- methodology/process authority;
- canonical current design knowledge;
- historical phase evidence;
- accepted limitations and open questions;
- agent instruction surfaces;
- pre-implementation/downstream handoff evidence.

Do not create a permanent file-by-file inventory unless it serves a continuing navigation or governance need.

## 2. OKF structural audit

For the `docs/` bundle, verify the adopted OKF v0.2 rules that matter to Base:

- `docs/index.md` is the bundle-root index and is the only index permitted frontmatter;
- the root index declares `okf_version: "0.2"`;
- ordinary `.md` concept documents have valid YAML frontmatter and non-empty `type`;
- non-root `index.md` files are frontmatter-free progressive-disclosure navigation;
- reserved `log.md`, if present, is used only for chronological update history;
- concept paths and Markdown links form a coherent traversable graph;
- `sources` records material provenance where it is useful;
- producer-defined metadata is sparse and meaningful rather than decorative.

A document should not be rejected merely because it omits optional trust/freshness metadata.

## 3. Lifecycle and freshness metadata

OKF v0.2 supports lifecycle/freshness fields such as `status` and `stale_after`, but Base should use them selectively.

Appropriate uses may include:

- externally sourced knowledge whose validity changes on a predictable cadence;
- explicit deprecated/superseded reusable guidance where consumers benefit from machine-readable lifecycle state;
- generated or verified artifacts where provenance/trust metadata materially matters.

Inappropriate uses include:

- stamping every hand-authored phase template with arbitrary expiration dates;
- creating pseudo-precision about freshness that nobody will maintain;
- using metadata as a substitute for correcting stale current authority.

## 4. Staleness audit

Search current-facing documentation for semantic staleness, not only old timestamps.

Check for:

- references to phases or readiness states that no longer exist;
- old terminology after concept renames/refactoring;
- obsolete paths or links;
- duplicate current rules with divergent wording;
- provisional material presented without qualification;
- superseded concept identities still indexed as current;
- historical phase records linked as the primary current answer when canonical truth exists;
- tool-specific agent guidance based on obsolete product behavior;
- README claims that no longer match the repository.

Classify findings as:

- current and valid;
- historical but intentionally retained;
- superseded/deprecated;
- stale current authority requiring correction;
- duplicate current authority requiring consolidation;
- uncertain and requiring owner review.

## 5. Canonical authority audit

Verify that durable current meaning has one natural owner.

Where the same rule appears in several places:

- choose the natural canonical owner;
- reduce other occurrences to concise context plus a link;
- preserve historical reasoning only in phase records;
- update indexes so readers reach the current owner first.

A Base-derived repository is not implementation-ready when an agent must guess which of several documents is authoritative.

## 6. Progressive-disclosure and index audit

For every meaningful knowledge directory, ask:

- Can a reader understand what this directory contains?
- Are current authoritative entry points easy to identify?
- Are superseded files de-emphasized?
- Does the index navigate rather than restate the contents?
- Are links still valid after renames/refactors?
- Can a coding agent reach relevant current design without loading all phase history?

Prefer a small number of high-value graph edges over dense decorative linking.

## 7. Root README audit

The repository README should orient a new human or agent quickly.

It should not repeat the methodology contracts in full. It should point to them.

At minimum it should accurately describe:

- Base's purpose;
- the `000–011` concept-design lifecycle;
- Phase `012` as post-closure pre-implementation preparation;
- readiness versus execution authorization;
- canonical knowledge versus phase records;
- how to start a cloned project;
- agent instruction entry points;
- where to read next.

## 8. Agentic governance audit

Review agent instructions as a coherent system.

### Shared policy

Shared project behavior belongs primarily in:

- [`../../methodology/agentic-development-governance.md`](../../methodology/agentic-development-governance.md);
- root `AGENTS.md` as a concise operational adapter.

### Claude

Claude Code reads `CLAUDE.md`; use an import of `AGENTS.md` so shared policy is not duplicated. Add Claude-only guidance only when Claude's tool/runtime semantics require it.

### Cursor

Cursor can consume `AGENTS.md` and supports project rules in `.cursor/rules/*.mdc`. Use `.mdc` files for focused path/task-specific rules where scoped loading reduces noise.

### Codex

Codex should receive repository-wide operational guidance through `AGENTS.md`, with deeper design knowledge linked from the OKF bundle rather than copied into the instruction file.

## 9. Agent-rule quality criteria

Agent rules should be:

- concise enough to follow reliably;
- specific enough to verify;
- grounded in repository authority;
- lifecycle-aware;
- explicit about current-truth versus history;
- resistant to agentic bloat;
- clear about inspect-before-create behavior;
- clear about documentation updates when semantics change;
- clear that implementation convenience does not override protected authority or concept semantics;
- replaceable as tool-specific conventions evolve.

Avoid vague rules such as "write good code" or "keep docs updated" when a more concrete repository behavior can be stated.

## 10. Development anti-bloat baseline

Before implementation begins, establish an expectation that agents:

- do not create speculative files, abstractions, services, tests, or configuration;
- do not add documentation merely to narrate their work;
- do not duplicate canonical design in source comments or tool rules;
- prefer existing repository patterns once implementation patterns legitimately exist;
- remove temporary exploration artifacts;
- keep changes scoped to the requested behavior;
- add verification proportional to consequence and change risk.

This does not forbid necessary structure. It requires a current reason for it.

## 11. Design-to-engineering handoff audit

Confirm downstream engineering can discover the conceptual obligations it must preserve, including as relevant:

- product/variant scope;
- concept purposes and behavior;
- application actions and synchronizations;
- authority boundaries;
- lifecycle/history/correction/recovery semantics;
- mapping and disclosure obligations;
- accepted limitations/non-goals;
- conceptual privacy/safety/interoperability/consistency properties;
- validation scenarios and known misfit lessons;
- unresolved technical questions.

Do not convert those obligations into architecture choices inside Phase 012.

## 12. Closure regression handling

Phase 012 is not allowed to polish over a broken Phase 011 closure.

If the repository audit discovers a material design-authority defect:

1. record the Phase 012 finding;
2. reopen Phase 011 or the natural earlier design phase;
3. correct canonical truth;
4. propagate downstream effects;
5. rerun affected audits/validation;
6. return to Phase 012 only after closure is valid again.

## 13. Audit evidence versus current truth

Phase 012 may generate audit tables, stale-document inventories, link findings, and rule-comparison notes as phase evidence.

Do not promote these wholesale into canonical truth.

Promote only durable repository policies, corrected semantics, accepted boundaries, and stable governance rules to their natural owners.

## 14. Completion standard

Pre-implementation repository readiness exists when:

- current knowledge is discoverable and unambiguous;
- OKF structure is sound enough for humans and agents;
- stale current documentation has been corrected or superseded;
- indexes and links support progressive disclosure;
- README orientation is current;
- Claude, Cursor, and Codex share coherent rules without policy duplication;
- the Phase 011 closure remains valid;
- downstream engineering can identify what it must preserve without being handed premature architecture;
- implementation execution has not started merely because preparation succeeded.
