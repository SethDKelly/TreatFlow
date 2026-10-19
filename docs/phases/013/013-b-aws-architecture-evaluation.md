---
type: Engineering Architecture Evaluation
title: TreatFlow 013-B — AWS Architecture Alternatives, Security Boundaries and Initial Platform Selection
description: Evidence-calibrated initial AWS platform recommendation, alternatives, threat boundaries, environment posture and decisions deferred to 013-C–G.
tags: [treatflow, phase-013, aws, architecture, serverless, security, cost, adr]
sources:
  - id: aws-cloudfront-oac
    resource: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html
    title: Amazon CloudFront — Restrict access to an S3 origin
  - id: aws-private-viewer-content
    resource: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-cookies.html
    title: Amazon CloudFront — Signed cookies
  - id: aws-api-jwt
    resource: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-jwt-authorizer.html
    title: API Gateway HTTP API — JWT authorizers
  - id: aws-api-default-endpoint
    resource: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-disable-default-endpoint.html
    title: API Gateway — Disable the default endpoint
  - id: aws-dynamodb-on-demand
    resource: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/on-demand-capacity-mode.html
    title: DynamoDB on-demand capacity
  - id: aws-cloudfront-cert
    resource: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html
    title: CloudFront — Certificate requirements
  - id: aws-route53
    resource: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-routing-traffic-for-subdomains.html
    title: Route 53 — Routing for subdomains
  - id: aws-pricing
    resource: https://aws.amazon.com/aws-cost-management/aws-pricing-calculator/
    title: AWS Pricing Calculator
---

# 013-B — AWS Architecture Alternatives, Security Boundaries & Initial Platform Selection

## Baseline, constraints and disposition

**013-B RECOMMENDATION COMPLETE FOR DESIGN REVIEW — PREFERRED CONDITIONAL PLATFORM, NOT AN IMPLEMENTATION AUTHORIZATION.** Verified start source: `main` merge `3244ff6b9ab99eaa0304ef016ab1eb641cf51e02`, containing [013-A](013-a-start-gate.md). [013 phase definition](phase-definition.md) provides sponsor constraints; [012-E](../012/012-e-treatflow-handoff.md) and [current canonical purpose](../../canonical/purpose/purposes.md) define six residual safety obligations and observation-first MVP fidelity.

AWS only; inexpensive for low/seasonal usage; production website publicly reachable via a dedicated name under available SkellyHouse DNS; private **access-controlled** nonproduction; no production participant-data operation without independent R-P02 decision and no public observational disclosure without R-P03 decision. A public HTML shell is not permission to collect identifiable observations. 013-B assesses alternatives, not deploys AWS resources, changes DNS, selects a final legal/privacy policy or grants agents implementation authority.

**Preferred conditional stack:** static frontend built to assets stored in **private S3 REST origin** + CloudFront OAC; API Gateway **HTTP API with JWT authorizer** + Lambda; **DynamoDB on-demand** persistent records; **Cognito user pool candidate** for managed sign-in with per-environment identity isolation; Route 53 + ACM TLS; IaC after 013-C tool choice; AWS Budgets, bounded API rates, Lambda reserved concurrency, DynamoDB maximum throughput and redacted logs. This is a cohesive cost-conscious starting point, pending 013-C–G qualification and independent 013-H authorization.

## 1. Alternatives and decision rationale

| Concern | Preferred candidate | Alternatives reviewed | Decision basis / what could overturn |
|---|---|---|---|
| Static frontend | Private S3 REST origin + CloudFront OAC, static SPA or static-first client | AWS Amplify Hosting; container-served frontend or SSR | Assets are cacheable and low-idle-cost without always-on server. Prefer Amplify if build/branch-preview simplicity outweighs its operational and pricing coupling; SSR only if concrete MVP requirements make static assets insufficient. OAC protects **origin**, not viewers. |
| Dynamic API | API Gateway **HTTP API** + Lambda | API Gateway REST API; direct Lambda Function URL; ECS/Fargate/ALB or App Runner | Managed JWT admission, routes and observability without a custom public Lambda URL auth surface or always-on container. REST API if indispensable features are proven absent from HTTP API; Function URL only if equivalent identity, throttling, bypass prevention and protection are demonstrated. |
| Persistent state | DynamoDB on-demand | S3 JSON/object-as-primary-store; Aurora Serverless/Postgres | Request-based charges and conditional/transactional item operations are promising for small user-owned observations. S3 is **for assets**, not presumed suitable for concurrent editable personal records. Reconsider relational DB if querying/relational constraints or history requirements render DynamoDB awkward or error-prone. Validate access patterns before schema design. |
| Identity | Cognito user pool + OAuth authorization code with PKCE, subject to 013-E identity semantics | External managed OIDC; hand-built user/email verification/auth | Avoid homegrown passwords/sessions. Assess Cognito Lite vs Essentials features and MAU/email costs; Cognito identity alone does **not** prove legitimate contributor/guardian/household rights. Externally managed OIDC is acceptable if cost/security and account boundaries improve. |
| API topology | Dedicated API Gateway custom domain per environment, separate from static-host distribution | CloudFront `/api/*` behavior to API origin | Fewer origin/cache forwarding mistakes initially. Custom API domain still has publicly routable ingress: protect routes; disable default `execute-api` endpoint to remove easy alternate path. A single-domain CF design may be reconsidered if secure origin/auth/cost case is demonstrated. |
| Hosting model | Serverless managed services | Single VM, container orchestration | Low/seasonal traffic favors pay-for-use; revisitable if sustained traffic or extreme access patterns change TCO. |
| Provisioning | Declarative, reviewable IaC in a dedicated engineering package | Manual console click-ops | Require deterministic environments, drift checking and constrained deploy roles. CDK vs Terraform vs CloudFormation remains 013-C/F decision, not locked here. |

No service is selected solely because it is labeled “serverless.” The Phase 013-D evidence must compare idle, Halloween peak and hostile traffic and account for CloudFront, WAF, auth, logging, DNS, snapshots/backups and incident obligations.

## 2. Logical topology (two independent environment trust domains)

`Production public visitor → HTTPS/CloudFront → private S3 OAC → static site`.

`Production eligible authenticated client → HTTPS API Gateway custom domain → JWT authorizer → Lambda owner/permission checks → isolated DynamoDB`.

`Nonproduction explicitly authorized tester → **viewer-side gate** → separate CloudFront → private dev S3`; its API independently checks a **dev-issued identity and allowlisted tester entitlement** before dev Lambda and **synthetic-only DynamoDB**. No nonprod-to-prod data copies, shared secrets, wildcard user pools or cross-environment write permissions.

Candidate hostnames, **NOT VERIFIED DNS CONFIGURATION**:

| Zone authority proven in 013-C | Production web | Nonproduction web | Possible dedicated API hosts |
|---|---|---|---|
| `skellyhouse.com` public zone controlled | `treatflow.skellyhouse.com` | `treatflow-dev.skellyhouse.com` | `api.treatflow.skellyhouse.com`, `api.treatflow-dev.skellyhouse.com` |
| Only properly delegated `www.skellyhouse.com` zone controlled | `treatflow.www.skellyhouse.com` | `treatflow-dev.www.skellyhouse.com` | `api.treatflow.www.skellyhouse.com`, `api.treatflow-dev.www.skellyhouse.com` |

A record for `www.skellyhouse.com` by itself **does not establish** control over `skellyhouse.com` or imply a separately delegated `www` hosted zone. Verify NS/SOA, account and existing DNS records before requesting names or ACM validation. Route 53 aliases can target CloudFront; CloudFront viewer-side ACM certs must reside in `us-east-1`; API Gateway regional custom-domain certificate placement must be qualified separately in 013-C. Do not assume wildcard TLS or public DNS can itself provide private access.

## 3. Trust boundaries / threat obligations

| Boundary | Default stance and required negative check |
|---|---|
| Internet → production static distribution | CloudFront may serve reviewed public UI files. S3 origin has public access blocked and resource policy restricted to intended distribution via OAC. **A 200 HTML response does not imply authorization to store or publish a report.** |
| Internet → nonproduction static distribution | Viewer-side authentication/access restriction is mandatory; **OAC alone is insufficient** because CloudFront can still serve files publicly. Evaluate signed cookies with controlled, short-lived issuance to approved testers, or an equivalent OIDC edge gate. Signed cookies require a secure issuer, key management, session/cookie expiration and revocation strategy; IP allowlisting is an alternative only where a stable allowlisted source is operationally realistic. Fail closed if gate incomplete. |
| Browser → either API | HTTPS, explicit JWT issuer/audience/scopes and per-env identity, strict body/type validation, authorization denial by default, restricted CORS (not authorization), CSRF/token-handling design per chosen client/session pattern; no public write endpoints. API Gateway JWT validity alone does not establish record ownership. Prefer access tokens with route scopes where supported. |
| API endpoint bypass | Disable default API Gateway `execute-api` endpoint once a custom domain exists; **custom domain remains network-reachable** and must still enforce authentication and tenant authorization. For dev, separate tester allowlist and least-privilege operations; do not call internet-routable API network-private. |
| Lambda → state | Least-privilege role/environment resources; always derive participant identity from verified claims and look up owner/access scope server-side, never trust a user-supplied owner ID. Test cross-user IDOR and stale/private-read cases. Separate infrastructure and data per environment. |
| Concurrent edits and replay | Conditional writes or transactions where justified; defined action idempotency and authoritative response states. Retry ambiguity must not be falsely presented as exactly-once; preserve original and as-of correction semantics where in MVP scope. |
| State/log/backup → operators | Encrypt in transit/at rest, define retention/deletion/backup and restricted audit before real data; logging redaction, no exact household/time/location data in analytics traces, diagnostic logging gated and minimal. No production dumps imported to dev. |
| AWS credentials → deployment | Prefer role-based short-lived CI/OIDC credentials and independent production approval; avoid committed secrets or direct agent production write privileges. Lock region/accounts, resource names and policy review in 013-C/F. |
| R/D disclosure ↔ collection | No automatic research provision/public data export. R-P02 blocks real collection/processing until separately approved; R-P03 blocks external material release until assessed and authorized; nonprod synthetic fixtures are not evidence that those approvals exist. |

**Interpretation of “private nonproduction”:** this recommendation provides **access-restricted, invite-only** development using internet-routable managed services. It does **not** promise an unreachable-from-internet private network. If the requirement is strict network isolation, evaluate private API/VPC access and endpoint/VPN costs in 013-C before choosing the design.

## 4. Cost, scaling, and operating consequences for 013-D

- Model **idle**, **seasonal peak** and **abuse/spike** scenarios separately; include dev and prod resources, regional charges, DNS hosted-zone fees, TLS, CloudFront plan option, WAF/edge restrictions, authentication MAUs/email delivery, CloudWatch logging, backups and DynamoDB storage/read/write.
- Compare CloudFront **pay-as-you-go** to the newer flat-rate website delivery/security plans. Do **not** assume a plan includes every service/origin requirement or that Free Tier/credits are permanent. Source: https://aws.amazon.com/about-aws/whats-new/2025/11/aws-flat-rate-pricing-plans/.
- API Gateway request throttling + Lambda reserved concurrency + bounded DynamoDB on-demand throughput are complementary controls. Maximum on-demand throughput is a **best-effort target, not a strict monetary cap**; budgets notify after spend or forecasting and may have lag. Source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/on-demand-capacity-mode-max-throughput.html.
- Evaluate edge WAF cost/safety benefits rather than treating it as free. Auth endpoint abuse and passwordless-email delivery can cost more than storage at small scale. Set resource and log retention limits with incident needs.
- No credible USD monthly estimate without region, expected active users, API operations/report, data volume, retention, dev gating choice, WAF and observed expected peaks. Phase 013-D must produce assumption-backed calculator scenarios and sponsor-accepted budget before final platform selection.

## 5. Architecture consequences for canonical observation success

1. Static website plus login does not compromise O's independently sufficient `Establish → Report → Inspect/InspectAfterClose` promise; S/V/R/D remain optionally composed, not authentication feature modules.
2. Personal review reads only legitimately entitled records. Authentication is **technical proof of a principal**, not household source authority or protected organizational decision. Protected R-P02 and R-P03 remain separate.
3. Record model and API must distinguish **person counts from grouped arrivals**, near-present/interval assertion, monitored exposure from unknown time and closed/private-review history. Never infer event series or Poisson process from bounded totals.
4. Report success vs rejection vs unknown must be modeled and verified at the client/server boundary. Durable provenance/revision constraints (R-P05/R-P06) need bounded choices during 013-E.
5. No authenticated API response or personal observations are publicly cacheable by default; if later CF API routing is chosen, explicitly disable personalized caching and review forwarded auth/cookies and `Cache-Control` policies.
6. User interface rendering or feature flags must not secretly enable live intake absent real-data eligibility/privacy approval.

## 6. Scenario-based architecture review (required future evidence)

| Case | Expected system result |
|---|---|
| Unauthenticated API request | Denied; no record exists |
| Authenticated user requests different user's record | Denied without information leakage |
| User signed into prod attempts dev endpoint, or dev user attempts prod | Denied: environment-specific issuer/audience/allowlist |
| Anonymous request to private dev frontend and origin bucket | Both denied; asset cannot be fetched via S3 bypass |
| Signed dev cookie expires or signing credentials compromised | Expiry honored; documented recovery/key rotation; deny when gate invalid |
| Direct `execute-api` endpoint used after custom-domain setup | Not usable as alternate unprotected route |
| Unexpected duplicate report/retry | Reconciled authoritative outcome; no fabricated exactly-once guarantee |
| Attempt to store participant identity or share personal data before authorization | Blocked by operational gate, not merely hidden behind UI |
| Request burst/abuse/OTP flooding | Throttling and budget alerts; bounded failure, no unpredictable silent spend assumptions |
| Public CloudFront site requests signed-in observation through CDN | Only authenticated API request can return legitimately entitled record; not cached as public content |
| Time/group/coverage semantic mismatch | Validation failure and explicit feedback, not coerced into precise measurements |

## 7. Decision, alternatives not adopted, open obligations

**013-B DECISION: PREFERRED CONDITIONAL AWS PLATFORM SELECTED FOR FURTHER DESIGN REVIEW; NOT FINAL ARCHITECTURE APPROVAL.** S3/CloudFront, HTTP API/Lambda, DynamoDB and managed Cognito are the starting ADR candidates. Container hosting, static object persistence for mutable observations, public Lambda URLs and unguarded dev preview are **not initial recommendations**. A final choice requires documented comparison and acceptance in [013-G](phase-definition.md), with explicit implementation authorization in 013-H.

**013-C must resolve:** DNS/apex-vs-www authority and collisions; region; ACM names; isolation level; signed-cookie/OIDC/nonprod viewer gate including issuer/rotation/revocation and access bootstrap; API bypass/direct domain; deployment/trust and IaC choice. **013-D:** actual pricing scenarios, budgets, throttle and failure/cost thresholds, log/backup/WAF cost. **013-E:** entitled participant identity, observation model access patterns, correction/recovery states, MVP deferrals, Cognito tier/features. **013-F:** independent agentic review and nonprod synthetic test-control gate. **013-G:** accepted ADR(s), detailed topology and actionable package sequence. **013-H:** independent approval or HOLD for bounded implementation; real data collection/disclosure remain separate protected approvals.

**Exit classification:** 013-B **PASS FOR CONDITIONAL ARCHITECTURE RECOMMENDATION / 013-C NEXT ELIGIBLE AFTER MERGE**. No application code, AWS infrastructure, DNS updates, real data operations or deployment undertaken; no hidden approval.
