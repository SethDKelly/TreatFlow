---
okf_version: "0.2"
type: Canonical Concept Mapping
title: TreatFlow — Integrated Action Availability, Language and Structural Integrity
description: Cross-concept experience mapping guardrails for action exposure, terminology, meaningful state, accessibility and structural grouping.
tags: [treatflow, mapping, phase-007, actions, language, accessibility]
---

# Integrated Application Action, Availability & Representation Integrity

**Authority:** [007-E design evidence](../../phases/007/007-e-treatflow-execution.md). This document owns cross-concept mapping constraints; it does **not** redefine the [Phase 005 application action surface](../composition/application-action-surface.md), [C composition](../composition/observation-stewardship-revision.md), [D composition](../composition/revision-research-disclosure.md), or the distinct [Observation](observation-representation.md), [Standing/Revision](standing-revision-history.md) and [Research/Disclosure](research-disclosure-representation.md) mapping owners. All obligations are conceptual, not a screen or implementation specification.

## Exposure and action availability — entire 29-action inventory

| Concept | Direct qualified / direct protected | Protected (not unrestricted) | Internal / conditional / composed participants |
|---|---|---|---|
| Observation (7) | Establish, AssertCoverage, Report, Qualify, Inspect, Close, InspectAfterClose — **all direct qualified** | — | — |
| Contribution Stewardship (5) | Recognize, ContestStanding, Relinquish — **direct protected** | DetermineStanding | Associate — internal/optional C-01 |
| Revision (6) | InspectHistory — **direct qualified**; Challenge — **direct protected** | Amend — protected/composed; ResolveChallenge — protected | EstablishSubject, MarkSuperseded — internal/conditional |
| Controlled Disclosure (6) | InspectDecision — **direct protected** | Propose, Assess, Decide, SuspendFuture | MakeAvailable — internal/composed |
| Research Provision (5) | RequestEvidence, InspectProvision — **direct qualified** | — | PrepareScope, QualifyProvision — internal; Provide — internal/composed |

The table inventories classifications; **specific actor, target and success/denial mappings remain in the three subject mapping owners**. "Direct" does not equal anonymous, globally available, or free of guard conditions. Protected action mapping must indicate the target and eligibility as far as legitimate scope allows. Unknown eligibility is not permission. Internal actions are not independently invocable just because they are meaningful in the concept. "Composed" is a **guarded application intention**, not a new universally exposed button or guaranteed automatic process.

## Ambiguous outcome after an interrupted application action

**Contextual correction (010-G):** The existing success/refusal feedback obligations apply **only when the action's actual outcome is established**. Where an observer, contributor, researcher or protected decision-maker loses the ability to learn whether an attempted action took effect, the application must not represent that attempt as **confirmed accepted**, **confirmed rejected**, or **safely reversible** without an entitled basis in conceptually inspectable state.

- **Confirmed accepted:** the relevant concept's effect is known and the actor's legitimate scope permits acknowledgment of that effect. Reporting must distinguish the EvidenceItem or assertion affected, not equate the act of attempting with acceptance.
- **Confirmed not effected:** evidence within legitimate scope establishes that the action did not occur. A timeout or lack of feedback alone does not prove nonacceptance.
- **Unresolved outcome:** the actor cannot yet distinguish whether the action took effect. Communicate uncertainty without inventing success, failure, protected state or blanket entitlement.
- **Repeat or recovery decision:** an identical-looking submission is not necessarily the same factual encounter or the same attempt. A repeated action cannot be described as safe, deduplicated, idempotent, or exactly once merely because the original outcome was unknown. Entitled inspection can clarify known state but does not prove a particular attempt's history when identity/trace evidence is lacking.
- **Protected actions:** an ambiguous D.Decide, V.Amend or S determination never satisfies a subsequent protected guard merely because someone believes it probably completed. No D.MakeAvailable is authorized without an operative, legitimately established decision.

This is a **representation and semantic-outcome boundary**, not a new intrinsic action, system-level attempt lifecycle, transaction model, retry protocol, storage requirement or technical acknowledgment design. If eventual context testing proves that users cannot distinguish action instances sufficiently to preserve P-01/P-05, reopen the relevant concept/composition owners rather than asserting this wording solved the practical problem.

## Semantic availability outcomes

| Situation | Representation obligation |
|---|---|
| Valid direct action within legitimate actor/state/scope | Make distinct purpose, target, inputs and semantic effect discoverable without claiming automatic adjacent concept actions |
| Current state invalid (e.g., closed observation, missing suitable assertion) | Distinguish not applicable from succeeded, completed or absent data |
| Actor entitlement insufficient, unknown or contested | Distinguish restricted/undetermined from publicly available; do not reveal protected details while explaining nonavailability |
| Internal action needed for a guarded composition | Show the entitled application's outcome/guard meaning when relevant, not an independently actionable participant |
| Protected composed action missing one participant/guard | Represent **not available** and the material qualifying reason if entitled; never depict the partial sequence as completed delivery/correction |
| Requested but inconclusive or scientifically unsuitable | Distinguish a legitimate unfavorable conceptual result from denied access or a technical failure |
| Historical action result subsequently superseded or suspended | Preserve as-of context and historical effect, separate from future availability or current factual standing |

**No unconditional system-triggered action** is established by Phase 005. Do not depict automatic Observe→Associate, Amend→Qualify/Release or Decide→Provide, or imply implicit instant policy decisions.

## Terminology collisions — required distinct meanings

| Dangerous umbrella term | Distinct semantic meanings that must be preserved |
|---|---|
| **Observed / zero / no data** | Affirmatively monitored quiet, not-observed interval, uncertain attention, absent report |
| **Visitors / arrivals / groups** | Person count, group encounter count, individual arrival event; no implied independent timestamps |
| **Timestamp / reported at** | Claimed event time and precision, recalled provenance, separately proven submission context |
| **Mine / owner / identity** | Observer source, eligible Stewardship Party standing, protected amendment entitlement |
| **Correction / challenge** | Added qualified Observation information, Revision successor amendment, factual challenge, Party standing contest |
| **Current / final** | Observation open/closed, uncontested Revision successor, challenged/competing branches, as-of provision |
| **Approved / qualified / ready** | Scientific suitability, disclosure permission, audience-restricted material availability |
| **Shared / delivered / revoked** | Decision approved, protected prospective exposure, historical delivery, prospective suspension only |
| **Anonymous / safe** | No presumed reidentification protection merely from coarse geography or pseudonyms |

Words above are **collision tests**, not mandatory UI labels. Later linguistic work can select alternative names provided the relevant meanings remain distinguishable.

## Semantically necessary structural obligations

- Distinguish monitoring coverage and recorded event evidence; show the relevant unit/precision context with any derived count.
- Keep an original assertion historically traceable to successor and rationale. Preserve unopposed versus contested/forked interpretations; do not silently privilege the newest branch.
- Keep protected responsibility standing and factual amendment authority separable even when displayed together. Derived summaries must not disclose Party details or imply entitlement.
- Present research fitness, material/audience authorization and historical exposure as **separate questions** even if a composed provision is understood as one task.
- Preserve the relevant actor's current scope, target, denial reason where legitimate, and irreversible-versus-prospective consequence before consequential protected action.
- When the reduced-participation pathway is used, avoid presenting absent S/V participation as a failed report or a separate product edition. No-delivery R and withheld D are valid outcomes inside the one adopted five-concept family.
- Different conceptual statuses must remain distinguishable without color alone, exact spatial placement, reliance on animation, or exclusively visual status indicators. Equivalent semantic information should be available in alternate perceptual/interaction modes; this specifies no frontend accessibility implementation.

## Composition and omission audit

- **C-01:** valid Observation.Report remains when optional Standing.Associate is omitted, denied, or contested.
- **C-02:** an eligible Amendment may follow Observation.Close via Revision without changing the original Observation or publicizing amender identity.
- **C-03:** contested Party standing and challenged factual Assertion remain distinct, neither silently adjudicates the other.
- **D-01:** legitimately known factual currentness qualifies future research interpretation without broadcast or retroactive overwrite.
- **D-02:** protected delivery requires independently satisfied Research Provision and Controlled Disclosure conditions; an authorized researcher request by itself does not convey source-level entitlement.
- **D-03:** changed prospective scope requires appropriate further authority, not an automatic global suspension or destruction of past recipient copies.

**No concept-scope drift:** The accepted design has one integrated five-concept family; reduced action involvement is an encounter state, **not** a newly marketed or supported standalone variant.

## Reentry and remaining validation

If a faithful mapping would require information, a state transition, a new automatic effect, a notification, public-source inspection or permission not established upstream, **record the misfit and reopen its owner**: 001 for missing legitimate purpose, 003/004 for intrinsic behavior/boundary, 005 for application action/composition, 006 for product scope. Do not solve with copy, placement, a mock permission or a new interface-only field.

**007-F** must adversarially replay integrated actions and affected-party situations; **007-G** independently audits authority/OKF and Phase 008 handoff. The actual legality and feasibility of consent, minors, household privacy, retention, protected adjudication, science, and safe disclosure remain unresolved. No real operation, code, design system or UI artifact is authorized here.

## 008-C false-familiarity precision

[008-C review](../../phases/008/008-c-treatflow-execution.md) tested familiar concept/action names against current purpose, authority and temporal behavior; no complete rename was justified. These are **user-visible semantic constraints**, not new intrinsic rules or prescribed labels:

- **Recognize** means entitled inspection of contribution *standing*, not publicly verified identity, unilateral ownership or correction rights.
- **Amend / Challenge / ResolveChallenge** respectively mean reasoned successor assertion, factual challenge and challenge disposition, never interchangeable with destructive edit or guaranteed single current truth.
- **QualifyProvision** communicates evidence fitness *and its limitations*; it does not certify a Poisson hypothesis or grant protected access. **Provide** is a guarded delivery participant, not an ordinary public export.
- **Decide** records a scoped prospective protective decision, not actual `MakeAvailable` exposure. **SuspendFuture** constrains later availability, not prior recipient copies.
- **Inspect**-family actions are entitled/scoped views, not promises of public raw details; “anonymous” and “safe” cannot be inferred from a pseudonym, coarse location or lack of a displayed name.

Use the natural owning concept and composition rules for action effects. A later 008-D/E rename or broader genericity decision must update these linguistic constraints and recheck the 007-F adverse scenarios; 008-C did not approve a concept rewrite.
