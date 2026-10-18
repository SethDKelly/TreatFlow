---
type: Process Contract
title: Phase Lifecycle Contract
description: Defines the mandatory start gate, dynamic subphase derivation, documentation-coherence discipline, exit review, and handoff structure used by Base lifecycle phases.
tags: [phase, lifecycle, process, gate, handoff, documentation]
---

# Phase Lifecycle Contract

Every high-level phase in a repository cloned from Base follows the same control structure while allowing its substantive subphases to be derived from the actual problem.

Every phase is also governed by the [Documentation Integrity & OKF Governance Contract](documentation-governance.md). Methodological/process correctness and knowledge-corpus integrity are both phase-completion obligations.

## Scope

Phases `000–011` use this contract as the Jackson-aligned concept-design lifecycle.

Phase `012` is a post-closure pre-implementation preparation phase, not part of Jackson's concept-design methodology, but it reuses the same start-gate, dynamic-subphase, evidence, reconciliation, and exit-review structure because those controls remain useful.

Readiness semantics differ after successful Phase 011 closure: Phase 012 may begin with implementation readiness already `ready`, while execution remains `not started` and Phase 012 does not grant execution authorization.

## 1. High-level phase declaration

A high-level phase must state:

- its number and name;
- methodological or process purpose;
- questions it is intended to answer;
- prerequisites and dependencies;
- expected durable outputs;
- explicit exclusions;
- entry criteria;
- exit criteria;
- implementation/readiness status appropriate to its lifecycle position.

For concept-design phases `000–011`, implementation remains `not ready / not started / not yet` until final design closure.

For Phase `012`, readiness may already be `ready` only because Phase 011 established it; execution remains `not started`, and Phase 012 still does not authorize feature implementation.

The declared phase should correspond to a meaningful portion of the adopted lifecycle rather than an arbitrary amount of work.

## 2. Mandatory phase start gate

The first subphase of every high-level phase is a planning and authority gate, conventionally `NNN-A`.

Its purpose is to review the high-level phase intention before substantive phase work begins.

The start gate must:

1. restate the methodological/process purpose of the phase;
2. review prerequisite outputs and unresolved issues handed in from earlier phases;
3. identify dependency order within the phase;
4. identify risks of conflating concepts, purposes, authority, synchronization, implementation, or documentation concerns;
5. determine the logical workstreams actually needed;
6. divide those workstreams into dependency-safe subphases;
7. define completion evidence for each subphase;
8. identify incoming canonical knowledge, expected canonical owners for durable outputs, likely index/cross-link changes, and documentation-drift risks;
9. define the final consolidation, documentation-integrity audit, and exit-review work;
10. confirm that planned documents will reference established knowledge rather than needlessly restate it;
11. confirm the implementation boundary appropriate to the phase.

A start gate must not create a regular-looking document plan at the expense of conceptual or knowledge coherence.

## 3. Dynamic subphase derivation

The template must not assume that all projects need the same number of subphases.

A phase may require `A–D`, `A–J`, or another appropriate range depending on the actual problem.

Subphases should be separated when doing so improves one or more of:

- dependency safety;
- conceptual independence;
- reviewability;
- authority clarity;
- evidence traceability;
- manageable scope;
- documentation ownership and retrieval clarity;
- ability to revisit a decision without invalidating unrelated work.

Subphases must not be created merely to produce a visually regular sequence.

## 4. Subphase discipline

Each substantive subphase should identify:

- purpose;
- questions under examination;
- authoritative inputs and references;
- analysis performed;
- alternatives or ambiguities considered;
- resulting conclusions;
- existing canonical knowledge affected;
- genuinely new canonical/methodology knowledge, if any;
- indexes or cross-links affected;
- unresolved items;
- handoff to the next subphase.

Where conclusions are provisional, label them as provisional rather than prematurely promoting them to canonical truth.

A subphase record does not require a new canonical document. Create a new concept/process document only when the knowledge has a distinct semantic identity that future readers or phases need to reference independently.

## 5. Canonical promotion during a phase

Phase records document the work performed. Durable conclusions belong in their natural current owners.

Promotion to canonical or methodology knowledge may happen during the phase when a conclusion is sufficiently established, but the phase exit review must verify that all durable conclusions have been reflected in their natural owners and that obsolete current statements have been superseded or corrected.

Prefer refining an existing authoritative document over creating a duplicative current source of truth.

## 6. Mandatory phase consolidation and exit review

The final subphase of each high-level phase is a consolidation, exit review, and handoff.

It must evaluate at least:

- whether the phase intention was actually fulfilled;
- whether all planned subphases completed or were explicitly dispositioned;
- whether the resulting design/process state is internally coherent;
- whether concept boundaries remain independent and understandable where relevant;
- whether cross-concept interactions are explicit where required;
- whether relevant specificity, familiarity, integrity, staleness, or repository-readiness concerns were examined as appropriate to the phase;
- whether unresolved risks are clearly carried forward;
- whether canonical/current knowledge reflects current truth;
- whether superseded phase conclusions remain historical rather than authoritative;
- whether avoidable duplicate current statements introduced by the phase have been consolidated;
- whether affected indexes expose current knowledge through progressive disclosure;
- whether important cross-links resolve and point to the intended authority;
- whether new concept/process documents are discoverable and use valid OKF frontmatter;
- whether reserved `index.md`/`log.md` files retain their OKF roles;
- whether terminology and references remain coherent in the scope touched by the phase;
- whether any premature implementation assumptions or activity entered the repository;
- whether the next phase/process has adequate knowledge inputs to begin its own start gate.

The [Documentation Integrity & OKF Governance Contract](documentation-governance.md) defines the full documentation-integrity audit.

## 7. Exit outcomes

A phase exit review must produce one of three outcomes, with Phase 011/012 wording specialized by their own contracts where needed:

### PASS

The phase fulfills its intent and may hand off to the next lifecycle phase/process.

### PASS WITH CARRY-FORWARD

The phase fulfills its intent, but explicitly identified non-blocking issues must be examined later. Each carry-forward item must identify its destination or trigger and, where relevant, its canonical knowledge destination.

### NOT READY TO EXIT

Material design, preparation, or documentation-coherence gaps remain that prevent a sound handoff. Additional work must be defined and completed before the phase can close.

A phase must not be marked complete merely because its originally planned documents exist.

## 8. Handoff contract

Every successful phase exit records:

- current design/preparation state;
- canonical/methodology knowledge created or materially changed;
- authoritative knowledge entry points for the next phase/process;
- important decisions;
- unresolved items and carry-forwards;
- assumptions requiring later validation;
- dependencies imposed on the next phase/process;
- documentation/index/reference changes material to the handoff;
- explicit next high-level phase/process;
- implementation readiness/execution state.

The next phase/process begins by reviewing this handoff and the referenced current knowledge rather than blindly accepting or restating the prior phase narrative.

## 9. Reopening earlier phases

Concept design and repository preparation are iterative. Later analysis may expose a flaw in earlier work.

Earlier conclusions may therefore be revisited without pretending the original phase never happened.

When reopening is necessary:

1. record why the earlier conclusion is being reconsidered;
2. preserve the historical phase record;
3. perform the required new design/preparation work;
4. update the natural current owner;
5. record what was superseded and why;
6. update affected indexes and cross-links;
7. reassess downstream conclusions and documents affected by the change.

Methodological completeness and knowledge coherence are more important than preserving a linear appearance or accidental early file layout.

Phase 012 must use this reopening path when an apparent documentation issue actually reveals a material Phase 011 closure regression.
