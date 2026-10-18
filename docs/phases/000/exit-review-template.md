---
type: Phase Exit Review Template
title: Phase 000 Consolidation, Exit Review & Phase 001 Handoff Template
description: Phase-specific completion and handoff criteria for determining whether project intake and its knowledge corpus are ready for Jackson-aligned purpose and need framing.
tags: [phase-000, exit-review, handoff, phase-001, template, documentation]
---

# Phase 000 Consolidation, Exit Review & Phase 001 Handoff Template

## Purpose

The final project-specific Phase 000 subphase uses this template to determine whether intake has done enough to support Phase 001 without carrying hidden context, false certainty, premature solution structure, or documentation drift forward.

This specializes the repository-wide [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md) and [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md).

The final subphase letter is determined by the project's `000-A` decomposition; this file is a reusable template, not a predetermined phase record.

## Review inputs

Review the approved `000-A` plan, completed Phase 000 records, current canonical intake knowledge, unresolved questions/assumptions, material evidence/conflicts, solution proposals recorded during intake, affected indexes/references, and the [Phase 001 definition](../001/phase-definition.md).

## 1. Planned-work disposition

Confirm every planned workstream is completed, superseded by a documented refinement, explicitly removed because it became unnecessary, or still incomplete and blocking. Document existence is not completion evidence.

## 2. Intake coverage review

For every required intake dimension record **Established**, **Established with uncertainty**, **Not applicable with rationale**, **Incomplete — carry-forward**, or **Incomplete — blocking**.

Review product/application definition, problem/opportunity context, actors/stakeholders/affected parties, desired outcomes, scope/non-goals, terminology/context, external constraints, assumptions/hypotheses, open questions/uncertainty, evidence/source posture, and legacy/current-state context where applicable.

## 3. Evidence and uncertainty audit

Confirm material statements remain distinguishable as observations, source assertions, external constraints, assumptions, hypotheses, open questions, solution proposals, or intake decisions.

Check for unsupported facts, stale/weak evidence treated as current authority, hidden source conflicts, assumptions promoted through repetition, and high-consequence uncertainty without an explicit disposition.

## 4. Legacy and inherited-structure audit

If an existing product, repository, workflow, or system was studied, verify Phase 000 did not preserve its decomposition as future design authority.

Material ambiguity between genuine need, external constraint, historical policy, implementation artifact, accidental behavior, adaptation to old limitations, or unknown rationale should block exit or have an explicit earliest appropriate destination.

## 5. Premature-solution audit

Challenge conclusions presuming final concepts, features, workflows, UI structures, data models, services/modules, APIs, technical architecture, infrastructure, or implementation sequencing.

A solution idea may remain labeled evidence or proposal; it must not enter Phase 001 as unquestioned design truth.

## 6. Canonical authority and documentation integrity audit

Apply the [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md).

Verify that:

- durable intake conclusions have natural canonical owners;
- phase records are not the only current source of truth;
- assumptions and open questions remain visibly provisional;
- known superseded current statements have been corrected or lifecycle-managed;
- avoidable duplicate current statements have been consolidated;
- affected `index.md` files expose current knowledge through progressive disclosure without duplicating it;
- important internal links resolve and point to intended authority;
- new concept documents are discoverable through indexes and/or meaningful graph links;
- ordinary concept documents use valid OKF frontmatter;
- reserved `index.md` files remain navigational and conform to the adopted OKF structure;
- terminology is coherent in the corpus scope touched by Phase 000;
- provenance is represented through links and/or `sources` where materially useful rather than copied narrative.

Documentation incoherence that would mislead Phase 001 is a phase-exit defect.

## 7. Phase 001 readiness test

A competent reader must be able to begin **Phase 001 — Purpose, Context, Need & Success Framing** using repository knowledge alone.

The answer should be yes to these questions: Is the contemplated product understandable? Is the motivating context clear enough to investigate purposes? Are relevant affected parties visible? Are desired outcomes recorded without assuming a solution? Are scope, terminology, and material constraints understandable? Can the reader distinguish what is known, asserted, assumed, hypothesized, proposed, and unresolved? Can Phase 001 revisit intake framing? Has Phase 000 avoided preselecting the concept solution?

If a material answer is no, Phase 000 should not exit.

## 8. Carry-forward discipline

An issue may be carried forward only when it does not undermine basic project intelligibility; Phase 001 can proceed without pretending it is resolved; uncertainty remains explicit; and its design destination/reconsideration trigger plus canonical knowledge destination are identified where relevant.

Do not use carry-forward to bypass missing foundational intake or documentation authority problems.

## 9. Exit decision

Use:

### PASS

Phase 000 fulfills its intake purpose and Phase 001 may begin.

### PASS WITH CARRY-FORWARD

Phase 000 fulfills its purpose while explicitly identified non-blocking uncertainties continue with named destinations or triggers.

### NOT READY TO EXIT

Material intake, evidence, hidden-assumption, solution-lock, canonical-authority, or documentation-coherence gaps require additional Phase 000 work.

## Required Phase 001 handoff

A successful exit records:

- concise current project/product definition;
- motivating context;
- relevant affected-party context;
- desired outcomes/change sought;
- scope and non-goals;
- material terminology and constraints;
- active assumptions/hypotheses;
- unresolved questions and carry-forwards;
- important evidence conflicts or interpretation cautions;
- quarantined solution proposals Phase 001 must not treat as authority;
- canonical documents and indexes constituting the intake baseline;
- material reference/provenance relationships the next phase should follow;
- confirmation that Phase 001 may revisit intake conclusions;
- implementation readiness state.

## Implementation state at Phase 000 exit

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet

The only authorized next step is the Phase 001 start gate and subsequent concept-design work.
