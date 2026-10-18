---
type: Phase Definition
title: Phase 007 — Concept Mapping, Interaction Semantics & User-Visible Representation
description: Maps in-scope conceptual state, application actions, synchronizations, authority, and lifecycle semantics into faithful user-visible representations without prescribing UI implementation.
tags: [phase-007, concept-mapping, interaction-semantics, representation, state-visibility, application-actions, concept-design]
sources:
  - id: jackson-mapping
    resource: https://essenceofsoftware.com/posts/distillation/
    title: The Essence of the Essence — Concept Mapping — Daniel Jackson
  - id: jackson-tutor-mapping
    resource: https://essenceofsoftware.com/studies/larger/tutor/
    title: A GPT-powered tutor — State Queries and Concept Mapping — Daniel Jackson
  - id: jackson-beyond-ui
    resource: https://essenceofsoftware.com/tutorials/design-general/beyond-ui/
    title: Beyond the user interface — Daniel Jackson
---

# Phase 007 — Concept Mapping, Interaction Semantics & User-Visible Representation

## Role in the lifecycle

Phase 007 connects the completed conceptual application model to the experience through which users perceive state, discover and invoke application actions, interpret results, understand authority and consequences, and form a mental model of the software.

Jackson distinguishes conceptual design from the linguistic and physical levels of interface design. Concept mapping connects concept state/actions to those representational levels: actions may ultimately be realized through controls or gestures, while views may present or derive information from concept state.[^jackson-mapping]

Phase 007 performs that mapping as **design semantics**, not as frontend implementation.

[^jackson-mapping]: Daniel Jackson, "The Essence of the Essence," Concept Mapping and Levels of Design.

## Methodological intention

Ensure that the in-scope concepts, application action surface, synchronizations, state distinctions, authority rules, lifecycle/history semantics, and product variants can be represented so relevant users and affected parties can understand and act through the conceptual model without the representation changing what that model means.

A good mapping should make concept semantics intelligible while leaving multiple valid downstream physical/interface realizations possible.

## Relationship to Phase 003

Phase 003 defines concept state and actions independently of interface representation.

Phase 007 determines which state questions users need answered and how concept/application behavior must be represented to support correct understanding and action.

If mapping reveals that behavior or state semantics are actually undefined, reopen Phase 003 instead of inventing the missing semantics in an interface description.

## Relationship to Phase 005

Phase 005 defines the conceptual application action surface and synchronization/automation semantics.

Phase 007 maps those application actions into user-visible interaction obligations. It must not expose concept-valid actions that Phase 005 intentionally omitted, nor hide material synchronized consequences in ways that create a false mental model.

If the required user-visible behavior is absent from the current application composition, reopen Phase 005.

## Relationship to Phase 006

Phase 006 identifies the in-scope concept subsets/product variants and their contextual dependencies.

Phase 007 maps only the variants actually in scope, while preserving concept semantics across variants. Dependence may inform explanation/context but must not automatically dictate screens, navigation, or interaction sequence.

If a mapping assumes a concept or action that is not present in the relevant variant, correct the mapping or reopen Phase 006/005 as appropriate.

## Relationship to Phase 008

Phase 007 must already correct terminology or representations that are materially misleading.

Phase 008 later performs the broader familiarity/reuse/genericity audit after the user-visible conceptual experience is known. It may refine names or concepts further, but known mapping-integrity defects must not be deferred merely because familiarity is reviewed later.

## Relationship to Phase 009 and Phase 010

Phase 007 rejects obvious mapping contradictions now.

Phase 009 later performs a system-wide integrity audit after familiarity/refinement may alter the design, and Phase 010 exercises the mature design against difficult scenarios and misfits.

Known state/action/authority representation defects are not legitimate carry-forwards simply because later validation phases exist.

## Governing Phase 007 support contracts

Phase 007 is further governed by:

- [007-A — Mapping Scope, Representation Semantics, Experience Risk & Subphase Planning](007-a-start-gate.md);
- [Concept Mapping & User-Visible Representation Contract](concept-mapping-contract.md);
- [Phase 007 Consolidation, Exit Review & Phase 008 Handoff Template](exit-review-template.md);
- repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md);
- [Design-Only Guardrails](../../methodology/design-only-guardrails.md).

These establish required semantic/documentation coverage without prescribing a fixed UI artifact set, notation, wireframe set, platform, or B–X subphase sequence.

## Conceptual, linguistic, and physical levels

Jackson separates software design into three levels:[^jackson-mapping]

- **conceptual** — state, actions, effects, interpretation, and underlying user-facing semantics;
- **linguistic** — labels, names, terminology, icons, symbols, and other learned/cultural signals;
- **physical** — layout, form, perceptual structure, and interaction presentation.

Phase 007 connects these levels but must keep their responsibilities clear.

A linguistic or physical design choice may be constrained when needed to preserve conceptual meaning. It must not become a backdoor for rewriting the concept model.

## Primary design questions

Phase 007 should answer, as relevant:

- What concept/application state must users or affected parties perceive to understand current behavior or make sound decisions?
- What semantic questions should user-visible views answer?
- How can each material application action be discovered, distinguished, invoked, or participated in conceptually?
- Does action availability match current preconditions, lifecycle state, authority, and variant scope?
- What consequences must users understand before consequential actions?
- What result/state change must be perceptible afterward?
- What terminology, labels, symbols, or distinctions accurately communicate each concept and application action?
- What physical/structural separation, grouping, comparison, ordering, or prominence is required to preserve meaning?
- How should synchronized or automated behavior be represented without falsely attributing effects or exposing irrelevant internal composition?
- What authority, ownership, target, scope, disclosure, reversibility, correction, historical, or finality information must be visible?
- How do mappings differ across in-scope variants while preserving the same concept semantics?
- What accessibility/context-of-use requirements are necessary for conceptual distinctions to remain perceivable and actionable?
- Does any proposed representation create a misleading mental model or reveal an upstream design defect?

## Required mapping coverage

Every Phase 007 exit must establish or explicitly disposition:

- concept/application-state visibility;
- application-action invocation and availability;
- meaningful feedback/result visibility;
- linguistic/terminology mapping;
- semantically necessary physical/structural mapping constraints;
- synchronization/automation representation;
- authority/disclosure/consequence visibility;
- temporal/lifecycle/history/correction representation;
- in-scope variant mapping;
- accessibility/context-of-use semantic obligations;
- misleading-mental-model and mapping-integrity risks;
- upstream defects revealed by mapping;
- documentation/index/reference coherence for current mapping knowledge.

This is a semantic coverage requirement, not a required screen count, wireframe count, navigation tree, mapping matrix, or interface notation.

## State and view mapping

Jackson's case studies show user-interface views defined from queries over concept state, potentially reacting to state changes.[^jackson-tutor]

Phase 007 may therefore describe user-visible views in terms of semantic queries and derived interpretations.

For each material state mapping, identify:

- what user question the mapping answers;
- which authoritative concept/application state supplies the answer;
- whose perspective/context matters;
- which distinctions must remain visible;
- whether the mapping is direct, filtered, derived, aggregated, or composed from multiple concept queries;
- what historical, absent, invalidated, uncertain, or stale state means where relevant.

A derived view must not become a competing conceptual source of truth.

[^jackson-tutor]: Daniel Jackson, "A GPT-powered tutor," State Queries and Concept Mapping.

## Application-action mapping

The action-mapping surface is the **application action surface established in Phase 005**, not an arbitrary union of concept actions.

For each material action, mapping should preserve:

- action identity;
- actor/participant;
- target or scope;
- semantic inputs;
- conceptual availability/preconditions;
- authority conditions;
- important consequences;
- result/feedback semantics;
- correction/reversal/recovery implications where material.

Whether the action is eventually invoked by a button, gesture, command, voice, developer API, or other mechanism is downstream physical/interface realization unless a particular representational constraint is essential to meaning.

## Mapping integrity

Jackson emphasizes that superficially similar UI controls may implement very different concepts and therefore carry different user expectations.[^jackson-beyond-ui]

A Phase 007 mapping is defective when it makes the representation imply semantics that the conceptual model does not provide.

Examples include:

- different concepts appearing equivalent despite materially different effects;
- one concept appearing to own synchronized behavior incorrectly;
- state needed to predict an action being hidden;
- derived or aggregated state being presented as though it were the underlying concept object where the distinction matters;
- representation implying authority, ownership, finality, reversibility, or scope that is not real;
- intentionally unavailable actions appearing available;
- semantically distinct lifecycle/history states being flattened in a way that changes user decisions.

[^jackson-beyond-ui]: Daniel Jackson, "Beyond the user interface."

## Linguistic discipline

Names, labels, terminology, symbols, and explanatory language must support the current concept model rather than preserve obsolete product language.

Phase 007 should correct terminology that:

- conflates different concepts;
- fragments one concept without reason;
- imports familiar expectations the behavior does not fulfill;
- hides target, scope, authority, or consequence;
- still reflects a concept identity superseded in Phase 004;
- makes composed behavior appear intrinsic to one concept when that would mislead users.

Broader familiarity/reuse questions may be handed to Phase 008 only after known semantic mislabeling is corrected.

## Physical/structural discipline

Phase 007 may establish physical/structural representation constraints only when they are needed for semantic comprehension or safe/meaningful action.

For example, the design may require conceptually distinct actions to be distinguishable, current/history states not to be conflated, consequential target/scope to be visible before commitment, or relevant states to be comparable before selection.

It must not prescribe exact pixel layout, component hierarchy, route structure, CSS, design tokens, frontend state architecture, or other implementation details.

## Synchronization and automation mapping

A single application action may coordinate several concept actions.

Phase 007 may present that behavior as one coherent user action while still requiring visibility of material secondary effects, automation, authority implications, or correction paths.

Expose composition detail when hiding it would mislead; do not expose it merely because the synchronization model contains it.

## Authority, disclosure, lifecycle, and history

Where concepts/application behavior carry material authority, consequence, lifecycle, correction, or historical semantics, mapping must determine what users need to perceive to understand and act correctly.

Examples include:

- current actor authority;
- affected target/scope;
- delegation/revocation status;
- pending versus final state;
- current versus historical state;
- valid versus invalidated/corrected/superseded state;
- reversible versus irreversible consequence.

These are semantic representation obligations, not authentication or authorization implementation design.

## Variant discipline

Mappings may legitimately differ across Phase 006 product/application variants because surrounding concepts or application actions differ.

However:

- a concept must preserve its intrinsic meaning across variants;
- omitted concepts/actions must not remain represented as available;
- variant-specific composition must match Phase 005 authority;
- mapping differences must not silently create different concept definitions;
- explanation-order implications from concept dependence should not be mechanically converted into screen or navigation order.

## Accessibility and context-of-use discipline

When a representation choice determines whether a user can perceive a conceptual distinction or reliably invoke an action, accessibility is part of mapping quality rather than optional visual polish.

Phase 007 should identify semantic obligations that must survive across relevant modes of perception and interaction while leaving platform-specific implementation to downstream work.

## Upstream reopen discipline

Mapping frequently exposes earlier design flaws because a concept that is difficult to represent may be vague, overloaded, inconsistently composed, or incorrectly scoped.

When representation requires new semantics, determine whether to reopen:

- Phase 003 — undefined concept behavior/state/action;
- Phase 004 — concept-boundary or independence defect;
- Phase 005 — missing/invalid application action or synchronization;
- Phase 006 — incorrect variant/scope/dependence assumption;
- Phase 001/002 — deeper purpose or concept-discovery issue.

Do not "solve" the defect with UI behavior that has no conceptual owner.

## Expected durable outputs

By exit, current canonical knowledge should make discoverable, where applicable:

- state/view mapping obligations;
- application-action invocation/availability semantics;
- result/feedback obligations;
- terminology and linguistic distinctions;
- semantically necessary physical/structural constraints;
- synchronization/automation representation obligations;
- authority/disclosure/consequence mappings;
- temporal/history/correction visibility;
- variant-specific mapping differences;
- accessibility/context-of-use semantic requirements;
- explicit non-blocking familiarity/integrity/misfit questions for later phases.

Detailed wireframe experiments, screenshots, rejected mappings, alternative layouts, and exploratory UX narratives belong primarily in phase records unless they establish durable semantic knowledge.

## Documentation and knowledge authority

Phase 007 is vulnerable to duplication because mapping semantics can be repeated in concept files, synchronization documents, diagrams, wireframes, UX narratives, and experience matrices.

Therefore:

- give each durable mapping rule one natural canonical owner;
- link to concept/synchronization/scope owners instead of copying their semantics;
- add only the additional experience/mapping meaning owned by Phase 007;
- update an existing concept owner when a mapping insight is reusable concept-specific knowledge rather than product-specific representation;
- keep exploratory visual material and rejected mappings as phase evidence;
- do not let screenshots or wireframes substitute for precise current semantic statements;
- use meaningful graph links among mapping knowledge, concepts, application actions, purposes, and variants;
- update indexes and terminology when current mapping knowledge changes;
- consolidate duplicate mapping summaries before exit;
- apply the repository-wide OKF/documentation-governance audit.

## Explicit exclusions

Phase 007 must not:

- select frontend frameworks or component libraries;
- define component hierarchies, route trees, navigation code, or CSS implementation;
- define design-system implementation tokens;
- choose client-side state stores or view-model architecture;
- bind actions to APIs/endpoints/messages/transports;
- choose polling, websocket, subscription, refresh, caching, or materialization mechanisms;
- choose native versus web/client implementation technology;
- treat a wireframe as executable/interface architecture;
- create source scaffolding, automated UI tests, implementation prototypes, or application code.

## Entry criteria

Phase 007 may begin only when:

- Phase 006 has passed or passed with explicitly non-blocking mapping/reuse/integrity carry-forwards;
- the current concept set and specifications are discoverable;
- the current application action surface and synchronizations are discoverable;
- in-scope variants/subsets are explicit;
- material dependence/explanation implications are known;
- `007-A` can define a responsible mapping plan without inventing missing upstream semantics.

If the application model is too ambiguous to map, repair it upstream rather than guessing in Phase 007.

## Exit criteria

Phase 007 may exit only when its final project-specific exit review establishes that:

- material state users need to understand has faithful mapping obligations;
- material application actions have intelligible invocation, availability, consequence, and feedback semantics;
- linguistic/physical distinctions preserve concept meaning;
- synchronized and automated effects are represented without misleading attribution or hidden material consequence;
- authority, target, scope, lifecycle, history, correction, and finality distinctions are visible where required;
- in-scope variants are mapped coherently without changing concept semantics;
- accessibility/context-of-use needs that affect conceptual understanding have been addressed;
- known mapping-integrity defects have been corrected;
- mapping-exposed upstream defects have been repaired in their natural owners rather than hidden in presentation;
- current mapping knowledge has coherent canonical ownership, indexes, references, terminology, and OKF structure;
- no frontend/runtime implementation architecture has entered design authority;
- Phase 008 can evaluate familiarity, reuse, terminology, and genericity against the actual user-visible conceptual experience.

## Control structure

Phase 007 begins with:

- [007-A — Mapping Scope, Representation Semantics, Experience Risk & Subphase Planning](007-a-start-gate.md).

`007-A` derives only the project-specific substantive mapping workstreams required by the in-scope conceptual application.

The final project-specific subphase performs Phase 007 consolidation, documentation-integrity audit, exit review, and Phase 008 handoff using the [Phase 007 exit-review template](exit-review-template.md).

The template does not prescribe the count or letters between those control points.

## Exit outcomes

Use the repository-wide outcomes:

- **PASS** — Phase 007 establishes faithful, intelligible mappings and Phase 008 may begin.
- **PASS WITH CARRY-FORWARD** — mapping is sound while explicit non-blocking familiarity/integrity/misfit questions continue with named destinations.
- **NOT READY TO EXIT** — material mapping, action/state visibility, terminology, authority, variant, accessibility, documentation, upstream-semantic, or implementation-contamination problems require more work or reopening an earlier phase.

## Implementation state

Throughout Phase 007, including after successful exit:

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet

The only authorized handoff is into Phase 008 familiarity/reuse/genericity refinement.
