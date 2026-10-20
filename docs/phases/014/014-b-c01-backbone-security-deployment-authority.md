---
type: Engineering Implementation Package
title: TreatFlow 014-B-C01 — Backbone Security and Deployment Authority
description: Track C first package — narrow TreatFlow OIDC deploy principal, shared-vs-app IAM boundary, CDK bootstrap ownership, untrusted-PR denial and unprivileged CI; no application AWS resources.
tags: [treatflow, phase-014, track-c, c01, aws-backbone, oidc, iam, ci, authorization]
---

# 014-B-C01 — Backbone Security and Deployment Authority

## Purpose and authorization

**STATUS: SPONSOR-AUTHORIZED PACKAGE IN PROGRESS (chat authorization 2026-10-19). NOT AUTHORIZATION FOR 014-B-C02, CDK BOOTSTRAP, OR PAID AWS APPLICATION RESOURCES.**

Closes the Track C entry gate defined in [014-B](014-b-local-first-implementation-plan.md) and addresses [014-A](014-a-entry-inventory.md) findings **A-02**, **A-03** (prefix/boundary), and **A-06** (unprivileged CI + protection requirements) for TreatFlow. **A-01** receives compensating controls + residual HOLD. **A-04/A-05** (DNS/budget live evidence) and live AWS drift checks remain **HOLD for C02**. **A-09** is already closed by [016-D Option B](../016/016-d-factual-correction-product-decision.md). **A-08/A-10** remain later gates.

**Companion private record:** `aws-backbone` `docs/treatflow-014-b-c01.md` (exact ARNs/subjects; not duplicated here).

## Deliverables

| ID | Deliverable | Owner | Evidence |
|---|---|---|---|
| **C01-01** | Dedicated TreatFlow deploy role (not shared `dev-github-deploy`) | aws-backbone Terraform | Role `treatflow-dev-github-deploy`; OIDC **exact** `repo:SethDKelly/TreatFlow:environment:dev` |
| **C01-02** | Shared-vs-app IAM boundary | aws-backbone + this record | TreatFlow absent from shared `github_repositories`; app IAM prefix `treatflow-dev-*` only on TreatFlow role |
| **C01-03** | CDK bootstrap ownership | Documented decision | Bootstrap is **central/privileged**; TreatFlow CI must not run `cdk bootstrap`; C02 may request a separately reviewed bootstrap if needed |
| **C01-04** | Untrusted-PR denial | OIDC + GitHub Environment | Deploy assume requires Environment `dev`; PR CI has no AWS role assume |
| **C01-05** | Unprivileged TreatFlow CI | TreatFlow workflow | `.github/workflows/ci.yml` — install/typecheck/lint/test/build only |
| **C01-06** | Protected main / Environment contract | TreatFlow maintainer | Branch protection on `main`; Environment `dev` with required reviewers and deployment-branch limit before any deploy workflow |

## Acceptance checklist

| Check | Result |
|---|---|
| **C01-A** Sponsor authorized C01 (not whole Track C through C02) | **PASS** — explicit proceed 2026-10-19 |
| **C01-B** Narrow TreatFlow role + exact environment subject merged/applied in aws-backbone | **PENDING** — aws-backbone PR; apply on merge to backbone `main` |
| **C01-C** Shared role trust excludes TreatFlow; apply verify step asserts exclusion | **PENDING** — same backbone PR |
| **C01-D** TreatFlow unprivileged CI present; no `id-token` AWS assume on PR | **PASS** on merge of this package’s CI workflow |
| **C01-E** Main branch protection enabled (PR required) | **PASS** when maintainer settings applied with this package |
| **C01-F** GitHub Environment `dev` created with protection (reviewers; limited branches) | **PASS** when Environment exists; required before C02 deploy workflow |
| **C01-G** No TreatFlow CDK/Terraform app stack, no AWS resource provisioning in this package | **PASS** by scope |
| **C01-H** Budget ceiling + DNS owner attestation recorded | **HOLD → C02** (A-04/A-05) |
| **C01-I** Live AWS read-only drift vs Terraform `main` | **HOLD → C02** |
| **C01-J** A-01 privileged backbone PR-plan residual documented | **PASS WITH RESIDUAL** — see backbone companion; not a TreatFlow blocker for C01 exit |

## Application vs shared contract (binding)

| Concern | Owner | TreatFlow must not |
|---|---|---|
| GitHub OIDC provider, shared IAM, permission boundaries | aws-backbone | Recreate OIDC provider or mutate central roles from app CI |
| TreatFlow deploy trust | aws-backbone role `treatflow-dev-github-deploy` | Use shared `dev-github-deploy` or `repo:…:*` subjects |
| App stacks (future CloudFront/API/Lambda/DDB) | TreatFlow app IaC after **C02** | Bootstrap CDK or invent shared IAM from app repo |
| Unprivileged verification | TreatFlow `ci.yml` | Assume AWS roles on pull_request |
| Protected deploy | TreatFlow Environment `dev` + C02 workflow | Deploy from forks or unprotected refs |

## Untrusted-PR denial model

1. **PR jobs** run only `ci.yml` (no `role-to-assume`).
2. **Deploy** (C02+) must use `environment: dev` so the OIDC `sub` matches the backbone trust.
3. Environment `dev` must require reviewer approval and restrict deployment branches (prefer `main` only).
4. Forks are out of trust (OIDC repo-scoped; Environment secrets/protection not granted to forks).

## Explicit non-goals (stop conditions)

- No application AWS writes, DNS changes, or production roles
- No TreatFlow deploy workflow authorization (that is **014-B-C02**)
- No real-person intake (R-P02) or disclosure (R-P03)
- No Revision / factual correction (016-D Option B deferral stands)
- No copying privileged IAM remediation detail into this public repository

## Exit decision

**Proposed exit after:** (1) this PR merges, (2) companion aws-backbone PR merges and Terraform apply succeeds with verify steps green, (3) Environment `dev` + main protection are in place.

**Then:** Track C may proceed to a **separately authorized** [014-B-C02](014-b-local-first-implementation-plan.md) (cost ceiling, viewer gate, API/WAF selection, least-privilege CDK synth/diff). C01 alone does **not** authorize C02.

## Independent review kickoff

> Independently review TreatFlow 014-B-C01 against `docs/phases/014/014-b-c01-backbone-security-deployment-authority.md` and the linked aws-backbone TreatFlow role PR. Confirm TreatFlow is not on the shared `dev-github-deploy` allowlist, OIDC subject is exact `environment:dev`, CI has no AWS assume, and no app resources/CDK bootstrap are introduced. Record PASS/HOLD for C01-A–J. Do not authorize C02 or AWS application deploys.
