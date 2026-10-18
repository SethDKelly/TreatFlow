---
type: Concept-Design Closure Contract
title: Concept-Design Closure & Phase 012 Handoff Contract
description: Defines methodology-wide traceability, orphan detection, canonical reconciliation, unresolved-item disposition, closure evidence, readiness transition, and handoff from concept-design closure into Phase 012 pre-implementation preparation.
tags: [phase-011, closure, methodology, traceability, canonical, handoff, readiness, phase-012]
sources:
  - id: jackson-distillation
    resource: https://essenceofsoftware.com/posts/distillation/
    title: The Essence of the Essence — Daniel Jackson
  - id: jackson-design-engineering
    resource: https://essenceofsoftware.com/tutorials/design-general/design-vs-engineering/
    title: Design vs. engineering — Daniel Jackson
  - id: jackson-integrity
    resource: https://essenceofsoftware.com/posts/sample-chapters/eos-11-concept-integrity.pdf
    title: Concept Integrity — Daniel Jackson
---

# Concept-Design Closure & Phase 012 Handoff Contract

## Purpose

Phase 011 determines whether the Base concept-design lifecycle has actually produced a complete, coherent, traceable, validated, and discoverable conceptual design.

It is stronger than an ordinary phase exit because it audits the **entire concept-design lifecycle and current knowledge graph**.

Closure is justified only when a competent reader can understand why the product should exist, what concepts fulfill its purposes, how those concepts behave and compose, which product variants are in scope, how users experience them, what limitations exist, and what evidence supports the claim that the design is ready for post-closure repository preparation.

## Methodological posture

Base operationalizes Daniel Jackson's concept-design method into numbered phases, but those phase numbers are Base's lifecycle structure rather than Jackson's prescribed project phases.

Jackson's central principles remain closure criteria:

- **specificity** — purposes and concepts are appropriately aligned rather than orphaned, redundant, or overloaded;
- **familiarity** — familiar concepts are reused where semantically appropriate and false familiarity is avoided;
- **integrity** — concepts still fulfill their purposes when composed.

Phase 011 also verifies concept structure, purpose, operational principle, state/action behavior, composition, dependence, mapping, and validation work performed earlier in the lifecycle.

## Closure is not implementation

Jackson distinguishes software design from engineering: concept design determines user-facing behavior and meaning, while engineering later realizes that design reliably in technology.

Phase 011 may establish **implementation readiness**, but it must not begin implementation as evidence of readiness.

A successful closure hands the repository first to **Phase 012 — Pre-Implementation Audit, OKF Hardening & Agentic Development Preparation**. Phase 012 is a Base post-closure transition, not part of Jackson's concept-design methodology.

## The closure chain

A project should be able to traverse a coherent chain of current knowledge:

`project context / affected need`
→ `purpose / design obligation`
→ `concept`
→ `operational principle`
→ `abstract state / actions / invariants`
→ `synchronization / application action`
→ `dependence / product subset / scope`
→ `user-visible mapping`
→ `familiarity / reuse / genericity refinement`
→ `whole-system integrity`
→ `representative and adversarial validation`
→ `accepted limitations / implementation-facing obligations`.

Not every node needs its own document. The requirement is semantic traceability through authoritative knowledge and meaningful links.

## Methodology-completeness discipline

Phase 011 should verify that every methodology obligation required by the actual project has been addressed or explicitly dispositioned.

The current design should answer, as relevant:

- What human/domain change justifies the product?
- Whose needs/interests matter?
- What distinct design purposes exist?
- What concepts fulfill those purposes?
- How does each concept fulfill its purpose?
- What does each concept remember and permit?
- Are the concept boundaries specific, complete, independent, and sufficiently generic?
- How do independent concepts compose?
- Which concept combinations form coherent products/variants?
- How are concept/application semantics made intelligible to users?
- Which familiar ideas are reused, and which novelty is intentional?
- Do concepts preserve their promises in composition?
- Has the mature design survived representative and adversarial validation?
- What limitations, uncertainties, and implementation-facing obligations remain?

A project need not create a giant closure document containing all answers. It must make the answers discoverable from current authority.

## Orphan-detection discipline

Closure must deliberately search for elements that are present but not justified, or obligations that exist but are not fulfilled.

Look for, among other things:

- important needs/purposes with no design response;
- concepts with no current purpose;
- concepts whose operational principle no longer matches current behavior;
- state/actions/invariants with no semantic role;
- purpose-critical behavior with no action;
- synchronizations/application actions with no current application justification;
- dependency edges or variants with no contextual rationale;
- mappings with no current semantic source;
- false-familiar terminology;
- integrity/validation findings invalidated by later correction;
- accepted limitations that exist only in phase evidence;
- current documents with no meaningful place in progressive disclosure.

Material orphans must be corrected, removed, or explicitly bounded before closure.

## Traceability discipline

Traceability should be **navigational and semantic**, not merely a spreadsheet full of IDs.

A closure matrix or graph can be useful, but it should point to natural current owners rather than reproduce their content.

Traceability should be bidirectional enough to answer both:

- Why does this concept/action/synchronization exist?
- Where is this purpose/need actually fulfilled and validated?

Do not manufacture artificial one-to-one links when the design legitimately contains contextual nuance, but expose unexplained many-to-many ambiguity rather than hiding it.

## Specificity, familiarity, and integrity closure audit

Phase 011 should confirm that the final design does not knowingly preserve:

- purpose without concept;
- concept without purpose;
- redundant or overloaded concepts;
- reused familiar concepts whose semantics materially conflict with user expectations;
- concepts that fail their purposes under current composition.

If closure discovers such a problem, reopen the relevant earlier phase rather than writing a final-summary exception around it.

## Validation closure audit

Closure requires evidence that:

- representative success still works end to end;
- likely/consequential misfit families were exercised appropriately;
- material misfits were corrected or explicitly bounded;
- corrections were revalidated;
- accepted limitations are compatible with current promises;
- residual uncertainty is explicit rather than accidental.

Scenario count is not evidence of completeness.

## Accepted limitations and bounded uncertainty

Concept-design closure may coexist with limitations and uncertainty when they are honestly bounded.

An accepted limitation is closure-compatible only when:

- its context is explicit;
- it does not contradict an authoritative purpose or concept promise;
- users/affected parties are not materially misled about support where that matters;
- consequences are understood sufficiently for design closure;
- the limitation has a natural current owner;
- it is not unfinished concept-design work renamed as risk.

A bounded uncertainty is closure-compatible only when the current design remains coherent without pretending the uncertainty is resolved.

## Open-question disposition

Every material current open question must be classified before closure as one of:

- **resolved**;
- **accepted limitation/non-goal**;
- **bounded uncertainty compatible with closure**;
- **downstream representation/architecture/engineering question** whose conceptual obligation is already clear;
- **obsolete/superseded**;
- **concept-design blocker** requiring reopening.

A repository with a large undifferentiated open-question area is not closure-ready merely because the questions are documented.

## Canonical reconciliation discipline

Phase 011 performs the lifecycle-wide application of repository documentation-governance rules for **design authority**.

Closure requires:

- one natural current owner for each durable semantic rule;
- no known contradictory current authorities;
- clear supersession of retired concept identities/rules;
- historical phase records preserved as evidence rather than current truth;
- indexes reflecting the current knowledge graph;
- meaningful links among current design owners;
- current terminology propagated consistently;
- ordinary concept documents conforming to the adopted OKF structure;
- no material current document orphaned from progressive disclosure;
- provenance retained where materially needed;
- duplicate closure summaries consolidated rather than layered on top of canonical truth.

Phase 012 performs a further post-closure OKF/staleness/README/agentic-governance audit before engineering begins. That later audit does not weaken this Phase 011 closure obligation.

## Closure evidence versus current truth

Phase 011 records may include completeness matrices, orphan registers, reconciliation checklists, closure evidence, and final decision rationale.

These are closure evidence. They do not replace the canonical design owners they reference.

## Reopening discipline during closure

Phase 011 is allowed—and expected—to reopen earlier phases when closure analysis finds a real design gap.

When that happens:

1. record the closure finding;
2. reopen the natural earlier phase/semantic owner;
3. perform the needed design work;
4. update current truth;
5. propagate downstream effects;
6. re-run affected later-phase audits/validation;
7. return to Phase 011 only when closure evidence reflects the corrected design.

Do not close the lifecycle by labeling a resolvable design defect a "known issue."

## Implementation-contamination closure audit

Search current design authority for premature representation/engineering choices.

Material contamination includes current rules that unnecessarily require particular source/module/service boundaries, database schemas/storage engines, API/protocol/message forms, runtime orchestration, infrastructure/deployment choices, frameworks/languages/vendors, executable test structure, CI/CD, implementation sequencing, or concrete identity/security mechanisms where only conceptual properties are required.

Preserve legitimate conceptual constraints and engineering obligations while removing contingent machinery from design authority.

## Phase 012 handoff discipline

The successful closure handoff should give Phase 012 enough current authority to audit/polish the repository without reconstructing design history.

It should expose:

- current canonical design entry points;
- product/variant scope;
- concept purposes and observable semantics;
- application actions/synchronizations;
- authority boundaries;
- lifecycle/history/correction/recovery obligations;
- user-visible mapping requirements;
- accepted limitations/non-goals;
- conceptual safety/privacy/interoperability/consistency properties;
- validation scenarios future work should preserve;
- unresolved engineering questions whose conceptual obligations are already clear;
- documentation/index/supersession concerns appropriate for Phase 012 review.

Phase 011 does not prescribe the downstream architecture.

## Readiness-state transition

Before successful Phase 011 closure:

- **Implementation readiness:** not ready
- **Implementation execution:** not started
- **Implementation authorization:** not yet

After a successful closure decision:

- **Implementation readiness:** ready
- **Implementation execution:** not started
- **Implementation execution authorization:** not granted by Phase 011

Successful concept-design closure authorizes **Phase 012 pre-implementation preparation**, not implementation execution.

After Phase 012, a separate downstream representation/architecture/engineering process still decides when and how implementation execution is authorized.

## Closure outcomes

### PASS — CONCEPT DESIGN CLOSED

Use when methodology completeness, canonical reconciliation, unresolved-item disposition, validation evidence, and Phase 012 handoff are sufficient.

The readiness state may transition to **ready / not started**.

### PASS WITH BOUNDED CARRY-FORWARD — CONCEPT DESIGN CLOSED

Use only when all concept-design work is complete and remaining items are limited to explicit accepted limitations, bounded uncertainties compatible with closure, or downstream questions whose conceptual obligations are already clear.

The readiness state may transition to **ready / not started** only if the carry-forwards are genuinely non-blocking. Phase 012 receives them explicitly.

### NOT READY TO CLOSE

Use when any material concept-design, methodology, documentation-authority, validation, or implementation-contamination blocker remains.

Implementation stays **not ready / not started / not authorized**.

## Closure standard

The closure question is not:

> Have all phase documents been produced?

It is:

> Does the repository now contain one coherent, traceable, validated conceptual design whose current meaning can be discovered without relying on superseded history, and is that design sufficiently complete to close concept design and enter Phase 012 repository preparation without prematurely choosing implementation?

Only a defensible **yes** closes the Base concept-design lifecycle.
