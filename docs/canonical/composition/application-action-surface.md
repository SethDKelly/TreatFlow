---
okf_version: "0.2"
type: Canonical Application Action Surface
title: TreatFlow — Provisional Application Action Surface
description: Current Phase 005-B action exposure decisions, restrictions, and unresolved composition guards.
tags: [treatflow, composition, application-actions, provisional]
---

# TreatFlow — Provisional Application Action Surface

**Authority:** [005-B decision](../../phases/005/005-b-treatflow-execution.md). This is the **current qualified application-level action surface after Phase 005-G exit**, not an API or UI plan. C-01–C-03 and D-01–D-03 have separately specified guarded composition semantics in their canonical owners; 'candidate' classifications below do not create unconditional, independently exposed or production-authorized actions. The five [canonical concepts](../concepts/candidates.md) retain intrinsic action semantics independently.

## Classification

- **Direct, qualified:** candidate one-action exposure when the concept's own guard holds. "Direct" never means anonymous, universally permitted, or real-world authorized.
- **Protected:** candidate restricted application action requiring separately justified actor authority; not publicly available.
- **Internal:** concept-valid participant action, **not independently exposed** through TreatFlow's application surface. Might participate in a later synchronization.
- **Composed candidate:** meaningful user-facing application intention whose coordinated concept actions, bindings and conditions are still undecided; cannot yet be claimed available.
- **Excluded:** deliberately not exposed as an independent action in the present application; this does not remove it from the independent concept.

## Complete concept-action inventory

| Concept | Intrinsic action | 005-B application-surface decision | Essential condition / reason |
|---|---|---|---|
| Observation | Establish | Direct, qualified | Observer can begin a bounded account; association/real-world identity not automatically mandatory |
| Observation | AssertCoverage | Direct, qualified | Only actual claimed watching/unknown extent; no inferred zero from silence |
| Observation | Report | Direct, qualified | Event/measure/time/provenance remain distinct; no mandatory standing/research/disclosure side effect |
| Observation | Qualify | Direct, qualified | Adds legitimate qualifications while open; cannot secretly amend factual content |
| Observation | Inspect | Direct, qualified | Only an entitled conceptual scope, **not** public identity or raw data access |
| Observation | Close | Direct, qualified | Ends direct additions; future historical correction remains a separate question |
| Observation | InspectAfterClose | Direct, qualified | Entitled view without reopening; same protective boundary as Inspect |
| Contribution Stewardship | Associate | Internal / composed candidate | Item association may follow or accompany legitimate contribution; never inferred from household/address |
| Contribution Stewardship | Recognize | Direct, protected | Holder's own scoped responsibility standing; no public attribution |
| Contribution Stewardship | ContestStanding | Direct, protected | Affected challenger with legitimate standing; does not transfer rights |
| Contribution Stewardship | DetermineStanding | Protected | Independent legitimate adjudication; no automatic household, administrator or contributor privilege |
| Contribution Stewardship | Relinquish | Direct, protected | Valid holder; ends standing only, does not delete data or withdraw published copies |
| Revision | EstablishSubject | Internal / composed candidate | Must not register arbitrary external data as another author's assertion without legitimate basis |
| Revision | Amend | Protected / composed candidate | Legitimate factual amender; correction of existing observations requires 005-C coordination |
| Revision | InspectHistory | Direct, qualified | Entitled view of factual lineages, historical and contested standing |
| Revision | Challenge | Direct, protected | Legitimate challenger; is not an amendment |
| Revision | ResolveChallenge | Protected | Authorized decision with justification; does not manufacture a new factual assertion |
| Revision | MarkSuperseded | Internal / composed candidate | Avoid arbitrary stand-alone selection of unique truth in competing branches |
| Controlled Disclosure | Propose | Protected | Eligible proposal, not approval or exposure |
| Controlled Disclosure | Assess | Protected | Legitimate protective assessment; no presumption that method is safe |
| Controlled Disclosure | Decide | Protected | Legitimate disclosure authority and sufficient protective basis; not public action |
| Controlled Disclosure | MakeAvailable | Internal / composed candidate | Conditional on operative scoped approval; cannot be standalone unrestricted download |
| Controlled Disclosure | SuspendFuture | Protected | Legitimate prospective restriction, no retroactive recall |
| Controlled Disclosure | InspectDecision | Direct, protected | Entitled requester sees scoped decision/rationale, not protected contents |
| Research Provision | RequestEvidence | Direct, qualified | Bounded inquiry; requester does not thereby obtain data or access rights |
| Research Provision | PrepareScope | Internal | Eligibility and available descriptive evidence must be known, not invented |
| Research Provision | QualifyProvision | Internal | Assessment may be unsuitable/unknown and must retain data limitations |
| Research Provision | InspectProvision | Direct, qualified | Entitled view of qualification **without** automatic access to evidence |
| Research Provision | Provide | Internal / composed candidate | Only after separate legitimate disclosure and qualified-scoped evidence; never public by default |

**Interpretation:** A protected action is deliberately distinguished from an internal action. Protection does **not** mean it can be invoked by a presumed operator role; authority evidence remains an unresolved policy dependency. Internal classification indicates independent application exposure is **not** granted, even though the concept action is valid.

## Candidate multi-concept application intentions (NOT SYNCHRONIZATIONS)

| Intention | Candidate semantics | Open design destination |
|---|---|---|
| Recognize a reported contribution | Associate a valid Item with an eligible Party, without requiring identification for all reports | 005-C |
| Correct a reported assertion | Legitimate factual standing check, independently valid Revision amendment, qualified interpretation without reopening direct Observation | 005-C |
| Investigate contested evidence | Existing histories inform scope/qualifications without assuming changed original claims | 005-C/D |
| Obtain qualified evidence | Scientific suitability/limitations and separately authorized scoped prospective availability must both hold | 005-D |
| Reassess changed/disputed material | Evaluate whether an earlier decision covers changed meaning; suspend/reconsider future distribution only under valid authority | 005-D |
| Examine causal chains and action exclusions | Challenge effect of multiple participating actions and any invalid automatic permission | 005-E |

**No assumed binding:** this document does not declare equivalence between `ObservationId`, `EvidenceItem`, `Item`, `Subject`, `Material`, or `EvidenceReference`. Their semantic correspondence must be justified by the synchronization review; names and identity similarities are insufficient.

## Deliberate non-exposure and guard discipline

1. Contribution reporting must not automatically trigger compelled account creation, verification, public attribution, academic evaluation or release.
2. A reporter's claimed source is not sufficient to award another party correction authority.
3. No household, child or visitor identity becomes public by selecting Inspect, Recognize, or InspectProvision.
4. `DetermineStanding`, `ResolveChallenge`, `Assess`, `Decide` and `SuspendFuture` remain restricted until authority and protective conditions are independently established.
5. `MakeAvailable` and `Provide` are **not** unconditional independent public actions; historical downloads cannot be retracted conceptually.
6. No user-facing direct action promises statistically valid Poisson inference, a representative sample, or anonymous release.
7. A legitimate `Challenge` does not execute `Amend`; `Relinquish` does not delete or revoke past exposure.

**Out of scope:** UI screens/buttons, API/routes, roles/authentication implementation, event/message choreography, technical execution, retention policy, and real-world permissions. They remain unapproved.

## 005-E guard and automation audit

[005-E adversarial evidence](../../phases/005/005-e-treatflow-execution.md) preserves all 005-B qualified/protected/internal exposure decisions, with the following interpretation: **composed candidate** does not imply an actor may independently invoke an internal participant, and **protected** does not assign real-world standing to any presumed operator. C-01/C-02 and D-01–D-03 are bounded by applicable legitimate conditions and do not collectively imply unconditional reactive automation. A failed optional contribution association does not invalidate a permitted `Observation.Report`; denied disclosure or insufficient qualification does not expose either `MakeAvailable` or `Provide` through the combined research intention. 005-F/G may further refine the action surface.

## 005-F consolidated purpose and composed-intention status

[005-F coverage and synergy audit](../../phases/005/005-f-treatflow-execution.md) retains the 005-B intrinsic action classifications while recognizing the bounded composed meanings under [C-01–C-03](observation-stewardship-revision.md) and [D-01–D-03](revision-research-disclosure.md). **Qualified direct reports and research-suitability inquiries are independently available under their own guards.** Optional contributor recognition and protected factual correction are available only when their respective identity bindings and actor entitlements are independently warranted. Future research qualification considers legitimately known factual currentness; protected delivery requires separately qualifying evidence, material, audience and disclosure authority. Changed future scope cannot borrow an old approval.

**Not in the application promise:** mandatory contributor registration, universal source-to-Revision enrollment, automatic amendment/research broadcast, unconditional research delivery, public raw-data inspection, retroactive recipient copy repair, active notices after later correction, or presumption that an operator has protected decision rights. No new unconditional automation is established. One **provisional synergy hypothesis** is qualified scientific interpretation with protected prospective release; this is neither proof of real-world validity nor an authorization to collect or share data. 005-G independently challenges this consolidation.
