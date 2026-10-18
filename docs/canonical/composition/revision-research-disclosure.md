---
okf_version: "0.2"
type: Canonical Composition Specification
title: TreatFlow — Revision, Research Qualification and Controlled Disclosure Composition
description: Qualified evidence currentness, guarded availability and prospective reassessment as application-level semantics.
tags: [treatflow, composition, phase-005, revision, research, disclosure]
---

# Revision, Research Provision and Controlled Disclosure — Current Composition Semantics

**Authority:** [005-D execution record](../../phases/005/005-d-treatflow-execution.md). These application-level composition decisions supplement—but do not alter—the independent [Revision](../concepts/revision.md), [Research Provision](../concepts/research-provision.md) and [Controlled Disclosure](../concepts/controlled-disclosure.md) contracts. [005-C](observation-stewardship-revision.md) owns observation-to-revision correspondence; [application action surface](application-action-surface.md) owns exposure classifications. These rules remain subject to 005-E chain/authority review and 005-F/G consolidation. **No real data release is authorized.**

## Semantic correspondence and evidence availability

An `Observation.EvidenceItem`, `Revision.Subject`, `Revision.Assertion`, `ResearchProvision.EvidenceReference`, `ResearchProvision.Provision`, and `ControlledDisclosure.Material` are **different conceptual identities**. Their correspondence is not established by equal names, shared event times, or mere membership in one report.

Where justified, an application interpretation may relate:
- a particular qualified evidence assertion to a revision subject and its historically distinguishable assertions;
- an eligible qualified evidence reference to a proposed research inquiry, including the scope and *standing at qualification time*;
- the specific material/audience/scope of an approved disclosure to a separately qualified provision **only if** the proposed content and restrictions actually match.

The necessary references, qualification basis and allowed interpretation must be demonstrably available. No concept may inspect hidden protected data or substitute a presumptive mapping. If relevant standing, coverage or material scope is unknown, the result must honestly remain **unqualified, unknown or unavailable**, not silently inferred.

## D-01 — Revision standing qualifies prospective research interpretations

**Application intention:** prevent an inquiry's evidence fitness from treating known factual supersession, contested branches or changed measurement meaning as uncontested current evidence.

- **Participating actions:** `Revision.InspectHistory` provides legitimately inspectable factual standing; `ResearchProvision.PrepareScope` identifies eligible abstract evidence; `ResearchProvision.QualifyProvision` records relevant time/unit/coverage/uncertainty and known dispute/supersession qualifications; `ResearchProvision.InspectProvision` provides an entitled explanation.
- **Binding:** a justified `Revision.Subject/Assertion` relation to a particular `ResearchProvision.EvidenceReference` and qualification epoch/standing; the original Observation source assertion is not rewritten.
- **Conditions:** inspection must be within entitled scopes, and qualified standing must actually be known. If a later revision is not visible/authorized to this context, no automatic factual knowledge is inferred.
- **Result:** future or newly reassessed provisions distinguish current unopposed, superseded, contested, or unknown standing. Inconclusive/unsuitable is a legitimate research outcome.
- **Temporal boundary:** a delivered or earlier inspected provision remains a historical interpretation *as of its qualification*, not evidence of present factual standing. No retroactive replacement of prior recipients' copies, and no mandatory automatic cross-concept reaction on every `Revision.Amend`.
- **Non-exposure:** `PrepareScope` and `QualifyProvision` stay internal; factual private history is not automatically public.

This is an **application-level guarded qualification relationship**, not an unconditional `Amend → QualifyProvision` trigger.

## D-02 — Qualified research evidence and protected disclosure remain two distinct approvals

**Application intention:** make evidence available for a research inquiry only when **both** its scoped qualification and separately lawful/legitimate prospective disclosure conditions hold.

- **Participating actions:** `ResearchProvision.RequestEvidence`, `PrepareScope`, `QualifyProvision`, and optionally `Provide`; `ControlledDisclosure.Propose`, `Assess`, `Decide`, and `MakeAvailable` under their own distinct guards.
- **Binding:** an expressly qualified `Provision`'s eligible evidence/limitations correspond to a specific `Material` and `Audience` within the operative disclosure scope. A favorable scientific suitability assessment does **not** create that correspondence or authorization.
- **Conditions:** a legitimate disclose-able material scope and authorized audience; valid protection assessment; operative non-suspended decision; eligible distributor; research provision fit/qualified for its declared purpose; every intrinsic `Provide` and `MakeAvailable` guard remains satisfied.
- **Application outcome:** a **composed, guarded provision** may involve both `MakeAvailable` and `Provide` for a permitted audience, preserving required caveats. The two actions express distinct meanings; neither is independently a public download.
- **Denied, incomplete or unsafe:** if approval is absent/denied, suspended, scope mismatched or material not qualified, **neither delivery action is available through this composed intention**. `InspectProvision` may still provide an entitled, non-sensitive unsuitable/inconclusive assessment when justified; a disclosure decision may still exist independently for nonresearch purposes.
- **No fake concurrency:** this describes conceptual participation under aligned conditions, not an ordering, transaction, runtime atomicity, endpoint or workflow engine.

**Separate independence test:** `ControlledDisclosure.Decide` can legitimately decline even scientifically useful material; `ResearchProvision.QualifyProvision` can deem evidence unfit even if the material could legally be released. Do not over-synchronize these judgments.

## D-03 — Changed material triggers prospective reassessment obligation, not automatic revocation

**Application intention:** avoid reusing an old authorization for materially different evidence or a new intended audience, while preserving the fact of past exposure.

- **Candidate initiating facts:** a known `Revision.Amend`, dispute/currentness change, an altered qualified provision, or a changed disclosure scope *may* be materially relevant to an existing `ControlledDisclosure.DisclosureDecision`. The correspondence must be justified; a generic revision does not automatically concern released material.
- **Participating action candidates:** authorized `ControlledDisclosure.Assess`, `Decide`, and where legitimately required `SuspendFuture`, each under its own intrinsic authority guards.
- **Guarded rule:** when a contemplated future material/audience scope differs materially from the scope already justified, **the old approval is not sufficient to authorize new `MakeAvailable` for that changed scope**. The prospective availability must be reconsidered and appropriately decided before such exposure.
- **No forced authority transfer:** the occurrence of `Revision.Amend` cannot automatically invoke a protected decision on behalf of an unauthorized actor; if reassessment authority is unavailable, the changed scope remains **not authorized**, rather than silently released.
- **Historical effect:** prior `ExposureRecord` remains; `SuspendFuture` constrains future availability under its decision but cannot recall previously delivered material.
- **Open to 005-E:** whether a distinct protected conceptual reaction is justified by *known* material change, and whether implied chains can loop or over-constrain an unrelated existing approval.

This is a **prospective safety invariant and guarded reassessment obligation**, not an automatic global shutdown or a promise of third-party deletion.

## Counterexample and authority ledger

| Situation | Required semantic result |
|---|---|
| A report of one group of five later corrected to four | Historical original preserved; any **new** research qualification treats justified known corrected/contested standing appropriately |
| Competing factual successors | No arbitrary unique current result; suitability may be limited/unsuitable |
| Research request with self-selected unknown exposure | Insufficient evidence/limitations remain explicit even if disclosure could be approved |
| Evidence scientifically qualified, but household reidentification risk remains unresolved | No protected disclosure approval; no composed raw provision |
| Protected disclosure approved, but research units/gaps do not support requested inference | No false favorable research qualification; nonresearch decision remains meaningful |
| Existing released material revised | Old exposure history persists; materially changed **future** material requires renewed scope consideration |
| Unauthorized challenger or source holder requests release | No implicit `Decide`, `MakeAvailable`, `Provide` or `Amend` rights |
| Recipient already downloaded material | No fictional recall, erase or retroactive version repair |

## Boundaries and deferred checks

- [005-E](../../phases/005/005-a-treatflow-execution.md): test guard compatibility, overlapping candidate triggers, chaining/repeated consequences, denied authorization, conceptual automation, under-/over-synchronization; revise D-01–D-03 if a chain cannot be justified.
- [005-F/G](../../phases/005/005-a-treatflow-execution.md): ensure accepted application actions and hypotheses trace to P-01–P-06 and remain discoverable without duplicate owners.
- **Phase 006** will assess extrinsic inclusion/dependence; no concept is intrinsically rewritten or permanently required merely because these composed interactions can be useful.
- **Before any real data collection or release:** establish privacy/consent/age policies, nonparticipant/child safeguards, reidentification controls, lawful actor authority, retention/withdrawal and scientific/operational validation. Those substantive questions are unresolved.

No algorithm for anonymization, Poisson evaluation, storage/version migration, API, queue, transaction, implementation sequence or execution environment is specified.

## 005-E chaining, denial and prospective scope qualification

[005-E audit](../../phases/005/005-e-treatflow-execution.md) rejects unconditional `Amend → QualifyProvision → MakeAvailable` and `Decide → Provide` chains, as well as automatic global suspension following any challenge. D-01 is an **interpretation guard when information is legitimately available**, not a broadcast to historical copies. D-02 is **joint guarded availability**, not independently public actions or a promise that a researcher can access protected data. D-03 makes materially changed *future scope* unavailable under an insufficient previous decision; it **does not automatically initiate protected `Assess`, `Decide` or `SuspendFuture` on behalf of an unauthorized actor**. Past ExposureRecords remain intact. No unconditional reactive automation is presently approved.

## 005-F purpose coverage and bounded synergy

[005-F consolidation](../../phases/005/005-f-treatflow-execution.md) preserves D-01 historically contextualized prospective evidence fitness, D-02 distinct scientific qualification and protected prospective permission, and D-03 no changed-scope release under an insufficient earlier authorization. Together with eligible C-02 history, these rules support a **provisional cross-purpose benefit**: interpretations can acknowledge known corrected evidence without making research quality a substitute for nonparticipant protection. No retroactive recipient notification/copy repair, unconditional automatic chain, public raw release, or verified science/consent claim is created. Phase 005-G may reject the synergy claim while retaining necessary guard relationships.
