---
type: Validation Contract
title: Scenario, Misfit & Adversarial Validation Contract
description: Defines how Phase 010 selects, executes, dispositions, corrects, and documents representative and adversarial conceptual-design scenarios without becoming executable testing or implementation engineering.
tags: [phase-010, scenarios, misfits, adversarial-validation, recovery, correction, concept-design]
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

# Scenario, Misfit & Adversarial Validation Contract

## Purpose

This contract defines the reusable Phase 010 discipline for validating a mature conceptual design against representative use, exceptions, temporal change, mistakes, conflicting actors, misuse, recovery, authority, incentives, safety/privacy concerns, and domain-specific misfits.

It is intentionally **scenario-driven but not test-driven**.

The goal is to discover where the current conceptual form does not fit its real context, refine the design when appropriate, and leave explicit boundaries where the design intentionally does not promise more.

## Core principle: seek misfit, not impossible completeness

Jackson’s account of misfits, drawing on Christopher Alexander, emphasizes that the fitness criteria for designs used by people are effectively unbounded and partly unknowable. The practical designer therefore seeks likely and consequential negative scenarios rather than pretending requirements can be made complete.[^jackson-misfits]

Phase 010 must therefore be judged by the quality and relevance of its validation pressure—not by the number of scenarios produced.

[^jackson-misfits]: Daniel Jackson, "Form, context & misfits."

## Preconditions

Phase 010 assumes that:

- the current design has passed Phase 009 structural integrity review;
- current concept/synchronization/scope/mapping/familiarity knowledge is coherent;
- known structural contradictions have already been corrected;
- residual Phase 009 concerns are genuinely scenario/context dependent;
- the project can distinguish conceptual validation from implementation testing.

If these do not hold, reopen the appropriate earlier phase before continuing.

## Scenario anatomy

A useful scenario record should identify, as relevant:

- **context/variant** — where the scenario occurs;
- **actors/affected parties** — including non-initiators;
- **starting conceptual state** — only the state relevant to reasoning;
- **trigger/intent** — what initiates the situation;
- **application actions/synchronizations involved**;
- **temporal assumptions**;
- **authority/disclosure assumptions**;
- **expected purpose/outcome**;
- **challenging condition**;
- **observed conceptual consequence**;
- **fitness judgment**;
- **finding disposition**;
- **correction owner/reopen destination**, if required;
- **revalidation result**, after correction.

This is not a Given/When/Then requirement and must not become executable fixture syntax by default.

## Scenario families

Projects should draw selectively from the following families according to their domain and risks.

### Representative success

Exercise the mature design through ordinary situations that demonstrate its primary purposes end to end.

This validates that later refinements have not accidentally broken the central design.

### User mistake and invalid action

Explore mistaken targets, wrong assumptions, accidental activation, duplicate attempts, stale intent, invalid combinations, or actions taken without understanding consequences.

Ask whether the conceptual model provides adequate prevention, explanation, correction, or recovery.

### Partial completion and interruption

Where multi-step conceptual activity exists, ask what is true when completion does not occur.

Do not model runtime transaction machinery. Model only user-visible or semantically meaningful incomplete states.

### Temporal transition

Exercise time-dependent states such as pending, expiration, deadlines, delayed effects, inactivity, supersession, revision, aging, or historical transition.

Ask whether current truth and future action remain intelligible.

### Conflicting actor intent

Exercise situations in which actors have incompatible goals, overlapping authority, competing claims, or different knowledge.

The aim is conceptual fit, not low-level concurrency control.

### Correction, invalidation, and supersession

Exercise what happens after an earlier state/action is discovered to be wrong, withdrawn, replaced, invalidated, or superseded.

Validate historical truth, current truth, affected-party visibility, and downstream synchronized consequences.

### Cancellation, withdrawal, reversal, and recovery

Ask whether an undesired outcome can be reversed or compensated conceptually, what cannot be reversed, and how that distinction is understood before and after action.

### Authority and delegation

Exercise direct, delegated, conditional, revoked, expired, disputed, or ambiguous authority.

Ask whether the design ever lets an actor achieve an effect that conflicts with the authority semantics promised by another concept.

### Privacy and disclosure

Where relevant, test whether state/actions/synchronizations reveal information to actors who should not conceptually receive it, or hide information from affected parties who need it to act correctly.

Do not design encryption, access-control middleware, or storage policy here.

### Safety and high-consequence action

Where consequences may be difficult to reverse or materially harmful, test warning, deliberation, authority, affected-party, scope, and recovery semantics.

### Strategic misuse and incentives

Ask how rational actors might game, exploit, manipulate, spam, hoard, evade, retaliate, arbitrage, impersonate, collude, or otherwise use concept semantics against intended purposes.

The threat need not be criminal to expose a design misfit.

### Information uncertainty

Exercise stale, missing, incomplete, conflicting, inferred, disputed, or low-confidence information where users must still decide or act.

### Repetition and accumulated history

Exercise repeated actions or long-lived history to expose problems that do not appear in one-shot scenarios, such as clutter, lock-in, forgotten effects, compounding authority, unresolved artifacts, or interpretation drift.

### Scarcity, contention, and scale-as-context

Use scarcity/contention/scale only when it changes the conceptual experience or fairness of the design.

Do not turn Phase 010 into performance/load engineering.

### Variant/context shift

Exercise the same concept across in-scope Phase 006 variants or materially different contexts to verify that intrinsic meaning survives while product composition differs.

### Affected-party scenario

Construct scenarios from the perspective of a party affected by the design who is not the primary initiating user.

This is especially useful where power, externalities, disclosure, safety, or irreversible consequences are asymmetric.

### Familiarity expectation

Exercise expectations imported by familiar concepts/terminology identified in Phase 008.

Ask whether a plausible user prediction based on prior familiarity would be correct in edge or adverse contexts, not only on the happy path.

## Misfit taxonomy

A Phase 010 finding may reveal several kinds of design/context mismatch.

Useful diagnostic categories include:

- **purpose misfit** — the design cannot achieve an intended improvement in the scenario;
- **behavioral misfit** — concept actions/state do not cover necessary behavior;
- **boundary misfit** — behavior belongs in a different or additional concept;
- **composition misfit** — synchronization/application action creates wrong or missing combined behavior;
- **scope misfit** — a product subset/variant is incoherent in the tested context;
- **mapping misfit** — users cannot perceive, predict, or correct the relevant semantics;
- **authority misfit** — action/effect does not align with legitimate authority;
- **temporal/history misfit** — current/historical/corrected state becomes ambiguous or misleading;
- **recovery misfit** — the design cannot adequately handle an undesired but plausible state;
- **incentive/adversarial misfit** — rational misuse defeats an intended purpose;
- **familiarity misfit** — established expectations transfer incorrectly;
- **context-boundary misfit** — project assumptions exclude a context that must actually be considered.

These categories support diagnosis; they do not mandate separate documents.

## Misfit versus limitation

Do not label every unsupported scenario a defect.

An **accepted limitation/boundary** may be valid when:

- the excluded context is explicitly outside the product/design mandate;
- the limitation does not contradict an existing purpose or concept promise;
- affected parties are not misled about the boundary where that matters;
- the consequence is understood and acceptable to the design authority;
- the boundary is documented in the natural canonical owner;
- the limitation does not merely defer a serious known design flaw to implementation or operations.

A supposed limitation is actually a misfit when the current design claims or strongly implies support for the scenario but fails to fit it.

## Misfit versus downstream engineering concern

Phase 010 validates the conceptual behavior that should hold **regardless of implementation strategy**.

A downstream engineering concern may be recorded for handoff when the problem depends on implementation qualities rather than conceptual semantics—for example availability, latency, process failure, corruption, cryptographic realization, deployment topology, or storage consistency.

However, if such an engineering failure creates a user-facing conceptual condition that must be understood—for example “pending,” “uncertain,” “partially completed,” or “recoverable”—the conceptual requirement belongs in the design even though the mechanism does not.

## Representative-success validation

Adversarial validation must not ignore the ordinary path.

For materially important Phase 001 success framing, demonstrate that the current mature design still supports representative success through:

- appropriate concept behavior;
- current application actions;
- synchronizations;
- in-scope product variant;
- mapping/feedback semantics;
- authority/lifecycle rules.

If a representative success case fails, treat it as a blocking design defect rather than an edge case.

## Risk-weighted coverage

Use judgment to allocate validation effort.

Increase attention where one or more of these apply:

- consequence is severe;
- recovery is difficult/impossible;
- affected party lacks control or visibility;
- authority is delegated/ambiguous;
- concept is novel;
- familiarity may create false expectations;
- several concepts synchronize;
- state/history is long-lived;
- actors have opposing incentives;
- earlier phases carried uncertainty;
- domain experience shows recurring failures;
- rare scenarios can create disproportionate harm.

Do not use scenario count as a proxy for coverage quality.

## Temporal reasoning

Phase 010 should deliberately vary time when time can change meaning.

Useful probes include:

- before/during/after validity windows;
- delayed action or observation;
- authority granted then revoked;
- correction after downstream consequences;
- historical state viewed under current rules;
- expiry during an ongoing conceptual activity;
- repeated correction/supersession;
- future action based on stale state.

Reason in conceptual transitions, not scheduler or transaction implementation.

## Recovery and correction discipline

Recovery is not automatically “return to previous state.”

Ask:

- Is true reversal possible?
- Is a compensating conceptual state required instead?
- What history must remain visible?
- Which affected parties must be informed?
- Which synchronized effects require further actions?
- Does restored availability imply restored authority?
- Does correction change current truth without erasing historical truth?

If recovery semantics are missing, update the natural concept/composition/mapping owner.

## Authority, safety, privacy, and policy discipline

These concerns are conditional on domain relevance but cannot be ignored when clearly material.

Phase 010 should validate **conceptual boundaries and consequences**, such as:

- who may cause an effect;
- who is affected;
- what may be known or disclosed;
- what consent/notice/deliberation is conceptually required;
- what action remains possible after revocation;
- what happens under conflicting obligations;
- whether a safety/policy constraint contradicts or qualifies a concept purpose.

Do not translate these directly into roles/ACLs, encryption, compliance workflows, or enforcement middleware.

## Adversarial-intent discipline

Adversarial validation asks what actors can do **within the conceptual rules**, not merely what attackers can do by exploiting code.

Examples include:

- repeated action to dominate a collective mechanism;
- strategic timing;
- selective disclosure;
- exploiting revocation timing;
- creating artifacts that others cannot practically correct;
- leveraging automation to amplify effects;
- taking advantage of ambiguous ownership or scope;
- exploiting product-variant differences;
- inducing another actor to act under a misleading mental model.

If the conceptual rules make the misuse possible and consequential, it is a design concern even if the implementation is secure.

## Scenario combination discipline

Many serious misfits require combining conditions.

Where useful, combine dimensions such as:

- authority revocation + delayed correction;
- automation + affected party without visibility;
- expiration + synchronized secondary effect;
- stale information + irreversible action;
- variant omission + familiar terminology;
- conflicting actors + scarce resource;
- correction + long-lived history.

Do not produce combinatorial scenario explosion. Select combinations where interactions are plausible and consequential.

## Iteration and reopening

Jackson emphasizes design quality as iterative refinement in response to detected flaws.[^jackson-great-design]

A Phase 010 finding may therefore reopen any earlier design phase.

When a correction occurs:

1. update the natural canonical owner;
2. propagate affected downstream semantics;
3. repeat relevant earlier exit checks when material;
4. rerun the triggering Phase 010 scenario;
5. rerun materially adjacent scenarios if the correction changes their assumptions;
6. record the validation result, not a duplicate copy of the corrected design.

[^jackson-great-design]: Daniel Jackson, "How great design happens."

## Finding dispositions

Every material scenario finding must end in an explicit disposition.

Recommended dispositions:

### VALIDATED

The current design handles the scenario coherently and no design correction is required.

### MISFIT — CORRECTION REQUIRED

The scenario reveals a design/context mismatch. Record the natural owner, correction, propagation, and revalidation.

### ACCEPTED LIMITATION / BOUNDARY

The scenario is intentionally outside the design promise or the limitation is accepted. Record scope, rationale, consequence, and any disclosure/constraint obligations.

### DOWNSTREAM ENGINEERING CONCERN

The conceptual behavior is adequate, but downstream architecture/engineering must address a realization risk. State only the conceptual obligation/concern, not an implementation solution.

### INSUFFICIENT EVIDENCE / CONTEXT

The project cannot responsibly judge the scenario yet. Classify whether that uncertainty blocks Phase 010/011 or can be explicitly bounded at closure.

## Finding severity and blocking posture

Phase 010 does not mandate a numerical severity scale.

A finding is blocking when, for example:

- representative success cannot be achieved;
- a material concept purpose is contradicted;
- high-consequence behavior lacks adequate authority/disclosure/recovery semantics;
- accepted scope is internally incoherent;
- a known misfit would materially mislead or harm affected users under plausible conditions;
- the project cannot determine whether a major risk is inside/outside its design mandate;
- the correction has not been propagated/revalidated.

## Evidence discipline

Scenario generation should distinguish:

- **evidence-derived scenarios** — grounded in actual stakeholder/domain/history/policy evidence;
- **pattern/experience-derived scenarios** — grounded in known reusable design lessons;
- **hypothetical stress scenarios** — generated to challenge assumptions;
- **known incidents/misfits** — concrete prior failures relevant to the domain.

Hypothetical does not mean unimportant, but its provenance and uncertainty should be clear.

## Documentation and OKF discipline

Phase 010 can produce enormous documentation volume unless controlled.

Therefore:

- phase records own scenario execution and detailed reasoning;
- canonical owners contain only durable corrected semantics, accepted limitations, context constraints, or reusable lessons;
- do not create one canonical file per scenario by default;
- consolidate closely related misfits into coherent records where useful;
- link scenario findings to the canonical owner they validate or change;
- preserve provenance for externally derived misfit evidence;
- supersede stale findings when corrections invalidate them;
- indexes should expose current validation status/entry points, not duplicate every scenario result;
- a reusable catalog lesson should be separated only if it adds durable cross-project meaning;
- apply repository-wide OKF/documentation-governance rules before exit.

## Explicit exclusions

Phase 010 must not become:

- unit/integration/end-to-end test planning;
- executable acceptance-test authoring;
- property-based test design;
- fuzzing/chaos engineering;
- penetration testing;
- load/performance testing;
- runtime failure injection;
- database transaction/retry design;
- incident-response/runbook design;
- monitoring/observability engineering;
- infrastructure resilience engineering;
- code-level threat modeling;
- implementation security architecture.

These may be downstream engineering activities informed by conceptual obligations discovered here.

## Completion standard

Phase 010 is complete when:

- central success paths have survived validation;
- likely/consequential misfits have received risk-appropriate pressure;
- material temporal, authority, recovery, affected-party, misuse, and variant scenarios have been addressed where relevant;
- every material finding has an explicit disposition;
- required corrections are present in their natural canonical owners;
- corrected areas have been revalidated;
- accepted boundaries/limitations are explicit and do not contradict current promises;
- downstream engineering concerns are separated from conceptual findings;
- residual uncertainty is explicit and suitable for Phase 011 closure judgment;
- documentation remains coherent and non-duplicative;
- implementation remains not started and not authorized.
