---
type: Engineering Implementation Package
title: TreatFlow 014-B-C01 — Backbone Security and Deployment Authority
description: Track C first package — narrow TreatFlow OIDC deploy principal, shared-vs-app IAM boundary, CDK bootstrap ownership, untrusted-PR denial and unprivileged CI; no application AWS resources. Exit HOLD until A-01 and permission-isolation negative tests verify live.
tags: [treatflow, phase-014, track-c, c01, aws-backbone, oidc, iam, ci, authorization]
---

# 014-B-C01 — Backbone Security and Deployment Authority

## Purpose and authorization

**STATUS: SPONSOR-AUTHORIZED PACKAGE IN PROGRESS. EXIT HOLD — A-01 and C01-02 require live independent verification after aws-backbone merge/apply. NOT AUTHORIZATION FOR 014-B-C02, CDK BOOTSTRAP, OR PAID AWS APPLICATION RESOURCES.**

Opens Track C per [014-B](014-b-local-first-implementation-plan.md) and addresses [014-A](014-a-entry-inventory.md) work for TreatFlow. **A-01 remains a blocking gate** until preventive privileged-PR controls are independently verified live (014-A: remediate before trust expansion). **A-02/A-03 remain open for TreatFlow** until permission isolation (not merely OIDC entry) and negative tests pass. **A-04/A-05** and live drift remain **HOLD for C02**. **A-09** closed by [016-D Option B](../016/016-d-factual-correction-product-decision.md). **A-08/A-10** remain later gates.

**Companion private record:** `aws-backbone` `docs/treatflow-014-b-c01.md` (ARNs, policy detail, negative-test commands — not duplicated here).

## Deliverables

| ID | Deliverable | Owner | Evidence |
|---|---|---|---|
| **C01-01** | Dedicated TreatFlow deploy role (not shared `dev-github-deploy`) | aws-backbone Terraform | Role `treatflow-dev-github-deploy`; OIDC **exact** `environment:dev` |
| **C01-02** | Shared-vs-app **permission** boundary (beyond OIDC entry) | aws-backbone | No PowerUser; app prefix excludes deploy role; forced permissions boundary on created roles; bounded Attach/PassRole; **negative tests required** before PASS |
| **C01-03** | CDK bootstrap ownership | Documented decision | Bootstrap is **central/privileged**; TreatFlow CI must not run `cdk bootstrap` |
| **C01-04** | Untrusted-PR denial (TreatFlow app) | OIDC + GitHub Environment | Deploy assume requires Environment `dev`; PR CI has no AWS role assume |
| **C01-05** | Unprivileged TreatFlow CI | TreatFlow workflow | `.github/workflows/ci.yml` — no AWS assume |
| **C01-06** | Protected main / Environment contract | TreatFlow maintainer | Maintainer-applied protection + Environment `dev`; independent re-verify if reviewer APIs return 403 |

## Acceptance checklist

| Check | Result |
|---|---|
| **C01-A** Sponsor authorized C01 (not whole Track C through C02) | **PASS** — explicit proceed 2026-10-19 |
| **C01-B** Narrow TreatFlow role + exact environment subject merged/applied | **PENDING** — aws-backbone PR; apply on merge |
| **C01-C** Shared role trust excludes TreatFlow; apply verify asserts exclusion | **PENDING** — same backbone PR |
| **C01-D** TreatFlow unprivileged CI; no AWS assume on PR | **PASS** — workflow source + Verify check green on PR |
| **C01-E** Main branch protection (PR + required check) | **MAINTAINER-SET** — configured via admin API 2026-10-19 (`Verify` required). Independent agents may see **403**; treat as **unconfirmed by third party** until re-checked with sufficient token scope. Not a substitute for A-01. |
| **C01-F** GitHub Environment `dev` (reviewers; `main`-only branches) | **MAINTAINER-SET** — same caveat as C01-E; required before any C02 deploy workflow |
| **C01-G** No TreatFlow app AWS resources / CDK bootstrap in this package | **PASS** by scope |
| **C01-H** Budget ceiling + DNS owner attestation | **HOLD → C02** (A-04/A-05) |
| **C01-I** Live AWS read-only drift vs Terraform `main` | **HOLD → C02** |
| **C01-J** A-01 privileged backbone PR execution controlled | **HOLD** — source control landed in companion PR (validate-only PR CI; no `pull_request` OIDC on bootstrap; Environment-gated privileged plan). **Not PASS until N-A01-* live verifies** in private companion. Trust expansion / C01 exit blocked meanwhile. |
| **C01-K** C01-02 isolation negative tests | **HOLD** — source control landed (see companion). **Not PASS until N-C02-* live verifies**. Do not close A-02/A-03 for TreatFlow before this. |

## Application vs shared contract (binding)

| Concern | Owner | TreatFlow must not |
|---|---|---|
| GitHub OIDC provider, shared IAM, permission boundaries | aws-backbone | Recreate OIDC provider or mutate central roles from app CI |
| TreatFlow deploy trust | aws-backbone `treatflow-dev-github-deploy` | Use shared `dev-github-deploy` or `repo:…:*` subjects |
| App workload permissions | aws-backbone boundary + future C02 Allows | Assume PowerUser or unmanaged IAM; create roles without the required app boundary |
| App stacks | TreatFlow app IaC after **C02** | Bootstrap CDK or invent shared IAM from app repo |
| Unprivileged verification | TreatFlow `ci.yml` | Assume AWS roles on pull_request |

## Why C01-02 was corrected

OIDC exact-subject trust controls **who may enter**. It does **not** by itself establish application isolation. Accepting C01-02 requires independently reviewed **resource/delegated-role** limits and negative tests in the private backbone companion—not only a dedicated role name or IAM name prefix.

## Explicit non-goals (stop conditions)

- No application AWS writes, DNS changes, or production roles
- No TreatFlow deploy workflow authorization (**014-B-C02**)
- No real-person intake (R-P02) or disclosure (R-P03)
- No Revision / factual correction (016-D Option B deferral stands)
- No copying privileged IAM remediation detail into this public repository
- **No C01 exit while C01-J or C01-K remain HOLD**

## Exit decision

**C01 may exit only after:** companion aws-backbone PR merges, Terraform apply succeeds, **C01-J and C01-K** move to PASS on live negative-test evidence recorded in the private companion, and C01-B/C are PASS.

**Then:** separately authorize [014-B-C02](014-b-local-first-implementation-plan.md). C01 alone does **not** authorize C02.

## Independent review kickoff

> Independently review TreatFlow 014-B-C01 against this record and aws-backbone companion `docs/treatflow-014-b-c01.md`. Confirm A-01 is preventive (not a residual waiver), C01-02 claims wait on live N-C02-* tests, CI has no AWS assume, and no app resources/CDK bootstrap are introduced. Record PASS/HOLD for C01-A–K. Do not authorize C02 or TreatFlow onboarding while C01-J/K are HOLD.
