---
type: Phase Definition
title: Phase 001 — Purpose, Context, Need & Success Framing
description: Establishes a traceable, purpose-centered design mandate from grounded intake knowledge before candidate software concepts are explored.
tags: [phase-001, purpose, need, context, success, concept-design]
---

# Phase 001 — Purpose, Context, Need & Success Framing

## Role in the lifecycle

Phase 001 is the first Jackson-aligned concept-design phase. It converts the grounded project context from Phase 000 into an explicit account of the human purposes, needs, burdens, desired improvements, contextual conditions, and success situations that later concept candidates must justify.

It is the bridge from **project definition** to **concept discovery**.

## Methodological intention

Move deliberately from "what should we build?" toward "why should this functionality exist?" Jackson emphasizes purpose as the rationale for including functionality and argues that good purposes are need-focused, specific, and evaluable.

Phase 001 establishes purposes strongly enough to guide and reject later concept candidates without preselecting those concepts.

## Governing support contracts

- [001-A start gate](001-a-start-gate.md)
- [Purpose, Need & Success Framing Contract](purpose-success-contract.md)
- [Phase 001 Exit Review & Phase 002 Handoff Template](exit-review-template.md)
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md)

## Primary design questions

- What meaningful improvement should the contemplated product create, and for whom?
- What needs, burdens, constraints, risks, failures, or opportunities make that improvement valuable?
- Which contextual conditions materially determine whether a purpose is real or whether success is possible?
- Which purposes are shared, distinct, complementary, or in tension across affected parties?
- What success situations would demonstrate that the design is serving those purposes?
- Which stated goals are too broad, organizationally self-referential, solution-shaped, or unevaluable to govern concept design?
- Which Phase 000 assumptions require challenge before they can support purpose statements?
- What uncertainties or likely misfits must remain visible as concept discovery begins?

## Purpose levels and boundary

Phase 001 may establish:

- overall product/application purpose framing;
- actor- or affected-party needs and purposes;
- distinct design-purpose obligations that later concepts may need to fulfill.

It must **not** assign final purposes to final concepts, because Phase 002 has not yet discovered the candidate concept set. Concept-specific purpose definitions are refined when concepts emerge and are specified in later phases.

Keep separable purposes distinct enough that Phase 002 can explore alternative conceptual decompositions.

## Expected durable outputs

By exit, canonical current knowledge should make discoverable:

- product/application purpose framing;
- affected-party needs, burdens, and desired improvements;
- relevant contextual conditions;
- distinct purpose obligations suitable for evaluating later candidates;
- representative success situations or success criteria;
- purpose tensions, conflicts, tradeoffs, and distributional concerns where relevant;
- assumptions and uncertainties that qualify the purpose model;
- traceability to Phase 000 canonical context and material evidence.

A compact `canonical/purpose/` family is a typical destination, but Base does not require one document per purpose or a fixed taxonomy.

## Explicit exclusions

Phase 001 must not:

- create or freeze the software concept catalog;
- rename desired features and call them purposes;
- treat user requests as self-justifying design requirements;
- select workflows, interface structures, data models, architecture, APIs, services, infrastructure, or implementation sequencing;
- specify concept state or actions;
- write operational principles for concepts that have not yet been discovered;
- equate business KPIs with user need without establishing the human purpose they represent;
- force conflicting stakeholder purposes into artificial consensus.

## Entry criteria

Phase 000 has passed or passed with explicit non-blocking carry-forwards; the project is understandable from repository knowledge alone; relevant intake evidence, assumptions, constraints, actors, scope, and open questions are discoverable; and Phase 001 remains free to challenge the intake framing.

## Exit criteria

Phase 001 may exit only when:

- principal purpose and need statements are explicit enough to evaluate future concept candidates;
- material purposes are need-focused, appropriately specific, and evaluable;
- broad aspirations have been decomposed enough to expose distinct design obligations without inventing concepts;
- affected-party needs and material tensions are visible rather than silently averaged away;
- success framing is concrete enough to distinguish a concept that fulfills a purpose from one that merely resembles a requested feature;
- material context and assumptions qualifying those purposes are explicit;
- evidence and uncertainty are traceable to appropriate sources or canonical intake knowledge;
- durable current purpose knowledge has clear canonical ownership and avoids duplicating established Phase 000 context;
- indexes and cross-links expose the current purpose model without requiring readers to reconstruct it from phase history;
- no candidate concept set has been made authoritative;
- no representation, architecture, or implementation work has begun;
- Phase 002 can perform divergent concept discovery from the purpose model without relying on hidden context.

## Control structure

Phase 001 begins with [001-A](001-a-start-gate.md), which performs purpose-coverage, evidence, documentation, and dependency planning before deriving project-specific substantive subphases.

The final project-specific subphase uses the [Phase 001 exit-review template](exit-review-template.md) to consolidate current knowledge, audit documentation integrity, decide exit readiness, and hand off to Phase 002.

## Implementation state

Throughout Phase 001 and after its successful exit:

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet

The only authorized next step is Phase 002 concept discovery.
