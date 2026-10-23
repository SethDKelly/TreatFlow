---
type: Engineering Implementation Package
title: TreatFlow 014-B-C01 — Backbone Security and Deployment Authority
description: Track C first package exit evidence — narrow TreatFlow OIDC deploy principal, main-ref-only bootstrap trust, unprivileged CI; C01-K requires live assumed-role verification (policy sims are supporting only).
tags: [treatflow, phase-014, track-c, c01, aws-backbone, oidc, iam, ci, authorization]
---

# 014-B-C01 — Backbone Security and Deployment Authority

## Purpose and authorization

**STATUS: APPLY EVIDENCE RECORDED. A-01 PASS (live trust). C01-K HOLD — requires live assumed-role verification (policy simulations are supporting only). NOT AUTHORIZATION FOR 014-B-C02 DEPLOY, CDK BOOTSTRAP, OR PAID AWS APPLICATION RESOURCES.**

Opens Track C per [014-B](014-b-local-first-implementation-plan.md). Companion: private `aws-backbone` `docs/treatflow-014-b-c01.md`.

**Apply baseline:** aws-backbone `2d4eb9d1aa009296bb97387e6fa859ea22a8e330` — [Terraform Apply success](https://github.com/SethDKelly/aws-backbone/actions/runs/39376871791) (verify step green).

## Deliverables

| ID | Deliverable | Evidence |
|---|---|---|
| **C01-01** | Dedicated TreatFlow deploy role | Live `treatflow-dev-github-deploy`; OIDC exact `environment:dev` |
| **C01-02** | Permission isolation beyond OIDC | Source + no PowerUser on apply; **C01-K = live assume gate** (sims supporting only) |
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
| **C01-J** A-01 main-ref-only bootstrap | **PASS** — live trust main-ref-only |
| **C01-K** Live assumed-role isolation verification | **HOLD** — must **assume** `treatflow-dev-github-deploy` and run Layer L API checks (companion). Backbone **policy sims are supporting only** and **cannot** alone set this to PASS ([IAM simulator caveats](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html)). |
| **C01-K-S** Policy simulations (optional) | **OPTIONAL** — backbone `TreatFlow C01 policy sims`; record URL as supporting evidence only |

## Exit decision

**C01 authority work is applied.** Closing A-02/A-03 for TreatFlow requires **C01-K PASS** (Layer L live assume), not simulator success alone.

**Next:** [014-B-C02 entry](014-b-c02-aws-dev-iac-access-gate.md). **C02 resource deploy** requires C01-K (live), C02 ledger, and separate sponsor deploy authorization.

## Explicit non-goals

- No TreatFlow deploy workflow merge from this record
- No CDK bootstrap / paid app stacks
- No treating SimulatePrincipalPolicy as live permission proof
- No R-P02/R-P03; 016-D Option B deferral stands
