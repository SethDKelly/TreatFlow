---
type: Phase Start Gate
title: 005-A — Composition Scope, Synchronization Semantics, Application Action Surface & Subphase Planning
description: Mandatory start gate for planning project-specific concept composition, synchronization, application action exposure, automation, synergy, and coherence work before substantive Phase 005 design begins.
tags: [phase-005, start-gate, composition, synchronization, application-actions, planning]
sources:
  - id: jackson-sync
    resource: https://essenceofsoftware.com/tutorials/concept-basics/sync/
    title: Concept composition and sync — Daniel Jackson
---

# 005-A — Composition Scope, Synchronization Semantics, Application Action Surface & Subphase Planning

## Purpose

This start gate determines how Phase 005 should compose the independently specified and factored concepts handed forward by Phase 004.

It must be completed before authoritative synchronizations are designed.

The gate exists to prevent four recurring failures:

1. treating every conceptual relationship as a synchronization;
2. embedding cross-concept behavior back inside concept specifications instead of composing independent concepts;
3. translating synchronizations into implementation workflows, event choreography, services, queues, transactions, or API orchestration;
4. exposing every action a concept supports simply because that action exists in the concept definition.

Phase 005 plans **application-level conceptual behavior**. It does not design the runtime mechanism that will realize that behavior.

## Governing contracts

Before planning the phase, review:

- [Phase 005 definition](phase-definition.md);
- [Concept Composition & Synchronization Contract](composition-synchronization-contract.md);
- [Phase 005 exit-review template](exit-review-template.md);
- the Phase 004 handoff and authoritative current concept specifications;
- repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md);
- [Design-Only Guardrails](../../methodology/design-only-guardrails.md).

## 1. Confirm the Phase 004 baseline

Establish the current composition baseline from canonical knowledge rather than reconstructing concepts from old phase records.

Confirm:

- the current retained concept set;
- the coherent purpose of each concept;
- current concept actions and their semantic inputs/outputs;
- relevant state/invariants/lifecycle/authority semantics;
- generic parameters introduced to preserve independence;
- boundary changes made in Phase 004;
- likely synchronization seams identified but deliberately left provisional;
- unresolved items carried into Phase 005.

If a concept still has a known specificity, completeness, or independence defect, do not normalize it through synchronization. Reopen Phase 004 or Phase 003 as appropriate.

## 2. Identify composition obligations

Determine what application-level behavior actually requires multiple independent concepts to participate.

Potential sources include:

- product/application purposes and success framing;
- concept operational principles;
- Phase 004 synchronization-seam hypotheses;
- cross-concept user expectations;
- authority or policy obligations;
- lifecycle, temporal, correction, or recovery situations that span concepts;
- application behavior that cannot be explained by any single concept acting alone.

For each proposed obligation, ask first whether it truly crosses concept boundaries. If the behavior belongs entirely to one concept's purpose, fix that concept rather than inventing a synchronization.

## 3. Distinguish synchronization roles

Jackson's synchronization model constrains concept executions so that specified actions occur together when a trigger action occurs; a one-action synchronization may also expose a concept action as an application action.[^jackson-sync]

During planning, distinguish at least these semantic roles where relevant:

- **application exposure** — an existing concept action is made available as an application action without additional concept participation;
- **reactive composition** — one concept action triggers participation by one or more other concepts;
- **coordinated application action** — the application presents one meaningful action whose conceptual realization involves multiple concept actions;
- **system-triggered composition** — a system/internal concept action induces behavior in another concept;
- **chained composition** — one synchronization causes an action that may itself trigger another synchronization.

These are planning categories, not mandatory implementation mechanisms or a closed taxonomy.

[^jackson-sync]: Daniel Jackson, "Concept composition and sync."

## 4. Inventory candidate synchronization seams

For each candidate synchronization, record enough to plan later design without making it authoritative yet:

- application-level purpose or behavior served;
- initiating/trigger concept action, if any;
- participating concept actions;
- semantic values that must flow among actions;
- conditions or constraints that appear relevant;
- expected application-visible result;
- actor/authority implications;
- whether any participating concept action should remain unavailable outside this composition;
- possible chaining with other synchronizations;
- known uncertainty or boundary concern.

Avoid syntax or notation that implies a particular runtime realization.

## 5. Plan the application action surface

A concept's complete action set is not automatically the application's action set.

Jackson's composition example explicitly omits concept actions that the application does not offer.[^jackson-sync]

Plan deliberate review of:

- which concept actions are directly exposed through one-action synchronizations;
- which are available only as participants in larger synchronizations;
- which remain concept-valid but absent from this application;
- which application-level actions coordinate several concept actions;
- whether naming an application action changes or clarifies user-visible semantics without changing the underlying concepts.

Do not turn this into API endpoint or UI-control design.

## 6. Identify synchronization-induced design risks

Flag situations likely to require deliberate subphase work, including:

- a synchronization apparently compensating for an incomplete concept;
- a synchronization requiring one concept to understand another's private semantics;
- action argument/output mismatches;
- circular or chained reactions whose conceptual consequence is unclear;
- multiple synchronizations responding to the same trigger with potentially conflicting effects;
- one synchronization preventing a concept from fulfilling its purpose;
- application actions whose availability conditions are ambiguous;
- authority assumptions that conflict across concepts;
- synchronizations that accidentally bypass a concept invariant or precondition;
- behavior that may reveal the Phase 004 boundary is still wrong;
- application-visible behavior with no synchronization or concept action that explains it;
- concept actions unintentionally exposed merely because they exist.

## 7. Plan automation and synergy analysis

Automation in Phase 005 means application behavior in which one conceptual action causes additional concept behavior without requiring a separate user initiation for each participating action.

Plan explicit review of where such automation:

- serves an established purpose;
- introduces hidden consequences or authority concerns;
- changes what users must understand or expect;
- creates useful behavior beyond manual composition.

Jackson uses **compositional synergy** for cases where the composed whole offers a benefit beyond the simple sum of constituent concept benefits.[^jackson-sync]

Synergy is not mandatory. Plan to identify it only where an actual additional benefit can be explained and traced to the composition.

## 8. Preserve the Phase 006 boundary

Phase 005 answers how included concepts interact.

Phase 006 answers which independently defined concepts must, may, conditionally, or alternatively be included together in coherent products/applications.

Do not use Phase 005 to finalize product-family inclusion graphs. If composition exposes an inclusion/dependence question, record it for Phase 006.

## 9. Establish composition evidence strategy

For each planned workstream, define what will count as sufficient conceptual evidence.

Useful evidence may include:

- synchronization tables or concise declarative specifications;
- scenario traces showing participating actions and semantic data flow;
- application-action exposure inventories;
- counterexamples showing over- or under-composition;
- authority/invariant checks;
- before/after explanations of automation or synergy;
- explicit resolution of a composition concern by reopening an earlier concept boundary.

Do not require executable simulations, event traces, tests, services, workflow engines, or prototypes.

## 10. Plan documentation and canonical ownership

Apply the repository-wide documentation-governance contract before creating new files.

Identify:

- canonical concept specifications consumed by the phase;
- the natural canonical owner(s) of synchronization/application-composition knowledge;
- whether synchronizations need separate documents or can be grouped coherently;
- indexes that must expose current composition knowledge;
- purpose, concept, and dependence links that should be added or updated;
- provisional Phase 006 questions that must not masquerade as current dependence truth;
- stale Phase 004 seam hypotheses that should be superseded once authoritative synchronization knowledge exists.

Do not duplicate concept action definitions inside synchronization documents. Link to the concept owner and state only the composition-specific semantics.

## 11. Derive project-specific Phase 005 subphases

Create only the substantive workstreams the actual concept system needs.

For each proposed subphase, define:

- title and purpose;
- composition obligations covered;
- concept/synchronization scope;
- inputs and authoritative knowledge;
- key questions;
- dependencies on other Phase 005 work;
- expected phase evidence;
- canonical knowledge affected;
- documentation/index/reference impacts;
- explicit exclusions;
- completion evidence;
- unresolved-item handoff.

Reserve the final project-specific subphase for Phase 005 consolidation, documentation-integrity audit, exit review, and Phase 006 handoff.

## 12. Confirm gate readiness

`005-A` may authorize substantive Phase 005 work only when:

- the Phase 004 concept baseline is coherent enough to compose;
- material composition obligations can be identified;
- concept-local behavior has been distinguished from likely cross-concept behavior;
- application-action exposure needs are visible;
- composition risks are known enough to plan responsible work;
- documentation/canonical ownership is planned;
- no runtime/implementation composition mechanism has been selected.

If the current concept set still needs basic factoring or specification repair, fail the gate and reopen the appropriate earlier phase rather than hiding the defect in composition.

## Required output

The completed `005-A` record should end with:

1. authoritative concept baseline and incoming carry-forwards;
2. composition-obligation inventory;
3. candidate synchronization-seam inventory;
4. planned application-action-surface review;
5. automation/synergy review scope;
6. synchronization-induced boundary/authority/invariant risks;
7. Phase 006 dependence questions intentionally deferred;
8. approved project-specific Phase 005 subphase sequence;
9. dependency rationale and completion evidence;
10. canonical owners, indexes, and reference impacts;
11. final planned exit-review subphase;
12. confirmation of implementation status.

## Gate outcome

Use one of:

- **READY TO BEGIN PHASE 005 SUBPHASES**
- **NOT READY — COMPOSITION PRECONDITIONS MISSING OR CONCEPT BASELINE UNSOUND**

The gate itself must not declare composition complete.

## Implementation state

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet
