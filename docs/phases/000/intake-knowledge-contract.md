---
type: Phase Support Contract
title: Phase 000 Intake Knowledge & Evidence Contract
description: Defines the knowledge classes, evidence posture, uncertainty treatment, canonical promotion rules, and anti-solutioning boundaries used during project intake.
tags: [phase-000, intake, evidence, uncertainty, canonical, contract]
---

# Phase 000 Intake Knowledge & Evidence Contract

## Purpose

Phase 000 must make the project understandable without pretending that the design is already known.

This contract defines how intake statements are classified, evidenced, promoted, and carried forward so that later concept design begins from explicit context rather than hidden assumptions.

The contract applies to all project-specific Phase 000 subphases derived by `000-A`.

## Intake is not requirements lock-in

Phase 000 records the best available understanding of the project, its context, affected parties, desired outcomes, constraints, scope, terminology, and uncertainty.

It does **not** freeze:

- a final requirements catalog;
- a final purpose decomposition;
- a concept catalog;
- workflows merely because they exist today;
- product features as mandatory solution structure;
- architecture or implementation choices.

An intake conclusion should describe the problem context or design mandate at the least solution-specific level that remains useful.

## Statement classes

Material intake statements should be distinguishable by epistemic status. A project may express these statuses in frontmatter, tables, prose, or another consistent convention, but the distinction itself must remain visible.

### Evidence-backed observation

A statement directly supported by inspectable evidence such as observed behavior, an authoritative document, measured condition, or other traceable source.

Record the source or provenance when it materially affects interpretation.

### Stakeholder or source assertion

A statement made by a stakeholder, customer, operator, subject-matter expert, policy document, existing specification, or other source that has not independently become an observed fact merely by being stated.

Preserve who or what asserts it when attribution matters.

### External constraint

A condition the design must respect because it arises from law, regulation, contract, policy, physical reality, organizational boundary, interoperability obligation, or another external source.

Where the constraint's interpretation is uncertain, record the uncertainty rather than converting an interpretation into fact.

### Assumption

A proposition being provisionally treated as true so work can proceed, but which is not adequately established.

Assumptions must be visible and should identify what later work could confirm, reject, or make them irrelevant.

### Hypothesis

An explanatory or predictive proposition that should be tested rather than treated as current truth.

A hypothesis may motivate investigation but must not silently become a design requirement.

### Open question

A known gap whose answer is not yet established.

Open questions should identify whether they block Phase 000 exit, may be carried into Phase 001, or have a later explicit destination.

### Proposal or solution idea

An idea about how the eventual product might work.

During Phase 000, proposals are **context**, not design authority. Preserve them when useful, but label and quarantine them so they do not predetermine concept discovery.

### Intake decision

A deliberate decision about the project mandate, scope, evidence interpretation, terminology, or intake process.

An intake decision must not be used as a disguised implementation or concept-design decision.

## Evidence posture

Phase 000 does not require every statement to have equal evidentiary strength. It requires readers to be able to tell what is known, asserted, assumed, hypothesized, constrained, proposed, or unresolved.

For material claims, intake work should consider:

- provenance — where the statement came from;
- authority — why the source is relevant;
- freshness — whether the information may be stale;
- scope — where the statement is believed to apply;
- conflict — whether credible sources disagree;
- uncertainty — what remains unclear;
- consequence — how damaging it would be to treat the statement as true when it is not.

Higher-consequence statements warrant stronger evidence or more explicit uncertainty.

## Conflicting evidence

Conflicting sources must not be reconciled by silently choosing the most convenient interpretation.

When material conflict exists:

1. record the competing claims;
2. preserve relevant provenance;
3. determine whether the conflict can be resolved during intake;
4. if not, record the uncertainty and its downstream consequence;
5. block Phase 000 exit when purpose discovery would otherwise depend on a false certainty.

## Legacy and incumbent-system evidence

An existing system is evidence about current behavior, historical decisions, constraints, terminology, and user expectations. It is not automatically design authority.

When studying an incumbent system, distinguish where practical between:

- behavior that exists because users or the domain genuinely need it;
- behavior imposed by earlier technical limitations;
- accidental behavior that users adapted to;
- policy or contractual behavior that remains externally binding;
- behavior whose original rationale is unknown.

Do not preserve implementation decomposition merely because it already exists.

## Required intake coverage

Every Phase 000 exit must establish or explicitly disposition the following knowledge dimensions, although they need not each receive a separate file or subphase:

- contemplated product/application definition;
- problem or opportunity context;
- affected actors, stakeholders, and materially impacted parties;
- desired outcomes or changes sought;
- scope boundaries and non-goals;
- relevant domain terminology and contextual distinctions;
- known external constraints;
- material assumptions and hypotheses;
- open questions and unresolved uncertainty;
- evidence/source posture where material;
- relevant legacy/current-state context when applicable.

`000-A` determines which of these dimensions already have adequate intake evidence and which require deliberate project-specific subphases.

## Canonical promotion

Durable Phase 000 conclusions should be promoted into concise canonical current knowledge rather than left only in phase history.

Typical canonical intake knowledge may include:

- project/product definition;
- context/problem framing;
- actor and stakeholder context;
- intended outcomes;
- scope and non-goals;
- constraints;
- terminology;
- current assumptions;
- current open questions.

A cloned project may group these into a compact `canonical/project/` family or another coherent structure. File count and taxonomy are not mandated; semantic coverage and authority clarity are.

Evidence gathered while reaching those conclusions may remain in phase records and be linked from canonical knowledge where useful.

## Anti-transformation rules

Phase 000 must not silently transform:

- an actor into an authentication/authorization model;
- a business object into a software concept;
- an existing workflow into an immutable future workflow;
- a desired outcome into a predetermined feature;
- a regulatory constraint into a particular architecture;
- a data source into a required storage model;
- an integration need into a protocol choice;
- a solution proposal into a canonical design decision.

Those transformations belong to later design or downstream representation/implementation work, if they are justified at all.

## Phase 000 completion standard

Phase 000 has sufficient intake knowledge when a reader entering Phase 001 can understand:

- what is being contemplated;
- what context motivates the work;
- who is affected;
- what change or outcome is sought;
- where the project's current boundary lies;
- what constraints and terminology matter;
- what is evidence versus assumption or proposal;
- what remains uncertain;

without needing hidden conversational context and without being handed a preselected concept solution.
