---
type: Phase Execution Record
title: TreatFlow 000-C — Observation Context, Research Hypotheses and Data Sensitivities
description: Domain distinctions, research questions, measurement limits and preliminary privacy exposure review.
tags: [treatflow, phase-000, observation, research, privacy]
---

# TreatFlow — 000-C Observation Context, Research Hypotheses and Data Sensitivities

## Decision and boundary

**000-C COMPLETE — 000-D NEXT ELIGIBLE AFTER MERGE.** This is project intake, not a finalized conceptual specification, database model, statistical analysis plan, legal determination, or application implementation. Inputs: [000-A](000-a-treatflow-execution.md), [000-B](000-b-treatflow-execution.md), [current project context](../../canonical/project/intake.md), and the [intake evidence contract](intake-knowledge-contract.md). Sponsor intent is the only available product-specific source; no observational dataset or participant validation is available.

## 1. Contextual domain glossary (provisional)

| Term | Meaning for investigation, not yet an approved software concept |
|---|---|
| Trick-or-treater | Visitor participating in Halloween collection of treats; individual count need not correspond to a group arrival |
| Arrival event | Encounter at an observed location at a time; the event-unit definition is unresolved |
| Group | Multiple people arriving together or nearly together; group count and visitor count differ |
| Count | Number reported for a defined unit and period, potentially exact or estimated |
| Reporter / contributor | Volunteer who supplies observations; identity and household are not automatically the same |
| Observation site/context | Setting about which observations are made; avoid presuming a stored precise household location |
| Observation window | A period during which the reporter was actually monitoring activity |
| Active observation | Reporter reasonably able to record arrivals during an identified interval |
| Zero observation | An actively observed interval with no arrivals, not a missing record |
| Non-observation | Period where monitoring did not take place or reliability is unknown |
| Report time | When a contributor sends data; may differ from observed event time |
| Event time | Claimed time of occurrence; may be exact, approximate, recalled or entered later |
| Reporting session | Candidate label for contiguous observation context, not a finalized concept or schema |
| Geographic category | State, metro area, settlement type or similar broad descriptor; granularity and disclosure policy undecided |

These distinctions prevent false equivalence among arrivals, visitors, groups, records, and observation minutes. They do **not** mandate a UI, data model, or specific method of reporting.

## 2. Measurement and exposure-to-observation considerations

For interpretable arrival-rate estimation, analysts need an understanding of the *time actually observed* (the exposure denominator). The absence of logged arrivals is not evidence of zero arrivals unless an observation window was active. Breaks, late starts, early stops, delayed self-reporting, intermittent monitoring, and partial attention can introduce censoring and missingness.

A single group encounter can contribute one arrival event but multiple visitors. Possible observation units include group encounters, individual visitors, or counts in predetermined bins. These support different statistical questions. Timestamp provenance, local timezone and daylight-saving context, time precision, date, and potential device/reporting delay may materially affect analysis; exact fields are deferred.

Observer selection (for example, participating households versus all households), region, weather, local community schedules, candy exhaustion, and household visibility are potential confounders or modifiers, **not verified causal explanations**. There is currently no evidence about participation representativeness or reporting error.

## 3. Research hypotheses and competing explanations

**Primary sponsor-proposed research question:** Under what circumstances, if any, do observed trick-or-treater arrival counts or interarrival times resemble a Poisson process?

- **H0 (conditional model candidate):** For a defined observed period and arrival unit, events may follow a homogeneous Poisson process with constant rate, independent increments and exponential interarrival times.
- **Alternative A:** Rate varies over the evening (nonhomogeneous Poisson process); apparent failure of a constant-rate model does not itself refute all Poisson-process models.
- **Alternative B:** Grouping, social coordination, neighborhood movement, or other dependence produces clustered, inhibited, or compound arrivals.
- **Alternative C:** Excess variation, reporting gaps, rounding/heaping, retrospective reporting or mixtures of households induce non-Poisson patterns in the *observed data*.

These are candidate explanatory models, not hypotheses already tested, mutually exhaustive alternatives or fixed validation procedures. A Poisson *count marginal* alone does not prove a Poisson *process*; analyst interpretation requires observation windows, time resolution and consideration of independent increments. Analyses across unequal observation durations or unstandardized rates can be misleading.

Potential evaluation dimensions for later methodological work: relationship of mean and variance at comparable exposures, interval count distributions, time-of-evening rate variation, interarrival behavior if suitable event times exist, independence/serial clustering, sensitivity to group-versus-person units and reporting uncertainty. Do not precommit p-value thresholds or tests at intake.

## 4. Sensitivity and disclosure threat considerations

The **internal contributor identity**, **observation context**, and **released analytical records** are distinct information domains. A unique identifier needed to deter duplicates or allow corrections is not necessarily suitable for disclosure to dataset consumers. Releasing a stable pseudonym can still enable longitudinal linkage and re-identification.

Potential risks:
- Exact or narrow geographic descriptors combined with precise event times, sparse samples, or other outside information may identify a residence or observer.
- A reporting series can reveal occupancy, activity, monitoring gaps, or patterns of presence/absence at a household.
- Small geographic cells, repeated years, unique sessions, public rankings, and linkage of separate exports can erode anonymity.
- Authentication contact information, network metadata and operational logs may themselves carry sensitive links; their retention and access are unresolved.
- Visitors, often minors, must not be assumed to have consented to individual identification or tracking.
- Even aggregated records may disclose individuals if sparse or differenced across successive releases.

**Design implication, not architecture:** assess need for collection separately from release; minimize precise household location and visitor information; consider geography/time coarsening, suppression thresholds, participant unlinkability and delayed/non-live release in later policy design. No particular anonymization level can yet be certified safe; public versus researcher-gated export is unresolved.

## 5. Quality and misuse scenarios requiring later treatment

- A reporter logs five children as five independent arrivals when they appeared in one group.
- A reporter records no entries for an hour but was away from the door.
- A participant retroactively submits approximate intervals with apparently precise timestamps.
- Duplicate submissions or intentional fabricated observations alter estimated rates.
- A timezone error shifts timing or midnight boundaries, undermining comparison.
- Two participants report the same observation site, creating potential duplicate coverage.
- Data consumers join repeated exports to infer household identity.
- Public displays or downloads invite competitive exaggeration, stalking or other misuse.

These are risk cases for concept discovery and scope/privacy review, **not claims of observed misuse**.

## 6. Handoff to 000-D and beyond

000-D must decide or explicitly defer scope and policies concerning: eligible contributors including minors; intended initial reporting modes; whether observation exposure can be understood with reasonable burden; geographic collection versus release; account-to-observation linkage; correction/withdrawal and data retention; public versus restricted export; acceptable privacy tradeoffs; fraud/quality expectations; and non-goals. Later concept design should test whether a reporting session is needed and distinguish a household/site from contributor identity without treating this document as a schema.

Phase 001 can challenge the relative priority of participatory fun, rigorous analysis, privacy and low friction. The scientific objective is exploratory: data must permit potential rejection or refinement of the Poisson hypothesis.

## Completion evidence

- [x] Distinguishes individual visitors, group arrivals, observed intervals, zero-arrival intervals and missing exposure.
- [x] Explicitly separates occurrence time from submission time and identifies precision/timezone concerns.
- [x] States the Poisson hypothesis conditionally with meaningful competing models and selection bias.
- [x] Surfaces geographic, temporal, identity-linkage and sparse-data disclosure sensitivities.
- [x] Identifies risks and uncertainties without inventing observations or legal rulings.
- [x] Maintains a compact current canonical project owner, with this file as historical reasoning.
- [x] Does not define a database schema, UI, API, authentication mechanism, statistical acceptance criterion or infrastructure.

**Implementation readiness: not ready. Execution: not started. Authorization: not yet. Phase 000 remains open.**
