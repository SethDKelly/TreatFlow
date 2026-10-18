---
type: Concept Specification
title: TreatFlow — Revision (Provisional)
description: Representation-independent correction history and factual supersession behavior, subject to independence challenge.
tags: [treatflow, concept, provisional, revision, phase-003]
---

# Revision — Provisional Behavioral Specification

**Status:** **Conditionally specified in [003-D](../../phases/003/003-d-treatflow-execution.md)**; may be absorbed into Observation after Phase 003-F/004 independence testing. See [purpose P-02/P-05/P-06](../purpose/purposes.md), [Observation](observation.md), and [candidate owner](candidates.md).

## Purpose and operational principle

Enable an authorized contributor or adjudicator to **make the factual standing and history of a previously asserted claim intelligible after a correction**, preserving the distinction between superseded and current claims.

**Archetypal story:** A contributor realizes their group-size claim was five rather than four. A revision associates a new assertion of four with the original assertion of five; an interpreter can distinguish both versions and their relationship. A third party may challenge reliability but cannot thereby replace the author's factual assertion. Withdrawal of permission for *future use* is distinct from factual revision and does not remove already distributed copies.

**Identity challenge:** The end-to-end behavior is managing a meaningful supersession history. If this is only a `Correct` action naturally belonging to Observation, 003-F/004 must consolidate it rather than retaining Revision as a separate concept for historical neatness.

## Abstract types and state

- `Subject`: abstract revisable claim identity, not imported from Observation.
- `Assertion`: an opaque version of the subject's semantic content and declared qualification.
- `RevisionLink`: a predecessor/successor relation plus a rationale and conceptual order when necessary for intelligible history.
- `Challenge`: a separately distinguishable question about the reliability/standing of an assertion; **not** a replacement assertion.
- `Disposition`: unresolved, accepted, or rejected challenge status, with reason where meaningful.

State: for each Subject, a nonempty set of Assertions when established; a relation of RevisionLinks between Assertions; any Challenge records and dispositions; a conceptual authority relation for making amendments or adjudicating challenges. No copied evidence/coverage state, account schema, append-only storage mandate or public author identifier.

## Actions with guards/effects

| Action | Guard / inputs | Effect |
|---|---|---|
| **EstablishSubject** | An initial assertion can be legitimately registered as revisable | Establishes Subject with first assertion; returns identity |
| **Amend** | Authorized amender, existing assertion, proposed replacement assertion and rationale | Adds a distinct successor assertion and link; predecessor remains historically identifiable rather than being silently overwritten |
| **InspectHistory** | Requester entitled to the specified conceptual view | Returns assertions, predecessor/successor relationships and unresolved disputes without treating all versions as simultaneous facts |
| **Challenge** | Actor with legitimate ability to challenge, specified assertion and reason | Adds an unresolved challenge; does not amend or revoke an assertion |
| **ResolveChallenge** | Authorized resolver with sufficient conceptual grounds | Records acceptance/rejection and rationale; neither outcome automatically rewrites assertions |
| **MarkSuperseded** | Valid successor and decision needed to designate an assertion no longer current | Identifies superseded status only within revision semantics, without publication/retention side effects |

## Invariants and temporal history

1. Amendment never silently destroys the earlier assertion's semantic existence in revision history.
2. A successor has an identified predecessor and distinguishable correction rationale; history cannot contain revision cycles.
3. Conflicting successors, if permitted, remain visible as a conflict rather than being arbitrarily selected as current; **the branching/current-version rule is unresolved for 003-F**.
4. Merely challenging or disputing an assertion does not grant authority to amend it.
5. A revision is not a withdrawal of future use, consent revocation, or recall of previously shared data.
6. Subject version identity and protected amender entitlement do not imply public identity disclosure.
7. A revision has no intrinsic permission to edit Observation's private state; any relationship to observed claims requires later conceptual composition, not an assumed call between concepts.

## Under-specification and questions

**Intentionally unspecified:** storage history strategy, ordering representation, specific reason taxonomy, revision display, authentication and adjudication infrastructure, and exact concurrency conflict-resolution algorithm.

**Must be decided for coherent semantics in 003-F:** how many simultaneously current successors are allowed, what makes an amendment authorized, how disputed corrections alter research-facing interpretation, and whether a closed Observation still supports correction. These cannot be treated as harmless omissions. Phase 004 must assess whether a revisable Subject with no independent human context is overgeneric and should be merged into Observation.
