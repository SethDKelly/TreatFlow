---
type: Phase Execution Record
title: TreatFlow 004-B — Observation and Exposure Modularity Decision
description: Adversarial comparison of unified observation, split exposure and alternative measurement boundaries.
tags: [treatflow, phase-004, observation, exposure, modularity]
---

# TreatFlow — 004-B Observation & Exposure Boundary, Specificity and Minimal Completeness

## Decision

**004-B COMPLETE — RETAIN INTEGRATED OBSERVATION; DO NOT CREATE STANDALONE EXPOSURE. 004-C NEXT ELIGIBLE AFTER MERGE.** Under the current [purpose baseline](../../canonical/purpose/purposes.md), watched coverage, reported measurements and reporting completeness serve one characteristic end-to-end purpose: expressing *what an observer can legitimately claim to have witnessed*. [Observation's current canonical specification](../../canonical/concepts/observation.md) is clarified to make that promise coherent. This is a **Phase 004 factoring decision**, not a permanent ban on discovering a distinct exposure concept if a later independently valuable purpose emerges.

Inputs: [004-A audit plan](004-a-treatflow-execution.md), [003-C specification evidence](../003/003-c-treatflow-execution.md), [003-F completeness repairs](../003/003-f-treatflow-execution.md), and [002-C O-A–O-D alternatives](../002/002-c-treatflow-execution.md).

## 1. Competing boundary experiments

| Alternative | Independent value and counterexample | Finding |
|---|---|---|
| **O-A Event diary alone** | Quick one-off group reporting offers value without known monitored periods, but cannot support observed-zero/rate denominator claims; diary silence may mean observer absent | Useful incomplete-coverage reporting mode **within** Observation; not sole concept boundary |
| **O-B Watched-period accounting alone** | Can record 18:00–18:20 attended interval with reported zero groups, even if no discrete arrivals occur; independently describes effort, but not event measurements or counted arrivals needed by P-02 | Valuable behavior, but insufficient independent TreatFlow purpose as a separate application concept under current needs |
| **O-C Bounded claim alone** | Generic assertion of event or interval with uncertainty can be independently understood, yet overly generic if it loses units, coverage and completeness rules | Retain only its useful abstraction inside Observation; do not establish a generic Claim engine |
| **O-D Separate Observation + Exposure** | Independent exposure diary is conceivable for staffing/attendance research; but TreatFlow lacks a distinct human purpose for that diary, and either half is unintelligible for truthful observed-zero inference without coordinated semantics | **Reject split at present**: increases intrinsic purpose fragmentation and premature Phase 005 reliance |
| **Integrated Observation with independently qualified report and coverage claims** | Observer can report an isolated group with unknown coverage, an observed interval with explicit completeness, or both, while respecting their distinct evidence meanings | **Retain and clarify**: one concept purpose, several forms of partial observation |

The rejected alternatives remain legitimate research counter-hypotheses; no determination rests on UI, data storage, counts of actions, or engineering convenience.

## 2. Specificity, completeness, independence and genericity tests

**Specificity:** A contributor may want to report an event but not its surrounding monitoring interval; or to report zero arrivals for a monitored interval without having a separate arrival event. These are *independently usable actions*, not automatically independent concepts. Both are coherent expressions of bounded observation claims about the same measurement purpose. A standalone exposure accounting concept would need a distinct end-to-end benefit (for example, staffing accountability) not established by P-01–P-03.

**Minimum completeness:** Remove `AssertCoverage` and the OP cannot distinguish observed quiet from absence. Remove `Report` and the OP cannot represent observed arrivals. Remove completeness qualification and a watched empty log can misleadingly appear as zero. Remove `Inspect` and the claim's time/unit/uncertainty meaning cannot be used. The unified set is necessary to support P-02's interpretable observations, while allowing users to assert only what they actually know.

**Peer-removal independence:** With Contribution Stewardship, Revision, Controlled Disclosure and Research Provision conceptually absent, an observer can still establish, qualify, inspect and close an Observation. Corrections by others, protected release and external research use are separate purposes, not intrinsic prerequisites. Observer is an abstract source, not a peer type.

**Genericity:** Identity of observer and account may be abstract/opaque; event or group measurement units and coverage semantics are **not interchangeable identity tokens**. Permuting units such that five people equal five independent encounters changes observable meaning and must not be generalized away. Observation may be reusable for other watched activities, but that is not a mandate to create an unrestricted Claim concept.

## 3. Counterexamples and failures prevented

| Case | Required supported interpretation |
|---|---|
| One group of five at 18:07, no watching claim | One group event, five visitors as separate declared quantity; **unknown coverage** outside the claimed event |
| Watched 18:00–18:20, no arrivals and explicitly complete for groups | A **claimed observed zero groups** over that bounded period; not proven perfect surveillance |
| Watched 18:00–18:20 but coverage only partial for arrivals | **Zero not established**, even if entries absent |
| Gone 18:20–18:35 | No inferred monitoring or zero; explicit absence/unknown if asserted |
| Recollection after Halloween | Event time and later recording time distinct; time precision/quality retained |
| Contradictory overlap | Contested extent cannot be combined into exact continuous coverage |
| Independently supplied two-observer data | No inferred same-person/household identity, no automatic averaging or deduplication |
| Report after Close | No direct new evidence; post-closure corrections belong to 004-C's Revision boundary audit |

An observed-zero semantic rule requires a **positive assertion of zero or complete observation of the relevant declared measure over the entire intended extent**, in addition to claimed watched coverage; absence of entries is not self-authenticating evidence. The [canonical specification](../../canonical/concepts/observation.md) identifies how the observer may state this abstractly without assuming interfaces.

## 4. Correction to current behavioral specification

The canonical Observation owner gains one explicit **004-B boundary and minimal-completeness section**: integrated behavioral boundary, supported partial claim modes, completeness guard, independence counterexample and remaining correction/authority seam. No separate Exposure owner is created, and no existing Phase 003 statement is superseded without a pointer. The Phase 003 OP/actions remain valid, with clarification rather than a new unproven lifecycle.

**Retained:** Observation.

**Not created:** Exposure as a standalone concept.

**Still conditional:** Contribution Stewardship, Revision and Research Provision; Controlled Disclosure remains to be challenged in 004-D.

## 5. Remaining Phase 004/005 and external questions

- **004-C:** whether amendments and protected contributor responsibility are intrinsic behaviors or independent concepts; a closed observation's direct-entry rule is not the same as the authority to correct historic evidence.
- **004-D:** whether research evidence suitability and permitted availability form one or two independent purposes.
- **004-E:** revisit if actual corrected concepts expose independence leaks or an independent Exposure purpose.
- **Phase 005:** only after final factoring, consider qualified observation and correction/release/provision composition. No synchronization is defined here.
- **Later validation:** measure reporting effort, completeness claim reliability, retrospective error, sampling validity and privacy safety; these are not established by the boundary argument.

## Gate

- [x] O-A/B/C/D compared with counterexamples, not only assertions.
- [x] Specificity, minimum completeness, peer removal and genericity applied.
- [x] P-01/P-02/P-03 constraints and observed-zero semantics preserved.
- [x] Current canonical behavioral owner clarified without duplicate Exposure document.
- [x] Correction, authority, disclosure and empirical limits remain explicitly separate.
- [x] No state schema, API, UI, infrastructure, executable implementation, or Phase 005 synchronization.

**Implementation readiness NOT READY; execution NOT STARTED; authorization NOT YET.**
