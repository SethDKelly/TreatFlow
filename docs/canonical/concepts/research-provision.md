---
type: Concept Specification
title: TreatFlow — Research Provision (Conditional)
description: Abstract research evidence scope and limitation-qualified interpretation for independent-concept challenge.
tags: [treatflow, concept, provisional, research, phase-003]
---

# Research Provision — Conditional Behavioral Specification

**Status:** **Conditionally specified in [003-E](../../phases/003/003-e-treatflow-execution.md)**. Distinctness from [Controlled Disclosure](controlled-disclosure.md) remains unproved; 003-F/Phase 004 may merge/reframe/retire. Traceability: [P-02/P-03/P-04](../purpose/purposes.md).

## Purpose and operational principle

Enable a research recipient to **obtain a coherent, meaningfully bounded body of evidence with explicit qualifications about observation, coverage, measurement and sampling**, without prescribing the recipient's scientific conclusion.

**Characteristic story:** A recipient requests observations suitable for investigating time-varying Halloween arrivals. A research provision expresses what observational material is within scope, whether its units represent groups or visitors, where monitored coverage and unknown intervals lie, and what reporting precision and volunteer-selection limitations apply. The recipient can assess whether a Poisson model is unsupported or the evidence inconclusive. If necessary qualifiers are unavailable, the provision is **incomplete/qualified** rather than described as a sound representative sample.

This purpose may instead be an outcome of disclosure plus qualified Observation; independence must be demonstrated through its own state transitions rather than invented to preserve five concepts.

## Abstract types and minimal state

- `InquiryScope`: bounded semantic request for suitable evidence, units and context; not a query language or API.
- `EvidenceReference`: abstract eligible item, deliberately not an imported Observation identity.
- `Qualification`: characterization of units, exposure, precision, provenance limitations and selection/coverage uncertainty.
- `Provision`: a conceptual request, selected eligible evidence references, applicable qualifications and status (**requested, prepared, qualified, unavailable, delivered**).

State: a relation of requests to prepared/qualified/delivered provisions and their declared limitations. No statistical model outputs, dataset file, storage index or disclosure permissions copied into state. The concept does **not** establish an entitlement to access.

## Actions

| Action | Guard / input | Conceptual effect |
|---|---|---|
| **RequestEvidence** | Researcher states meaningful scope and intended use; request may be considered | Establishes a requested provision without implying release rights |
| **PrepareScope** | Proposed scope and available evidence are semantically compatible | Identifies candidate evidence and what is known/unknown about coverage, units and context |
| **QualifyProvision** | Prepared material and known limits | Attaches necessary uncertainty, selection and completeness qualifications; may mark evidence unsuitable/unavailable |
| **Provide** | Qualified provision and **separately established** legitimate availability for intended audience | Makes the defined evidence-and-qualifications bundle available in concept terms; does not authorize a new disclosure decision |
| **InspectProvision** | Entitled view of provision | Returns scope, units, stated qualifications, status and unresolved limitations; no certification of scientific interpretation |

**Independent-concept test:** If `PrepareScope`/`QualifyProvision` have no meaningful behavioral lifecycle distinct from Controlled Disclosure or Observation, **Research Provision must be merged or reframed**. A file assembled for download is not an independent concept.

## Invariants and lifecycle

1. Evidence and its qualifiers are inseparable as the meaningful output of provision: unsupported precision or missing known caveats may not be represented as fully qualified evidence.
2. Group encounters and individual visitor counts cannot be substituted as identical independent event streams.
3. A claim of observed silence requires suitable monitored coverage and reporting completeness; missing/uncertain monitoring never silently becomes zero.
4. Provision must not assert volunteer sampling is representative or a Poisson process confirmed simply because evidence was supplied.
5. The concept does not grant disclosure rights or convert withheld material into eligible evidence.
6. Delivery is a historical fact, not a promise of recovery when future access is suspended.
7. A request can be unavailable or qualified due to insufficient coverage, unsafe availability or scientifically inappropriate scope.

**Deliberately unspecified:** document/export structure, analytical software, sorting/grouping implementation, confidence metric, statistical method and study UI.

**Open questions:** whether meaningful provision needs ongoing independent state; which limits must be mandatory for every evidence type; how privacy-preserving scope interacts with scientific usefulness; how updated/corrected evidence affects an earlier provision without claiming copies revoked; whether research work belongs externally. 003-F must test these as semantic, not infrastructural, questions.
