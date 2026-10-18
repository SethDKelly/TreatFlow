---
type: Concept Specification Contract
title: Phase 003 Concept Behavioral Specification Contract
description: Defines the representation-independent purpose, operational-principle, state, action, invariant, lifecycle, authority, and under-specification discipline used to specify concepts in Phase 003.
tags: [phase-003, concept-specification, operational-principle, state-machine, actions, invariants]
sources:
  - id: jackson-op
    resource: https://essenceofsoftware.com/tutorials/concept-basics/principle/
    title: Operational principles — Daniel Jackson
  - id: jackson-state
    resource: https://essenceofsoftware.com/tutorials/concept-basics/state/
    title: Concept state — Daniel Jackson
  - id: jackson-machine
    resource: https://essenceofsoftware.com/tutorials/concept-basics/concept-as-machine/
    title: Concepts are state machines — Daniel Jackson
  - id: jackson-criteria
    resource: https://essenceofsoftware.com/tutorials/concept-basics/criteria/
    title: Concept criteria — Daniel Jackson
---

# Phase 003 Concept Behavioral Specification Contract

## Purpose

Phase 003 turns a plausible candidate into a behavioral specification precise enough to reason about and challenge, while preserving freedom over representation and implementation.

The specification must explain what the concept means, how it fulfills its purpose, what it remembers, and what behavior it permits or produces.

It must not answer how the concept will be stored, distributed, exposed through an API, rendered in a UI, implemented in code, or assigned to architectural components.

## The concept specification as a coherent whole

Jackson presents software concepts as coherent units of user-facing functionality that can be defined through a purpose, operational principle, state, and actions.[^jackson-machine]

A Base concept specification should therefore make the following information discoverable when relevant:

- concept identity/name;
- purpose;
- operational principle;
- abstract type parameters and primitive/value domains;
- abstract state;
- actions, including inputs and outputs;
- action preconditions/guards;
- effects/postconditions;
- invariants or state constraints;
- initial, lifecycle, temporal, historical, correction, or authority semantics where behavior requires them;
- deliberate under-specification;
- unresolved modularity/boundary questions for Phase 004.

The exact notation is not prescribed by Base. Semantic precision matters more than syntax.

[^jackson-machine]: Daniel Jackson, "Concepts are state machines."

## Purpose

A concept's purpose explains why the concept deserves to exist and what coherent human/domain need or improvement it is intended to serve.

Phase 003 may sharpen the candidate's purpose as behavior becomes explicit, but should retain traceability to authoritative Phase 001 purpose/need knowledge.

If the behavior appears to serve multiple unrelated purposes, record that as a Phase 004 specificity/boundary concern rather than hiding it.

If no defensible purpose remains after specification, the concept should be reconsidered or rejected rather than preserved by documentation momentum.

## Operational principle

Jackson defines an operational principle as an archetypal scenario that explains how a concept is typically used and how it fulfills its purpose.[^jackson-op]

A useful OP should:

- demonstrate the concept's characteristic value;
- identify meaningful concept actions and resulting outcome;
- be specific enough to make the behavior understandable;
- remain at the concept level rather than describing UI gestures, API calls, or implementation mechanisms;
- avoid pretending to enumerate every valid execution;
- make it possible to ask whether the state/action specification actually supports the story.

A concept may require more than one OP when one story cannot adequately explain materially different but coherent ways it fulfills the same purpose. Multiple OPs should not be used to conceal an overloaded concept serving unrelated purposes.

[^jackson-op]: Daniel Jackson, "Operational principles."

## Operational principles are not use-case catalogs

The OP explains the defining/archetypal behavior. It does not replace a full behavioral specification.

Do not expand Phase 003 into an exhaustive catalog of success/failure use cases merely because scenarios are easy to write. The state/action specification defines the wider set of possible behaviors; later phases test exceptional and adversarial scenarios explicitly.

## Abstract state: the concept's memory

Jackson describes concept state as the information the concept must remember so that future actions can behave correctly.[^jackson-state]

State should satisfy two complementary pressures:

- **Sufficiency** — remember enough to support the concept's intended actions and constraints.
- **Necessity/minimality** — avoid carrying information that does not affect the concept's behavior merely because it exists in the domain or implementation.

[^jackson-state]: Daniel Jackson, "Concept state."

### State is not an ontology

Do not model every relevant real-world fact. Include only information required by the concept's behavioral promise or intentionally retained to support an explicitly documented future behavioral rationale.

Domain richness belongs where behavior needs it, not automatically in the concept state.

### Prefer the most abstract adequate structure

Jackson recommends abstract state formulations that avoid premature representation commitments.[^jackson-state]

Prefer:

- identity over implementation-specific IDs;
- sets/relations when order is not behaviorally required;
- abstract values over storage formats;
- generic parameters over references to another application concept's types;
- conceptual time/history relationships over concrete persistence/audit mechanisms.

Do not introduce sequence, hierarchy, indexing, partitioning, denormalization, caching, object nesting, event logs, or other structures unless the concept's observable behavior itself requires that distinction.

### No intrinsic external concept types

A concept's state should not depend directly on a type owned by another application concept. Where objects supplied by another concept must participate, use a generic/abstract parameter or identity domain so the concept remains independently specifiable.[^jackson-state]

This does not prohibit later synchronization or product-level composition. It prevents hidden intrinsic dependence inside the concept specification.

## Actions

Actions express the meaningful ways the concept's state can be changed or queried. Jackson's state-machine formulation treats app/concept behavior as executions composed of action instances.[^jackson-machine]

An action specification should make clear, as applicable:

- action name and semantic intent;
- input values;
- output values;
- preconditions/guards that constrain when it may occur;
- effects/postconditions on abstract state;
- observable result;
- whether the action is initiated by a user/actor, by the concept/system, or represents a read/query behavior;
- any intrinsic authority condition necessary to explain valid invocation.

### Actions are not API endpoints

Do not derive endpoint names, HTTP methods, RPC signatures, event schemas, service methods, message topics, handlers, commands, database operations, or UI controls from the concept action specification during Base design.

A later implementation may map concept actions to any suitable representation. Phase 003 must preserve that freedom.

## Preconditions and effects

Preconditions state conceptual conditions that must hold for an action to be valid or possible.

Effects/postconditions state what must be true as a result of the action.

Use them to define behavior, not to encode incidental algorithms.

When several possible results all satisfy the concept's promise, the specification may intentionally leave the choice open rather than selecting an algorithm.

## Deliberate under-specification and non-determinism

Jackson explicitly uses under-specified/non-deterministic action results to leave implementation choices open when the concept does not promise a particular selection strategy.[^jackson-machine]

Base treats this as a positive design tool.

A specification should distinguish:

- **deliberate under-specification** — several outcomes are intentionally allowed because the concept's semantics do not require choosing among them;
- **open design question** — the concept may require a rule, but the design has not yet decided it;
- **accidental omission** — necessary behavior has simply not been specified.

Do not resolve deliberate under-specification merely to make the document look more complete.

## Invariants and state constraints

Record invariants when they express conditions that must hold across valid concept states and materially contribute to understanding/correctness.

Examples of invariant concerns may include uniqueness, exclusivity, consistency among related state components, allowed subset relationships, or preservation of protected conditions.

Do not introduce invariants as a formalism exercise. Each should serve the behavioral meaning of the concept and be traceable to purpose, action correctness, or a necessary semantic constraint.

## Initial and lifecycle semantics

Where behavior depends on lifecycle, specify the conceptual semantics of states/actions such as:

- creation/establishment;
- activation/deactivation;
- acceptance/rejection;
- expiration;
- cancellation/withdrawal;
- closure;
- deletion/removal;
- restoration;
- invalidation;
- correction/supersession.

Not every concept needs each category. Absence of an action can itself be a meaningful design decision when it protects the concept's purpose or integrity.

Do not translate lifecycle semantics into database status fields, workflow engines, persistence retention policy, background jobs, or distributed processing design.

## Time and historical behavior

Model time/history only when later concept behavior depends on it.

Examples include deadlines, expiration, sequencing of prior decisions, reversibility, correction, version relevance, or visibility conditioned on past events.

If elapsed time must cause concept behavior, represent the conceptual passage/observation of time or corresponding system action sufficiently to explain the behavior without choosing schedulers, jobs, clocks, queues, or storage mechanisms.

## Authority semantics

Authority belongs in a concept specification when it is intrinsic to that concept's behavior—for example, when only a concept-defined owner may perform a protected action.

State only the semantic rule required to explain valid behavior. Do not design authentication providers, role databases, tokens, permission services, identity infrastructure, or authorization middleware.

Cross-concept authority interactions and application-wide policy should remain visible as later synchronization/integrity questions rather than being silently imported into one concept.

## Queries and observable state

A concept may include actions that query/read state without changing it when that behavior is part of its user-facing promise.

Do not assume that every state component must be directly queryable or visible. Phase 007 later determines user-visible representation/mapping. Phase 003 specifies semantic behavior, not presentation exposure.

## Behavior versus mapping

Phase 003 says **what the concept does**.

Phase 007 later says **how users perceive and invoke that behavior in a product experience**.

Therefore:

- a concept action does not imply a button;
- state does not imply a screen field;
- an OP does not imply a click path;
- an output does not imply a notification/panel/API response;
- a conceptual error/invalid condition does not imply a specific UI message.

## Behavior versus synchronization

Phase 003 defines behavior intrinsic to one concept.

If an action needs another concept's action or state to make sense, ask whether:

- the concept is not independent;
- a generic parameter is missing;
- the behavior actually belongs to another concept;
- the interaction should be expressed later as a synchronization in Phase 005.

Do not specify cross-concept orchestration inside a concept merely because the final application will compose the behaviors.

## Specification depth

A concept is specified deeply enough for Phase 003 when a competent reader can reason about representative and non-archetypal executions without inventing the concept's behavior.

It is not necessary to formalize every trivial consequence or enumerate every scenario.

The test is whether Phase 004 can meaningfully challenge specificity, completeness, independence, and genericity based on the specification rather than on intuition.

## Candidate revision and rejection

Detailed specification is a discovery mechanism. If writing the purpose, OP, state, or actions reveals that a candidate is incoherent, overloaded, empty, derivative, or not meaningfully user-facing, Phase 003 may:

- reframe it;
- return it to discovery;
- split/merge-question it for Phase 004;
- defer it;
- reject it.

Do not complete a bad specification merely because the candidate was handed forward.

## Canonical concept document discipline

By Phase 003, a retained concept with stable semantic identity will usually justify an authoritative canonical document under the project's concept knowledge family.

Prefer one natural canonical owner for each concept's current semantics. That document should link to:

- authoritative purpose/need knowledge;
- supporting provenance/evidence where material;
- relevant open questions;
- later synchronization/dependency/mapping knowledge as those phases establish it.

Do not copy Phase 001 purpose narratives or Phase 002 candidate history into every concept document. Summarize only what is needed to orient the concept and link to the authoritative owner/history.

When a candidate is rejected or renamed, update indexes and canonical ownership rather than leaving multiple apparently current concept specifications.

## Documentation and OKF requirements

Apply the repository-wide Documentation Integrity & OKF Governance Contract.

In particular:

- ordinary concept documents must have valid OKF frontmatter;
- use concise `title` and `description` for indexability;
- use `sources` only when provenance is real and useful;
- indexes expose concept documents without duplicating their specifications;
- stable Markdown links form the knowledge graph;
- phase evidence explains specification reasoning without becoming a competing source of current truth;
- unresolved design questions remain visibly unresolved;
- terminology changes trigger review of affected links/indexes/current canonical references.

## Phase 003 completion standard

Phase 003 is complete when the retained concept set is specified with enough behavioral precision that Phase 004 can challenge the concepts as modular design units rather than merely debate what their names might mean.

Behavioral precision must not be purchased by premature implementation commitment.
