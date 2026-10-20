---
type: Engineering Implementation Entry Contract
title: TreatFlow 014-B — Local-First Autonomous Implementation Plan and Cloud Deployment Gates
description: Reviewable no-cloud Cursor/Codex starter packages with exact authority, acceptance, pause conditions and separate shared-AWS integration milestones.
tags: [treatflow, phase-014, implementation, local-first, cursor, codex, aws, milestone, authorization, mvp]
---

# 014-B — Local-First Implementation Start and AWS Gated Integration

## Purpose, state and authorization

**STATUS: PLAN READY FOR HUMAN APPROVAL; NOT AN EXECUTED OR APPROVED CODING START.**

[014-A repository/backbone audit](014-a-entry-inventory.md) merged via PR #102 at `98a63527a07f2a8d83b49f91d1ff7788c93375b1`. A source-based audit of the shared `SethDKelly/aws-backbone` Terraform repository found a central AWS IAM/OIDC owner and material privileged-CI and role-isolation questions. Those issues **block AWS credentialing, CDK bootstrap, CI workflows with deploy permissions and deployment**, but they need not block local, nonprivileged TypeScript application scaffolding and pure deterministic synthetic tests.

**Intentional sequencing revision:** [Phase 013 MVP roadmap](../013/mvp-roadmap.md) remains the **single delivery owner**. Replace the prior implicit infrastructure-first dependency with two tracks:

- **Track L — LOCAL:** bounded source-only work inside TreatFlow, no credentials, AWS calls, secrets, deployment, real users, persisted user data or external sharing. Its local application packages can cross into planned Phase 015/016 work using approved small PRs without waiting for AWS readiness.
- **Track C — CLOUD:** central `aws-backbone` IAM/CI hardening and authorized account/DNS/billing evidence, then reviewed dev infrastructure/CDK bootstrap/CI and protected synthetic nonproduction deployment. This track remains **HOLD** under [013-H](../013/013-h-independent-exit-authorization.md) and 014-A findings until a separate signed-off implementation/deployment authorization.

**This is a proposed change in engineering sequencing, not an automatic retrospective override of 013-H.** The sponsor/user must explicitly authorize the bounded Track L implementation scope (e.g., "Authorize 014-B-L01–L03 local-only implementation, under this contract") after approving this plan. One authorization may cover those named local packages, with independently reviewed PRs and pause gates between them; it does **not** cover AWS writes, CI credentials, public site launch, actual participant-data use, or protected fact revision.

## Milestone layout, with decisions delayed only to their first dependent point

| Milestone | Authorized only after | Ready deliverable and exit |
|---|---|---|
| **014-B-L01 — Local engineering substrate** | Explicit user-approved **source-only** coding scope, merged plan | Minimal React + TypeScript + Vite web application in one maintained npm project; lint/typecheck/build and Vitest tests run locally; no monorepo, backend service, cloud resources or production tracking. Review dependency and lockfile security. |
| **014-B-L02 — Synthetic test and authority foundation** | L01 independently reviewed | Pure deterministic synthetic fixtures and domain-test conventions, isolated test data, no external network, full evidence of test command/output, independent semantic-review checklist. Do not implement competing concept specs or hard-code future API schemas. |
| **014-B-L03 — First local observation vertical slice** | L02 independently reviewed; [canonical O](../../canonical/concepts/observation.md) and [013-E](../013/013-e-concept-to-mvp-realization.md) used as authorities | Pure Observation state transitions and/or local-only UI prototype for Establish → qualified Report → private Inspect, with explicit person-vs-group, time assertion vs receipt, unknown coverage and honest effect outcomes. In-memory **synthetic only**; no real account auth, browser analytics, uncontrolled persistent storage, server/API or external availability. |
| **014-B-L04 — Independent local foundation exit** | L01–L03 merged and reviewer checked | CI-independent reproducible commands, semantic fixtures and negative cases, code/dependency review, no cloud/secret accesses; explicit acceptance of technical debt and 015/016 handoff. |
| **014-B-C01 — Backbone security and deployment authority** | Restricted backbone security review, owner-granted approval; actual GitHub/AWS and budget evidence | Trusted **narrow** TreatFlow dev deployment role, reviewed application-vs-shared IAM boundary and CDK bootstrap ownership, enforced untrusted-PR denial and protected CI. **Not authorized by Track L**. |
| **014-B-C02 — AWS dev IaC / access gate** | C01 plus full cost ceiling, dev account role/Region, CloudFront viewer-side gate and API/WAF selection | Restricted, separately reviewed CDK synth/diff and least-privilege dev-only deployment; no production or real data. |
| **014-C–E — Protected synthetic environment / ops exit** | C02 specific resource approval | Private dev CloudFront/S3, REST API stage/WAF if finally selected, DynamoDB, alarms, evidence of denial and rollback; only synthetic data; independently verified exit. |
| **015–016 — Private identity/Observation implementation** | Source-only semantics may proceed after L04; cloud-backed API integration waits for C01–C02 | Private guest entitlement design, meaningful records and action attempts; all seven O actions, responsive UI and qualified correction decision. Preserve separate 015/016 phase contracts and exits rather than inventing a new single-feature architecture. |
| **017–018 — Hardening and synthetic MVP qualification** | Local and cloud tracks integrated under independently verified controls | Fault and access denial, cost/latency, sealed fixtures and separate protected-nonprod MVP PASS/HOLD. |
| **019 — Public production release** | Separate explicit human production gate | Public HTTPS site with protected backend. R-P02 actual person intake and R-P03 external availability remain independent HARD HOLDS. |

Local work need not produce a complete Observation application before cloud integration. Prefer proving *semantic precision and useful workflow* first, not speculative infrastructure abstractions.

## First three local packages — exact bounded agent contracts

### L01 — local workspace

**Agent input:** this file, root [AGENTS.md](../../../AGENTS.md), [canonical purpose](../../canonical/purpose/purposes.md), [013-E MVP contract](../013/013-e-concept-to-mvp-realization.md), and [013-F agentic control](../013/013-f-agentic-independent-test-control.md). Start from actual merged `main` SHA at execution time; do not hard-code this design PR SHA as code baseline.

**Permitted source:** `package.json`, dependency lockfile, compiler/linter/test/build configuration, a minimal `src/` with static local placeholder, minimal `tests/` and a brief contributor command note at a natural owner. Preserve `docs/` canonical meaning and avoid adding other architecture policies. Choose a single standard npm package rather than creating frontend/backend/infra monorepo scaffolds before justified.

**Verification:** clean install from lockfile; typecheck, lint, tests and production build locally; documented Node supported version/engines and reproducible commands; no credentials, network runtime calls, telemetry, public external dependencies beyond development tooling. A sample static local screen cannot claim real participant-recording completion.

**Stop:** unexpected need for authentication, server, database, deployment, secret, analytics, real data or new policy → separately evaluate/authorize instead of shipping opportunistically.

### L02 — deterministic synthetic fixtures

**Permitted source:** pure `src/domain/` types/validation primitives and tests for clearly specified Observation units/time/coverage, as needed to support fixtures. Avoid speculative persistence keys or service DTOs. Synthetic fixture namespaces and identifiers are not real household metadata.

**Visible cases:** person vs group; near-present aggregate vs bounded-interval total; unknown monitoring vs observed zero; approximate/recalled asserted time distinct from receipt; invalid count/unit; no silent precision invention. Use [013-E E-T01–E-T22](../013/013-e-concept-to-mvp-realization.md) as the semantic test owner, not copied full expected outputs in agent instructions.

**Review:** independent second agent examines tests for false model assumptions, uncaught overlapping coverage and misleading zero; holdout examples stay outside implementer-visible repository if truly secret. Deterministic unit tests alone are **not** protected human/empirical validation.

### L03 — local synthetic private recording vertical slice

**Permitted source:** pure state transition functions and a **localhost-only** React UI with in-memory synthetic fixtures. Implement minimal Establish, qualified Report and Inspect first. Extend to remaining actions via 015/016 scoped packages after review; never imply that simple prototypes fulfill full close/history/completeness requirements.

**Visible negative cases:** identity/record entitlement is *simulated locally and not security enforcement*; unknown result after interrupted mock attempt; two reports with equal counts are not automatically duplicate; no public release/UI download of observation material; no presumed complete watched-zero; no hidden correction of reported amount; no real sign-up and no durable local storage.

**Exit:** meaningful test coverage and screenshots if useful, with review of actual state/result behavior. `localhost` is not proof of deployed privacy/security. Do not call local synthetic access a production authentication mechanism.

## Cursor/Codex workflow after authorization

1. **Sponsor/maintainer approves bounded scope** explicitly. Agent is given package ID, exact current merge base, allowed files, prohibited services, acceptance cases and stop conditions.
2. **Cursor implements** on isolated `implementation/014-b-l01-...` branch or worktree; may write and run local tests, not deploy. It creates a PR with committed source, lockfile, commands/results, changed-surface and risk log.
3. **Codex independently reviews** PR diff and specified canonical owners in fresh context (not implementer scratchpad) and attempts negative cases. Record its findings; it does not self-merge or edit implementer's branch while rating it.
4. **Cursor corrects** on same PR branch; Codex rechecks meaningful fixes. The human maintainer merges according to actual repository protections. Reverse the Cursor/Codex roles on the next independent package if useful.
5. **Continue within the approved L01–L03 envelope** without reopening a lengthy design phase for minor reversible decisions. Stop and seek design reentry only on product-semantic conflict, harmful unexpected coupling, security scope escalation or irreversible decision.
6. **Protected evaluator** checks varying cases independently at package boundaries. An agent-authored green test suite cannot certify its own safety; missing/failing evidence = HOLD. Never paste secret holdouts or protected IAM details into public issue comments.

**Ready-to-paste implementer kickoff after explicit human approval (replace current SHA with true target):**

> Implement TreatFlow 014-B-L01 only, using `docs/phases/014/014-b-local-first-implementation-plan.md`. Start from current `main` and obey `AGENTS.md`. Create one standard React/TypeScript/Vite npm project, minimal accessible localhost UI, local typecheck/lint/test/build commands and lockfile. Do not create AWS/CDK/Terraform, GitHub deploy workflows, backend API, identity provider, database, tracking, user data, or public hosting. Open a narrowly scoped PR; record actual commands/results and unresolved risks. Stop on conflicting canonical requirements.

**Ready-to-paste independent reviewer kickoff:**

> Independently review PR for 014-B-L01 against its scoped contract, `AGENTS.md`, and current canonical authority. Do not inherit implementer assumptions. Confirm no AWS privileges, deployment workflows, real data, secret handling, unnecessary monorepo abstractions or false feature-completion claims. Run supported clean install, tests, typecheck, lint and build; record exact SHA, results, findings and explicit PASS/HOLD. Do not merge or grant production permissions.

## At-the-milestone decision ledger

| Trigger | Must be decided there, not necessarily today |
|---|---|
| Before 014-B-L01 coding | **Explicit sponsor approval for local source-only L01–L03 envelope**, allowed dependency sources, independent PR review and actual repo write rights. Do not treat merging this plan as approval. |
| Before hosted protected dev resource | Backbone security issue resolution, exact scoped GitHub OIDC and CDK bootstrap trust, accepted AWS/dev account, role and spend ceiling, provider/region, private viewer admission and API bypass/abuse test |
| Before 015-A cloud/private access contract | Legitimate guest/private entitlement (not mandatory registration); capability lifetime, possession/recovery and session security model |
| Before factual amount correction | Valid protected Revision entitlement and historical replacement or explicit approved noncorrecting synthetic candidate with P-05 risk |
| Before API/DynamoDB integration | HTTP/REST/WAF final cost and security selection, retention, access patterns, idempotent attempt/replay semantics, denied direct-origin access and independent negative tests |
| Before production DNS/public shell | Zone/account/cert and human release permission, public static shell scope, approved budget, independent auth/API deny and emergency rollback |
| Before real participant data or external release | Independent R-P02 and R-P03 decisions; no approval can arise from Cursor/Codex, MCP, CI, 018 candidate or production DNS alone |

## Anti-bloat and authority restrictions

Do not generate a second canonical Observation spec, parallel shared agent policy, custom workflow engine, monorepo, generalized microservice framework, abstract database layer, speculative MCP server, broad CDK app, or elaborate CI pipeline as a prerequisite to running a local hello-world build. One natural owner per decision; existing [roadmap](../013/mvp-roadmap.md) owns long-range phases, this document owns the exact **014-B local entry** contract. Use few files, working code and independently testable behaviors.

**Phase 014-B design-record state: LOCAL START PACKAGE DEFINED.** Track L L01–L03 source may land under explicit sponsor authorization and independent PR review; **CENTRAL AWS DEPLOYMENT AND PUBLIC/REAL-PERSON OPERATION REMAIN ON HOLD.** This design record itself does not deploy cloud resources.
