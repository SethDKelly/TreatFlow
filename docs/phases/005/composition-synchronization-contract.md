---
type: Concept Composition Contract
title: Phase 005 Concept Composition & Synchronization Contract
description: Defines how independent concepts compose through synchronization, application-action exposure, conceptual automation, chaining, synergy, and explicit preservation of concept semantics.
tags: [phase-005, composition, synchronization, application-actions, automation, synergy]
sources:
  - id: jackson-sync
    resource: https://essenceofsoftware.com/tutorials/concept-basics/sync/
    title: Concept composition and sync — Daniel Jackson
  - id: jackson-software-concepts
    resource: https://essenceofsoftware.com/tutorials/concept-basics/sw-as-concepts/
    title: Software = concepts — Daniel Jackson
---

# Phase 005 Concept Composition & Synchronization Contract

## Why composition is separate from concept definition

Jackson treats an application as a collection of interacting concepts. Concepts remain independently understandable, while synchronization provides the means for their actions to participate in application behavior together.[^jackson-software-concepts]

Phase 005 therefore does not weaken the Phase 004 independence result. It explains how independently defined concept behaviors are **constrained and coordinated at the application level**.

[^jackson-software-concepts]: Daniel Jackson, "Software = concepts."

## Core synchronization semantics

A synchronization constrains the possible executions of included concepts so that when a designated action occurs, specified participating actions occur with it.[^jackson-sync]

A synchronization may also contain only one concept action. In that case, it serves to expose that concept action as an application action without adding cross-concept behavior.[^jackson-sync]

The Base template uses this semantic model without requiring Jackson's particular textual notation.

[^jackson-sync]: Daniel Jackson, "Concept composition and sync."

## Concepts stay intrinsically independent

Synchronization must not be used to rewrite one concept's intrinsic specification in terms of another concept.

A concept continues to own:

- its purpose;
- operational principle;
- abstract state;
- actions;
- intrinsic preconditions/effects/results;
- invariants;
- intrinsic lifecycle/time/history/authority semantics.

The composition layer owns only the additional application-level relationship among already-defined concept actions.

If a proposed synchronization requires changing what an action intrinsically means, first determine whether the concept specification or boundary is wrong and reopen Phase 003 or 004 as appropriate.

## Synchronization anatomy

A synchronization should make explicit, as relevant:

- **application action identity** — the meaningful application-level action or reaction being defined;
- **trigger** — the concept action whose occurrence initiates/reactively requires the remaining participation, if the synchronization is trigger-oriented;
- **participants** — concept actions that must participate;
- **semantic bindings** — how action inputs/outputs correspond or flow among participants;
- **conditions** — application-level conditions under which the synchronization is available or required, when such conditions are genuinely part of the design;
- **authority/actor context** — who may initiate the application action and which concept-intrinsic authority rules remain applicable;
- **observable result** — what application-level behavior the synchronization explains;
- **chaining consequences** — other synchronizations that may be induced because a participating action acts as another synchronization's trigger.

Not every synchronization requires every field. Omit what does not belong to the semantics rather than inventing ceremony.

## Trigger discipline

Do not confuse a conceptual trigger with an implementation event source.

A trigger says that the occurrence of one concept action constrains the composition so that other action participation follows. It does not imply:

- a message being published;
- an event bus;
- a queue;
- a callback;
- a webhook;
- a database trigger;
- a workflow engine;
- a scheduler;
- a synchronous or asynchronous runtime mechanism.

Those are representation/engineering choices outside Base.

## Semantic binding and data flow

Synchronizations often connect outputs from one concept action to inputs of another.

Record the **semantic identity** of the value being passed, not its wire format or transport representation.

A binding should be understandable from the participant specifications. If the composition needs a value that no concept action produces or accepts, do not invent an implementation adapter to make the diagram work. Resolve whether:

- the concept specification is incomplete;
- the wrong actions are being composed;
- an application-level derivation is conceptually justified;
- another concept is missing;
- the proposed synchronization is invalid.

## Preconditions, invariants, and synchronization availability

A synchronization does not erase the preconditions or invariants of its participating concept actions.

The composition must establish that the synchronized action combination is semantically possible under the conditions in which the application offers or triggers it.

If one participant can legally act while another cannot, determine whether:

- the application action should be unavailable in that state;
- the synchronization condition is incomplete;
- the concepts have conflicting semantics;
- a boundary/specification problem exists;
- the expected application behavior was wrong.

Do not solve conceptual incompatibility by assuming a runtime retry, compensating transaction, exception handler, or hidden fallback.

## Application action surface

The included concepts define a larger space of possible actions than a particular application necessarily exposes.

Jackson's composition examples show that concept actions omitted from synchronization are not automatically present in the resulting application.[^jackson-sync]

Phase 005 must therefore make the application action surface deliberate.

For each relevant concept action, classify it conceptually as appropriate:

- directly exposed as an application action;
- available only as a participant in a multi-concept synchronization;
- available only through system-triggered composition;
- intentionally unavailable in this application;
- unresolved and requiring further composition analysis.

Do not interpret "exposed" as an API or UI decision. It means the behavior belongs to the application's conceptual action surface.

## One-action synchronizations

A one-action synchronization is useful when an application simply exposes a concept action under an application-level action identity.

Use it deliberately when it clarifies the application surface or restricts which concept actions are included.

Do not create one-action synchronization documents mechanically for every concept action. Document them at the level needed to make the composition unambiguous and retrievable.

## Reactive and coordinated composition

A multi-concept synchronization may express several useful patterns without introducing different runtime categories:

- one concept action reactively inducing another concept action;
- an application action coordinating multiple concept actions;
- a system-triggered concept action causing another concept's action;
- one participant's output supplying another participant's input;
- one conceptual occurrence being recognized across multiple independent concept state machines.

These are semantic composition patterns. The implementation may realize them in many different ways.

## Chaining

A participating action may itself trigger another synchronization. Jackson explicitly notes this chaining behavior in later synchronization examples.[^jackson-sync]

When chaining matters, make the conceptual consequence visible:

- what initiating action begins the chain;
- which subsequent synchronizations become applicable;
- what application-visible behavior results;
- whether any cycle or repeated reaction is possible;
- whether concept preconditions/invariants remain satisfied throughout the conceptual chain.

Do not turn the chain into a distributed sequence diagram or commit protocol.

## Over-synchronization

A composition is over-synchronized when actions are tied together more strongly than the application purpose requires.

Warning signs include:

- a user cannot use one concept behavior independently even though its purpose suggests they should be able to;
- unrelated concept actions always occur together merely because the incumbent product does so;
- adding a concept silently changes many existing application actions;
- synchronizations encode organizational workflow rather than conceptual necessity;
- optional behavior is made mandatory without a purpose-level justification.

Over-synchronization can destroy the practical value of concept modularity even though the concept specifications remain nominally independent.

## Under-synchronization

A composition is under-synchronized when the application promises behavior that the current concept/action combinations do not actually ensure.

Warning signs include:

- a success scenario assumes cross-concept effects that no synchronization explains;
- concept states can diverge in ways the intended application semantics do not permit;
- a lifecycle/correction action in one concept should conceptually cause another concept to react but no relationship exists;
- an application action is described in prose but cannot be reconstructed from its participating concept actions.

Do not compensate with vague narrative. Either define the missing synchronization or correct the earlier design assumption.

## Composition versus hidden concept merging

A synchronization should connect independent concepts, not conceal the fact that one purported concept lacks meaningful value without the other.

If two concepts always participate together because neither fulfills a coherent purpose by itself, revisit Phase 004 specificity/completeness.

Conversely, do not merge two sound concepts merely because the application almost always synchronizes them. Frequent composition is not intrinsic dependence.

## Automation

Automation is a conceptual consequence of composition when one action leads to additional concept behavior without a separate user initiation for every participating action.

Describe:

- what action initiates the automation;
- what additional concept behavior occurs;
- what purpose the automation serves;
- what consequences are user-visible or materially affect another actor;
- what authority/preconditions constrain it.

Do not infer a background worker, scheduler, job, agent, trigger service, workflow engine, or event processor.

## Synergy

Jackson calls a composition synergistic when the combined concepts provide a benefit beyond the simple addition of each concept's individual value.[^jackson-sync]

Synergy must be demonstrated rather than assumed.

A useful synergy statement should explain:

- the constituent concept benefits;
- the additional application-level benefit produced by their composition;
- why that additional benefit follows from the synchronization;
- which purpose or success framing makes the additional benefit valuable.

A composition that merely makes two independent features available together is not automatically synergistic.

## Authority and protected semantics

Composition may coordinate actions with different actors or authority conditions, but it must not silently bypass concept-intrinsic authority.

For consequential synchronizations, ask:

- who initiates the application action;
- whose authority is required by each participant;
- whether one concept action's output grants, proves, or merely supplies information relevant to another;
- whether the synchronization makes an action occur for an actor who could not invoke it independently;
- whether that behavior is part of the intended concept semantics or an integrity violation.

Do not translate these questions into authentication or authorization implementation.

## Correction, invalidation, and lifecycle composition

Concept lifecycle actions may need cross-concept composition.

For example, removal, expiration, correction, supersession, revocation, or restoration in one concept may require another independent concept to react at the application level.

Specify the semantic relationship when it is part of the intended application behavior. Do not assume eventual cleanup, database cascades, compensating jobs, or implementation-specific consistency mechanisms.

## Synchronization counterexamples

Challenge each material synchronization with questions such as:

- What breaks if this synchronization is removed?
- Could the triggering action reasonably occur without one participant?
- Does one participant fail its own precondition in a valid state of another?
- Is an included action serving a different application purpose that should be independently selectable?
- Does the synchronization expose a behavior users should not receive in this application?
- Does a participant need information that the other concept does not semantically provide?
- Does the composition force an intrinsic concept change?
- Does chaining produce an unintended cycle or consequence?
- Is a described synergy still present if one participant is replaced with another concept serving the same role?

Counterexamples should test conceptual necessity and coherence, not runtime reliability.

## Relationship to Phase 006

Phase 005 assumes the relevant concepts are being considered together and defines **how they interact**.

Phase 006 determines **which concept combinations constitute coherent application/product subsets** and which inclusion relationships are required, optional, conditional, or alternative.

A synchronization may suggest an extrinsic inclusion dependency, but Phase 005 must not automatically turn every synchronization edge into a Phase 006 dependency edge.

Interaction and inclusion are different relations.

## Relationship to Phase 009 integrity

Phase 005 must already reject obvious synchronizations that violate concept semantics.

Phase 009 later performs the broader whole-system integrity/interference audit after dependence, mapping, and familiarity/refinement work may have changed the composition context.

Do not defer a known synchronization contradiction to Phase 009 merely because a later integrity phase exists.

## Documentation and canonical ownership

Synchronization knowledge is current design truth once established, so it belongs in canonical knowledge rather than only in phase records.

Use document boundaries based on semantic cohesion. A project may use one synchronization document per meaningful application behavior, one per tightly related group, or another discoverable structure.

Regardless of layout:

- link to canonical concept specifications instead of copying their action definitions;
- state only composition-specific trigger/participation/binding/condition/result semantics;
- link to purpose/success knowledge where it materially justifies the composition;
- keep exploratory synchronization alternatives and rejected compositions in phase evidence;
- keep Phase 006 inclusion hypotheses provisional until Phase 006 establishes them;
- update indexes so current composition knowledge is discoverable;
- supersede stale Phase 004 synchronization-seam hypotheses where they would otherwise appear current;
- avoid parallel "interaction matrix" and synchronization documents that restate the same current truth with different wording.

## Explicit representation/implementation boundary

A synchronization is **not** any of the following unless a downstream engineering process later chooses such a realization:

- API orchestration;
- event choreography;
- service calls;
- queue/topic subscriptions;
- database transactions;
- saga/compensation logic;
- workflow definitions;
- state-machine execution engines;
- distributed consistency protocols;
- retries/timeouts/backoff;
- job scheduling;
- UI event handling;
- controller logic;
- integration architecture.

Phase 005 must stay representation-independent even when an implementation analogy feels obvious.

## Completion test

Phase 005 has done enough when the application-level behavior can be reconstructed conceptually from:

**independent concept actions + explicit synchronizations + deliberate application-action exposure**

and Phase 006 can analyze inclusion/product-family dependence without first guessing how concepts interact.
