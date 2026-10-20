---
type: Engineering Implementation Package
title: TreatFlow 014-B-C02 — AWS Dev IaC and Access Gate
description: Track C second package — cost ceiling, Region, private viewer gate, API/WAF selection, and least-privilege CDK synth/diff for synthetic-only dev; deploy remains separately authorized after C01-K.
tags: [treatflow, phase-014, track-c, c02, aws, cdk, waf, cloudfront, finops]
---

# 014-B-C02 — AWS Dev IaC and Access Gate

## Purpose and authorization

**STATUS: ENTRY PACKAGE FOR SPONSOR REVIEW. NOT AN AUTHORIZATION TO PROVISION PAID AWS APPLICATION RESOURCES OR RUN `cdk bootstrap` / deploy.**

Depends on [014-B-C01](014-b-c01-backbone-security-deployment-authority.md) (applied) and [014-B](014-b-local-first-implementation-plan.md). Binding architecture: [013-G](../013/013-g-architecture-mvp-delivery-decision.md), [013-D economics](../013/013-d-aws-finops-operational-economics.md), [014-A](014-a-entry-inventory.md) A-04/A-05.

**Hard prerequisites before any C02 deploy PR:**

1. **C01-K PASS** — backbone `TreatFlow C01 negative sims` workflow green (N-C02-*).
2. **Explicit sponsor authorization** naming this package (e.g. “Authorize 014-B-C02 design selections and synth-only” vs “Authorize C02 deploy”).
3. Recorded **cost ceiling**, **Region**, **viewer-gate** choice, and **API+WAF** selection in the decision ledger below.

## Package scope

| ID | Deliverable | In this entry | Later deploy PR |
|---|---|---|---|
| **C02-01** | Sponsor cost ceiling (approval threshold, not AWS Budgets hard cap fiction) | Decision ledger | Enforce via alarms/process |
| **C02-02** | Dev account / primary Region attestation | Decision ledger | Match CDK env |
| **C02-03** | Private CloudFront viewer-side gate design | Selection | Implement |
| **C02-04** | API Gateway REST + regional WAFv2 selection | Selection | Implement |
| **C02-05** | Least-privilege CDK app layout (TreatFlow-owned stacks only) | Synth/diff contract | Deploy |
| **C02-06** | Use `treatflow-dev-github-deploy` + Environment `dev` only | Contract | Workflow |
| **C02-07** | Synthetic-only; no real data; 016-D noncorrection disclosure if hosted | Contract | UI/018 |

## Decision ledger (fill before deploy authorization)

| Field | Value |
|---|---|
| **Cost ceiling (USD / month approval threshold)** | _(sponsor)_ |
| **Primary Region** | Default intent: `us-east-2` (backbone primary); confirm |
| **Viewer gate** | □ CloudFront signed URL/cookie · □ Cognito/OIDC at edge · □ Other _(describe)_ · □ HOLD |
| **API + WAF** | □ REST API stage + regional WAFv2 · □ Other _(describe)_ · □ HOLD |
| **CDK bootstrap** | □ Not required yet · □ Separately reviewed central bootstrap _(owner/date)_ |
| **C01-K sims run URL** | _(required)_ |
| **Deploy authorization** | □ Not granted · □ Granted _(date/name/scope)_ |

## Agent contract (when deploy is later authorized)

**Permitted (synth-only authorization):** CDK/TypeScript app under an agreed path; `cdk synth` / diff in CI **without** AWS write; stack names/prefixes under `treatflow-*`; no shared OIDC/IAM mutation.

**Permitted (deploy authorization):** Assume `treatflow-dev-github-deploy` only from Environment `dev` on `main`; create only `treatflow-app-*` roles with required boundary; synthetic fixtures only.

**Forbidden:** `cdk bootstrap` from TreatFlow unless separately approved; shared `dev-github-deploy`; production account; DNS zone changes; real participant data; Revision correction UX (016-D Option B).

## Stop conditions

- C01-K still PENDING
- Cost/viewer/API/WAF undecided
- Attempt to use PowerUser shared deploy role
- Public unauthenticated data plane

## Relationship to 014-C–E

C02 is the **access/IaC gate**. [014-C–E](014-b-local-first-implementation-plan.md) delivers the protected synthetic environment and ops exit after C02 selections and deploy authorization exist.

## Independent review kickoff

> Review 014-B-C02 against this record and current C01 exit status. Confirm no deploy/bootstrap is authorized by merging this entry alone. Require C01-K evidence and a filled decision ledger before any deploy PR.
