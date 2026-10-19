---
type: Engineering Phase Definition
title: TreatFlow 013 — AWS Engineering Foundation and MVP Program Start Gate
description: Bounded engineering-design entry after Phase 012, evaluating AWS deployment, security, costs, isolation, DNS, and MVP scope without authorizing feature implementation.
tags: [treatflow, phase-013, aws, engineering, mvp, architecture, start-gate]
---
# Phase 013 — AWS Engineering Foundation & MVP Program Start Gate

## Authority and scope
[012-F](../012/012-f-treatflow-exit-review.md) closed preparation with bounded carry-forward; it **did not authorize coding, real data operation or disclosure**. This phase establishes a separately reviewable engineering architecture and delivery program. Sponsor constraints: AWS hosting; low and predictable cost; public **production website** under SkellyHouse DNS; distinct **private non-production** environment; serverless/CDN-first preference; independently qualified MVP candidate.

Current product authority remains [purpose](../../canonical/purpose/purposes.md), [five-concept adopted family](../../canonical/project/concept-family-scope.md), [action surface](../../canonical/composition/application-action-surface.md), [mappings](../../canonical/mapping/), and [012-E safety handoff](../012/012-e-treatflow-handoff.md). This document proposes engineering candidates, **not** substitute concept semantics.

## Design hypotheses for assessment, not locked technology
- Frontend: static-first UI assets in private S3 delivered by CloudFront via origin access control (OAC); S3 public access blocked, not public S3 website hosting.
- Dynamic: API Gateway HTTP API plus bounded Lambda compute, private DynamoDB on-demand state. Compare Lambda Function URL and alternatives for genuine simplicity/cost; choose only after requirements and threat/performance analysis.
- Authorization: explicit owner-scoped private record/review and appropriate user authentication or equivalent justified secure ownership. Anonymous posting/public reporting must **not** be inferred from a publicly accessible website.
- Infrastructure: reproducible IaC, least privilege, encrypted at rest/in transit, rate limiting, no public database, logging with sensitive-field redaction, backups/recovery and deletion policy. Evaluate whether CloudFront/API caching is safe for personalized data (default **no caching** of authenticated API responses).
- Domain: prefer `treatflow.skellyhouse.com` (prod) and `treatflow-dev.skellyhouse.com` (nonprod) if apex `skellyhouse.com` zone is controllable. Otherwise evaluate `treatflow.www.skellyhouse.com` and `treatflow-dev.www.skellyhouse.com` for actual delegated `www` zone. Verify DNS ownership/zone authority, existing records, collisions and certificate validation **before change**. No DNS modification in this phase.
- HTTPS: Route 53 aliases to respective CloudFront distributions, valid ACM certificates covering exact names (CloudFront ACM certificates in us-east-1); no assumption `www.skellyhouse.com` itself owns the apex zone.
- Environments: prefer isolated AWS accounts if feasible; at minimum separate identities, deployment roles, data tables, buckets, secrets, distributions, quotas and observable costs. Nonproduction private at *both frontend and API* (validated access policy/auth, not obscurity or CORS alone); default synthetic data, no copy of production participant information.
- Public production: frontend reachable worldwide as designed, while accounts, observation storage, restricted views and any research/disclosure operations stay protected and individually gated. Public website availability is not permission to accept real participant data.

## Cost and operational acceptance questions
Establish a small fixed-cost budget and upper bounds for expected idle month, Halloween peak and hostile/abusive traffic. Estimate per-request CDN, S3 storage/requests, API Gateway, Lambda, DynamoDB, DNS, certificates, logging/alarms, WAF or alternative edge abuse controls, authentication and backup costs; free tiers are not permanent budget guarantees. Set AWS Budgets and anomaly alerts, request throttling and resource limits; model cost of nonproduction idle state, retention and accidental runaway traffic. Do not assert dollar figures without verified region/pricing and workload assumptions.

## Phase 013 subphases / start and exit
- **013-A — Engineering start gate:** verify phase-012 merge and authority, narrow MVP target, sponsor DNS/cost/private-dev constraints, independent authorization boundaries. **This document and [013-A](013-a-start-gate.md)**.
- **013-B — AWS architecture alternatives and security boundary:** compare S3/CloudFront, API/runtime/storage/auth patterns, resilience and failure tradeoffs; ADR candidate.
- **013-C — Environment isolation, Route 53, TLS, IAM and deployment trust:** DNS authority verification, private nonprod authentication, public-prod constraints, IaC/secrets/access lifecycle.
- **013-D — FinOps, operational nonfunctional requirements and abuse economics:** budgets, cold-start latency, quotas, sensitive logs, deletion, recoverability, Halloween peak sizing.
- **013-E — Concept-to-MVP realization contracts:** exact O private workflow, identity/entitlement, data meaning, protected guards, success tests; deferred capabilities traceable not erased.
- **013-F — Autonomous development and verification control:** Cursor/Codex work isolation, review independence, negative controls, synthetic-data evaluation, CI branch protection, nonprod test control plane evaluated without introducing unauthorized executable service.
- **013-G — Architecture selection and MVP phase/critical-path plan:** narrow evidenced choice, sequenced package contracts and deferrals, resource/cost/security acceptance gates.
- **013-H — Independent start-of-implementation authorization gate:** assess 013-B–G evidence, resolve blocking architecture/permissions, authorize *specific* bounded tasks or HOLD; never auto-authorize production participant intake/disclosure.

## Candidate implementation program beyond 013 (not executable yet)
See [MVP implementation roadmap](mvp-roadmap.md). Complete Phase 013's design and authorization gate before implementation begins. Later implementation should use separately isolated branches, tests and independent PR reviews, with no direct unreviewed production deployments.

## Success criteria
A new reviewer can locate canonical authority in few hops; can distinguish what a public website may display from data it may collect; can independently verify DNS/certificate/environment decisions; can estimate and cap cost from defensible inputs; can challenge identity, retry, privacy, history and event meaning; can identify a minimal observation-first MVP candidate and objective non-production qualification evidence. No premature implementation, production data or external disclosure.

## Mandatory stop conditions
Missing eligibility/privacy basis for real data (R-P02), unapproved external availability (R-P03), confused people/groups or interval observations, unbounded abuse cost, exposed private nonproduction/API, insufficient owner authentication, undocumented DNS control, or attempts by coding agents to self-authorize protected decisions block the corresponding action. 013 design is permitted; implementation needs explicit downstream 013-H approval.
