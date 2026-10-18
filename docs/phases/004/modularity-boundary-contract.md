---
type: Concept Modularity Contract
title: Phase 004 Concept Modularity & Boundary Refinement Contract
description: Defines specificity, completeness, independence, genericity, boundary-correction, re-specification, and documentation rules for Phase 004.
tags: [phase-004, modularity, specificity, completeness, independence, genericity, boundaries]
sources:
  - id: jackson-modularity
    resource: https://essenceofsoftware.com/tutorials/concept-basics/modularity/
    title: Concept modularity — Daniel Jackson
  - id: jackson-criteria
    resource: https://essenceofsoftware.com/tutorials/concept-basics/criteria/
    title: Concept criteria — Daniel Jackson
---

# Phase 004 Concept Modularity & Boundary Refinement Contract

## Purpose

Phase 004 determines whether the behavior specified in Phase 003 is bundled into concept boundaries that are genuinely modular from the user's and designer's perspective.

Jackson's modularity criteria are:

- **Specificity** — a concept fulfills a specific valuable purpose rather than mixing separable purposes;
- **Completeness** — the concept contains the functionality needed to fulfill that purpose;
- **Independence** — the concept stands on its own without depending on another peer concept.[^jackson-modularity]

Genericity supports independence by removing references to application-specific types when a concept needs only their identity or otherwise does not depend on their semantics.[^jackson-modularity]

[^jackson-modularity]: Daniel Jackson, "Concept modularity."

This phase is about modularity of **software function and user-facing semantics**, not modularity of code.

## 1. Specificity: one coherent purpose, enough value

A concept should have a purpose narrow enough that its behavior forms a coherent mental and functional unit, but broad enough that the unit provides meaningful value.

Specificity fails in two opposite directions.

### Overloaded concept

A concept is too broad when it bundles behavior serving separable purposes merely because the behaviors:

- concern the same domain entity;
- occur on the same screen;
- are owned by the same team;
- appear in the same workflow;
- share an implementation mechanism;
- have historically been shipped together.

A useful test is whether one portion of the behavior could be wanted without the other because it serves a distinct user/domain purpose. If so, splitting deserves serious consideration.

### Fragmentary concept

A concept is too narrow when its stated purpose or behavior delivers no meaningful value until paired with another fragment that is really part of the same purpose.

Jackson's authentication example illustrates this: registration alone is not a complete valuable concept if the actual purpose is authentication and the behavior that checks identity is absent.[^jackson-modularity]

Do not mistake every action or user story for a concept.

## 2. Completeness: minimally fulfill the purpose

Completeness asks whether the concept's own behavior is sufficient to deliver the value promised by its purpose.

A concept may be incomplete when:

- its operational principle relies on a behavior the concept does not define;
- an actor cannot reach the meaningful result without an omitted lookup/query/action;
- creation exists without the retrieval/use behavior that makes creation valuable;
- lifecycle or correction behavior is required by the purpose but owned nowhere;
- a concept delegates purpose-critical semantics to another peer concept;
- the specified state cannot support behavior necessary for the purpose.

Completeness is **minimal sufficiency**, not maximal feature accumulation. Jackson notes that a concept can be complete while still omitting useful extensions that are not required to satisfy its purpose.[^jackson-modularity]

Ask:

> If every other peer application concept were removed, does this concept still contain the semantics required to fulfill its own stated purpose?

If no, determine whether behavior is missing, the purpose is wrong, or the boundary is wrong.

## 3. Independence: stand-alone conceptual meaning

A concept should be understandable and behaviorally definable without reference to another peer application concept.

Independence is violated when:

- the concept's purpose assumes another concept exists;
- its operational principle cannot be told without another peer concept's semantics;
- its state embeds another application concept's semantic type unnecessarily;
- its actions require knowledge of another concept's internal state or behavior;
- it delegates essential semantic behavior to another concept;
- a reader cannot understand what the concept promises without first understanding another application concept.

Independence does **not** mean that future implementation code has no dependencies on libraries, utilities, cryptography, persistence libraries, or other technical services. Those are representation/engineering concerns and are outside this phase.[^jackson-modularity]

It also does not mean concepts never interact. Application-level interaction belongs in Phase 005 synchronization; application inclusion/dependence belongs in Phase 006.

## 4. Genericity as an independence technique

A concept may appear to depend on another concept because its state/actions use a type supplied by that other concept.

Ask whether the concept actually depends on the external type's semantics or only on object identity/content passed through it.

If only identity matters, use an abstract/generic parameter rather than binding the concept definition to the application-specific type.

Jackson's Label example can be generalized from labeling messages to labeling arbitrary items, and Email can be parameterized over the identity type it uses rather than depending intrinsically on a particular User concept.[^jackson-modularity]

### Genericity test

Useful questions include:

- Does the concept inspect domain-specific properties of the external type?
- Would replacing every external object with a different unique token leave the concept behavior unchanged?
- Does the concept merely store, compare, associate, or return identities?
- Can the purpose be stated naturally over a broader type without becoming vague?

Jackson's permutation-invariance idea is an optional advanced diagnostic: if arbitrary renaming/permutation of values of a type preserves valid behavior, the concept is treating that type generically.[^jackson-modularity]

Do not generalize merely for abstraction's sake. A semantic distinction required by the purpose should remain explicit.

## 5. Phase 004 genericity versus Phase 008 refinement

Phase 004 owns genericity necessary to establish correct boundaries and independence.

Phase 008 later performs a broader familiarity/reuse/genericity audit after composition, scope, and mapping provide more context.

Therefore Phase 004 should resolve:

- concept-specific references that create avoidable dependence;
- domain narrowing that prevents the concept from standing independently;
- obvious parameterization needed for a coherent reusable behavioral unit.

It need not exhaust every possible reuse opportunity, catalog comparison, naming improvement, or optional abstraction. Those can remain visible for Phase 008 when they do not compromise present modularity.

## 6. Boundary correction repertoire

Phase 004 may conclude that a concept should be:

### Retained

The current purpose and behavioral boundary survive the modularity audit.

### Split

One specification contains behavior serving separable purposes. Create distinct concepts and re-specify each independently.

### Combined

Multiple fragments only together fulfill one coherent purpose. Combine them into a concept whose behavior and state make that purpose complete.

### Reframed

The behavior forms a plausible concept, but the existing name/purpose/boundary misstates its real semantic unit.

### Generalized

An application-specific type or assumption can be replaced by an appropriate generic parameter or broader semantic boundary without weakening the purpose.

### Reduced

Behavior unrelated to the concept purpose is removed and assigned for separate concept discovery/specification or explicitly rejected.

### Expanded for completeness

Behavior genuinely necessary to fulfill the concept's purpose is added to the concept specification.

### Rejected

The proposed concept does not survive as a coherent, valuable, complete, independent behavioral unit.

These are design dispositions, not mandatory labels or a maturity scale.

## 7. Split/merge decisions must follow purpose and behavior

Do not split concepts because:

- the state is large;
- the specification has many actions;
- multiple implementation teams may work on it;
- storage could be separated;
- different APIs seem convenient;
- different screens exist.

Do not combine concepts because:

- they interact frequently;
- the same actor uses them;
- one usually follows another in a workflow;
- they share data or implementation infrastructure;
- they are always sold together.

The question is whether the behaviors fulfill one inseparable purpose or separable purposes.

## 8. Completeness versus synchronization

A frequent Phase 004 error is to make a concept "complete" by absorbing behavior that properly belongs to another independent concept.

Use this distinction:

- If behavior is necessary to fulfill the concept's **own purpose**, it is a completeness concern.
- If behavior fulfills a **different purpose** but should occur in coordination with this concept, it should remain separate and be considered for synchronization in Phase 005.

For example, if creating an item should also cause a notification, notification behavior does not automatically belong inside the creation concept. The notification may serve a distinct awareness purpose and be composed later.

Phase 004 may record a likely synchronization seam but must not make the sync authoritative.

## 9. Independence versus application dependence

A concept may be intrinsically independent yet be useful in an application only when another concept is included.

That is an **extrinsic product/application dependence** and belongs in Phase 006.

Do not weaken a concept's intrinsic independence merely because the target application will probably deploy it alongside another concept.

## 10. Behavioral re-specification after boundary change

Any material boundary correction must leave behind a valid concept specification, not just a boundary decision.

When a concept is split, combined, reframed, generalized, expanded, or reduced, revisit as necessary:

- purpose;
- operational principle;
- abstract state;
- actions;
- preconditions/effects/results;
- invariants;
- lifecycle/time/history/correction semantics;
- intrinsic authority;
- deliberate under-specification.

Apply the Phase 003 [Concept Behavioral Specification Contract](../003/concept-specification-contract.md).

If the correction substantially changes identity or behavior, explicitly reopen Phase 003 rather than hiding major specification work inside an audit record.

## 11. Counterexample-driven modularity analysis

Positive explanations are not enough. Actively seek examples that break the proposed boundary.

Useful probes include:

- Can one part of this concept be desired without another part?
- Can its stated purpose be achieved if one action is removed?
- Does its OP require behavior from somewhere else?
- Can the concept still fulfill its purpose if every peer concept is absent?
- Does an external type matter semantically, or only by identity?
- Does a supposed separate concept have any meaningful purpose independently?
- Does moving a behavior across the boundary make both resulting purposes clearer?

Preserve material counterexamples and correction rationale in phase evidence.

## 12. Avoid pseudo-formal modularity scoring

Do not reduce specificity, completeness, independence, or genericity to arbitrary numeric scores merely to automate convergence.

Structured statuses or review matrices may help organize work, but final decisions should explain:

- what purpose is being protected;
- what behavior creates the problem;
- which criterion is violated;
- what alternative boundaries were considered;
- why the chosen correction produces a more coherent concept.

## 13. Documentation and OKF discipline

Phase 004 frequently changes concept identity, making it a high-risk phase for documentation drift.

Apply the repository-wide [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md).

In particular:

- update the existing canonical concept owner when identity remains stable;
- create a new canonical concept document only for a genuinely distinct semantic identity;
- when splitting/combining/reframing, make current authority unambiguous;
- do not leave old and new specifications both indexed as current;
- preserve audit rationale and rejected boundary alternatives in phase records;
- update purpose links when ownership of behavior changes;
- update indexes and meaningful graph references when concept identities change;
- keep later synchronization/dependence hypotheses explicitly provisional;
- reference Phase 003 specification rules rather than copying them into every corrected concept.

## 14. Phase 004 completion condition

Phase 004 has done enough when Phase 005 can begin with a concept set whose members:

- each have one coherent valuable purpose;
- minimally contain the behavior needed to fulfill that purpose;
- can be understood/specifed independently of peer application concepts;
- use generic parameters where needed to avoid false dependence;
- retain representation-independent Phase 003-quality behavioral specifications;
- have stable enough identities that cross-concept composition can now be analyzed without repeatedly reopening basic factoring.

"Stable enough" does not mean immutable. Later phases may still expose a flaw and reopen Phase 004.
