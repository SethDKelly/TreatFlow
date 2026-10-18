---
type: Phase Definition
title: Phase 010 — Scenario, Misfit, Exception, Failure & Adversarial Design Validation
description: Subjects the mature conceptual design to representative and risk-weighted adversarial scenarios to discover contextual misfits, correct design weaknesses, bound legitimate limitations, and establish readiness for methodology-wide closure.
tags: [phase-010, scenarios, misfits, exceptions, failures, adversarial-validation, recovery, concept-design]
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

# Phase 010 — Scenario, Misfit, Exception, Failure & Adversarial Design Validation

## Role in the lifecycle

Phase 010 is the final substantive validation phase before methodology-wide closure.

Phases 000–009 progressively establish purpose, concepts, behavior, modularity, composition, scope, mapping, familiarity/reuse, and whole-system integrity. Phase 010 now deliberately exposes that mature design to situations likely to reveal **contextual misfit**: conditions under which the conceptual form does not fit the context in which people will actually use, experience, depend on, or be affected by it.

The phase must include representative success validation as well as adversarial pressure. A design that survives only edge-case analysis but no longer achieves its central purposes is not valid.

## Methodological intention

Jackson’s discussion of form, context, and misfits emphasizes that design fitness criteria are effectively unbounded and partly unknowable; a designer cannot prove a list of requirements complete. Instead, designers should identify likely and consequential ways in which form and context may fail to fit and iteratively improve the design.[^jackson-misfits]

Phase 010 operationalizes that posture for concept design.

It selects representative and adversarial scenarios based on project context, consequence, uncertainty, domain experience, affected parties, and known design risks; traces current conceptual behavior through those scenarios; identifies misfits; corrects them in their natural semantic owners; and revalidates the resulting design.

[^jackson-misfits]: Daniel Jackson, "Form, context & misfits."

## Relationship to Phase 009

Phase 009 establishes structural whole-system integrity: current concepts should preserve their purposes under the known composition.

Phase 010 assumes that structural baseline and asks what happens when the system is placed into challenging contexts:

- mistakes;
- unusual timing;
- partial/incomplete situations;
- conflicting actors;
- revocation/correction;
- strategic misuse;
- recovery;
- stale or uncertain information;
- high-consequence decisions;
- privacy/safety/policy constraints;
- domain-specific edge conditions.

A known Phase 009 integrity violation cannot be reclassified as an adversarial validation target merely to move forward. Fix it first.

If a Phase 010 scenario exposes a previously hidden structural integrity violation, reopen Phase 009 or the earlier natural owner and then revalidate.

## Relationship to Phase 011

Phase 010 answers:

> Has the mature conceptual design been challenged strongly enough against realistic and adverse context, and have material misfits been corrected or explicitly bounded?

Phase 011 answers:

> Has the entire methodology been completed coherently, is canonical current truth reconciled, and is concept design ready to close?

Phase 011 is not another opportunity to defer unresolved Phase 010 defects. Phase 010 must hand off a validated current design, explicit accepted limitations, bounded uncertainty, and clearly separated downstream engineering obligations.

## Relationship to downstream engineering/testing

Jackson distinguishes software design from engineering partly by noting that design failures often arise because the specification itself is wrong for the context, not because implementation violated the specification.[^jackson-design]

Phase 010 therefore validates conceptual semantics and contextual fit, not implementation correctness.

It does **not** authorize executable acceptance tests, fuzzing, chaos engineering, penetration testing, performance/load testing, failure injection, implementation threat modeling, or runtime recovery mechanisms.

Where a downstream engineering failure could produce a user-visible conceptual condition that matters, Phase 010 may require the conceptual design to represent that condition—such as pending, uncertain, partial, failed, recoverable, or irreversible—without selecting the mechanism that creates or resolves it.

[^jackson-design]: Daniel Jackson, "Design vs. engineering."

## Governing Phase 010 support contracts

Phase 010 is further governed by:

- [010-A — Validation Scope, Misfit Hypotheses, Risk Coverage & Subphase Planning](010-a-start-gate.md);
- [Scenario, Misfit & Adversarial Validation Contract](scenario-validation-contract.md);
- [Phase 010 Consolidation, Exit Review & Phase 011 Handoff Template](exit-review-template.md);
- repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md);
- [Design-Only Guardrails](../../methodology/design-only-guardrails.md).

These establish validation and documentation obligations without prescribing a fixed scenario count, threat taxonomy, risk score, test notation, or B–X subphase sequence.

## Primary design questions

Phase 010 should answer, as relevant:

- Does the current design still support representative success scenarios end to end?
- Which contexts are most likely to expose a mismatch between the design and actual use?
- What happens when users make mistakes, misunderstand state, or act on stale/partial information?
- What happens under delay, expiration, correction, revocation, supersession, or long-lived history?
- What happens when multiple actors have conflicting goals, authority, information, or incentives?
- Can consequential actions be corrected or recovered from conceptually?
- Where is irreversibility real, and is it intelligible before commitment?
- Do automated/synchronized effects create hidden consequences in adverse contexts?
- Can actors game or exploit the conceptual rules while technically following them?
- Are privacy, safety, disclosure, policy, or affected-party concerns adequately represented where relevant?
- Do familiar concepts still meet user expectations at the edges, not only on the happy path?
- Does the same concept remain coherent across relevant product variants/context shifts?
- Which scenarios reveal genuine misfits versus legitimate out-of-scope boundaries?
- Which concerns are conceptual design defects versus downstream engineering realization concerns?
- After correction, does the design still satisfy previously validated success/integrity behavior?

## Required validation coverage

Every Phase 010 exit must establish or explicitly disposition:

- representative success paths;
- risk-weighted misfit hypotheses;
- relevant exception/mistake scenarios;
- relevant temporal/history/correction scenarios;
- relevant recovery/reversibility scenarios;
- relevant authority/affected-party scenarios;
- relevant strategic misuse/incentive scenarios;
- relevant privacy/safety/policy scenarios where material;
- relevant uncertainty/stale-information scenarios;
- variant/context-shift scenarios where material;
- domain-specific likely or severe misfits;
- every material finding disposition;
- correction ownership and propagation;
- revalidation after corrections;
- accepted limitations/non-goals/context boundaries;
- downstream engineering concerns separated from conceptual defects;
- residual uncertainty for Phase 011;
- documentation/index/reference coherence after validation and corrections.

This is risk/context coverage, not an exhaustive scenario enumeration requirement.

## Form, context, and ensemble discipline

A scenario only makes sense relative to the context considered part of the design ensemble.

Phase 010 should therefore be explicit about material context boundaries, including where relevant:

- actors and affected parties;
- environmental/organizational conditions;
- time horizon;
- external human/process dependencies;
- policy/legal context;
- scarcity/competition/incentives;
- trust assumptions;
- information availability;
- in-scope product variants.

If a serious scenario falls just outside the chosen boundary, challenge whether the boundary itself is a design mistake.

Do not expand the ensemble indefinitely. Record exclusions and uncertainty where they materially qualify closure.

## Representative-success discipline

Phase 010 must demonstrate that the mature design still fulfills important Phase 001 success framing.

Use representative scenarios to trace:

- purpose;
- concept behavior;
- application action/synchronization;
- scope/variant;
- mapping/feedback;
- authority/lifecycle semantics;
- resulting meaningful improvement.

A representative success scenario should not require implementation assumptions to explain why the conceptual outcome is achieved.

## Misfit discipline

A **misfit** is a concrete way in which the current design fails to fit a context that matters to its purpose or promise.

Misfits are especially useful because they are negative, concrete, and reviewable.[^jackson-misfits]

Potential kinds include:

- purpose misfit;
- behavioral incompleteness;
- concept-boundary misfit;
- composition/synchronization misfit;
- scope/variant misfit;
- mapping/mental-model misfit;
- authority/disclosure misfit;
- lifecycle/history/correction misfit;
- recovery/reversibility misfit;
- incentive/adversarial misfit;
- familiarity expectation misfit;
- context-boundary misfit.

Classifications support reasoning; they do not prescribe separate artifact families.

## Risk-weighted validation discipline

Phase 010 should spend more validation effort where one or more of these apply:

- severe consequence;
- difficult or impossible recovery;
- affected parties lack control/visibility;
- authority is delegated, disputed, or revocable;
- concept behavior is novel;
- familiar concepts may cause false transfer;
- several concepts synchronize;
- state/history is long-lived;
- actors have adverse incentives;
- earlier phases carried uncertainty;
- domain experience exposes known recurrent failure patterns;
- rare events could create disproportionate harm.

Do not require numeric scoring unless the project already has a meaningful domain-specific method. Qualitative design judgment is sufficient when transparent.

## Temporal and history discipline

Time should be varied deliberately when it can change semantics.

Test, where relevant:

- before/during/after validity windows;
- pending versus completed;
- delayed observation/action;
- expiration during activity;
- authority granted then revoked;
- correction after downstream consequences;
- supersession and repeated revision;
- action based on stale state;
- historical state interpreted under current rules.

Reason about conceptual transitions, not schedulers, jobs, clocks, transactions, or runtime protocols.

## Recovery, correction, and reversibility discipline

Recovery may mean:

- true reversal;
- correction while preserving history;
- compensation through a new conceptual state;
- invalidation/supersession;
- restoration with changed authority;
- acknowledgement of an irreversible outcome.

For consequential scenarios, ask what future actions remain possible, what current truth becomes, what history persists, who must know, and how synchronized effects are treated.

If the concept promises recovery/correction but has no adequate semantics for it, the design is incomplete.

## Authority, affected-party, privacy, safety, and policy discipline

When relevant to the project domain, Phase 010 should stress conceptual boundaries around:

- who may cause an effect;
- who/what is affected;
- delegation/revocation;
- information disclosure;
- notice/consent/deliberation;
- finality/irreversibility;
- competing obligations;
- safety constraints;
- policy/legal context.

These are user-facing semantic/design concerns. Phase 010 must not translate them into ACL schemas, cryptography, policy engines, middleware, or compliance workflows.

## Adversarial-intent and incentive discipline

A secure implementation can still embody concept rules that are easy to exploit.

Phase 010 should therefore ask what strategic actors can achieve **while following the conceptual rules**.

Examples may include:

- repetition/spam;
- strategic timing;
- hoarding/scarcity capture;
- selective disclosure;
- collusion/manipulation;
- exploiting correction or revocation timing;
- leveraging automation to amplify effects;
- exploiting ambiguous ownership/scope;
- variant arbitrage;
- inducing another actor to act under misleading expectations.

If such behavior plausibly defeats an intended purpose, it is a conceptual design concern.

## Scenario-combination discipline

Serious misfits often occur at intersections, such as:

- stale information + irreversible action;
- revocation + delayed correction;
- automation + hidden affected party;
- expiration + synchronized secondary effect;
- conflicting actors + scarce resource;
- familiar terminology + variant omission;
- correction + long-lived history.

Select high-value combinations rather than generating a combinatorial scenario matrix.

## Accepted limitation and boundary discipline

A design does not need to solve every conceivable context.

An unsupported scenario may be an acceptable boundary when:

- it is explicitly outside the intended mandate;
- exclusion does not contradict current purpose/concept promises;
- current terminology/mapping does not materially imply support;
- consequences are understood;
- the boundary is canonically documented;
- Phase 011 can evaluate the limitation transparently.

A serious known defect is not transformed into an acceptable limitation merely by labeling it one.

## Correction and reopening discipline

Jackson emphasizes design quality as iterative adjustment in response to flaws.[^jackson-great-design]

When Phase 010 exposes a design defect, update/reopen its natural owner:

- Phase 000/001 for context/purpose/success;
- Phase 002 for concept alternatives;
- Phase 003 for concept behavior/lifecycle/history/authority/recovery;
- Phase 004 for boundaries/completeness/independence;
- Phase 005 for synchronization/application actions;
- Phase 006 for dependence/scope/variants;
- Phase 007 for mapping/disclosure/feedback;
- Phase 008 for familiarity/genericity/terminology/catalog knowledge;
- Phase 009 for structural integrity/interference.

After correction, propagate downstream meaning and revalidate the triggering and materially adjacent scenarios.

[^jackson-great-design]: Daniel Jackson, "How great design happens."

## Finding disposition discipline

Every material finding must end with an explicit status, such as:

- **Validated**;
- **Misfit — corrected and revalidated**;
- **Accepted limitation/boundary**;
- **Downstream engineering concern**;
- **Insufficient evidence/context — blocking or explicitly bounded**.

Do not leave significant scenarios in an ambiguous “observed” state.

## Evidence and experience discipline

Misfits may be derived from:

- direct project/stakeholder evidence;
- affected-party evidence;
- historical/domain incidents;
- known design patterns/catalog lessons;
- policy/legal context;
- prior phase uncertainties;
- hypothetical adversarial stress reasoning.

Jackson notes that domain experience and patterns are particularly valuable because many important misfits cannot be predicted from an abstract requirement list alone.[^jackson-misfits]

Record provenance and confidence honestly.

## Expected durable outputs

By exit, current canonical knowledge should make discoverable, where applicable:

- design corrections caused by validation;
- accepted limitations/non-goals/context boundaries;
- durable recovery/correction/authority semantics discovered during validation;
- reusable misfit lessons when justified;
- downstream engineering obligations stated without implementation prescriptions;
- residual uncertainty suitable for final closure judgment.

Detailed scenarios, adversarial walkthroughs, rejected hypotheses, and evidence matrices belong primarily in phase records.

## Documentation and knowledge authority

Phase 010 is highly vulnerable to scenario-document bloat and shadow specifications.

Therefore:

- keep detailed scenario execution in phase records;
- update natural canonical owners with durable corrected semantics;
- do not encode exceptions only in a misfit register;
- make accepted limitations/context boundaries canonically discoverable;
- do not create one canonical document per scenario by default;
- link findings to affected canonical owners;
- separate reusable cross-project lessons only when they add distinct meaning;
- preserve provenance for domain/pattern evidence;
- supersede stale findings after correction;
- update indexes/links after substantive changes;
- apply the repository-wide OKF/documentation-governance audit before exit.

## Explicit exclusions

Phase 010 must not:

- create executable tests/test plans as design authority;
- create test harnesses/fixtures;
- perform fuzzing or chaos testing;
- perform penetration/security implementation testing;
- define load/performance tests;
- inject runtime faults;
- define database transaction/retry semantics;
- define monitoring/observability/runbooks;
- define infrastructure resilience;
- choose recovery architecture;
- design encryption/authentication/authorization implementation;
- produce executable prototypes or code.

## Entry criteria

Phase 010 may begin only when:

- Phase 009 has passed or passed with explicit scenario-dependent carry-forwards;
- one coherent current design exists;
- canonical design owners are discoverable;
- structural integrity violations are resolved;
- project context and in-scope variants are sufficiently explicit;
- `010-A` can derive a risk/context-driven validation plan without compensating for unfinished earlier design.

If basic design semantics remain unresolved, return upstream rather than calling them adversarial scenarios.

## Exit criteria

Phase 010 may exit only when its final project-specific exit review establishes that:

- representative success behavior remains valid;
- materially likely/consequential misfits received appropriate validation pressure;
- relevant temporal, recovery, authority, affected-party, misuse, variant, privacy/safety/policy scenarios have been addressed where applicable;
- every material finding has an explicit disposition;
- required design corrections are present in their natural canonical owners;
- corrected areas have been revalidated;
- accepted limitations/non-goals/context boundaries are explicit and do not contradict current promises;
- no known structural integrity contradiction remains;
- downstream engineering concerns are separated from conceptual-design defects;
- residual uncertainty is explicit and suitable for Phase 011 closure judgment;
- current documentation/index/reference state is coherent and OKF-conformant;
- no executable testing or implementation work has entered design authority;
- Phase 011 can audit methodology completion without first resolving a known substantive misfit.

## Control structure

Phase 010 begins with:

- [010-A — Validation Scope, Misfit Hypotheses, Risk Coverage & Subphase Planning](010-a-start-gate.md).

`010-A` derives only the project-specific validation workstreams required by the actual design/context/risk surface.

The final project-specific subphase performs Phase 010 consolidation, documentation-integrity audit, exit review, and Phase 011 handoff using the [Phase 010 exit-review template](exit-review-template.md).

The template does not prescribe the count or letters between those control points.

## Exit outcomes

Use the repository-wide outcomes:

- **PASS** — Phase 010 establishes adequate representative/adversarial validation and Phase 011 may begin.
- **PASS WITH CARRY-FORWARD** — validation is sufficient while explicit bounded closure questions, accepted limitations, or downstream engineering obligations continue to Phase 011.
- **NOT READY TO EXIT** — material validation gaps, uncorrected misfits, failed revalidation, weak recovery/authority/context semantics, documentation ambiguity, or implementation contamination require more Phase 010 work or reopening an earlier phase.

## Implementation state

Throughout Phase 010, including after successful exit:

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet

The only authorized handoff is into Phase 011 methodology-completeness/canonical-consolidation/concept-design closure.
