---
okf_version: "0.2"
type: Canonical Composition Specification
title: TreatFlow — Observation, Contribution Stewardship and Revision Composition
description: Scoped semantic bindings and guarded application-level actions for attribution and factual correction.
tags: [treatflow, composition, phase-005, observation, stewardship, revision]
---

# Observation, Stewardship and Revision — Current Composition Semantics

**Authority:** [005-C execution decision](../../phases/005/005-c-treatflow-execution.md). This document owns current application-level conceptual composition rules for these three independently specified concepts. Their [intrinsic specifications](../concepts/candidates.md) remain separate and authoritative. Scope is *conceptual*, not API, service choreography, database relations or authenticated production behavior. [005-E](../../phases/005/005-a-treatflow-execution.md) must recheck chaining/denial compatibility, and 005-F/G may revise these rules.

## Semantic identity and participation boundary

An `ObservationId` is an observational account; an `EvidenceItem` is a particular reported measure within it. A `Contribution Stewardship.Item` is a generic item eligible for a protected responsibility association. A `Revision.Subject` is a generic revisable factual claim and a `Revision.Assertion` is a version of it. **None of these identities is equal merely because it exists.**

An application may establish a scoped, justified correspondence **only when it knows what one evidence assertion means as a contribution and/or revisable subject**. Concept-level action outputs must supply an actual report reference and qualified assertion; a created observation *account* is not automatically a factual assertion or a Party. The corresponding parties, claimant bases and authorization remain separate contextual evidence—not derived from an address, household, public pseudonym or matching timestamp.

## Current guarded composition decisions

### C-01 — Optional legitimate contribution recognition

**Application intention:** enable an eligible participant to recognize responsibility for a particular previously or newly reported item while preserving the ability to report without a standing association.

- **Participants:** `Observation.Report` may provide a specific `EvidenceItem` reference; `ContributionStewardship.Associate` may register an association between an abstract `Party` and corresponding `Item`. `ContributionStewardship.Recognize` can later inspect it.
- **Binding:** only an expressly justified mapping `EvidenceItem → Item`; `Observation.Observer` is **not automatically** the `Party`.
- **Conditions:** the Party is independently eligible to claim the specified Item and the intrinsic `Associate` legitimacy guard is satisfied. A report may be made with no such association; contested or unavailable authority never invalidates an otherwise valid `Report`.
- **Outcome:** an eligible party can privately recognize a responsibility association *if* it was legitimately established. No public authorship/identity, correction authority, future-use consent, or disclosure permission results.
- **Exposure:** `Associate` remains **internal/conditional**, never an unrestricted public action. This is an **optional coordinated application action**, not a mandatory reactive synchronization on every `Report`.
- **Denial:** if standing cannot legitimately be established, no `Associate` occurs; the independent observation remains as reported.

### C-02 — Protected correction of an eligible reported assertion

**Application intention:** permit a legitimately authorized factual amendment while retaining historical observation claims, including after the observation account was closed.

- **Participants:** `Revision.EstablishSubject` establishes a revisable subject with its initial qualified assertion **only under legitimate subject registration**. A later `Revision.Amend` adds a successor. `Revision.InspectHistory` exposes qualifying correction history within entitled scope. No new `Observation.Report` or `Observation.Qualify` action is implied during amendment.
- **Binding:** an explicit, justified `EvidenceItem → Subject` association and initial qualified `EvidenceItem` assertion → `Revision.Assertion` content; source event unit, asserted time and uncertainty may not be silently erased. A report reference alone does not prove this binding is valid.
- **Conditions:** `EstablishSubject` and `Amend` must each satisfy Revision's legitimacy guard; legitimate standing information from Stewardship may be **relevant evidence**, but never automatically equivalent to `Amend` entitlement. Where amendment authority is unresolved or contested, the composed amendment action is unavailable; factual challenge may remain separately available.
- **Outcome:** a successor assertion and explanatory history within Revision. The original Observation remains intact; `Observation.Close` continues to bar new direct Observation reporting but does not itself forbid a separately eligible Revision action.
- **Exposure:** protected application correction is conditional; `EstablishSubject` is not independently public and is not automatically invoked for all reports. `MarkSuperseded` is not user-exposed to bypass contested-branch guards.
- **Denial:** if the assertion mapping, legitimacy, or history conditions fail, no correction occurs. No fallback destructive overwrite and no fabricated current truth.

### C-03 — Independent factual and responsibility disputes

A `ContributionStewardship.ContestStanding` challenges the relationship of a Party to an Item; `Revision.Challenge` challenges a particular Assertion's factual standing. They can occur separately. `DetermineStanding` changes responsibility standing only; `ResolveChallenge` changes factual-challenge disposition only. **No automatic cross-concept triggering** is established, and either determination does not silently confer the other's rights or settle disputed branches.

## Negative controls and temporal invariants

1. Reporting a group of five is possible without a Stewardship Party, Revision.Subject, household registration, real-world verification or public disclosure.
2. Two volunteers reporting from the same home receive no inferred shared Item or edit authority.
3. A contested responsibility association cannot silently grant `Revision.Amend`. Equally, a legitimate factual amender need not be inferred to be the household occupant.
4. An `Observation.Close` does not reopen to add corrections; a legitimately registered Revision subject can be amended separately, preserving original asserted evidence.
5. A correction of five to four preserves history, reported time/units and dispute semantics, rather than overwriting the original observation as though it never existed.
6. Multiple incompatible Revision successors remain contested until a legitimate conceptual resolution; no `MarkSuperseded` action may silently select one.
7. A factual `Challenge` does not force `Amend`; a protected-standing `ContestStanding` does not erase source provenance.
8. This composition makes **no** promise to retroactively alter prior Research Provision outputs, disclosure records or recipient-held copies.

## Open design obligations

- **005-D:** whether eligible revisions affect later evidence qualification or previously assessed disclosure, without invalidating historical copies.
- **005-E:** evaluate action chaining, optional registration paths, concurrent disputes, protected authority incompatibility and denied participants; re-open a concept if a necessary semantic input/action cannot be established.
- **005-F/G:** test P-01–P-06, user-facing application action coherence, current authority and over-/under-synchronization.
- **Later protected policy:** legitimate participant, amendment, challenge and adjudication authority, guardian/minor eligibility, retention and consent remain unresolved. These abstract guards **do not authorize real-world action**.

No event bus, synchronously coordinated write, transaction, account implementation, source schema, API, or UI is inferred.
