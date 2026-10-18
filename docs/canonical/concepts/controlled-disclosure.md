---
type: Concept Specification
title: TreatFlow — Controlled Disclosure (Provisional)
description: Abstract disclosure decisions, release exposure, temporal availability and protective constraints.
tags: [treatflow, concept, provisional, disclosure, phase-003]
---

# Controlled Disclosure — Provisional Behavioral Specification

**Status:** Provisionally specified in [003-E](../../phases/003/003-e-treatflow-execution.md). Purpose and intrinsic behavior plausible; independence from [Research Provision](research-provision.md) remains subject to 003-F/Phase 004. Governed by [P-03/P-04/P-06](../purpose/purposes.md). No real data release is authorized.

## Purpose and operational principle

Enable accountable decisions about **whether, in what qualified form, to whom, and for what prospective scope information may become available**, protecting people who did not necessarily participate.

**Characteristic story:** A proposed Halloween observation release contains fine event times in a sparsely sampled area. An authorized decision-maker considers linkability of household activity, then restricts, transforms, or declines the prospective disclosure. A revised decision may stop *future* distribution, but cannot guarantee retrieval of a copy already obtained. A recipient is not entitled to infer that a permitted release is anonymous, representative, or scientifically complete.

## Abstract domains and memory

- `Material`: abstract material considered for availability, without importing Observation's type or contents.
- `Audience`: abstract intended recipients/scope.
- `DisclosureDecision`: identity, proposed material and audience, declared purpose, qualified conditions and decision status (**proposed, approved, restricted, declined, suspended**).
- `ExposureRecord`: a semantic account of whether material became available under a decision, including the relevant audience/scope and temporal fact of availability; **not** a database log or guarantee that recipients retain no copies.
- `Restriction`: abstract enforceable-for-future condition; actual safety criteria and safeguards are deliberately **unresolved policy design**.

State: decisions and their current standing, declared restrictions, and past exposure facts sufficient to avoid false retroactive claims. No household addresses, real identities, retention architecture or risk-scoring algorithm are intrinsically required.

## Conceptual actions

| Action | Inputs and guard | Semantic effect / observable result |
|---|---|---|
| **Propose** | Material, intended audience, purpose and eligible proposer | Establishes a proposed decision; **does not** expose material |
| **Assess** | Proposed/reevaluable decision, relevant protection considerations, legitimate assessor | Records a reasoned qualification or insufficiency finding; **not** automatic proof of safety |
| **Decide** | Legitimate disclosure authority, sufficient consideration of applicable protective constraints | Marks approval, restriction or denial with explainable conditions; decision does not itself guarantee recipient access |
| **MakeAvailable** | Approved/restricted decision, scope respects all operative conditions, eligible distributor | Records authorized prospective exposure within the allowed audience and scope |
| **SuspendFuture** | Existing approval/availability, legitimate restricting authority | Prevents later authorized exposure under this decision; preserves earlier exposure history |
| **InspectDecision** | Entitled requester with limited scope | Makes current status, conditions and available rationale intelligible without revealing protected details |

### Guards and semantic boundaries

Approval cannot bypass unknown or unexamined material risk merely because an analyst wants detailed data. **A protection decision requires a defensible basis under later-established policy; where none exists, no affirmative safe-release claim is permitted.** No particular identity, location precision, time precision, threshold, anonymization guarantee, reviewer role or authentication technology is selected here.

## Invariants, history and under-specification

1. **Proposal ≠ approval ≠ exposure.** These are separate conceptual facts.
2. Availability never exceeds the operative decision's scope *within this concept*; a permitted disclosure does not certify safety beyond its assessed conditions.
3. Suspended/declined decisions cannot authorize subsequent exposures; exposures already made remain historically distinguishable and cannot be asserted recalled.
4. A disclosure record is not permission to reveal an observer's source identity, children or household details without separately justified authority.
5. Coarse geographic information plus timestamps or repeated releases may still be identifying; protective evaluation must consider meaningful combinations, not isolated attributes.
6. Permissions and restrictions are not scientific statements: authorization does not prove representative sampling, a Poisson hypothesis, or measurement completeness.
7. An external control request (including withdrawal) does not alter disclosure state until a legitimately authorized decision is made.

**Deliberately unspecified:** concrete risk methodology, selection/transformation technique, recipient technical controls, release format, operator workflow, schedules, authentication and audit storage.

**Open (not resolved):** who has non-substitutable authority for contribution-related permission and third-party protection; what minimum risk evidence permits approval; how conditions apply to subsequent redisclosures; what happens when recipients have prior access; whether a single sharing concept can incorporate Research Provision without losing meaning. These require 003-F, Phase 004 and later protected authority/policy work. Do not collect or release real data until applicable protections are independently qualified.

## 003-F semantic closure: insufficiency and prospective effect

For a proposed disclosure, `Assess` distinguishes **sufficiently justified under an applicable protection policy**, **insufficient evidence**, and **unresolved**. `Decide` cannot approve prospective exposure unless its applicable protection conditions have a defensible basis; insufficient or unresolved assessment permits decline, further qualification or continued nonavailability, **not** affirmative safe-release certification. This is a conceptual guard only: the actual assessment criteria, regulator/consent/age conditions and accountable decision-maker remain to be independently decided before any real release.

`SuspendFuture` applies prospectively to all later `MakeAvailable` actions under the suspended decision. It cannot change recorded historical exposure or force copies held by recipients to disappear. If material changes materially after a decision (including revised evidence, scope or source permissions), prior approval cannot silently authorize a **different disclosure scope**; renewed assessment/decision may be required. No cross-concept notification or automatic revocation is specified.

**Remaining Phase 004 question:** can prospective sharing decisions and scientific evidence provision remain independently comprehensible when both are present?


## 004-D boundary refinement — independent protective availability

**RETAIN provisionally.** The purpose is protected *prospective information availability*, independent of any research inquiry. A decision can approve, restrict or deny Material for an Audience without a Research Provision concept. Its minimum meaningful actions are `Propose`, `Assess`, `Decide`, `MakeAvailable`, `SuspendFuture` and `InspectDecision`: an approval is not itself historical exposure, and prospective suspension preserves prior disclosures. `Material` and `Audience` are abstract identity/scope parameters; privacy protection requirements remain semantically essential and require independent policy qualification before real release. No scientific suitability outcome is imported or granted here. See [004-D evidence](../../phases/004/004-d-treatflow-execution.md). **004-E may still revise this boundary.**
