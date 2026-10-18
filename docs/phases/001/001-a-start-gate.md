---
type: Phase Start Gate
title: 001-A — Purpose Inquiry Scope, Evidence, Coverage & Subphase Planning
description: Mandatory Phase 001 start gate that reviews the Phase 000 handoff, purpose-analysis coverage, documentation state, and dependency-safe work needed before concept discovery.
tags: [phase-001, start-gate, purpose, planning, documentation]
---

# 001-A — Purpose Inquiry Scope, Evidence, Coverage & Subphase Planning

## Purpose

`001-A` determines how Phase 001 should investigate purpose, need, context, and success for the cloned project. It must be completed before substantive Phase 001 work begins.

The gate prevents Phase 001 from becoming either a generic requirements exercise or a retrospective justification of solution ideas already present in intake.

## Governing contracts

Review before planning:

- [Phase 001 definition](phase-definition.md);
- [Purpose, Need & Success Framing Contract](purpose-success-contract.md);
- [Phase 001 exit-review template](exit-review-template.md);
- [Phase Lifecycle Contract](../../methodology/phase-lifecycle.md);
- [Documentation Integrity & OKF Governance Contract](../../methodology/documentation-governance.md);
- [Canonical and Historical Knowledge Authority](../../methodology/knowledge-authority.md).

## 1. Validate the Phase 000 handoff

Confirm that current canonical intake knowledge and the Phase 000 handoff are discoverable and sufficiently coherent to begin purpose analysis.

Do not accept intake conclusions blindly. Identify assumptions, source conflicts, solution proposals, or framing choices that Phase 001 should explicitly challenge.

If a material Phase 000 gap makes purpose analysis unreliable, fail the gate or route the issue back rather than inventing purpose certainty.

## 2. Establish purpose-analysis evidence posture

Identify the evidence relevant to purpose analysis and what each source can legitimately support.

Distinguish observations, stakeholder/source assertions, external constraints, assumptions, hypotheses, open questions, and quarantined solution proposals inherited from Phase 000.

Identify missing perspectives or affected parties when their omission could materially distort the purpose model.

## 3. Perform Phase 001 coverage assessment

Every project must assess these semantic dimensions; this is not a one-document-per-row requirement.

| Purpose dimension | Planning disposition |
|---|---|
| Overall product/application purpose | adequate / needs work / not applicable with rationale |
| Actor and affected-party needs | adequate / needs work / not applicable with rationale |
| Burdens, constraints, risks, or opportunities motivating improvement | adequate / needs work / not applicable with rationale |
| Distinct design-purpose obligations | adequate / needs work / not applicable with rationale |
| Material contextual conditions | adequate / needs work / not applicable with rationale |
| Representative success framing | adequate / needs work / not applicable with rationale |
| Purpose tensions, conflicts, or distributional effects | adequate / needs work / not applicable with rationale |
| Assumptions and uncertainties qualifying purposes | adequate / needs work / not applicable with rationale |
| Traceability to Phase 000 and source evidence | adequate / needs work / not applicable with rationale |

`Not applicable` requires a rationale and must not hide an inconvenient perspective.

## 4. Identify purpose-quality risks

Inspect the incoming framing for likely defects such as:

- feature names masquerading as purposes;
- organizational goals presented as user value without a human/domain rationale;
- purposes so broad they cannot discriminate among designs;
- purposes that embed a preferred workflow or mechanism;
- multiple separable needs collapsed into one aspiration;
- one stakeholder's purpose presented as universal;
- success defined only as adoption, revenue, delivery, or technical replacement;
- unresolved uncertainty presented as established need.

Decide which risks require deliberate substantive work.

## 5. Derive dependency-safe substantive subphases

Create only the workstreams needed for this project. Possible groupings include affected-party/need analysis, purpose decomposition, contextual/tension analysis, success framing, or evidence reconciliation, but these are examples rather than a fixed template.

For each proposed subphase define:

- purpose dimensions covered;
- inputs and authoritative references;
- key questions;
- dependencies;
- expected phase evidence;
- canonical knowledge affected;
- explicit exclusions;
- completion evidence;
- unresolved-item destination.

Reserve the final project-specific subphase for consolidation, documentation-integrity review, exit decision, and Phase 002 handoff.

## 6. Plan canonical ownership and documentation changes

Before creating documents, identify existing canonical owners that should be referenced or refined.

Plan new canonical documents only when distinct semantic knowledge needs a stable identity of its own. Identify indexes and cross-links that will require updates.

Explicitly identify duplication risks: Phase 001 should not copy the Phase 000 project definition into purpose documents merely for convenience.

## 7. Define Phase 001 exit evidence

The planned exit review must be capable of showing that:

- important purposes are need-focused, specific enough to discriminate, evaluable, and solution-neutral;
- relevant affected-party needs and tensions are visible;
- representative success framing expresses meaningful improvement without assuming concept design;
- purpose assumptions and uncertainty are explicit;
- current purpose knowledge is traceable to intake context/evidence;
- canonical ownership is coherent and discoverable;
- documentation introduced by the phase is indexed, cross-linked, non-duplicative, and OKF-conformant;
- no candidate concept set has been made authoritative;
- no representation, architecture, or implementation work has begun.

## Required output

The completed `001-A` record should end with:

1. Phase 000 handoff/readiness assessment;
2. relevant evidence and uncertainty posture;
3. completed Phase 001 coverage assessment;
4. identified purpose-quality and solution-lock risks;
5. approved project-specific Phase 001 subphase sequence;
6. rationale and dependency order;
7. canonical ownership and documentation-change plan;
8. completion evidence for each substantive subphase;
9. planned final consolidation/exit-review subphase;
10. carry-forward or return-to-Phase-000 items;
11. implementation-status confirmation.

## Gate outcome

Use one of:

- **READY TO BEGIN PHASE 001 SUBPHASES**
- **NOT READY — PURPOSE-INQUIRY PRECONDITIONS MISSING**

The gate must not declare Phase 001 complete or authorize concept discovery.

## Implementation state

- **Readiness:** not ready
- **Execution:** not started
- **Authorization:** not yet
