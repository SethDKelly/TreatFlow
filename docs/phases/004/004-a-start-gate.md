---
type: Phase Start Gate
title: 004-A — Modularity Audit Scope, Boundary Risk, Genericity Pressure & Subphase Planning
description: Mandatory start gate for planning project-specific concept factoring, specificity, completeness, independence, and genericity analysis before composition.
tags: [phase-004, start-gate, modularity, specificity, completeness, independence, genericity, planning]
sources:
  - id: jackson-modularity
    resource: https://essenceofsoftware.com/tutorials/concept-basics/modularity/
    title: Concept modularity — Daniel Jackson
---

# 004-A — Modularity Audit Scope, Boundary Risk, Genericity Pressure & Subphase Planning

## Purpose

This start gate determines how Phase 004 will challenge the concept specifications handed forward by Phase 003 before any cross-concept composition becomes authoritative.

Phase 004 is deliberately corrective. A concept entering this phase is not protected merely because it already has a purpose, operational principle, state, and actions. The point of the phase is to test whether those behaviors have been bundled into the right conceptual units.

Jackson characterizes concept modularity through three criteria: **specificity**, **completeness**, and **independence**.[^jackson-modularity] Genericity is an important technique for preserving independence when a concept needs only the identity of externally supplied objects.

[^jackson-modularity]: Daniel Jackson, "Concept modularity."

`004-A` plans that audit. It does not itself declare the concept set modular.

## Governing contracts

Before planning the phase, review:

- [Phase 004 definition](phase-definition.md);
- [Concept Modularity & Boundary Refinement Contract](modularity-boundary-contract.md);
- [Phase 004 Consolidation, Exit Review & Phase 005 Handoff Template](exit-review-template.md);
- the Phase 003 exit handoff and current canonical concept specifications;
- repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md);
- [Design-Only Guardrails](../../methodology/design-only-guardrails.md).

## 1. Establish incoming concept authority

Identify the current canonical specification owner for every concept entering Phase 004 and the Phase 003 evidence that qualifies it.

For each concept, locate at least:

- purpose;
- operational principle;
- abstract state;
- actions and their relevant conditions/effects/results;
- invariants and lifecycle/time/history/authority semantics where applicable;
- deliberate under-specification decisions;
- known boundary, completeness, independence, or genericity questions;
- unresolved carry-forwards.

If a concept is not behaviorally explicit enough to support modularity analysis, return that gap to Phase 003 rather than inferring missing behavior during the audit.

## 2. Perform an initial modularity-risk scan

For each concept, identify evidence of the following risks without deciding the final correction yet.

### Specificity risks

- one concept appears to serve multiple separable purposes;
- the purpose is so broad that unrelated behavior fits inside it;
- behavior has been added because it is convenient or associated with the same domain noun rather than because it serves the same purpose;
- a concept fragment is too narrow to deliver meaningful value by itself.

### Completeness risks

- the operational principle depends on behavior not owned by the concept;
- the stated purpose cannot be fulfilled end to end by the concept's own behavior;
- required lookup, query, correction, lifecycle, or other semantic behavior has been omitted;
- essential behavior has been scattered across multiple candidate concepts that may actually form one conceptual unit.

Completeness means minimally fulfilling the purpose, not accumulating every desirable feature.[^jackson-modularity]

### Independence risks

- understanding one concept requires knowing another application concept;
- state or actions directly use another application's concept-specific type when only identity is needed;
- one concept delegates purpose-critical semantic behavior to another concept;
- a cross-concept workflow has been embedded inside one concept specification;
- the concept only works when another peer concept is present.

### Genericity risks

- an external type is treated specially even though only object identity matters;
- domain-specific names or properties narrow behavior unnecessarily;
- a concept can be generalized without weakening its purpose or observable semantics.

Do not confuse a concept's independence with absence of downstream implementation-library dependencies. Phase 004 is evaluating functional/conceptual modularity, not code dependency structure.

## 3. Establish purpose-boundary traceability

For every concept, identify the authoritative purpose or purpose obligation it claims to fulfill.

Plan explicit scrutiny where:

- one concept maps to several apparently separable purposes;
- one purpose is distributed across several concepts;
- a concept has detailed behavior but no compelling purpose;
- purpose wording changed during Phase 003 without reconciliation;
- a boundary decision appears driven by a domain noun, organizational boundary, screen, workflow, class, service, or persistence structure.

Do not force one-to-one matrices merely for neatness. The audit should discover the correct factoring rather than assume it.

## 4. Identify boundary-change hypotheses

Collect plausible corrections already suggested by Phase 003 evidence or the initial risk scan, such as:

- retain as currently factored;
- split into concepts serving separable purposes;
- combine fragments that only together fulfill one purpose;
- reframe the concept around a clearer purpose;
- generalize over external identity/content types;
- remove behavior that belongs to a different concept;
- add missing behavior required for completeness;
- reject a concept whose purpose or modular identity does not survive specification.

These are hypotheses for substantive Phase 004 work, not start-gate decisions.

## 5. Plan independence analysis without composing concepts

Phase 004 may identify where independent concepts will later need to interact, but it must not solve those interactions by embedding them in concept definitions.

When a required application behavior appears to cross concept boundaries, classify the issue as one of:

- **intrinsic concept behavior** — must remain within one concept for completeness;
- **possible future synchronization seam** — concepts can remain independent and the application-level relationship should be examined in Phase 005;
- **unresolved ownership problem** — additional factoring analysis is required;
- **extrinsic inclusion/dependence question** — defer to Phase 006 if it concerns whether concepts must be included together rather than how either concept is defined.

Do not write authoritative synchronizations in Phase 004.

## 6. Plan re-specification loops

Boundary changes often invalidate Phase 003 specifications.

For each likely split, merge, reframe, rejection, or generalization, decide how the resulting concept specification will be brought back to the Phase 003 behavioral standard before Phase 004 exits.

Use one of two patterns:

- **scoped re-specification within Phase 004** when the correction is localized and the Phase 003 specification contract can be reapplied transparently; or
- **explicit reopening of Phase 003** when concept identity or behavior changes substantially enough that pretending the original specification phase still stands would obscure reasoning.

A boundary decision is not complete until the resulting concepts again have coherent purpose, operational principle, abstract state, actions, and required semantics.

## 7. Derive project-specific Phase 004 workstreams

Create only the substantive subphases needed by the actual concept set.

Possible workstream shapes include:

- purpose/specificity audit for a cluster of related concepts;
- completeness and end-to-end behavior audit;
- independence and external-reference audit;
- genericity/parameterization refinement;
- difficult split/merge/reframe alternatives;
- cross-cutting boundary reconciliation;
- scoped re-specification of corrected concepts.

These are examples, not a fixed B–X sequence.

A workstream may cover multiple criteria when they are tightly related. Separate work when doing so improves dependency safety, conceptual clarity, reviewability, or the ability to reconsider one boundary without destabilizing unrelated concepts.

## 8. Plan decision evidence

For each substantive workstream, define what evidence will justify its conclusions.

Useful evidence may include:

- purpose-to-behavior fit;
- whether an operational principle can demonstrate complete value;
- state/action ownership analysis;
- counterexamples showing mixed purposes or missing behavior;
- ability to explain one concept without another;
- generic-parameter or permutation-invariance reasoning where useful;
- alternative split/merge/reframe comparisons;
- downstream consequences for concept identity and canonical knowledge.

Avoid arbitrary numeric modularity scores. The result should be a reasoned design judgment traceable to behavior and purpose.

## 9. Plan documentation and canonical ownership

Apply the repository-wide documentation-governance contract before creating new files.

Identify:

- current canonical concept owners to be refined in place when identity survives;
- concepts likely to be superseded, split, merged, renamed, or retired;
- phase records needed to preserve boundary-analysis rationale;
- indexes and cross-links likely to change;
- documentation conflicts or duplicate concept owners already present;
- whether new canonical concept documents are justified by genuinely new semantic identities.

Do not duplicate a concept specification into a new "Phase 004 version" merely because an audit occurred. Update the natural canonical owner and preserve the audit reasoning in phase history.

## 10. Define Phase 004 exit evidence

Before substantive work begins, confirm that the final exit review will be able to demonstrate:

- each retained concept fulfills one coherent, valuable purpose without mixing separable purposes;
- each concept contains enough behavior to fulfill that purpose minimally and end to end;
- each concept can be understood and specified without reference to other peer application concepts;
- genericity has removed avoidable concept-specific references where required for independence;
- split/merge/reframe/reject/generalize decisions are traceable and reflected in current specifications;
- corrected concepts satisfy the Phase 003 behavioral-specification standard;
- potential cross-concept behavior has not been hidden inside concepts merely to make them "complete";
- the current concept set is stable enough for Phase 005 composition analysis;
- canonical/index/reference state is coherent and OKF-conformant;
- no implementation modularity or architecture has been introduced.

## Required output

The completed `004-A` record should end with:

1. incoming canonical concept-specification inventory;
2. modularity-risk summary by concept or coherent concept group;
3. purpose-boundary traceability concerns;
4. identified boundary-change hypotheses;
5. likely future synchronization/dependence seams requiring later phases;
6. approved project-specific Phase 004 subphase sequence;
7. rationale and dependency order for the decomposition;
8. re-specification/reopening strategy where boundary changes may occur;
9. canonical ownership, index, and reference update plan;
10. completion evidence for each substantive workstream;
11. planned final consolidation/exit-review subphase;
12. implementation-state confirmation.

## Gate outcome

Use one of:

- **READY TO BEGIN PHASE 004 SUBPHASES**
- **NOT READY — BEHAVIORAL SPECIFICATION OR AUDIT PRECONDITIONS MISSING**

The gate must not declare the concept set modular or ready for composition.

## Implementation state

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet
