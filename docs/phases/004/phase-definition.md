---
type: Phase Definition
title: Phase 004 — Concept Modularity, Boundary, Specificity, Completeness & Independence
description: Audits and corrects concept factoring so each retained concept serves one coherent purpose, minimally fulfills it end to end, stands independently, and uses genericity where needed before composition.
tags: [phase-004, modularity, specificity, completeness, independence, genericity, boundaries, concept-design]
sources:
  - id: jackson-modularity
    resource: https://essenceofsoftware.com/tutorials/concept-basics/modularity/
    title: Concept modularity — Daniel Jackson
  - id: jackson-criteria
    resource: https://essenceofsoftware.com/tutorials/concept-basics/criteria/
    title: Concept criteria — Daniel Jackson
---

# Phase 004 — Concept Modularity, Boundary, Specificity, Completeness & Independence

## Role in the lifecycle

Phase 004 is the deliberate factoring and convergence audit between behavioral specification and composition.

Phase 003 establishes what each proposed concept means behaviorally. Phase 004 now asks whether those behaviors have been bundled into the **right concepts**.

It is expected to change the design when necessary. A concept that entered Phase 004 with a complete-looking specification may leave split, combined with another fragment, reframed, generalized, reduced, expanded for completeness, or rejected.

The phase must finish with concepts stable enough that Phase 005 can reason about interaction among them without repeatedly correcting obvious basic factoring errors.

## Methodological intention

Jackson describes concept modularity through three criteria: **specificity, completeness, and independence**.[^jackson-modularity]

- **Specificity** requires a concept to fulfill one coherent purpose that provides meaningful value without mixing separable purposes.
- **Completeness** requires the concept's own functionality to fulfill that purpose sufficiently.
- **Independence** requires the concept to stand by itself without reference to peer application concepts.

Genericity is an important technique for achieving independence when a concept needs only the identity or value of externally supplied objects rather than their application-specific semantics.[^jackson-modularity]

Phase 004 applies these criteria to the representation-independent specifications produced in Phase 003 and corrects boundaries before cross-concept composition becomes authoritative.

[^jackson-modularity]: Daniel Jackson, "Concept modularity."

## Relationship to Phase 003

Phase 003 asks:

> What does this concept mean and how does it behave?

Phase 004 asks:

> Is that behavior grouped into the correct conceptual unit?

Phase 004 depends on explicit Phase 003 behavior because modularity cannot be assessed reliably from names, domain nouns, feature labels, or intuition alone.

If Phase 004 changes a concept boundary materially, the resulting concept must again satisfy the Phase 003 behavioral-specification standard before Phase 004 can exit. A localized correction may be re-specified within Phase 004; a substantial identity/behavior change should explicitly reopen Phase 003.

## Relationship to Phase 005

Phase 005 composes **independent** concepts through synchronization.

Phase 004 therefore must not make a concept "complete" by absorbing behavior that serves a different purpose merely because the target application needs the behaviors to occur together.

When behavior crosses otherwise sound concept boundaries, Phase 004 should identify a likely future synchronization seam and leave the actual composition design to Phase 005.

## Relationship to Phase 006

Intrinsic concept independence is different from extrinsic product/application dependence.

A concept may stand entirely on its own while a particular application only makes sense including it when another concept is also present. Phase 006 examines those inclusion/dependence relationships.

Phase 004 must not weaken intrinsic concept independence simply because concepts are expected to be deployed together.

## Relationship to Phase 008

Genericity appears in both phases for different reasons.

Phase 004 resolves genericity needed to establish correct concept boundaries and independence—for example, replacing an unnecessary application-specific type reference with a generic parameter.

Phase 008 later performs a broader familiarity, reuse, catalog, naming, and genericity refinement after composition, scope, and mapping provide more context.

Phase 004 should not defer a known independence problem to Phase 008 merely because further reuse opportunities may be reviewed later.

## Governing Phase 004 support contracts

Phase 004 is further governed by:

- [004-A — Modularity Audit Scope, Boundary Risk, Genericity Pressure & Subphase Planning](004-a-start-gate.md);
- [Concept Modularity & Boundary Refinement Contract](modularity-boundary-contract.md);
- [Phase 004 Consolidation, Exit Review & Phase 005 Handoff Template](exit-review-template.md);
- repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md);
- [Design-Only Guardrails](../../methodology/design-only-guardrails.md).

These establish required semantic and documentation coverage without prescribing a fixed B–X subphase sequence.

## Primary design questions

Phase 004 should answer, as relevant:

- Does each concept serve one coherent valuable purpose?
- Is any concept overloaded with behavior serving separable purposes?
- Is any proposed concept merely a fragment that has no meaningful value without behavior owned elsewhere?
- Does each concept minimally contain the functionality required to fulfill its purpose end to end?
- Does its operational principle depend on missing or externally delegated semantic behavior?
- Can the concept be understood and specified without first understanding another peer application concept?
- Are another concept's types or semantics embedded where generic parameters would preserve independence?
- Does a domain-specific formulation need to become more generic to express the true behavioral unit?
- Should a concept be retained, split, combined, reframed, generalized, reduced, expanded for completeness, or rejected?
- If behavior is removed from one concept, where does it belong or should it be rejected?
- Does an apparent completeness problem actually indicate a future synchronization seam rather than missing intrinsic behavior?
- Have boundary changes been re-specified rigorously enough that Phase 005 receives actual concepts rather than audit conclusions?

## Required modularity coverage

Every Phase 004 exit must establish or explicitly disposition:

- specificity of each retained concept;
- minimal completeness against each concept's purpose;
- independence from peer application concepts;
- genericity required to remove avoidable semantic coupling;
- material split/combine/reframe/generalize/reduce/expand/reject alternatives;
- re-specification of changed concepts;
- future synchronization seams exposed by sound independent boundaries;
- extrinsic dependence questions intentionally deferred to Phase 006;
- broader familiarity/reuse/generalization questions appropriately deferred to Phase 008;
- documentation/index/supersession coherence after concept identity changes.

This is a semantic coverage requirement, not a required scorecard format, document count, or subphase count.

## Specificity discipline

Specificity fails in two directions.

A concept is **too broad** when it mixes behavior that serves separable purposes merely because the behavior concerns the same domain entity, screen, workflow, organizational owner, or implementation mechanism.

A concept is **too narrow** when it represents only a fragment of behavior that cannot deliver meaningful value until combined with behavior that is actually part of the same purpose.

The correct boundary is governed by coherent purpose and behavior, not artifact size.

## Completeness discipline

Completeness means that the concept minimally satisfies its purpose.[^jackson-modularity]

It does not mean including every useful extension.

Phase 004 must distinguish:

- behavior genuinely required by the concept's own purpose;
- optional enhancements not required for that purpose;
- behavior serving a different purpose that should remain an independent concept and later synchronize.

An implementation mechanism cannot substitute for missing semantic completeness.

## Independence discipline

A retained concept should be explainable and behaviorally definable without relying on another peer application's concept definition.

Cross-concept application behavior is not evidence that concepts should be intrinsically coupled. Where multiple independent concepts must act together, Phase 005 synchronization is the intended composition mechanism.

Do not confuse concept independence with code-level independence. Libraries, implementation utilities, persistence technology, cryptographic modules, infrastructure, or service dependencies are outside the present design question.

## Genericity discipline

If a concept uses another application's type, ask what it actually knows about that type.

When only identity matters, replace the application-specific reference with an abstract/generic parameter where doing so preserves purpose clarity and semantics.

Jackson's optional permutation-invariance diagnostic can support this reasoning: if arbitrarily renaming values of a type leaves valid concept behavior unchanged, only identity may matter.[^jackson-modularity]

Do not generalize a type whose domain semantics genuinely affect the concept's promise.

## Boundary-change discipline

A modularity audit must be able to revise concept identity rather than merely attach review findings to a frozen catalog.

Valid dispositions may include:

- retained;
- split;
- combined;
- reframed;
- generalized;
- reduced;
- expanded for completeness;
- rejected.

For every material change, preserve why the previous boundary failed, what alternatives were considered, and why the new boundary better aligns purpose and behavior.

## Counterexample discipline

Phase 004 should actively try to disprove apparently clean boundaries.

Useful probes include:

- Could one portion of this concept be useful while another is unwanted?
- Does removing an action make the purpose impossible to fulfill?
- Does the operational principle secretly rely on another concept?
- If every peer concept disappeared, could this concept still fulfill its own promise?
- Does an external type matter semantically or only by identity?
- Does a separate proposed concept have any valuable purpose on its own?
- Would moving behavior across a boundary make both purposes clearer?

A modularity review that only confirms the incoming structure is weak evidence.

## Expected durable outputs

By exit, current canonical knowledge should make discoverable:

- the retained concept set;
- each concept's coherent purpose;
- corrected Phase 003-quality behavioral specifications;
- generic parameters/abstractions introduced to preserve independence;
- significant concept identity changes where current readers need them;
- explicit unresolved non-blocking questions assigned to later phases.

Detailed modularity arguments, rejected boundaries, counterexamples, and historical alternatives belong primarily in phase records rather than being duplicated in every canonical concept specification.

## Documentation and knowledge authority

Phase 004 is a high-risk documentation-drift point because concept identities and behavior ownership may change substantially.

Therefore:

- update a concept's existing canonical owner when semantic identity remains stable;
- create a new canonical concept document only for a genuinely new semantic identity;
- make split/combined/reframed/rejected supersession unambiguous;
- do not leave old and new concept specifications both indexed as current;
- update purpose and related graph links when behavior ownership changes;
- preserve boundary-analysis rationale in phase records rather than duplicating it into canonical specifications;
- keep Phase 005 synchronization and Phase 006 dependence hypotheses explicitly provisional;
- update directory indexes and meaningful references whenever concept identity changes;
- apply the repository-wide OKF/documentation-governance audit before exit.

## Explicit exclusions

Phase 004 must not:

- define package, module, namespace, class, service, or bounded-context boundaries;
- assign database/persistence ownership;
- choose API or event boundaries;
- define message schemas, queues, topics, or orchestration;
- create source topology or dependency-direction rules;
- choose deployment units or runtime architecture;
- optimize concepts for team ownership or implementation convenience;
- create authoritative synchronizations that belong to Phase 005;
- replace intrinsic independence with product-inclusion assumptions that belong to Phase 006;
- exhaust the broader familiarity/catalog/reuse audit reserved for Phase 008;
- create executable prototypes, tests, schemas, scaffolding, or implementation artifacts.

## Entry criteria

Phase 004 may begin only when:

- Phase 003 has passed or passed with explicitly non-blocking modularity carry-forwards;
- each concept entering the audit has a sufficiently explicit representation-independent behavioral specification;
- current canonical concept owners are discoverable;
- known boundary/specification uncertainties are visible;
- `004-A` can define a responsible modularity audit plan.

If behavior is too vague to judge modularity, return to Phase 003 rather than guessing at the boundary.

## Exit criteria

Phase 004 may exit only when its final project-specific exit review establishes that:

- every retained concept serves one coherent valuable purpose;
- overloaded and fragmentary concepts have been corrected or explicitly shown not to violate specificity;
- every retained concept minimally contains the behavior needed to fulfill its purpose end to end;
- every retained concept can be understood and specified without intrinsic reliance on peer application concepts;
- avoidable application-specific type coupling has been removed through appropriate genericity;
- material boundary alternatives have been examined rather than simply affirming the incoming decomposition;
- split/combined/reframed/generalized/reduced/expanded/rejected decisions are traceable;
- materially changed concepts again satisfy the Phase 003 behavioral-specification standard;
- likely cross-concept application behavior has not been hidden inside concepts merely to make them appear complete;
- likely Phase 005 synchronization seams and Phase 006 extrinsic-dependence questions are explicit where relevant;
- current concept authority, indexes, references, terminology, and supersession state are coherent and OKF-conformant;
- no implementation modularity or architecture has been introduced;
- Phase 005 can begin from repository knowledge alone without first repairing obvious concept boundaries.

## Control structure

Phase 004 begins with:

- [004-A — Modularity Audit Scope, Boundary Risk, Genericity Pressure & Subphase Planning](004-a-start-gate.md).

`004-A` derives only the project-specific substantive modularity/boundary workstreams required by the actual concept set.

The final project-specific subphase performs Phase 004 consolidation, documentation-integrity audit, exit review, and Phase 005 handoff using the [Phase 004 exit-review template](exit-review-template.md).

The template does not prescribe the count or letters between those control points.

## Exit outcomes

Use the repository-wide outcomes:

- **PASS** — Phase 004 establishes a sufficiently modular concept set and Phase 005 may begin.
- **PASS WITH CARRY-FORWARD** — modularity is sound while explicit non-blocking composition/dependence/reuse questions continue with named destinations.
- **NOT READY TO EXIT** — material specificity, completeness, independence, genericity, boundary, re-specification, documentation, or implementation-contamination problems require more work or reopening an earlier phase.

## Implementation state

Throughout Phase 004, including after successful exit:

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet

The only authorized handoff is into Phase 005 concept-composition and synchronization design.
