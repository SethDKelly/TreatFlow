---
type: Methodology Lifecycle
title: Jackson-Aligned Concept Design Lifecycle
description: Defines the reviewed Base concept-design lifecycle from pre-methodology project intake through complete concept-design closure, and its boundary with the separate Phase 012 pre-implementation transition.
tags: [methodology, lifecycle, concept-design, jackson, design-only, pre-implementation]
---

# Jackson-Aligned Concept Design Lifecycle

## Status and authority

This document defines the reviewed high-level **concept-design lifecycle** used by Base.

The lifecycle operationalizes Daniel Jackson's software concept-design methodology into dependency-safe project phases. The numbering and phase boundaries are Base conventions; they are not presented as an official phase sequence prescribed by Jackson.

Every high-level phase is governed by the [Phase Lifecycle Contract](phase-lifecycle.md), including its mandatory `NNN-A` start gate, dynamically derived substantive subphases, final consolidation/exit review, and explicit handoff.

Every phase is also governed by the [Documentation Integrity & OKF Governance Contract](documentation-governance.md), [Canonical and Historical Knowledge Authority](knowledge-authority.md), and [Design-Only Guardrails](design-only-guardrails.md).

## Concept-design lifecycle

| Phase | Name | Primary methodological purpose |
|---|---|---|
| `000` | Project Intake & Product Definition | Define the contemplated product, problem space, actors, outcomes, scope, constraints, evidence posture, assumptions, and uncertainties before concept design begins. |
| `001` | Purpose, Context, Need & Success Framing | Establish the human purposes, needs, contextual conditions, desired improvements, success framing, and tensions that concepts must ultimately justify. |
| `002` | Concept Discovery, Candidate Inventory & Divergent Exploration | Discover alternative candidate concepts as coherent user-facing behavioral units without prematurely converging on the first decomposition. |
| `003` | Concept Definition, Operational Principles & Behavioral Specification | Define viable concepts through purpose, operational principle, abstract state, actions, invariants, conditions, outputs, and other observable behavioral semantics. |
| `004` | Concept Modularity, Boundary, Specificity, Completeness & Independence | Challenge whether proposed concepts are correctly factored, independently meaningful, complete for their purposes, sufficiently specific, and appropriately generic. |
| `005` | Concept Composition, Synchronization, Automation & Synergy | Define how independent concepts combine through explicit synchronization to produce application behavior without hiding conceptual dependence. |
| `006` | Concept Dependence, Product-Family, Subset & Scope Analysis | Distinguish intrinsic concept independence from extrinsic application inclusion dependencies and identify coherent product/application subsets and scope boundaries. |
| `007` | Concept Mapping, Interaction Semantics & User-Visible Representation | Map concept semantics into perceivable, invocable, understandable user-facing representations and interactions without implementing an interface. |
| `008` | Familiarity, Reuse, Genericity & Concept-Catalog Refinement | Challenge unnecessary novelty, compare against familiar concepts, improve broader reuse/genericity and naming, and justify concepts that truly require innovation. |
| `009` | Concept Integrity, Cross-Concept Coherence & Interference Audit | Verify that every concept preserves its independent promise and purpose when composed with the complete concept system. |
| `010` | Scenario, Misfit, Exception, Failure & Adversarial Design Validation | Exercise the conceptual design against representative, edge, temporal, failure, misuse, recovery, authority, incentive, and domain-misfit scenarios. |
| `011` | Methodology Completeness, Canonical Consolidation & Concept-Design Closure | Audit methodology-wide traceability and current design truth, reconcile canonical authority, disposition remaining issues, and decide whether concept design can close for downstream handoff. |

**Concept design ends at Phase 011.**

## Post-closure pre-implementation transition

Base also defines [Phase 012 — Pre-Implementation Audit, OKF Hardening & Agentic Development Preparation](../phases/012/).

Phase 012 is **not** part of Jackson's concept-design methodology and does not extend the conceptual design sequence. It is a Base repository-preparation bridge that may begin only after successful Phase 011 closure.

Its purpose is to:

- audit the closed repository against the adopted OKF/documentation-governance rules;
- reconcile stale, superseded, duplicated, or misleading current documentation;
- harden indexes, links, provenance, and progressive disclosure;
- refresh repository orientation such as the root README;
- establish shared agentic development governance and Claude/Cursor/Codex adapters;
- prepare a clean downstream engineering handoff without beginning feature implementation.

If Phase 012 uncovers a material conceptual or canonical-authority defect, it must reopen Phase 011 or the natural earlier design owner rather than polishing over the problem.

## Dependency-safe progression

The concept-design lifecycle progression is:

1. **Frame** — establish the project and the purposes to be served (`000–001`).
2. **Diverge** — discover candidate conceptual structures (`002`).
3. **Define and factor** — specify concepts and challenge their boundaries before relying on them (`003–004`).
4. **Compose and scope** — make cross-concept behavior and application-level dependence explicit (`005–006`).
5. **Map** — ensure the conceptual model can be understood and controlled through user-visible behavior (`007`).
6. **Refine and attack** — challenge familiarity, integrity, interference, exceptions, failures, and misfits (`008–010`).
7. **Close** — demonstrate methodology-wide completeness, reconcile authoritative design truth, and decide downstream readiness (`011`).
8. **Prepare** — after closure, audit/polish the repository and agent/development handoff without starting implementation (`012`).

Later analysis may require reopening earlier conclusions. The lifecycle therefore expresses dependency order, not an irreversible waterfall.

## Cross-cutting design obligations

The following concerns remain active throughout concept design even when one phase provides a dedicated audit:

- purpose traceability;
- specificity;
- completeness;
- independence;
- familiarity;
- integrity;
- genericity;
- observable semantics;
- authority and actor implications;
- temporal and historical semantics;
- misfit awareness;
- evidence and uncertainty discipline;
- documentation integrity and canonical ownership;
- progressive disclosure and meaningful graph references;
- implementation abstinence.

A later dedicated phase does not authorize earlier phases to ignore that concern.

Phase 012 then re-audits documentation/knowledge-system quality and agentic-development readiness without changing those completed design obligations unless a real closure regression is found.

## Representation and implementation boundary

Completion of concept design does not mean that representation design, architecture, or implementation has already been performed.

During `000–010`, and throughout `011` until a successful final closure decision, implementation remains:

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet

A successful Phase `011` closure may change the state to:

- **Implementation readiness:** ready
- **Implementation execution:** not started
- **Implementation execution authorization:** not granted by the Base concept-design lifecycle

Phase `012` preserves that state while performing repository preparation. Successful Phase 012 completion means pre-implementation preparation is complete; it still does not grant implementation execution authorization.

A separate downstream representation/architecture/engineering process must decide how conceptual obligations are realized and when implementation execution is authorized.

No Base concept-design or pre-implementation preparation phase may create application implementation merely because implementation implications have become clearer.

## Closure meaning

`Implementation readiness: ready` means the project has a coherent conceptual design sufficient to constrain downstream work.

It does **not** mean:

- architecture is already selected;
- source/module/service topology is established;
- schemas or APIs are designed;
- implementation planning is complete;
- executable tests exist;
- implementation execution has started;
- Base has authorized production coding.

Phase `011` must preserve this distinction in its closure record, and Phase `012` must preserve it while preparing the repository for engineering.

## Template refinement status

All Base lifecycle templates `000–012` are refined.

- `000–011` define the Jackson-aligned concept-design lifecycle and its closure.
- `012` defines the post-closure pre-implementation repository-preparation transition.

For each phase, Base establishes methodological/process intent, entry/exit criteria, mandatory start-gate planning, reusable phase-specific guidance, documentation/canonical-authority obligations, dynamic project-specific subphase derivation, and explicit boundaries on implementation activity.

This refinement status applies to the **template repository only**. A project cloned from Base must execute its own lifecycle beginning at Phase `000`; the presence of refined templates is not evidence that the cloned project's design or pre-implementation preparation is complete.
