---
type: Concept Specification
title: TreatFlow — Observation (Provisional Behavioral Specification)
description: Abstract observation coverage, evidence unit, time and uncertainty semantics for Phase 003 review.
tags: [treatflow, concept, observation, provisional, phase-003]
---

# Observation — Provisional Behavioral Specification

**Status:** Specified provisionally in [003-C](../../phases/003/003-c-treatflow-execution.md); Phase 003/F and Phase 004 independence reviews pending. [Purposes P-01/P-02/P-03](../purpose/purposes.md). See [candidate history](candidates.md). This describes a single concept's behavior—not application composition, collection permissions, data-release policy, UI, event schema or implementation.

## Purpose

Let an observer make and inspect *bounded, qualified claims of actually observed activity and attention*, so observed silence, missing attention, event/group counting and recollected uncertainty remain distinguishable without assuming continuous reporting.

## Operational principle

An observer watches the entrance from 18:00–18:20 and reports one arriving group containing five visitors at approximately 18:07. The observed interval includes quiet time before/after that encounter. From 18:20–18:35 they are away and **do not** claim a zero count. They later add a recalled estimate for 18:35–18:50 with explicitly reduced time precision and uncertain watching coverage. An interpreter can inspect the evidence and distinguish the reported group encounter, visitor count, coverage claim, gap and approximate recollection; they cannot legitimately deduce five independent interarrival events or silently fill the unattended interval with zeros.

The story uses **record, delimit, qualify, inspect** as conceptual behavior; it specifies no buttons, real-time tracking method, storage events or statistical algorithm.

## Abstract domains and state

The domains below are abstract and independently defined, not imported from Contribution stewardship, Revision or any application type:

- `ObservationId`: opaque identity for one bounded observer account.
- `Observer`: abstract actor/source relation, **not** a publicly available personal or household identity.
- `TimeExtent`: an asserted instant, bounded interval or imprecisely known interval, with semantic precision/uncertainty when relevant; not a timestamp storage format.
- `Coverage`: an assertion about monitoring over a time extent with statuses **observed**, **not observed**, or **uncertain**, plus a precision qualifier where relevant.
- `Measure`: a declared unit (e.g., group encounters, individual visitors, or another explicitly identified unit), quantity or event claim, and uncertainty qualification. Different units are *not interchangeable*.
- `EvidenceItem`: a conceptual reported measure associated with an asserted event/interval and provenance of how it was known (**contemporaneous** or **recalled**, with uncertainty). It need not correspond to one person.
- `Lifecycle`: **open** or **closed** for the observational account. Closed means no more direct additions within this concept; it does not mean published, approved, retained forever or withdrawn elsewhere.

Abstract state for each established `ObservationId`:
1. `source : Observer`, meaningful only inside the concept's protected context;
2. `coverage : set of Coverage claims` with relevant time extents;
3. `evidence : set of EvidenceItem`;
4. `status : Lifecycle`.

No automatic infinite monitoring or absence-of-event observation is encoded. Sets do not imply a persistent data table; ordering matters only when semantic time relationships affect interpretation. Multiple observers at the same site have no built-in identity equivalence.

## Conceptual actions and consequences

| Action / initiator | Inputs and guard | Result and conceptual effect |
|---|---|---|
| **Establish** / observer | Source and intended observational context; source can meaningfully make an account | Establishes an open observation account with no coverage claims or evidence; returns its abstract identity |
| **AssertCoverage** / observer | Open account; time extent and monitoring status, including uncertainty/precision | Adds a *positive or negative assertion about attention*. Does not infer an arrival count or create event evidence |
| **Report** / observer | Open account; measure unit and quantity/event assertion, asserted time extent, provenance and uncertainty | Adds one qualified evidence item; returns reference to that assertion. A group claim need not be separate people-arrival events |
| **Qualify** / observer | Open account; target coverage/evidence assertion and additional qualification | Adds or refines a semantic qualifier **without silently replacing contradictory claims**; factual amendments or supersession outside this intrinsic qualification require 003-D Revision examination |
| **Inspect** / observer or legitimate interpreter | Established account and allowed conceptual scope | Returns coverage, reported evidence, units and uncertainty in distinguishable form; does not imply public disclosure authorization |
| **Close** / observer | Open account | Marks the account closed for new direct reporting; earlier assertions remain intelligible |
| **InspectAfterClose** / legitimate interpreter | Closed account and allowed conceptual scope | Returns the existing evidence and coverage without reopening or adding claims |

**Undefined here, not silently permitted:** the intrinsic right to revise another source's claim, retract a previously distributed result, unilaterally publish source identity, approve a research release, or decide a disputed report's credibility. Those need separate qualified concept/authority work.

## Constraints, invariants and temporal semantics

1. **No observed-zero inference from absence:** zero activity over interval `I` is supported only by an explicit claim of suitable observed coverage over `I` *and* a sufficiently complete account of the relevant declared measure during `I`. Coverage alone states attention, not necessarily guaranteed complete counts. An empty evidence set does not itself assert zero.
2. **No unobserved-zero inference:** an `not observed` or `uncertain` extent cannot be treated as confirmed zero arrivals. Lack of any coverage claim is **unknown**, not automatically `not observed` or `observed`.
3. **Units stay typed:** five visitors in one group is not semantically equivalent to five independent group encounters or five statistically independent event times.
4. **Event versus assertion time:** when an assertion is recalled later, its claimed event/coverage time and the act of recording it are distinct semantic facts; precision is not silently increased.
5. **Qualifiers are not evidence:** confidence labels, event-source method and time precision qualify an assertion; they do not independently prove its accuracy.
6. **Contradiction is exposed:** overlapping incompatible coverage claims or measurements must remain identifiable as unresolved rather than arbitrarily flattened into an exact timeline. 003-D may assign reconciliation responsibility.
7. **Closed means closed to direct additions:** Close does not itself erase, disclose, freeze external revisions, or promise downstream exclusion.
8. **No implicit household or public person identity:** an observer source is not automatically a site, a person named in any exported evidence, or a public persistent pseudonym.

**Completeness limitation:** An observed interval with zero reported encounters still requires an explicit *completeness/zero assertion* to justify a zero-valued observation, not merely an empty log. Such a claim can be expressed as a reported measure or a qualified coverage assertion; the exact natural boundary is **open for 003-F**. The concept does not certify truthfulness.

## Deliberate under-specification versus open questions

**Deliberately unspecified:** representation of time/identity, interface and entry method, whether observation uses real-time entries or retrospective recall, the precise vocabulary of precision qualifiers, sorting/display, and whether reporting is event-wise or aggregate where the declared unit/meaning remains clear.

**Open design questions, not accepted omissions:** how completeness is asserted for observed-zero inference; conflicting overlapping coverage claims; whether a correction is intrinsic to Observation or a separate Revision concept; whether meaningful source control belongs to Contribution stewardship; how long the open lifecycle may persist; whether Exposure deserves independent status. Resolve/assign these in 003-D/F and Phase 004 where appropriate.

**Outside this concept:** actual scientific inference, sampling representativeness, respondent verification, disclosure decisions, collection consent, data retention/deletion, and legal guarantees. Later phases must address safe data use before real collection/release.

## Boundary and validation handoff

- [003-D](../../phases/003/003-a-treatflow-execution.md) must assess genuine factual correction, authority and history without copying Observation state into another concept.
- [003-E](../../phases/003/003-a-treatflow-execution.md) must make evidence qualification intelligible to recipients without granting disclosure implicitly.
- [003-F](../../phases/003/003-a-treatflow-execution.md) must stress monitored zero/completeness, contradiction and imprecise intervals.
- Phase 004 tests whether observation and coverage are correctly factored as one independent concept.

**Implementation readiness not ready; execution not started; authorization not yet.**
