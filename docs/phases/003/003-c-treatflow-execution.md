---
type: Phase Execution Record
title: TreatFlow 003-C — Observation Exposure, Measurement and Temporal Semantics
description: Behavioral specification evidence and challenge findings for provisional Observation.
tags: [treatflow, phase-003, observation, state, actions]
---

# TreatFlow — 003-C Observation: Exposure, Measurement & Temporal Semantics

## Decision

**003-C COMPLETE FOR HANDOFF — 003-D NEXT ELIGIBLE AFTER MERGE.** Observation has enough representation-independent purpose/OP, abstract memory, conceptual actions, constraints and counterexamples for subsequent specification and Phase 004 factoring challenge. This is **not Phase 003 exit** and does not validate scientific accuracy or safe data collection.

The single [current provisional Observation specification](../../canonical/concepts/observation.md) owns its semantics. [003-B identity assessment](003-b-treatflow-execution.md), [003-A plan](003-a-treatflow-execution.md), [Phase 002 alternatives](../002/002-c-treatflow-execution.md) and [P-01–P-03](../../canonical/purpose/purposes.md) give rationale.

## Boundary choice, not a permanent factorization decision

Treat the act of stating **what was observed and whether it was watched** as one candidate behavioral purpose for now. Contrast the diary-first, period-first, bounded-claim and separated-exposure alternatives. The proposed concept supports these as forms/claims without accepting that a Timestamp, Event, Group or Coverage necessarily deserves its own concept. This preserves 003-B's falsification condition: Phase 004 may split or redefine coverage if it has an independent end-to-end purpose.

## Behavioral adequacy checks

| Thought experiment | Specification consequence |
|---|---|
| Group of five at 18:07 | Declared group-event unit and visitor quantity can coexist without claiming five independent arrival events |
| 18:00–18:20 actively watched | Observed coverage is an assertion, not a universal guarantee of reporting completeness |
| 18:20–18:35 observer away | Unobserved/unknown is not zero; silence of submissions proves neither monitoring nor inactivity |
| 18:35–18:50 recalled estimate | Report time and asserted event time remain distinct; uncertainty is retained |
| Observer reports zero events | Explicit zero/completeness claim is required; an empty report set is insufficient |
| Overlapping contradictory claims | They remain unresolved and visible, not silently merged or arbitrarily ranked |
| Two volunteers at one location | Source identity does not automatically designate a household or equate their independent observations |
| Account closes | No further direct additions; earlier meaning persists without implying publication or permanent retention |

## Specification coverage finding

Purpose/OP **covered**; abstract type/identity domains and minimal state **covered provisionally**; establish/coverage/report/qualify/inspect/close and effects/guards **covered provisionally**; invariants and temporal semantics **covered provisionally**. **Open**: strong completeness semantics for observed zeros; contradiction/resolution and protected correction; source authority and downstream visibility; lifecycle duration. These gaps are assigned, **not** falsely declared resolved or coded as default behavior.

**Important distinction:** `Coverage=observed` means attention was claimed; it does not by itself establish complete detection of arrivals. A defensible zero requires compatible complete reporting, or an explicit zero observation claim. No inference engine is part of this concept.

## Deferred decisions / assigned work

- **003-D:** test whether correction requires independent Revision and whether source authority is intrinsic to Observation or Contribution stewardship; no stealth amendment or external exposure.
- **003-E:** decide recipient-visible evidence qualifications and protected availability without confusing observation identity with release identity.
- **003-F:** close materially ambiguous completeness, conflicting intervals and action authority in the combined review; if unspecifiable, reopen 003-C rather than carry fundamental omissions into Phase 004.
- **Phase 004:** test independence and specificity of Observation/Exposure, genericity of an observation claim, and whether recording-mode variants are one concept or separate purposes.
- **Later safety/research review:** validate burden, scientific interpretation, age/consent and privacy before collecting real data. Concept semantics make no legal/empirical guarantees.

## Completion and design-only verification

- [x] Single natural canonical owner created with purpose, supported OP and explicit provenance.
- [x] Abstract state, actions, guards, effects, lifecycle and observed-history semantics recorded.
- [x] Negative cases distinguish group units, monitored quiet, missing time, recalled imprecision and contradictory assertions.
- [x] No silent automatic zero inference or claim of perfect observation.
- [x] Concept-intrinsic authority versus external policy/identity boundary flagged.
- [x] Open completeness and independence concerns assigned to later Phase 003/004 review.
- [x] No schema, endpoint, UI, algorithm, infrastructure or executable application artifact.

**Phase 003 remains in progress; implementation readiness not ready, execution not started, authorization not yet.**
