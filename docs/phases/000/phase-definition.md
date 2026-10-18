---
type: Phase Definition
title: Phase 000 — Project Intake & Product Definition
description: Pre-methodology intake phase that establishes the project mandate, product context, affected parties, outcomes, boundaries, evidence posture, constraints, terminology, assumptions, and uncertainty before Jackson-aligned concept design begins.
tags: [phase-000, intake, product-definition, pre-methodology, evidence]
---

# Phase 000 — Project Intake & Product Definition

## Role in the lifecycle

Phase 000 is a deliberate **pre-phase** to the Jackson-aligned concept-design lifecycle.

Its job is to make the design problem sufficiently explicit, evidenced, and bounded that Phase 001 can investigate purpose, need, and success without depending on hidden conversational context or inheriting an already-selected solution.

Phase 000 prepares the design problem. It does not solve it.

It is specifically **not** a requirements-freeze phase, feature-definition phase, architecture phase, or concept-discovery phase.

## Methodological intention

Establish the best current, evidence-aware understanding of:

- what product, application, service, or software-enabled capability is being contemplated;
- what situation, problem, opportunity, burden, or change motivates the effort;
- who sponsors, uses, operates, influences, constrains, or is materially affected by the contemplated product;
- what outcomes or changes are sought;
- what the current project boundary includes and excludes;
- what domain context and terminology matter before design begins;
- what external constraints are already known;
- what legacy/current-state behavior is relevant and why;
- what evidence supports the current framing;
- what is merely asserted, assumed, hypothesized, proposed, or unresolved;
- what uncertainties Phase 001 and later design must inherit explicitly rather than unknowingly.

Phase 000 must preserve uncertainty when certainty has not been earned.

## Relationship to Phase 001

Phase 000 may capture stated goals, desired outcomes, pains, opportunities, and stakeholder explanations for why the project matters.

It must not prematurely perform the full Phase 001 purpose analysis or freeze a final purpose decomposition.

The boundary is:

- **Phase 000 asks:** What is the contemplated project, what context motivates it, who is affected, what change is being sought, what constrains the effort, and what do we currently know or not know?
- **Phase 001 asks:** What human purposes, needs, contextual conditions, success criteria, tensions, and improvements should actually govern concept design?

A successful Phase 000 handoff gives Phase 001 enough grounded context to challenge and refine the initial framing rather than simply accepting it.

## Governing Phase 000 support contracts

Phase 000 is further governed by:

- [000-A — Phase Intent, Intake Scope, Evidence Posture & Subphase Planning](000-a-start-gate.md) — mandatory phase-specific planning gate;
- [Phase 000 Intake Knowledge & Evidence Contract](intake-knowledge-contract.md) — statement classes, evidence posture, uncertainty treatment, required intake coverage, and anti-solutioning rules;
- [Phase 000 Consolidation, Exit Review & Phase 001 Handoff Template](exit-review-template.md) — phase-specific closure and handoff test.

These supporting documents define required semantic coverage without imposing a fixed number of project-specific substantive subphases.

## Required intake coverage

Every Phase 000 exit must establish or explicitly disposition the following knowledge dimensions:

- contemplated product/application definition;
- problem or opportunity context;
- actors, stakeholders, and materially affected parties;
- desired outcomes or changes sought;
- scope boundaries and non-goals;
- domain terminology and contextual distinctions;
- known external constraints;
- assumptions and hypotheses;
- open questions and uncertainty;
- evidence/source posture;
- legacy/current-state context when applicable.

This is a coverage contract, not a file or subphase taxonomy.

## Evidence and epistemic discipline

Material intake statements must remain distinguishable as appropriate among evidence-backed observations, stakeholder/source assertions, external constraints, assumptions, hypotheses, open questions, proposals or solution ideas, and intake decisions.

Phase 000 must not promote repetition, confidence, seniority, or incumbent-system behavior into truth without adequate basis.

## Legacy/current-state neutrality

Existing systems, repositories, workflows, documents, and product behavior may be studied during intake. They are evidence, not automatic design authority.

Where relevant, distinguish genuine domain or user need, external constraint, historical policy, implementation limitation, accidental behavior, user adaptation to an old limitation, and behavior whose rationale is unknown.

## Explicit exclusions

Phase 000 must not define or freeze the final software concept catalog; perform complete concept-purpose decomposition; specify concept state/actions as though concept discovery were complete; turn stakeholder roles into a final authorization model; turn business objects into software concepts automatically; treat proposed features as immutable requirements; preserve current workflows merely because users know them; select product architecture; choose frameworks, databases, infrastructure, protocols, service topology, queues, or deployment models; design implementation APIs or schemas; create executable prototypes or application scaffolding; write implementation tests; establish implementation sequencing; or treat existing implementation structures as design authority merely because they already exist.

## Entry criteria

At minimum there is a project idea, product/application proposal, existing-system reconsideration, or problem/opportunity area worth defining, and enough starting context to perform `000-A` and define a responsible intake plan.

## Exit criteria

Phase 000 may exit only when its project-specific exit review establishes that the contemplated product is understandable without hidden conversational context; the motivating context is explicit enough for Phase 001; relevant affected parties and intended outcomes are visible; scope, terminology, constraints, evidence posture, assumptions, hypotheses, and open questions are appropriately expressed; legacy evidence has not predetermined future concept structure; durable intake conclusions have canonical homes; no concept solution has been prematurely frozen; no representation, architecture, or implementation work has begun; and Phase 001 can begin from repository knowledge alone while remaining free to revisit intake framing.

## Control structure

Phase 000 begins with [000-A](000-a-start-gate.md). The final project-specific subphase must perform Phase 000 consolidation, exit review, and Phase 001 handoff using the [Phase 000 exit-review template](exit-review-template.md). The template does not prescribe the letters or count between those two control points.

## Implementation state

Throughout Phase 000, including after a successful exit:

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet

The only authorized handoff is into Phase 001 concept-design work.
