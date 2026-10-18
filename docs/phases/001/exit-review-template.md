---
type: Phase Exit Review Template
title: Phase 001 Consolidation, Exit Review & Phase 002 Handoff Template
description: Phase-specific closure test for determining whether purpose, need, context, and success framing are strong enough to begin divergent concept discovery.
tags: [phase-001, exit-review, phase-002, purpose, documentation, template]
---

# Phase 001 Consolidation, Exit Review & Phase 002 Handoff Template

## Purpose

The final project-specific Phase 001 subphase uses this template to determine whether the purpose model is sufficiently grounded, discriminating, coherent, and discoverable for Phase 002 to begin concept discovery without reconstructing hidden rationale or rationalizing preselected features.

## Review inputs

Review the approved `001-A` plan, completed Phase 001 records, current canonical purpose/project knowledge, Phase 000 handoff and carry-forwards, material evidence, current open questions, and the Phase 002 definition.

## 1. Planned-work disposition

Confirm every `001-A` workstream is completed, superseded by a documented refinement, explicitly removed as unnecessary, or still incomplete and blocking.

## 2. Purpose coverage review

For each required Phase 001 dimension, record **Established**, **Established with uncertainty**, **Not applicable with rationale**, **Incomplete — carry-forward**, or **Incomplete — blocking**.

Review:

- overall product/application purpose;
- actor and affected-party needs;
- motivating burdens/constraints/risks/opportunities;
- distinct design-purpose obligations;
- material context;
- representative success framing;
- purpose tensions/conflicts/distributional effects;
- assumptions and uncertainties;
- evidence/intake traceability.

## 3. Purpose quality audit

For every material purpose or purpose obligation, ask whether it is:

- need-focused;
- specific enough to discriminate among later design alternatives;
- evaluable as a design yardstick;
- solution-neutral;
- appropriately context-qualified;
- supported or honestly qualified by evidence/uncertainty.

Broad aspirations may remain as context, but they must not substitute for more discriminating design purposes where such decomposition is needed.

## 4. Affected-party and tension audit

Check for omitted materially affected parties, silent privileging of the sponsor/user over others, false consensus, and conflicts that were erased rather than modeled.

A known material tension should be visible to later phases even when Phase 001 cannot resolve it.

## 5. Success-framing audit

Confirm representative success situations demonstrate meaningful improvement rather than merely describing feature use, UI flows, adoption, revenue, or implementation delivery.

Ensure Phase 001 success situations have not accidentally become concept operational principles before concepts exist.

## 6. Premature-concept and implementation audit

Challenge any Phase 001 conclusion that presumes final concept names/boundaries, fixed feature decomposition, interaction workflows, state/actions, architecture, schemas, APIs, services, infrastructure, or implementation sequencing.

Solution proposals may remain quarantined as evidence, not authority.

## 7. Documentation integrity and OKF audit

Apply the repository-wide [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md).

Verify that:

- current purpose knowledge has clear canonical owners;
- Phase 000 context is referenced rather than needlessly copied;
- duplicate current statements have been consolidated;
- phase records are not competing sources of authority;
- affected indexes expose newly current knowledge;
- meaningful cross-links connect purposes to relevant project context, evidence, and open questions;
- ordinary concept documents use valid OKF frontmatter;
- reserved `index.md` files remain navigation rather than concept documents;
- no known stale links, terminology conflicts, or superseded current statements remain in the scope touched by the phase.

## 8. Phase 002 readiness test

A competent reader should be able to begin Phase 002 from repository knowledge alone and answer yes to these questions:

- Why should the product exist?
- Whose needs and affected interests matter?
- What distinct improvements or protections should concept candidates be judged against?
- What contexts, assumptions, uncertainties, and tensions qualify those purposes?
- What would meaningful success look like without assuming how it is implemented?
- Can alternative concept decompositions now be explored without treating an inherited feature list as authority?

If not, Phase 001 is not ready to exit.

## 9. Carry-forward discipline

Carry an issue forward only when concept discovery can proceed without pretending the issue is resolved. Give every carry-forward an explicit destination or reconsideration trigger and preserve its uncertainty in canonical knowledge where it remains current.

## 10. Exit decision

Use:

### PASS

Phase 001 fulfills its purpose and Phase 002 may begin.

### PASS WITH CARRY-FORWARD

Phase 001 fulfills its purpose with explicit non-blocking issues assigned onward.

### NOT READY TO EXIT

Material purpose, evidence, affected-party, success-framing, documentation, or solution-lock gaps require additional Phase 001 work or reopening Phase 000.

## Required Phase 002 handoff

Record:

- authoritative purpose/current-need knowledge entry points;
- concise product/application purpose framing;
- distinct design-purpose obligations;
- affected-party needs and material tensions;
- representative success framing;
- important contextual qualifiers;
- assumptions, uncertainties, and carry-forwards;
- evidence or interpretation cautions relevant to discovery;
- quarantined solution proposals Phase 002 must not treat as authority;
- canonical documents and indexes constituting the Phase 001 baseline;
- confirmation that Phase 002 is expected to explore multiple candidate decompositions;
- implementation readiness state.

## Implementation state at exit

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet

The only authorized next step is the Phase 002 start gate and subsequent concept-discovery work.
