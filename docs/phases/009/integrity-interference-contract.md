---
type: Concept Integrity and Interference Contract
title: Concept Integrity & Cross-Concept Interference Contract
description: Defines whole-system integrity, interference categories, purpose-preservation tests, correction ownership, variant and mapping review, and documentation rules for Phase 009.
tags: [phase-009, integrity, interference, coherence, purpose-preservation, concept-design]
sources:
  - id: jackson-integrity
    resource: https://essenceofsoftware.com/posts/sample-chapters/eos-11-concept-integrity.pdf
    title: Concept Integrity — Daniel Jackson
  - id: jackson-broken-integrity
    resource: https://essenceofsoftware.com/studies/small/broken-integrity/
    title: Breaking Integrity: Three Examples — Daniel Jackson
  - id: jackson-distillation
    resource: https://essenceofsoftware.com/posts/distillation/
    title: The Essence of the Essence — Daniel Jackson
---

# Concept Integrity & Cross-Concept Interference Contract

## Integrity principle

Jackson's integrity principle can be stated simply:

> When concepts are composed, each concept should still fulfill its own purpose.

A concept may be well designed in isolation and still fail this principle after composition if another concept, synchronization, scope choice, mapping, or later refinement undermines the promise users rely on.[^jackson-integrity]

[^jackson-integrity]: Daniel Jackson, "Concept Integrity."

Phase 009 therefore evaluates **purpose preservation under composition**, not merely local correctness or absence of implementation defects.

## Why integrity is a late audit

Integrity can only be judged meaningfully after the project has established:

- concept behavior;
- modular boundaries;
- synchronizations/application actions;
- in-scope subsets/variants;
- user-visible mappings;
- familiarity/reuse/generalization refinements.

Any of these can change the environment in which a concept must still fulfill its purpose.

## Integrity subject

For each retained concept `C`, define the integrity question against its current authoritative purpose and specification:

> Across the materially relevant application contexts in which `C` appears, does `C` still provide the behavior and value its purpose promises without being defeated, reinterpreted, bypassed, or made misleading by the rest of the system?

The answer must be based on current canonical truth, not superseded phase history.

## Integrity versus local validity

A local defect is not automatically an integrity violation.

Examples:

- an action missing from a concept specification is primarily a Phase 003 defect;
- an overloaded concept is primarily Phase 004;
- an invalid synchronization is primarily Phase 005;
- a wrong dependency edge is primarily Phase 006;
- a misleading standalone mapping is primarily Phase 007;
- an obviously incompatible familiar substitution is primarily Phase 008.

Phase 009 may rediscover such defects, but the correction belongs in the earlier natural owner.

An integrity violation specifically concerns a **compositional effect**: locally defensible elements combine in a way that causes one concept to stop fulfilling its purpose or users' correct expectations of that purpose.

## Interference categories

Use the categories below as diagnostic lenses, not a mandatory document taxonomy.

### 1. Action-availability interference

Another concept or synchronization causes an action necessary to a concept's purpose to become unavailable, mandatory, conditional, or coupled in a way that weakens the original promise.

### 2. Effect interference

A composed action adds, suppresses, or transforms consequences such that the subject concept's promised outcome no longer holds as expected.

### 3. State-meaning interference

Cross-concept behavior causes a concept's state or a user-visible interpretation of it to become stale, contradictory, misleading, or semantically incomplete.

### 4. Invariant interference

The combined system admits or requires a state in which one concept's invariant or purpose-supporting condition is undermined by another concept's behavior.

### 5. Lifecycle/temporal interference

Activation, revocation, expiration, deletion, correction, supersession, restoration, finalization, or history semantics in one concept undermine another concept's promise over time.

### 6. Authority interference

One concept's authority model is bypassed, silently expanded, narrowed, revoked, or misrepresented through another concept or application action.

### 7. Automation interference

Automatic or chained behavior reduces user control, deliberation, notice, reversibility, or other purpose-critical properties promised elsewhere.

### 8. Mapping/mental-model interference

The combined user-visible representation causes a concept to appear to have different behavior, ownership, authority, scope, lifecycle, or consequence from its actual semantics.

### 9. Variant/scope interference

A concept fulfills its purpose in one valid product variant but loses or materially weakens it in another in-scope variant.

### 10. Familiarity/generalization interference

A reused/generalized concept remains plausible locally but imports expectations or abstractions that conflict with neighboring concepts or application behavior.

## Purpose-preservation test

For every materially important concept, verify at minimum:

- its purpose remains meaningful in the composed system;
- the actions/state needed to fulfill that purpose remain available and coherent;
- synchronizations do not change intrinsic action meaning;
- surrounding concepts do not nullify or contradict its purpose-critical behavior;
- authority and lifecycle assumptions remain valid;
- mappings preserve the concept's mental model;
- variant-specific surroundings do not silently create a different concept;
- Phase 008 familiarity/generalization changes have not introduced semantic mismatch.

A concept may have reduced availability in a particular application if that reduction is explicitly part of the product design and does not contradict the concept's promise. The audit must distinguish deliberate application scope from accidental purpose failure.

## Interference is directional

Interference is not necessarily symmetric.

Concept `A` may undermine `B` while `B` does not undermine `A`.

Record direction explicitly when it helps diagnosis:

- subject concept whose purpose is threatened;
- interfering concept/composition/mapping;
- affected action/state/purpose condition;
- application context/variant;
- user-visible consequence.

This avoids vague statements that two concepts merely "conflict."

## Conflict versus integrity violation

Purpose tensions identified in Phase 001 do not automatically imply integrity failure.

A design may intentionally balance competing purposes or constrain one concept in a transparent, purpose-consistent way.

Treat a tension as an integrity violation when the composed design causes a retained concept to make a promise it can no longer actually fulfill, or preserves the concept name/mental model while materially defeating the behavior that justified it.

If the product no longer wants that promise, reconsider the concept or purpose rather than retaining a misleading concept identity.

## Interaction-cluster analysis

Pairwise checks are insufficient when interference emerges only through composition chains.

Audit clusters where relevant, including:

- chained synchronizations;
- shared application actions;
- shared actor/authority surfaces;
- linked lifecycle transitions;
- derived mappings spanning several concepts;
- mutually dependent product subsets;
- automations with secondary or tertiary effects.

The audit should trace conceptual consequences far enough to determine whether each affected concept still fulfills its purpose.

## Synchronization integrity

For each material synchronization affecting a concept, ask:

- Does the concept action retain its intrinsic meaning?
- Does another participant add an effect that defeats the concept's purpose?
- Does synchronization make a purpose-critical optional action effectively mandatory or vice versa?
- Can participant preconditions/lifecycle/authority remain valid together?
- Does chained synchronization create an outcome that invalidates another concept promise?
- Would removing the synchronization restore a concept promise, revealing the interference source?

Do not redesign runtime execution. The question is semantic composition.

## Authority integrity

Authority is a frequent source of cross-concept interference.

Check whether composition causes:

- one concept to act as though it grants authority it does not own;
- a system-triggered action to bypass actor-specific authority;
- revocation in one concept to leave active authority elsewhere;
- delegation or approval state to become stale;
- mappings to imply broader authority than the composed semantics permit.

Correct the authoritative concept/synchronization/mapping owner rather than adding an implementation permission workaround.

## Lifecycle, history, and correction integrity

Temporal semantics often reveal interference that static review misses.

Consider whether:

- deletion in one concept leaves another concept implying the object still exists in the same sense;
- correction/supersession leaves stale effects elsewhere;
- revocation fails to alter dependent application behavior;
- expiration conflicts with retained visibility or authority;
- restoration creates contradictory history;
- finalization in one concept occurs while another still permits purpose-changing edits.

Do not require global lifecycle uniformity. Require coherent composition where the concepts interact.

## Mapping integrity under composition

Phase 007 already establishes mapping fidelity locally. Phase 009 asks whether the **combined** mapping preserves each concept's promise.

Examples of integrity risk include:

- one combined action hides which concept owns an irreversible effect;
- the UI suggests that deleting one concept removes consequences owned by another;
- automation makes a manual-control concept appear stronger than it is;
- a familiar term is correct for one concept but misleading once another concept changes its effective behavior;
- a derived aggregate view hides a concept-specific distinction users need to predict outcomes.

The correction belongs in Phase 007 mapping owners unless deeper semantics are wrong upstream.

## Variant integrity

Use Phase 006 in-scope variants as the authority for variant review.

For each materially distinct variant containing a concept, check whether:

- its purpose remains the same;
- required actions remain meaningful;
- changed surrounding synchronizations do not undermine the promise;
- mappings do not create incompatible mental models;
- optional/required neighboring concepts do not alter intrinsic semantics.

If a concept has materially different intrinsic semantics between variants, either the concept identity is unstable or the variant design requires upstream correction.

## Phase 008 change-impact integrity

Phase 008 may introduce late semantic changes through reuse/generalization/renaming.

Audit whether those changes:

- alter synchronization assumptions;
- weaken authority distinctions;
- erase lifecycle/history differences;
- broaden scope beyond intended applicability;
- change mapping expectations;
- cause another concept's purpose to fail;
- create false familiarity in the composed application.

Phase 009 is the first deliberate whole-system check after those refinements.

## Integrity finding structure

A material finding should record, as appropriate:

- subject concept and purpose;
- interfering concept/synchronization/mapping/scope/refinement;
- relevant application context/variant;
- behavior/state/authority/lifecycle involved;
- how purpose fulfillment is weakened or broken;
- evidence/counterexample;
- severity or consequence in design terms;
- natural correction owner;
- affected downstream knowledge;
- resolution state.

Avoid numerical severity schemes unless they genuinely improve decisions.

## Finding dispositions

Useful dispositions include:

- **No integrity violation**;
- **Integrity risk — monitor/validate in Phase 010**;
- **Confirmed integrity violation — correction required**;
- **Upstream local defect discovered — reopen owner**;
- **Purpose/tension requires reframing**;
- **Accepted limitation with explicit concept/purpose boundary**.

An accepted limitation must not leave a concept making a promise the application knowingly cannot satisfy.

## Correction ownership

Phase 009 owns the **finding**, not replacement semantics.

Correct current truth in its natural owner:

- purpose/need → Phase 001 canonical knowledge;
- concept identity/discovery → Phase 002;
- behavior/state/actions → Phase 003;
- modularity/boundary → Phase 004;
- synchronization/application action → Phase 005;
- dependence/scope/variant → Phase 006;
- mapping/terminology → Phase 007;
- familiarity/generalization → Phase 008.

After correction, re-run affected Phase 009 analysis. Do not close a finding merely because an upstream document was edited.

## Counterexample discipline

Jackson notes that integrity violations may be comparatively rare but can be highly disruptive when they occur.[^jackson-broken]

[^jackson-broken]: Daniel Jackson, "Breaking Integrity: Three Examples."

The audit should therefore seek strong counterexamples rather than assume that rarity means low importance.

Useful probes include:

- same concept, different variant;
- same action, different neighboring concept state;
- correction/revocation/expiration after a synchronized effect;
- removal of one synchronization;
- addition/removal of one optional concept;
- automation versus manual path;
- authority transfer/revocation;
- user-visible representation before and after another concept changes state.

## Phase 009 versus Phase 010

Phase 009 establishes structural/compositional integrity.

Phase 010 deliberately broadens validation to representative, exceptional, temporal, failure, misuse, recovery, adverse-incentive, safety/privacy/policy, and domain-misfit scenarios.

A Phase 009 integrity finding may become a Phase 010 validation target if:

- structural review does not already prove a violation;
- the concern depends on a difficult scenario rather than ordinary composition;
- current design remains coherent enough to validate rather than obviously broken.

Do not defer a confirmed integrity violation simply because Phase 010 exists.

## Documentation and knowledge authority

Integrity analysis can easily create a giant shadow model of the system. Do not do that.

- reference concept/synchronization/scope/mapping owners rather than copying them;
- keep interference matrices, counterexamples, and finding histories primarily in phase records;
- correct durable semantics in their natural canonical owners;
- link resolved findings to the corrected owners;
- avoid creating a permanent duplicate "integrity specification" of the whole application;
- keep unresolved integrity risks clearly provisional;
- update indexes/supersession links when reopened work changes identities or terminology;
- apply the repository-wide OKF/documentation-governance audit before exit.

## Implementation boundary

Phase 009 must not reinterpret conceptual interference as:

- race conditions;
- locking/transaction problems;
- distributed consistency anomalies;
- service coupling;
- API integration defects;
- performance contention;
- cache invalidation;
- runtime authorization middleware gaps;
- implementation test failures.

Those may be future engineering concerns. Phase 009 concerns user-facing conceptual promises and composition semantics.

## Completion standard

Phase 009 has done enough when:

- every materially important retained concept has been evaluated for purpose preservation in relevant composed contexts;
- material synchronization, authority, lifecycle, mapping, variant, and Phase 008 interference surfaces have been examined;
- confirmed violations have been corrected in natural owners and rechecked;
- only genuinely unresolved scenario-dependent risks remain for Phase 010;
- one coherent current design remains discoverable;
- no implementation concerns have been substituted for conceptual integrity.