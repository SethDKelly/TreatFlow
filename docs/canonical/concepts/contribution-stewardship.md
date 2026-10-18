---
type: Concept Specification
title: TreatFlow — Contribution Stewardship (Provisional)
description: Abstract protected contribution-control behavior and independent-identity challenge.
tags: [treatflow, concept, provisional, contribution, phase-003]
---

# Contribution Stewardship — Provisional Behavioral Specification

**Status:** **Conditionally specified in [003-D](../../phases/003/003-d-treatflow-execution.md)**; independent end-to-end purpose **not proven**, Phase 003-F and Phase 004 factoring review required. Consult [purpose obligations P-04/P-05](../purpose/purposes.md), [candidate owner](candidates.md), and [Observation](observation.md). This document does not prescribe login, account, authorization infrastructure, or public contributor identity.

## Purpose and operational principle

Enable a willing contributor to **recognize the contributions for which they hold legitimate continuing responsibility and exercise bounded control over their standing**, without making a recognizable person or household part of research-visible identity.

**Archetypal story:** Two volunteers at one home independently contribute overlapping observations. Each later recognizes the contributions they can legitimately manage, and one initiates a request to correct their own report. Neither contributor acquires automatic control of the other's report merely by sharing the same address; research consumers need not learn either individual's identity. The request demonstrates contributor control but does **not** itself alter the observation's asserted truth.

**Identity challenge:** If the only resulting behavior is granting a credential, remembering an account, or forwarding a correction, this concept has no independent purpose. Its distinguishing promise is *continued, appropriately scoped responsibility for contributions*; 003-F must test whether that promise belongs inside Observation or Revision instead.

## Abstract types and minimal state

- `Party`: abstract potential contributor/holder of responsibility, not a verified real-world identity.
- `Contribution`: opaque thing capable of being associated with a responsible party, independent of Observation's private state/type.
- `Standing`: **active**, **relinquished**, or **contested**, describing stewardship relation only—not evidentiary truth, deletion, disclosure or withdrawal from external circulation.
- `Association`: relation among Party, Contribution, and Standing.
- `ControlRequest`: a pending or concluded request for a named **kind of control** over a Contribution, recording request party, disposition (**pending**, **accepted**, **declined**) and rationale where needed for user-understandable meaning.

State: a set of Associations, a set of ControlRequests, and the abstract authority relation determining who may exercise concept-intrinsic control. No household location, session credentials, public pseudonym, or copied Observation/Revision state is required. A request may be meaningful even when external fulfillment belongs elsewhere.

## Abstract actions

| Action | Semantic guard | Effect / user-recognizable result |
|---|---|---|
| **Associate** | Party legitimately able to claim responsibility for an unassigned or explicitly transferable Contribution | Establishes a bounded active responsibility association; returns its abstract reference |
| **Recognize** | Requester is entitled to inspect a scoped subset of associations | Returns the contributions they may steward and relevant standing; does not reveal other parties |
| **RequestControl** | Requester has standing to seek a specified control over a Contribution | Establishes a pending request with scope and reason; does not automatically correct observations or stop disclosed access |
| **ResolveControl** | A conceptually legitimate decision authority for this request is present | Accepts or declines with rationale; produces a determination, but another concept's state must not change implicitly |
| **ContestStanding** | Party can provide a meaningful challenge to a standing association | Marks the association contested without transferring ownership automatically |
| **Relinquish** | Legitimate holder elects to end their stewardship relation and is allowed to do so | Changes association standing without erasing the contribution, denying prior source provenance or promising external deletion |

**Intrinsic constraint:** only a legitimately responsible party or legitimate decision authority can exercise the relevant action. Exactly how that legitimacy is established, verified or delegated is **an open authority-design question**, not an assumed authentication mechanism.

## Invariants and lifecycle

1. Same household/site does not imply same Party, Contribution, or control authority.
2. Association alone does not prove observation truth, authorship identity to outsiders, or consent by household members/visitors.
3. A request or accepted request is not an automatic cross-concept correction, suppression, or revocation.
4. Contesting standing cannot silently transfer rights to an arbitrary challenger.
5. Research-facing information need not expose stewardship associations; this concept grants no publication permission.
6. Relinquishment changes stewardship standing, not prior distribution, retention or evidentiary existence.
7. Contested standing does not by itself settle the validity of the observation; other protected decisions remain unresolved.

Association starts absent, is established, may be contested or relinquished; requests have explicit pending/concluded histories. No indefinite account lifetime or retention period is asserted.

## Under-specification and unresolved identity

**Intentionally unspecified:** contributor identification mechanism, entitlement evidence, number of legitimate stewards, notification/presentation, concrete decision authority, processing time and implementation of accepted requests.

**Open, not waived:** independent purpose versus an entitlement relation inside Observation/Revision; response if two parties claim one contribution; semantics of a declined or accepted withdrawal request; administrative overreach; how this actor-contribution relation can be removed under future retention policies. If independent behavior remains only a bookkeeping wrapper at 003-F/004, **absorb/reframe and retire this standalone concept authority**.
