---
type: Phase Start Gate
title: 008-A — Familiarity Baseline, Reuse Opportunities, Genericity Scope & Subphase Planning
description: Mandatory start gate for planning Phase 008 familiarity, conceptual reuse, broader genericity, terminology, and catalog-refinement work against the mature mapped concept system.
tags: [phase-008, start-gate, familiarity, reuse, genericity, concept-catalog, planning]
---

# 008-A — Familiarity Baseline, Reuse Opportunities, Genericity Scope & Subphase Planning

## Purpose

This start gate determines how Phase 008 should examine the mature concept system for unnecessary novelty, missed conceptual reuse, broader genericity opportunities, misleading familiarity, and reusable design knowledge.

Phase 008 begins only after the project has enough behavioral, composition, scope, and mapping context to judge familiarity against actual semantics rather than concept names alone.

The gate exists to prevent two opposite failures:

1. inventing new concepts where familiar, reusable concepts would serve the same purpose and reduce learning/design risk; and
2. forcing a familiar concept, label, or pattern onto behavior whose purpose or semantics are materially different.

`008-A` plans the audit. It does not itself declare any concept familiar, reusable, generic, or catalog-ready.

## Governing contracts

Before planning the phase, review:

- [Phase 008 — Familiarity, Reuse, Genericity & Concept-Catalog Refinement](phase-definition.md);
- [Familiarity, Reuse, Genericity & Concept-Catalog Contract](familiarity-reuse-contract.md);
- [Phase 008 Consolidation, Exit Review & Phase 009 Handoff Template](exit-review-template.md);
- the Phase 007 handoff and current mapping/experience knowledge;
- current concept specifications, synchronizations, dependence/scope knowledge, and in-scope variants;
- the repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md);
- [Design-Only Guardrails](../../methodology/design-only-guardrails.md).

## 1. Re-establish Phase 008 authority

Confirm the phase is auditing **conceptual familiarity and design-knowledge reuse**, not implementation reuse.

In scope:

- whether an established/familiar concept can serve the same purpose;
- whether current concepts are unnecessarily application-specific;
- whether broader genericity would improve reuse without weakening semantics;
- whether terminology matches the concept users are expected to recognize;
- whether a novel concept is genuinely justified;
- whether current concept knowledge contains reusable lessons worth preserving;
- whether mapping experience reveals familiarity opportunities missed earlier.

Out of scope:

- code/library/package reuse;
- framework/vendor selection;
- service reuse;
- shared database or platform architecture;
- design-system/component reuse;
- implementation templates;
- architecture standardization.

## 2. Review Phase 007 handoff and mapped experience

Identify the current user-visible conceptual experience:

- concepts users perceive;
- application actions they invoke or understand;
- terminology and labels;
- important state/feedback distinctions;
- authority/lifecycle/history semantics;
- variant-specific mappings;
- mapping concerns explicitly carried into Phase 008.

Familiarity must be judged against this real semantic experience rather than a concept's title in isolation.

## 3. Establish the familiarity baseline

For each materially important current concept or conceptual cluster, identify whether there are plausible familiar precedents from:

- widely used software concepts;
- domain-standard concepts;
- previously established project concepts;
- concept catalogs or authoritative design references;
- closely analogous applications whose semantics are understood;
- earlier alternatives recorded during Phase 002 discovery.

A familiar precedent is a comparison candidate, not automatic authority.

Record uncertainty where the supposed familiar concept is only loosely understood or varies materially across applications.

## 4. Identify false-familiarity risks

Look for terminology or representations that appear familiar but may create the wrong expectations.

Potential risks include:

- familiar name, different purpose;
- familiar action name, different effects;
- familiar lifecycle term, different finality/reversibility;
- familiar role label, different authority;
- familiar concept shape with materially different state semantics;
- a conventional UI metaphor masking a novel concept;
- two distinct concepts sharing a familiar label.

Known semantic mislabeling should already have been corrected in Phase 007. If deeper mismatch is discovered here, plan the appropriate upstream correction rather than merely renaming around it.

## 5. Identify conceptual reuse opportunities

For each candidate reuse opportunity, ask:

- Is the underlying purpose substantially the same?
- Is the operational principle materially compatible?
- Would the familiar concept's state/actions/invariants/lifecycle satisfy the current need?
- Would users reasonably transfer correct expectations from prior experience?
- What current project-specific behavior would remain outside the familiar concept?
- Would adoption reduce unnecessary novelty without importing semantic baggage?
- Would replacement require upstream concept, synchronization, dependence, or mapping changes?

Do not equate frequent industry usage with good fit.

## 6. Identify broader genericity opportunities

Phase 004 already resolved genericity required for concept independence.

Phase 008 now asks a broader question: can a sound independent concept be generalized further so the same purpose/behavior applies across more contexts or target types?

Look for:

- application-specific names or target types that are not essential to the purpose;
- narrow domain assumptions that the behavior does not actually require;
- duplicated concepts that differ only by target type or incidental context;
- concept variants that may be one parameterized concept;
- reusable state/action semantics hidden behind product-specific terminology.

Reject generalization that makes the purpose vague, weakens understandable semantics, or combines genuinely different behavioral promises.

## 7. Identify catalog-refinement opportunities

Determine whether any current concept has accumulated enough stable design knowledge to be useful beyond this application.

Potentially reusable knowledge may include:

- concise concept purpose;
- operational principle;
- representation-independent state/actions/invariants;
- known generic parameters;
- common synchronization relationships;
- known mapping/familiarity cautions;
- recurring misfits or subtle design traps;
- provenance to design evidence.

This does **not** require every concept to become a catalog entry, nor does it authorize creation of a speculative global taxonomy.

Prefer strengthening the existing canonical concept owner and marking reusable knowledge through links/context over duplicating a second "catalog version" of the same concept.

## 8. Assess refinement blast radius

For each plausible substitution, reframing, renaming, or generalization, identify affected upstream/current knowledge:

- Phase 001 purpose association;
- Phase 003 behavioral specification;
- Phase 004 modularity/genericity findings;
- Phase 005 synchronization/application actions;
- Phase 006 dependence/subset/scope model;
- Phase 007 mappings/terminology/experience semantics;
- canonical indexes and graph links.

A Phase 008 improvement is incomplete until necessary changes are propagated to their natural owners.

Substantial semantic change may require explicitly reopening an earlier phase rather than rewriting all consequences inside Phase 008 records.

## 9. Perform documentation/coherence planning

Apply the [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md).

Identify:

- authoritative concept/mapping documents consumed by this phase;
- candidate familiar/catalog sources used as comparison evidence;
- canonical owners likely to change;
- whether any genuinely new reusable-knowledge document is warranted;
- indexes/links likely to change after concept rename/substitution/generalization;
- duplicate concept/catalog representations that already risk drift;
- old terminology that may become stale if refinements are adopted;
- how rejected familiarity alternatives will remain phase evidence rather than current truth.

Do not pre-create one catalog document per concept merely because Phase 008 exists.

## 10. Derive project-specific Phase 008 workstreams

Create only the substantive workstreams justified by the actual concept system.

Possible workstreams include:

- familiarity and precedent review;
- false-familiarity/semantic-mismatch review;
- concept substitution/reuse analysis;
- broader genericity and parameterization analysis;
- terminology and naming refinement;
- reusable concept-knowledge/catalog refinement;
- cross-variant consistency review;
- propagation/reopen work for adopted changes.

These are examples, not a mandatory sequence.

For each proposed subphase, define:

- purpose;
- concepts/mappings under review;
- comparison/reuse evidence;
- key questions;
- dependencies;
- expected phase evidence;
- canonical owners potentially affected;
- explicit exclusions;
- completion evidence;
- reopen/propagation obligations;
- unresolved-item handoff.

Reserve the final project-specific subphase for consolidation, documentation-integrity audit, Phase 008 exit review, and Phase 009 handoff.

## 11. Define completion evidence

The planned Phase 008 exit review must be able to show that:

- materially novel concepts were compared against plausible familiar alternatives;
- familiarity decisions are based on purpose/behavior, not names or popularity;
- false familiarity has been identified and corrected where material;
- unnecessary application-specificity has been challenged;
- broader generalization does not weaken purpose or semantics;
- retained novelty has an explicit design justification;
- adopted substitutions/generalizations/naming changes are propagated to affected canonical owners;
- reusable design knowledge is preserved without duplicating current truth;
- documentation/index/reference state remains coherent and OKF-conformant;
- Phase 009 receives a current, coherent system for integrity audit;
- no implementation reuse or architecture work has begun.

## Required output

The completed `008-A` record should end with:

1. incoming concept/mapping/familiarity baseline;
2. plausible familiar/reuse comparison sources;
3. false-familiarity risks;
4. broader genericity opportunities;
5. potential catalog/reusable-knowledge candidates;
6. expected refinement blast radius;
7. approved Phase 008 subphase sequence;
8. rationale and dependency order;
9. canonical/documentation owners likely to change;
10. planned final exit-review subphase;
11. known risks/carry-forwards;
12. confirmation of implementation status.

## Gate outcome

Use one of:

- **READY TO BEGIN PHASE 008 SUBPHASES**
- **NOT READY — FAMILIARITY/REUSE AUDIT PRECONDITIONS MISSING**

If the concept/mapping system is too unstable to compare meaningfully, return to the appropriate earlier phase rather than manufacturing a familiarity audit.

## Implementation state

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet
