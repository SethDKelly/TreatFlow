---
type: Phase Start Gate
title: 002-A — Discovery Scope, Divergence Strategy, Candidate Criteria & Subphase Planning
description: Mandatory start gate for tailoring Phase 002 to the project's purpose baseline, discovery risks, divergence needs, candidate-evaluation posture, documentation state, and convergence requirements.
tags: [phase-002, start-gate, concept-discovery, divergence, candidates, planning]
sources:
  - id: jackson-criteria
    resource: https://essenceofsoftware.com/tutorials/concept-basics/criteria/
    title: Concept criteria — Daniel Jackson
  - id: jackson-diverge
    resource: https://essenceofsoftware.com/tutorials/design-general/diverge-converge/
    title: Divergent and convergent design — Daniel Jackson
  - id: jackson-tactics
    resource: https://essenceofsoftware.com/tutorials/design-general/divergent-tactics/
    title: Tactics for divergent design — Daniel Jackson
---

# 002-A — Discovery Scope, Divergence Strategy, Candidate Criteria & Subphase Planning

## Purpose

This gate determines how Phase 002 will explore candidate concepts without either drifting into unconstrained feature brainstorming or converging so quickly that the first plausible decomposition becomes design authority.

It must be completed before substantive concept-discovery subphases begin.

Phase 002 is intentionally both divergent and convergent. The gate must plan where expansive generation is protected from premature criticism and where disciplined convergence will later be required.

## Governing contracts

Review before planning:

- [Phase 002 definition](phase-definition.md);
- [Candidate Concept & Divergent Discovery Contract](candidate-discovery-contract.md);
- [Phase 002 Exit Review & Phase 003 Handoff Template](exit-review-template.md);
- [Phase 001 handoff](../001/exit-review-template.md) and the project's completed Phase 001 exit record;
- repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md).

## 1. Confirm Phase 001 discovery authority

Identify the current authoritative inputs Phase 002 is allowed to rely on:

- product/application purpose;
- affected-party needs;
- distinct design-purpose obligations;
- representative success framing;
- contextual qualifiers;
- purpose tensions and distributional effects;
- assumptions and uncertainties;
- relevant carry-forwards;
- quarantined solution proposals that must not be treated as authority.

If Phase 002 cannot tell what candidate concepts are supposed to be judged against, return to Phase 001 rather than inventing purposes during discovery.

## 2. Identify anchoring and decomposition risks

Inspect incoming material for likely discovery bias, including:

- feature lists treated as the concept catalog;
- domain nouns or database entities treated as concepts by default;
- existing screens or workflows treated as conceptual boundaries;
- service/module boundaries imported from an incumbent implementation;
- organization charts mistaken for authority or concept structure;
- familiar product categories suppressing alternative decompositions;
- stakeholder-favored mechanisms given privileged status;
- names that already imply a particular solution;
- prior prototypes or implementations treated as proof that a concept is necessary.

Decide which risks require explicit de-anchoring workstreams.

## 3. Plan divergent discovery sources

Choose the discovery approaches appropriate to the project. Possible sources include:

- re-examining Phase 001 purposes and success situations;
- stakeholder or affected-party observations;
- imagining representative situations;
- gaps or misfits in existing products;
- analogies to other applications or domains;
- familiar concept catalogs and prior design knowledge;
- existing feature lists used only as prompts for deeper behavioral ideas;
- value, accessibility, safety, social, and indirect-stakeholder considerations;
- LLM-assisted brainstorming treated as idea generation rather than evidence.

No discovery source creates design authority merely because it produced an idea.

## 4. Define divergence breadth expectations

For each material purpose area, determine what would count as meaningful exploration rather than token alternatives.

The plan should encourage, where useful:

- more than one plausible conceptual decomposition;
- alternative concept boundaries;
- alternative levels of generality;
- familiar versus novel candidates;
- different ways of allocating behavior among concepts;
- explicit recognition when one candidate could split into several concepts or several candidates may represent one coherent behavior pattern.

Do not set an arbitrary numerical quota for candidates. Breadth is judged by whether material alternatives have actually been explored.

## 5. Calibrate concept criteria for this phase

Jackson's concept criteria include being user-facing, semantic, independent, behavioral, purposive, end-to-end, familiar, and reusable.[^jackson-criteria]

During early divergence, use these criteria as **orientation**, not a full rejection rubric. A rough idea may remain useful even when its concept status is uncertain.

During convergence, retained candidates should have enough evidence of concept-likeness to justify Phase 003 specification. Full behavioral proof belongs in Phase 003, and the stronger specificity/completeness/independence factoring audit belongs in Phase 004.

[^jackson-criteria]: Daniel Jackson, "Concept criteria: what's a concept?"

## 6. Plan candidate provenance and decision evidence

For important candidates and alternatives, preserve enough evidence to answer:

- what purpose or observed need prompted the candidate;
- what discovery source suggested it;
- what competing decompositions were considered;
- what questions remain about its boundary or behavior;
- why it was retained, deferred, reframed, combined, split, or rejected.

Do not confuse provenance with proof. A candidate suggested by an authoritative stakeholder is still a candidate.

## 7. Plan convergence deliberately

Define what the project must know before Phase 002 can stop diverging and hand candidates to Phase 003.

Convergence should consider:

- purpose relevance;
- whether the candidate plausibly represents a mental construct users can understand;
- whether it plausibly represents a coherent behavioral unit;
- whether it appears sufficiently independent to be worth specifying;
- whether it offers end-to-end value rather than a fragment;
- whether materially different alternatives have been considered;
- whether obvious feature/entity/UI/implementation artifacts have been filtered out;
- which boundary, genericity, familiarity, or decomposition questions remain intentionally unresolved for later phases.

Convergence must not require the proofs that Phase 003 or Phase 004 are designed to establish.

## 8. Perform documentation and coherence planning

Apply the repository-wide documentation-governance contract.

Identify:

- incoming canonical purpose/project documents to reference rather than copy;
- phase records likely to contain divergent candidate evidence;
- whether any retained candidate has a stable enough semantic identity to justify a provisional canonical concept document;
- where candidate status and uncertainty will remain visible;
- indexes that must expose current discovery knowledge;
- references needed between candidates and governing purposes;
- existing terminology or canonical conflicts that could bias discovery;
- how rejected candidates will remain historical evidence without becoming discoverable as current concepts.

Do not create one canonical document per brainstormed idea merely because it has a name.

## 9. Derive project-specific Phase 002 subphases

Create only the workstreams needed for this project.

For each proposed substantive subphase define:

- purpose;
- discovery or convergence mode;
- incoming canonical knowledge;
- questions and candidate space examined;
- discovery sources/evidence;
- dependencies;
- expected phase-record output;
- possible canonical knowledge affected;
- explicit exclusions;
- completion evidence;
- unresolved-item handoff.

Possible workstream shapes include discovery seeding, alternative decomposition, domain-specific candidate exploration, concept-likeness screening, and convergence. These are examples, not a required sequence.

Reserve the final project-specific subphase for consolidation, exit review, documentation-integrity audit, and Phase 003 handoff.

## 10. Confirm Phase 003 handoff expectations

The eventual handoff must make clear:

- which candidates are retained for behavioral specification;
- which purposes each candidate may serve without claiming final one-to-one specificity;
- which alternatives were materially considered;
- which candidates were rejected/deferred and why where that history matters;
- what boundary, independence, end-to-end, genericity, familiarity, and naming questions remain;
- which candidates are genuinely novel versus adaptations of familiar concepts;
- where current candidate knowledge can be found without scanning all discovery records.

## Required output

The completed `002-A` record should end with:

1. authoritative Phase 001 discovery baseline;
2. anchoring/decomposition risk summary;
3. chosen divergence sources and tactics;
4. breadth expectations for material purpose areas;
5. calibrated concept-criteria posture;
6. convergence criteria;
7. approved project-specific Phase 002 subphase sequence;
8. dependency rationale;
9. canonical/documentation destinations and index updates;
10. planned final exit-review subphase;
11. known discovery uncertainties and carry-forwards;
12. confirmation of implementation status.

## Gate outcome

Use one of:

- **READY TO BEGIN PHASE 002 SUBPHASES**
- **NOT READY — DISCOVERY PRECONDITIONS OR PLAN INADEQUATE**

The gate does not approve any concept as final.

## Implementation state

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet
