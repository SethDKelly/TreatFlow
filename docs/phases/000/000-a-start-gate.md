---
type: Phase Start Gate
title: 000-A — Phase Intent, Intake Scope, Evidence Posture & Subphase Planning
description: Mandatory start gate for tailoring Phase 000 to a cloned project's actual intake needs while planning canonical ownership, references, and documentation integrity.
tags: [phase-000, start-gate, intake, planning, evidence, documentation]
---

# 000-A — Phase Intent, Intake Scope, Evidence Posture & Subphase Planning

## Purpose

This start gate determines how Phase 000 should be executed for the cloned project. It must be completed before substantive intake subphases are defined or performed.

The gate prevents a fixed checklist from replacing inquiry, prevents solution ideas or incumbent structures from hardening into design authority, and prevents the intake process from creating a duplicative or incoherent documentation corpus.

`000-A` plans intake. It does not complete intake and does not begin Jackson concept discovery.

## Governing contracts

Review before planning:

- [Phase 000 definition](phase-definition.md);
- [Phase 000 Intake Knowledge & Evidence Contract](intake-knowledge-contract.md);
- [Phase 000 exit-review template](exit-review-template.md);
- [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md).

## 1. Restate the contemplated project neutrally

Capture what is being contemplated, what prompted it, what is believed to need improvement or support, who supplied the framing, and which statements are observations, assertions, constraints, assumptions, hypotheses, questions, proposals, or intake decisions.

If the starting request already contains features, concepts, architecture, or workflows, preserve them as labeled proposals or context rather than design truth.

## 2. Establish intake evidence posture

Identify what information exists, what it can legitimately support, and where provenance, authority, freshness, scope, conflict, uncertainty, or consequence of error require deliberate attention.

Do not create false certainty to make intake appear complete.

## 3. Perform the Phase 000 coverage assessment

Every project must assess these dimensions. The table is a coverage requirement, not a requirement for one file or subphase per row.

| Intake dimension | Planning disposition |
|---|---|
| Contemplated product/application definition | adequate / needs work / not applicable with rationale |
| Problem or opportunity context | adequate / needs work / not applicable with rationale |
| Actors, stakeholders, and materially affected parties | adequate / needs work / not applicable with rationale |
| Desired outcomes or changes sought | adequate / needs work / not applicable with rationale |
| Scope boundaries and non-goals | adequate / needs work / not applicable with rationale |
| Domain terminology and contextual distinctions | adequate / needs work / not applicable with rationale |
| Known external constraints | adequate / needs work / not applicable with rationale |
| Assumptions and hypotheses | adequate / needs work / not applicable with rationale |
| Open questions and uncertainty | adequate / needs work / not applicable with rationale |
| Evidence/source posture | adequate / needs work / not applicable with rationale |
| Legacy/current-state context | adequate / needs work / not applicable with rationale |

`Not applicable` requires rationale. Dimensions marked `needs work` become candidates for substantive workstreams.

## 4. Decide where separate subphases are justified

Do not mechanically translate the coverage table into subphases. Separate work when it materially improves dependency safety, evidence reconciliation, affected-party clarity, ambiguity isolation, reviewability, traceability, or ability to revisit one conclusion without destabilizing unrelated work.

Related dimensions may be combined when doing so does not hide dependencies or uncertainty.

## 5. Establish dependency order

Order work so later subphases do not rely on conclusions not yet established. Terminology, legacy intent, affected-party discovery, external constraints, evidence conflict, and scope may require different ordering in different projects.

Dependency safety is more important than a preferred alphabetical count.

## 6. Identify inherited-structure and solution-lock risks

Inspect starting material for feature lists treated as requirements, database entities or service boundaries treated as concept boundaries, current screens or workflows treated as future design, implementation limitations presented as user needs, legacy terminology that conflates purposes, or stakeholder preferences presented as external constraints.

Determine whether any such risk requires a deliberate de-biasing or intent-reconstruction workstream.

## 7. Plan canonical ownership and documentation integrity

Before creating Phase 000 documents:

- identify incoming repository knowledge that should be referenced rather than copied;
- identify the natural canonical owner for each expected durable intake conclusion;
- plan a new canonical document only when distinct semantic knowledge needs its own stable identity;
- identify indexes and cross-links likely to require updates;
- identify terminology, duplication, supersession, or link-drift risks already present;
- confirm that planned phase records will capture analysis and evidence without becoming alternative current sources of truth;
- confirm that ordinary concept documents will follow OKF frontmatter rules and reserved `index.md` files will remain navigational.

A cloned project may use a compact `canonical/project/` family, but the file structure must follow the knowledge rather than a template quota.

## 8. Define project-specific Phase 000 subphases

For each proposed substantive subphase define its title, purpose, intake dimensions covered, authoritative inputs/references, key questions, dependencies, expected phase evidence, canonical knowledge affected, documentation/index effects, exclusions, completion evidence, and unresolved-item handoff.

Reserve the final project-specific subphase for Phase 000 consolidation, documentation-integrity review, exit decision, and Phase 001 handoff using the [exit-review template](exit-review-template.md).

## 9. Define Phase 000 exit evidence

The planned exit review must be able to show that the project is understandable without hidden conversational context; motivating context, affected parties, outcomes, scope, terminology, constraints, uncertainty, and evidence posture are adequate; legacy bias and solution lock have been exposed; current knowledge is canonically owned and discoverable; references and indexes remain coherent; no final concept solution has been selected; and no representation, architecture, or implementation work has begun.

## 10. Check whether the gate can pass

`000-A` may authorize substantive Phase 000 work only if there is enough starting context to define a responsible intake plan. If not, record the missing precondition rather than fabricating a regular-looking phase sequence.

## Required output

The completed `000-A` record should end with:

1. neutral starting project statement;
2. evidence/source posture summary;
3. completed intake coverage assessment;
4. inherited-structure or solution-lock risks;
5. approved project-specific Phase 000 subphase sequence and dependency rationale;
6. canonical ownership, index, cross-link, and documentation-change plan;
7. completion evidence for each substantive subphase;
8. planned final consolidation/exit-review subphase;
9. known ambiguities and open questions;
10. confirmation of implementation status.

## Gate outcome

Use one of:

- **READY TO BEGIN PHASE 000 SUBPHASES**
- **NOT READY — INTAKE PRECONDITIONS MISSING**

The gate itself must not declare Phase 000 complete.

## Implementation state

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet
