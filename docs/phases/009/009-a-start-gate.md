---
type: Phase Start Gate
title: 009-A — Integrity Audit Scope, Interference Surfaces, Whole-System Coverage & Subphase Planning
description: Mandatory Phase 009 start gate for defining the whole-system integrity audit, identifying likely interference surfaces, and deriving dependency-safe project-specific subphases.
tags: [phase-009, start-gate, integrity, interference, coherence, planning]
sources:
  - id: jackson-integrity
    resource: https://essenceofsoftware.com/posts/sample-chapters/eos-11-concept-integrity.pdf
    title: Concept Integrity — Daniel Jackson
  - id: jackson-broken-integrity
    resource: https://essenceofsoftware.com/studies/small/broken-integrity/
    title: Breaking Integrity: Three Examples — Daniel Jackson
---

# 009-A — Integrity Audit Scope, Interference Surfaces, Whole-System Coverage & Subphase Planning

## Purpose

`009-A` plans the project-specific whole-system integrity audit before substantive Phase 009 work begins.

Phase 009 is not another local concept review. Earlier phases have already established concept purpose/behavior, modularity, composition, product scope, mappings, and familiarity/reuse refinements. This phase asks whether those individually reasonable decisions still coexist without one concept breaking another concept's ability to fulfill its own purpose.

Jackson summarizes integrity as the condition that, when concepts are composed, each concept still fulfills its purpose.[^jackson-integrity]

[^jackson-integrity]: Daniel Jackson, "Concept Integrity."

## Gate outcome

The gate produces either:

- **READY TO BEGIN** — the integrity audit has a defensible coverage plan, interference surfaces, evidence baseline, documentation plan, and dependency-safe subphase sequence; or
- **NOT READY — PRECONDITIONS MISSING** — the current design is too inconsistent, incompletely propagated, or poorly documented for a meaningful whole-system integrity audit.

This gate does not itself certify integrity.

## Governing inputs

Review before planning:

- [Phase 009 definition](phase-definition.md);
- [Concept Integrity & Cross-Concept Interference Contract](integrity-interference-contract.md);
- Phase 008 exit handoff and current post-refinement concept set;
- current canonical concept specifications;
- current synchronization/application-action knowledge;
- current dependence/subset/scope knowledge;
- current mapping/experience knowledge;
- retained novelty/familiarity/generalization decisions;
- authoritative purpose/success knowledge;
- open questions and carry-forwards;
- repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md);
- [Design-Only Guardrails](../../methodology/design-only-guardrails.md).

## 1. Confirm a single current design baseline

Before planning an integrity audit, verify that Phase 008 left one coherent current design rather than parallel pre/post-refinement versions.

Confirm that:

- retained concept identities are current and unambiguous;
- substitutions/generalizations/renames have been propagated;
- synchronization and application-action knowledge uses current concept identities;
- Phase 006 variants/scopes refer to current concepts;
- Phase 007 mappings use current terminology and behavior;
- superseded concept/mapping/composition material is historical rather than current authority.

If the baseline itself is ambiguous, repair documentation/canonical truth before beginning the audit.

## 2. Restate the integrity question

For every retained concept, Phase 009 must be able to ask:

> In each materially relevant composed application context, can this concept still fulfill the purpose that justifies its existence without another concept, synchronization, scope choice, mapping, or refinement defeating that promise?

Do not replace this with generic questions such as whether the application is "consistent," "usable," or "well integrated."

## 3. Identify integrity subjects

Build a planning inventory of the current semantic units that may participate in interference analysis:

- retained concepts and purposes;
- material concept invariants/lifecycle/authority constraints;
- synchronizations and application actions;
- automations and material chained composition;
- in-scope variants/subsets;
- mappings/terminology/visibility obligations;
- familiar/reused/generalized concepts whose transferred expectations matter.

This inventory is for coverage planning. Do not duplicate full canonical specifications into the phase record.

## 4. Identify likely interference surfaces

Assess which interaction surfaces deserve deliberate audit. Typical surfaces include:

### Action availability interference

One concept or synchronization may make an action unavailable, mandatory, delayed, or conditional in ways that prevent another concept from fulfilling its purpose.

### Effect interference

A composed action may produce additional effects that undermine the expected result of another concept.

### State-meaning interference

One concept's behavior or mapping may cause another concept's state to become misleading, stale, contradictory, or no longer meaningful to users.

### Invariant/lifecycle interference

Different concepts may impose conditions that cannot coexist across activation, expiration, revocation, deletion, correction, supersession, or historical transitions.

### Authority interference

One concept may apparently grant, bypass, revoke, or obscure authority governed by another concept.

### Automation interference

System-triggered composition may defeat deliberation, reversibility, notice, or user control promised by another concept.

### Mapping/mental-model interference

The combined representation may make one concept appear to behave differently from its actual semantics or attribute cross-concept behavior to the wrong concept.

### Scope/variant interference

A concept may preserve its promise in one subset but lose it in another valid in-scope variant.

### Familiarity/generalization interference

A Phase 008 substitution/generalization may fit locally but introduce incompatible behavior, authority, lifecycle, or composition expectations elsewhere.

The start gate should select the surfaces actually relevant to the project rather than forcing every category into a standalone subphase.

## 5. Distinguish integrity from related concerns

Classify issues carefully.

### Not a Phase 009 integrity issue by itself

- a concept is poorly specified in isolation — Phase 003;
- a concept boundary is unsound — Phase 004;
- a synchronization is obviously invalid on its own — Phase 005;
- a subset/dependency rule is wrong — Phase 006;
- a mapping is misleading on its own — Phase 007;
- a familiarity/generalization change is obviously semantically wrong — Phase 008.

These defects should already have been corrected before Phase 009. If rediscovered, reopen their natural owner.

### Phase 009 integrity issue

The relevant semantics are locally defensible, but their **combination** causes a concept to fail, weaken, contradict, reinterpret, bypass, or unexpectedly lose the purpose/behavior users rely on.

## 6. Purpose-preservation coverage plan

For each materially important concept, plan evidence that will show whether its purpose survives composition.

Useful planning questions include:

- Which other concepts can affect this concept's effective behavior?
- Which synchronizations participate in its actions?
- Which variants include it under different surroundings?
- Which mappings shape user expectations about it?
- Which authority/lifecycle rules can collide with neighboring concepts?
- Which Phase 008 changes altered its surroundings or interpretation?

The audit should be whole-system enough to avoid checking only obvious pairwise interactions.

## 7. Interaction-cluster planning

Pairwise review may be insufficient when interference appears only through a synchronization chain or concept cluster.

Identify clusters such as:

- concepts joined by chained synchronizations;
- concepts sharing consequential application actions;
- concepts whose lifecycle changes trigger one another;
- concepts affecting the same actor/target/authority boundary;
- concepts shown together through one mapping/derived view;
- mutually dependent Phase 006 co-inclusion groups.

Plan cluster-level audit where the combination matters.

## 8. Variant coverage planning

Use Phase 006 scope rather than inventing new variants.

For each materially distinct in-scope variant, determine whether:

- the same concept participates in different synchronizations;
- action availability differs;
- mappings differ;
- authority/context differs;
- concept purpose may be strengthened or weakened by neighboring concepts.

Do not require exhaustive Cartesian-product testing of every subset. Select representative variants based on semantic difference and risk.

## 9. Mapping and expectation planning

Integrity is not limited to hidden state-machine compatibility.

Plan review of cases where the system technically preserves a concept's behavior but the composed mapping causes users to form an incorrect mental model of that concept.

Relevant examples may include:

- one action appearing reversible although another concept makes the combined effect irreversible;
- deletion appearing complete while another concept retains a consequential state;
- automation making user control appear stronger than it is;
- terminology implying ownership or authority that composition changes.

## 10. Integrity-change ownership plan

Phase 009 is an audit, not a shadow source of replacement semantics.

For each likely defect class, identify its natural correction owner in advance:

- concept behavior → Phase 003 canonical owner;
- concept boundary/independence → Phase 004;
- synchronization/application action → Phase 005;
- dependence/scope/variant → Phase 006;
- mapping/terminology → Phase 007;
- familiarity/generalization → Phase 008;
- purpose conflict or invalid original purpose assumption → Phase 001/002 as appropriate.

Phase 009 records the integrity finding and rationale; corrected truth must live in the affected canonical owners.

## 11. Counterexample strategy

The audit should actively seek violations rather than merely confirm harmony.

Plan probes such as:

- Remove or disable one neighboring concept: does the subject concept's promise clarify or change unexpectedly?
- Add a concept: does behavior previously optional become effectively mandatory?
- Trigger a synchronization in an edge lifecycle state: can all purposes still be fulfilled?
- Exercise correction/revocation/expiration in one concept: does another concept preserve stale or contradictory consequences?
- Compare the same concept across two in-scope variants: is its promise stable?
- Compare user-visible behavior with the isolated operational principle: what expectation changed after composition?
- Examine an automated chain: which concept's purpose is improved, and whose may be weakened?

These are conceptual probes, not executable tests.

## 12. Phase 009 versus Phase 010 boundary

Phase 009 focuses on **structural integrity of the mature composed design**.

Phase 010 performs the broader scenario/misfit/exception/failure/adversarial validation campaign.

Therefore Phase 009 should use enough representative and counterexample reasoning to establish integrity, but should not expand into exhaustive abuse, failure, rare-event, recovery, incentive, or domain-adversarial scenario analysis that belongs to Phase 010.

If an integrity concern can only be resolved under such a scenario, carry the explicit validation target to Phase 010 provided current structural integrity is not already known to be broken.

## 13. Documentation and OKF planning

Apply the [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md) from the start.

Identify:

- current canonical owners the audit will read;
- where integrity findings will be recorded as phase evidence;
- which canonical owners may need correction;
- indexes/links likely affected by reopened work;
- how an interference register will remain phase evidence rather than a second source of current behavior;
- how resolved findings will point to corrected canonical truth;
- any known terminology or supersession drift that could bias the audit.

Do not create a new permanent "integrity model" that duplicates concepts, synchronizations, dependencies, and mappings.

## 14. Derive project-specific subphases

Create a separate substantive subphase only when doing so improves dependency safety, semantic coverage, reviewability, correction ownership, or traceability.

Possible workstream shapes include:

- purpose-preservation audit by concept families;
- synchronization/automation interference clusters;
- authority/lifecycle/history interference;
- variant-specific integrity;
- mapping/mental-model interference;
- Phase 008 change-impact integrity review;
- cross-cutting contradiction resolution.

These are examples, not a canonical B–X sequence.

## 15. Define each subphase contract

For every derived subphase, state:

- purpose;
- concepts/purposes in scope;
- composition/mapping/variant surfaces covered;
- canonical inputs;
- counterexample strategy;
- findings expected;
- likely correction owners;
- documentation/index impact;
- dependencies;
- completion evidence;
- explicit exclusions;
- unresolved handoff.

## 16. Define the final exit-review subphase

The final project-specific Phase 009 subphase must use the [Phase 009 exit-review template](exit-review-template.md).

Do not preassign its letter in Base; `009-A` derives the actual sequence.

## Required `009-A` output

Record:

- current-design baseline confirmation;
- integrity interpretation;
- concept/purpose coverage inventory;
- likely interference surfaces;
- interaction clusters;
- variant coverage strategy;
- mapping/expectation coverage;
- counterexample strategy;
- correction-ownership map;
- Phase 010 boundary/carry-forward strategy;
- documentation/OKF plan;
- derived subphase sequence and dependency rationale;
- completion evidence for each subphase;
- final exit-review subphase;
- implementation state.

## Implementation state

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet

`009-A` authorizes only conceptual integrity-audit work.