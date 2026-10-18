---
type: Familiarity and Reuse Contract
title: Phase 008 Familiarity, Reuse, Genericity & Concept-Catalog Contract
description: Defines how Phase 008 evaluates conceptual familiarity, design-knowledge reuse, broader genericity, justified novelty, terminology, and reusable concept knowledge without importing implementation reuse.
tags: [phase-008, familiarity, reuse, genericity, novelty, concept-catalog]
sources:
  - id: jackson-distillation-familiarity
    resource: https://essenceofsoftware.com/posts/distillation/
    title: The Essence of the Essence — Concept Reuse and Familiarity — Daniel Jackson
  - id: jackson-upvote-catalog
    resource: https://essenceofsoftware.com/studies/small/upvote/
    title: Upvote — An Example Concept — Daniel Jackson
  - id: jackson-criteria
    resource: https://essenceofsoftware.com/tutorials/concept-basics/criteria/
    title: Concept criteria — Daniel Jackson
---

# Phase 008 Familiarity, Reuse, Genericity & Concept-Catalog Contract

## Purpose

Phase 008 asks whether the mature concept system is using the accumulated vocabulary and design knowledge of software well, or whether it has introduced avoidable novelty, unnecessary application-specificity, misleading familiar terminology, or missed opportunities for reusable conceptual knowledge.

The phase is deliberately late. Familiarity is difficult to judge from names alone; the project now has enough purpose, behavior, composition, scope, and mapping context to compare concepts by what they actually mean and how users encounter them.

## Familiarity principle

Jackson argues that reusable concepts provide two kinds of value:

- users can transfer understanding from prior encounters with the same concept; and
- designers can reuse accumulated design knowledge even when code is not reused.

Phase 008 therefore prefers an established concept when the **same meaningful purpose and substantially compatible behavior** recur.

Familiarity is semantic, not cosmetic.

A concept is not made familiar merely by:

- giving it a conventional name;
- using a familiar icon/control;
- copying an incumbent workflow;
- matching a competitor's feature label;
- adopting a common technical term;
- resembling another concept superficially.

## Familiarity fitness test

For a proposed familiar substitute or precedent, compare at least:

- **Purpose** — does it solve substantially the same human/domain problem?
- **Operational principle** — is the archetypal behavioral story compatible?
- **State semantics** — are the remembered distinctions materially compatible?
- **Actions and effects** — would users expect substantially the same operations and consequences?
- **Invariants/lifecycle/history** — do important constraints and temporal semantics match?
- **Authority** — are permissions/responsibilities compatible at the conceptual level?
- **Mapping expectations** — would transferred user expectations be mostly correct?
- **Composition role** — would known synchronizations or application actions remain semantically sensible?

A mismatch on a high-consequence dimension can justify retaining a novel concept even when names or surface behavior are similar.

## False familiarity

False familiarity occurs when a design intentionally or accidentally invokes an established concept while violating the expectations that make that concept useful.

Examples include:

- calling an action `delete` when the object remains active or recoverability semantics differ materially;
- using `owner` where the actor lacks the control normally implied by ownership;
- using `follow`, `subscribe`, `approve`, or `archive` for materially different behavior;
- representing a temporary delegation as if it were permanent membership;
- using a familiar concept name while silently changing revocation, visibility, history, or authority rules.

False familiarity can be worse than explicit novelty because it causes users to transfer the wrong mental model.

When semantic mismatch is material, prefer:

- correcting the concept to the familiar semantics;
- using a different established concept;
- making the distinction explicit through a genuinely novel concept/name;
- reopening earlier design where the mismatch exposes a deeper flaw.

Do not preserve misleading terminology merely because users already know the word.

## Conceptual reuse versus implementation reuse

Conceptual reuse means reusing a purpose/behavior pattern and its accumulated design lessons.

It does **not** require:

- shared source code;
- a common library/package;
- a shared service;
- a common database;
- a vendor/platform capability;
- a framework component;
- a copied implementation.

Conversely, two products can reuse the same implementation mechanism while embodying different concepts.

Implementation reuse decisions remain outside Base's concept-design lifecycle.

## Reuse quality

A reused familiar concept should preserve the semantics that make it recognizable.

Project-specific configuration or synchronization is allowed where it does not alter the concept's intrinsic promise.

If adaptation requires materially changing purpose, operational principle, state, actions, invariants, lifecycle, or authority, treat the result as a potentially different concept rather than claiming familiarity by lineage.

## Genericity in Phase 008

Phase 004 already required genericity necessary for independence.

Phase 008 evaluates **broader reuse-oriented genericity**: whether a concept that is already sound and independent can represent the same purpose across more domains or applications by removing incidental specificity.

Potential improvements include:

- replacing a product-specific target type with a meaningful generic parameter;
- replacing domain-specific terminology when the behavior is truly domain-independent;
- combining duplicate concept variants that differ only in incidental target vocabulary;
- separating configuration from intrinsic semantics;
- identifying a more general purpose statement that remains specific and evaluable.

Genericity must not dilute the concept.

Reject a proposed generalization when it:

- makes the purpose too vague;
- removes domain semantics that actually affect behavior;
- combines concepts with different operational principles;
- hides meaningful authority/lifecycle differences;
- makes the concept harder for users to understand;
- exists mainly to create an elegant taxonomy.

## Reuse versus over-generalization

A concept catalog should contain reusable design knowledge, not abstractions optimized for maximum theoretical coverage.

A narrower familiar concept may be better than a highly generic concept when:

- the narrower concept has a stronger user mental model;
- domain semantics materially shape behavior;
- the generalized name becomes vague;
- expected synchronization patterns differ meaningfully;
- the broader abstraction obscures consequences or authority.

Prefer the broadest concept that remains semantically coherent, purposive, and understandable—not the broadest type that can be written.

## Concept-catalog refinement

Jackson describes concept catalogs as repositories of concept definitions plus accumulated design experience.

Phase 008 may therefore identify reusable knowledge that could serve future designs, such as:

- concept purpose and operational principle;
- abstract state/action/invariant specification;
- generic parameters;
- common configuration choices;
- common synchronization/dependence relationships;
- mapping/terminology lessons;
- recurring misfits and integrity traps;
- security/safety/authority cautions at the conceptual level;
- provenance and examples of use.

The Base repository does not require a global catalog implementation.

A cloned project should preserve reusable knowledge in the **natural canonical owner** whenever possible and use references to indicate broader applicability. Create a separate catalog-oriented document only when it represents genuinely distinct reusable knowledge rather than a copy of the project concept specification.

## Catalog candidate statuses

Where a project wants explicit catalog tracking, use lightweight qualitative dispositions such as:

- **Project-specific** — current evidence does not justify broader reuse;
- **Reusable candidate** — semantics appear transferable but need more evidence;
- **Reusable with constraints** — reuse is valid only under explicit semantic conditions;
- **Mature reusable concept** — concept and lessons are stable enough to serve as a strong precedent;
- **Rejected as catalog candidate** — apparent generality was misleading or too context-specific.

Equivalent wording is acceptable. Do not create a pseudo-maturity score merely to appear rigorous.

## Familiarity evidence

Familiarity claims should be supported by meaningful comparison evidence.

Useful evidence may include:

- documented concept definitions/case studies;
- repeated use across independent products;
- domain standards or established user expectations;
- authoritative design literature;
- project history showing the same concept already used consistently;
- empirical user evidence when available.

Popularity alone is insufficient.

A widespread concept can still be a poor fit for the current purpose.

## Novelty justification

Novel concepts are legitimate.

Retain novelty when the project can explain what meaningful purpose or behavioral distinction the familiar alternatives fail to serve.

A useful retained-novelty justification should identify:

- familiar alternatives considered;
- the important semantic mismatch in each;
- the distinct purpose/behavior that requires novelty;
- likely user mental-model burden introduced by novelty;
- mapping/terminology obligations needed to make the new concept understandable;
- later integrity/misfit risks worth carrying forward.

Do not justify novelty merely by saying the product is unique.

## Terminology and naming

Names should help users and designers recognize the concept without importing false expectations.

Phase 008 may refine terminology when:

- a more established name accurately matches current semantics;
- current terminology is unnecessarily application-specific;
- two names describe the same reusable concept;
- one familiar term is misleading because behavior differs;
- earlier concept identity changes left stale vocabulary.

Naming changes that imply substantive semantic change must trigger corresponding concept-specification review; they are not cosmetic refactors.

## Substitution/refinement propagation

Any adopted Phase 008 change must propagate to the natural owners it affects.

Possible consequences include:

- concept specification changes in Phase 003 knowledge;
- modularity/genericity reassessment in Phase 004;
- synchronization/application-action updates in Phase 005;
- dependence/subset/scope updates in Phase 006;
- terminology/mapping updates in Phase 007;
- purpose traceability updates where concept identity changes.

Use explicit phase reopening when the change is substantial.

Phase 008 records why the refinement was made; it must not become a shadow copy of all updated canonical semantics.

## Relationship to Phase 009 integrity

Phase 008 must repair obvious semantic breakage introduced by its own refinements before exit.

Phase 009 then performs the broader whole-system integrity audit after familiarity/reuse changes have settled.

Appropriate Phase 009 carry-forwards include subtle cross-concept interference risks that genuinely require system-wide context.

Do not knowingly pass forward a concept whose substituted/generalized semantics are already inconsistent with its purpose, synchronization, scope, or mapping.

## Counterexample discipline

Challenge each proposed familiarity/reuse improvement with questions such as:

- Would a user familiar with the precedent predict this concept correctly?
- What important expectation would transfer incorrectly?
- Does the candidate familiar concept actually fulfill the same purpose?
- Are we reusing semantics, or merely a name and UI convention?
- What project-specific state/action/lifecycle rule prevents genuine reuse?
- Could that rule be configuration rather than intrinsic behavior?
- Does generalization preserve an understandable purpose?
- Are two apparently reusable concepts actually distinct because authority or finality differs?
- Would retaining a novel concept produce less confusion than imperfect familiarity?

## Expected durable outputs

By Phase 008 exit, current canonical knowledge should make discoverable, where applicable:

- refined concept identities/names;
- adopted familiar concept substitutions;
- broader generic parameters/generalizations;
- constraints on reuse where semantics are context-sensitive;
- retained novelty with concise justification;
- reusable concept/design-knowledge candidates worth future reference;
- updated mappings/synchronizations/dependencies affected by refinement;
- explicit integrity questions for Phase 009.

Detailed comparisons, rejected precedents, alternative taxonomies, and catalog experiments belong primarily in phase records.

## Documentation and OKF discipline

Phase 008 is vulnerable to duplicate "catalog" knowledge.

Therefore:

- keep one natural canonical owner for the current concept specification;
- link familiar precedents/comparison sources rather than reproducing them;
- do not create project and catalog copies of identical current semantics;
- record only genuinely reusable additional knowledge separately;
- keep rejected precedents and generalization experiments in phase history;
- update indexes and graph links after concept renames/substitutions;
- remove stale terminology from current canonical entry points;
- make reusable-candidate status explicit where used;
- avoid creating a universal concept taxonomy that current evidence does not support;
- apply the repository-wide documentation-integrity audit before exit.

## Completion condition

Phase 008 has done enough when the project can explain:

- which concepts intentionally reuse familiar design ideas;
- which remain novel and why;
- which have been generalized for broader conceptual reuse;
- what familiar expectations users may safely transfer;
- what reusable design knowledge should be preserved;
- how adopted refinements were propagated so Phase 009 receives one coherent current design.
