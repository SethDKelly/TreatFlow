---
type: Engineering Architecture Decision and Delivery Gate
title: TreatFlow 013-G — AWS Architecture Selection, MVP Critical Path and Risk Reconciliation
description: Consolidated conditional engineering baseline, selected alternatives, bounded implementation dependencies, residual blockers and formal 013-H authorization packet.
tags: [treatflow, phase-013, aws, adr, implementation, delivery, mvp, security, autonomy, risk]
sources:
  - id: aws-waf-rest
    resource: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-aws-waf.html
    title: AWS — Associate WAFv2 with API Gateway REST API stage
  - id: aws-http-authorization
    resource: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-access-control.html
    title: AWS — HTTP API authorization approaches
  - id: aws-rest-cognito
    resource: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html
    title: AWS — REST API Cognito authorizers
  - id: aws-rest-lambda-authorizer
    resource: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html
    title: AWS — REST API Lambda authorizers
  - id: aws-api-pricing
    resource: https://aws.amazon.com/api-gateway/pricing/
    title: AWS — API Gateway current pricing
  - id: aws-pricing-calculator
    resource: https://calculator.aws/
    title: AWS Pricing Calculator
---

# 013-G — Architecture Selection, Implementation Package Sequencing, Risk Resolution & MVP Delivery Plan

## Decision summary and authority

**013-G PROPOSED CONDITIONAL ARCHITECTURE BASELINE AND DEPENDENCY-ORDERED MVP PROGRAM — DESIGN COMPLETE FOR 013-H INDEPENDENT REVIEW, PENDING MERGE. NOT APPROVED TO BUILD.**

Entry: [013-F](013-f-agentic-independent-test-control.md) merged through PR #99 at `main` commit `f9474c1302d4e76efb265eb459267648de974abb`. Reconciles the distinct engineering/evidence owners [013-B AWS alternatives](013-b-aws-architecture-evaluation.md), [013-C isolation/DNS/trust](013-c-aws-environment-deployment-trust.md), [013-D FinOps/abuse](013-d-aws-finops-operational-economics.md), [013-E MVP semantics/identity](013-e-concept-to-mvp-realization.md), and [013-F independent agent/test-control](013-f-agentic-independent-test-control.md). [Canonical purpose](../../canonical/purpose/purposes.md), [five-concept product family](../../canonical/project/concept-family-scope.md), [Observation owner](../../canonical/concepts/observation.md), [mapping](../../canonical/mapping/observation-representation.md), [action feedback](../../canonical/mapping/integrated-action-language.md), [cross-concept protected correction](../../canonical/composition/observation-stewardship-revision.md) and [six safety obligations](../012/012-e-treatflow-handoff.md) override any engineering convenience.

**Proposed architecture is not verification.** No AWS accounts, DNS/Route 53 authority, billing, WAF, certificates, budgets, API ingress, GitHub environment rules, CI required-check coverage, human release reviewers, real data eligibility, application, MCP server or cloud resources were inspected or created in this step. Do not infer active protection or begin implementation from this design PASS.

**Stage-gate separation:** (i) 013-G consolidates a preferred baseline and identifies unresolved authorizations; (ii) 013-H independently reviews evidence and may **HOLD, approve documentation/discovery-only work, or authorize a strictly bounded synthetic-only dev package** if prerequisites are truly satisfied; (iii) protected-nonprod Phase 018 MVP-candidate qualification is later; (iv) real-person collection/processing and public observation disclosure require entirely separate accountable R-P02/R-P03 decisions regardless of 013-H or 018.

## G01 — Selected conditional ADR baseline

| Area | Recommended baseline for synthetic MVP candidate | Alternatives considered / overturning condition | Hard conditions |
|---|---|---|---|
| User interface | **Static-first React + TypeScript, Vite build**, accessible SPA, private S3 REST origin behind CloudFront OAC | Simpler static JS if sufficient, or another static framework; SSR only if verified product requirement demands it | No private records in public CDN cache or asset bundle; dev viewer gate; no required sign-up before private recording |
| Runtime | **Node.js/TypeScript Lambda** with explicit limits; no always-running container or VPC/NAT by default | Other supported Lambda runtime only with documented maintenance benefit; containers if measured sustained economics justify | Pin then-supported runtime when implementation approved; redacted structured logs, short timeouts, no real-person payloads |
| API ingress **(changed from 013-B)** | **Regional API Gateway REST API, stage-attached AWS WAFv2, Lambda integration and authorizer(s)**, separate regional API hostname per environment | Lower-cost HTTP API plus independent proven controls; CloudFront proxy/origin restriction only if bypass eliminated and authenticated caching safe | REST-stage WAF applies on direct API-origin requests, so browser/CDN bypass cannot skip those WAF checks. WAF does **not** prove identity/owner rights or hard spending cap. Require authentication, per-resource authorization, rate/size limits and no public writes |
| Persistence | **DynamoDB on-demand**, conditional operations and cost-bounded access patterns, no client database access | Aurora/Postgres if transaction/relational/history demands justify additional expense | Design partition/owner binding, history and retry/attempt semantics before physical schema; backups, deletion, read consistency and retention explicitly decided |
| Participant identity | **Invitation-controlled nonproduction tester**, with **distinct scoped pseudonymous private Observation principal/capability** for synthetic O-only tests; voluntary account linking only if justified | Cognito tester OIDC, or managed optional participant identity; bespoke production anonymous self-registration not approved | Separate eligibility from technical identity and from S Party/V authority; deny unknown testers, dev/prod cross-session requests and guessed record IDs |
| Environment | **Two workload AWS accounts preferred**, separate prod and synthetic dev resources/roles/identities; existing DNS owner may be separate | One-account synthetic-only fallback only under an accepted isolation exception, never unreviewed equivalent production | No shared secrets, cross-account data copying or agent production write privileges; actual account availability unverified |
| Web entry | Public prod CloudFront/S3 assets and **restricted nonprod CloudFront viewer access** using an authenticated broker/signed cookies or independently qualified edge method | Fixed-IP restricted dev alternative if operationally viable; network-isolated preview at greater cost if required | CloudFront OAC alone protects S3 **origin**, not dev viewers; dev SPA/deep links, host aliases and API separately guarded |
| Domain/TLS | Prefer `treatflow.skellyhouse.com`, `treatflow-dev.skellyhouse.com`, with independent API subdomains; CloudFront ACM in us-east-1, regional API ACM in API Region | `*.www.skellyhouse.com` family only if a properly delegated `www` DNS zone is what is actually controlled | Human-verifiable zone/NS/SOA, ownership, record collision, approval and rollback before changes |
| IaC | **AWS CDK in TypeScript**, one natural infrastructure owner, per-account stacks/environments and reviewed change set | Terraform/OpenTofu if operator/repo evidence materially favors it; no parallel IaC frameworks | CDK synth/diff, IAM/risk reviews, approved AWS writes only after 013-H; no irreversible resources by default |
| API/app protection | Per-environment request validation, scoped permission, stage WAF and velocity/rate controls; no exposed generic admin route | Alternate ingress only with equivalent origin-bypass and abusive-cost test | Direct REST API default endpoint may remain independently reachable; stage WAF and method authorization **must apply**. Disabling the default endpoint/custom domain is useful but not the core security boundary |
| CI / agentic | Cursor ↔ Codex rotate implement/review, isolated branch/worktree, independent CI and synthetic black-box test controller; protected merge/release approval | CI/CLI adapter initially rather than fully remote MCP service to reduce cost/exposure | Do not self-approve or grant agents prod IAM/secret access. Separate human production approval. No controller implementation until authorized |
| Static CDN pricing | CloudFront **PAYG vs flat-plan Free/Pro is not selected**; compare exact account/feature eligibility | Paid plan may reduce seasonal variability and bundle WAF/CDN benefits for web distribution | **REST API stage WAF is separate regional protection and may incur separate cost.** Do not count as included automatically under frontend CloudFront flat plan |

**Decision rationale for REST API over preferred 013-B HTTP API:** AWS officially supports **direct WAFv2 association with API Gateway REST stages** and evaluates WAF before authorizers. An HTTP API served under a public hostname cannot assume a frontend CloudFront/WAF plan protects its direct endpoint. The REST approach is the preferred baseline for a security-conscious small MVP because it closes that particular bypass without inventing a custom CloudFront secret-header validation scheme. It increases the API unit-cost and WAF base/service charges; compare against HTTP API plus validated protection at 013-H. REST API may use Cognito authorizers for optional managed sign-in, or scoped Lambda authorizers for synthetic guest principals. Both still need **application object-level entitlement**. No authentication mechanism can award protected S/V/D rights by itself.

**Decision category:** baseline selected for **review and constrained development planning**; final sponsor spend, identity, correction authority, operational protection and AWS availability remain blockers, not silently decided.

## G02 — Exact MVP boundary and protected correction decision

**MVP candidate at Phase 018** remains observation-first, self-contained, synthetic and private: O.Establish, O.Report, O.AssertCoverage, O.Qualify, O.Inspect, O.Close and O.InspectAfterClose with two primary reporting modes, accurate unit/time/coverage semantics, private entitlement and honest confirmed/not-effected/unresolved outcomes. Five conceptual owners remain the adopted family; optional S/R/D paths are not prerequisites and are unavailable for public exploitation. No automatic research claims or public data exports.

**Proposed correction resolution:** **include a small, explicitly protected private Revision slice as a conditional MVP milestone**, rather than allow destructive editing or pretend O.Qualify can change quantities. If authorized, this consists of V.EstablishSubject for a reported assertion with a separately justified scoped correction entitlement, V.Amend retaining the predecessor and a reason, and V.InspectHistory for entitled private review. No unbounded public attribution, standing contest, adjudication, community publication or full R/D feature set is included. The technical record owner is **not automatically a legitimate V actor**; entitlement must be explicitly established and challenged in 015/016. A new report with the same quantity does not substitute for a history-preserving amendment.

**Critical approval alternative:** if rightful correction authority cannot be demonstrated without overreaching the concept, then **HOLD the V package**; the sponsor at 013-H must either approve a clearly disclosed **noncorrecting synthetic candidate** (and recorded P-05 usability risk), or reopen the affected canonical scope/mapping to resolve authority. Do **not** silently merge protected V into O or claim the whole MVP includes correction when none was verified.

Guest/private capability recommendation is **synthetic nonprod only**: accepted testers acquire bounded private test principals through an independently secured dev viewer/tester broker; voluntary future cross-device recovery/account linking is not required for a synthetic MVP, and compulsory production identity registration remains unapproved. R-P02 real eligibility/consent and R-P03 material release approvals are entirely outside this technical mapping.

## G03 — Delivery roadmap ownership and critical path

The detailed **single delivery-owner plan** is the existing [MVP roadmap](mvp-roadmap.md), updated with package identifiers, gating/dependency paths and independent phase exit criteria in this PR. This 013-G record owns the *architectural selection and risk decision*, not another duplicated phase-specification corpus.

**Critical path:** 013-H evidence/authorization → 014-A inventory and allowed environment controls → 014-B protected CI/IaC → 014-C private synthetic dev edge/API baseline → 014-D synthetic observability/negative controls → 015-A private principal/entitlement contract → 015-B typed evidence/history/attempt representation → 015-C secured API and state → 016-A/B core reporting/inspection → 016-C optional coverage/closure → 016-D properly authorized revision tranche if approved → 017 fault/accessibility/security/recovery → 018 independent sealed candidate qualification. Each boundary has a separately reviewable PR, acceptance evidence and explicit stop conditions. Public production and data intake never run automatically from 018.

Parallelism is limited: architecture-only 015-A domain/access test contracts can be drafted while 014 resources are built **after independent authorization**, but 015-C live state wiring depends on proven isolated dev IAM/API. 016 UI mockups may be developed with synthetic fixtures while auth/contract architecture matures, but production-like integration cannot outrun authorization. Holdouts/independent verifier artifacts are not supplied to the implementing agent.

No fixed calendar, sprint velocity or false guarantee of shipping before a Halloween date is asserted.

## G04 — Residual risk/decision register and actual blocking evidence

| ID / severity | Unresolved risk or choice | Selected response / independent evidence before corresponding authorization |
|---|---|---|
| **G-01 HIGH** | AWS account, organization, region, DNS/hosted-zone, API/CloudFront certificate control unknown | Owner-approved non-secret inventory of exact accessible accounts/zone/NS/SOA, allowed regions, aliases and rollback; no DNS/cloud resource deployment until verified. If production unknown, 013-H may allow *only* bounded local/documentary work |
| **G-02 HIGH** | Sponsor has not approved total cost or AWS plan selection; 013-D toy totals excluded WAF/identity/log/backup | Full **REST API + regional WAF** dev/prod S0–S3 AWS Pricing Calculator scenarios and comparison to HTTP/CloudFront, real limits, chosen idle/seasonal spend ceiling, signed human financial owner, alarm recipient and incident procedure. Prior <$50/$150 figures remain **unapproved hypotheses**, not approved budget |
| **G-03 HIGH** | Private dev frontend/API broker and guest capability not implemented/tested; forged identities or leaked cookies | Minimal dev viewer/auth broker threat model, revocation/expiry/guest recovery, encrypted/scoped secrets, explicit tester allowlist, cross-tenant/prod denial and negative tests before use |
| **G-04 HIGH** | Genuine participant eligibility, privacy/guardian/household rights and disclosure not approved | Hard **R-P02 real collection/processing deny** and **R-P03 release deny** remain. Synthetic candidate and public static shell do not discharge these decisions |
| **G-05 HIGH** | Correction authority and P-05 usability tension; 013-E no silent count edit | Sponsor accepts minimal protected V tranche **only with legitimate correction entitlement test** or explicitly accepts noncorrecting candidate limitation; otherwise HOLD scope at 013-H |
| **G-06 HIGH** | API direct-origin and abuse spend from 013-D | **REST API stage-attached regional AWS WAFv2 selected** for design; confirm plan/region/permissions and regression on custom/execute-api hostname, malformed requests, per-user limits, WAF counts, direct-origin burst, concurrency and kill switch. WAF is not an absolute cost ceiling |
| **G-07 HIGH** | GitHub rulesets, reviewers, environments, OIDC roles, CI and holdouts not independently verified | Actual ruleset/branch protection/reviewer eligibility and workflow permission inventory; negative tests denying untrusted PR→AWS role; protected dev deploy, independent CI; production human approval enforced or production HOLD |
| **G-08 MEDIUM** | Backup/recovery, retention and count/history semantics unresolved | 015 data lifecycle with expiry/provenance; 017 RPO/RTO/restore evidence without silent falsification, no production personal data while policy absent |
| **G-09 MEDIUM** | CDN plan fee/features vs API WAF and developer auth broker; undercounted operational spend | Validate free/Pro/PAYG eligibility, same-feature comparisons, secrets/email/log/storage expenses, rate caps and month-long idle cost in both accounts |
| **G-10 MEDIUM** | MCP/controller authority creep or hidden-evaluation leakage | Small CI/CLI-first synthetic adapter; no generic shell/SQL, no production credentials, dev run-scoped metrics and evidence, held-out evaluator permissions |
| **G-11 MEDIUM** | Architecture choices may not preserve close, uncertainty and time/group meaning | [013-E E-T01–E-T22](013-e-concept-to-mvp-realization.md) plus reviewer-controlled varied cases, trace exact SHA/provenance, fail closed on misleading zero or unknown outcome |

**No unresolved HIGH item is declared verified/resolved simply because this document chooses a countermeasure.** 013-H must differentiate what is needed to authorize a *specific local-only design/setup task*, a dev resource deployment, production shell deployment, or real participant activity. Some future-operation-only gates may remain unresolved while explicitly isolated synthetic dev work proceeds **only after** actual dev budget/access/verification approvals; production activity is never implied.

## G05 — 013-H independent authorization package

Required evidence available for review:
1. This 013-G decision record, [Phase 013 roadmap](mvp-roadmap.md), earlier 013-B–F owners and unchanged canonical design; exact merged commit and required checks.
2. A **decision log** for sponsor accepting or revising: REST API/WAF security-cost premium, two-account preference or explicit dev-only exception, scoped synthetic guest option, protected minimal V amendment or transparent deferral, and owner-approved cost ceilings.
3. AWS non-secret discovery from authorized owner: account/organization arrangement, Region, Route 53 zone control or explicit hold, ACM constraints, IAM principals, GitHub environments and review feasibility. **Do not put AWS account IDs or secret values in public docs.**
4. Actual account/region/feature-based **full cost estimate**, separate dev/prod and shared fees, including WAF REST stage, CloudFront plan/PAYG, Cognito/tester admission, logging/backup, S3, API/Lambda/DDB, monitoring, incident/abuse scenarios; monitoring and stop actions with humans named outside public repo.
5. Architecture denial evidence **or bounded explicit pre-deployment controls-to-test**: signed/other dev viewer gate, independent API auth, per-item owner binding, prod/dev separation, direct API stage WAF, no user-data collection/public availability, dedicated OIDC role, production deploy blocked. Claims about AWS enforcement cannot be marked tested before resources exist.
6. Bounded **014-A first authorization proposal** with exact artifacts, allowed credential surfaces (ideally read-only/nonsecret discovery), costs (ideally zero), PR reviewer, independent exit and stop conditions; subsequent AWS-write packages independently authorized at their gates.

**013-H must issue one of:** `HOLD` with evidence gaps; `LIMITED APPROVAL` for explicitly named discovery/locally verified or synthetic dev packages with spending limits and deny conditions; or `APPROVE SPECIFIED DEVELOPMENT SCOPE` only when the relevant controls and resource budget exist. **No blanket "implement everything" approval.** A successful merge of this PR only permits the 013-H review to begin.

## G06 — Phase exit scope

**013-G RESULT: SELECTED A COHERENT CONDITIONAL AWS ARCHITECTURE, RESOLVED DIRECT API WAF BY DESIGN CHOICE, CREATED A DEPENDENCY ORDER AND ARTICULATED IDENTITY/CORRECTION CANDIDATES; OVERALL IMPLEMENTATION AUTHORIZATION REMAINS UNGRANTED. 013-H NEXT ELIGIBLE AFTER THIS PR MERGES.**

Verification in this phase is *documentary link/diff consistency only*: no direct AWS or GitHub privilege evidence, real account estimates, code verification, independent usability testing, data policy approval, resource creation or live-site availability checks. Fail 013-H if a claimed precondition lacks evidence; retain a source-linked residual register rather than modifying canonical behavior opportunistically.
