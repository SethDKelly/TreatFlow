---
type: Engineering Implementation Package
title: TreatFlow 014-B-C02 — AWS Dev IaC and Access Gate
description: Track C second package — cost ceiling, Region, private viewer gate, API/WAF selection, and least-privilege CDK template-only synth/diff; deploy and change-set diff remain separately authorized after live C01-K.
tags: [treatflow, phase-014, track-c, c02, aws, cdk, waf, cloudfront, finops]
---

# 014-B-C02 — AWS Dev IaC and Access Gate

## Purpose and authorization

**STATUS: ENTRY PACKAGE FOR SPONSOR REVIEW. NOT AN AUTHORIZATION TO PROVISION PAID AWS APPLICATION RESOURCES OR RUN `cdk bootstrap` / deploy.**

Depends on [014-B-C01](014-b-c01-backbone-security-deployment-authority.md) (applied) and [014-B](014-b-local-first-implementation-plan.md). Binding architecture: [013-G](../013/013-g-architecture-mvp-delivery-decision.md), [013-D economics](../013/013-d-aws-finops-operational-economics.md), [014-A](014-a-entry-inventory.md) A-04/A-05.

**Hard prerequisites before any C02 deploy PR:**

1. **C01-K PASS** — **live assumed-role** verification as `treatflow-dev-github-deploy` (Layer L in private companion). Backbone **policy sims are supporting evidence only** and **do not** satisfy this gate ([simulator ≠ live](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html)).
2. **Explicit sponsor authorization** naming this package (e.g. “Authorize 014-B-C02 design selections and template-only synth” vs “Authorize C02 deploy”).
3. Recorded **cost ceiling**, **Region**, **viewer-gate** choice, and **API+WAF** selection in the decision ledger below.

## Package scope

| ID | Deliverable | In this entry | Later deploy PR |
|---|---|---|---|
| **C02-01** | Sponsor cost ceiling (approval threshold) | Decision ledger | Enforce via alarms/process |
| **C02-02** | Dev account / primary Region attestation | Decision ledger | Match CDK env |
| **C02-03** | Private CloudFront viewer-side gate design | Selection | Implement |
| **C02-04** | API Gateway REST + regional WAFv2 selection | Selection | Implement |
| **C02-05** | Least-privilege CDK app + **template-only** synth/diff contract | Contract | Deploy |
| **C02-06** | Use `treatflow-dev-github-deploy` + Environment `dev` only | Contract | Workflow |
| **C02-07** | Synthetic-only; 016-D noncorrection disclosure if hosted | Contract | UI/018 |

## Decision ledger (fill before deploy authorization)

| Field | Value |
|---|---|
| **Cost ceiling (USD / month approval threshold)** | _(sponsor)_ |
| **Primary Region** | Default intent: `us-east-2` (backbone primary); confirm |
| **Viewer gate** | □ CloudFront signed URL/cookie · □ Cognito/OIDC at edge · □ Other _(describe)_ · □ HOLD |
| **API + WAF** | □ REST API stage + regional WAFv2 · □ Other _(describe)_ · □ HOLD |
| **CDK bootstrap** | □ Not required yet · □ Separately reviewed central bootstrap _(owner/date)_ |
| **C01-K live assume run / attestation** | _(required — not policy-sim URL alone)_ |
| **C01-K-S policy sims URL (optional supporting)** | _(optional)_ |
| **Deploy authorization** | □ Not granted · □ Granted _(date/name/scope)_ |

## Agent contract

### Synth-only authorization (no AWS write)

When sponsor authorizes **synth-only** (not deploy):

| Allowed | Required form |
|---|---|
| `cdk synth` | Local/CI; no deploy |
| Template comparison | **`cdk diff --method=template`** (or the **pinned CDK CLI** equivalent that compares synthesized templates **without** creating a CloudFormation change set) — see [CDK `diff` reference](https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-diff.html) |
| Credentials | None preferred; if context/lookups need AWS, use a **read-only** role that cannot create change sets, publish assets, or mutate stacks — document the role ARN |
| Context lookups | Prefer committed `cdk.context.json`; if live lookups run, they must be read-only and recorded; failed lookups must not silently invent values |
| Assets | **No** asset publishing (`cdk-assets` / default staging upload). Synth must not push to bootstrap buckets |

| Forbidden under synth-only | Requires separate **write** authorization |
|---|---|
| Bare `cdk diff` (default change-set method) | Yes — can create change sets and publish assets |
| `cdk diff --method=change-set` (or CLI default that uses change sets) | Yes |
| `cdk deploy`, `cdk import`, stack write APIs | Yes (deploy authorization) |
| `cdk bootstrap` | Yes (central/privileged, not routine TreatFlow) |

**Default `cdk diff` is not synth-only.** Agents and CI must pass an explicit template-only method (or equivalent pinned flag) or omit diff entirely.

### Deploy authorization (separate)

Assume `treatflow-dev-github-deploy` only from Environment `dev` on `main`; create only `treatflow-app-*` roles with required boundary; synthetic fixtures only.

**Forbidden always without further gates:** shared `dev-github-deploy`; production account; DNS zone changes; real participant data; Revision correction UX (016-D Option B).

## Stop conditions

- C01-K still HOLD (including “sims green but live assume not done”)
- Cost/viewer/API/WAF undecided
- Synth-only job uses default/change-set `cdk diff` or publishes assets
- Attempt to use PowerUser shared deploy role
- Public unauthenticated data plane

## Relationship to 014-C–E

C02 is the **access/IaC gate**. [014-C–E](014-b-local-first-implementation-plan.md) delivers the protected synthetic environment and ops exit after C02 selections and deploy authorization exist.

## Independent review kickoff

> Review 014-B-C02 against this record. Confirm C01-K cannot pass on simulator evidence alone; confirm synth-only requires template-only diff and no asset publish; confirm default/change-set diff and deploy need separate write authorization. Do not treat merging this entry as deploy permission.
