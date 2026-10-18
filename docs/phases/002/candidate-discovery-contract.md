---
type: Candidate Concept and Divergent Discovery Contract
title: Phase 002 Candidate Concept & Divergent Discovery Contract
description: Defines how Phase 002 generates, evaluates, compares, records, converges, and documents candidate concepts without prematurely freezing the concept system.
tags: [phase-002, concept-discovery, candidates, divergence, convergence, concept-criteria]
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

# Phase 002 Candidate Concept & Divergent Discovery Contract

## Purpose

Phase 002 discovers plausible software concepts before committing to their detailed behavioral specification.

Its central discipline is to hold two requirements in tension:

- **diverge enough** to discover materially different conceptual possibilities; and
- **converge enough** to hand Phase 003 candidates that plausibly qualify as concepts rather than features, entities, screens, technical modules, or fragments of behavior.

The phase must not collapse those two modes into one continuous filtering exercise.

## What a candidate concept is

A candidate concept is a provisional hypothesis that a recognizable mental construct and a coherent unit of software functionality can be aligned around a useful purpose.

A candidate is not yet a completed Jackson concept specification.

During Phase 002 it may still have unresolved questions about:

- exact purpose boundary;
- operational principle;
- state and actions;
- completeness;
- independence;
- genericity;
- familiarity;
- naming;
- relationship to neighboring candidates.

Those uncertainties are expected. They must be visible rather than concealed.

## Concept criteria as discovery lenses

Jackson identifies concepts as user-facing, semantic, independent, behavioral, purposive, end-to-end, familiar, and reusable.[^jackson-criteria]

Phase 002 uses these as discovery lenses:

- **User-facing** — users or other legitimate application users experience the behavior or meaning; purely internal machinery is not a concept.
- **Semantic** — the candidate expresses application meaning, not a UI widget, visual treatment, storage structure, or technical mechanism.
- **Independent** — the candidate appears understandable without requiring another application concept to define what it means.
- **Behavioral** — it represents dynamic functionality, not merely a noun, record, classification, or data container.
- **Purposive** — it plausibly delivers useful value rather than merely serving as a step inside some larger behavior.
- **End-to-end** — it plausibly spans enough behavior to fulfill its purpose rather than representing an isolated CRUD operation or workflow fragment.
- **Familiar** — an established mental construct may be preferable when it fits; novelty is not a virtue by itself.
- **Reusable** — a candidate that can make sense beyond the immediate application may indicate stronger conceptual independence.

[^jackson-criteria]: Daniel Jackson, "Concept criteria: what's a concept?"

These criteria are not all-or-nothing acceptance tests during early divergence. They become stronger convergence tests as Phase 002 progresses.

## Divergent mode

Jackson distinguishes divergent design, where ideas are generated expansively and criticism is delayed, from convergent design, where ideas are refined into a coherent design.[^jackson-diverge]

During divergent work:

- generate conceptual alternatives before defending favorites;
- allow incomplete or awkward candidate seeds to remain visible long enough to inspire better decompositions;
- explore different allocations of behavior rather than only different names;
- avoid evaluating every new idea immediately against the complete concept rubric;
- separate idea generation from selection when premature criticism would reduce breadth;
- revisit earlier assumptions when new candidates expose a better understanding of the problem.

[^jackson-diverge]: Daniel Jackson, "Divergent and convergent design."

## Sources of divergent ideas

Jackson describes tactics including stakeholder inquiry, imagined situations, gap analysis, viability considerations, analogies, feature-list review, LLM assistance, and social/ethical/value considerations.[^jackson-tactics]

Base treats these as **idea sources**, not authority sources.

In particular:

- stakeholder suggestions are not automatically concepts;
- competitor features are prompts, not requirements;
- incumbent behavior is evidence, not future structure;
- feature lists should be translated into underlying behavior/purpose questions before candidate promotion;
- LLM output is brainstorming material and must not be treated as evidence or comprehensive coverage;
- analogy is useful only when semantic fit is examined rather than assumed;
- values, indirect stakeholders, differing abilities, and contextual diversity can reveal concept possibilities that direct-user feature brainstorming misses.

[^jackson-tactics]: Daniel Jackson, "Tactics for divergent design."

## Alternative decomposition discipline

Phase 002 should seek **alternative decompositions**, not merely alternative features.

Material alternatives may differ in:

- what functionality is treated as one concept versus several;
- which purpose a candidate is intended to fulfill;
- whether a familiar concept can be adapted instead of inventing a new one;
- whether a candidate should be more generic;
- whether a domain-specific noun hides a broader behavior pattern;
- where user-visible state or control belongs conceptually;
- whether one apparent concept is actually a synchronization of independent concepts.

A list of twenty candidates that all assume the same underlying decomposition is not strong divergence.

## Candidate descriptions during Phase 002

A candidate record should normally be lightweight. Capture enough to reason about the hypothesis without doing Phase 003 prematurely.

Useful fields may include:

- candidate name or working label;
- tentative purpose association;
- short behavior/mental-model sketch;
- discovery source or inspiration;
- reasons it might qualify as a concept;
- important criteria concerns;
- competing or alternative candidates;
- open boundary/genericity/familiarity questions;
- current disposition.

Do not require complete state/action specifications or full operational principles here.

## Candidate disposition vocabulary

Use simple, understandable dispositions rather than pretending candidate maturity is more precise than it is. Typical dispositions are:

- **Exploring** — retained in the divergent candidate space;
- **Retained for specification** — plausible enough to enter Phase 003;
- **Reframe/split/merge candidate** — promising behavior exists but the current boundary or identity is suspect;
- **Deferred** — potentially useful but not justified within the current scope or evidence;
- **Rejected** — not retained, with rationale when that history prevents repeated rediscovery or explains a significant choice.

Projects may use equivalent wording. The semantic distinction matters more than a fixed status enum.

## Convergent mode

Convergence should reduce the candidate space deliberately rather than by fatigue, stakeholder preference, or documentation momentum.

A candidate is normally ready for Phase 003 when:

- it maps plausibly to one or more established purpose obligations;
- it appears to be a recognizable mental construct or one worth deliberately introducing;
- it represents coherent behavior rather than static data or an implementation mechanism;
- it appears capable of end-to-end value;
- it does not obviously require another application concept merely to be understood;
- important competing decompositions have been considered;
- unresolved specification or boundary questions are explicit and suitable for Phases 003–004.

This is a **plausibility threshold**, not proof of full concept quality.

## What Phase 002 must not settle

Do not require Phase 002 to finish work that belongs later:

- complete concept purposes and operational principles — Phase 003;
- complete state/action/invariant specification — Phase 003;
- rigorous specificity, completeness, independence, and genericity factoring — Phase 004;
- cross-concept synchronization — Phase 005;
- application inclusion dependence — Phase 006;
- user-visible mapping — Phase 007;
- methodology-wide familiarity audit — Phase 008;
- composed-system integrity — Phase 009.

A concern may be discovered early and carried forward, but Phase 002 should not absorb the later lifecycle merely to make candidate selection feel final.

## Purpose coverage without premature one-to-one mapping

Every material Phase 001 design-purpose obligation should be accounted for during discovery.

At Phase 002 exit, each should be one of:

- addressed by at least one plausible retained candidate;
- addressed by multiple competing candidates still requiring specification;
- intentionally deferred with rationale;
- exposed as a discovery gap that blocks exit;
- reconsidered because discovery revealed a flaw in Phase 001 framing.

Do not force one purpose to one concept during Phase 002. Jackson's later specificity reasoning needs actual concept specifications before that relationship can be judged rigorously.

## Reopening earlier framing

Discovery can expose that an incoming purpose is too vague, solution-shaped, conflated, contradictory, or unsupported.

When that happens:

- do not invent candidate concepts merely to satisfy the existing purpose list;
- record the discovery finding;
- reopen or correct Phase 001 knowledge as required by the lifecycle contract;
- reassess candidate work affected by the change.

Methodological honesty outranks phase-number linearity.

## Documentation authority and anti-bloat

The divergent candidate space is primarily **phase evidence**.

Do not create a canonical concept document for every brainstormed candidate. That would turn exploration into false authority and leave later readers with a polluted concept catalog.

A retained candidate may receive a provisional canonical concept document when:

- its semantic identity is stable enough to be referenced independently;
- Phase 003 is expected to refine that same knowledge object rather than immediately replace it;
- its provisional status and unresolved questions remain obvious;
- the repository has a natural canonical owner and index path for it.

Rejected, abandoned, or purely exploratory candidates should normally remain in phase records.

When a candidate later changes identity materially, prefer explicit reframe/supersession over leaving two nearly identical current documents.

## Reference discipline

Candidate records and provisional concept knowledge should reference the relevant authoritative purpose knowledge rather than copying the full Phase 001 rationale.

Use links to express:

- purpose association;
- evidence or inspiration;
- alternative candidate relationships;
- reframe/split/merge lineage where useful;
- canonical promotion or supersession.

Use `sources` when a concept document materially derives from an external or internal source artifact. Do not use provenance metadata to imply that the source endorses the candidate.

## Phase 002 completion condition

Phase 002 has done enough when Phase 003 can begin behavioral specification from a candidate set that is broad enough to show real exploration, narrow enough to be tractable, plausibly concept-shaped, purpose-traceable, and explicit about unresolved design questions—without treating those candidates as already proven concepts.
