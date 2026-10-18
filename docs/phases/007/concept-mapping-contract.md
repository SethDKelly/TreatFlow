---
type: Concept Mapping Contract
title: Phase 007 Concept Mapping & User-Visible Representation Contract
description: Defines how conceptual state, application actions, synchronizations, terminology, feedback, authority, and variant semantics map into user-visible representations without becoming UI implementation.
tags: [phase-007, concept-mapping, interaction-semantics, state-visibility, action-mapping, representation]
sources:
  - id: jackson-mapping
    resource: https://essenceofsoftware.com/posts/distillation/
    title: The Essence of the Essence — Concept Mapping — Daniel Jackson
  - id: jackson-levels
    resource: https://essenceofsoftware.com/posts/distillation/
    title: The Essence of the Essence — Levels of Design — Daniel Jackson
  - id: jackson-tutor-mapping
    resource: https://essenceofsoftware.com/studies/larger/tutor/
    title: A GPT-powered tutor — State Queries and Concept Mapping — Daniel Jackson
  - id: jackson-beyond-ui
    resource: https://essenceofsoftware.com/tutorials/design-general/beyond-ui/
    title: Beyond the user interface — Daniel Jackson
---

# Phase 007 Concept Mapping & User-Visible Representation Contract

## Purpose

This contract governs the translation of the conceptual design into user-visible interaction and representation semantics.

Jackson distinguishes three levels of software design: **conceptual**, **linguistic**, and **physical**. The conceptual level concerns the application's state, actions, effects, and interpretation from the user's perspective; linguistic and physical design concern how those semantics are named, signaled, organized, and presented.[^jackson-levels]

Concept mapping connects these levels.[^jackson-mapping]

Phase 007 therefore asks how users can perceive and act through the conceptual design without allowing representation choices to redefine that design.

[^jackson-levels]: Daniel Jackson, "The Essence of the Essence," Levels of Design.
[^jackson-mapping]: Daniel Jackson, "The Essence of the Essence," Concept Mapping.

## Mapping is not concept invention

A mapping starts from authoritative conceptual semantics.

It may reveal that earlier semantics are incomplete, incoherent, or difficult to represent faithfully, but it must not silently create new concept behavior simply because a representation requires it.

When a mapping idea requires a concept action, state distinction, synchronization, authority rule, or scope rule that does not exist, classify the issue as one of:

- missing upstream concept behavior;
- missing application composition;
- incorrect product/subset scope;
- genuinely new design need requiring an earlier-phase reopen;
- representation idea that should be rejected.

Do not patch conceptual gaps with interface convention.

## Mapping targets

Phase 007 maps the following kinds of conceptual knowledge, where relevant:

- concept state and state queries;
- application actions established in Phase 005;
- concept/application preconditions and action availability;
- synchronization results and automation consequences;
- authority and protected-action semantics;
- lifecycle, temporal, historical, correction, invalidation, or supersession state;
- in-scope product/application variants from Phase 006;
- purpose-relevant distinctions users must understand to act correctly.

Not every internal state relation needs direct representation. Representation is required when omission would prevent users or affected parties from understanding, controlling, predicting, verifying, or recovering from relevant behavior.

## State mapping

Jackson's concept-mapping examples show views defined from queries over concept state; a view may react to changes in underlying concept state without becoming part of the concept itself.[^jackson-tutor-mapping]

A state mapping should identify:

- the semantic question being answered;
- the authoritative concept/application state or query that answers it;
- the actor/observer for whom the answer matters;
- relevant context or scope;
- distinctions that must remain visible;
- what absent, stale, historical, invalidated, uncertain, or partially applicable state means where relevant.

A representation may derive, aggregate, filter, summarize, or combine state from multiple concepts if the resulting meaning is explicit and does not falsely imply a different underlying concept.

Do not introduce a second conceptual truth merely because a derived view is convenient.

[^jackson-tutor-mapping]: Daniel Jackson, "A GPT-powered tutor," State Queries and Concept Mapping.

## Action mapping

Application actions, not raw implementation events, are the primary action-mapping surface.

For each material application action, mapping should make sufficiently clear, as relevant:

- what action is available;
- who may or must initiate/participate;
- what object, subject, or scope the action concerns;
- what semantic inputs are required;
- what preconditions or current state qualify availability;
- what protected authority conditions apply;
- what consequential effects are important to understand before initiation;
- what result or state change should be perceivable afterward;
- what correction, cancellation, reversal, or recovery semantics matter.

The mapping may eventually be realized by gestures, controls, commands, spoken input, APIs used by developer-users, or other mechanisms. Phase 007 does not choose or implement those mechanisms unless a linguistic/physical constraint is itself necessary to preserve meaning.

## Availability and signification

A user-visible action should not appear conceptually available when the application semantics say it cannot validly occur.

Conversely, an important available action should not be effectively undiscoverable when the product's purpose depends on users being able to invoke it.

Phase 007 should distinguish:

- available and directly invocable;
- available only under a visible condition;
- system-triggered/automatic but observable where consequences matter;
- intentionally unavailable in this product/variant;
- unavailable due to current state/authority;
- unknown or ambiguous, which requires resolution.

This is a semantic availability model, not a UI-state implementation model.

## Feedback and result mapping

Users need enough feedback to understand whether consequential actions occurred and what changed.

For each material action, ask:

- what result must be visible or otherwise perceivable;
- which changed state must be confirmed;
- whether effects occur immediately, conditionally, or through synchronized consequences at the conceptual level;
- whether the actor must distinguish success, refusal, invalid state, cancellation, supersession, or other semantically distinct outcomes;
- whether affected parties need separate visibility from the initiating actor.

Do not prescribe spinners, notifications, toast messages, polling, push updates, or transport behavior merely to satisfy the feedback obligation.

## Linguistic mapping

Names, labels, terminology, symbols, and explanatory language must preserve conceptual distinctions.

Check for:

- one term being used for multiple concepts with materially different semantics;
- multiple terms being used for the same concept without a legitimate contextual reason;
- incumbent terminology that encodes an obsolete concept boundary;
- familiar terms whose conventional meaning conflicts with current behavior;
- vague labels that hide authority, target, lifecycle, or consequence;
- terminology that makes synchronized behavior appear concept-local when that distinction matters.

Phase 008 will later perform a broader familiarity and reuse audit. Phase 007 must still correct mapping terminology that is already misleading.

## Physical and structural mapping

Physical mapping may establish constraints on organization, grouping, separation, prominence, adjacency, ordering, or persistence when those are necessary to communicate the conceptual model.

Examples of acceptable Phase 007 statements include:

- two conceptually distinct actions must be distinguishable;
- current and historical state must not be visually conflated;
- a protected action requires consequence/target context before commitment;
- a derived view must preserve which concept owns the underlying state;
- users must be able to compare these states before selecting an action.

Examples outside Phase 007 authority include:

- exact pixel layout;
- CSS values;
- component hierarchy;
- route tree;
- design-system token choices;
- device-specific implementation code;
- frontend state-management architecture.

A wireframe may serve as exploratory mapping evidence if it remains subordinate to the semantic mapping contract and is not treated as implementation authority.

## Concept distinction and mapping integrity

Jackson emphasizes that similar-looking controls can represent entirely different concepts; the UI alone does not determine the underlying semantics.[^jackson-beyond-ui]

Phase 007 must therefore test whether a representation allows users to form the correct conceptual understanding.

Mapping integrity fails when representation:

- makes different concepts appear equivalent when their effects differ materially;
- makes one concept appear to own behavior actually produced by another or by synchronization;
- hides state needed to predict an action's effect;
- represents a derived/aggregated object as though it were the underlying concept object without preserving important distinctions;
- exposes behavior that the current application action surface intentionally excludes;
- suggests authority, ownership, finality, reversibility, or scope that the conceptual model does not actually provide.

[^jackson-beyond-ui]: Daniel Jackson, "Beyond the user interface."

## Synchronization and automation mapping

When an application action synchronizes multiple concepts, representation may present a single coherent action while still preserving the semantic consequences that matter.

The mapping should determine:

- what the initiating actor believes they are doing;
- which additional effects are material to understanding or consent;
- whether automatic/chained behavior must be disclosed before or after initiation;
- whether users need to distinguish constituent concepts for later correction, control, or explanation;
- how failures or unavailable participant states are represented conceptually.

Do not expose internal composition detail merely because it exists. Do expose it when hiding it would create a misleading mental model or obscure consequential behavior.

## Authority, disclosure, and consequence

Mapping must respect authority semantics established upstream.

For consequential or protected actions, determine whether users need to perceive:

- who currently has authority;
- whose object/state is affected;
- what scope the action applies to;
- whether authority is delegated, conditional, revocable, or historical;
- whether another party will be affected;
- what consequence follows;
- whether the action can be corrected or reversed.

The need for visibility is conceptual. Authentication widgets, permission middleware, confirmation-dialog implementations, and access-control technology are downstream concerns.

## Temporal, historical, and correction mapping

Where concepts distinguish current, pending, expired, withdrawn, invalidated, superseded, restored, corrected, or historical state, Phase 007 must decide which distinctions users need to perceive and act upon.

Do not flatten semantically distinct states into one presentation merely to simplify the interface.

Do not invent new lifecycle states solely for presentation convenience.

## Variant mapping

An application family may support several in-scope concept subsets.

Different variants may legitimately use different mappings because surrounding concepts, application actions, or context differ.

However:

- the same concept should preserve its intrinsic semantics across variants;
- omitted concepts must not leave misleading references or unavailable actions presented as current;
- variant-specific synchronizations must be represented consistently with Phase 005 truth;
- differences in terminology should be justified when they alter user understanding;
- mapping differences must not silently create a new concept definition.

## Explanation order and progressive understanding

Phase 006 dependencies may imply that some concepts are easier to understand after others.

Phase 007 may use that information to shape explanation, onboarding, contextual presentation, or semantic grouping.

Do not convert a dependence ordering automatically into navigation structure or screen sequence. The mapping obligation is that users can acquire an intelligible mental model in context.

## Accessibility and context of use

Accessibility is not merely a physical afterthought when a representation choice determines whether users can perceive a concept distinction or invoke an action reliably.

Phase 007 should identify semantic obligations that must survive across relevant modes of perception and interaction, such as:

- distinctions not relying solely on one sensory cue;
- action identity remaining clear under alternate interaction modes;
- consequential state being available to users who cannot perceive one particular visual representation;
- terminology/explanations remaining understandable in the relevant context.

This does not authorize platform-specific accessibility implementation.

## Mapping alternatives and counterexamples

Phase 007 should challenge mappings rather than merely document the first interface intuition.

Useful probes include:

- Could the same visible treatment be mistaken for a different concept?
- Could two different concept states appear identical when users need to act differently?
- Does a user need hidden state to predict the effect of an available action?
- Does a derived view imply ownership or scope that the underlying concepts do not support?
- Does automation create an effect users would reasonably attribute to the wrong action?
- Could one representation work for a variant where the concept is absent and thereby mislead users?
- Does a familiar label bring expectations the concept does not fulfill?
- Does making the mapping simpler require changing the concept rather than the representation?

When the last question is yes, reopen the appropriate upstream design rather than contaminating the mapping.

## Expected durable outputs

By exit, current canonical knowledge should make discoverable, where applicable:

- concept/application state visibility obligations;
- application-action invocation and availability semantics;
- meaningful feedback/result obligations;
- terminology and linguistic distinctions;
- physical/structural representation constraints that are semantically necessary;
- synchronization/automation representation obligations;
- authority/disclosure/consequence mappings;
- temporal/historical/correction visibility;
- variant-specific mapping differences;
- explicit unresolved non-blocking familiarity/reuse/integrity questions for later phases.

Detailed wireframe experiments, rejected mappings, visual alternatives, usability observations, and mapping debate belong primarily in phase history unless they establish durable semantic knowledge.

## Documentation and knowledge authority

Phase 007 is vulnerable to documentation duplication because experience semantics can be restated in concept specifications, synchronization documents, wireframes, UX narratives, and mapping matrices.

Therefore:

- give each durable mapping rule one natural canonical owner;
- reference concept/synchronization/scope owners rather than copying their definitions;
- create new mapping documents only for distinct semantic experience knowledge that future phases need to reference independently;
- update an existing concept owner when a mapping insight is reusable concept-specific design knowledge rather than application-specific presentation;
- keep exploratory visual artifacts and rejected mappings in phase evidence;
- do not let screenshots/wireframes become authoritative substitutes for written semantics;
- use meaningful graph links among mapping owners, participating concepts, application actions, purposes, and variants;
- update indexes when mapping knowledge becomes current or is superseded;
- consolidate duplicate terminology/action/state mapping summaries before exit;
- apply the repository-wide documentation/OKF integrity audit.

## Explicit implementation exclusions

Phase 007 must not select or define:

- frontend frameworks or UI libraries;
- component hierarchies or implementation design systems;
- route trees or navigation code;
- CSS/layout implementation;
- client-side state stores or view-model architecture;
- API calls, endpoint bindings, payloads, or transport;
- polling, subscriptions, websockets, event delivery, or refresh mechanisms;
- caching/materialization implementation for derived views;
- native versus web technology decisions;
- automated UI tests, executable prototypes, or source scaffolding.

## Completion standard

Phase 007 has done enough when relevant users can be reasoned about as perceiving, understanding, and invoking the in-scope conceptual application without the mapping changing what the concepts or synchronizations mean.

The output must be precise enough for Phase 008 to evaluate familiarity, terminology, reuse, and genericity in the context of the actual user-facing conceptual experience, but still abstract enough to permit multiple valid downstream UI implementations.
