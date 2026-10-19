---
type: Engineering Security and Deployment Design
title: TreatFlow 013-C — Environment Isolation, Route 53 DNS, TLS, IAM and Deployment Trust
description: Conditional two-account AWS environment topology, restricted nonproduction viewer access, DNS/TLS authority, least-privilege release controls and blocking verification obligations.
tags: [treatflow, phase-013, aws, environments, dns, tls, iam, security, deployment]
sources:
  - id: aws-accounts
    resource: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_best-practices.html
    title: AWS Organizations — Multi-account best practices
  - id: aws-domain
    resource: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-routing-traffic-for-subdomains.html
    title: Route 53 — Routing traffic for subdomains
  - id: aws-alias
    resource: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-cloudfront-distribution.html
    title: Route 53 — CloudFront alias routing
  - id: aws-acm
    resource: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html
    title: CloudFront — Certificate region requirements
  - id: aws-regional-api
    resource: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-regional-api-custom-domain-create.html
    title: API Gateway — Regional certificate placement
  - id: aws-signed-cookies
    resource: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-cookies.html
    title: CloudFront — Signed cookies
  - id: aws-signed-keygroups
    resource: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html
    title: CloudFront — Key groups and signers
  - id: aws-oac
    resource: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html
    title: CloudFront — Restrict access to S3 origins
  - id: aws-api-default
    resource: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-disable-default-endpoint.html
    title: API Gateway — Disable default HTTP API endpoint
  - id: aws-github-oidc
    resource: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html
    title: IAM — GitHub OIDC trust restriction
---

# 013-C — Environment Isolation, Route 53 DNS, TLS, IAM & Deployment Trust Architecture

## Status and authority

**013-C DOCUMENTARY DESIGN PASS WITH EXTERNAL VERIFICATION DEPENDENCIES, PENDING MERGE.** Source baseline is merged 013-B at main commit 69d696df32c8591f830a7ddfb61e285a3335657e. Read [013-B alternatives](013-b-aws-architecture-evaluation.md), [013-A constraints](013-a-start-gate.md), [Phase 012-E protected handoff](../012/012-e-treatflow-handoff.md) and [current purpose](../../canonical/purpose/purposes.md).

This record designs a deployment trust contract only. **AWS account ownership, hosted-zone authority, domain records, certificates, cost exposure and GitHub environment protection are NOT independently verified. No live infrastructure, DNS record, certificate, AWS credential, CI role, account or access broker was created or modified.** These remain implementation prerequisites to check at 013-G/H and again before authorized 014 execution. Do not treat an intended architecture as a deployed control.

The distinction between a **public website** and permission to collect/process **real household/participant data** remains mandatory. R-P02 requires an independently accountable eligibility/privacy decision before real collection/processing; R-P03 requires separate assessment and authorization before real material disclosure. Production may show a static public shell with intake disabled pending those decisions.

## C01 — Account-level environment isolation

**Preferred design:** separate AWS workload accounts within an existing or newly approved AWS Organization: TreatFlow-nonproduction (synthetic only) and TreatFlow-production (separately approved resources). A shared DNS owner/account can retain the existing Route 53 hosted zone; it is not necessary to create a new hosted zone for every app. AWS Organization ownership and account availability are an unverified prerequisite, not assumed assets.

| Boundary | Nonproduction account | Production account |
|---|---|---|
| Web | Own CloudFront, OAC, private S3 and viewer access gate | Own CloudFront, OAC and private S3; public viewer access |
| API and identity | Own API, Lambda, Cognito candidate, tester allowlist, JWT issuer/audience | Own API, Lambda, Cognito candidate and approved participant access |
| State | Own DynamoDB, synthetic test data, short approved retention | Own DynamoDB and separately approved retention/operations; **no real participant data before R-P02 approval** |
| Access and release | Dedicated limited developer deploy role; no access to production state | Separate restricted deploy role requiring protected review and human approval |
| Secrets/logs | Dev-only signer private key/secrets; redacted logs with explicit retention | Prod-only credentials/secrets; separate redacted logs and retention |
| Cost/security | Separate budget/alerts/limits, cloud audit and cost tags | Separate budget/alerts/limits and independent incident ownership |

Require least-privilege roles, MFA-protected break-glass, no shared admin/API keys, no prod write from dev role, no cross-account S3/DynamoDB data copying, deny nonproduction access to participant records, and environment-specific DNS/cert/identity secrets. Prefer organizational guardrails where owned and available; do not assume organization policy is already configured. Shared global DNS management needs **narrow record-level authority** and an approval path, not full production hosted-zone edit rights for application deploy agents.

**Fallback if AWS Organizations/multiple accounts are not available:** isolated services/roles in one account can support *design evaluation or synthetic-only sandbox preparation after authorization*, but is a weaker isolation boundary. Treat any one-account production deployment as an explicit 013-G/H risk acceptance and signed exception, not a silent equivalence to two accounts.

Account separation can simplify risk attribution, but may increase logging, administration and alert configuration. 013-D must measure those costs; cost efficiency does not override protected production authority.

## C02 — DNS owner, hostnames, and delegation decision

User supplied www.skellyhouse.com as an available Route 53 DNS reference. **The existence of a www record does not prove ownership of a separate www hosted zone, or that this repository can edit the apex zone.** Obtain a human-reviewed DNS inventory before any change:

1. Public authoritative NS/SOA for skellyhouse.com and any delegated www.skellyhouse.com; Route 53 public hosted-zone ID, owner account and exact control permissions, **without publishing account identifiers or credentials in repository evidence**.
2. Existing A/AAAA/CNAME/ALIAS/NS/CAA records for both names, conflicts and currently served www website; keep current website unaffected.
3. Exact approved FQDNs and independent production/nonproduction and API records; verify names do not collide with reserved/subdelegated records.
4. ACM DNS validation path and record ownership; CAA and cross-account validation permissions verified before attempting issuance.
5. Change owner, rollback owner, DNS change window and post-change checks.

| DNS authority actually verified | Public production frontend | Restricted dev frontend | Production API candidate | Dev API candidate |
|---|---|---|---|---|
| skellyhouse.com public hosted zone controllable | treatflow.skellyhouse.com | treatflow-dev.skellyhouse.com | api.treatflow.skellyhouse.com | api.treatflow-dev.skellyhouse.com |
| only properly delegated www.skellyhouse.com zone controllable | treatflow.www.skellyhouse.com | treatflow-dev.www.skellyhouse.com | api.treatflow.www.skellyhouse.com | api.treatflow-dev.www.skellyhouse.com |
| neither zone authority established | **HOLD records** | **HOLD records** | **HOLD records** | **HOLD records** |

Recommend the first row if verified, because names are shorter. The second is a deliberate fallback, not a requirement to buy another domain. A hosted-zone delegation is needed **only if** delegating DNS responsibility; ordinary subdomain A/AAAA ALIAS records can live directly in the authoritative parent zone. Route 53 alias targets CloudFront distribution domains; a CloudFront target in a different AWS account might require entering the distribution hostname rather than selecting a listed resource. No wildcard DNS entries are needed by default.

For CloudFront, associate the **exact** frontend alternate domain names with their respective distributions before creating A and optional AAAA aliases. Deploy changes in DNS/cert/domain sequence, validate DNS and HTTPS, and preserve rollback records. No apex/www-site migration is within scope.

## C03 — TLS, encryption and certificate lifecycle

- Viewer-to-CloudFront: ACM public certificates covering exact names, issued in **us-east-1** for CloudFront. Minimum modern TLS policy, HTTPS redirect/HTTPS-only and managed certificate renewal.
- Browser-to-API Gateway regional custom domain: ACM certificate must exist in the **same Region as the API**, which need not be us-east-1. DNS validation records may be placed in a shared DNS account by an appropriately approved owner.
- Client-to-all-API calls: TLS and precise CORS origin allowlists, not CORS as authorization. No secret, token or participant record in URL query parameters, logs or CDN cache keys.
- S3: private REST origin, public access blocked, CloudFront OAC source distribution restriction; TLS to origin. Do not use public S3 website hosting as a private origin.
- Records: AWS-managed encryption where adequate, dedicated KMS key only if a verified access/rotation requirement warrants cost and operational overhead. Encryption is not a substitute for tenant authorization.
- Define cert issuance/expiry/renewal evidence, configured aliases and domain-ownership checks; test the exact user-facing domain, direct CloudFront hostname, and default API endpoint before any public production release.

## C04 — Private nonproduction admission architecture

**Private means access restricted, not necessarily reachable only inside a VPC.** Preferred cost-conscious design for review: nonproduction CloudFront remains internet routable but requires short-lived, signed viewer cookies from a **secure, separately authorized bootstrap**. CloudFront trusted key groups validate signatures. This is an access-control gate on the frontend, in addition to S3 OAC. Alternative: a correctly validated OIDC edge-auth gate, or IP-based source allowlisting only if the tester network is reliably fixed. If the sponsor later requires **network-isolated**, not just access-controlled, dev access, reopen network/VPN/PrivateLink/VPC alternatives and price in 013-D.

**Proposed broker flow to qualify (not built):**
1. Unauthenticated GET of the protected dev SPA or asset is denied by CloudFront; S3 direct access also denied. No generic 403→public index rewrite may leak the SPA.
2. A deliberately narrow public bootstrap route such as dev site's /auth/start and /auth/callback can reach a broker origin. These routes are non-cacheable, do not deliver the SPA, and cannot mint access by simply visiting a URL.
3. Broker completes a server-validated OIDC authorization-code/PKCE transaction with state/nonce and validates the **development** identity and explicit tester allowlist.
4. Broker issues the CloudFront signed-cookie set for the **dev frontend domain** only, short-lived, Secure/HttpOnly with appropriate SameSite/Domain/Path behavior. Signing key kept in a private dev secret store; never embedded in JavaScript or GitHub artifacts. Validate that cookie domain choice cannot unintentionally cover production.
5. Protected SPA assets require valid cookies in every relevant cache behavior. Test SPA deep links, static error pages, default CloudFront host, query-string variants, expiration and logout semantics. Session revocation has limits: issued cookies remain valid until expiry unless signing keys or policies are changed, so use bounded lifetime and defined emergency key rotation.
6. Dev APIs remain separately JWT-authenticated **and** enforce tester entitlement at the server; signed CloudFront viewer cookies alone do not grant API/data privileges. Disallow production identities from dev and vice versa.

Compare the broker's complexity/attack surface and cost with the edge-OIDC and stable-IP alternatives in 013-D/F. Do not assert signed-cookie gating is free or complete until independently exercised. Any machine/agent nonproduction testing must use separately scoped synthetic-only credentials and audited calls, not universal tester cookies or production tokens.

## C05 — Production admission and operational deny defaults

Production CloudFront assets are public, but protected observation read/write requires server-side verified identity, legitimate owner/standing checks and explicit operational enablement. Do not launch an open registration + real-person-reporting path simply because the UI is online. Before R-P02 consent/eligibility, the initial public production shell may be informational only with any data-intake routes **server-side disabled/denied**, not merely hidden in the frontend. R-P03 likewise denies community publication/export. Public site accessibility must never imply public observations, public buckets, cached authenticated data, or automatic R/D sharing.

Use dedicated API Gateway custom domains and disable the default execute-api endpoints **after configuring a working custom domain**. Neither the custom-domain routing nor disabled default URL makes the API network-private; JWT and record-level checks are mandatory. Prevent source-map/private config exposure and publicly cacheable API responses.

## C06 — AWS human/IAM/deployment trust

| Principal | Allowed purpose | Must be denied |
|---|---|---|
| Human DNS owner | Approve scoped record and ACM validation updates; preserve other SkellyHouse services | Agent unrestricted modification of parent zone |
| Human production release approver | Authorize reviewed production deploys, DNS changes and rollback | Agent self-approval or automatic production publish from a PR |
| CI PR validation | Read repository and run independent lint/build/test/static security/plan checks in unprivileged context | Any AWS deploy or secret disclosure from untrusted PR code |
| Nonproduction deploy role | Short-lived GitHub OIDC assumption for restricted infrastructure and synthetic dev resources | Any prod resource, role, data, keys, zone-wide edit or real data |
| Production deploy role | Separate short-lived GitHub OIDC assumption only through protected deployment environment/approval and permitted branch | PR-based deploy, wildcard repo assumption, broad organization privileges, direct agent production access |
| Application execution role | Minimal API/Lambda resource operations within exact environment | General account administrative authority, cross-environment data, DNS/secrets administration |
| Emergency operator | Break-glass with MFA, audit and time-bounded approval | Silent bypass of data/privacy/production gates |

GitHub OIDC trust must constrain audience to STS and subject to **SethDKelly/TreatFlow**, exact authorized deployment identity and environment. Important distinction: when using GitHub Environments, the default OIDC subject commonly identifies the **environment** rather than the branch; environment branch restrictions, required human reviewers and branch protections must therefore be independently enforced. Do not incorrectly assume one default OIDC subject simultaneously proves both branch and environment. Production job approvals must not be bypassable by workflow edits, permissive reusable-workflow contexts, wildcards, forks or self-review. Restrict GitHub Actions permissions to minimum job need, with id-token:write only on approved deployment jobs.

No static AWS access keys in repository, CI secrets, Cursor/Codex prompts or logs. Prefer AWS IAM Identity Center for interactive human access (subject to available organization setup), short-lived STS credentials for CI, separate release and runtime roles, explicit permissions boundaries and IAM Access Analyzer review. IAM service control policies add denial guardrails where available but do not themselves grant permissions.

**Deployment sequence after authorization (not action in 013-C):** validate PR without AWS rights → reviewed IaC plan and drift/permission analysis → approved restricted dev deploy → synthetic negative-control test → independent release review → protected production deploy *only after separate approval* → monitor/rollback. Restrict who can update secrets, certificate signer keys, CloudFront key groups, DNS and deployment role trust. AWS console changes must be logged and drift assessed, not become undocumented parallel truth.

## C07 — Resource and IaC ownership

Require one bounded declarative infrastructure owner with per-account environment inputs, cost tags, explicit Region, immutable build artifacts and deployment provenance; **do not create two competing IaC owners**. Candidate choices are CDK/TypeScript, Terraform/OpenTofu or CloudFormation. 013-F/G must choose based on demonstrable operability, drift testing and minimum complexity; this phase does not add a framework to the design-only repository.

High-level isolation labels should be descriptive (e.g., nonprod/prod), not secrets. Do not hard-code guessed AWS account IDs, hosted zone IDs, ACM ARNs or DNS record targets. Sensitive configuration resides in environment-specific managed stores with least-privilege retrieval. Nonproduction data seed is synthetic and reproducible; never use participant exports or uncontrolled real-world logs to test. Tag retention, environment, system and owner to support 013-D accounting and incident response.

## C08 — Release and failure/denial verification contract

| Test | Expected evidence |
|---|---|
| Public production root HTTPS URL | Loads reviewed public static content; no real-data intake without separate approval |
| Anonymous dev root/static/deep-link | Denied at CloudFront viewer gate, including a CloudFront assigned domain and SPA error path |
| S3 REST origin direct URL | Denied for both environments |
| Dev broker login with unknown user / forged callback / wrong state | No signed cookies issued; safe audit evidence |
| Expired/revoked signer / wrong cookie domain | Denied on protected dev content; documented maximum revocation delay |
| Anonymous or prod-identity dev API call | Denied independently of frontend gate |
| Dev user attempts production record/API and inverse | Denied, no cross-account resource access |
| Direct API execute-api endpoint after disable | Denied or nonfunctional as configured, even if custom domain works |
| Public-site request for another participant's private data | Denied by server ownership checks; no CDN caching of personalized response |
| PR from fork/untrusted branch tries production role assumption | STS denied; no secrets or deploy permissions |
| Approved dev deployment attempts prod resource or DNS write | IAM denied, alert/log evidence |
| Production release without protected human approval | CI job blocked; no artifact/config deployed |
| ACM wrong-region/wrong-hostname or DNS record collision | Fails preflight without replacing existing site |
| Abnormal request volume / auth abuse | Throttle and rate protections exercised; billing/alert and fail-safe evidence |
| Rollback of broken static bundle or failed API version | Restores previous independently identified artifact while preserving private data |

No test is claimed performed. In 014/018, verification should record changed-resource inventory, AWS event evidence, exact deployed SHA, principals, scoped negative controls, CloudFront behaviors, API defaults, region/certificate mapping, and rollback results. Production record/collection validation may use **synthetic data only** until R-P02 authorization. Design critique alone is not proof of enforcement.

## C09 — Decision ledger and carry-forward gates

| Decision | 013-C position | Owner / downstream gate |
|---|---|---|
| Separate AWS workload accounts | **Preferred security baseline** | Check organization/access/cost availability in 013-D and final acceptance 013-G/H |
| Single-account fallback | **Not equivalent**; synthetic sandbox only unless explicitly risk-accepted | 013-G/H |
| SkellyHouse hostname family | **Conditional proposed names** | DNS owner inventory/approval before any 014 changes |
| CloudFront + private S3 | **Preferred** | Validate OAC and actual viewer behavior in 014 |
| Private nonprod viewer gate | **Signed-cookie broker candidate**; compare OIDC edge/IP alternatives | 013-D/F/G |
| Public production frontend | **Accepted design goal**, not approval for live participant intake | 019 separate release and R-P02 |
| Regional API and TLS | **Separate regional ACM from global CloudFront ACM** | 013-C records, 014 technical evidence |
| IAM CI deployment | **GitHub OIDC + protected roles and human production gate** | 013-F CI design; 014 enforcement |
| IaC tool choice | **Deferred, one owner mandatory** | 013-F/G |
| Cost and operations | **Not priced in 013-C** | 013-D mandatory scenarios and ceilings |

### Exit and next phase

**013-C PASS FOR ENVIRONMENT / DEPLOYMENT TRUST DESIGN WITH EXTERNAL VERIFICATION DEPENDENCIES; 013-D NEXT ELIGIBLE AFTER MERGE.** The architecture is documented with denial cases and owner-specific decisions. It is **not verified deployed**: no AWS Organizations/account, Route 53 zone, DNS control, registrar, certificate, GitHub Environment approval, IAM role, test broker, CI workflow, budget, CloudFront configuration or API Gateway resource has been inspected or changed. **Final 013-G/H architecture and execution authorization must HOLD if any required DNS authority, dev gating, prod human review, role separation, abuse budget or identity condition remains unresolved.** No application implementation, production deployment, real participant processing or external disclosure authorized.
