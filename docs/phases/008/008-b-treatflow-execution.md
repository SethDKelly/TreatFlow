---
okf_version: "0.2"
type: Phase Execution Record
title: TreatFlow 008-B — Familiar Precedents, Behavioral Fitness and Evidence Qualification
description: Five-concept semantic fitness comparisons against documented precedents, negative controls, evidence-strength limits and 008-C handoff.
tags: [treatflow, phase-008, familiarity, precedents, fitness, evidence]
---

# TreatFlow — 008-B Familiar Precedents, Behavioral Fitness & Evidence Qualification

## Decision

**008-B COMPLETE WITH CARRY-FORWARD — 008-C NEXT ELIGIBLE AFTER MERGE.** The [008-A plan](008-a-treatflow-execution.md) has merged to main. Comparison of all five retained concepts against independently documented design vocabulary finds **useful transferable patterns but no evidence justifying an outright concept substitution**. Reuse at this stage is **qualified precedent/lesson reuse**, not adoption of standards as data models, renamed concept identity, proof of actual user familiarity or software interoperability. Existing canonical concepts, 005 application composition, 006 adoption and 007 mapping remain unchanged.

This is a **comparison record**. No catalog entry or new canonical current behavioral rule is justified until 008-E's decision gate. The [familiarity contract](familiarity-reuse-contract.md) requires matching purpose, story, state, actions, invariant/history, authority, mapping expectations and composition—not keyword resemblance.

## Evidence classes and external precedent references

**E1 documented authoritative:** explicit conceptual terms and relationships in the source specification, *not* universal UX behavior.
**E2 documented partial analogy:** a source term or pattern matches one dimension but source does not establish TreatFlow's full guarded behavior.
**E3 working heuristic:** everyday software expectation such as "edit overwrites" or "owner can delete" varies by product; useful as a falsification scenario but not proven by a specification or research with TreatFlow users.
**E4 unverified empirical claim:** real users transfer a given expectation. **No E4 evidence available; do not assert empirical familiarity.**

Reviewed sources:
- Daniel Jackson, [Concept Design Principles: Familiarity](https://essenceofsoftware.com/posts/distillation/) — preference for familiar concepts based on purpose and transfer, not mere naming.
- W3C [PROV-O](https://www.w3.org/TR/prov-o/) — `wasAttributedTo`, `qualifiedAttribution`, `wasRevisionOf` and qualified revision vocabulary.
- W3C [Data Quality Vocabulary](https://www.w3.org/TR/vocab-dqv/) — quality annotations/measurements and their provenance, not full purpose-specific inquiry suitability.
- W3C [DCAT v3](https://www.w3.org/TR/vocab-dcat/) — dataset/distribution metadata, access rights and qualified agent relationships.
- W3C [ODRL Information Model](https://www.w3.org/TR/odrl-model/) — asset, party, permission/prohibition/duty and policy constraints.

These references demonstrate **some documented precedents**. They are not a claim that any standard is a drop-in behavioral concept, that it endorses TreatFlow's product, or that its use is mandated.

## 1. Fitness comparison — Observation

**Candidate: event log/monitoring or data-quality annotated record.** DQV models quality-related metadata; PROV-O models origins, agents and activities. **E1** for those representational primitives, **E2** for qualified observational behavior; neither referenced standard alone defines TreatFlow's full observational attention lifecycle.

- **Purpose/story:** a useful partial analogue for evidence/provenance, but event records need not distinguish unmonitored gaps from watched quiet.
- **State/actions:** TreatFlow `Establish`, `AssertCoverage`, `Report`, `Qualify`, `Inspect`, `Close` and `InspectAfterClose` combine *asserted observation attention* with variable measurement units, retrospective precision and closure. No demonstrated E1 precedent matches this action set.
- **History/authority:** Observation source is not public identity; closed account forbids direct additions, not legitimate separate factual Revision.
- **Mapping/composition:** group of five versus five independent group encounters, and absent monitoring versus zero, defeat naive event-log substitution.
- **Disposition:** **partial qualified reuse candidate**, *retain Observation*. Carry to 008-D whether coverage-qualified observation generalizes beyond Halloween without reducing meaning.

**Falsifier:** a precedent that explicitly supports observed/not-observed/uncertain intervals, unit-qualified evidence, retrospective uncertainty and closure semantics could justify a closer substitution comparison; no such complete precedent established in this review.

## 2. Fitness comparison — Contribution Stewardship

**Candidate: attribution and provenance, especially PROV-O qualified attribution.** PROV-O expressly connects Entity, Agent and attribution roles (**E1**). It does not by that fact define protected contest, determination or relinquishment state; conflating attribution with access-control ownership is **E2/E3** false familiarity.

- **Purpose/story:** shared goal of recording a responsibility association.
- **State/actions:** TreatFlow `Standing(active/contested/relinquished)` with `Associate`, `Recognize`, `ContestStanding`, `DetermineStanding`, `Relinquish`. Qualified attribution alone does not establish these protected workflows (**not a claimed defect in PROV-O**).
- **History/authority:** household proximity gives no proven Party identity or amendment, publication, delete rights. A legitimate resolution changes standing only.
- **Mapping/composition:** C-01 is optional; C-03 attribution contest is separate from factual Revision.
- **Disposition:** **strong partial precedent for attribution relationship, not full substitute**; retain Stewardship. Test alternative names such as attribution standing versus ownership in 008-C.

**Falsifier:** a coherent preexisting *protected and disputable standing* concept with sufficiently compatible active/contested/relinquished semantics, authority and non-control property merits reconsideration.

## 3. Fitness comparison — Revision

**Candidate: PROV-O revision lineage and familiar version history.** PROV-O documents `wasRevisionOf` and qualified revision (**E1**). It does not itself supply TreatFlow's amendment entitlement, competing-successor currentness, separately contested factual standing or `ResolveChallenge` semantics (**E2**). "Every version history picks newest" is an **E3 heuristic**, not a universal standard claim.

- **Purpose/story:** explanatory successor relation and preserved original align with provenance revision vocabulary.
- **State/actions:** predecessor/successor lineage, `Amend`, `InspectHistory`, `Challenge`, `ResolveChallenge`, guarded `MarkSuperseded`; competing branches cannot silently designate a unique truth.
- **History/authority:** factual challenger is not an amender; C-02 correction after closed Observation does not alter Observation source state; C-03 rejects conflating dispute types.
- **Disposition:** **documented reusable lineage pattern; no drop-in Revision substitution**. Preserve separate factual standing/challenge machinery pending 008-C/D.

**Falsifier:** a version-history precedent providing matching protected amendment, conflict/dispute, currentness and non-destructive temporal behavior could warrant full replacement comparison.

## 4. Fitness comparison — Research Provision

**Candidate: DQV quality qualification plus DCAT dataset/distribution metadata.** DQV supports qualitative/quantitative quality annotations (**E1**); DCAT distinguishes datasets, distributions and access rights (**E1**). Neither alone claims the TreatFlow research-inquiry request→scope→suitability lifecycle or a meaningful *unsuitable/unavailable without delivery* outcome (**E2**).

- **Purpose/story:** bounded, scientifically honest inquiry-fitness assessment can be valuable even with no access to source records.
- **State/actions:** `RequestEvidence`, internal `PrepareScope`/`QualifyProvision`, entitled `InspectProvision`, optional guarded `Provide`; group units, monitored exposure, volunteer-selection and version-at-qualification caveats are material.
- **History/authority:** as-of provision remains historical after later legitimate correction. Scientific fitness gives no material-release right (D-02).
- **Mapping/composition:** "dataset available" or "export ready" would falsely equate fitness, disclosure and delivery.
- **Disposition:** **reuse candidate for quality metadata; reject dataset export as full concept substitute**. Preserve suitability-first meaning and 008-C terminology examination.

**Falsifier:** an established inquiry-qualification concept with meaningful no-delivery and unavailable outcomes plus protected data boundaries may yield closer compatibility.

## 5. Fitness comparison — Controlled Disclosure

**Candidate: ODRL usage permission/restriction and DCAT access-rights descriptions.** ODRL defines Permission, Prohibition, Duty, Asset, Party and Constraint (**E1**); DCAT supports access-rights metadata (**E1**). These provide vocabulary for scoping usage, **not proof** of an independent risk assessment or actual protection sufficiency.

- **Purpose/story:** independently decide permitted *prospective* material/audience exposure while protecting affected nonparticipants.
- **State/actions:** `Propose`, `Assess`, `Decide`, guarded `MakeAvailable`, `SuspendFuture`, `InspectDecision`, and historical `ExposureRecord`.
- **History/authority:** approval ≠ actually exposed; suspension of future availability cannot recall past copies; risk basis and legitimate decision-maker remain unresolved preconditions.
- **Mapping/composition:** approval cannot make scientifically unsuitable evidence research-ready; a prior authorization does not cover materially different future scope (D-03).
- **Disposition:** **documented partial policy vocabulary with substantial boundary differences**; retain Controlled Disclosure and no safe-release claims.

**Falsifier:** a documented protected-prospective decision concept with actual exposure history, insufficient/unknown safety evidence and credible scope-change rules would merit replacement comparison, not automatic adoption.

## 6. Cross-concept reuse traps

| Tempting collapse | Behavioral counterexample disproving full equivalence | Conclusion |
|---|---|---|
| Observer = attributed Party | Anonymous report with no legitimate standing association | **Reject** identity conflation |
| Standing = factual revision right | Contested Party responsibility while underlying count remains unchanged | **Reject** shared owner/edit concept |
| Revision = Observation.Qualify | Closed account legitimately revised with original still intact | **Reject** destructive inline edit |
| Research suitability = dataset distribution | Unsuitable but informative no-delivery inquiry | **Reject** export-only substitute |
| Disclosure approval = qualified research | Protectively approvable material unsuitable for claimed Poisson inference | **Reject** authorization/fitness merger |
| Suspended access = recalled copies | Prior recipient already holds old material | **Reject** retroactive-revocation assumption |

No full replacement is accepted. **Source-backed partial patterns** may inform later naming and reusable-knowledge decisions only under their documented constraints.

## 7. Limits, 008-C handoff and changes

**Evidence gap:** authoritative W3C specifications document vocabulary models, not TreatFlow participants' familiarity, established user-interface expectations, or proof of interchangeable concept actions. User comprehension would require independent empirical evidence, unavailable now. No standard has been adopted as implementation format, data type, interface or compliance target.

**008-C next:** independently audit false-familiar labels and user expectations. Prioritize "observed," "owner," "edit," "current," "ready," "approved," "shared," "revoked" and "anonymous". If a current term *materially* misstates behavior, amend its existing canonical mapping owner with a precise cross-reference and consider upstream reentry; do not silently rename intrinsic concepts in the comparison record.

**008-D:** test controlled genericity; **008-E:** decide reusable catalog candidates; **008-F:** reconcile any accepted changes and regression; **008-G:** independent exit.

### Gate

- [x] Five concepts evaluated against explicit precedents on purpose, operational principle, state, actions, history, authority, mapping and composition.
- [x] E1/E2/E3/E4 distinction avoids ungrounded user-familiarity assertions.
- [x] Negative controls falsify misleading full substitutions and concept merges.
- [x] Comparison sources documented and qualified by actual source scope.
- [x] No adopted substitution, behavior rewrite, new canonical owner or technical standards commitment.
- [x] All carry-forwards and 008-C entry explicitly stated.

**008-B COMPLETE WITH CARRY-FORWARD — 008-C NEXT AFTER MERGE. Implementation readiness NOT READY; execution NOT STARTED; authorization NOT YET.**
