---
okf_version: "0.2"
type: Canonical Concept Mapping
title: TreatFlow — Observation State and Action Representation
description: User-visible semantic obligations for observed coverage, units, time, uncertainty, account lifecycle, and low-burden reporting.
tags: [treatflow, mapping, observation, phase-007]
---

# Observation — State and Action Representation

**Authority:** [007-B decision evidence](../../phases/007/007-b-treatflow-execution.md). This document owns the **current representation obligations** of the independently specified [Observation concept](../concepts/observation.md). [Phase 005 action exposure](../composition/application-action-surface.md) governs which actions can be offered and with which guards. This is neither a new state model nor a screen/API/technical design. 007-C–G must recheck cross-concept and accessibility coverage.

## State questions and faithful answers

| Legitimate observer / interpreter question | Conceptual source | Non-negotiable distinction |
|---|---|---|
| What account and reporting context am I examining? | `ObservationId`, bounded intended context and entitled `Inspect` scope | An account is not a verified person/household identity or a published dataset |
| When was attention actually asserted? | Coverage items: `TimeExtent`, observed/not-observed/uncertain, precision | No entry is **not** evidence of watched quiet. Known not-observed intervals are not zeros |
| What was counted? | `EvidenceItem.Measure` unit, quantity/event claim | Group encounter ≠ individual visitor count ≠ independent arrival event |
| When did the asserted activity occur? | Evidence `TimeExtent` and precision | An approximate or interval time must not become an exact instant |
| How was it known? | Evidence contemporaneous/recalled provenance and uncertainty | Recalled report is not contemporaneous observation |
| Does evidence overlap with monitoring claims? | Coverage and evidence extents, each displayed with own status | A report need not prove uninterrupted observation; apparent overlap must not fabricate completeness |
| Has the account closed? | `Lifecycle.open/closed` | Closed blocks direct additions but does not certify facts, publication or denial of separate Revision |
| What is the evidence available to me? | Scoped `Inspect` / `InspectAfterClose` | An entitled view does not authorize public disclosure, other household identity or raw research distribution |

Derived summaries must retain the evidentiary unit, observation-coverage basis, and missingness. They may **not** silently fill gaps, merge group/person units or portray conflicting assertions as one unqualified truth.

## One-action mapping and feedback obligations

| Application-exposed action | What actor must understand before invoking | Meaningful positive feedback | Unavailable / refused result |
|---|---|---|---|
| `Establish` | New bounded observational account; no observation guaranteed or identity published | Open account established with distinguishable reference/context and **no implied watching interval** | Ineligible source/context: account not established |
| `AssertCoverage` | Chosen extent and explicitly claimed observed, not-observed or uncertain attention | Status/extent/uncertainty added; **no arrival count implied** | Closed account, invalid extent or ineligible actor: no coverage assertion added |
| `Report` | Target open account, declared group/person unit, event/interval, recollection status and precision | One qualified EvidenceItem recorded and separately identifiable | Closed account, missing material qualifiers, invalid authority/state: no report added |
| `Qualify` | Which existing evidence/coverage assertion gains what uncertainty or other qualifier | Qualification associated with precisely identified existing assertion | No unguarded factual replacement; closed account or illegitimate target denied |
| `Inspect` | Entitled active-account scope and limitations | Coverage/evidence, units, provenance and uncertainty intelligible in that scope | Not entitled or unavailable scope does not become a public view |
| `Close` | Consequence: later direct reporting/coverage/qualification stops within Observation | Closed lifecycle recognized while historical assertions remain intelligible | Already-closed/unauthorized account: no second closure or hidden data change |
| `InspectAfterClose` | Closed account and permitted historical scope | Original account/claims viewable without reopening | No direct additions or implied new access rights |

**Availability model:** `Establish` depends on a legitimate source/context; `AssertCoverage`, `Report`, `Qualify` and `Close` require appropriate actor and **open** lifecycle. `Inspect` and `InspectAfterClose` require entitled scope and appropriate lifecycle. Absence of an optional Stewardship association, Revision subject, Research inquiry or Disclosure decision does **not** disable a legitimate `Report`. Denied, unknown, unavailable and factually unsuitable must not be conflated.

## Core semantic representation contrasts

- **Watched quiet**: an explicitly asserted observed time extent with no event evidence for that extent; its interpretation depends on asserted monitoring precision/completeness. **Unwatched or unknown**: no defensible zero-arrival claim.
- **Group versus visitor**: one encounter with a reported five visitors is still **one group encounter**, not five independent arrival events; multiple units require separately intelligible asserted measures.
- **Event time versus submission context**: if the representation makes report submission chronology visible, it must **not** substitute that for the asserted event time. Do not invent exact collection timestamps or semantics absent from concept authority.
- **Contemporaneous versus recalled**: different observation provenance; neither may imply verified objective timing or household presence.
- **Coverage versus evidence**: an `AssertCoverage` claim is about attention, a `Report` claim is about activity. The two can be conceptually compared but not rewritten into each other.
- **Open versus closed**: closure is about direct additions; an eligible later correction is a **separate Revision action**, to be mapped in 007-C, not a new `Observation.Report`.
- **Source versus responsibility**: conceptual `Observer` is not necessarily an identified contributor Party and gives no protected amendment/disclosure entitlement.

## Low-burden and accessibility constraints

Reporting must remain conceptually available without a preceding contributor association, stable public profile, research question or disclosure assessment. The representation should not *demand* an optional action merely to record one observed group. The actor must be able to distinguish measured unit, time precision and attention status under divided attention, without reliance solely on color or a high-density presentation. These are **semantic constraints**, not a screen count, prescribed control, layout or input technology. A simple experience must still allow honest uncertainty; simplification cannot convert uncertainty to an asserted exact claim.

## Counterexample tests (mapping failures)

1. No arrival entry during 18:20–18:35 while absent appears as “0 observed” — **reject**.
2. A group containing five visitors becomes five separate arrival-time events — **reject**.
3. Recalled “about 18:40” is rendered as “18:40:00 exact” — **reject**.
4. A coverage claim is displayed as an event count — **reject**.
5. An account newly established with no coverage is shown as actively observing — **reject**.
6. `Close` appears to delete evidence or certify its truth — **reject**.
7. A closed account appears to permit another direct `Report` — **reject**.
8. A source label implies public identity, correction authority or disclosure consent — **reject**.
9. A reported group's count is presumed to be research-ready/representative — **reject**.
10. Missing optional association blocks an otherwise legitimate report — **reject**.

**Deferred cross-concept mapping:** contribution standing, factual correction/history and attribution disputes in 007-C; research suitability and disclosure in 007-D; language/structural cross-concept accessibility in 007-E; red-team scenarios in 007-F. Representation must never grant real-data collection, participation, privacy or scientific authorization; those remain separately unresolved.

No new Observation state/action, wireframe, component, navigation, API, event transport or storage is defined.
