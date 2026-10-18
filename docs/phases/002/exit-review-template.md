---
type: Phase Exit Review Template
title: Phase 002 Consolidation, Exit Review & Phase 003 Handoff Template
description: Phase-specific closure test for determining whether divergent concept discovery has produced a sufficiently broad, reasoned, concept-shaped candidate set for behavioral specification.
tags: [phase-002, exit-review, phase-003, concept-discovery, divergence, documentation, template]
---

# Phase 002 Consolidation, Exit Review & Phase 003 Handoff Template

## Purpose

The final project-specific Phase 002 subphase uses this template to determine whether discovery was genuinely divergent, convergence was reasoned, the retained candidate set is plausibly concept-shaped, and Phase 003 can begin behavioral specification without reconstructing hidden rationale or accepting a feature/entity decomposition as fact.

## Review inputs

Review:

- the approved `002-A` plan;
- completed Phase 002 discovery/convergence records;
- current Phase 001 purpose knowledge and handoff;
- candidate inventories and alternative-decomposition evidence;
- any provisional canonical concept knowledge;
- rejected/deferred/reframed candidate evidence where materially relevant;
- current open questions and carry-forwards;
- [Phase 003 definition](../003/phase-definition.md);
- repository-wide documentation and knowledge-authority contracts.

## 1. Planned-work disposition

Confirm every `002-A` workstream is:

- completed;
- superseded by documented refinement;
- explicitly removed as unnecessary; or
- still incomplete and therefore blocking exit.

Document production is not proof that discovery or convergence actually occurred.

## 2. Divergence integrity audit

Ask whether the project explored materially different conceptual possibilities rather than producing cosmetic variants of one decomposition.

Check for:

- alternative allocations of behavior among candidates;
- alternative concept boundaries;
- familiar versus novel approaches where relevant;
- generic versus application-specific framings;
- candidates prompted by different affected-party or contextual perspectives;
- explicit consideration of whether one apparent concept may actually be several concepts, or several ideas may belong to one concept.

A large candidate count is not evidence of good divergence by itself.

## 3. Anchoring and source-bias audit

Verify that the retained candidate set was not simply inherited from:

- the original feature list;
- domain nouns or database entities;
- incumbent UI/workflows;
- existing service/module boundaries;
- organization structure;
- stakeholder seniority or preference;
- competitor feature catalogs;
- LLM-generated lists;
- an early prototype or implementation.

Any of these may have informed discovery. None should become concept authority without design reasoning.

## 4. Purpose coverage audit

For each material Phase 001 design-purpose obligation, record one of:

- **Addressed by retained candidate(s)**;
- **Addressed by competing candidates requiring Phase 003 specification**;
- **Deferred with rationale**;
- **Purpose framing reopened/corrected**;
- **Discovery gap — blocking**.

Do not force a one-purpose/one-concept structure here merely to make the matrix tidy.

## 5. Candidate concept-likeness audit

For every candidate retained for Phase 003, assess whether there is enough evidence to justify specification work.

At minimum ask:

- Is the candidate plausibly user-facing?
- Is it semantic rather than a UI/technical mechanism?
- Does it describe behavior rather than merely data or classification?
- Does it plausibly serve a useful purpose?
- Does it appear capable of end-to-end value?
- Can it plausibly be understood independently of other application concepts?
- Is its familiarity/novelty posture understood enough for further work?
- Are obvious reuse/genericity opportunities or questions visible?

Use **Plausible**, **Questionable but worth specifying**, or **Not ready for Phase 003** rather than pretending Phase 002 has completed the Phase 003–004 proof.

A materially important candidate rated `Not ready for Phase 003` requires more Phase 002 work, reframing, or rejection.

## 6. Convergence quality audit

Check that convergence occurred for defensible reasons.

Challenge candidate selection driven mainly by:

- popularity;
- stakeholder authority;
- familiarity with the incumbent system;
- implementation convenience;
- name appeal;
- documentation momentum;
- desire to reduce candidate count;
- arbitrary numerical scoring detached from purpose and behavior.

For significant decisions, the phase record should preserve why a candidate was retained, reframed, split/merge-questioned, deferred, or rejected.

## 7. Premature-specification and implementation audit

Confirm Phase 002 did not prematurely freeze:

- complete operational principles;
- detailed state/action models;
- rigorous concept boundaries that have not yet been tested;
- synchronizations;
- application dependency graphs;
- UI mappings;
- APIs, schemas, services, persistence, architecture, infrastructure, or implementation plans.

Early observations about these matters may exist as questions or risks, but should not bypass the later phases designed to establish them.

## 8. Candidate uncertainty and carry-forward audit

For retained candidates, ensure important uncertainties are visible, especially around:

- purpose boundary;
- independence;
- completeness/end-to-end behavior;
- split/merge/reframe possibilities;
- genericity;
- familiarity;
- naming;
- actor/authority implications;
- contextual limitations.

Assign each unresolved item to Phase 003, Phase 004, or another justified destination rather than leaving it implicit.

## 9. Documentation integrity and OKF audit

Apply the [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md).

Verify that:

- Phase 001 purpose knowledge is referenced rather than copied wholesale;
- divergent candidate evidence remains historical/provisional rather than masquerading as canonical truth;
- canonical concept documents exist only where semantic identity is stable enough to justify them;
- provisional candidate status is clear in any canonical concept document;
- rejected/abandoned candidates are not presented through indexes as current concepts;
- retained candidates are discoverable from the relevant phase/canonical indexes without scanning every brainstorming record;
- meaningful links connect candidates to purpose knowledge and relevant alternatives/evidence;
- duplicate or near-duplicate candidate documents have been consolidated or explicitly related;
- terminology is coherent enough for Phase 003 to know which candidate identity is being specified;
- ordinary concept documents conform to OKF frontmatter rules and reserved indexes remain navigation-only;
- no known broken or misleading references remain in the scope affected by the phase.

## 10. Phase 003 readiness test

A competent reader should be able to begin **Phase 003 — Concept Definition, Operational Principles & Behavioral Specification** and answer yes to all of the following:

- What candidate concepts are being taken forward?
- Which Phase 001 purposes or needs plausibly motivate each?
- What materially different alternatives were considered?
- Why is each retained candidate worth behavioral specification?
- Which candidates are still questionable, and exactly what must Phase 003/004 test?
- Which candidates were rejected/deferred/reframed where that history matters?
- Can the retained candidates be found without reconstructing the entire Phase 002 discussion?
- Has the project avoided treating these candidates as already proven concepts?

If not, Phase 002 is not ready to exit.

## 11. Exit decision

Use:

### PASS

Phase 002 fulfills its discovery purpose and Phase 003 may begin.

### PASS WITH CARRY-FORWARD

Phase 002 fulfills its purpose while explicit non-blocking candidate questions are assigned to later phases.

### NOT READY TO EXIT

Material divergence gaps, purpose-coverage gaps, anchoring, weak candidate concept-likeness, undocumented convergence, documentation incoherence, or premature solution lock require more Phase 002 work or reopening an earlier phase.

## Required Phase 003 handoff

Record:

- authoritative purpose/current-need entry points from Phase 001;
- retained candidate concept set;
- tentative purpose associations for each retained candidate;
- short behavioral/mental-model sketches sufficient to orient specification;
- significant alternative decompositions considered;
- rejected/deferred/reframed candidates whose history matters;
- candidate concept-likeness findings;
- unresolved purpose, operational-principle, state/action, independence, completeness, genericity, familiarity, naming, authority, or boundary questions;
- carry-forwards and their destination;
- provisional canonical concept documents and relevant indexes, if any;
- explicit reminder that Phase 003 may revise or reject retained candidates when detailed behavior does not support them;
- implementation readiness state.

## Implementation state at exit

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet

The only authorized next step is the Phase 003 start gate and subsequent behavioral concept specification.
