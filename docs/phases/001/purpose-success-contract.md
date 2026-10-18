---
type: Purpose and Success Framing Contract
title: Phase 001 Purpose, Need & Success Framing Contract
description: Defines purpose quality, purpose levels, success framing, contextual qualification, evidence traceability, and anti-solutioning rules for Phase 001.
tags: [phase-001, purpose, need, success, context, evidence]
sources:
  - id: jackson-purpose
    resource: https://essenceofsoftware.com/tutorials/concept-basics/purpose/
    title: Concept purposes — Daniel Jackson
  - id: jackson-success
    resource: https://essenceofsoftware.com/tutorials/gentle-intro/how-software-succeeds/
    title: How software succeeds — Daniel Jackson
---

# Phase 001 Purpose, Need & Success Framing Contract

## Why purpose precedes concepts

Jackson's purpose discipline moves design from asking what functionality should exist to asking why it deserves to exist. He describes concept purposes as rationales for functionality and gives three useful quality criteria: a purpose should be **need-focused, specific, and evaluable**.[^jackson-purpose]

Phase 001 applies that discipline before concept discovery so Phase 002 has meaningful criteria for divergent exploration rather than a feature list to rationalize.

[^jackson-purpose]: Daniel Jackson, "Concept purposes."

## Purpose levels

Keep these levels distinguishable:

### Product/application purpose

The meaningful improvement that justifies undertaking the product as a whole. It should describe value in human/domain terms rather than revenue, adoption, technical modernization, or delivery success alone.

### Actor or affected-party need

A burden, need, risk, constraint, opportunity, or desired change experienced by a relevant party. Not every stakeholder request is necessarily a justified need, and affected parties may have conflicting interests.

### Design-purpose obligation

A sufficiently distinct purpose that later concept candidates may need to fulfill. Phase 001 may identify these obligations, but it does not yet bind them to final concepts.

### Concept purpose — later refinement

Once candidate concepts exist, each retained concept requires its own purpose. Jackson's specificity discipline ultimately pushes toward one coherent purpose per concept.[^jackson-purpose] Phase 001 prepares that work without deciding the concept boundaries in advance.

## Criteria for a useful Phase 001 purpose

A purpose used to govern concept discovery should be:

- **Need-focused** — framed around an improvement, protection, capability, burden, or constraint that matters to people or the domain rather than around a proposed mechanism.
- **Specific enough to discriminate** — capable of favoring some concept candidates and rejecting others rather than merely saying the product should be useful, successful, secure, or easy.
- **Evaluable** — usable as a yardstick for whether a later design actually fulfills it without requiring arbitrary assumptions.
- **Solution-neutral** — does not encode the feature, screen, data model, workflow, or technical mechanism it is supposed to justify.
- **Context-qualified** — states material conditions under which the need or improvement exists.
- **Evidence-aware** — makes clear when the purpose rests on observation, assertion, assumption, hypothesis, constraint, or unresolved interpretation.

## From broad aspiration to distinct purposes

Broad goals may hide several separable needs. Phase 001 should decompose them enough to expose independent purpose obligations, but stop before selecting concept boundaries.

For example, "make collaboration easier" may conceal different needs around awareness, coordination, attribution, recovery, or controlled disclosure. The phase should expose such distinctions if supported by the domain, not immediately invent software concepts named after them.

## Purposes are not stakeholder wishes

Stakeholder statements are evidence. They are not automatically purpose truth.

Challenge statements such as:

- "we need a dashboard";
- "users need notifications";
- "the new system must work like the old one";
- "we need AI";
- "we need accounts".

Ask what burden, protection, improvement, coordination need, or other purpose makes the proposed mechanism valuable. Preserve the proposal as evidence if useful, but do not make it the purpose.

## Success framing

Jackson recommends reasoning from scenarios of software success—situations in which the software creates the improvement that makes it valuable.[^jackson-success]

Phase 001 should therefore establish representative success framing that demonstrates the intended improvement without pre-writing concept operational principles.

[^jackson-success]: Daniel Jackson, "How software succeeds."

Useful success framing should:

- describe a meaningful before/after improvement or burden removed;
- identify relevant parties and context;
- be concrete enough to test later concept candidates;
- avoid UI steps, implementation mechanisms, or assumed concept names;
- reveal when success for one party may create cost or risk for another;
- avoid becoming an exhaustive use-case catalog.

## Success framing versus operational principles

Phase 001 success situations concern the **product/purpose level**.

A concept operational principle, introduced after concepts exist, is an archetypal scenario showing how one concept fulfills its purpose. Do not create concept OPs in Phase 001 simply because both artifacts use scenarios.

## Context and misfit seeds

Record contextual conditions that may make a purpose stronger, weaker, conditional, or conflicting. Examples include timing, frequency, scale, reversibility needs, authority relationships, information asymmetry, legal constraints, safety consequences, economic incentives, accessibility, or dependence on other actors.

Phase 001 does not perform the full Phase 010 misfit audit. It preserves likely misfit seeds so later design does not forget them.

## Tensions and conflicting purposes

Do not force all purposes into harmony.

Where one party's success can undermine another's, record the tension explicitly. Examples may involve privacy versus visibility, speed versus deliberation, individual autonomy versus organizational control, convenience versus auditability, or competing affected-party interests.

Later concept design must be able to see these tensions rather than inherit an artificially unanimous purpose model.

## Evidence and traceability

Purpose claims should link to the relevant Phase 000 canonical context and use structured `sources` when they materially derive from source artifacts.

Avoid copying Phase 000 project descriptions into purpose documents. Reference the existing canonical owner and add only the new purpose-level interpretation.

Where evidence is incomplete or disputed, retain the uncertainty rather than laundering it into a confident purpose statement.

## Documentation shape

Base does not require one document per purpose. Choose document boundaries based on semantic cohesion and retrieval usefulness.

A new canonical purpose document is justified when it has a distinct meaning that future phases need to reference independently. Otherwise refine an existing natural owner and cross-link it.

Indexes should expose the current purpose knowledge available, not duplicate the purposes themselves.

## Phase 001 completion test

Phase 001 has done enough when Phase 002 can ask "what alternative concepts could fulfill these purposes?" without first having to reconstruct why the product exists, infer hidden affected parties, or accept a preselected feature decomposition.
