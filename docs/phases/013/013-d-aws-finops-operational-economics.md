---
type: Engineering FinOps and Operational Evaluation
title: TreatFlow 013-D — AWS FinOps, Operational Requirements, Scaling and Abuse Economics
description: Assumption-led AWS unit economics and scenarios, seasonal capacity targets, denial-first abuse controls, operating/financial guardrails and evidence required for architecture selection.
tags: [treatflow, phase-013, aws, finops, operations, cost, performance, availability, abuse, evaluation]
sources:
  - id: aws-cf-pricing-2026
    resource: https://aws.amazon.com/cloudfront/pricing/
    title: Amazon CloudFront — Flat-rate and usage-based pricing
  - id: aws-cf-plan-limits
    resource: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html
    title: CloudFront — Flat-rate allowances, constraints, coverage and exclusions
  - id: aws-cf-plan-automation
    resource: https://aws.amazon.com/about-aws/whats-new/2026/09/cloudfront-flat-rate-pricing-plans-api/
    title: CloudFront — Flat-rate plan API and infrastructure-as-code support, September 2026
  - id: aws-api-pricing
    resource: https://aws.amazon.com/api-gateway/pricing/
    title: API Gateway — HTTP API request pricing
  - id: aws-lambda-pricing
    resource: https://aws.amazon.com/lambda/pricing/
    title: AWS Lambda — Requests and GB-second pricing
  - id: aws-ddb-pricing
    resource: https://aws.amazon.com/dynamodb/pricing/
    title: Amazon DynamoDB — On-demand pricing and examples
  - id: aws-cognito-pricing
    resource: https://aws.amazon.com/cognito/pricing/
    title: Amazon Cognito — Lite, Essentials, Plus and MAU pricing
  - id: aws-route53-pricing
    resource: https://aws.amazon.com/route53/pricing/
    title: Route 53 — Hosted-zone and DNS pricing
  - id: aws-waf-pricing
    resource: https://aws.amazon.com/waf/pricing/
    title: AWS WAF — Web ACL, rule and request pricing
  - id: aws-budgets-pricing
    resource: https://aws.amazon.com/aws-cost-management/aws-budgets/pricing/
    title: AWS Budgets — Monitoring and action pricing
  - id: aws-budgets-lag
    resource: https://docs.aws.amazon.com/cost-management/latest/userguide/bcm-lite-use-budget.html
    title: AWS Budgets — Delayed billing and notifications
  - id: aws-http-throttle
    resource: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-throttling.html
    title: API Gateway — HTTP API best-effort throttles
  - id: aws-lambda-concurrency
    resource: https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html
    title: Lambda — Reserved concurrency and disabling invocation
  - id: aws-log-retention
    resource: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html
    title: CloudWatch Logs — Default retention and expiration
  - id: aws-waf-api-support
    resource: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-aws-waf.html
    title: API Gateway — Direct WAF integration for REST APIs
  - id: aws-pricing-calculator
    resource: https://calculator.aws/
    title: AWS Pricing Calculator
---

# 013-D — AWS FinOps, Operational Requirements, Scaling & Abuse Economics

## Authority, observed baseline and decision

**013-D DESIGN PASS WITH UNAPPROVED BUDGET, WORKLOAD AND ORIGIN-SECURITY DEPENDENCIES — pending merge; 013-E next eligible after merge.** Baseline: 013-C merged on main at commit 72bc490a6956f6a242f19578b1c4e0daa784aa7e. [013-B architecture alternatives](013-b-aws-architecture-evaluation.md), [013-C environment/deployment trust](013-c-aws-environment-deployment-trust.md), [013-A sponsor constraints](013-a-start-gate.md), and [012-E safety obligations](../012/012-e-treatflow-handoff.md) control this work.

**Not verified:** AWS account plan eligibility, actual AWS Region, billing configuration, DNS ownership, peak user demand, API/database access patterns, real AWS prices quoted into an account, or sponsor's dollar ceiling. No price quote, budget, AWS resource, system, real data, uptime test, DNS or configuration is claimed deployed or approved. This phase states **illustrative assumptions and transparent partial calculations**, not the actual total bill. Before 013-G/H, choose exact Region/plan/features and produce an exportable AWS Pricing Calculator estimate with assumptions, exclusions and owner acceptance.

The MVP candidate remains synthetic-only in private nonproduction; public production is a **website availability objective**, not permission for real-person data intake (R-P02) or external observation disclosure (R-P03). Protection and data meaning may not be weakened for cost reduction.

## D01 — Cost-accounting boundary and workload register

Cost boundaries to model **separately, then sum without double counting**: production CloudFront/distribution + private S3 origin; dev CloudFront + restricted-viewer gate and dev S3; attached/shared Route 53 zone and certs; each API Gateway, Lambda, DynamoDB table/index/backup, Cognito user pool and its email/SMS; CloudWatch Lambda/API logs and alarms; CloudTrail/security audit; AWS WAF/rate controls; secrets/KMS; IaC/CI artifacts; budgets; any support, taxes, data transfer and incident-response costs.

- **Two accounts preferred** as 013-C security boundary, **not** two unrelated projects. Use application/environment/cost-center tags, linked-account dimension, measured request units, edge distribution ID and workload labels. Parent/shared-DNS zone fees and any plan coverage must be counted **once**.
- Charge allocation may be complicated when Route 53 hosted zone and CloudFront distribution are in different accounts; do not assume a zone shared across accounts is automatically eligible to attach to a distribution's bundled DNS coverage.
- Seasonal Halloween period includes the days leading up to October 31, the main evening's **minute-by-minute** peak, and the post-evening review/correction period. Monthly total requests alone cannot specify required burst capacity.
- Model absolute synthetic records and **authenticated interactive users**, not imaginary representative observer enrollment. Purpose remains entitled personal reporting/review, never automatic public sharing.
- Document S3 asset volume, average transfer bytes, API calls per user and per report, Lambda duration/memory, read vs write units per record (including retries and index costs), active auth principals, emails/OTP, retention days and number of custom domains/alarms.
- **No NAT Gateway, provisioned database, always-on container, provisioned concurrency, advanced security subscriptions or dedicated KMS key by default** absent a documented requirement and cost acceptance. These services can add persistent monthly overhead to a nominally serverless MVP. Verify network reachability and secret access if later introducing VPC Lambda.

## D02 — Price facts and option constraints (checked from AWS public pages, October 2026)

| Service | Public reference points; **not a full estimate** | Decision consequence |
|---|---|---|
| **CloudFront flat-rate plans, per distribution** | Free: **$0/month**, ~**1 million requests / 100 GB** allowance, limited security/features; Pro: **$15/month**, **10 million requests / 50 TB** allowance, including additional logging/rules; higher plans available. Flat plans include some CloudFront, AWS WAF/DDoS, Route 53, TLS, logs and S3 storage credit **only to the extent plan terms and associations allow**. | Compare Free for low-volume restricted dev and Pro for production seasonal peak. **AWS Free Tier account use may make a flat plan ineligible**; confirm account eligibility, plan availability, supported viewer gating/features, DNS sharing and allowed config before counting included value. |
| **CloudFront PAYG instead of plan** | Usage-based CDN requests/data transfer, with WAF/DNS/logs separately when applicable. | Explicit alternate cost baseline under identical load and controls; no claim a flat plan is always cheaper. Flat-plan allowances do **not** represent an unlimited performance promise; persistent excess may produce delivery adjustments despite no overages for **included** services. |
| **HTTP API / Lambda** | AWS's US East examples show roughly **$1 per 1M HTTP API requests** within first 300M, **$0.20 per 1M Lambda requests**, **$0.0000166667 / GB-second** for usual on-demand Lambda duration before eligible free-tier credits; payload/transfer, extra features or other regions can differ. | API Gateway, Lambda, and downstream persistence are **outside** a static CloudFront flat fee. Avoid making a CDN-spending promise stand for a complete back-end cap. |
| **DynamoDB Standard on-demand** | AWS example: **$0.625 / million write request units** and **$0.125 / million read request units** (illustrative US East price); storage, indexes, backup/PITR, streams, transactions and larger items can add charges. | Derive actual RRUs/WRUs from 013-E data/access patterns; on-demand is not cost-free, and max-throughput/quotas are **not hard dollar budgets**. |
| **Cognito** | Lite/Essentials have a direct/social sign-in free tier of **10,000 MAUs/month** (subject to account/Organization eligibility); separately federated SAML/OIDC identities use a **50 MAU** free threshold. Email/SMS, higher feature plans and machine credentials may be extra. | Login abuse, email deliveries and selected Cognito tier can matter as much as API invocations. Verify 2026 eligibility and tier for exact nonprod/public signup flow; no unbounded email/SMS. |
| **Route 53** | Standard public hosted zone starts at **$0.50/month** for first 25 zones if not plan-covered. | Reuse authorized SkellyHouse zone; **do not** create separate hosted zones merely to obtain subdomains. DNS query and zone attachment treatment must be reviewed. |
| **Standalone AWS WAF** | Public example pricing: **$5/month** per Web ACL, **$1/month** per rule, **$0.60/million requests** before managed/special features. | Direct API protection outside a qualifying CloudFront plan may incur standalone WAF cost, and HTTP API direct WAF integration differs from REST API. Do not assume the public site's WAF covers a separately exposed API. |
| **AWS Budgets / monitoring** | Budget alert monitoring is free; first two action-enabled budgets are free, more have charges. Budget billing notifications can lag; CloudWatch Logs can retain data indefinitely by default. | Budgets **alert**; they are **not a hard spending stop**. Set explicit log retention, alarm count and owner/response workflow; budget actions must be deliberately scoped and cannot be treated as an immediate kill switch. |

September 2026 brought programmatic API/IaC management of CloudFront flat-rate subscriptions. Paid-plan activation may require a distinct approval step; this fits the protected-production deployment model rather than permitting auto-buy by an agent. Sources are listed in document frontmatter and require recheck at 013-G pricing freeze.

**Flat-plan cautions:** Free plan does not include every feature offered on Pro, including standard access logging in pricing comparisons; plan coverage is specific to attached resources and CloudFront-related logs, not arbitrary API/Lambda app logs, Lambda@Edge charges, CloudWatch storage/query, secrets, SNS/SES, Cognito, or DynamoDB. No double-billing assumptions: verify exactly which costs are covered by a plan *and which are not* using account-side evidence.

## D03 — Four transparent demand scenarios (hypotheses only)

These are **illustrative thought experiments to challenge the architecture**, not user demand estimates or authorized workloads. Values are **per month for an evaluated environment**; product tests use synthetic identities/records. Edge and API requests are separate counts; if APIs later route through CloudFront, count those requests at the edge too and **reconcile, never double charge**.

| Scenario | CDN requests / transfer | HTTP API calls | DB writes / reads (units assumed 1 each) | Synthetic active users | Illustrative burst RPS (API) | Interpretation |
|---|---|---|---|---|---|---|
| S0 — idle / public shell | 10,000 / 0.25 GB | 1,000 | 1,000 / 2,000 | 10 | 2 | Small dev test and site orientation; prod real-data intake remains blocked |
| S1 — ordinary pilot simulation | 250,000 / 10 GB | 100,000 | 30,000 / 100,000 | 200 | 20 | Exploratory synthetic reporting, retries, private review |
| S2 — Halloween peak simulation | 6,000,000 / 75 GB | 2,000,000 | 300,000 / 1,000,000 | 10,000 | 300 | Strong seasonal stress case; CloudFront Free **exceeds** 1M-request allowance; Pro's 10M-request allowance is plausible *if eligible* |
| S3 — adversarial exposure | 60,000,000 incoming edge requests / 1 TB attempted; APIs may be separately attacked | Up to 10,000,000 API calls *if edge/API guards fail* | 1,000,000 / 5,000,000 | n/a | 2,000 | **Loss scenario**, not a desired capacity target; model both 99% edge blocked and 0% edge blocked, plus API direct-bypass traffic |

**Illustrative monthly partial variable-cost equation**, for a US-East-like price example **without free-tier credits** and at **256 MiB memory × 200 ms billed duration per Lambda request**, one API call invoking one Lambda, single-unit DDB operations, no retried operations or storage:

\`HTTP_requests / 1,000,000 × $1 + Lambda_requests / 1,000,000 × $0.20 + Lambda_requests × 0.256 GB × 0.2 s × $0.0000166667/GB-s + DDB_WRUs / 1,000,000 × $0.625 + DDB_RRUs / 1,000,000 × $0.125\`.

| Scenario | **Partial** HTTP API + Lambda + DDB read/write cost only | Deliberately excluded |
|---|---:|---|
| S0 | **~$0.003** | CDN plan/PAYG, DNS, S3/storage, auth, logs, alarms, backups, WAF, data transfer, taxes |
| S1 | **~$0.24** | Same excluded costs |
| S2 | **~$4.42** | Same excluded costs; may dwarf compute bill |
| S3 | **~$21.78** | Same excluded costs **and** effective security edge/identity/notification damages |

These tiny partial totals are **not estimates of an actual AWS monthly bill**. They demonstrate that application/API invocations under a favorable toy load may be small while access protection, fixed plan fees, monitoring, backups, heavy/failed queries, request-volume amplification, bot challenges and auth delivery dominate. DynamoDB transactional/strongly consistent reads, item sizes and required indexes change request units. AWS Free Tier/credit entitlement and CloudFront plan account eligibility must be verified, not assumed.

**Sensitivity cases required before 013-G:** (a) Lambda duration 200 ms → 2 seconds, and memory 256 → 1024 MiB; (b) reads/writes ×10 from full history and repeated requests; (c) 1M, 10M and 100M edge requests; (d) 1,000 vs 50,000 MAUs and sign-up email/SMS amplification; (e) WAF request protection before and after origin; (f) 7-day vs 30-day log retention and noisy debug logging; (g) both two-account and exception single-account deployments; (h) CloudFront Free, Pro, and usage-based equivalents with exact same features.

## D04 — Crucial API/WAF bypass finding requiring reconciliation

**Architecture-level economic/security gap to close:** 013-B/C recommended a separate **direct API Gateway HTTP API custom hostname**, while a CloudFront flat plan's included WAF applies to the **CloudFront distribution**, not arbitrary requests sent directly to that API hostname. AWS documents **direct WAF association with API Gateway REST APIs**, not an equivalent direct WAF association for HTTP APIs. Therefore **do not claim CloudFront WAF protects the original dedicated HTTP API**. Requests that bypass CloudFront may still cost API Gateway/Lambda/auth and reach throttles even if the public site's CDN delivery is flat-rate.

Evaluate explicitly before 013-G:
- **Option A:** Route API traffic through a **separate secured CloudFront API distribution** with WAF protections, JWT/record-level checks, no authenticated-response caching, and reviewed origins. Account for a *second CloudFront plan/distribution*, cost and operational complexity. API Gateway's native public custom/default endpoints remain bypass candidates. A forwarded fixed secret/header without origin-side enforcement is not sufficient; assess whether an enforceable origin restriction exists and test direct API requests.
- **Option B:** Serve API requests via a carefully designed **same CloudFront distribution** with \`/api/*\` behaviors (and independent JWT auth), **only** if chosen plan's behavior/origin limits, auth header/cookie forwarding, path routing, disable-cache semantics and direct-origin bypass are independently validated. May reduce distribution subscription count but adds routing and mistake risk. Revisit 013-B/C's separate-domain preference if this option is selected.
- **Option C:** Keep the dedicated public HTTP API, with explicit design for best-effort route throttles, app authentication, abuse/rate controls, no email/OTP abuse and measurable bounded damage **without claiming WAF at API Gateway**; alternatively select a REST API if the expense/feature difference justifies direct WAF integration.

**013-G/H HOLD condition:** If no selected variant proves adequate API-origin abuse containment and accepted maximum plausible exposure, public live data and production API activation remain denied. No plan selection is automatic from this review. A CloudFront flat-rate plan removes included edge **overage charges**, not unauthorized direct requests to downstream services.

## D05 — Baseline SLO, reliability, recovery and failure behavior proposals

These are **candidate nonproduction acceptance targets**, not observed benchmarks or unconditional uptime guarantees:

| Dimension | Proposed target to validate | Failure mode / safety meaning |
|---|---|---|
| Reporting latency | Normal synthetic authenticated O.Report p95 ≤ 2s measured at client across declared device/network conditions, with independent cold-start observations | Do not hide unresolved requests as successful when deadline breached |
| Private inspection latency | p95 ≤ 2.5s under ordinary load; cached personal API responses forbidden by default | No cross-user data, no stale incorrectly labeled as-of state |
| Peak capacity | Sustain proposed S2 test profile with scripted microbursts, starting 20 RPS steady and challenging 300 RPS short burst (test target, not production quota) | On throttling 429/503, honest retry/reconciliation; no false duplicate reporting |
| Availability | Monitor distinct user action success, 5xx, 429, cold starts, auth failures and CDN errors; choose a justified monthly SLO and error budget at 013-G | No invented 99.9% SLA or region-failure guarantee |
| Recoverability | Test rollback of last known-good frontend+API independently; documented snapshot/PITR choice, backup retention, RPO/RTO assigned **after** R-P05/R-P06 and budget review | No unsupported no-loss/exactly-once/durable-forever assertions |
| Operational observability | Environment-tagged traffic, error/latency and cost metrics; redacted audit events. Proposed synthetic dev log retention 7–14 days, production candidate 30 days *only if privacy/legal policy justifies it* | CloudWatch defaults can otherwise preserve logs indefinitely; suppress or minimize user/household detail |
| Alert delivery | Human-owned security/cost/on-call contacts, documented acknowledgment and rollback procedure; test alert arrival and action latency | No unattended alert inbox or fake automatic outage prevention |
| Nonproduction posture | Private viewer gate + independently authorized API, synthetic data, bounded session lifetime and emergency revocation | Data/privacy protection not reduced during stress testing |

Explicitly test progressive deterioration under throttling, DB hot partitions, Lambda failures, age-of-cache, delayed auth emails, expired dev signed cookies, region outages (simulation), retry storms and failed deployments. Distinguish functional **feature completeness** from **operational readiness** and public real-person activity. Test accessibility/reduced attention and real-life user usability later only under proper safeguards.

## D06 — Multi-layer abuse economics and controlled degradation

| Abuse vector | Prevent/limit before expensive origin | Backend and operations fallback | Evidence required |
|---|---|---|---|
| Static/CDN traffic spikes | CloudFront plan/PAYG choice, WAF-managed/basic rules, TTL hashed assets, request filtering | Edge response/error metrics and selected plan allowance alerts | Distinguish allowed, blocked and forwarded requests; plan excess doesn't make S3/API free |
| Direct API credential stuffing/record flooding | Origin ingress control choice in D04, auth claim/owner enforcement, endpoint throttles, request body limits | Lambda reserved concurrency, maximum DDB throughput, input quotas, deny suspicious automation | Measure origin billed requests even when denied; API 429 best effort |
| Signup/email/OTP flooding | Disable unapproved public signup; per-identity/IP velocity controls where possible, CAPTCHA only with justified cost/privacy review | Daily sending/service limits, admin kill toggle, alert to human | Show identities, messages and billing counts; no leakage of existence or cost surprise |
| Repeated writes/retries | Client safe backoff, meaningful idempotency keys, conditional write constraints and protected action gates | Confirmed/no-effect/unknown outcome records and reconciliation | No fabricated exactly-once and no multiplication of reports on retry |
| Large payload/scan/query | Strict typed size/time boundaries and access patterns, pagination with user owner scope | Tight execution deadline, capped reads/queries, no unbounded scan | CPU, DDB capacity and response size measured |
| Logging/cardinality attacks | Redact, sample nonessential logs, fixed structured fields, short retention | Alarms on ingestion/egress and cardinality | Never record raw household identity, auth token, private observations |
| Deployment/automation abuse | Protected GitHub environments, least-privilege OIDC, human production approval | Emergency deny deploy role/disable risky paths | Prod modification denied from PR and agent principals |
| Data-exposure incident | Server-side release guard, private storage, no public authenticated cache | Revoke access, halt disclosure, preserve necessary audit without publishing identities | R-P02/R-P03 independent approvals; prior copies not recalled by a new flag |

**Control realities:** API Gateway HTTP API route-stage throttles are **best-effort**, not guaranteed spend ceilings; Lambda reserved concurrency can restrict active execution (setting reserved concurrency to zero can deliberately throttle a function), but invokes rejected earlier can still incur other service charges. DynamoDB throughput maxima and AWS Budgets alone do **not** guarantee a hard dollar ceiling. A failure switch must be independently testable and should prioritize stopping **new writes/releases** while preserving legitimately entitled private read/reconciliation when safely possible. No agent can trigger production kill/restart without authorization.

## D07 — Budget, monitoring and approval contract

**Sponsor approval outstanding:** budget ceiling, alarm recipients, expected seasonal usage, risk tolerance and required protective controls. To drive an initial review (not to approve spend), propose a *planning hypothesis*: combined idle development + static production service costs under **$50/month**; an active seasonal simulation month under **$150/month**; emergency review if projected increase exceeds **2× the accepted seasonal target**. These are **unapproved design targets**, not actual invoices, hard limits or evidence they can be attained; security controls, separate distributions/keys/logging and WAF plan requirements may require raising them rather than weakening access controls.

Operational requirements before authorizing an AWS deployment:
1. Create one **versioned estimate** for each S0/S1/S2/S3 workload and both candidate CloudFront pricing types, using selected AWS Region and actual account plan eligibility; record currency, date, public rate/credits, storage, WAF/broker, backup, logs, emails, API gateway and tax exclusions. Record per-account and total allocations; do not presume 2-account free-tier pooling.
2. Add AWS Budgets for **total/project + dev + prod** and alerts at provisional **50%, 80%, 100% actual** and forecast thresholds, routing to an acknowledged human. Consider AWS Cost Anomaly Detection. Verify whether cost tags and linked-account billing permissions work in the actual Organization.
3. Model separate **technical containment**: CloudFront WAF/edge when relevant, API route bursts, Lambda concurrency, DynamoDB table maximum throughput, auth messaging limits, log group retention/storage alarms, S3 storage/egress, quotas and production release capability. Thresholds follow service stress evidence, not arbitrary numbers copied from scenarios.
4. Require an **emergency procedure** for unexpected cost or abuse (human callout, disable exposed intake / specific API route, set Lambda concurrency 0 when warranted, suspend protected outbound disclosure, disable auth signup/email, verify legitimate pending action status, audit impact). Budget action automation is allowed only after owner-approved test; no claim it stops spend immediately.
5. Require environment-specific baseline security/ops bills in idle state. Avoid repeated manual account fees or costly idle resources if no operational purpose. Enable development session access only for named testers; prefer stopping nonessential test activity off season while preserving essential security updates.
6. Exit gate requires sponsor-approved budget/risk owners, a documented maintenance/incident responder, explicit cost of protecting dev preview, test results for rate and spend guardrails and an independently reviewed production spend exception process.

## D08 — Evidence matrix, unresolved decisions and 013-E handoff

| Question / finding | This phase's disposition | Required next evidence |
|---|---|---|
| CloudFront flat vs PAYG, Free vs Pro | **Comparison defined; not selected.** Plan eligibility/feature and pricing included-value must be checked; account use of AWS Free Tier may affect eligibility. | 013-D→013-G: account-specific AWS Pricing Calculator, plan validation, exact distribution topology |
| Two accounts cost | **Preferred safety boundary retained** | 013-G/H: actual Organization/account owner and incremental monitoring costs accepted |
| Public API bypasses CDN WAF | **New material security/economic architecture gap made explicit** | 013-G/H: choose secured API ingress approach D04, test direct-origin bypass and account for cost |
| Private-dev signed-cookie broker | **Candidate, not built/validated** | 013-E/F/G: token bootstrap threat test, expiration/rotation and cost versus edge OIDC/IP alternatives |
| Capacity target | **Synthetic S0–S3 and preliminary p95/burst proposals only** | 013-E define request graph; 013-F define independent tests; 014/017/018 execute in authorized nonprod |
| Identity and messaging | **Managed Cognito possible; no tier or cost approved** | 013-E choose legitimate participant and tester identity semantics; 013-D/G recalc MAU/SES/SMS |
| Recovery/retention | **No RPO, RTO or private data retention policy invented** | 013-E/R-P05/R-P06 resolve semantics, 013-G select engineering SLO and 014/017 test |
| Human cost and live-operation approval | **Outstanding** | 013-G/H for architecture/budget/operational approvals; R-P02/R-P03 separate real participant-data and disclosure authorization |

**013-D EXIT: DOCUMENTARY PASS WITH FINOPS/OPERATIONAL DESIGN LIMITATIONS; 013-E NEXT ELIGIBLE AFTER THIS PR MERGES.** Phase 013 remains open; architecture selection at 013-G and permission at 013-H require the above external evidence. Independent MVP candidate qualification remains Phase 018. No AWS account, CloudFront subscription, budget, service, token, data processing, DNS entry, deployment or code change has been made by this document.
