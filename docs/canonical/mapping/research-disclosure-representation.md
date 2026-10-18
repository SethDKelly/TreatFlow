---
okf_version: "0.2"
type: Canonical Concept Mapping
title: TreatFlow — Research Suitability, Disclosure and Recipient Representation
description: Semantic state-query, action, feedback and protected availability mappings for evidence suitability and prospective disclosure.
tags: [treatflow, mapping, research, disclosure, recipient, phase-007]
---

# Research Suitability, Controlled Disclosure & Protected Recipient Understanding

**Authority:** [007-D decision evidence](../../phases/007/007-d-treatflow-execution.md). This owns user-visible representation obligations, not intrinsic actions or disclosure policy. Source truth is [Research Provision](../concepts/research-provision.md), [Controlled Disclosure](../concepts/controlled-disclosure.md), [D-01–D-03 composition](../composition/revision-research-disclosure.md), and [Phase 005 application action surface](../composition/application-action-surface.md). [Observation mapping](observation-representation.md) governs source evidence units/coverage, and [Stewardship/Revision mapping](standing-revision-history.md) governs factual history/standing. No real-world release, public entitlement or scientific validation follows from this mapping.

## Entitled state questions and interpretation

| Perspective and question | Owning state/query | Mandatory representation qualification |
|---|---|---|
| Research requester: What exactly did I ask to assess? | `InquiryScope`, `Provision` status | Inquiry scope is not permission to access underlying protected evidence |
| Research requester: Which units, attention intervals, sources and limitations inform fitness? | `EvidenceReference`, `Qualification`, entitled `InspectProvision` | Group/visitor units, observed/unknown exposure, recalled time and self-selection must not be flattened |
| Entitled inquirer: Is the evidence eligible, qualified, limited, unsuitable or unavailable? | Provision stage and attached qualification | `requested`, `prepared`, `qualified`, `unavailable`, `delivered` are distinct; unsuitable/limited describes *fitness*, not a failed technical request or access grant |
| Entitled researcher: Is factual evidence current, disputed or superseded as far as legitimately known? | Guarded D-01 historical evidence correspondence | Version and standing belong to a specified evidence/qualification context; unresolved branches cannot appear uniquely current |
| Disclosure proposer/assessor: What information and whose exposure is proposed? | `Material`, `Audience`, `DisclosureDecision`, restrictions | Material, audience, purpose and conditions are distinct; broad scientific interest proves no right to release |
| Legitimate disclosure authority: What protective basis and decision currently apply? | `Assess`, `Decide`, decision status | `proposed`, `approved`, `restricted`, `declined`, `suspended` must be distinguishable; an insufficiency finding is not approval |
| Entitled prospective recipient: Is this particular material available *to this audience now*? | Decision scope, restrictions and qualifying `ExposureRecord` | Approval ≠ material was delivered; a restriction ≠ generic public availability |
| Prior legitimate recipient/reviewer: What was made available historically and under which then-effective scope? | `ExposureRecord` and provision standing at relevant time | Past exposure remains historical; no promised automatic notice, replacement, recall or right to new versions |
| Nonparticipating household member or other affected party | Available protective rationale only insofar as entitled | Cannot infer public household, visitor or child identity from scoped research/disclosure state |

No representation may claim a user can inspect an undisclosed raw `EvidenceReference` solely because qualification state is inspectable. Missingness, protection-denial, science unsuitability and unknown factual standing require distinguishable outcomes where relevant.

## Research Provision: all five actions

| Action / Phase 005 exposure | Target, precondition and understanding | Faithful consequence and nonavailability |
|---|---|---|
| `RequestEvidence` — direct qualified | Bounded intended inquiry, eligible requester; request is not public-data entitlement | New `requested` provision or valid refusal; no inferred evidence availability |
| `PrepareScope` — internal | Legitimate abstract candidates, known/unknown unit, extent and scope compatibility | Prepared candidate/known gaps; no new user-facing public participant control |
| `QualifyProvision` — internal | Only legitimately known evidence/coverage/history; inference limits relevant to intended question | Qualified/limited/unsuitable/unavailable judgment, not statistical proof, no disclosure rights |
| `InspectProvision` — direct qualified | Entitled provision, scope and caveats, including legitimately known revision standing | Status and limitation intelligible; doesn't reveal protected sources or raw material without authority |
| `Provide` — internal/composed | Qualifying provision **and** independently permitted material, audience, distributor under D-02 | Historical `delivered` only when both guards hold; failure means no composed delivery, not an unqualified public action |

## Controlled Disclosure: all six actions

| Action / Phase 005 exposure | Target, precondition and understanding | Faithful consequence and nonavailability |
|---|---|---|
| `Propose` — protected | Eligible proposer, proposed Material, Audience, purpose | `proposed` decision only, **no exposure** |
| `Assess` — protected | Legitimate assessor and sufficient protection considerations | Reasoned sufficient/insufficient/unresolved assessment; not automatic anonymity certification |
| `Decide` — protected | Independently legitimate decision authority and applicable protective basis | `approved`, `restricted` or `declined` with conditions; not actual delivery |
| `MakeAvailable` — internal/composed | Valid nonsuspended decision, exact permitted material/audience scope and eligible distributor | Prospective availability plus historical exposure record if legitimately made; otherwise no exposure |
| `SuspendFuture` — protected | Authorized restriction affecting a particular operative decision | Restricts **future** availability; earlier copies/exposure remain historical |
| `InspectDecision` — direct protected | Entitled decision/rationale scope | Decision status and permitted rationale, **not protected content** or global public permission |

## Guarded composed action and historicity mapping

- **D-01—factual standing for future inquiry:** visibly distinguish a qualified provision's *as-of evidence standing*, known corrected/disputed assertions, and uncertain or unavailable standing. A later `Revision.Amend` does not automatically reassess or repair previously delivered material.
- **D-02—protected delivery:** a favorable research qualification and operative protective permission are **independent gates**. An entitled recipient may understand both decisions only within scope. If one fails, neither `Provide` nor `MakeAvailable` appears completed through the composed intention. No publicly invocable raw-data control is created.
- **D-03—changed material or audience:** previously granted permission applies only to its authorized material/scope. Materially changed future content requires appropriately grounded new decision; if no valid authority is present, new availability is unavailable. No automatic global suspension, implicit protected decision maker or retroactive recall is represented.
- **Delivery record:** `delivered` means historically made available in the defined context, **not** that it remains currently scientifically valid, accessible to everyone, or recoverable from recipients.

## Linguistic, structural and accessibility boundaries

Labels or equivalents for **suitable/qualified**, **permitted/approved**, **available**, **delivered**, **declined**, **suspended for future availability**, and **unknown/inconclusive** must not collapse into one "approved," "ready," or "published" indicator. Material and intended audience context must accompany material release decisions where otherwise misleading. Historical status, current authorization, research uncertainty and known correction provenance must remain conceptually comparable without revealing protected identity. Distinctions must survive noncolor and alternate presentation; no layouts, buttons, files, APIs or refresh mechanism is prescribed.

## Negative controls

1. A self-selected sparse sample is labeled a validated stationary Poisson process — **reject**.
2. Unknown watched coverage is shown as true zero arrivals — **reject**.
3. `QualifyProvision` alone yields download permission — **reject**.
4. An approved disclosure is presented as scientifically representative or actually delivered — **reject**.
5. An unsuitable but entitled research assessment appears as a service failure — **reject**.
6. Changed audience or revised material reuses unrelated old approval — **reject**.
7. `SuspendFuture` claims previous copies deleted — **reject**.
8. An old recipient is promised automatically repaired research output after correction — **reject**.
9. A proposed decision shows protected material publicly — **reject**.
10. Entitled `InspectProvision` or `InspectDecision` is conflated with an unrestricted `Provide` or `MakeAvailable` — **reject**.
11. Decision maker status is inferred from the operator label or being a contributor — **reject**.
12. A public reader sees household-linked raw timestamps solely because a research inquiry exists — **reject**.

**Carry-forwards:** legitimate research consumers, protected authorities, privacy thresholds, guardian/minor eligibility, retention and reidentification safeguards, actionable science methodology, and operator capacity are not decided in this mapping. 007-E must integrate vocabulary and accessibility across all five concepts; 007-F must falsify the integrated experience. No software or real-person data processing authorized.
