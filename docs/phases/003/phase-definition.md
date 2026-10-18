---
type: Phase Definition
title: Phase 003 — Concept Definition, Operational Principles & Behavioral Specification
description: Converts retained concept candidates into precise, representation-independent behavioral specifications grounded in purpose, operational principle, abstract state, and actions.
tags: [phase-003, concept-definition, operational-principle, state-machine, actions, behavioral-specification]
sources:
  - id: jackson-op
    resource: https://essenceofsoftware.com/tutorials/concept-basics/principle/
    title: Operational principles — Daniel Jackson
  - id: jackson-state
    resource: https://essenceofsoftware.com/tutorials/concept-basics/state/
    title: Concept state — Daniel Jackson
  - id: jackson-machine
    resource: https://essenceofsoftware.com/tutorials/concept-basics/concept-as-machine/
    title: Concepts are state machines — Daniel Jackson
---

# Phase 003 — Concept Definition, Operational Principles & Behavioral Specification

## Role in the lifecycle

Phase 003 turns the plausible concept candidates retained by Phase 002 into explicit behavioral specifications.

It is the point at which a candidate must become understandable through its own purpose, archetypal behavior, abstract memory, and permitted actions rather than through a name, feature description, domain noun, UI flow, or implementation structure.

Phase 003 does **not** prove that the concept is correctly factored. It makes behavior precise enough that Phase 004 can rigorously challenge specificity, completeness, independence, boundary placement, and genericity.

## Methodological intention

Specify each retained concept with enough semantic precision to explain:

- why the concept exists;
- how an archetypal use of the concept fulfills that purpose;
- what abstract state the concept must remember;
- what actions can change or query that state;
- what inputs, outputs, conditions, and effects characterize those actions;
- what invariants or lifecycle/time/history/authority semantics are intrinsic where relevant;
- what choices are deliberately left open because they do not belong to the concept's promise.

Jackson describes concepts as state machines and uses state/action specification to define full behavior beyond the operational principle's archetypal story.[^jackson-machine]

[^jackson-machine]: Daniel Jackson, "Concepts are state machines."

## Relationship to Phase 002

Phase 002 answers whether a candidate is plausible enough to deserve specification.

Phase 003 is allowed to discover that the answer was wrong.

Detailed behavioral definition may expose that a candidate is empty, overloaded, derivative, badly named, inseparable from another concept, or not meaningfully user-facing. Such a candidate may be reframed, returned to discovery, deferred, or rejected rather than forced into a completed specification.

## Relationship to Phase 004

Phase 003 establishes behavioral meaning.

Phase 004 evaluates the modular quality of that meaning.

The boundary is:

- **Phase 003 asks:** What does this concept mean and what behavior does it permit or produce?
- **Phase 004 asks:** Is this behavior factored into the right concept boundary, sufficiently specific and complete, independently understandable, and appropriately generic?

Phase 003 should surface suspected modularity problems but not collapse the Phase 004 audit into specification work.

## Governing Phase 003 support contracts

Phase 003 is governed by:

- [003-A — Specification Scope, Concept Identity, Behavioral Coverage & Subphase Planning](003-a-start-gate.md);
- [Concept Behavioral Specification Contract](concept-specification-contract.md);
- [Phase 003 Consolidation, Exit Review & Phase 004 Handoff Template](exit-review-template.md);
- repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md);
- [Design-Only Guardrails](../../methodology/design-only-guardrails.md).

These define required semantic coverage and gate behavior without prescribing a fixed notation, fixed concept count, or fixed B–X subphase sequence.

## Operational principle and full behavior

Jackson defines an operational principle as a characteristic story showing how a concept is used and how it fulfills its purpose.[^jackson-op]

The OP is intentionally not exhaustive. Phase 003 uses abstract state and actions to specify the wider behavioral space that the OP alone cannot define.

A concept specification should therefore be understandable in two complementary ways:

1. **Purpose + operational principle** explain why the concept matters and how its characteristic value is realized.
2. **State + actions + constraints** define what behavior is actually possible.

[^jackson-op]: Daniel Jackson, "Operational principles."

## Abstract-state discipline

Jackson describes concept state as the concept's memory: what must be remembered so future actions can behave correctly.[^jackson-state]

Phase 003 therefore requires state to be:

- sufficient for the intended behavior;
- no richer than necessary without explicit rationale;
- abstract enough to avoid premature implementation commitment;
- independent of another application concept's private type structure;
- shaped by behavior rather than by database schemas, domain ontologies, object models, or existing storage.

Where an object supplied by another concept will participate later, use a generic/abstract identity or type parameter rather than importing the other concept into this specification.

[^jackson-state]: Daniel Jackson, "Concept state."

## Action discipline

Actions define meaningful state transitions or queries at the conceptual level.

They should make inputs, outputs, validity conditions, and effects explicit enough to reason about behavior without implying a representation.

An action may be user/actor initiated, system/internal to the concept, or read/query behavior where that distinction matters semantically.

Concept actions are **not** API endpoints, service methods, message handlers, UI controls, workflow-engine steps, or database operations.

## Deliberate under-specification

A precise design need not make every implementation choice.

When several outcomes all satisfy the concept's promise, Phase 003 may intentionally leave the choice open. This preserves representation and algorithm freedom rather than inventing a rule the concept does not require.

The phase must distinguish deliberate under-specification from unresolved design questions and accidental omissions.

## Required specification coverage

Every Phase 003 exit must establish or explicitly disposition, for each retained concept as applicable:

- concept identity and purpose;
- operational principle;
- abstract types/parameters;
- abstract state;
- actions;
- inputs and outputs;
- preconditions/guards and effects/postconditions;
- invariants/state constraints;
- initial/lifecycle behavior;
- temporal/historical/correction semantics;
- intrinsic authority semantics;
- read/query behavior;
- deliberate under-specification;
- unresolved boundary/modularity questions for Phase 004.

This is a semantic coverage requirement, not a mandatory document section count or formal notation.

## Expected durable outputs

By exit, the canonical corpus should make each retained concept independently discoverable with a current specification sufficient to answer:

- What is this concept for?
- What archetypal behavior demonstrates its value?
- What does it remember?
- What can happen to or through it?
- Under what conceptual conditions?
- With what effects or observable results?
- What conditions must remain true?
- What lifecycle/time/history/authority rules are intrinsic?
- What choices are intentionally left open?
- What suspected modularity/boundary issues remain for Phase 004?

Detailed specification reasoning, rejected variants, and exploratory notation belong in phase evidence rather than being duplicated into current canonical concept documents.

## Canonical and documentation discipline

By Phase 003, a stable concept identity will usually merit a natural canonical concept document. Refine an existing provisional Phase 002 owner when one exists rather than creating parallel specifications.

Concept documents should link to authoritative Phase 001 purpose knowledge instead of copying the full purpose rationale, and should use normal Markdown references to relevant current knowledge rather than becoming self-contained duplicate repositories.

Indexes should expose current concept specifications, not repeat them. Renames, rejections, and reframings require index/reference/supersession review under the repository-wide documentation-governance contract.

## Explicit exclusions

Phase 003 must not:

- treat concept state as a database or persistence schema;
- treat a concept as a class, aggregate, bounded context, service, or module;
- treat concept actions as API endpoints, commands, events, handlers, or UI controls;
- select storage structures, indexes, caches, event logs, queues, topics, protocols, frameworks, or cloud services;
- specify source/package topology or deployment boundaries;
- design user-interface mappings;
- define authoritative cross-concept synchronizations that belong to Phase 005;
- normalize direct intrinsic dependence on another application concept;
- encode implementation algorithms where the concept only promises a semantic result;
- create executable state machines, prototypes, tests, scaffolding, schemas, APIs, or application code.

## Entry criteria

Phase 003 may begin only when:

- Phase 002 has passed or passed with explicitly non-blocking carry-forwards;
- retained candidate concepts and their purpose associations are discoverable;
- significant candidate alternatives/history needed for interpretation are available;
- known specification/boundary questions are explicit enough to plan work;
- `003-A` can define a responsible specification plan without treating the candidates as final.

If candidate identity or purpose is too weak to support meaningful behavioral specification, return to Phase 002 or Phase 001 as appropriate.

## Exit criteria

Phase 003 may exit only when its project-specific exit review establishes that:

- every concept proceeding to Phase 004 has a defensible current purpose and semantic identity;
- operational principles genuinely demonstrate concept value and are supported by the full behavior;
- abstract state is sufficient, appropriately minimal, and representation-independent;
- important actions, inputs/outputs, conditions, and effects are explicit;
- relevant invariants/lifecycle/time/history/correction/authority semantics are established or explicitly dispositioned;
- deliberate under-specification is distinguished from unresolved questions and missing behavior;
- obvious cross-concept leakage and representation contamination have been removed or explicitly flagged;
- candidate identity changes/rejections are reconciled in canonical knowledge;
- current concept specifications are discoverable, coherent, non-duplicative, and OKF-conformant;
- unresolved modularity questions are explicit for Phase 004 rather than hidden;
- no representation, architecture, or implementation work has begun;
- Phase 004 can perform its modularity audit from repository knowledge alone and remains free to split, merge, generalize, reframe, or reject concepts.

## Control structure

Phase 003 begins with:

- [003-A — Specification Scope, Concept Identity, Behavioral Coverage & Subphase Planning](003-a-start-gate.md).

`003-A` derives only the project-specific substantive specification subphases required by the actual concept set and unresolved questions.

The final project-specific subphase performs consolidation, documentation-integrity review, exit decision, and Phase 004 handoff using the [Phase 003 exit-review template](exit-review-template.md).

The Base template does not prescribe the count or letters between those control points.

## Exit outcomes

Use the repository-wide outcomes:

- **PASS** — Phase 003 fulfills its specification purpose and Phase 004 may begin.
- **PASS WITH CARRY-FORWARD** — specification is sufficient while explicit non-blocking modularity/boundary questions continue with named destinations.
- **NOT READY TO EXIT** — material behavioral-definition, representation-contamination, documentation, or prerequisite gaps require additional Phase 003 work or reopening an earlier phase.

## Implementation state

Throughout Phase 003, including after successful exit:

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet

The only authorized handoff is into Phase 004 concept modularity, boundary, specificity, completeness, independence, and genericity analysis.
