---
type: Phase Definition
title: Phase 009 — Concept Integrity, Cross-Concept Coherence & Interference Audit
description: Audits the mature composed concept system to verify that every retained concept still fulfills its purpose and that cross-concept composition, mapping, scope, and late refinements do not break or reinterpret its promise.
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

# Phase 009 — Concept Integrity, Cross-Concept Coherence & Interference Audit

## Role in the lifecycle

Phase 009 performs the deliberate **whole-system integrity audit** after concept specification, modularity, composition, product-family scope, mapping, and familiarity/reuse refinement have all settled into one current design.

Earlier phases ask whether each design element is sound in its own terms. Phase 009 asks whether those locally defensible elements remain sound **together**.

Jackson's integrity principle is that, when concepts are composed, each concept should still fulfill its own purpose.[^jackson-integrity]

[^jackson-integrity]: Daniel Jackson, "Concept Integrity."

A concept can therefore be perfectly reasonable in isolation and still be broken by another concept, a synchronization, an application-scope choice, a mapping, or a late familiarity/generalization decision.

## Methodological intention

Demonstrate that every materially important retained concept preserves the purpose, behavioral meaning, authority, lifecycle expectations, and user mental model that justify its existence across the relevant composed application contexts.

Where composition causes a concept to fail or mislead, identify the directional interference, correct the affected semantic owner, propagate the change, and repeat the integrity analysis before exit.

Phase 009 is not merely an inconsistency register. It must leave one coherent current design.

## Why this audit occurs after Phase 008

Whole-system integrity can only be judged after the design knows:

- current concept purposes and specifications;
- corrected modular boundaries;
- application synchronizations and action surface;
- in-scope product variants and dependence relations;
- user-visible mappings;
- familiarity/reuse/generalization refinements.

Phase 008 can make late changes that are locally attractive yet disturb another concept elsewhere. Phase 009 is the first deliberate system-wide audit after those refinements.

## Relationship to Phase 003 and Phase 004

Phase 003 defines what a concept means behaviorally. Phase 004 verifies that the behavior belongs in a sound independent conceptual unit.

Phase 009 does not redo those local analyses wholesale.

If the integrity audit reveals that a concept itself is undefined or badly factored, reopen the appropriate earlier phase. Do not reinterpret a local defect as a mysterious cross-concept conflict.

## Relationship to Phase 005

Phase 005 defines synchronization and application-level composition and already rejects obvious composition contradictions.

Phase 009 asks whether the **complete network of composition**, including chained effects and surrounding concepts, causes any retained concept to stop fulfilling its promise.

A synchronization may be locally valid and still participate in a larger integrity violation.

## Relationship to Phase 006

Phase 006 establishes which concepts coexist in relevant application/product variants.

Phase 009 uses those in-scope variants as integrity contexts. It asks whether the same concept keeps the same intrinsic promise when surrounded by different valid subsets and variant-specific synchronizations/mappings.

If a concept has materially different intrinsic semantics across variants, the variant or concept model requires upstream correction.

## Relationship to Phase 007

Phase 007 establishes faithful user-visible mapping semantics locally.

Phase 009 asks whether the **combined** mapping still preserves each concept's promise when effects from several concepts appear together.

A mapping can become integrity-breaking even when each local mapping rule looked reasonable—for example, when a combined action makes an irreversible secondary effect appear to belong to a reversible concept.

## Relationship to Phase 008

Phase 008 may substitute familiar concepts, broaden genericity, rename concepts, or preserve reusable design knowledge.

Phase 009 checks whether those refinements remain safe in the whole system. Familiarity that works in isolation may become false familiarity after composition; generalization may erase a distinction another concept depends on.

Known Phase 008 breakage must be corrected before Phase 009 exits.

## Relationship to Phase 010

Phase 009 establishes **structural and compositional integrity**.

Phase 010 then broadens validation to representative, exceptional, temporal, failure, misuse, recovery, adverse-incentive, safety/privacy/policy, and domain-misfit scenarios.

A confirmed integrity violation belongs in Phase 009 correction now. A concern may be handed to Phase 010 only when the current design is structurally coherent and the suspected problem depends on a scenario or context that requires adversarial validation.

## Governing Phase 009 support contracts

Phase 009 is further governed by:

- [009-A — Integrity Audit Scope, Interference Surfaces, Whole-System Coverage & Subphase Planning](009-a-start-gate.md);
- [Concept Integrity & Cross-Concept Interference Contract](integrity-interference-contract.md);
- [Phase 009 Consolidation, Exit Review & Phase 010 Handoff Template](exit-review-template.md);
- repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md);
- [Design-Only Guardrails](../../methodology/design-only-guardrails.md).

These establish semantic and documentation obligations without prescribing a fixed interference matrix, scoring system, concept-pair count, or B–X subphase sequence.

## Primary design questions

Phase 009 should answer, as relevant:

- Does every retained concept still fulfill the purpose that justifies it after composition?
- Does another concept make a purpose-critical action unavailable, mandatory, or misleading?
- Do composed effects weaken or contradict another concept's promised result?
- Can concept states/invariants coexist meaningfully under cross-concept behavior?
- Do lifecycle, correction, revocation, deletion, expiration, supersession, or history semantics interfere?
- Does one concept bypass, stale, expand, narrow, or misrepresent another concept's authority?
- Does automation reduce user control, deliberation, reversibility, or notice promised elsewhere?
- Do synchronization chains create hidden consequences that undermine a concept's purpose?
- Does the combined mapping preserve each concept's mental model and attribution of effects?
- Does the same concept preserve its intrinsic meaning across all materially relevant in-scope variants?
- Have Phase 008 reuse/generalization/terminology changes introduced system-wide mismatch?
- Are apparent purpose tensions intentional bounded trade-offs, or is a concept now retaining a promise the system cannot fulfill?
- What confirmed violations require correction, and what genuinely scenario-dependent risks belong in Phase 010?

## Required integrity coverage

Every Phase 009 exit must establish or explicitly disposition:

- purpose preservation for materially important retained concepts;
- action/effect interference;
- state/invariant coherence;
- authority interference;
- lifecycle/history/correction interference;
- synchronization-chain and automation interference;
- mapping/mental-model integrity under composition;
- variant-specific integrity;
- Phase 008 refinement impact;
- known purpose tensions/trade-offs relevant to integrity;
- confirmed violations and correction ownership;
- residual scenario-dependent Phase 010 validation targets;
- documentation/index/reference coherence after corrections.

This is semantic coverage, not a required all-pairs matrix or exhaustive state-space enumeration.

## Purpose-preservation discipline

Integrity is evaluated relative to a concept's **current authoritative purpose**.

For each concept, ask whether composition preserves the behavior/value that makes the concept worth having.

A design may deliberately constrain a concept's availability in a particular application, but the resulting experience must remain consistent with the concept's stated purpose and mental model.

If the product no longer intends to provide the concept's original promise, change or remove the concept/purpose rather than keeping a misleading identity.

## Directional interference discipline

Interference is often directional.

Record, when useful:

- the **subject concept** whose purpose is threatened;
- the **interfering source** — concept, synchronization, mapping, scope choice, automation, or refinement;
- the application context/variant;
- the affected state/action/authority/lifecycle semantics;
- the resulting purpose failure or user-visible surprise.

This is more actionable than saying two concepts merely conflict.

## Interaction-cluster discipline

Do not limit the audit to concept pairs.

Some integrity failures emerge only through:

- chained synchronizations;
- three-or-more-concept application actions;
- shared authority boundaries;
- linked lifecycle transitions;
- aggregate/derived mappings;
- mutually dependent product subsets;
- automated secondary effects.

Trace conceptual consequences far enough to evaluate every affected concept promise.

## Action/effect integrity

Check whether another concept/composition causes:

- purpose-critical actions to become unavailable;
- optional behavior to become effectively mandatory;
- intrinsic action meaning to change;
- a successful action to produce an additional purpose-breaking effect;
- one concept's correction/reversal to leave another concept's consequence inconsistent;
- application-action exposure to contradict the concept promise.

The question is conceptual behavior, not runtime call order.

## State/invariant integrity

Concepts normally own independent state, but application behavior may create user-relevant relationships among those states.

Check whether composition creates:

- contradictory current truths;
- stale state that users reasonably interpret as current;
- an invariant conflict;
- a derived representation that hides a concept-specific distinction;
- a state in which a concept can no longer fulfill its operational principle.

Do not substitute database consistency analysis for conceptual state coherence.

## Authority integrity

Check whether composition causes:

- one concept to appear to grant authority it does not own;
- system-triggered behavior to bypass protected actor semantics;
- revocation/expiration to leave consequential authority active elsewhere;
- delegation/approval to become stale;
- mappings to imply broader or narrower authority than the composed design actually grants.

Correct conceptual owners rather than assuming implementation authorization middleware will repair the contradiction.

## Lifecycle, history, and correction integrity

Temporal behavior often exposes interference that static snapshots hide.

Review materially interacting concepts across transitions such as:

- activation/deactivation;
- expiration/deadlines;
- cancellation/withdrawal;
- deletion/removal/restoration;
- correction/invalidation/supersession;
- finalization and later change;
- historical/current state distinctions;
- revocation after synchronized consequences.

A concept need not share another concept's lifecycle. It must coexist coherently where their behaviors intersect.

## Automation and chaining integrity

Automation created by Phase 005 can be useful while still interfering with another concept.

Ask whether automatic/chained behavior defeats:

- user deliberation;
- reversibility;
- notice/visibility;
- explicit authority;
- correction semantics;
- another concept's expected optionality;
- another concept's purpose-critical stopping condition.

Do not convert this into background-worker or orchestration design.

## Mapping and mental-model integrity

A combined experience must preserve correct attribution and expectations.

Challenge mappings that:

- make a secondary effect appear owned by the wrong concept;
- imply complete deletion when another concept retains meaningful consequences;
- imply reversibility when the composed action has an irreversible participant;
- hide automation that changes the meaning of user control;
- flatten lifecycle/history distinctions users need to predict effects;
- use familiar terminology whose expected semantics are invalidated by composition.

## Variant integrity

For each materially distinct in-scope Phase 006 variant, evaluate whether the same concept retains:

- the same purpose;
- the same intrinsic behavior;
- compatible authority/lifecycle semantics;
- a faithful mental model;
- purpose-preserving application actions/synchronizations.

A concept may be absent in some variants. When present under the same identity, it must not silently become a different concept.

## Purpose tension versus integrity violation

Not every tension is an integrity violation.

An intentional trade-off may remain sound when purposes, scope, and consequences are explicit and each retained concept remains honest about what it promises.

Integrity fails when the design keeps a concept/promise while composition prevents that promise from actually being fulfilled or predictably understood.

Do not use the word "trade-off" to normalize a broken promise.

## Correction and reopening discipline

Phase 009 owns integrity findings, not replacement semantics.

Correct the natural owner:

- purpose/need → Phase 001;
- concept identity/discovery → Phase 002;
- behavior/state/actions → Phase 003;
- boundary/independence → Phase 004;
- synchronization/application action → Phase 005;
- dependence/scope/variant → Phase 006;
- mapping/terminology → Phase 007;
- familiarity/generalization → Phase 008.

After correction:

1. propagate affected downstream current truth;
2. reconcile documentation/index/supersession state;
3. repeat the affected integrity audit;
4. close the finding only when the corrected composed design preserves the relevant purpose.

## Counterexample discipline

Jackson observes that integrity violations may be comparatively rare because egregious violations are often intolerable, but when they occur they can produce serious user harm or surprise.[^jackson-broken]

[^jackson-broken]: Daniel Jackson, "Breaking Integrity: Three Examples."

Phase 009 should therefore search actively rather than assume absence from ordinary paths proves integrity.

Useful conceptual probes include:

- same concept across different variants;
- same concept action under different neighboring concept states;
- revoke/correct/delete/expire after a synchronized effect;
- remove one synchronization and compare the restored promise;
- add/remove an optional concept;
- compare automated versus manually initiated paths;
- change authority while retained consequences remain;
- compare isolated OP expectations with composed user-visible behavior.

These are design analyses, not executable test cases.

## Expected durable outputs

By exit, current repository knowledge should make discoverable:

- one coherent post-correction concept system;
- corrected canonical owners where integrity work changed semantics;
- accepted explicit limitations/boundaries where they qualify concept promises;
- precise residual scenario-dependent risks for Phase 010.

The detailed interference register, counterexamples, rejected corrections, and audit matrices belong primarily in phase records.

## Documentation and knowledge authority

Phase 009 is at high risk of creating a duplicate whole-system model.

Therefore:

- reference current canonical semantic owners rather than copying them into integrity documents;
- keep findings/counterexamples/audit matrices in phase records;
- correct durable semantics in natural canonical owners;
- link resolved findings to those corrected owners;
- avoid a permanent integrity specification that competes with concept/sync/scope/mapping truth;
- keep residual Phase 010 risks explicitly provisional;
- update indexes/terminology/supersession when reopened work changes current design;
- consolidate stale cross-concept summaries before exit;
- apply the repository-wide OKF/documentation-governance audit.

## Explicit exclusions

Phase 009 must not become analysis of:

- runtime race conditions;
- distributed consistency or transactions;
- locking/isolation;
- service/API coupling;
- retry/timeout/backoff mechanics;
- cache invalidation;
- performance contention;
- infrastructure failure;
- implementation authorization middleware;
- integration or end-to-end executable tests;
- source/package/module architecture.

Those concerns belong to later engineering/architecture lifecycles unless a user-facing conceptual semantic issue can be stated independently of the implementation mechanism.

## Entry criteria

Phase 009 may begin only when:

- Phase 008 has passed or passed with explicitly non-blocking integrity/misfit carry-forwards;
- one coherent current post-Phase-008 design is discoverable;
- current concept, synchronization, scope/dependence, and mapping owners are discoverable;
- adopted Phase 008 refinements have been propagated;
- materially important concept purposes are explicit;
- `009-A` can define a whole-system integrity audit without first repairing obvious local defects.

If current truth is ambiguous or locally known-broken, repair that first.

## Exit criteria

Phase 009 may exit only when its final project-specific exit review establishes that:

- every materially important retained concept has been evaluated for purpose preservation in relevant composed contexts;
- material action/effect, state/invariant, authority, lifecycle/history/correction, automation/chaining, mapping, variant, and Phase 008 interference surfaces have been examined;
- purpose tensions have been distinguished from actual broken promises;
- confirmed integrity violations have been corrected in natural owners and re-audited;
- accepted limitations explicitly narrow concept/purpose expectations rather than silently breaking them;
- only genuinely scenario-dependent integrity risks remain for Phase 010;
- one coherent current canonical design remains after all reopenings/corrections;
- documentation/index/reference/supersession state is coherent and OKF-conformant;
- no implementation architecture/testing concerns have entered design authority;
- Phase 010 can begin from current repository knowledge alone with precise validation targets rather than structural contradictions.

## Control structure

Phase 009 begins with:

- [009-A — Integrity Audit Scope, Interference Surfaces, Whole-System Coverage & Subphase Planning](009-a-start-gate.md).

`009-A` derives only the project-specific integrity/interference workstreams required by the mature concept system.

The final project-specific subphase performs Phase 009 consolidation, documentation-integrity audit, exit review, and Phase 010 handoff using the [Phase 009 exit-review template](exit-review-template.md).

The template does not prescribe the count or letters between those control points.

## Exit outcomes

Use the repository-wide outcomes:

- **PASS** — the mature composed design preserves retained concept purposes and Phase 010 may begin.
- **PASS WITH CARRY-FORWARD** — structural integrity is sound while explicit scenario-dependent risks continue into Phase 010 with precise targets.
- **NOT READY TO EXIT** — material purpose-preservation, interference, authority, lifecycle, mapping, variant, propagation, documentation, or implementation-contamination problems require further Phase 009 work or reopening an earlier phase.

## Implementation state

Throughout Phase 009, including after successful exit:

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet

The only authorized handoff is into Phase 010 conceptual scenario/misfit/exception/failure/adversarial validation.