---
type: Engineering Implementation Package
title: TreatFlow 014-B-C01 — Backbone Security and Deployment Authority
description: Track C first package exit evidence — narrow TreatFlow OIDC deploy principal, main-ref-only bootstrap trust, unprivileged CI; isolation sims pending; does not authorize C02 deploy.
tags: [treatflow, phase-014, track-c, c01, aws-backbone, oidc, iam, ci, authorization]
---

# 014-B-C01 — Backbone Security and Deployment Authority

## Purpose and authorization

**STATUS: APPLY EVIDENCE RECORDED. A-01 PASS (live trust). C01-02 ISOLATION SIMS PENDING ON BACKBONE. NOT AUTHORIZATION FOR 014-B-C02 DEPLOY, CDK BOOTSTRAP, OR PAID AWS APPLICATION RESOURCES.**

Opens Track C per [014-B](014-b-local-first-implementation-plan.md). Companion: private `aws-backbone` `docs/treatflow-014-b-c01.md`.

**Apply baseline:** aws-backbone `2d4eb9d1aa009296bb97387e6fa859ea22a8e330` — [Terraform Apply success](https://github.com/SethDKelly/aws-backbone/actions/runs/39376871791) (verify step green).

## Deliverables

| ID | Deliverable | Evidence |
|---|---|---|
| **C01-01** | Dedicated TreatFlow deploy role | Live `treatflow-dev-github-deploy`; OIDC exact `environment:dev` |
| **C01-02** | Permission isolation beyond OIDC | Source + no PowerUser on apply; **N-C02 sims pending** (`TreatFlow C01 negative sims` workflow) |
| **C01-03** | CDK bootstrap ownership | Central/privileged; TreatFlow must not bootstrap |
| **C01-04** | Untrusted-PR denial (TreatFlow) | Environment `dev` required for deploy assume; PR CI has no AWS |
| **C01-05** | Unprivileged TreatFlow CI | `.github/workflows/ci.yml` |
| **C01-06** | Protected main / Environment `dev` | Maintainer-set (independent 403 possible) |

## Acceptance checklist

| Check | Result |
|---|---|
| **C01-A** Sponsor authorized C01 | **PASS** |
| **C01-B** TreatFlow role + exact subject applied | **PASS** — apply run above |
| **C01-C** Shared role excludes TreatFlow | **PASS** — apply verify |
| **C01-D** Unprivileged TreatFlow CI | **PASS** |
| **C01-E** Main branch protection | **MAINTAINER-SET** |
| **C01-F** Environment `dev` | **MAINTAINER-SET** |
| **C01-G** No app AWS resources in C01 | **PASS** |
| **C01-H** Budget + DNS attestation | **HOLD → C02** |
| **C01-I** Broader live drift inventory | **HOLD → C02** |
| **C01-J** A-01 main-ref-only bootstrap | **PASS** — live trust main-ref-only; PR Environment subjects not trusted (entailed) |
| **C01-K** C01-02 isolation negative sims | **PENDING** — run backbone `TreatFlow C01 negative sims` on `main`; then re-record PASS |

## Exit decision

**C01 authority work is applied.** Full C01 exit for closing A-02/A-03 requires **C01-K PASS**.

**Next:** [014-B-C02 entry](014-b-c02-aws-dev-iac-access-gate.md) — design/selection package. **C02 resource deploy** requires separate sponsor authorization after C01-K and C02 gates (cost, viewer gate, API/WAF).

## Explicit non-goals

- No TreatFlow deploy workflow merge
- No CDK bootstrap / paid app stacks from this record
- No R-P02/R-P03; 016-D Option B deferral stands
