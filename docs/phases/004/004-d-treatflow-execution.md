---
type: Phase Execution Record
title: TreatFlow 004-D — Controlled Disclosure and Research Provision Modularity
description: Adversarial specificity, completeness, independence and genericity review of protected availability and qualified inquiry.
tags: [treatflow, phase-004, modularity, disclosure, research]
---

# TreatFlow — 004-D Controlled Disclosure & Research Provision Modularity

## Formal decision

**004-D COMPLETE — RETAIN TWO REFINED CANDIDATE BOUNDARIES, SUBJECT TO 004-E INDEPENDENT RECHECK; 004-E NEXT ELIGIBLE AFTER MERGE.**

- **Controlled Disclosure: RETAIN / CLARIFY.** Its purpose is an independently valuable decision about prospective availability to an audience with restrictions, protection and exposure history, whether or not recipients have a research use.
- **Research Provision: REFRAME / REDUCE as research-evidence qualification and scoped provision.** Its independently valuable behavior is determining whether a specified inquiry has an intelligible and appropriately qualified evidence scope, including a reasoned *unsuitable* result, even when there is no authority to deliver the material. Delivering qualified evidence is optional, conditioned on separately legitimate availability; it cannot itself authorize disclosure.
- **Combined sharing/research concept: REJECT FOR NOW.** Requiring every disclosure to be a research inquiry overloads sharing with scientific semantics; requiring every research suitability assessment to involve a release makes qualified negative findings unavailable independently.

These findings are **provisional boundary dispositions, not Phase 004 exit**. [004-E](004-a-treatflow-execution.md) must attempt to falsify both identities using peer-removal and minimal-purpose tests. The five-candidate count remains negotiable.

Inputs: [004-A audit plan](004-a-treatflow-execution.md), [Phase 003 exit](../003/003-g-treatflow-exit-review.md), [Controlled Disclosure](../../canonical/concepts/controlled-disclosure.md), [Research Provision](../../canonical/concepts/research-provision.md), [Phase 002 alternative decompositions](../002/002-c-treatflow-execution.md), and [P-02/P-03/P-04/P-06 purposes](../../canonical/purpose/purposes.md).

## 1. Competing boundary experiments

| Alternative | Counterexample / independent purpose test | Decision |
|---|---|---|
| **Disclosure only** | A curator must explain why an apparently available sample cannot support arrival-rate inference; access authorization alone says nothing about denominator, units, or self-selection | Insufficient for research-qualification purpose |
| **Research Provision only** | An operator needs to withhold precise household-linked information even when a research question and measurement are well formed | Insufficient for nonparticipant-protection purpose |
| **Combined disclosure and provision** | A nonresearch restricted release and a no-release scientific suitability finding serve separable human purposes | Reject as overloaded under current scope |
| **Research output/download artifact** | Providing a CSV with caveats is an output, not an independent stateful function; formatting/delivery can exist without scientific fitness assessment | Reject artifact-centered identity |
| **Independent disclosure plus inquiry qualification** | Legitimate future availability and meaningful evidence suitability can each be decided without the other's actions | Retain as working boundary, with explicit generic types and no implicit synchronization |
| **Analysis-only external research** | Researchers may do all inference externally; TreatFlow must still avoid presenting unqualified evidence as representative, but need not build a statistical-analysis suite | Preserve external analysis; no Poisson engine implied |

## 2. Specificity, minimal completeness and independence

**Controlled Disclosure** has one purpose: authorize, restrict, deny or suspend *prospective availability*. A decision can be meaningful for any protected material and intended audience without seeing Research Provision state. Remove `Decide`, and there is no justified permission/denial; remove `MakeAvailable` and the concept cannot distinguish approval from actual exposure; remove `SuspendFuture` and prospective withdrawal meaning is lost. Its abstract `Material` and `Audience` are identity/scope parameters, not research objects.

**Research Provision** has one refined purpose: assess and convey what qualified evidence exists for a bounded inquiry and why it may or may not be fit for the intended analysis. A reasoned **unsuitable/unavailable assessment** independently helps a recipient avoid invalid inferences even without access authorization or delivery. Remove `PrepareScope` and no evidence/coverage domain can be assessed; remove `QualifyProvision` and evidence is not interpretable; remove `InspectProvision` and the conclusion cannot be used. The optional `Provide` requires independent authority but does not create it. If 004-E finds its only practical function is a bundle formatter, the candidate must merge/reframe rather than survive by assumption.

**Peer-removal:** With all other concepts absent, Controlled Disclosure can govern hypothetical Material and Audience; Research Provision can evaluate hypothetical EvidenceReference and InquiryScope and return a qualification/unsuitability result. This does **not** prove these two must always be included together in TreatFlow: product inclusion belongs to Phase 006.

**Genericity:** `Material`, `Audience` and `EvidenceReference` can be generic identities; scope, relevant measurement units, uncertainty, temporal exposure completeness and sampling limitations cannot be erased by identity permutation without changing the purpose. Neither concept imports Observation's private types.

## 3. Protected and adversarial scenarios

- **Rare household + fine time:** a nonparticipant or child may be exposed through combined geography/timestamp; no automatic safe aggregation threshold; without defensible protection basis, availability must remain withheld.
- **Scientific suitability without permission:** the inquiry can be assessed as potentially meaningful without granting data access. A favorable research assessment does not authorize distribution.
- **Permission without scientific suitability:** an authorized disclosure does not demonstrate representative sampling, known monitored intervals or stationary arrival rates; research assessment may be inconclusive or unsuitable.
- **Group of five:** one arriving group must not be transformed into five independent interarrival times.
- **Missing exposure and reported zero:** the research qualification must distinguish claimed complete watched periods from gaps, unknown completeness and empty reporting.
- **Disputed or corrected input:** the recipient cannot be falsely told a historical provision is necessarily current after source correction; no automatic cross-concept revision propagation is assumed.
- **Withdraw after release:** `SuspendFuture` blocks future authorized exposures; it does not recall previously obtained copies. No concept promises third-party deletion.
- **Small seasonal operator:** the concepts require meaningful eligibility/qualification decisions, not an assumed enterprise access-review staff or built-in analytics team. Feasibility remains unvalidated.

## 4. Canonical re-specification

[Controlled Disclosure](../../canonical/concepts/controlled-disclosure.md) receives an explicit independence and minimum-completeness clarification, retaining its purpose, OP, abstract state/actions and prospective history. [Research Provision](../../canonical/concepts/research-provision.md) receives a narrower **suitability-first** purpose, a revised OP where an inquiry is qualified or rejected *before delivery*, and a clarification that `Provide` is an optional authorized result, not its characteristic independent value. Their existing canonical owners remain unique; no new research-analysis or access-control concept is created.

## 5. Carry-forward and exclusions

**004-E:** attempt a stronger peer-removal and no-delivery test for Research Provision; test whether scientific qualification belongs intrinsically with Observation or is merely a disclosure-output annotation. Recheck each concept's Phase 003-quality re-specification, generic parameter boundaries and purpose traceability; reject/merge/reframe any failing candidate.

**Phase 005 (hypotheses only):** appropriate future composition between qualified evidence, source correction, research suitability and authorized prospective release; no executable or authoritative synchronization yet.

**Later design/prelaunch obligations:** consent and age eligibility, protecting children and nonparticipant households, safe disclosure criteria and accountability, retention and withdrawal limits, sample/Poisson research-method validation, practical operator workload. These are **not fulfilled** by an abstract modularity argument.

No database, service/API, UI, data-export contract, algorithm, anonymization threshold, statistical test or production behavior is designed.

## Completion review

- [x] Six materially different boundary alternatives scrutinized.
- [x] Separate purpose, minimum action sufficiency and peer-removal tests documented.
- [x] Independent unsuitable-inquiry outcome distinguished from releasing a dataset.
- [x] Canonical specification ownership preserved and Research Provision behavior refined.
- [x] Protected-party and science qualifications retained without false safety claims.
- [x] 004-E explicit falsification and merge-or-stop option preserved.

**Next: 004-E after merge. Implementation readiness NOT READY; execution NOT STARTED; authorization NOT YET.**
