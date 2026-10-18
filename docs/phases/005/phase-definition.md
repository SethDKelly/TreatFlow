---
type: Phase Definition
title: Phase 005 — Concept Composition, Synchronization, Automation & Synergy
description: Composes independently specified concepts through explicit synchronization and deliberate application-action exposure while preserving intrinsic concept semantics and remaining representation-independent.
tags: [phase-005, composition, synchronization, application-actions, automation, synergy, concept-design]
sources:
  - id: jackson-sync
    resource: https://essenceofsoftware.com/tutorials/concept-basics/sync/
    title: Concept composition and sync — Daniel Jackson
  - id: jackson-software-concepts
    resource: https://essenceofsoftware.com/tutorials/concept-basics/sw-as-concepts/
    title: Software = concepts — Daniel Jackson
---

# Phase 005 — Concept Composition, Synchronization, Automation & Synergy

## Role in the lifecycle

Phase 005 moves from a set of independently sound concepts to explicit application-level conceptual behavior.

Phase 004 establishes that each concept has a coherent purpose, minimally fulfills it, and can be understood independently. Phase 005 deliberately preserves that independence while explaining how the application coordinates concept actions through **synchronization**.

Jackson describes an application as a collection of interacting concepts and uses synchronization to compose their state-machine behaviors without defining one concept in terms of another.[^jackson-software-concepts]

[^jackson-software-concepts]: Daniel Jackson, "Software = concepts."

## Methodological intention

Define the application's conceptual action surface and cross-concept behavior by specifying which concept actions are exposed, which participate together, what triggers coordinated behavior, how semantic values flow among actions, and what automation or synergy results.

A synchronization constrains possible concept executions so that when a designated action occurs, specified participating actions occur with it.[^jackson-sync]

Phase 005 uses that semantic model without prescribing any runtime realization.

[^jackson-sync]: Daniel Jackson, "Concept composition and sync."

## Relationship to Phase 004

Phase 004 asks:

> Are these the right independent concepts?

Phase 005 asks:

> Given these independent concepts, how does this application make their actions participate together?

A synchronization must not compensate for a known Phase 004 modularity failure.

If two purported concepts cannot deliver coherent value independently, revisit their boundaries. If both concepts are independently sound but the application needs their actions coordinated, synchronization is the appropriate design mechanism.

## Relationship to Phase 006

Phase 005 defines **interaction among included concepts**.

Phase 006 defines **extrinsic inclusion/dependence among concepts and coherent application/product subsets**.

A synchronization edge is not automatically a dependency edge. Two concepts may interact when both are present without one necessarily being required in every product that includes the other.

Phase 005 should identify likely inclusion/dependence questions but leave their authoritative resolution to Phase 006.

## Relationship to Phase 007

Phase 005 defines the conceptual application action surface and resulting behavior.

Phase 007 later determines how that behavior is represented, invoked, perceived, named, and understood by users.

An application action in Phase 005 is therefore not a button, screen, route, form, endpoint, or other representation.

## Relationship to Phase 009

Phase 005 must already reject obvious synchronization contradictions and interference.

Phase 009 performs the later system-wide integrity audit after dependence, mapping, and familiarity work may have changed the surrounding design context.

Known composition defects must not be deferred merely because a later integrity phase exists.

## Governing Phase 005 support contracts

Phase 005 is further governed by:

- [005-A — Composition Scope, Synchronization Semantics, Application Action Surface & Subphase Planning](005-a-start-gate.md);
- [Concept Composition & Synchronization Contract](composition-synchronization-contract.md);
- [Phase 005 Consolidation, Exit Review & Phase 006 Handoff Template](exit-review-template.md);
- repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md);
- [Design-Only Guardrails](../../methodology/design-only-guardrails.md).

These establish semantic and documentation obligations without prescribing a fixed synchronization notation, document count, or B–X subphase sequence.

## Primary design questions

Phase 005 should answer, as relevant:

- What application-level behaviors require actions from multiple independent concepts to participate together?
- Which concept action triggers a reactive synchronization, where a trigger exists?
- Which concept actions participate in each synchronization?
- How do semantic inputs and outputs correspond or flow among those actions?
- What application-level conditions determine whether a synchronization is available or required?
- Which concept-intrinsic preconditions, invariants, lifecycle states, and authority rules constrain the composition?
- Which concept actions are directly exposed as application actions?
- Which concept actions are available only through multi-concept or system-triggered composition?
- Which concept-valid actions are intentionally unavailable in this application?
- Does synchronization reveal an unresolved Phase 003/004 specification or boundary problem?
- Does any composition over-constrain independent behavior or fail to coordinate behavior the application promises?
- Can synchronizations chain, and if so what conceptual consequences result?
- What useful automation arises from composition?
- Does any composition produce genuine synergy beyond the separate benefits of its constituent concepts?
- What inclusion/dependence questions should be carried to Phase 006 rather than incorrectly resolved here?

## Required composition coverage

Every Phase 005 exit must establish or explicitly disposition:

- material cross-concept application behavior;
- synchronization triggers and participating actions where relevant;
- semantic data/input/output bindings;
- relevant synchronization conditions;
- application action exposure and intentional non-exposure;
- precondition/invariant/authority compatibility;
- chained synchronization consequences where material;
- over-synchronization risk;
- under-synchronization risk;
- conceptual automation;
- supported synergy claims, if any;
- boundary/specification defects exposed during composition;
- Phase 006 inclusion/dependence questions;
- documentation/index/reference coherence for current composition knowledge.

This is a semantic coverage requirement, not a required interaction matrix, synchronization count, notation, or subphase count.

## Synchronization discipline

A synchronization adds an application-level constraint among concept actions; it does not merge their intrinsic specifications.

Each concept continues to own its purpose, state, actions, preconditions/effects, invariants, and intrinsic lifecycle/authority semantics.

The synchronization layer owns only the additional relationship that explains how those existing actions participate together in the application.

If a synchronization requires changing what a participant action means intrinsically, first determine whether the concept specification or boundary is wrong.

## Application action-surface discipline

The set of actions defined by included concepts is not automatically the set of actions offered by the application.

Jackson's composition examples explicitly use synchronization to expose some concept actions and omit others.[^jackson-sync]

Phase 005 must therefore make current application behavior discoverable as a deliberate action surface, including:

- one-action exposure of a concept action;
- multi-concept application actions;
- reactive/system-triggered composition;
- intentionally unavailable concept actions.

This is conceptual availability, not API or interface design.

## Semantic binding discipline

When one participating action supplies a value to another, document the semantic relationship among those values.

Do not specify serialization, message shape, transport, endpoint payload, shared storage, or runtime adapter behavior.

If the necessary semantic value is not supplied or accepted by the concept specifications, treat that as a design problem rather than filling the gap with assumed implementation machinery.

## Preconditions, invariants, and authority

Synchronization does not waive participant preconditions or invariants.

The application composition must make sense in the states in which it is offered or triggered.

Where participating actions have authority restrictions, Phase 005 must determine whether the coordinated behavior respects those restrictions conceptually. It must not assume that authentication, permissions, middleware, retries, or error handling will repair a contradictory design later.

## Over-synchronization and under-synchronization

Phase 005 must test both directions.

**Over-synchronization** occurs when concept actions are tied together more strongly than the application's purposes require, making otherwise valuable independent behavior unavailable or importing incidental workflow coupling.

**Under-synchronization** occurs when the application promises cross-concept behavior that the current synchronization model does not actually ensure.

Both are conceptual defects and require explicit disposition before exit.

## Chaining

A concept action participating in one synchronization may itself trigger another synchronization. Jackson explicitly demonstrates such chained composition.[^jackson-sync]

Where chaining is material, the phase must make the conceptual consequence understandable and examine possible cycles, repeated reactions, incompatible conditions, or hidden consequences.

This does not authorize a runtime sequence diagram or distributed execution protocol.

## Automation

Automation exists conceptually when one action causes additional concept behavior without requiring a separate user initiation for every participating action.

Phase 005 should explain what initiates the automation, what additional behavior occurs, what purpose it serves, and what relevant authority/consequence constraints apply.

Automation does not imply a worker, scheduler, event handler, workflow engine, agent, or background process.

## Synergy

Jackson describes **compositional synergy** as a case where the combined design provides additional benefit beyond the sum of the constituent concept benefits.[^jackson-sync]

Synergy should be documented only when that additional benefit can be explained and traced to the composition.

A project does not fail Phase 005 merely because no special synergy exists.

## Counterexample discipline

Phase 005 should actively challenge apparently clean synchronizations.

Useful probes include:

- What promised behavior fails if this synchronization is removed?
- Could the trigger validly occur when another participant cannot?
- Is an optional concept action being made mandatory without purpose justification?
- Is a concept action exposed that this application should not offer?
- Does one participant require semantic information the others do not provide?
- Does the synchronization bypass intrinsic authority or lifecycle rules?
- Does chaining create a cycle or unintended consequence?
- Is a proposed synchronization merely concealing an incorrect concept boundary?
- Is an interaction being mislabeled as an inclusion dependency, or vice versa?

## Expected durable outputs

By exit, canonical current knowledge should make discoverable:

- the current application action surface;
- established synchronization/composition rules;
- participating concepts/actions, triggers, bindings, and relevant conditions;
- meaningful system-triggered or chained composition behavior;
- conceptual automation and any supported synergy;
- concept actions intentionally unavailable in the application where that distinction matters;
- explicit Phase 006 inclusion/dependence questions that remain provisional.

Detailed rejected synchronization alternatives, exploratory matrices, counterexamples, and composition debate belong primarily in phase records.

## Documentation and knowledge authority

Phase 005 is vulnerable to duplication because the same interaction can easily be repeated in concept files, interaction matrices, workflow prose, diagrams, and synchronization documents.

Therefore:

- establish one natural canonical owner for each current synchronization/composition rule;
- link to concept specifications rather than copying action definitions;
- state only the composition-specific trigger/participation/binding/condition/result semantics;
- use meaningful links to participating concepts and relevant purpose/success knowledge;
- preserve rejected/alternative compositions in phase history;
- keep Phase 006 dependence hypotheses explicitly provisional;
- supersede stale Phase 004 seam hypotheses where they could be mistaken for current composition truth;
- keep indexes concise and current;
- consolidate avoidable duplicate interaction summaries;
- apply the repository-wide OKF/documentation-governance audit before exit.

## Explicit exclusions

Phase 005 must not:

- choose synchronous versus asynchronous runtime execution;
- define API orchestration, RPC flows, HTTP endpoints, controllers, or handlers;
- define event buses, messages, queues, topics, webhooks, or subscriptions;
- define database transactions, commit protocols, consistency models, or storage cascades;
- define workflow engines, sagas, compensation logic, retries, timeouts, or backoff;
- define workers, jobs, schedulers, agents, or background services;
- define UI events, routes, screens, or component interactions;
- define integration/service architecture or source/package topology;
- merge concepts merely because they synchronize frequently;
- treat every synchronization as an inclusion dependency;
- create executable prototypes, tests, fixtures, schemas, orchestration, or implementation artifacts.

## Entry criteria

Phase 005 may begin only when:

- Phase 004 has passed or passed with explicitly non-blocking composition/dependence/reuse carry-forwards;
- the current concept set is sufficiently specific, complete, independent, and behaviorally re-specified;
- canonical concept owners are discoverable;
- likely synchronization seams and current open questions are visible;
- `005-A` can define a responsible composition plan without repairing known basic modularity defects.

If composition work immediately depends on an unsound concept boundary or undefined participant action, reopen Phase 003/004 rather than normalizing the problem in a synchronization.

## Exit criteria

Phase 005 may exit only when its final project-specific exit review establishes that:

- material application-level cross-concept behavior is explicitly explained;
- synchronizations have clear enough triggers/participants/bindings/conditions/results to be understood conceptually;
- the application action surface is deliberate rather than an accidental union of all concept actions;
- participant preconditions, invariants, lifecycle states, and authority conditions are compatible;
- concepts remain intrinsically independent and their action semantics have not been rewritten through composition;
- obvious over-synchronization and under-synchronization have been addressed;
- material chained behavior and possible cycles are understood;
- automation is purposeful and conceptually explicit;
- synergy is claimed only where an additional compositional benefit is defensible;
- composition-exposed Phase 003/004 defects have been corrected rather than hidden;
- interaction relationships are distinguished from Phase 006 inclusion/dependence questions;
- current synchronization/composition knowledge has coherent canonical ownership, indexes, links, terminology, and OKF structure;
- no runtime orchestration, integration architecture, or implementation mechanism has entered design authority;
- Phase 006 can begin from repository knowledge alone and analyze coherent concept subsets without first guessing how the concepts interact.

## Control structure

Phase 005 begins with:

- [005-A — Composition Scope, Synchronization Semantics, Application Action Surface & Subphase Planning](005-a-start-gate.md).

`005-A` derives only the project-specific substantive composition/synchronization workstreams required by the actual concept system.

The final project-specific subphase performs Phase 005 consolidation, documentation-integrity audit, exit review, and Phase 006 handoff using the [Phase 005 exit-review template](exit-review-template.md).

The template does not prescribe the count or letters between those control points.

## Exit outcomes

Use the repository-wide outcomes:

- **PASS** — Phase 005 establishes a coherent application composition and Phase 006 may begin.
- **PASS WITH CARRY-FORWARD** — composition is sound while explicit non-blocking dependence/mapping/integrity questions continue with named destinations.
- **NOT READY TO EXIT** — material synchronization, action-surface, compatibility, over/under-composition, chaining, documentation, or implementation-contamination problems require more work or reopening an earlier phase.

## Implementation state

Throughout Phase 005, including after successful exit:

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet

The only authorized handoff is into Phase 006 concept-dependence/product-family/subset/scope analysis.
