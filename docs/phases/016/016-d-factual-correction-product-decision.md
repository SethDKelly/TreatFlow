---
type: Product Scope Decision
title: TreatFlow 016-D — Factual Correction Scope Decision (Bounded Option B Deferral)
description: Sponsor-recorded G-05 closure for the synthetic MVP path — Option B noncorrecting candidate as bounded deferral (not final product direction); Option A remains the stronger eventual fit; concrete revisit trigger and pre-018 disclosure obligations.
tags: [treatflow, phase-016, revision, correction, product-decision, mvp, g-05]
---

# 016-D — Factual Correction Product Decision

## Purpose and authority

**STATUS: OPTION B RECORDED AS BOUNDED DEFERRAL FOR THE SYNTHETIC MVP CANDIDATE. NOT FINAL PRODUCT DIRECTION. NOT AN AUTHORIZATION FOR REVISION CODE OR CLOUD WORK.**

This record closes [013-H G-05](../013/013-h-independent-exit-authorization.md) / [013-G proposed correction resolution](../013/013-g-architecture-mvp-delivery-decision.md) for the **current synthetic MVP path only**. Binding concept owners remain [Revision](../../canonical/concepts/revision.md), [Observation](../../canonical/concepts/observation.md) (especially O.Qualify ≠ factual rewrite — E-T16), [O/S/V composition](../../canonical/composition/observation-stewardship-revision.md), and purpose [P-05](../../canonical/purpose/purposes.md). Delivery owner: [MVP roadmap 016-D](../013/mvp-roadmap.md).

**Baseline:** merged `main` includes local Track L foundation (014-B L01–L04) and local seven-action Observation surface (016-B/C, PR #106). Qualify cannot replace counts. No Revision implementation exists.

## Sponsor decision ledger

| Field | Value |
|---|---|
| **Choice** | **Option B — noncorrecting synthetic MVP limitation (bounded deferral)** |
| **Decider** | Sponsor (explicit chat authorization) |
| **Date** | 2026-10-19 |
| **Character** | Bounded deferral for the current synthetic candidate — **not** the final product direction for trustworthy personal records |
| **Eventual direction** | **Option A** (minimal protected private Revision slice) remains the stronger eventual fit once durable personal-record semantics are in scope |

### Why Option B now

The current candidate uses **synthetic data**. Factual correction therefore adds less immediate product value than resolving:

1. backbone trust (014-B Track C / aws-backbone),
2. private admission / principal entitlement (015-A path),
3. deployment boundaries (protected nonprod, no accidental public intake).

P-05 usability/accountability risk is **accepted for this synthetic candidate** and must stay visible; it is not waived for later personal-record work.

## Binding Option B obligations

### 1. No factual amendment in this candidate

- No V.EstablishSubject / V.Amend / V.InspectHistory implementation under this decision.
- No destructive `UPDATE` of evidence quantity; no O.Qualify rewrite of counts (E-T16).
- No “edit amount” or last-write-wins count shortcut in UI or API.

### 2. A second report never repairs or supersedes a mistaken report

Adding another Observation report creates a **new, distinct assertion**. It does **not**:

- repair, replace, void, or supersede a prior mistaken report;
- act as a silent correction or “latest wins” truth;
- authorize treating the newer count as the historical correction of the older one.

Wrong amounts remain as reported. Any future true correction requires a separately authorized **Revision** path (Option A revisit), not Observation re-reporting.

### 3. Visible noncorrection language before hosted candidate qualification

Before **hosted** synthetic candidate qualification ([018](../013/mvp-roadmap.md) or any equivalent hosted PASS claim):

- Product/UI and qualification materials **must** show clear, user-visible language that factual correction is **not available** in this candidate.
- 018 must verify absence of false correction flows and must not claim P-05 correction satisfaction.
- Localhost-only Track L demos may proceed without hosted 018, but any **hosted** candidate gate inherits this disclosure requirement.

### 4. Concrete revisit trigger (reopen toward Option A)

Reopen 016-D to evaluate **Option A** (minimal protected V slice) when **either** of the following becomes true — whichever comes first:

| Trigger | Condition |
|---|---|
| **T1 — Personal-record intent** | A proposed package would treat Observation assertions as durable **personal records of truth** for a real or enrolled principal (beyond throwaway synthetic fixtures), **or** R-P02 real-person intake is proposed |
| **T2 — Foundation readiness** | All three are independently exited or separately authorized: (a) 014-B Track C backbone trust baseline, (b) 015-A private principal/admission entitlement contract, (c) protected nonprod deployment boundaries with synthetic-only enforcement |

Until T1 or T2 fires and a new sponsor choice records Option A (or an updated limitation), agents must not implement Revision or claim correction UX.

## Deferred Option A (reference; not authorized)

| Element | Bound |
|---|---|
| In scope | Local-then-cloud **V.EstablishSubject → V.Amend → V.InspectHistory**; immutable predecessor; required rationale; entitled private view only |
| Entitlement | Technical Observation owner is **not** automatically a legitimate V amender |
| Out of scope | Challenge/ResolveChallenge UI, S standing contests, public attribution, R/D release, unbounded community correction |
| Hard rule | No destructive quantity rewrite; no O.Qualify rewrite |

## Downstream effects (Option B recorded)

| Obligation | Owner / gate |
|---|---|
| Keep E-T16; reject quantity overwrite routes in any later API | 015-C / Track C API packages |
| 016-E / handoff: noncorrecting candidate; second report ≠ correction | 016-E |
| Visible noncorrection disclosure before hosted 018 | 016-E UI + 018-A/B |
| Track C may proceed under **separate** sponsor authorization | 014-B-C01… |
| On T1 or T2: new 016-D (or successor) decision before V code | Product authority |

This document alone does **not** authorize AWS writes, Revision implementation, or real participant collection/disclosure.

## Explicit non-goals

- Not authorizing Contribution Stewardship, Research Provision, or Controlled Disclosure
- Not authorizing real-person intake (R-P02) or disclosure (R-P03)
- Not deleting Revision from the concept family; Option B **defers** realization for the synthetic candidate only
- Not declaring Option B as the long-term product direction
