---
type: Concept Specification
title: TreatFlow — Contribution Stewardship (Refined)
description: Generic protected responsibility standing over contributed items, corrected at 004-C.
tags: [treatflow, concept, contribution, phase-004, provisional]
---

# Contribution Stewardship — Refined Behavioral Specification

**Status:** **RETAIN, REDUCE AND REFRAME** in [004-C](../../phases/004/004-c-treatflow-execution.md); Phase 004-E independent recheck pending. [Purposes P-04/P-05](../purpose/purposes.md). Supersedes the broader Phase 003 specification that treated general-purpose control requests as intrinsic. This concept is about **recognizable responsibility standing**, not authentication, public authorship, permission to edit or requests to every other concept.

## Purpose and operational principle

Enable a contributor to **recognize and, when legitimately warranted, contest or relinquish a protected association of responsibility to contributed items** without inferring public identity or responsibility from a shared household.

Two volunteers report activity from one location. Each may privately recognize the contributions for which they have legitimate standing. If an attribution is erroneous, an affected contributor contests that association; its standing becomes unresolved until an authorized determination is made. One may later relinquish their standing, but the underlying evidence does not disappear and nobody acquires unilateral amendment or release rights. This story has a meaningful result *without requiring an Observation or Revision concept*: the meaning of responsibility associations themselves can be understood and challenged.

## Abstract domains and state

- `Party`: abstract claimant/holder; **not** a login account or public identity.
- `Item`: generic contributed object identity with no imported Observation type.
- `Standing`: association of Party to Item with **active**, **contested**, or **relinquished** status.
- `Determination`: protected conclusion about contested standing with rationale; may affirm, replace or decline an asserted association under a legitimate authority basis.

State: associations and any current unresolved contest/determination history sufficient to explain standing. No contributor addresses, public pseudonyms, credentials, control requests, corrections, withdrawal state, or copied Observation content. Multiple legitimate parties may hold separate standing for an Item where valid authority permits; the same address never entails shared control.

## Conceptual actions

| Action | Guard / inputs | Semantic effect |
|---|---|---|
| **Associate** | Legitimate claimant and Item, consistent with standing requirements | Records claimed/accepted association without proving identity publicly |
| **Recognize** | Entitled Party and scope | Returns that Party's standing and contest state without exposing unrelated contributors |
| **ContestStanding** | Legitimate affected challenger, identified association and rationale | Marks standing contested; does not transfer responsibility or alter the item |
| **DetermineStanding** | Authorized decision maker, contested standing and justified determination | Resolves or refuses resolution of association standing; preserves intelligible contest rationale |
| **Relinquish** | Legitimate active holder and permitted relinquishment | Changes association to relinquished without deleting or changing the Item |

## Invariants, lifecycle and authority

1. A source's or household's identity is not publicly implied by Item standing.
2. Sharing a site, name, device or arrival report does not grant control over another Party's association.
3. `ContestStanding` does not confer amendment authority; `DetermineStanding` changes **standing only**, not observation truth or disclosure.
4. Relinquishment is not deletion, future-use withdrawal, retroactive consent rescission, public anonymization or historical revision.
5. Conflict cannot be settled by last claim or household ownership alone.
6. The abstract legitimacy of claimants and resolvers must be justified; which actors qualify and what evidence is required remain protected policy/authority obligations.
7. No indefinite retention, real-world verification or public transparency requirement follows from the concept.

An association may be established, contested, determined or relinquished. These states have observable meaning even if all other application concepts are absent.

**Deliberately unspecified:** actor authentication, proof-of-identity mechanism, adjudication workflow, implementation and presentation.

**Explicitly removed from intrinsic behavior:** Phase 003's `RequestControl` and `ResolveControl` general-purpose external requests. Their only promised effect was tracking acceptance, not satisfying a distinct responsibility purpose. Appropriate requests to correct, withdraw future disclosure or amend a claim belong to the concept that owns that requested **outcome**, or later authority/composition design; no generic request-manager is adopted by default.

**Phase 004-E challenge:** determine whether protected standing remains a complete independent concept or can be represented as intrinsic source/provenance semantics in another coherent concept without erasing contested responsibility.

## 004-E cross-candidate independence check

**004-E independence clarification:** Responsibility standing is meaningful for a generic Item without Observation or Revision. DetermineStanding changes attribution standing only; it does not authorize factual amendment, approve disclosure, or establish real-world legal rights. A legitimate decision basis is an explicit unresolved input, not imported private state.
