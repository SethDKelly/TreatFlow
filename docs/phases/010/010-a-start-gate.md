---
type: Phase Start Gate
title: 010-A — Validation Scope, Misfit Hypotheses, Risk Coverage & Subphase Planning
description: Mandatory Phase 010 start gate that establishes scenario/adversarial validation scope, misfit hypotheses, risk-weighted coverage, correction routing, documentation ownership, and project-specific subphases.
tags: [phase-010, start-gate, scenarios, misfits, adversarial-validation, planning]
sources:
  - id: jackson-misfits
    resource: https://essenceofsoftware.com/tutorials/design-general/misfits/
    title: Form, context & misfits — Daniel Jackson
  - id: jackson-great-design
    resource: https://essenceofsoftware.com/tutorials/design-general/great-design/
    title: How great design happens — Daniel Jackson
  - id: jackson-design-engineering
    resource: https://essenceofsoftware.com/tutorials/design-general/design-vs-engineering/
    title: Design vs. engineering — Daniel Jackson
---

# 010-A — Validation Scope, Misfit Hypotheses, Risk Coverage & Subphase Planning

## Purpose

`010-A` is the mandatory entry gate for **Phase 010 — Scenario, Misfit, Exception, Failure & Adversarial Design Validation**.

It does not perform the project’s substantive validation. It determines what must be attacked, why those validation dimensions matter for the actual project context, how scenario coverage will be selected, how findings will be routed back to their natural semantic owners, and what project-specific B–X subphases are required.

The gate protects Phase 010 from two opposite failures:

- shallow validation that merely replays happy-path operational principles; and
- unbounded scenario generation that creates volume without improving confidence in the design.

## Governing contracts

Before planning Phase 010 work, review:

- [Phase 010 definition](phase-definition.md);
- [Scenario, Misfit & Adversarial Validation Contract](scenario-validation-contract.md);
- [Phase 010 exit-review template](exit-review-template.md);
- [Phase 009 definition and handoff](../009/);
- [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md);
- [Design-Only Guardrails](../../methodology/design-only-guardrails.md).

## Jackson-aligned validation posture

Jackson’s misfit framing rejects the idea that a designer can enumerate a complete set of fitness criteria in advance. The practical task is to identify likely and consequential ways in which the designed form may fail to fit its context, then refine the design in response.[^jackson-misfits]

Phase 010 therefore uses **risk-weighted scenario selection**, not exhaustive enumeration.

The gate must plan enough positive and negative scenarios to challenge the design from materially different directions while avoiding arbitrary scenario-count targets.

[^jackson-misfits]: Daniel Jackson, "Form, context & misfits."

## Entry validation

Before deriving subphases, verify that Phase 009 has passed or passed with only explicit non-blocking Phase 010 validation targets.

Confirm that the current repository exposes one coherent design including, as relevant:

- authoritative project/purpose/context knowledge;
- current concept specifications and purposes;
- current modularity/boundary decisions;
- current synchronization/application-action model;
- current dependence/subset/scope model;
- current mapping/experience obligations;
- current familiarity/reuse/generalization state;
- Phase 009 integrity findings and resolved corrections;
- residual scenario-dependent risks intended for Phase 010.

If a known structural integrity contradiction remains unresolved, return to Phase 009 rather than treating it as an adversarial scenario.

## 1. Establish validation context and ensemble

Record the application/product contexts that materially define fit.

As relevant, identify:

- in-scope variants/subsets;
- primary actors and materially affected parties;
- important environmental or organizational conditions;
- lifecycle/time horizons;
- regulatory/policy/safety/privacy assumptions where conceptually relevant;
- resource/scarcity/competition conditions that affect user behavior;
- trust/adversarial assumptions;
- offline/degraded/partial-information contexts where conceptually meaningful;
- known external processes or human dependencies that shape fit.

Do not expand the ensemble indefinitely. Explicitly record material context boundaries and consequential exclusions/uncertainties.

## 2. Establish representative-success baseline

Identify the representative success situations against which the mature design should first be exercised end to end.

These should trace back to Phase 001 success framing and current concept/application behavior.

Plan enough representative cases to answer:

- Can the design still deliver its central promised improvements?
- Do the intended concepts/actions/synchronizations actually compose into meaningful outcomes?
- Are current scope and mapping decisions coherent in ordinary use?

Representative success validation is a baseline, not the whole phase.

## 3. Build the misfit-hypothesis inventory

Before generating detailed scenarios, identify plausible **misfit hypotheses**: ways the conceptual application may fail to fit its context.

Potential sources include:

- Phase 000/001 assumptions and uncertainties;
- Phase 009 residual validation targets;
- known domain failure histories;
- catalog/pattern lessons from Phase 008;
- affected-party tensions;
- lifecycle/correction/recovery semantics;
- authority boundaries;
- automated/synchronized effects;
- scope/variant differences;
- familiar user expectations;
- irreversible/high-consequence behavior;
- asymmetry of information or power;
- incentives for misuse or strategic behavior;
- ambiguity, stale information, or partial knowledge;
- resource scarcity/contention where it changes user-visible semantics.

A hypothesis is a validation target, not a conclusion that the design is defective.

## 4. Plan risk-weighted scenario coverage

For each material hypothesis or design surface, consider scenario families such as:

- representative success;
- ordinary user error/mistake;
- exception or invalid request;
- partial completion/interruption;
- temporal transition/expiry/delay;
- concurrent or conflicting actor intent at the conceptual level;
- correction/invalidation/supersession;
- cancellation/withdrawal/reversal;
- recovery after an undesired state;
- stale/partial/ambiguous information;
- authority delegation/revocation/overreach;
- privacy/disclosure boundary;
- safety/high-consequence action;
- incentive abuse/gaming/fraud/manipulation;
- repeated use/accumulated history;
- scale/scarcity/contention only where it changes conceptual fit;
- product-variant/context shift;
- affected-party scenario where the initiator is not the primary harmed/benefited party;
- familiar-mental-model expectation mismatch;
- domain-specific rare but severe misfit.

Do not mechanically require every family for every project. Record why relevant families are included or omitted.

## 5. Prioritize consequence, plausibility, and uncertainty

Scenario priority should consider at least:

- severity if the design fails;
- plausibility/frequency;
- irreversibility or recovery difficulty;
- number/type of affected parties;
- authority/power asymmetry;
- uncertainty in current design assumptions;
- novelty/familiarity mismatch;
- evidence from domain experience/patterns;
- likelihood that the scenario crosses several concepts or lifecycle stages.

Avoid pretending the qualitative design analysis requires a numeric risk score. Use structured judgment appropriate to the domain.

## 6. Separate conceptual failure from implementation failure

Classify candidate scenarios carefully.

Phase 010 owns scenarios that test **conceptual promises and contextual fit**.

Examples include:

- the design allows an irreversible action without a conceptually adequate correction/recovery path;
- an authority model permits a user-visible consequence that contradicts the stated purpose;
- a lifecycle transition leaves affected parties unable to understand current truth;
- strategic users can exploit the concept semantics in a way that defeats another intended purpose;
- a familiar concept’s expected behavior fails in a plausible context.

Out of scope here are failures that depend only on engineering realization, such as:

- process crash;
- network packet loss;
- database corruption;
- CPU/memory exhaustion;
- thread races;
- storage latency;
- cryptographic implementation flaw;
- deployment outage;
- queue redelivery;
- runtime retry policy.

If an engineering failure would cause a materially different conceptual state that users must understand or recover from, specify the conceptual requirement without designing the runtime mechanism.

## 7. Plan correction ownership and reopen routes

For every validation finding, the phase must route any required change to the natural semantic owner rather than writing a Phase 010 override.

Likely destinations include:

- Phase 000/001 — context, purpose, need, success, affected-party, or assumption defect;
- Phase 002 — missing conceptual alternative;
- Phase 003 — undefined/inadequate concept behavior, lifecycle, authority, recovery, or history semantics;
- Phase 004 — bad boundary, completeness, independence, or genericity;
- Phase 005 — synchronization/application-action/automation defect;
- Phase 006 — dependence/scope/variant defect;
- Phase 007 — mapping/disclosure/feedback/visibility defect;
- Phase 008 — familiarity/genericity/catalog/terminology defect;
- Phase 009 — structural integrity/interference defect exposed by the scenario.

Plan how revised areas will be revalidated before Phase 010 exit.

## 8. Define finding dispositions

Use qualitative dispositions appropriate to the finding, such as:

- **Validated — design handles scenario coherently**;
- **Misfit found — correction required**;
- **Accepted limitation/boundary — explicit rationale required**;
- **Out of conceptual-design scope — downstream engineering concern**;
- **Insufficient evidence/context — blocking or explicitly bounded uncertainty**.

Do not use “accepted risk” as a generic escape hatch for a contradiction with an authoritative concept purpose or safety/authority boundary.

## 9. Plan recovery/correction validation

For scenarios involving undesired or mistaken states, determine whether conceptual recovery/correction behavior must be validated.

Potential questions include:

- Can an actor correct the mistake?
- Can affected parties discover that correction occurred?
- Is history preserved where needed?
- Is reversal possible, and if not, is irreversibility intelligible before commitment?
- Does recovery restore the original semantics or create a new state with different meaning?
- Do synchronized effects require coordinated correction?
- What happens when authority changes before recovery occurs?

This is conceptual recovery design, not saga/transaction/retry implementation.

## 10. Plan evidence and provenance

Identify sources that justify scenario selection, including where relevant:

- current project evidence;
- stakeholder/affected-party evidence;
- historical incidents or domain experience;
- policies/laws/standards used as contextual constraints;
- reusable concept/pattern lessons;
- prior phase findings;
- explicit hypotheses generated for adversarial review.

Distinguish established evidence from speculative stress scenarios.

## 11. Plan canonical/documentation effects

Apply the repository-wide documentation-governance contract.

Before creating Phase 010 documents, identify:

- incoming canonical owners the scenarios exercise;
- which validation results are merely phase evidence;
- which discovered limitations/non-goals/constraints require durable canonical ownership;
- which semantic corrections must update earlier canonical owners;
- whether a reusable misfit lesson belongs as additional catalog knowledge rather than duplicate project truth;
- which indexes/cross-links must change after corrections;
- duplicate misfit/scenario-register risks.

Do not create one permanent canonical document per scenario merely because the scenario was analyzed.

## 12. Derive project-specific subphases

Based on the validation surface, derive only the B–X workstreams actually needed.

Possible groupings include, as relevant:

- representative end-to-end success validation;
- temporal/lifecycle/correction validation;
- authority/affected-party/adversarial-intent validation;
- recovery/reversibility validation;
- variant/context-shift validation;
- domain-specific misfit campaigns;
- consolidated correction/revalidation passes.

These are examples, not a mandated sequence.

Group scenarios when they exercise the same design seam or risk. Split workstreams when separate contexts, authorities, or consequences would otherwise obscure reasoning.

## 13. Define completion evidence

Before beginning substantive work, state what evidence will be required for the final Phase 010 exit review.

At minimum plan evidence that:

- representative success scenarios still work end to end;
- material misfit hypotheses were exercised;
- high-consequence/uncertain surfaces received appropriate adversarial attention;
- findings have explicit dispositions;
- required corrections were made in natural owners and revalidated;
- accepted limitations/boundaries are explicit and do not contradict current promises;
- conceptual recovery/correction semantics are adequate where required;
- residual uncertainties are suitable for Phase 011 rather than hidden blockers;
- documentation/canonical state is coherent;
- no executable testing or implementation work entered authority.

## Required `010-A` output

The start-gate record must contain:

- Phase 009 handoff assessment;
- validation context/ensemble;
- representative-success baseline;
- misfit-hypothesis inventory;
- relevant scenario families and rationale;
- risk/consequence prioritization;
- conceptual-versus-engineering boundary decisions;
- correction/reopen routes;
- finding-disposition rules;
- recovery/correction validation plan;
- evidence/provenance plan;
- canonical/documentation plan;
- dependency-safe B–X subphase sequence;
- completion evidence requirements;
- final consolidation/exit-review subphase;
- implementation state.

## Gate decision

Use:

### READY TO BEGIN PHASE 010 SUBPHASES

The current design is mature enough for meaningful adversarial validation, validation coverage is risk/context driven, and project-specific work has been responsibly planned.

### NOT READY — VALIDATION PRECONDITIONS MISSING

Material structural integrity, canonical-authority, context, or validation-planning gaps prevent meaningful Phase 010 work.

This gate cannot declare Phase 010 complete and cannot authorize implementation.

## Implementation state

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet
