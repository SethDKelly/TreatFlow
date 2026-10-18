---
type: Phase Start Gate
title: 003-A — Specification Scope, Concept Identity, Behavioral Coverage & Subphase Planning
description: Mandatory Phase 003 start gate for planning rigorous, representation-independent concept specification from the retained Phase 002 candidate set.
tags: [phase-003, start-gate, concept-specification, operational-principle, state, actions, planning]
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

# 003-A — Specification Scope, Concept Identity, Behavioral Coverage & Subphase Planning

## Purpose

This start gate determines how Phase 003 will turn the provisional candidate set from Phase 002 into explicit behavioral concept specifications without assuming the candidates are already correct or allowing conceptual state/actions to become implementation design.

`003-A` plans specification work. It does not itself prove a candidate to be a valid concept, freeze concept boundaries, or authorize architecture or implementation.

## Governing contracts

Before planning Phase 003, review:

- [Phase 003 definition](phase-definition.md);
- [Concept Behavioral Specification Contract](concept-specification-contract.md);
- [Phase 003 exit-review template](exit-review-template.md);
- the Phase 002 handoff and authoritative Phase 001 purpose knowledge;
- repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md);
- [Design-Only Guardrails](../../methodology/design-only-guardrails.md).

## 1. Reconcile the incoming candidate set

Identify every candidate Phase 002 retained for specification and record:

- its current semantic identity/name;
- the purpose knowledge that plausibly motivates it;
- its Phase 002 maturity/disposition;
- any provisional canonical concept document already representing it;
- important alternatives or rejected framings that remain relevant;
- unresolved questions handed to Phase 003;
- whether later discovery has already made the candidate obsolete, conflated, or ambiguous.

Do not create specification work merely because a candidate appeared in Phase 002. Candidates may still be revised, split, merged, deferred, or rejected when behavioral definition exposes a flaw.

## 2. Confirm specification authority and purpose traceability

For each candidate, locate the authoritative current purpose/need knowledge that justifies spending specification effort on it.

If a candidate has no meaningful purpose association, do not invent one to preserve the candidate. Either return to the relevant earlier phase or record the candidate as unsupported.

Phase 003 may refine a concept-specific purpose as its behavior becomes clearer, but it must not silently rewrite the application-purpose model established earlier.

## 3. Assess specification coverage needs

Every retained candidate must be planned for sufficient examination of, as applicable:

| Specification dimension | Planning question |
|---|---|
| Concept purpose | What coherent value or need is this concept intended to fulfill? |
| Operational principle | What archetypal scenario demonstrates that value? |
| Abstract types/parameters | What identities or value domains does the concept need without importing another application concept? |
| Abstract state | What must the concept remember to support its behavior? |
| Actions | What user/system-observable behaviors change or query that state? |
| Inputs/outputs | What information crosses an action boundary at the conceptual level? |
| Preconditions/guards | Under what conceptual conditions may an action occur? |
| Effects/postconditions | What observable state/result follows an action? |
| Invariants/constraints | What must remain true across valid concept states where relevant? |
| Initial/lifecycle semantics | What creation, activation, expiry, closure, deletion, correction, or other lifecycle behavior is intrinsic where relevant? |
| Time/history semantics | What must be remembered or modeled explicitly when behavior depends on time or prior actions? |
| Authority semantics | Which invocation/decision restrictions are intrinsic to this concept rather than cross-concept policy? |
| Deliberate under-specification | Which choices do not belong to the concept promise and should remain open? |
| Boundary questions | What suspected split/merge/independence/completeness questions must Phase 004 receive explicitly? |

This is a semantic coverage contract, not a requirement to use a single notation or one subphase per dimension.

## 4. Plan operational-principle work

Jackson uses the operational principle as a defining story showing how a concept is typically used and how it fulfills its purpose.[^jackson-op]

For each concept requiring substantive OP work, plan how to establish one or more archetypal scenarios that:

- demonstrate the concept's purpose;
- use concept actions rather than UI gestures or implementation calls;
- are representative rather than exhaustive;
- distinguish the concept's characteristic value from merely possible executions;
- do not become a substitute for full behavioral specification.

[^jackson-op]: Daniel Jackson, "Operational principles."

## 5. Plan state and action specification

Jackson models a concept as a state machine: state captures what the concept remembers, and actions update or query that state.[^jackson-machine]

Plan enough work to determine:

- the minimum abstract memory required by behavior;
- action identities and their conceptual inputs/outputs;
- preconditions and effects;
- relevant invariants;
- system/internal-to-concept actions such as expiration where behavior requires them;
- read/query behavior where it is part of the concept promise;
- explicit time or history only when later behavior depends upon it.

Prefer the most abstract state that preserves intended behavior. Do not plan database, object, service, message, or API representations.

[^jackson-machine]: Daniel Jackson, "Concepts are state machines."

## 6. Identify representation-leak risks

For every specification workstream, inspect the incoming material for assumptions likely to bias the concept model, including:

- database tables/fields presented as necessary concept state;
- classes or aggregates presented as concepts;
- REST/RPC/GraphQL operations presented as concept actions;
- screen flows presented as operational principles;
- service or module boundaries presented as concept boundaries;
- event/queue messages presented as synchronizations or actions;
- persistence requirements presented as behavioral semantics;
- implementation IDs/types introduced when abstract identity would suffice;
- algorithms presented where the concept only requires a result satisfying a condition.

Plan explicit de-biasing work when these risks are material.

## 7. Identify cross-concept leakage risks

Concepts are intended to be independently understandable. During Phase 003, watch for state or action definitions that name another application concept directly when a generic parameter or abstract identity would preserve independence.

The exhaustive modularity/independence audit belongs to Phase 004, but Phase 003 must not knowingly build intrinsic cross-concept dependency into the specifications and then hand it forward as normal.

## 8. Determine project-specific subphases

Create only the substantive specification subphases the project needs.

Possible decomposition strategies include:

- concept-by-concept specification;
- groups of closely related specification questions;
- operational-principle refinement before formal state/action work;
- difficult temporal/authority/lifecycle semantics as dedicated workstreams;
- a targeted specification-recovery workstream for candidates whose Phase 002 identity becomes unstable.

Do not create one subphase per concept mechanically when a different grouping is more coherent, and do not combine so many concepts into one subphase that reviewability or independence reasoning is lost.

For each substantive subphase define:

- purpose;
- incoming canonical knowledge;
- candidate concepts covered;
- specification dimensions covered;
- dependencies;
- expected phase-record evidence;
- canonical concept documents to create/refine only where justified;
- explicit representation/implementation exclusions;
- completion evidence;
- unresolved-item handoff.

Reserve the final project-specific subphase for consolidation, documentation-integrity review, Phase 003 exit decision, and Phase 004 handoff.

## 9. Plan canonical ownership and OKF coherence

A stable concept is a natural semantic unit and will often justify one authoritative canonical concept document. However, the phase must refine existing provisional candidate documents rather than creating parallel specifications for the same concept.

Plan:

- canonical owner for each concept specification;
- links from concepts to authoritative purpose knowledge rather than copied purpose narratives;
- links among concept specifications only when they express legitimate knowledge relationships without implying intrinsic dependence;
- source/provenance metadata where specification materially derives from external artifacts;
- index updates needed to expose current concept knowledge;
- disposition of provisional/rejected candidate documents;
- terminology/supersession updates if concept identity changes.

## 10. Define Phase 003 exit evidence

Before substantive specification begins, confirm how the final review will demonstrate that retained concepts are behaviorally explicit enough for Phase 004 to test modularity and boundaries.

The planned exit evidence must be capable of showing that:

- each retained concept has a defensible purpose and operational principle;
- its abstract state is sufficient and not needlessly representational;
- its important actions, inputs/outputs, conditions, and effects are explicit;
- relevant invariants/lifecycle/time/history/authority semantics are visible;
- deliberate under-specification is distinguished from accidental omission;
- obvious cross-concept and implementation leakage has been removed or explicitly flagged;
- concepts remain revisable in Phase 004;
- canonical knowledge and indexes are coherent and OKF-conformant;
- no representation, architecture, or implementation work has begun.

## Required output

The completed `003-A` record should end with:

1. reconciled retained-candidate set;
2. purpose/canonical authority entry points;
3. specification-coverage assessment;
4. representation- and cross-concept-leak risk register;
5. approved project-specific Phase 003 subphase sequence;
6. decomposition rationale and dependency order;
7. canonical ownership/index/reference plan;
8. completion evidence for each substantive subphase;
9. planned final exit-review subphase;
10. carry-forwards and open questions entering specification;
11. confirmation of implementation state.

## Gate outcome

Use one of:

- **READY TO BEGIN PHASE 003 SUBPHASES**
- **NOT READY — SPECIFICATION PRECONDITIONS MISSING**

A failed gate should identify whether the missing precondition belongs in Phase 001, Phase 002, or another earlier authority rather than fabricating specifications.

## Implementation state

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet
