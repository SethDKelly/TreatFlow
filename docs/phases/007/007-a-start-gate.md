---
type: Phase Start Gate
title: 007-A — Mapping Scope, Representation Semantics, Experience Risk & Subphase Planning
description: Mandatory Phase 007 start gate for planning concept-to-experience mapping work across in-scope concepts, application actions, variants, actors, and representation concerns.
tags: [phase-007, start-gate, concept-mapping, interaction-semantics, representation, planning]
sources:
  - id: jackson-mapping
    resource: https://essenceofsoftware.com/posts/distillation/
    title: The Essence of the Essence — Concept Mapping — Daniel Jackson
  - id: jackson-tutor-mapping
    resource: https://essenceofsoftware.com/studies/larger/tutor/
    title: A GPT-powered tutor — State Queries and Concept Mapping — Daniel Jackson
---

# 007-A — Mapping Scope, Representation Semantics, Experience Risk & Subphase Planning

## Purpose

This start gate determines how Phase 007 will map the current conceptual design into user-visible interaction and representation semantics without designing implementation architecture.

It must be completed before substantive Phase 007 mapping work begins.

Phase 007 does not invent a new conceptual model because a particular interface idea is convenient. It asks how the concepts, application actions, state, synchronizations, authority, and scope already established can be made perceivable, invocable, understandable, and trustworthy to relevant users and affected parties.

## Governing contracts

Before planning the phase, review:

- [Phase 007 definition](phase-definition.md);
- [Concept Mapping & User-Visible Representation Contract](concept-mapping-contract.md);
- [Phase 007 Consolidation, Exit Review & Phase 008 Handoff Template](exit-review-template.md);
- the Phase 006 exit handoff and authoritative dependence/scope knowledge;
- current canonical concept specifications and synchronization/composition knowledge;
- repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md);
- [Design-Only Guardrails](../../methodology/design-only-guardrails.md).

## 1. Re-establish the Phase 007 boundary

Confirm that this phase maps **conceptual semantics to user-visible representation**.

Phase 007 may define obligations for:

- how concept/application state is perceived;
- how application actions are invoked or participated in;
- what feedback/results make effects intelligible;
- what terminology, labels, symbols, grouping, ordering, or other linguistic/physical distinctions are semantically required;
- what authority, disclosure, consequence, reversibility, or status information must be visible;
- how synchronized behavior is represented without obscuring participating concept meanings;
- how in-scope product/application variants differ in their mappings.

It must not select frontend frameworks, component libraries, route structures, CSS systems, view-model classes, API mechanisms, client/server architecture, or executable UI implementation.

## 2. Validate incoming conceptual authority

Review the Phase 006 handoff and confirm that mapping has an authoritative baseline for:

- current retained concepts and specifications;
- current application action surface;
- current synchronizations/composition rules;
- in-scope concept subsets/product variants;
- extrinsic dependence relationships relevant to explanation/context;
- concept-intrinsic and application-level authority constraints;
- current purpose/success knowledge relevant to user-visible behavior;
- unresolved mapping carry-forwards.

If an in-scope concept, action, synchronization, or variant is still conceptually undefined, route the defect upstream rather than inventing semantics in Phase 007.

## 3. Perform mapping coverage assessment

Every project must assess the mapping dimensions below. This is a coverage requirement, not a requirement for one document or subphase per row.

| Mapping dimension | Planning disposition |
|---|---|
| Concept/state visibility | Adequate on entry / needs work / not applicable with rationale |
| Application-action invocation | Adequate on entry / needs work / not applicable with rationale |
| Action result and semantic feedback | Adequate on entry / needs work / not applicable with rationale |
| Application-action availability/unavailability | Adequate on entry / needs work / not applicable with rationale |
| Linguistic mapping: names, labels, symbols, terminology | Adequate on entry / needs work / not applicable with rationale |
| Physical/structural representation obligations | Adequate on entry / needs work / not applicable with rationale |
| Synchronization/composed-behavior representation | Adequate on entry / needs work / not applicable with rationale |
| Authority, disclosure, consequence, and protected-action visibility | Adequate on entry / needs work / not applicable with rationale |
| Lifecycle, temporal, historical, correction/recovery visibility | Adequate on entry / needs work / not applicable with rationale |
| Variant/subset-specific mapping | Adequate on entry / needs work / not applicable with rationale |
| Accessibility/context-of-use implications | Adequate on entry / needs work / not applicable with rationale |
| Mapping ambiguity/misleading-mental-model risk | Adequate on entry / needs work / not applicable with rationale |

`Not applicable` requires rationale. Dimensions marked `needs work` become candidates for substantive Phase 007 workstreams.

## 4. Identify user and affected-party mapping perspectives

Determine whose understanding and action matters for the in-scope design.

Do not assume a single generic "user" when concepts involve materially different actors or affected parties.

Identify, where relevant:

- who invokes an application action;
- who observes its effects;
- who needs to understand current state;
- who is affected without initiating the action;
- who must understand authority or ownership boundaries;
- who requires disclosure before a consequential action;
- who needs evidence of historical/corrected/revoked state;
- whose accessibility or context-of-use needs materially affect semantic representation.

These are mapping perspectives, not implementation personas or role-based-access-control configuration.

## 5. Identify mapping-risk hotspots

Prioritize areas where representation could distort conceptual meaning.

Potential hotspots include:

- one visual/linguistic treatment being reused for conceptually different actions;
- one concept being represented as though it were another;
- state shown at a different granularity from the state users actually act upon;
- synchronized behavior appearing as if only one concept exists;
- concept actions being exposed as application actions when they were intentionally unavailable in Phase 005;
- action availability that does not match conceptual preconditions or authority;
- hidden automated behavior with consequential effects;
- ambiguous ownership, scope, target, or current-versus-historical status;
- correction, cancellation, expiration, invalidation, or supersession being visually indistinguishable from ordinary current state;
- variant-specific concepts being presented as universally available;
- terms inherited from an incumbent UI that conflict with current concept identities.

For each material hotspot, decide whether it warrants a separate mapping workstream.

## 6. Separate conceptual mapping from interface realization

Review proposed work for premature interface commitment.

Allowed examples include:

- "the actor must be able to distinguish pending from accepted state before acting";
- "the application action must make its target and consequence intelligible";
- "this state query must be represented when selecting among current items";
- "the two concepts require distinct terminology because their effects differ".

Premature implementation examples include:

- "use a modal dialog";
- "put the status in the left sidebar";
- "use a React component";
- "call endpoint X on button click";
- "store a derived view model";
- "use polling or websockets for live state".

Wireframes or sketches, if used as design evidence, must remain exploratory representations of mapping obligations rather than implementation specifications.

## 7. Determine state-query/view obligations

Jackson's mapping examples show that user-visible views can be defined by queries over concept state and may react to concept-state changes.[^jackson-tutor-mapping]

For state that must be visible, determine conceptually:

- what semantic question the user needs answered;
- which concept/application state supplies the answer;
- whether the view is direct or derived from multiple state queries;
- what contextual distinctions must remain visible;
- what stale, absent, historical, invalidated, or uncertain state means when relevant.

Do not specify caching, materialized views, client state, subscriptions, refresh protocols, or transport.

[^jackson-tutor-mapping]: Daniel Jackson, "A GPT-powered tutor," State Queries and Concept Mapping.

## 8. Determine action-mapping obligations

For application actions established in Phase 005, determine how users can conceptually discover, distinguish, invoke, or participate in them.

Review:

- initiating actor;
- target/object of action;
- conceptual availability/preconditions;
- authority or protected-action conditions;
- meaningful inputs;
- consequential effects users should understand beforehand;
- resulting state/feedback users should be able to perceive;
- reversibility/correction implications where material;
- whether automation or chaining creates effects beyond the initiating action.

Do not turn action mapping into route, form, gesture, control, endpoint, or handler specifications.

## 9. Plan variant-specific mapping work

Review in-scope subsets/variants from Phase 006.

Determine whether mappings differ because:

- concepts/actions are absent in some variants;
- the same concept is presented in a different surrounding context;
- synchronization/action-surface differences change what must be explained;
- dependence relationships affect intelligible explanation order;
- terminology or disclosure differs for a legitimate contextual reason.

Variant mappings may differ physically or linguistically while preserving the same underlying concept semantics.

If a variant requires changing concept meaning, route the issue upstream.

## 10. Plan documentation and canonical ownership

Apply the repository-wide documentation-governance contract before creating mapping artifacts.

Identify:

- canonical concept/synchronization/scope documents that Phase 007 will reference;
- the natural owner(s) for durable mapping/experience semantics;
- whether project-specific mapping knowledge belongs under a compact `canonical/experience/` family or another coherent owner;
- mapping decisions that should instead update an existing concept document because they are reusable concept-specific design knowledge;
- exploratory sketches/comparisons that should remain phase evidence;
- indexes and links likely to change;
- terminology conflicts or duplicate experience documents that must be resolved.

Do not create separate mapping documents for every screen-like idea or restate concept specifications inside experience documents.

## 11. Define project-specific Phase 007 subphases

Create only the substantive mapping workstreams required by this project.

For each proposed subphase define:

- title;
- mapping purpose;
- concepts/application actions/variants covered;
- user or affected-party perspectives covered;
- input canonical knowledge;
- mapping questions and risks;
- expected phase evidence;
- expected canonical owners affected;
- explicit exclusions;
- completion evidence;
- upstream reopen triggers;
- unresolved-item handoff.

Reserve the final project-specific subphase for Phase 007 consolidation, documentation-integrity review, exit decision, and Phase 008 handoff using the [exit-review template](exit-review-template.md).

## 12. Define exit evidence

Before substantive work begins, confirm that the final review will be able to demonstrate that:

- material concept/application state has an intelligible representation where users need it;
- material application actions can be discovered/invoked/understood by the relevant actors;
- feedback/result semantics make important effects intelligible;
- action availability does not contradict preconditions or authority;
- linguistic and physical distinctions preserve concept meaning;
- synchronized/automated behavior is not misleadingly represented;
- in-scope variants have coherent mapping coverage;
- conceptual mapping defects have not been hidden as UI implementation problems;
- canonical mapping knowledge is discoverable, non-duplicative, and OKF-conformant;
- no frontend/runtime implementation architecture has begun.

## Required output

The completed `007-A` record should end with:

1. authoritative incoming concept/composition/scope entry points;
2. completed mapping-coverage assessment;
3. actor/affected-party mapping perspectives;
4. identified mapping-risk hotspots;
5. approved project-specific Phase 007 subphase sequence;
6. decomposition rationale and dependency order;
7. canonical knowledge destinations and expected index/link changes;
8. completion evidence for each substantive workstream;
9. upstream reopen triggers;
10. planned final consolidation/exit-review subphase;
11. known mapping uncertainties/carry-forwards;
12. confirmation of implementation status.

## Gate outcome

Use one of:

- **READY TO BEGIN PHASE 007 SUBPHASES**
- **NOT READY — MAPPING PRECONDITIONS MISSING**

The start gate must not declare Phase 007 complete.

## Implementation state

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet
