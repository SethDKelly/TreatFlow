---
okf_version: "0.2"
type: Phase Execution Record
title: TreatFlow 007-B — Observation, Measurement, Coverage and Low-Burden State Mapping
description: Entry from Phase 007-A, user state queries, seven action mappings, semantic fidelity counterexamples and next-phase handoff.
tags: [treatflow, phase-007, observation, mapping, evidence]
---

# TreatFlow — 007-B Observation, Measurement, Coverage & Low-Burden State Mapping

## Decision

**007-B COMPLETE WITH CARRY-FORWARD — 007-C NEXT ELIGIBLE AFTER MERGE.** The [canonical Observation mapping](../../canonical/mapping/observation-representation.md) defines faithful state questions, action availability/result semantics and negative controls. It follows the [Observation behavioral owner](../../canonical/concepts/observation.md) and [Phase 005 exposure decisions](../../canonical/composition/application-action-surface.md) without redefining either. Phase 007-A was merged before this work began.

## Baseline and method

Inputs: [007-A plan](007-a-treatflow-execution.md), [Phase 007 mapping contract](concept-mapping-contract.md), [Phase 006 exit](../006/006-f-treatflow-exit-review.md), [Observation](../../canonical/concepts/observation.md), [application action surface](../../canonical/composition/application-action-surface.md), and [P-01–P-06](../../canonical/purpose/purposes.md). The user-facing mapping is **semantic**, not a site design.

## Disposition of evidence questions

- **Attention:** viewed coverage differentiates observed, not-observed and uncertain time extents. Silence is never automatically a zero.
- **Measurement:** evidence units stay explicit. One group of five is not five arriving groups or five independently timed persons.
- **Time:** reported event extent and precision remain explicit, including approximate recalled claims. Submission chronology must not impersonate event time.
- **Source:** Observer identifies conceptual provenance within entitled scope; no public identity or Stewardship Party is deduced.
- **Lifecycle:** new account has no inferred coverage; Close blocks further direct additions but preserves historical inspection.
- **Eligibility:** direct reporting is not conditioned on Stewardship, Revision, Research Provision or Disclosure.
- **Feedback:** successful actions confirm what conceptual claim changed; invalid/ineligible actions do not pretend an EvidenceItem was recorded.

## Tested negative controls

| Situation | False proposed mapping | Decision |
|---|---|---|
| Absent observer for 15 minutes | Show “zero arrivals” | Rejected — unknown/nonobserved |
| One group with five visitors | Render as five arrival events | Rejected — unit conflation |
| Delayed vague recollection | Display exact event timestamp | Rejected — false precision |
| `Establish` with no watching | Display fully observed new interval | Rejected — invented coverage |
| `AssertCoverage` only | Show new arrival evidence | Rejected — unrelated state mutation |
| `Qualify` | Quiet factual overwrite | Rejected — Revision owns amendments |
| `Close` | Treat as deletion, publication or accuracy approval | Rejected — closure only |
| Protected household identity | Display source as publicly verified owner | Rejected — not intrinsic |
| No standing association | Disable a legitimate `Report` | Rejected — violates low burden |
| Public reader | Give raw source-level `Inspect` by default | Rejected — entitlement absent |

## Action surface audit

All **seven** intrinsic Observation actions were mapped, including the separate entitled `InspectAfterClose`, with actor/target, qualified input and meaningful success/denial feedback. No concept-valid internal action was exposed as a user command. The mapping covers low-burden present or recalled reporting and temporal qualifiers without choosing a widget or device.

## Residuals and boundary

The source specification contains abstract `TimeExtent`, uncertainty and provenance but does not establish a universal exact submission timestamp; maps must not manufacture one. Nor does it certify observational exposure from a mere event report or support automatic source geolocation/publication. If later representations require new source data, authority or factual updates, reopen the owning concept/Phase 005 composition instead of inserting derived user-interface truth.

**007-C** must map contribution standing separately from factual revision and correction after closure; **007-D** owns research suitability versus disclosure; **007-E** integrates action vocabulary and accessibility. No evidence here establishes any automatic multi-concept trigger, safety-approved disclosure or actual data capture permission.

## Completion checklist

- [x] Legitimate observer/interpreter state questions and scopes identified.
- [x] All seven Observation actions mapped to availability and result/denial semantics.
- [x] Open/closed lifecycle and post-close inspection distinguished.
- [x] Coverage, evidence unit, approximate/recalled time and provenance represented separately.
- [x] Low-burden reporting without mandatory cross-concept participation preserved.
- [x] Adversarial false-zero, false-arrival, false-precision and false-identity cases rejected.
- [x] One narrow canonical mapping owner established and indexed.
- [x] No UI architecture, implementation, release or data collection approval.

**007-B complete; 007-C next after merge. Implementation readiness NOT READY; execution NOT STARTED; authorization NOT YET.**
