---
type: Phase Definition
title: Phase 002 — Concept Discovery, Candidate Inventory & Divergent Exploration
description: Discovers and compares alternative candidate concepts as user-facing semantic behavioral hypotheses, then converges only enough to support rigorous behavioral specification in Phase 003.
tags: [phase-002, concept-discovery, divergence, convergence, candidates, concept-design]
sources:
  - id: jackson-criteria
    resource: https://essenceofsoftware.com/tutorials/concept-basics/criteria/
    title: Concept criteria — Daniel Jackson
  - id: jackson-diverge
    resource: https://essenceofsoftware.com/tutorials/design-general/diverge-converge/
    title: Divergent and convergent design — Daniel Jackson
  - id: jackson-tactics
    resource: https://essenceofsoftware.com/tutorials/design-general/divergent-tactics/
    title: Tactics for divergent design — Daniel Jackson
---

# Phase 002 — Concept Discovery, Candidate Inventory & Divergent Exploration

## Role in the lifecycle

Phase 002 is the first phase that explicitly proposes software concepts.

It takes the purpose, need, context, and success framing established by Phase 001 and explores alternative conceptual decompositions that might fulfill those obligations.

Its job is neither unconstrained feature brainstorming nor final concept selection. It must create enough breadth to avoid premature lock-in and enough disciplined convergence to hand Phase 003 a tractable set of plausible concept hypotheses.

## Methodological intention

Discover candidate concepts that plausibly align a mental construct users can understand with a coherent unit of user-facing software behavior.

Jackson's concept criteria distinguish concepts from entities, features, classes, microservices, UI elements, and other software notions by emphasizing user-facing, semantic, independent, behavioral, purposive, end-to-end, familiar, and reusable functionality.[^jackson-criteria]

Phase 002 uses those criteria progressively: lightly during divergence so exploration is not suppressed, and more deliberately during convergence so obviously non-conceptual candidates are not passed forward as though valid.

[^jackson-criteria]: Daniel Jackson, "Concept criteria: what's a concept?"

## Relationship to Phase 001

Phase 001 establishes why meaningful functionality is needed. Phase 002 explores what conceptual units might satisfy those purposes.

Phase 002 must therefore begin from authoritative purpose knowledge rather than reverse-engineering purposes to justify attractive ideas.

If discovery reveals that a Phase 001 purpose is vague, conflated, solution-shaped, contradictory, or unsupported, the correct response is to reopen or refine that earlier knowledge—not invent a concept merely to fill the slot.

## Relationship to Phase 003 and Phase 004

Phase 002 asks whether a candidate is plausible enough to deserve specification.

Phase 003 asks what the candidate actually means behaviorally through purpose, operational principle, abstract state, actions, conditions, effects, outputs, and invariants.

Phase 004 then asks whether the resulting specified concepts are correctly factored, specific, complete, independent, and appropriately generic.

Phase 002 must not consume those later obligations in an attempt to make candidate selection final.

## Governing Phase 002 support contracts

Phase 002 is further governed by:

- [002-A — Discovery Scope, Divergence Strategy, Candidate Criteria & Subphase Planning](002-a-start-gate.md);
- [Candidate Concept & Divergent Discovery Contract](candidate-discovery-contract.md);
- [Phase 002 Consolidation, Exit Review & Phase 003 Handoff Template](exit-review-template.md);
- repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md).

These establish required methodological and documentation coverage without prescribing a fixed B–X subphase sequence.

## Divergent and convergent modes

Jackson distinguishes divergent design—expansive generation with criticism deliberately delayed—from convergent design, which reduces and refines ideas into a coherent design.[^jackson-diverge]

Phase 002 must deliberately preserve both modes.

During **divergence**, the project should explore materially different behavioral decompositions and resist filtering every idea immediately.

During **convergence**, the project should assess whether retained candidates plausibly qualify as concepts, remain traceable to purposes, and are worth detailed specification.

The design may oscillate between the modes when a convergence finding exposes the need for new alternatives. The phase structure should support this rather than enforce a false one-way funnel.

[^jackson-diverge]: Daniel Jackson, "Divergent and convergent design."

## Primary design questions

Phase 002 should answer, as relevant:

- What candidate concepts could plausibly fulfill the purposes and needs established in Phase 001?
- What materially different conceptual decompositions deserve exploration?
- Which candidate ideas appear to align a recognizable mental construct with coherent behavior?
- Which ideas are merely features, UI elements, data entities, workflow fragments, roles, implementation modules, or technical mechanisms?
- Which candidates appear overloaded, fragmentary, derivative, application-specific, or insufficiently purposive?
- What familiar concepts or analogies suggest alternatives?
- Where might greater genericity reveal a stronger concept?
- What concepts might emerge when indirect stakeholders, values, accessibility, safety, or different contexts are considered?
- Which candidates should be retained, reframed, split/merge-questioned, deferred, or rejected?
- What uncertainty must Phase 003 or Phase 004 resolve before the concept set can become authoritative?

## Discovery sources

Jackson describes divergent tactics including stakeholder inquiry, imagined situations, gap analysis, viability considerations, analogies, feature-list review, LLM-assisted idea generation, and social/ethical/value exploration.[^jackson-tactics]

These may all be useful during Phase 002, but none create authority merely by suggesting an idea.

Feature lists, incumbent products, competitor behavior, prior architectures, stakeholder preferences, and LLM output must remain prompts or evidence rather than predetermined concept catalogs.

[^jackson-tactics]: Daniel Jackson, "Tactics for divergent design."

## Required discovery coverage

Every Phase 002 exit must establish or explicitly disposition:

- coverage of material Phase 001 design-purpose obligations;
- meaningful exploration of alternative decompositions where alternatives matter;
- candidate concept-likeness;
- candidate-to-purpose traceability;
- anchoring/inherited-structure risks;
- familiar versus novel possibilities where relevant;
- genericity and boundary questions worth carrying forward;
- candidate disposition and convergence rationale;
- unresolved candidate uncertainties;
- discoverable current handoff knowledge for Phase 003.

This is a semantic coverage requirement, not a prescribed number of candidates, documents, or subphases.

## Candidate maturity discipline

Candidates remain hypotheses throughout Phase 002.

Useful dispositions include:

- **Exploring**;
- **Retained for specification**;
- **Reframe/split/merge candidate**;
- **Deferred**;
- **Rejected**.

Equivalent project-specific wording is acceptable. The template must not imply a false quantitative maturity scale.

`Retained for specification` means only that a candidate is plausible enough to examine rigorously in Phase 003.

## Expected durable outputs

By exit, Phase 003 should be able to discover:

- the retained candidate concept set;
- tentative candidate-to-purpose associations;
- short mental-model/behavior sketches sufficient to orient specification;
- significant alternative decompositions considered;
- material rejected/deferred/reframed decisions where their rationale matters;
- unresolved boundary, purpose, independence, completeness, genericity, familiarity, naming, or authority questions;
- carry-forwards and their intended destinations.

The divergent candidate history itself belongs primarily in phase records.

A candidate should become provisional canonical concept knowledge only when its semantic identity is stable enough to be independently referenced and Phase 003 is expected to refine the same knowledge object.

## Documentation and knowledge authority

Phase 002 is especially vulnerable to documentation bloat because divergence intentionally creates many ideas.

Therefore:

- do not create a canonical concept document for every candidate seed;
- keep exploratory and rejected alternatives in phase evidence;
- reference Phase 001 purposes rather than copying their rationale;
- promote only sufficiently stable retained candidates into provisional canonical concept knowledge;
- make provisional status explicit;
- ensure rejected candidates do not remain exposed by indexes as current concepts;
- consolidate near-duplicate candidate knowledge before exit;
- use meaningful links for purpose association, alternatives, provenance, and later supersession;
- update indexes whenever current candidate knowledge becomes discoverable or changes identity.

The repository-wide documentation-governance contract is part of the phase exit test, not optional cleanup.

## Explicit exclusions

Phase 002 must not:

- freeze the final concept catalog;
- require complete concept operational principles;
- define detailed concept state/actions/invariants as final;
- perform the full Phase 004 modularity audit;
- define synchronizations as authoritative application behavior;
- determine product-family dependency structure;
- design user-interface mappings;
- translate domain nouns or database entities directly into concepts;
- accept incumbent features, workflows, services, or modules as concept boundaries by default;
- select architecture, APIs, schemas, databases, infrastructure, protocols, frameworks, or implementation sequencing;
- create executable prototypes, tests, scaffolding, or implementation artifacts.

## Entry criteria

Phase 002 may begin only when:

- Phase 001 has passed or passed with explicitly non-blocking carry-forwards;
- current purpose/need knowledge is discoverable and sufficiently discriminating to guide discovery;
- material affected-party/context/tension information is available;
- the project can identify inherited solution proposals that must not become authority;
- `002-A` can define a responsible divergence and convergence plan.

If purpose knowledge is too weak to judge candidates meaningfully, return to Phase 001.

## Exit criteria

Phase 002 may exit only when its project-specific exit review establishes that:

- discovery was materially divergent rather than a restatement of the starting feature/domain model;
- important purpose obligations are addressed, deferred with rationale, or explicitly identified as discovery gaps;
- retained candidates plausibly satisfy the concept criteria strongly enough to justify specification work;
- materially different alternatives were considered where appropriate;
- candidate convergence decisions are explainable and traceable;
- obvious feature/entity/UI/implementation-shaped candidates have been rejected, reframed, or clearly flagged;
- retained candidates remain explicitly provisional;
- unresolved specification and factoring questions are assigned to later phases;
- current candidate knowledge is discoverable without scanning every brainstorming record;
- exploratory/rejected candidates have not polluted canonical current truth;
- documentation/index/reference state is coherent and OKF-conformant in the scope touched by the phase;
- no representation, architecture, or implementation work has begun;
- Phase 003 can begin from repository knowledge alone and is explicitly authorized to revise or reject retained candidates when detailed specification exposes flaws.

## Control structure

Phase 002 begins with:

- [002-A — Discovery Scope, Divergence Strategy, Candidate Criteria & Subphase Planning](002-a-start-gate.md).

`002-A` derives only the project-specific substantive discovery/convergence subphases required by the actual design problem.

The final project-specific subphase performs Phase 002 consolidation, documentation-integrity audit, exit review, and Phase 003 handoff using the [Phase 002 exit-review template](exit-review-template.md).

The template does not prescribe the count or letters between those control points.

## Exit outcomes

Use the repository-wide outcomes:

- **PASS** — Phase 002 fulfills its discovery purpose and Phase 003 may begin.
- **PASS WITH CARRY-FORWARD** — discovery is sufficient while explicit non-blocking candidate questions continue with named destinations.
- **NOT READY TO EXIT** — divergence, purpose coverage, candidate quality, convergence rationale, documentation coherence, or solution-lock problems require more work or reopening an earlier phase.

## Implementation state

Throughout Phase 002, including after successful exit:

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet

The only authorized handoff is into the Phase 003 behavioral concept-specification process.
