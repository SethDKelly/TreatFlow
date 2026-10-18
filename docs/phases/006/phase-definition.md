---
type: Phase Definition
title: Phase 006 — Concept Dependence, Product-Family, Subset & Scope Analysis
description: Defines contextual concept-inclusion dependencies, coherent application subsets, product-family possibilities, and adopted scope while preserving intrinsic concept independence and separating dependence from synchronization and implementation architecture.
tags: [phase-006, dependence, subsets, product-family, scope, concept-design]
sources:
  - id: jackson-dependency
    resource: https://essenceofsoftware.com/tutorials/concept-basics/dependency/
    title: Concept dependencies and subsets — Daniel Jackson
  - id: jackson-distillation
    resource: https://essenceofsoftware.com/posts/distillation/
    title: The Essence of the Essence — Daniel Jackson
---

# Phase 006 — Concept Dependence, Product-Family, Subset & Scope Analysis

## Role in the lifecycle

Phase 006 examines how an independently specified and explicitly composed concept system can form multiple coherent applications or product variants.

Phase 004 established intrinsic concept independence. Phase 005 established how included concepts interact. Phase 006 now asks a different question:

> In this application family, which concepts only make sense to include when certain other concepts are also present, and which resulting concept subsets are coherent and in scope?

Jackson describes this as a contextual or extrinsic dependence relation. Concepts themselves remain free-standing; the dependency captures the role a concept plays in a particular application.[^jackson-dependency]

[^jackson-dependency]: Daniel Jackson, "Concept dependencies and subsets."

## Methodological intention

Establish a defensible application-family dependence model that:

- distinguishes extrinsic inclusion dependence from intrinsic concept coupling;
- distinguishes dependence from synchronization;
- defines which concept subsets satisfy the contextual dependence rules;
- identifies meaningful product/application variants;
- separates structurally coherent variants from variants actually adopted into project scope;
- exposes upstream concept/composition problems rather than normalizing them as dependencies;
- hands Phase 007 an explicit set of application variants whose semantics must be mapped to user-visible experience.

## Relationship to Phase 004

Concepts entering Phase 006 must remain intrinsically independent.

If `A` cannot be understood or specified without `B`, that is not a Phase 006 dependency. It is an intrinsic coupling/boundary problem requiring Phase 004 correction.

Phase 006 dependence means that A can stand alone conceptually, but in the current application family including A has no meaningful intended role unless B is also included.

## Relationship to Phase 005

Phase 005 answers:

> When concepts are included together, how do their actions compose?

Phase 006 answers:

> Which concepts should or must be included together for a coherent application role?

A synchronization edge does not imply a dependence edge, and a dependence edge need not correspond one-for-one with synchronization.

For each adopted subset/variant, however, Phase 006 must check that its Phase 005 composition remains coherent. Required composition changes should reopen/refine Phase 005 rather than being redefined here.

## Relationship to Phase 007

Phase 007 maps the semantics of the relevant application into user-visible representation and interaction.

Phase 006 therefore must identify which concept subsets/variants are actually in scope and any dependence-derived explanation/context relationships mapping must respect.

A dependence graph may suggest an intelligible order in which concepts are introduced or explained, but it does not prescribe a screen hierarchy, navigation architecture, or UI sequence.

## Governing Phase 006 support contracts

Phase 006 is further governed by:

- [006-A — Dependence Scope, Subset Semantics, Product-Family Questions & Subphase Planning](006-a-start-gate.md);
- [Concept Dependence, Subset & Product-Family Contract](dependence-subset-contract.md);
- [Phase 006 Consolidation, Exit Review & Phase 007 Handoff Template](exit-review-template.md);
- repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md);
- [Design-Only Guardrails](../../methodology/design-only-guardrails.md).

These establish semantic and documentation obligations without prescribing a fixed graph notation, subset count, variant count, or B–X subphase sequence.

## Dependency semantics

For concepts `A` and `B`, an established dependency `A → B` means:

> within the named application family, every coherent subset containing A also contains B because A's inclusion otherwise lacks its intended application role.

Jackson's examples stress that this is subtler than habitual product assumptions. A concept that appears to require another in one familiar application may still be coherent without it in a different application context.[^jackson-dependency]

Therefore dependency edges are contextual design claims, not universal laws about reusable concepts.

## Primary design questions

Phase 006 should answer, as relevant:

- What application family or scope is being analyzed?
- For each concept, can it appear meaningfully without every other concept currently packaged with it?
- Which concepts have genuine extrinsic inclusion dependencies, and what purpose/application role justifies each edge?
- Which apparent dependencies are merely synchronization, current packaging, UI convention, organizational structure, or implementation assumptions?
- Which apparent dependencies actually expose intrinsic concept coupling requiring Phase 004 correction?
- What subsets satisfy the dependency relation?
- Which minimal or unusual subsets reveal useful product variants or challenge habitual assumptions?
- Which dependence-valid subsets are in scope now, which are coherent but out of scope, and which are invalid?
- Which concepts are optional, conditional, or mutually required in the present family?
- What do cycles mean, and do they represent legitimate co-inclusion or a hidden modularity defect?
- Does accepting a new variant alter which Phase 005 synchronizations/application actions are applicable?
- What explanation or mapping implications should Phase 007 inherit?

## Required dependence/scope coverage

Every Phase 006 exit must establish or explicitly disposition:

- application-family context;
- extrinsic dependency semantics and material edge rationale;
- representative valid and invalid subsets;
- optionality and minimal useful subsets where relevant;
- transitive consequences where they matter;
- mutual-dependence/cycle interpretation;
- coherent product/application-family variants;
- explicit in-scope versus coherent-but-out-of-scope distinctions;
- variant-specific Phase 005 composition implications;
- upstream defects exposed by dependence analysis;
- Phase 007 mapping/explanation implications;
- coherent canonical ownership, indexes, links, terminology, and supersession state.

This is a semantic coverage requirement, not a requirement to enumerate every possible subset or produce a particular graph format.

## Intrinsic versus extrinsic dependence

Jackson distinguishes intrinsic dependence from application-context dependence and emphasizes that concepts themselves should have no intrinsic dependencies.[^jackson-dependency]

Base therefore treats an intrinsic concept reference discovered here as an upstream defect, not as a successful Phase 006 edge.

This is critical for reuse: a Comment-like concept may be defined generically over arbitrary targets even if, in one application, its only meaningful targets are supplied by a Post-like concept. In that application Comment may depend extrinsically on Post without being defined intrinsically in terms of Post.

## Subset and product-family discipline

The dependence relation implicitly defines a family of valid concept subsets.

Phase 006 should use those subsets to expose contraction/extension possibilities and clarify concept roles, but it must distinguish:

- **dependence-valid subset** — obeys current inclusion rules;
- **in-scope variant** — deliberately adopted for the current project;
- **out-of-scope but coherent variant** — valid conceptually but not currently supported by the design mandate;
- **invalid subset** — violates an established dependency;
- **unresolved variant** — still requires design work.

Validity is not product commitment.

## Optionality and minimum scope

Optional does not mean unimportant. It means a coherent subset exists without that concept.

Likewise, a concept may be highly valuable yet depend extrinsically on another concept because its application role only exists when the supporting concept is present.

Phase 006 should identify minimal useful subsets where doing so clarifies scope, but should not manufacture a universal MVP from the dependence graph.

## Mutual dependence and cycles

Cycles are permitted in extrinsic dependence when concepts form a legitimate co-inclusion group.

For example, if A and B each lack their intended role without the other, valid subsets may include both or neither.

A cycle must still be challenged: it may reveal a Phase 004 specificity/boundary problem if the concepts cannot actually stand independently in semantics.

Do not import software-architecture assumptions that all dependency cycles are necessarily defects.

## Counterexample discipline

Dependence analysis must challenge the familiar product shape rather than simply document it.

Useful probes include:

- Can A serve a meaningful role in a plausible application without B?
- What concept roles survive if a seemingly foundational concept is removed?
- Is B required by A's purpose here, or only by the current UI/workflow/implementation?
- Could another concept supply the contextual role attributed to B?
- Does an unfamiliar but coherent subset reveal a broader application family?
- Does a proposed dependency contradict the concept's claimed genericity or independence?

## Scope discipline

Phase 006 may use Phase 000/001 product boundaries, constraints, and purposes to choose which coherent subsets belong to the current design.

If subset analysis exposes a materially different or superior scope than current canonical project knowledge allows, reopen/refine the appropriate earlier phase rather than silently changing the project mandate here.

Commercial editions, pricing bundles, organizational ownership, deployment options, and implementation convenience are not concept-dependence authority by themselves.

## Variant-specific composition

An adopted subset can change which Phase 005 application actions and synchronizations are applicable simply because some participating concepts are absent.

Phase 006 should identify these implications and ensure every in-scope variant has coherent composition semantics.

If the current Phase 005 model does not support an adopted variant, perform the necessary Phase 005 refinement rather than duplicating synchronization rules in dependence documents.

## Explanation-order implications

Jackson notes that dependencies can suggest an intelligible concept explanation order: if A's application role depends on B, B may need to be understood before A.[^jackson-dependency]

Phase 006 may hand such implications to Phase 007.

This is a conceptual/experience consideration, not permission to choose implementation order, navigation layout, or software architecture.

## Expected durable outputs

By exit, canonical current knowledge should make discoverable:

- the application-family context;
- the current extrinsic concept-dependence relation;
- concise rationale for material edges;
- representative valid/invalid subsets;
- mutual-dependence/co-inclusion groups where relevant;
- in-scope application/product variants;
- coherent but strategically relevant out-of-scope variants where useful;
- variant-specific composition implications/corrections;
- mapping/explanation considerations for Phase 007;
- explicit carry-forwards with destinations.

Detailed exploratory graphs, rejected edges, exhaustive subset experiments, and alternative scope debates belong primarily in phase records.

## Documentation and knowledge authority

Phase 006 can easily create duplicate truth across dependency graphs, subset tables, product-scope prose, concept documents, and synchronization documents.

Therefore:

- establish one natural canonical owner for current dependency semantics;
- create separate scope/product-family owners only when semantically justified;
- link to concept purposes/specifications and synchronizations rather than reproducing them;
- keep edge rationale concise and traceable;
- supersede Phase 005 provisional inclusion hypotheses once dependence is established;
- preserve rejected edges/subsets and exploratory graphs in phase history;
- explicitly distinguish coherent-but-out-of-scope variants from supported current variants;
- update relevant indexes and graph links whenever dependence/scope knowledge changes;
- prefer rules plus representative subsets over exhaustive duplicative enumeration when clearer;
- apply the repository-wide OKF/documentation-governance audit before exit.

## Explicit exclusions

Phase 006 must not define:

- source/package/module dependency graphs;
- service/bounded-context dependencies;
- database/persistence dependency or ownership;
- API/integration topology;
- deployment/runtime infrastructure relationships;
- build order or source implementation sequencing;
- team/organization ownership boundaries;
- implementation roadmap;
- frontend routing/navigation based solely on concept dependency;
- commercial packaging/pricing as a substitute for conceptual product-family reasoning;
- executable prototypes, tests, schemas, or implementation artifacts.

## Entry criteria

Phase 006 may begin only when:

- Phase 005 has passed or passed with explicitly non-blocking dependence/mapping carry-forwards;
- the current concepts remain independently specified;
- current synchronization/composition knowledge is discoverable;
- likely inclusion/dependence questions are visible;
- `006-A` can define an application-family and subset-analysis plan without normalizing a known Phase 004/005 defect.

## Exit criteria

Phase 006 may exit only when its final project-specific exit review establishes that:

- extrinsic dependence is clearly distinguished from intrinsic concept coupling and synchronization;
- every material dependency edge has a defensible application-role rationale;
- representative subset validity is understood;
- cycles/mutual dependencies have been deliberately reviewed;
- dependence-valid variants are distinguished from variants actually in scope;
- in-scope variants align with project purpose/scope or earlier phases have been appropriately refined;
- variant-specific composition remains coherent or Phase 005 has been corrected;
- upstream concept/composition defects discovered here are not hidden as dependency edges;
- current dependence/scope knowledge has coherent canonical ownership, indexes, references, terminology, and OKF structure;
- no implementation architecture/dependency model has entered design authority;
- Phase 007 can determine what concept system(s) must be mapped without guessing inclusion or scope.

## Control structure

Phase 006 begins with:

- [006-A — Dependence Scope, Subset Semantics, Product-Family Questions & Subphase Planning](006-a-start-gate.md).

`006-A` derives only the project-specific substantive dependence/subset/scope workstreams required by the actual concept system.

The final project-specific subphase performs Phase 006 consolidation, documentation-integrity audit, exit review, and Phase 007 handoff using the [Phase 006 exit-review template](exit-review-template.md).

The template does not prescribe the count or letters between those control points.

## Exit outcomes

Use the repository-wide outcomes:

- **PASS** — Phase 006 establishes a coherent application-family dependence/scope model and Phase 007 may begin.
- **PASS WITH CARRY-FORWARD** — dependence and scope are sound while explicit non-blocking mapping/reuse/integrity questions continue with named destinations.
- **NOT READY TO EXIT** — material classification, edge-rationale, subset, scope, variant-composition, documentation, or implementation-contamination problems require more work or reopening an earlier phase.

## Implementation state

Throughout Phase 006, including after successful exit:

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet

The only authorized handoff is into Phase 007 concept mapping, interaction semantics, and user-visible representation design.
