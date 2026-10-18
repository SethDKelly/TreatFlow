---
type: Phase Execution Record
title: TreatFlow 004-C — Stewardship, Revision and Correction Authority Factoring
description: Counterexample-driven boundary decision, reduced stewardship and retained independent revision semantics.
tags: [treatflow, phase-004, authority, revision, stewardship, modularity]
---

# TreatFlow — 004-C Contribution Stewardship, Revision & Correction-Authority Boundaries

## Decision

**004-C COMPLETE — 004-D NEXT ELIGIBLE AFTER MERGE.** The evidence supports two distinct *provisional* purposes but **not** the Phase 003 generalized control-request wrapper:

1. **Contribution Stewardship — RETAIN / REDUCE / REFRAME:** responsibility association, recognition, contested standing and relinquishment. Remove general-purpose requests for other concepts' outcomes; they do not fulfill stewardship's own purpose.
2. **Revision — RETAIN WITH NARROWED DOMAIN:** factual assertion correction and intelligible successor/dispute history are conceptually useful apart from an original observation; challenge concerns factual standing, **not** ownership standing or permission withdrawal.
3. **Observation — RETAIN** its 004-B integrated monitoring/evidence scope and direct-entry closure. It does not intrinsically need to own history for every revisable claim.

These are **boundary decisions subject to the 004-E cross-candidate independent audit**, not final implementation architecture or a presumption that five concepts will remain.

Inputs: [004-A plan](004-a-treatflow-execution.md), [004-B Observation decision](004-b-treatflow-execution.md), [003-D provisional behavior](../003/003-d-treatflow-execution.md), current [Stewardship](../../canonical/concepts/contribution-stewardship.md), [Revision](../../canonical/concepts/revision.md) and [Observation](../../canonical/concepts/observation.md), and P-02/P-04/P-05/P-06 [purposes](../../canonical/purpose/purposes.md).

## 1. Specificity and competing boundary tests

| Alternative | Decisive behavioral counterexample | Disposition |
|---|---|---|
| Embed all stewardship in Observation | Two volunteers claim responsibility for a generic contributed item; attribution dispute exists independently of whether activity was observed | **Reject mandatory Observation coupling**; retain generic item-standing behavior |
| Retain old Stewardship requests for correction/withdrawal | An accepted request has no effect on corrected factual content or future release; becomes a generic authorization/work queue serving heterogeneous purposes | **Remove RequestControl/ResolveControl** from intrinsic stewardship semantics |
| Generic contributor account/identity concept | Identifying an account alone cannot establish legitimate standing over a contribution; household equivalence is dangerous | **Reject account-centered boundary** |
| Embed all Revision within Observation | A revisable qualified claim may be unrelated to a monitored activity account; correction history and contested versions remain recognizable and useful | **Retain Revision provisionally** |
| Generic edit operation only | Overwriting five with four loses predecessor, rationale, contested branches and currentness | **Reject edit-only fragment** |
| Merge Stewardship and Revision | Authorship/standing may change without the reported factual claim changing; a legitimate factual correction may occur without changing contribution ownership | **Reject merger**; distinct purposes, even if coordinated later |
| Add standalone challenge/adjudication concept | Attribution contests and factual challenges apply to different domains with different authority; no third user-facing purpose established | **Reject unmotivated sixth concept** |

## 2. Minimum completeness and peer-removal tests

**Stewardship:** Associate, Recognize, ContestStanding, DetermineStanding and Relinquish provide a self-contained lifecycle for responsibility association. Without Recognize there is no value to the holder; without meaningful contest/determination, a false association could remain unchallengeable. This need not approve correction or disclosure.

**Revision:** EstablishSubject, Amend, InspectHistory and branch/dispute standing make historical correction understandable. Without retaining predecessor/successor links, changes become destructive edits. Independent abstract Subjects/Assertions need not be Observations. Challenge and resolution do not automatically authorize amendment.

**Observation:** Continues to record and inspect observational facts with bounded coverage and claimed completeness. A closed observation forbids direct reporting. Independent legitimate factual correction after closure may be possible but cannot implicitly mutate its private evidence set; this is a potential future composition seam, not a reason to embed revision actions into Observation.

**Genericity:** The `Item` in Stewardship and `Subject` in Revision are generic identities; arbitrary renaming preserving identity equality should not change valid actions. Legitimate responsibility standing and historical revision links retain their distinctive semantics; neither imports the other's state.

## 3. Protected authority and edge-case invariants

- **Two observers, one residence:** source standing remains distinct; neither automatically acquires authority over the other's evidence.
- **Five revised to four:** revision history preserves both assertions and relation; a reader can identify disputed currentness if branches conflict.
- **Disputed provenance versus disputed accuracy:** Stewardship resolves *who holds legitimate contribution responsibility*; Revision resolves *which factual assertion supersedes another*. One finding does not imply the other.
- **Challenger versus amender:** a third-party challenge never grants unilateral amendment rights.
- **Future-use withdrawal versus factual correction:** future disclosure permission is not a factual revision or relinquishment of standing; previously delivered copies cannot be guaranteed recalled.
- **Malicious/unbounded demands:** none of these concepts promises automated enforcement of every control request or an enterprise moderation team. P-06 operating load needs independent validation.
- **Closed observation:** closed to direct new reports; later legitimate revision does not automatically rewrite the earlier conceptual account or its prior releases.

## 4. Canonical re-specification and carry-forwards

The natural [Contribution Stewardship owner](../../canonical/concepts/contribution-stewardship.md) was rewritten to Phase 003-quality purpose/OP/types/state/actions/guards/invariants/history with the reduced, independently valuable scope; no competing replacement document was created. [Revision](../../canonical/concepts/revision.md) was clarified in place to distinguish factual challenge from contributor standing. Phase 003's broader request semantics remain in historical evidence only; current canonical specification governs.

**004-E:** independently challenge whether contributor standing can truly operate without being a permission wrapper, whether the Revision OP is independent rather than an overgeneric edit history, and whether resulting purposes remain minimally complete. Reopen 004-C if a real contradiction appears.

**Phase 005 (hypothesis only):** corrected factual standing may need to affect what research evidence is considered current; contributor status may constrain permitted corrections. No synchronization is designed.

**Later protected policy:** legitimacy of parties, evidence required for contested ownership, who may adjudicate factual claims, minor participation, privacy/consent, retention and withdrawals must be decided before use. No real-world authorization regime is asserted.

## 5. Gate

- [x] Distinct purposes compared through behavioral counterexamples.
- [x] Conditional Stewardship and Revision received explicit dispositions.
- [x] Generic request-fragment removed from current Stewardship spec.
- [x] Revised Stewardship is behaviorally re-specified to Phase 003 standard.
- [x] Revision/Observation separation retains post-close and contested history meaning.
- [x] Protected authorship ≠ factual truth ≠ disclosure authority.
- [x] No implementation artifacts or authoritative cross-concept synchronizations created.

**Implementation readiness NOT READY; execution NOT STARTED; authorization NOT YET.**
