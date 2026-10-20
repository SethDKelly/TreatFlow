---
type: Product Scope Decision
title: TreatFlow 016-D — Factual Correction Scope Decision (Protected V Slice vs Noncorrecting Candidate)
description: Sponsor-facing choice for G-05 / 016-D — either authorize a minimal protected Revision slice or record an explicit noncorrecting synthetic MVP limitation with P-05 risk; closes the HOLD before cloud Track C.
tags: [treatflow, phase-016, revision, correction, product-decision, mvp, g-05]
---

# 016-D — Factual Correction Product Decision

## Purpose and authority

**STATUS: AWAITING EXPLICIT SPONSOR CHOICE; NOT AN IMPLEMENTATION AUTHORIZATION FOR REVISION CODE OR CLOUD WORK.**

This record closes [013-H G-05](../013/013-h-independent-exit-authorization.md) / [013-G proposed correction resolution](../013/013-g-architecture-mvp-delivery-decision.md) for the synthetic MVP path. Binding concept owners remain [Revision](../../canonical/concepts/revision.md), [Observation](../../canonical/concepts/observation.md) (especially O.Qualify ≠ factual rewrite — E-T16), [O/S/V composition](../../canonical/composition/observation-stewardship-revision.md), and purpose [P-05](../../canonical/purpose/purposes.md). Delivery owner: [MVP roadmap 016-D](../013/mvp-roadmap.md).

**Baseline:** merged `main` includes local Track L foundation (014-B L01–L04) and local seven-action Observation surface (016-B/C, PR #106). Qualify cannot replace counts. No Revision implementation exists.

**Why now:** Sponsor sequencing after 016-B/C is **016-D decision → cloud Track C**. Correction scope must be recorded before cloud packages invent silent count edits or over-claim “users can fix mistakes.”

## Decision options (choose exactly one)

### Option A — Minimal protected private Revision slice (conditional MVP)

| Element | Bound |
|---|---|
| In scope | Local-then-cloud **V.EstablishSubject → V.Amend → V.InspectHistory** for a reported Observation assertion; immutable predecessor; required rationale; entitled private view only |
| Entitlement | Technical Observation owner is **not** automatically a legitimate V amender; a separately designed correction entitlement must be tested (015/016) |
| Out of scope | Challenge/ResolveChallenge adjudication UI, Contribution Stewardship standing contests, public attribution, R/D release, unbounded community correction |
| Hard rule | No destructive `UPDATE` of evidence quantity; no O.Qualify rewrite |

**Consequences if chosen:** 016-D implementation packages (local semantic + later API) are required before claiming correction in MVP; cloud Track C may proceed in parallel on foundation work, but **016-E / 018 must not claim correction** until V slice exits. P-05 risk is reduced if entitlement is real; schedule and IAM/auth design cost increase.

### Option B — Explicit noncorrecting synthetic MVP limitation (recommended for immediate cloud switch)

| Element | Bound |
|---|---|
| In scope | Synthetic MVP candidate **without** factual count amendment; wrong amounts remain as reported (or user may add a *new* distinct report — not a silent replacement) |
| Disclosure | Product/UI and 018 materials must state clearly that **factual correction is not available** in this candidate |
| Hard rule | Continue E-T16: O.Qualify / UI must not rewrite counts; no “edit amount” shortcut |
| P-05 | Accept **recorded P-05 usability/accountability risk** for this candidate; reopen 016-D later for a V tranche if needed |

**Consequences if chosen:** No V implementation blocks Track C start; 016-D is **closed as limitation**, not as feature delivery. Later protected V remains possible under a new authorization. Preferred if the next priority is aws-backbone / 014-B-C01 cloud readiness.

## Recommendation (advisory, not a decision)

Given the agreed sequence (cloud switch immediately after this decision) and the current synthetic-only Track L surface, **Option B** is the lower-risk, schedule-aligned choice: it records G-05 without inventing correction entitlement before cloud identity/session design exists. Option A remains the better long-term P-05 fit once guest/entitlement (015-A) and protected nonprod are real.

## Sponsor decision ledger (fill on merge or in PR comment)

| Field | Value |
|---|---|
| **Choice** | □ Option A — minimal protected V slice · □ Option B — noncorrecting candidate limitation |
| **Decider** | _(name)_ |
| **Date** | _(YYYY-MM-DD)_ |
| **Notes** | _(optional constraints, e.g. revisit V after 015-A)_ |

Until a box is checked and this PR merges (or an equivalent signed note is recorded at this natural owner), **G-05 remains OPEN** and agents must not implement Revision or claim correction UX.

## Downstream effects after a recorded choice

| If Option A | If Option B |
|---|---|
| Authorize scoped 016-D-V01 local Revision domain + tests before or interleaved with Track C | Update 016-E / handoff language: noncorrecting candidate; keep E-T16 |
| Cloud API must preserve predecessor/successor; no last-write-wins count | Cloud API must reject quantity overwrite routes |
| 018 may require V negative tests | 018 must verify absence of false correction flows |

**Either choice:** Track C (014-B-C01 backbone trust, budget, OIDC) may proceed under **separate** sponsor authorization; this document alone does not authorize AWS writes.

## Explicit non-goals

- Not authorizing Contribution Stewardship, Research Provision, or Controlled Disclosure
- Not authorizing real-person intake (R-P02) or disclosure (R-P03)
- Not changing canonical Revision independence; Option B defers realization, it does not delete the concept from the family
