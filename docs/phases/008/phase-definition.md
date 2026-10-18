---
type: Phase Definition
title: Phase 008 — Familiarity, Reuse, Genericity & Concept-Catalog Refinement
description: Audits the mature mapped concept system for unnecessary conceptual novelty, missed familiarity/reuse, broader genericity opportunities, misleading familiarity, and reusable design knowledge before whole-system integrity review.
tags: [phase-008, familiarity, reuse, genericity, concept-catalog, terminology, concept-design]
sources:
  - id: jackson-familiarity
    resource: https://essenceofsoftware.com/posts/distillation/
    title: The Essence of the Essence — Concept Reuse and Familiarity — Daniel Jackson
  - id: jackson-upvote-catalog
    resource: https://essenceofsoftware.com/studies/small/upvote/
    title: Upvote — An Example Concept — Daniel Jackson
  - id: jackson-criteria
    resource: https://essenceofsoftware.com/tutorials/concept-basics/criteria/
    title: Concept criteria — Daniel Jackson
---

# Phase 008 — Familiarity, Reuse, Genericity & Concept-Catalog Refinement

## Role in the lifecycle

Phase 008 performs a deliberate **design-knowledge audit** after the concept system has been specified, factored, composed, scoped, and mapped.

At this point the project knows not only concept names but their purposes, behavior, composition roles, product variants, and user-visible mappings. That makes it possible to ask whether the design is reinventing familiar concepts, using familiar language for unfamiliar semantics, remaining unnecessarily application-specific, or failing to preserve reusable design knowledge.

Phase 008 may revise the design, but every adopted revision must be propagated back into the canonical owners of the affected semantics before the phase exits.

## Methodological intention

Jackson emphasizes that familiar concepts help users transfer understanding between applications and help designers reuse accumulated design experience even when implementation code is not reused.[^jackson-familiarity]

Phase 008 therefore prefers familiar, reusable concepts **when the same purpose and materially compatible behavior recur**, challenges incidental application-specificity, and justifies novelty where established concepts would import the wrong semantics.

[^jackson-familiarity]: Daniel Jackson, "The Essence of the Essence," Concept Reuse and Familiarity.

Familiarity is not a requirement to make every design conventional. A novel concept is preferable to a familiar-looking concept that causes users to transfer incorrect expectations.

## Relationship to Phase 004

Genericity appears in both Phase 004 and Phase 008 for different reasons.

Phase 004 resolves genericity required for **correct factoring and independence**. If a concept should use a generic parameter instead of depending intrinsically on another application concept, that defect must be corrected there.

Phase 008 asks the broader reuse question: can an already sound independent concept be generalized further so the same purpose/behavior can be recognized and reused across more applications or domains?

Phase 008 must not postpone a known independence problem under the label of later reuse refinement.

## Relationship to Phase 007

Phase 007 must already correct mappings or terms that are materially misleading relative to the current concept semantics.

Phase 008 asks a broader question: does the terminology and conceptual experience align with an established concept users may already understand, or would familiar terminology falsely import expectations from a different concept?

If Phase 008 changes concept identity or terminology, affected Phase 007 mapping knowledge must be updated before exit.

## Relationship to Phase 009

Phase 008 may alter concept identity, genericity, terminology, synchronization fit, dependence relationships, or mappings.

It must correct **obvious breakage caused by its own refinements** before exit.

Phase 009 then performs the broader whole-system integrity/interference audit after Phase 008 changes have settled. Subtle interference risks may be handed forward; known contradictions may not.

## Governing Phase 008 support contracts

Phase 008 is further governed by:

- [008-A — Familiarity Baseline, Reuse Opportunities, Genericity Scope & Subphase Planning](008-a-start-gate.md);
- [Familiarity, Reuse, Genericity & Concept-Catalog Contract](familiarity-reuse-contract.md);
- [Phase 008 Consolidation, Exit Review & Phase 009 Handoff Template](exit-review-template.md);
- repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md);
- [Design-Only Guardrails](../../methodology/design-only-guardrails.md).

These establish semantic/documentation obligations without requiring a global concept catalog, fixed familiarity score, mandatory precedent count, or predetermined B–X subphase sequence.

## Primary design questions

Phase 008 should answer, as relevant:

- Does an established/familiar concept already fulfill substantially the same purpose with compatible behavior?
- Would users transfer correct or incorrect expectations from that familiar concept?
- Are current names invoking a familiar concept whose semantics differ materially?
- Are any current concepts application-specific variants of a more reusable concept?
- Can broader genericity remove incidental target/domain specificity without weakening purpose clarity?
- Are duplicated concepts really one reusable parameterized concept?
- Where does domain-specific behavior genuinely justify a distinct concept?
- Which concepts remain novel, and what semantic need makes that novelty necessary?
- What reusable design knowledge has accumulated around current concepts?
- Which concepts are reasonable catalog/reuse candidates, and under what constraints?
- Do adopted familiarity/generalization changes require reopening earlier phases?
- Has the current terminology and knowledge graph been reconciled after refinement?

## Required familiarity/reuse coverage

Every Phase 008 exit must establish or explicitly disposition:

- plausible familiarity/reuse opportunities for materially important concepts;
- semantic fit of adopted familiar concepts;
- false-familiarity risk;
- broader reuse-oriented genericity opportunities;
- retained novelty and justification;
- terminology/naming implications;
- reusable/catalog-knowledge candidates where warranted;
- propagation of adopted refinements to affected canonical owners;
- obvious integrity breakage caused by refinements;
- documentation/index/supersession coherence after changes.

This is a semantic coverage requirement, not a required concept-catalog size, comparison matrix, or number of familiar precedents.

## Familiarity discipline

A familiar concept is valuable because prior understanding transfers.

Therefore the relevant question is not:

> Does this concept look or sound familiar?

but:

> Would someone who understands the familiar precedent bring mostly correct expectations about this concept's purpose and behavior?

Compare purpose, operational principle, state, actions, important invariants/lifecycle/history, authority, mapping expectations, and composition role where material.

A familiar name attached to incompatible semantics is **false familiarity** and should be corrected.

## Reuse discipline

Conceptual reuse means reuse of a user-facing behavioral idea and accumulated design knowledge.

It is independent of source-code reuse.

A concept may be reused while implemented differently, and implementation mechanisms may be reused while supporting different concepts.

Phase 008 must therefore not make framework, service, library, package, vendor, platform, or database reuse decisions.

## Broader genericity discipline

Phase 008 may generalize an already valid concept when application/domain-specific details are incidental to its purpose and behavior.

Useful moves may include:

- replacing unnecessary product-specific target types with generic parameters;
- recognizing duplicate concept variants as one parameterized concept;
- separating configuration from intrinsic behavior;
- removing product-specific terminology from a truly domain-independent concept;
- identifying a broader purpose that remains specific, evaluable, and user-comprehensible.

Reject generalization that obscures meaningful domain semantics, authority, lifecycle, mental model, or purpose.

The goal is reusable conceptual clarity, not maximum abstraction.

## False familiarity discipline

Phase 008 must actively look for concepts whose names or mappings encourage a user to assume semantics the design does not actually provide.

Potential dimensions include:

- ownership/control;
- finality/reversibility;
- deletion/retention;
- visibility/disclosure;
- authority/delegation;
- lifecycle/expiration;
- action effect;
- historical/correction behavior;
- target/scope;
- synchronization/automation consequences.

If the familiar expectation is desirable, the design may be changed to satisfy it. If not, the concept should be named/mapped distinctly enough to prevent false transfer.

## Novelty discipline

Novel concepts are allowed and sometimes necessary.

A retained novel concept should have a concise justification that identifies:

- plausible familiar alternatives considered;
- why their semantics do not fit;
- the distinct purpose/behavior requiring novelty;
- expected mental-model/learning burden;
- mapping/terminology obligations that make the novel concept understandable;
- integrity/misfit risks worth tracking later.

Novelty is not justified merely by product differentiation or branding.

## Concept-catalog discipline

Jackson proposes concept catalogs as repositories of reusable concept definitions and accumulated design wisdom.[^jackson-catalog]

[^jackson-catalog]: Daniel Jackson, "Upvote: An Example Concept."

Phase 008 may identify concepts as reusable candidates and preserve lessons such as:

- purpose/operational principle;
- abstract state/actions/invariants;
- generic parameters;
- common synchronizations/dependencies;
- terminology/mapping cautions;
- recurring integrity/misfit traps;
- conceptual authority/safety concerns;
- provenance and examples.

The Base lifecycle does not require building a universal catalog.

Do not duplicate the current concept specification merely to create a catalog artifact. Prefer one natural canonical owner plus links or genuinely additional reusable knowledge.

## Refinement propagation

Any adopted Phase 008 change must be reflected in the semantic owners it changes.

Depending on the change, this may require updating or reopening:

- Phase 001 purpose traceability;
- Phase 003 behavioral specification;
- Phase 004 modularity/genericity analysis;
- Phase 005 synchronization/application actions;
- Phase 006 dependence/subset/scope knowledge;
- Phase 007 mapping/terminology/experience semantics.

Phase 008 records the comparison and rationale. It must not become a shadow source of all resulting design truth.

## Counterexample discipline

Phase 008 should try to disprove proposed familiarity and generalization claims.

Useful probes include:

- Would prior users predict this behavior correctly?
- Which familiar expectation would be wrong?
- Is the purpose actually the same or merely adjacent?
- Does lifecycle or authority differ materially?
- Are we reusing a concept or just its name/interface metaphor?
- Does generalization preserve a clear operational principle?
- Could project-specific behavior be configuration instead of intrinsic semantics?
- Would explicit novelty create less confusion than imperfect familiarity?
- Is a supposed catalog concept supported by multiple contexts or merely one project abstraction?

## Expected durable outputs

By exit, current canonical knowledge should make discoverable, where applicable:

- the refined current concept set;
- adopted familiar/reused concepts;
- retained novel concepts with concise justification;
- broader generic parameters/generalizations;
- terminology/naming changes;
- constraints on reuse where context matters;
- reusable/catalog candidates and lessons worth future reference;
- propagated synchronization/dependence/mapping changes caused by refinement;
- explicit subtle integrity questions for Phase 009.

Detailed precedent comparisons, rejected substitutions, alternative generalizations, and speculative catalog taxonomies belong primarily in phase records.

## Documentation and knowledge authority

Phase 008 is particularly vulnerable to duplicate truth because catalog-oriented work can create parallel copies of concept specifications.

Therefore:

- keep one natural canonical owner for each current concept;
- link to familiar precedents and sources rather than copying them;
- separate reusable supplemental knowledge only when it adds distinct meaning;
- keep rejected precedents/generalization experiments in phase history;
- update terminology, indexes, and graph links after substitutions/renames;
- make reusable-candidate status explicit where used;
- do not expose both pre- and post-refinement concepts as current;
- avoid universal taxonomies unsupported by evidence;
- apply the repository-wide OKF/documentation-governance audit before exit.

## Explicit exclusions

Phase 008 must not:

- select or standardize code libraries/packages;
- choose frameworks, vendors, platforms, or shared services;
- define reusable implementation modules;
- establish shared database/storage architecture;
- standardize UI component libraries or design-system implementation;
- create implementation templates/generators;
- treat popularity or competitor prevalence as sufficient familiarity evidence;
- generalize concepts solely for taxonomic elegance;
- create a duplicate project-specific and catalog-specific specification for the same current concept;
- defer known semantic mismatch merely because Phase 009 performs integrity review.

## Entry criteria

Phase 008 may begin only when:

- Phase 007 has passed or passed with explicitly non-blocking familiarity/integrity/misfit carry-forwards;
- current concept specifications are discoverable;
- current synchronization, dependence/scope, and mapping knowledge is discoverable;
- in-scope variants are explicit;
- terminology and mappings are stable enough to judge familiarity against actual semantics;
- `008-A` can define a responsible familiarity/reuse audit plan.

If the current concept system is too unstable to compare meaningfully, repair it upstream rather than performing superficial familiarity review.

## Exit criteria

Phase 008 may exit only when its final project-specific exit review establishes that:

- materially important familiarity/reuse opportunities have been deliberately considered;
- adopted familiar concepts are semantically compatible, not merely similarly named;
- known false familiarity has been corrected;
- broader genericity opportunities have been evaluated without weakening purpose or semantics;
- retained novelty is explicitly justified where familiar alternatives plausibly exist;
- reusable/catalog knowledge has been preserved without duplicating current truth;
- adopted substitutions/generalizations/renames have been propagated to affected canonical owners;
- obvious breakage introduced by refinements has been repaired;
- current terminology, indexes, links, supersession state, and OKF structure are coherent;
- no implementation-reuse or architecture decisions have entered design authority;
- Phase 009 can begin from one coherent current design and audit whole-system integrity without reconstructing pre/post-refinement variants.

## Control structure

Phase 008 begins with:

- [008-A — Familiarity Baseline, Reuse Opportunities, Genericity Scope & Subphase Planning](008-a-start-gate.md).

`008-A` derives only the project-specific substantive familiarity/reuse/genericity workstreams required by the mature concept system.

The final project-specific subphase performs Phase 008 consolidation, documentation-integrity audit, exit review, and Phase 009 handoff using the [Phase 008 exit-review template](exit-review-template.md).

The template does not prescribe the count or letters between those control points.

## Exit outcomes

Use the repository-wide outcomes:

- **PASS** — Phase 008 establishes a deliberately familiar/reusable or justified-novel concept system and Phase 009 may begin.
- **PASS WITH CARRY-FORWARD** — refinement is sound while explicit non-blocking whole-system integrity/catalog-hypothesis questions continue with named destinations.
- **NOT READY TO EXIT** — material familiarity-fit, false-familiarity, genericity, novelty, propagation, catalog-duplication, documentation, or implementation-contamination problems require more work or reopening an earlier phase.

## Implementation state

Throughout Phase 008, including after successful exit:

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet

The only authorized handoff is into Phase 009 whole-system concept-integrity/interference analysis.
