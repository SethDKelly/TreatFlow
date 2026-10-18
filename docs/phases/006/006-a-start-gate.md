---
type: Phase Start Gate
title: 006-A — Dependence Scope, Subset Semantics, Product-Family Questions & Subphase Planning
description: Mandatory start gate for planning project-specific concept-dependence, subset, product-family, and scope analysis without confusing application inclusion with intrinsic concept dependence or implementation architecture.
tags: [phase-006, start-gate, dependence, subsets, product-family, scope, planning]
sources:
  - id: jackson-dependency
    resource: https://essenceofsoftware.com/tutorials/concept-basics/dependency/
    title: Concept dependencies and subsets — Daniel Jackson
---

# 006-A — Dependence Scope, Subset Semantics, Product-Family Questions & Subphase Planning

## Purpose

This gate determines how Phase 006 should analyze the current concept system as a family of possible applications or product variants.

It must distinguish three different relationships before substantive work begins:

1. **intrinsic concept dependence defect** — one concept cannot be understood or specified without another; this belongs back in Phase 004;
2. **synchronization/composition relationship** — included concepts interact; this belongs to Phase 005;
3. **extrinsic application dependence** — in the present application family, including one independent concept only makes sense when another independent concept is also included; this is Phase 006.

The gate plans scope analysis. It does not design implementation architecture, packaging, rollout, or code dependencies.

## Governing contracts

Review:

- [Phase 006 definition](phase-definition.md);
- [Concept Dependence, Subset & Product-Family Contract](dependence-subset-contract.md);
- [Phase 005 exit review and Phase 006 handoff](../005/exit-review-template.md);
- current canonical concept and synchronization knowledge;
- repository-wide phase, documentation-governance, knowledge-authority, and design-only contracts.

## 1. Verify entry authority

Confirm Phase 005 has exited successfully and that the current concept set is independently specified and composition semantics are discoverable.

If a proposed dependency exists only because concept A literally embeds concept B's semantics or cannot stand alone conceptually, classify it as an intrinsic independence problem and reopen Phase 004 rather than normalizing it here.

## 2. Identify the application-family question

State what family or scope of applications Phase 006 is analyzing.

Clarify, as appropriate:

- the current target application;
- known product variants or editions;
- deliberately contemplated smaller/larger subsets;
- deployment/context variants whose conceptual inclusion may differ;
- whether the phase is discovering possible subsets from the concept set or validating an already proposed scope.

Do not translate commercial packaging, implementation services, repositories, teams, or deployable units into concept subsets.

## 3. Establish dependency semantics

For each candidate dependency `A → B`, use the interpretation:

> In this application family, any coherent subset that includes A must also include B because A's inclusion otherwise lacks its intended application role.

Do **not** infer an edge merely because:

- A synchronizes with B;
- A was discovered after B;
- users encounter B first;
- implementation might call or store B;
- A and B are commonly deployed together;
- the organization sells them together;
- a current UI places them together.

Every material edge requires a role/purpose rationale.

## 4. Identify subset questions

Determine which concept inclusion questions need deliberate analysis, including as relevant:

- required dependencies;
- optional concepts;
- concepts valid alone;
- concepts meaningful only in the presence of one or more others;
- mutually dependent inclusion groups;
- alternative concept bundles serving different application variants;
- conditional relationships that hold only in a named family/context;
- concepts whose inclusion changes which Phase 005 synchronizations are applicable.

## 5. Test unfamiliar subsets

Plan explicit consideration of subsets that may feel unusual but are conceptually coherent.

Jackson's dependence analysis is useful partly because it forces designers to question habitual assumptions about which concepts must appear together.[^jackson-dependency]

Examples of useful probes:

- What remains meaningful if this apparently foundational concept is omitted?
- Could another target/context give this dependent-looking concept a valid role?
- Does the edge hold because of the concept itself or only because of the current application purpose?
- Does a smaller subset reveal hidden over-coupling or an overlooked product variant?

[^jackson-dependency]: Daniel Jackson, "Concept dependencies and subsets."

## 6. Plan dependency-graph and subset analysis

Choose the minimum representation needed to make the relation understandable. This may be a directed graph, table, prose plus examples, or another concept-level representation.

The plan should cover:

- proposed edges and rationale;
- transitive consequences where useful;
- cycles/mutual-dependence groups;
- valid and invalid representative subsets;
- product/application variants implied by the relation;
- implications for explanation/order and later concept mapping where relevant.

Do not create implementation dependency graphs.

## 7. Separate scope decisions from discovered possibilities

The dependency relation may imply many coherent subsets. The project does not need to choose all of them as supported products.

Plan how to distinguish:

- **structurally coherent subset** — permitted by the dependence relation;
- **in-scope application/product variant** — deliberately adopted for the current design;
- **out-of-scope but coherent variant** — conceptually possible but not part of the current product mandate;
- **invalid subset** — violates established extrinsic dependencies.

This prevents scope decisions from masquerading as concept laws.

## 8. Identify feedback loops

Plan reopening triggers where Phase 006 exposes earlier problems:

- Phase 001 if a supposed product role lacks a defensible purpose;
- Phase 003/004 if a dependency reveals intrinsic coupling or an unsound concept boundary;
- Phase 005 if a newly relevant subset exposes missing/invalid synchronization semantics.

Do not preserve a clean phase sequence at the expense of methodological correctness.

## 9. Documentation and OKF planning

Apply the repository-wide Documentation Integrity & OKF Governance Contract.

Identify:

- canonical concept and synchronization documents consumed by the phase;
- the natural canonical owner for current dependence/subset knowledge;
- whether product-family/scope knowledge merits separate canonical documents or can be represented coherently in one owner;
- indexes and cross-links that may need updates;
- provisional scope/dependence claims that must not be duplicated into concept specifications;
- stale Phase 005 inclusion hypotheses that should be superseded once Phase 006 establishes current truth.

Prefer references to concept purposes and synchronizations over restating them.

## 10. Derive project-specific subphases

Create only the workstreams required by this concept system. Possible workstreams may include dependency-edge analysis, subset enumeration/representative cases, mutual-dependence review, product-family/scope selection, variant-specific synchronization review, or reconciliation of exposed upstream defects.

For each proposed subphase define purpose, inputs, dependency order, questions, expected phase evidence, canonical knowledge affected, exclusions, completion evidence, and carry-forward handling.

Reserve the final project-specific subphase for Phase 006 consolidation, documentation-integrity audit, exit review, and Phase 007 handoff.

## Required output

The completed gate records:

1. application-family/scope question;
2. incoming concept/composition authority;
3. candidate dependence questions;
4. explicit distinction among intrinsic dependence, synchronization, and extrinsic dependence;
5. subset/product-variant questions to investigate;
6. planned unfamiliar-subset/counterexample probes;
7. project-specific Phase 006 subphase sequence and dependencies;
8. canonical owners/index updates anticipated;
9. reopening triggers;
10. planned exit-review subphase;
11. implementation state.

## Gate outcome

Use one of:

- **READY TO BEGIN PHASE 006 SUBPHASES**
- **NOT READY — DEPENDENCE ANALYSIS PRECONDITIONS MISSING**

## Implementation state

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet
