---
type: Concept Dependence and Subset Contract
title: Phase 006 Concept Dependence, Subset & Product-Family Contract
description: Defines extrinsic concept dependence, coherent subsets, product-family reasoning, scope selection, cycles, variant effects, and documentation rules for Phase 006.
tags: [phase-006, dependence, subsets, product-family, scope, concepts]
sources:
  - id: jackson-dependency
    resource: https://essenceofsoftware.com/tutorials/concept-basics/dependency/
    title: Concept dependencies and subsets — Daniel Jackson
  - id: jackson-distillation
    resource: https://essenceofsoftware.com/posts/distillation/
    title: The Essence of the Essence — Daniel Jackson
---

# Phase 006 Concept Dependence, Subset & Product-Family Contract

## Core distinction

Concepts are intrinsically independent. Phase 006 analyzes a different kind of dependence: **extrinsic dependence in the context of an application family**.

For concepts `A` and `B`, an edge `A → B` means:

> within the application family being analyzed, including A only makes sense if B is also included.

Jackson emphasizes that this does not mean A's concept specification uses B or breaks without B. The relation captures the role A plays in the application.[^jackson-dependency]

[^jackson-dependency]: Daniel Jackson, "Concept dependencies and subsets."

## Dependence is contextual

An extrinsic dependency is not necessarily universal across every imaginable application using the concept.

A concept may depend on another in one application family because only that other concept gives it a meaningful role there, while remaining usable independently or with different concepts in another application family.

Therefore every dependency claim should identify the application-family context in which it holds.

Do not rewrite contextual dependence into the intrinsic concept specification.

## Dependency-edge test

Before establishing `A → B`, ask:

1. Is A intrinsically understandable and behaviorally specified without B?
2. If B were absent from this application family, would including A still serve a meaningful intended role?
3. Is the need for B based on purpose/application role rather than implementation convenience, current packaging, UI placement, or existing synchronization?
4. Could a plausible alternative application use A without B? If so, does that invalidate the edge here or merely demonstrate that the edge is contextual?
5. Is the apparent edge actually exposing a Phase 004 independence defect?

If A cannot even be specified without B, return upstream; that is not the Phase 006 relation.

## Subset semantics

A dependence graph implicitly defines allowable concept subsets.

A subset is dependence-valid when every included concept also includes all concepts on which it depends, directly or transitively.[^jackson-dependency]

The empty subset may satisfy the formal rule but need not represent a useful product. Likewise, a dependence-valid subset is not automatically adopted as a supported product variant.

Distinguish validity from desirability and scope.

## Product/application family

The dependence relation can reveal a family of concept combinations that form coherent applications.

Phase 006 should use that family to reason about:

- smaller or larger coherent variants;
- optional capabilities;
- concepts that require supporting concepts in the current context;
- minimal meaningful subsets;
- variants that expose different application roles;
- scope boundaries and future extensions/contractions.

The purpose is conceptual flexibility and clarity, not feature-tier marketing design.

## Scope selection

For each materially relevant subset, distinguish:

- **dependence-valid** — satisfies current dependency rules;
- **in scope** — deliberately part of the current product/application design;
- **out of scope but coherent** — valid conceptually but not currently adopted;
- **invalid** — violates at least one established dependency;
- **unresolved** — more purpose/dependence analysis is needed.

Scope selection should be justified by project purpose, intended contexts, constraints, and product mandate rather than implementation convenience alone.

## Optional concepts

A concept with no incoming requirement from the chosen subset may still be optional rather than unnecessary.

Do not interpret optionality as low importance. It means only that a coherent variant exists without that concept under the current dependency model.

Likewise, a concept can be highly valuable and still depend on another concept for its application role.

## Mutual dependencies and cycles

Cycles are possible in an extrinsic dependence graph.

If `A → B` and `B → A`, the application family treats them as a co-inclusion group: neither appears in a valid subset without the other.

Do not automatically treat a cycle as an error. Instead ask:

- Is the mutual role dependence real?
- Does it reveal that the concepts should actually be merged? If so, reopen Phase 004 rather than using the cycle to hide a specificity problem.
- Are the concepts still independently understandable despite co-inclusion?
- What is the minimum meaningful explanation/mapping treatment for the group?

A cycle in application dependence is conceptually different from an implementation dependency cycle.

## Synchronization versus dependence

A synchronization states how included concepts interact. A dependency states whether inclusion of one makes sense without another.

Possible cases include:

- concepts synchronize but neither depends on the other;
- A depends on B but only some of their actions synchronize;
- A and B mutually depend on inclusion while remaining independently specified;
- a proposed dependency has no synchronization at all because B supplies application context/value rather than direct coordinated behavior.

Do not derive one graph mechanically from the other.

## Variant-specific synchronization

Different dependence-valid/in-scope subsets may make different Phase 005 synchronizations applicable.

Phase 006 may identify that a synchronization:

- exists only when all participating concepts are included;
- is irrelevant in smaller subsets;
- requires a variant-specific application action surface;
- exposes a missing Phase 005 composition rule for a newly accepted subset.

If authoritative composition changes are required, reopen/refine Phase 005 rather than redefining synchronization inside dependence documents.

## Explanation and conceptual order

Jackson notes that the dependence graph can suggest an intelligible order for explaining concepts: if A depends on B for its application role, B often needs to be understood first.[^jackson-dependency]

Phase 006 may therefore record explanation-order implications for Phase 007 mapping or later documentation.

This is not implementation sequencing. Base must not translate concept dependence into source-code build order or architecture.

## Product-family counterexamples

Actively test candidate edges and scopes with counterexamples:

- Construct a plausible subset containing A without B. Does A still have a meaningful role?
- Remove a supposedly foundational concept. Which other concepts truly lose their application justification?
- Can an alternative concept satisfy the contextual role currently attributed to B?
- Is a dependency only present because the current product framing is unnecessarily narrow?
- Does a proposed variant reveal a hidden purpose or concept-boundary defect?

Dependence analysis should challenge assumed bundles, not merely document them.

## Edge rationale discipline

Every material dependency edge should have a concise rationale linked to relevant purpose/application-role knowledge.

Avoid circular rationale such as “A depends on B because A is always used with B.” State what value or role becomes incoherent without B.

Do not duplicate full concept specifications or purpose documents in the dependency owner.

## Expected durable knowledge

By exit, current canonical knowledge should make discoverable:

- the application-family context being analyzed;
- the current extrinsic concept-dependence relation;
- rationale for material edges;
- representative valid/invalid subsets sufficient to explain the model;
- mutually dependent inclusion groups where relevant;
- in-scope product/application variants;
- coherent but deliberately out-of-scope variants where strategically useful;
- variant-specific composition implications/carry-forwards;
- explanation/mapping implications for Phase 007 where relevant.

Exhaustive subset enumeration is not mandatory when combinatorially large; concise rules plus representative examples may be superior.

## Documentation and OKF discipline

Phase 006 should avoid turning one dependency graph into many redundant scope documents.

Apply these rules:

- establish one natural canonical owner for current dependency semantics;
- create separate product-family/scope owners only where they represent distinct durable knowledge;
- link to concepts, purposes, and synchronizations rather than restating them;
- record edge rationale concisely and preserve exploratory/rejected edge analysis in phase history;
- supersede Phase 005 provisional inclusion hypotheses once current dependence is established;
- keep variant status explicit so coherent-but-out-of-scope subsets are not mistaken for supported products;
- update indexes and meaningful graph references whenever product-family or dependency knowledge becomes current;
- avoid exhaustive generated-looking lists when rules and representative subsets communicate the same truth more clearly;
- apply the repository-wide Documentation Integrity & OKF Governance Contract at exit.

## Explicit exclusions

Phase 006 does not define:

- code/package/module dependencies;
- service graphs or bounded contexts;
- database or persistence dependencies;
- source build order;
- deployment ordering;
- runtime infrastructure dependencies;
- API/integration dependencies;
- commercial pricing/packaging tiers unless such context is merely evidence for an independently justified product-scope decision;
- implementation roadmap or sequencing.

## Completion condition

Phase 006 is complete when the project can explain which independent concepts make sense together in the relevant application family, which coherent subsets are in scope, why the material inclusion dependencies exist, and what variant implications must be handed to mapping—without converting contextual inclusion into intrinsic concept coupling or implementation architecture.
