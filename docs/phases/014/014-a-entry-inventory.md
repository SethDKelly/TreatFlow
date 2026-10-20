---
type: Engineering Entry Audit
title: TreatFlow 014-A — AWS Authority Inventory, Shared-Backbone Integration and 014-B Readiness
description: Source-evidenced cross-repository foundation inventory and scoped AWS implementation entry decision; distinguishes GitHub-declared infrastructure from verified live AWS protections.
tags: [treatflow, phase-014, inventory, aws, aws-backbone, github, finops, oidc, architecture, handoff]
---

# 014-A — AWS Foundation Authority, Cross-Repository Inventory & 014-B Preflight

## A01 — Scope, baseline and finding

**014-A DOCUMENTARY INVENTORY PASS WITH BLOCKING SHARED-FOUNDATION DEPENDENCIES; proposed exit after PR review/merge. 014-B AND ALL AWS/IMPLEMENTATION WRITES: HOLD.**

Entry independently confirmed: [013-H](../013/013-h-independent-exit-authorization.md) merged via TreatFlow PR #101 at `main` commit `3e80b4fd39390c71cccfb4c43f2a8aa26da76598`. The sponsor identified a **separately maintained, private central AWS infrastructure repository**, `SethDKelly/aws-backbone`, for reusable, nonapplication-specific AWS configuration. Its inspected source baseline is `main` commit `6f32d7feafcbc2d4f137cc45028551d646cc78b3`, not a live AWS inventory. Repository inspection on 2026-10-19 used the connected GitHub account; **no AWS APIs, billing APIs, Route 53 admin controls, IAM role assumptions, Terraform, CDK, cloud writes, GitHub settings writes or code execution were performed**.

The existence of shared AWS infrastructure **changes the previously proposed Phase 013 integration boundary**: don't reconstruct centrally owned GitHub OIDC, role trust, permission boundaries, account scaffolding, DNS governance or deployment authority within TreatFlow. TreatFlow retains application-specific compute, static web delivery, persistence, application API, its delivery pipeline and its seven-action Observation realization. Resolve bootstrap, app role and resource ownership **before** authorizing CDK and deploy workflows.

**Confidentiality:** this repository is public while aws-backbone is private. Detailed IAM trust-policy/security findings and remediation instructions belong in the restricted central repository's issue tracker, not duplicated into TreatFlow public docs. This audit records no account numbers, ARNs, IAM username, Terraform state bucket names, access tokens, private DNS inventory or operational secrets. Links to private sources may not resolve for public readers; missing access must not be interpreted as absence of a resource.

## A02 — Actual source inventory, with evidence grades

| Evidence surface | Verified source-level finding | Verification limitation / consequence |
|---|---|---|
| TreatFlow repository | Public; main at the entry SHA above; tracked tree contains **documentation and agent rules, no application IaC/CDK source or GitHub workflows** as of that SHA | This is a tracked main-tree file inventory, not scanning all refs/untracked material |
| aws-backbone repository | Private, main at the inspected SHA; tracked Terraform root `accounts/shared-services/`, modules for shared dev IAM and Terraform bootstrap, two GitHub Actions plan/apply workflows, examples and operator documents | Verified committed files and GitHub records; **not independently verified real AWS resource state** |
| Central state and tooling | Backbone source declares Terraform `>=1.5`, AWS provider `~>5.0`, S3 remote state with locking and shared-services root | Backend definition **does not prove Terraform state contents/current drift**; app stacks must not reuse this root/state |
| Accounts/Region | Central source documents one current **shared development** AWS account and primary `us-east-2`, with `us-east-1` as alternate; separate production account and production deployment role remain future roadmap items | No owner-attested account inventory, AWS Organization map, real account role verification or permitted deployment regions; **separate production remains unverified** |
| Existing GitHub OIDC | Central Terraform declares shared GitHub OIDC provider, human dev access, application deploy role and permission boundaries; source allows other existing apps but **does not yet admit `SethDKelly/TreatFlow`** | A future trusted-repo update is a separately approved **backbone-owned IAM change**, not a TreatFlow CI action |
| IAM role protection | Source uses shared dev deployment principal with wide service privileges and app-role-prefix IAM exceptions; trust and non-IAM resource scoping need security hardening before TreatFlow integration | A declared permission boundary alone does not prove cross-app data/resource isolation or secure deployment; details tracked only in private security issue |
| CI operational evidence | GitHub Actions **Terraform Apply** job on backbone SHA above completed **successfully on 2026-07-11**; its init/plan/apply and post-apply trust-check steps reported success | This is stronger than source alone, but **does not prove exact live IAM state on 2026-10-19**, security of the run, or absence of drift after July |
| Privileged workflow separation | Backbone has Terraform plan on PR and apply on main/manual. Source review found privileged-runner and OIDC-trust concerns requiring dedicated private security review | A passing plan/apply is not evidence that untrusted PRs lack sensitive privileges; do not add TreatFlow to trust before remediation acceptance |
| TreatFlow branch security | GitHub API returned **0 repository rulesets** for TreatFlow; main branch-protection endpoint was **403 (integration access denied)**, and no GitHub Actions workflows exist in tracked main tree | No rulesets seen ≠ no classic branch protection. Effective branch review/check/environment protections **remain unverified** |
| Backbone branch security | Rulesets endpoint returned **403 with feature-availability message** for private repo; classic branch protection endpoint was **403 (integration access denied)** | Cannot declare settings active or inactive; a human maintainer must verify effective protection before privileged workflow trust changes |
| Route 53 and TLS | No verified SkellyHouse hosted-zone ownership, delegation, record collisions, certificate association or issuer control. Backbone's tracked Terraform tree does **not** implement a SkellyHouse Route 53/CloudFront distribution | Do not infer DNS authority from existence of `www.skellyhouse.com`; no DNS/ACM changes |
| FinOps | Previous [013-D scenarios](../013/013-d-aws-finops-operational-economics.md) are illustrative partial costs, and `<$50` idle / `<$150` seasonal were **unapproved hypotheses** | No combined account-backed estimate for central services plus TreatFlow REST API stage WAF, CDN, dev gate, authentication, logs and backup; no confirmed budget owner/limit |
| Privacy and product scope | Canonical [Observation](../../canonical/concepts/observation.md) and [013-E contracts](../013/013-e-concept-to-mvp-realization.md) remain binding | No verified R-P02 real-person collection/processing or R-P03 disclosure authorization; protected nonprod must use synthetic data only |

Evidence confidence labels: **SOURCE-VERIFIED** is a committed repository-file claim; **GITHUB-RUN-VERIFIED** is a historical Actions result; **NOT VERIFIED** is no actual cloud/control-plane evidence. Never upgrade the first two to “AWS security controls currently enforce it” without authorized read-only AWS confirmation and negative tests.

## A03 — Shared foundation versus application contract

| Domain | Natural owner | Contract and hard prohibition |
|---|---|---|
| Existing AWS shared account identity, Organizations decisions, GitHub OIDC provider and IAM role/boundary trust | **aws-backbone** | Maintain one central trusted policy owner. TreatFlow CI cannot create or mutate shared OIDC trust, global roles or central permission boundaries |
| Central Terraform root/state, bootstrap authority, central security policy and shared operational guardrails | **aws-backbone** | Restrict changes to reviewed backbone Terraform change path; no app repository writes to central Terraform state or privilege escalation |
| GitHub environment/repository-specific approval gate | **TreatFlow repo maintainer**, in coordination with backbone trust owner | App CI is unprivileged on PRs; production deploy has human gate and distinct role; OIDC subjects match actual protected branch/environment shape |
| TreatFlow frontend, REST API + WAF stage, Lambda, DynamoDB, private-dev admission integration | **TreatFlow application IaC** after separate approval | Own dedicated app stacks only, resource naming, state and access contracts; no duplication of central state, OIDC trust or reusable IAM controls |
| AWS CDK bootstrap/CloudFormation execution/deploy roles, if CDK retained | **Central trust/permission approval**, owned or explicitly delegated by backbone | CDK bootstrap is privileged and may create roles or default admin execution; **not** a routine dev-app command. Define least-privilege bootstrap owner, safe role assumption, account/Region and resource permissions first |
| SkellyHouse zone and exact subdomain/TLS change | **Proven domain/zone owner**, potentially a separate shared-DNS authority | No inferred parent-zone control, wildcard record permission, or autonomous DNS change. Shared owner may furnish cross-account validation/alias records only by approval |
| Application deployment, tests, rollback and nonprod synthetic fixtures | **TreatFlow CI/test-controller owner**, with immutable build and review evidence | Only AssumeRole to an approved scoped **dev** role; no production privileges, generic IAM/SQL, shared account administration or real data |
| Production account, deploy trust and billing | **Future distinct authorized owner** | Backbone currently does not establish this production architecture; **do not co-locate production in the existing shared dev account by inference** |

**Terraform + CDK is acceptable with separate ownership**, not competing state managers: Terraform may own reusable shared identity/trust; CDK/CloudFormation may own application-specific stacks. Never allow both managers to reconcile the same IAM role, CloudFront distribution, hosted zone, bucket, or bootstrap stack. TreatFlow must determine whether a preexisting service-specific stack is managed elsewhere before importing/creating resources.

AWS documents that standard CDK bootstrapping provisions deployment, publishing, lookup and CloudFormation execution roles and can default the execution role to administrator-level permissions. An independently reviewed, limited bootstrap is necessary before protected CI/CDK deployment: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html and https://docs.aws.amazon.com/cdk/v2/guide/best-practices-security.html.

## A04 — Material findings and action owners

| ID / priority | Finding / effect | Proper owner, resolution and release condition |
|---|---|---|
| **A-01 CRITICAL** | Privileged shared Terraform PR-plan and environment-approval posture needs security review | **Backbone maintainers** assess PR-controlled code/credentials and output exposure, least-privilege plan versus protected apply, action provenance and manual dispatch. Resolve privately before TreatFlow onboarding or other new trust expansion |
| **A-02 HIGH** | TreatFlow not in current central GitHub OIDC allowlist; existing wildcard ref trust/shared broad service permission is not app-isolated | **Backbone IAM owner** designs dedicated or effectively isolated TreatFlow dev deploy principal with exact protected subject and service/resource role scopes, no prod reachability; protected authorizer gates verified |
| **A-03 HIGH** | Existing shared dev IAM role-name prefix policy lacks TreatFlow; CDK may need IAM bootstrap/PassRole outside existing app scopes | **Backbone and TreatFlow IaC owners** agree on limited app-role prefix, CloudFormation execution policy, CDK bootstrap owner, principal scope and negative-tests before any synth/deploy that might provision |
| **A-04 HIGH** | No independently verified production account/deploy role, dev/prod separation, DNS zone or relevant TLS | **AWS/domain owner** supplies sanitized account/zone/Region/access inventory, proposed dev/prod separation, hosted names and human change authority; **no public deployment** |
| **A-05 HIGH** | Full application + central fixed-service cost and budget unknown | **Billing/sponsor owner** selects a spending ceiling, reviewed REST-stage WAF/CDN/dev gate/identity/log/backup estimate and incident contacts; no paid AWS operation until accepted |
| **A-06 HIGH** | Branch protection and production GitHub Environment approval efficacy unknown; no TreatFlow CI workflow yet | **Repo maintainer** captures effective current rules/reviewer eligibility/checks and designs unprivileged CI. Production role remains unavailable; CI workflow creation requires separate authorization |
| **A-07 MEDIUM** | Central security documentation is partly inconsistent with current IAM exceptions and committed `auto.tfvars` source precedence | **Backbone documentation owner** reconciles its docs and historical instructions in a separate private PR; no duplicated policy in TreatFlow public corpus |
| **A-08 HIGH** | Private dev gate/test authorization and possible mandatory-signup design conflict unresolved | **Security/product owner** selects verified dev admission and pseudonymous private entitlement; no public participant intake or assumed ownership from AWS JWT alone |
| **A-09 HIGH** | Protected private factual correction must have legitimate Revision standing or explicit synthetic-MVP limitation | **Product authority** selects limited V slice vs recorded deferral before 016-D; no destructive editing shortcut |
| **A-10 HIGH** | Real-person/privacy/disclosure operational prerequisites unverified | **Independent competent owner** resolves R-P02 and R-P03 before any corresponding operation; no agent/CI override |

**Restricted issue tracking:** privileged trust details, corrections and exact policy changes are recorded under the separately controlled backbone repository rather than in this public audit. This doc neither asks agents to exploit a defect nor asserts an attack occurred.

## A05 — Full cost and account verification plan (not executed)

1. Have the AWS owner attest whether the backbone **development account** remains intended for synthetic nonproduction, whether a separate production account exists or is planned, who owns DNS and billing, and the allowed primary and secondary Regions. Provide no secret values or account IDs to this public repository.
2. Obtain an authorized **read-only** actual-state check for AWS account, IAM role trust/boundaries, GitHub OIDC issuer/sub, CloudFormation bootstrap presence, billing/Budgets, hosted-zone NS/SOA, ACM name and Region, CloudFront distribution existence and quota limits. No role assumptions without prior owner-granted connector rights.
3. Compare deployed state against Terraform `main` and last successful apply, record drift as unknown until examined. A GitHub green workflow in July does not establish October state.
4. Model S0 idle, S1 normal, S2 Halloween burst and S3 abuse with **REST API rather than previous HTTP API unit assumptions**, standalone regional WAF, private dev viewer gate, Lambda/DDB, CloudFront PAYG versus flat-plan eligibility, Cognito/guest admission, identity/email, logging, backup, DNS, alerts and shared foundation allocations. Require owner-approved total and relevant thresholds before provisioning.
5. Test that new TreatFlow dev OIDC/CloudFormation roles cannot assume prod or alter other apps/shared foundation. Verify untrusted pull requests **cannot** assume privileged planning/deploy roles, and that protected main/release approval cannot be bypassed by workflow_dispatch.
6. Evaluate 013-E E-T01–E-T22 synthetic negative cases once the independently authorized application foundation exists, not as a substitute for AWS governance evidence.

## A06 — Candidate 014-B package to request later (not authorized)

**Title:** 014-B — AWS Backbone Trust Reconciliation, Protected CI and IaC Boundary.

Proposed deliverables, in strict order: (a) private backbone trust/privileged-PR hardening proposal and independently approved change; (b) confirmed GitHub branch/environment and cost-owner decisions; (c) TreatFlow-specific dev OIDC authorization boundary and safe application IAM/CloudFormation bootstrap contract; (d) controlled app-local CDK TypeScript **synthesis** and unprivileged CI after explicit task-level permission; (e) a deployable **dev only** stack plan subject to a **second**, paid AWS write authorization. This is a proposed decomposition, not a green light for all five parts.

**Do not** onboard the public TreatFlow repository to a wildcard all-ref, broad shared deploy role as a convenience; do not give PR CI an administrator credential; do not run `cdk bootstrap` or privileged `terraform apply` merely because the program roadmap names them. TreatFlow can use application CDK *only after* central role/stack boundary is accepted; the use of Terraform for backbone does not compel Terraform for the application.

### Approval/evidence checklist before seeking 014-B execution

- [ ] Central backbone maintainer acknowledges restricted security remediation ownership and verifies PR-plan/apply privilege separation.
- [ ] Actual AWS account roles and dev/prod boundaries verified by an authorized operator; no copied secrets in public repo.
- [ ] Effective GitHub protections and narrowly scoped OIDC subject/deploy role documented, including evidence of negative trust tests.
- [ ] DNS owner and hostname/certificate-change boundary confirmed, or names kept on HOLD.
- [ ] Full architecture and fixed-cost estimates produced; sponsor approves a hard *approval threshold* (not misrepresented as an AWS Budgets hard spend cap).
- [ ] CDK bootstrap/CloudFormation execution role permissions bounded and owned; app IaC scope reviewed.
- [ ] Specific 014-B repo paths, approved implementation/review actors, independent CI evidence, rollback and stop conditions accepted.

## A07 — Exit decision, carry-forwards and authority

**014-A PASS FOR DOCUMENTARY CROSS-REPOSITORY INVENTORY WITH HIGH/CRITICAL REMEDIATION DEPENDENCIES, conditional on this PR's independent review and merge.** Both repositories were accessed and inspected; current committed source and a historical successful backbone apply were observed; GitHub protection and actual AWS/financial/Route 53 state are appropriately recorded **unknown or inaccessible**, not inferred as safe. The central-application ownership boundary is now explicit, with a single natural roadmap owner retained in [013 MVP implementation roadmap](../013/mvp-roadmap.md).

**014-B EXECUTION HOLD** until a fresh explicit human authorization and the relevant backbone/CI/AWS/budget evidence is available; a source-level code design review and a green infrastructure PR do not suffice. Next safe planning step is to address the private shared-IAM/CI security review and obtain the nonsecret AWS/billing/zone owner inventory, then independently approve a scoped 014-B work package. R-P02/R-P03 remain nonnegotiable separate real-person/disclosure no-go gates.

No code, CI, IAM role, AWS resource, Route 53 record, public site, participant account, app deployment, cost setting or AWS data was changed by this Phase 014-A documentary audit.
