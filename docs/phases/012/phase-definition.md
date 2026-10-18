---
type: Phase Definition
title: Phase 012 — Pre-Implementation Audit, OKF Hardening & Agentic Development Preparation
description: Performs a post-concept-design repository audit, documentation/OKF hardening, stale-knowledge cleanup, README refresh, agentic development-rule preparation, and final implementation-preparation handoff without beginning feature implementation.
tags: [phase-012, pre-implementation, okf, documentation, agentic-development, audit, readiness]
sources:
  - id: okf-v02
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: Open Knowledge Format v0.2 Specification
  - id: claude-memory
    resource: https://code.claude.com/docs/en/memory
    title: Claude Code — project instructions and memory
  - id: cursor-rules
    resource: https://cursor.com/docs/rules
    title: Cursor — Rules
  - id: codex-agents
    resource: https://openai.com/business/guides-and-resources/how-openai-uses-codex/
    title: How OpenAI uses Codex — AGENTS.md guidance
---

# Phase 012 — Pre-Implementation Audit, OKF Hardening & Agentic Development Preparation

## Role in the lifecycle

Phase 012 is a **post-concept-design, pre-implementation transition phase**.

It is deliberately outside the Jackson-aligned concept-design lifecycle, which closes at Phase 011. Phase 012 exists because a repository that is conceptually ready may still need documentation reconciliation, OKF hardening, stale-knowledge cleanup, README polish, agent-instruction preparation, and implementation-handoff hygiene before downstream engineering work begins.

Phase 012 does not reopen concept design by default, but it must reopen Phase 011 or the appropriate earlier design phase if its audit discovers a material conceptual or canonical-authority defect.

## Methodological intention

Convert a successfully closed concept-design repository into a clean, trustworthy, agent-usable implementation-preparation baseline without prematurely selecting or constructing the implementation.

The phase should leave humans and coding agents able to answer:

- What is current authoritative design truth?
- Which documentation is historical, superseded, stale, or provisional?
- Does the `docs/` corpus conform well to the adopted OKF version?
- Are indexes, links, sources, lifecycle/freshness signals, and canonical ownership coherent?
- Does the root README accurately explain how the repository is used now?
- What shared rules must Claude, Cursor, Codex, and future agents follow?
- What downstream engineering obligations exist without already choosing the architecture or implementation?
- Is the repository polished enough for a separate implementation-planning/engineering process to begin safely?

## Relationship to Phase 011

Phase 011 determines whether concept design is closed and may transition **implementation readiness** to `ready` while execution remains `not started`.

Phase 012 consumes that closure as its prerequisite. It does not weaken or reinterpret the Phase 011 decision.

If Phase 012 discovers:

- contradictory current design authority;
- an unpropagated design correction;
- an orphaned concept/purpose/action;
- a material unresolved misfit;
- implementation contamination that biased concept semantics;
- another issue that invalidates the closure decision;

then Phase 011 or the natural earlier design owner must be reopened before Phase 012 can exit.

## Relationship to downstream engineering

Phase 012 prepares the repository for downstream work but is not feature implementation.

It may:

- audit documentation and repository knowledge;
- update repository-level explanatory documentation;
- establish agent instructions and development governance;
- identify engineering obligations and unresolved technical questions;
- define implementation-preparation handoff requirements;
- organize non-executable planning knowledge.

It must not:

- implement product features;
- choose architecture merely for convenience;
- create production schemas, migrations, APIs, services, persistence, infrastructure, or deployment topology;
- bootstrap a framework as evidence of readiness;
- create executable application tests or implementation scaffolding unless a separate downstream process has explicitly begun and authorized them.

## Governing contracts

Phase 012 is governed by:

- [012-A — Repository Audit Scope, OKF Baseline, Staleness Strategy & Agentic Preparation Planning](012-a-start-gate.md);
- [Pre-Implementation Repository Readiness Contract](pre-implementation-readiness-contract.md);
- [Phase 012 Exit Review & Engineering Handoff Template](exit-review-template.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md);
- [Agentic Development Governance](../../methodology/agentic-development-governance.md);
- [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md) where its start-gate, dynamic-subphase, evidence, and exit-review disciplines remain applicable;
- [Design-Only Guardrails](../../methodology/design-only-guardrails.md) for the distinction between readiness and execution.

## Primary preparation questions

Phase 012 should answer, as relevant:

- Does every ordinary OKF concept document have valid frontmatter and a useful `type`?
- Are reserved `index.md`/`log.md` files being used correctly?
- Does the bundle root correctly declare the adopted OKF version?
- Are directory indexes concise, current, and useful for progressive disclosure?
- Are cross-links meaningful and free of known stale/broken destinations?
- Are `sources` used where provenance materially matters?
- Would optional lifecycle/freshness metadata (`status`, `stale_after`, `generated`, `verified`) add real maintenance value anywhere, or would it merely add noise?
- Are stale, duplicated, superseded, orphaned, or contradictory current documents present?
- Do historical phase records remain clearly historical rather than competing with canonical truth?
- Does terminology remain consistent after Phases 008–011 refinements?
- Does the root README accurately explain Base, its lifecycle, Phase 012, and the current readiness boundary?
- Can a new human or coding agent find the current design without reading every phase record?
- Are agentic instructions concise, cross-tool, lifecycle-aware, and grounded in OKF/canonical authority?
- Do Claude, Cursor, and Codex receive compatible instructions without three independent copies of repository policy?
- Are development rules strong enough to prevent agentic bloat and stale-document coding, while remaining small enough to follow reliably?
- Is the final handoff explicit about what engineering must preserve without prescribing how to implement it?

## Required preparation coverage

Every Phase 012 exit must establish or explicitly disposition:

- repository documentation inventory and ownership review;
- OKF v0.2 conformance review;
- progressive-disclosure/index audit;
- link/reference/provenance audit;
- stale/superseded/duplicate/orphan documentation audit;
- terminology and lifecycle/readiness consistency;
- root README refresh;
- agentic governance and tool-adapter readiness for Claude, Cursor, and Codex;
- implementation-facing obligation/handoff quality;
- any closure-regression findings and reopening decisions;
- final pre-implementation readiness decision.

This is a repository-preparation requirement, not a requirement to generate automated documentation tooling or implementation code.

## OKF hardening discipline

OKF conformance should remain minimal and meaningful.

Do not add metadata mechanically merely because the standard supports it.

Use lifecycle/freshness fields when they make a real maintenance question answerable. For example, `status` may be useful for durable deprecated/superseded knowledge, and `stale_after` may be useful for time-sensitive external facts. Stable hand-authored methodology documents generally do not need an artificial expiration date.

Prefer structural correctness, canonical ownership, links, provenance, and explicit supersession over metadata accumulation.

## Stale-document discipline

Treat a document as potentially stale when one or more of these apply:

- its terminology no longer matches current canonical identities;
- it references an obsolete phase/readiness model;
- later canonical knowledge supersedes it;
- its links or indexes point to retired locations;
- it describes an earlier implementation boundary as current;
- its external source has materially changed;
- it is historical phase evidence being presented as present-tense authority;
- explicit lifecycle/freshness metadata indicates staleness.

Stale phase evidence may remain historical. Stale current authority must be corrected, superseded, or removed from current navigation.

## README discipline

The root README should be a concise repository entry point, not a duplicate methodology manual.

It should explain:

- what Base is;
- the Jackson-aligned concept-design lifecycle boundary (`000–011`);
- the Phase 012 pre-implementation transition;
- current readiness/execution semantics;
- the canonical-versus-phase-record documentation model;
- where to start reading;
- how coding agents are governed;
- that cloned projects must execute the lifecycle rather than assuming the template itself constitutes completed design.

## Agentic-rule discipline

Use one shared cross-agent rule model with thin adapters.

Base's preferred structure is:

- `AGENTS.md` — portable project instructions for Codex and other compatible agents; Cursor can also consume this format;
- `CLAUDE.md` — imports the shared `AGENTS.md` and adds only Claude-specific instructions when needed;
- `.cursor/rules/*.mdc` — focused Cursor-specific rules where path/task scoping provides value;
- [`docs/methodology/agentic-development-governance.md`](../../methodology/agentic-development-governance.md) — durable repository policy and rationale.

Do not maintain three independent copies of architecture rules, concept semantics, or documentation policy.

## Agentic anti-bloat preparation

Phase 012 should make explicit rules that agents:

- inspect before creating;
- refine natural owners before adding files;
- distinguish canonical truth from phase history;
- avoid speculative abstractions and scaffolding;
- keep temporary reasoning artifacts out of the final repository;
- use narrow verification appropriate to the change;
- update documentation when public/user-facing semantics change;
- surface design contradictions rather than silently coding around them;
- preserve protected human/organizational authority established by the design.

## Expected durable outputs

By exit, the repository should normally include:

- a current root README;
- current methodology/index navigation;
- corrected stale or misleading documentation identified by the phase;
- a documented OKF audit result in phase evidence;
- current agentic development governance;
- tool-specific agent adapters/rules appropriate to Claude, Cursor, and Codex;
- a clear downstream engineering handoff entry point or exit record;
- explicit remaining limitations/technical questions that are non-blocking for concept-design closure.

Do not create a monolithic duplicate "implementation specification."

## Documentation authority

Phase 012 itself is especially vulnerable to creating audit reports that become accidental parallel truth.

Therefore:

- audit findings belong in phase records;
- durable documentation rules belong in methodology governance;
- durable project semantics remain in canonical owners;
- README content should point to authority rather than reproduce it wholesale;
- agent adapters should point to shared governance/canonical knowledge rather than copy it;
- stale/superseded material should remain historical only when useful for traceability.

## Entry criteria

Phase 012 may begin only when:

- Phase 011 has closed concept design with `PASS` or `PASS WITH BOUNDED CARRY-FORWARD`;
- implementation readiness is `ready`;
- implementation execution is `not started`;
- no known concept-design blocker remains;
- canonical design entry points and final closure evidence are discoverable;
- `012-A` can define the repository-preparation audit without compensating for unfinished concept design.

## Exit criteria

Phase 012 may exit only when:

- OKF structural/conformance issues in scope are corrected or explicitly dispositioned;
- stale/superseded/duplicate current documentation has been reconciled;
- current indexes and cross-links support progressive disclosure;
- root README accurately reflects the repository and lifecycle;
- agentic development governance is current and tool adapters are coherent;
- no agent adapter materially contradicts canonical/methodology authority;
- implementation-facing obligations are discoverable without architecture lock-in;
- Phase 011 closure remains valid after the audit;
- no application implementation has begun as part of Phase 012;
- a downstream engineering/planning process can start from a clean, trustworthy repository baseline.

## Exit outcomes

### PASS — PRE-IMPLEMENTATION PREPARATION COMPLETE

Repository documentation, OKF structure, agentic rules, and handoff preparation are adequate for a separate downstream engineering process.

### PASS WITH BOUNDED CARRY-FORWARD — PREPARATION COMPLETE

Only explicitly non-blocking maintenance or downstream engineering questions remain.

### NOT READY TO EXIT

Documentation authority, OKF conformance, staleness, agent-rule conflict, closure regression, or handoff ambiguity requires more Phase 012 work or reopening Phase 011/earlier design work.

## State at successful exit

Phase 012 does not itself start implementation.

- **Implementation readiness:** ready
- **Implementation execution:** not started
- **Implementation execution authorization:** not granted by Phase 012
- **Pre-implementation preparation:** complete

The next step is a separate downstream representation/architecture/engineering lifecycle or implementation-planning process.
