---
type: Engineering Implementation Roadmap
title: TreatFlow — Cloud-First MVP Autonomous Execution Program
description: Single delivery owner: verified starting assets, capability packages and dependencies, agent operating loop, decision triggers, independent quality gates, protected AWS deployment and synthetic MVP exit.
tags: [treatflow, aws, mvp, roadmap, implementation, agentic, cloud-first, acceptance, authority]
---

# TreatFlow — Cloud-First MVP Execution Program

## 0. Controlling status and authority

**PROGRAM DESIGN — PROPOSED FOR REVIEW; MERGING THIS DOCUMENT DOES NOT APPROVE ANY NEW AWS WRITE, CDK BOOTSTRAP, PRODUCTION DEPLOYMENT, REAL PARTICIPANT INTAKE OR EXTERNAL DISCLOSURE.**

This is the **one authoritative MVP delivery program**, replacing the earlier local-first-as-critical-path ordering. Do not create individual phase design documents in advance merely to restate this plan. The code, product canonical owners and existing phase-specific gate records contain detailed behavioral and authority contracts. Plans describe *what must be proven*, not speculative implementations of every route, table or UI component.

Read in order when a package is eligible: root `AGENTS.md` → [current knowledge](../../index.md) → [Observation](../../canonical/concepts/observation.md) and applicable [compositions](../../canonical/composition/) → [013-E MVP semantics and E-T01–22](013-e-concept-to-mvp-realization.md) → this delivery program → **only** the relevant current phase gate. [013-F](013-f-agentic-independent-test-control.md) is the single autonomy/testing methodology; [013-G](013-g-architecture-mvp-delivery-decision.md) is the conditional AWS architecture ADR; [014-A](../014/014-a-entry-inventory.md) owns backbone boundary evidence. Never promote a phase proposal above canonical product authority.

**As-of planning snapshot, 2026-10-20:**
- Merged in TreatFlow: 014-B-L01–L04 local React/TypeScript/Vite foundation, `npm ci` + typecheck/lint/test/build and unprivileged CI, 016-B/C **all seven** synthetic in-memory Observation actions, and [016-D Option B](../016/016-d-factual-correction-product-decision.md) bounded factual-correction deferral. The code's synthetic principal is **not authentication**; local in-memory actions are **not durable records**.
- Backbone has a dedicated TreatFlow dev deployment IAM role and an October 20 Terraform apply success. **Do not conclude full cross-application isolation from role existence or successful apply.** Actual live assumed-role denial is still the C01-K exit requirement.
- Open at snapshot: TreatFlow [PR #109](https://github.com/SethDKelly/TreatFlow/pull/109) (C01 evidence + C02 decision/synth-only gate); private backbone [PR #4](https://github.com/SethDKelly/aws-backbone/pull/4) (negative-test infrastructure). Both have latest green validation runs, which **do not** satisfy C01-K live permission tests or grant resource-deploy authorization.
- Re-read exact current `main`, open PRs, effective GitHub protection and owner evidence at **every** phase gate. This snapshot is not a live status tracker; merged/closed PRs must not remain artificially blocking.

**Target A:** independently qualified **synthetic-only MVP candidate running in a private AWS nonproduction environment** (Phase 018). **Target B:** separately approved public HTTPS production frontend under SkellyHouse, with data intake disabled until independent R-P02 authorization (Phase 019). **Real participant collection/processing, community/research exposure and protected disclosure are not an automatic part of either target**. R-P03 approval is separate; no supported Poisson or population inference is invented. Product success is effortless **private** Observation recording/review without S/R/D.

## 1. Agent operating rules — the rails

### 1.1 Work-selection state machine

Every package has a state: **NOT ELIGIBLE → READY FOR SCOPED REVIEW → AUTHORIZED → IMPLEMENTING → INDEPENDENT REVIEW → ACCEPTED** or **HOLD/REPAIR**. `BLOCKED` means a named dependency is absent; `NOT RUN` and `UNKNOWN` are not PASS. No agent may set its own package `AUTHORIZED`, `ACCEPTED`, or production approval based solely on authored plans/tests.

**At each iteration:**
1. **Refresh** exact `main`, open PRs, blockers, shared-backbone companion state and latest CI/evidence; stop on branch or authority drift. Do not merge/rebase other agents' unfinished branches.
2. **Choose the first eligible package** in the dependency table; parallelize only clearly disjoint change sets with accepted interface contracts. Do not work around a protected HOLD by relabeling the action.
3. **Write a five-part PR/task header** (in PR description, no extra repository file): package ID + SHA/owners; allowed files and prohibited operations; acceptance/negative checks; dependency evidence and permissions; rollback/deferral/stop condition. A future package may derive route/schema details from code, but may not silently change meaning.
4. **Implement via Cursor or Codex** in a narrow branch/worktree. Code should be runnable, maintain current tests and minimize files/abstractions. Only use repo-authorized credentials for explicitly approved deployment jobs, never for PR validation.
5. **Review independently** with the other agent or isolated clean-context review, run unprivileged CI and objective tests, surface unsafe shortcuts, fix or HOLD. A model swap without context/permission separation is not independence. Actual human/CI merge and protected environment approvals remain binding.
6. **Record facts in existing owner**: PR evidence (exact SHA, commands, run links, failed/blocked tests, exceptions and rollback) and one minimal phase status update only when materially needed. Do not create a separate log, roadmap or test-report document per PR.
7. **Advance automatically only within previously approved scope and nonprivileged operations**. At a missing human/AWS/financial/privacy decision, stop, present alternatives and minimum decision needed, and preserve other eligible independent work.

**Package PASS requires**: scoped code merged under actual protection; visible tests and fresh independent negative cases pass; versioned evidence traces code SHA, environment/role, resulting behavior and accepted residuals; no unapproved privileges or semantic deviations. Green CI, passing a self-authored test, an infrastructure plan, a successful Terraform apply, or an apparently working UI alone is insufficient.

### 1.2 Approval classes (separate gates)

| Class | What agents may do after authorization | Additional independent authority |
|---|---|---|
| **S — local / source** | Write code, test/compile/synthesize without cloud access, open narrow PRs and independently review | Human authorizes package scope; no AWS credentials or secret holdouts |
| **R — read-only cloud/plan** | Inspect owner-approved AWS state; template-only `cdk diff --method=template` if pinned CLI supports no AWS mutation | Authorized read-only role; avoid default/change-set diff, asset upload, `cdk bootstrap`, stack mutation |
| **D — synthetic-dev cloud write** | Deploy **named** nonprod stacks through approved scoped role and protected environment | C01-K live assumed-role denies PASS, cost ceiling, account/Region, WAF/viewer gates, reviewed IaC/change impact, sponsor AWS-write approval |
| **P — public production** | Publish reviewed public shell/production infrastructure only inside separately approved production environment | Proven separate production trust, domain/certificate owner, reviewer, budget, rollback; real data API disabled absent R-P02 |
| **H — real-person/disclosure** | No agent self-authorization permitted | Independent R-P02 privacy/eligibility and R-P03 release; never inferred from D/P or Phase 018 |

**Prohibitions across classes:** sharing real participant datasets with test harnesses, fabricating observed-zero or individual arrivals, treating O.Qualify as factual amount revision, giving development/test MCP generic IAM/shell/production powers, publicly caching authenticated API results, using the shared `dev-github-deploy` role for TreatFlow, or letting PR code assume privileged Terraform roles.

### 1.3 Blocking issue routing

- **Canonical behavior conflict:** stop the affected task, reopen natural concept/mapping owner; do not encode a silent variant in application code.
- **Central IAM/OIDC/privileged Terraform concern:** change only under private `aws-backbone` ownership and explicit authorized PR; TreatFlow documents dependency/outcome but not restricted policy details.
- **AWS choice/cost/operability unknown:** resolve at relevant 014-C/015 gate via one decision record or an existing phase record, not by duplicating 013-G.
- **Reversible UI and implementation detail:** choose the simplest documented compatible solution and test it within package scope; do not escalate ordinary programming decisions.
- **Protected product choice:** [016-D Option B](../016/016-d-factual-correction-product-decision.md) defers factual correction for synthetic MVP. A second report cannot fix an earlier factual assertion; UI must disclose that limitation before hosted candidate qualification. Reopen toward authorized Revision on T1/T2 triggers, not opportunistic edit buttons.
- **Missing independent reviewer/protected CI evidence:** HOLD corresponding gate; don't approve by adding a pass label.

## 2. Dependency graph and packages from current main to hosted MVP

The following is the **complete high-level implementation plan**. Subtasks may be derived locally per package; agents should not author a redundant subphase planning document unless a material decision needs permanent audit. Use existing numbered phase owners. An `I` package is an implementation PR, `Q` is independent qualification, and `G` is an explicit authority/selection gate.

| Package | Depends on | Bounded deliverable and acceptance evidence | Gate / status |
|---|---|---|---|
| **014-B-C01-Q — Backbone identity exit** | Backbone role apply, companion trust review | Complete live **assumed-role** negative tests for cross-app/prod IAM, inappropriate role creation/pass-role, disallowed principals/ref subjects and privileged PR trust; record exact role/region/CI evidence in restricted owner and sanitized result in TreatFlow | **HOLD** at snapshot until live C01-K evidence; policy sims only supporting |
| **014-B-C02-G — Dev architecture and spend choice** | C01 progress may run in parallel as design only | Sponsor records approved dev account/Region, spend threshold and alert owner, private viewer-side gate, regional REST API/WAF versus independently defended alternate, CDK bootstrap owner, exact DNS dependency, rollback authority. Full S0–S3 estimate including baseline and abuse | Decisions may be documented before C01-K, **no deployment permission** |
| **014-B-C02-I — CDK application templates** | C02-G scoped *source-only* authorization | Minimal application CDK code with env/name/role scoping, private S3/CloudFront candidate, API REST+WAF, Lambda, DynamoDB and log retention *as separately reviewable stacks*. `cdk synth` + **template-only** diff, IAM/NAT/admin/security scan; no remote bootstrap, change sets, publishing or deploy | **S/R** only; source PR may proceed after specific permission without waiting for live AWS mutation, but no generated policy may claim deployed security |
| **014-B-C02-Q — Cloud-write preflight** | C01-K PASS, C02-G, template review and budget | Verify actual account, permissions, GitHub protected `dev` environment, narrowly scoped bootstrap/CloudFormation execution principal, expected resources and DNS owner; negative role test, no general administrator CloudFormation role | **D gate**: human separately authorizes named dev stacks, budget and rollback |
| **014-C-I1 — Private synthetic web foundation** | C02-Q | CloudFront/private S3 OAC, **viewer-side admission** restricting HTML/assets/deep links and direct distribution hostname, TLS if approved; synthetic-only site + no participant API write | Unauthenticated direct S3 and viewer/CDN bypass **denied**; no false OAC-is-private assumption |
| **014-C-I2 — Protected API foundation** | C02-Q; can overlap I1 on separate infrastructure | Regional API Gateway REST + stage-attached WAF (if selected), Lambda health endpoint, environment and request limits, no public write, scoped IAM. Test both custom and default ingress, WAF and auth denial; avoid public cached private responses | Test distinct origin/direct endpoint and cross-app IAM denies; protected dev only |
| **014-D-I — Observability, budgets and safe release** | I1/I2 | Redacted health/error/latency/audit, finite log retention, quota/throttle/WAF metrics, budget/anomaly alerts, disable-new-writes procedure, immutable build artifacts, separate rollback of site/API, least-privilege deploy and cost sample | Human-owned alert delivery + denial/invalidation/rollback tested, no hard-dollar-cap promise |
| **014-E-Q — Independent AWS foundation exit** | 014-C and 014-D | Independent run proves account/resource separation, no unprotected dev access, no production write, direct ingress denial, role/CI provenance and budgets. Exit report references actual SHA/run/region and missing checks | **PASS/HOLD** before private state/API user data; failed control blocks dependent packages |
| **015-A-G — Private participant/tester entitlement** | 014 foundation; design can begin earlier | Choose minimal **invited dev tester** and distinct **pseudonymous private Observation capability**, scopes, expiry/revocation/recovery, csrf/xss posture, no compulsory participant registration; threat-model account/device loss and per-record entitlement | Security/product decision before persistent private write; IAM/JWT does not grant household, S or Revision authority |
| **015-B-I — Record lifecycle and attempt contract** | 015-A contract; pure model review can overlap foundation | Bounded DynamoDB access patterns for Observation/typed evidence/coverage/qualifier/closure and attempt keys with one owner binding, non-destructive provenance, conditional writes and meaningful conflict states; retention, restore and cost measurement | Source tests for same-attempt replay, two genuine equal-count reports, timeout unknown, close/write race, no invented zero/time data |
| **015-C-I — Authenticated serverless behavior** | 014-E, 015-A, 015-B | Lambda/API handlers exposing only permitted O actions, server-side owner validation, schema/body limits and durable state, idempotency/reconciliation, no client-controlled owner or generic record scans; prohibit all R/D/export operations | Black-box A/B principal and wrong issuer tests; no public response caching; cold-start/WAF quota evidence |
| **015-D-Q — Independent private-state exit** | 015-C | Adversarial API, persistence/retry, API 4xx/5xx, token expiry, lost response, cross-app/tenant, direct-host and data minimization checks; cost/backups validated | Must PASS before treating local frontend as trustworthy hosted app |
| **016-A/B/C-I — Hosted Observation UX** | 015 API contracts; current local O seven-action code is reusable asset | Reuse/refactor local React/domain behavior rather than reimplement it; switch from simulated principal/in-memory store to API-backed private state, preserving all seven O actions, exact time/unit/coverage/zero semantics, accessible mobile reporting, unresolved feedback and after-close inspection | E-T01–E-T22 mapped to hosted results; no mandatory registration, raw data release or misleading confirmed submission |
| **016-D-G — Correction scope check** | [existing Option B](../016/016-d-factual-correction-product-decision.md); revisit T1/T2 | For synthetic hosted candidate **no V code** and a visible noncorrection limitation; new reports do not amend old ones. When persistent personal-record intent or foundation-readiness trigger occurs, reopen sponsor decision for minimal protected Revision before claiming correction | No automatic upgrade to V; STOP on accidental `update quantity` or false amend behavior |
| **016-E-Q — Independent product behavior exit** | Hosted 016 actions + correction disclaimer | Independent tester executes person/group intervals, conflicting coverage and completeness, empty vs watched zero, post-close denial, unknown effect, simulated account isolation, keyboard/mobile and copy correctness | Failed protected semantic cases mean HOLD, no “MVP complete” based on a demo |
| **017-A/B-I — UX and failure hardening** | 016-E, can start bounded tests earlier | Mobile/divided-attention/accessibility review, pending/retry/reconciliation UX, proper conflict/unknown states; stress concurrent/report-after-close cases and restore without silent overwrites | Measured screen-level task evidence, fault-injection/provenance; actual human usability remains unverified unless properly authorized |
| **017-C-I — Abuse and cost resilience** | 014 alarms, 015 APIs | Simulate seasonal and hostile S0–S3 without uncontrolled spend; WAF bypass requests, throttling, auth-flood cost, DynamoDB hot keys, logs/redaction, backup recoverability and kill switches | Keep cloud load within human-authorized ceilings; independent incident/rollback tests |
| **017-D-Q — Independent operational exit** | 017-A/B/C | Source/security/dependency audit, acceptable p95 UX targets as defined by 013-D and measured conditions, operational limits/alerts, runbook and incident owner | Failed high-severity data leak, false success, unauthorised release or unbounded writes = HOLD |
| **018-A-I — Test-control/evaluation readiness** | Protected dev and stabilized behaviors | Prefer scoped CI/CLI black-box test runner using app APIs; optional MCP adapter **only if it lowers real testing friction**. Independent holdouts kept out of implementer context, signed run identity and synthetic TTL/quota, no arbitrary IAM/SQL/shell or production endpoint | Dedicated verifier role and negative-controller authorization tested |
| **018-B/C-Q — End-to-end candidate qualification** | 016-E, 017-D, 018-A | Repeat all 013-E E-T01–22 plus independently varied negative controls, versioned exact deployed SHA, provenance, security/data and cost/recovery evidence, human review of accepted limitations | Evidence graded PASS/FAIL/INSUFFICIENT; no test-run-until-green or self-approval |
| **018-D — MVP candidate independent exit** | 018-B/C evidence | Review complete 7-action protected Observation journey, synthetic-only private AWS access, honest correction limitation, independent tests, security/FinOps/incident readiness; publish PASS/HOLD and residuals | **PASS means synthetic nonproduction MVP candidate only** |
| **019-G/P — Public shell and live-operation decision** | 018-D (for application release), separate prod account/domain/budget approval | Public HTTPS production site via Route 53/CloudFront, independently authenticated API with real intake **server-disabled** until R-P02; separate disclosure never without R-P03. No implicit production promotion from `main`/dev or agent approval | High-consequence explicit human authority and independent release/rollback checks |

**Critical path:** C01-K + C02 decisions → C02 source templates/permission → protected 014-C/D/E → 015-A/B/C/D → hosted 016 + noncorrection disclosure → 017 → 018. **Safe parallel work:** domain contract tests and UI mock-ups can run unprivileged on feature branches while C01-K/C02 preflight is investigated; cost and private-viewer threat modeling parallel C01-K; infra static asset and API stubs in separate PRs after D authorization. No backend integration or public access may outrun protected gates.

## 3. Agent execution/verification definition of done

All phases use the **same small PR contract**; do not create another framework or thirteen boilerplate MD files.

| PR field | Required evidence |
|---|---|
| **Scope** | Exact package ID, source `main` SHA, changed-file allowlist, known upstream contracts and stop conditions |
| **Product fidelity** | Canonical Observation action(s), E-T case IDs, no accidental S/V/R/D features, unit/time/coverage/zero and unknown-effect consequences |
| **Implementation** | Why files/dependencies were required, isolated tests, no duplicate shared AWS managers or speculative libraries |
| **Security & privilege** | No secrets/real participant data, explicit auth/entitlement vs simulation distinction, any IAM/deploy approval and expected-denied operations |
| **Evidence** | Clean build/lint/test, PR checks, independent reviewer findings, redacted behavior traces, actual resource/env identity if cloud, failures/not-run and exact code SHA |
| **Release/rollback** | Immutable artifact/diff, staged dev verification, migration/recoverability and rollback for mutable state, risk owner and cost guard |
| **Decision** | `PASS`, `HOLD`, or `BOUNDED DEFERRAL` with reason and owner; unresolved high-severity controls never silently waived |

**Reviewer roles:** implementer agent may add ordinary tests; independent Codex/Cursor agent begins from current diff and canonical owner without inherited scratchpad and exercises negative alternatives. The *actual* repo maintainer approves merge; protected environment reviewer approves AWS write/rollback separately. No change to a required CI/workflow/IAM control can be counted as validated solely by the PR modifying it. The verifier preserves a run SHA and outside-implementer test cases; if no independent evaluator available, record limitation and HOLD independently gated exits.

**Acceptance precedence:** technical denials and semantic safety outrank aesthetics, test count, performance and cost. Do not disable logging/auth/WAF merely to reduce expenses without separately accepted design change. Good-looking UI is not an acceptance result.

## 4. Milestone-triggered questions; avoid upfront decision bloat

Agents may resolve ordinary reversible implementation tradeoffs from measured evidence and record them in the PR. These protected choices require actual sponsor/security/finance authority **only when they become prerequisites**:

| Trigger | Decision required | Authorized fallback |
|---|---|---|
| **Before 014-C AWS write** | Verified C01-K live trust, dev account/Region, least-privileged bootstrap, cost ceiling, viewer gate and API/WAF selection | Remain source/template-only; no default `cdk diff` change-set calls, bootstrap, deploy, DNS |
| **Before 015-A admission implementation** | Guest/token/session/owner entitlement and expired/lost principal recovery, no compulsory sign-up | Synthetic dev can use explicitly limited invited tester accounts, not real participants |
| **Before 015-B persistence** | Minimal retention/deletion/backup, concurrency/reconciliation windows and read consistency, cost access patterns | Hold persistent writes; validate pure domain variants locally |
| **At 016-D T1/T2** | Revisit Option B noncorrection vs protected V from canonical owner | Keep explicit synthetic noncorrection and test it, never silent amount edit |
| **Before 018-D claim** | Independent black-box semantic, access, fault/recovery, cost, usability limitations, disclosed correction limitation | HOLD candidate, repair failed contracts |
| **Before any 019 production** | Separate prod account, public DNS/cert control, deployment human approval, operational budget and rollback | Keep private synthetic candidate only |
| **Before real people or external release** | R-P02 eligibility/privacy/household safeguards, R-P03 protected disclosure audience/linkability/repeated-release assessment, R-P04 scientific honesty | Public informational shell only with backend intake/release denied |

**Promotion rules:** 018 PASS cannot automatically authorize 019; 019 public site cannot authorize real user submission; a protected guest session does not establish Contribution Stewardship standing, guardianship, Revision rights, or research/disclosure.

## 5. Phase closure, pacing and repository hygiene

Agents may progress between accepted subpackages *without another architecture workshop* when all declared dependencies and prior human grants are satisfied. They must **stop at a new permission class**, missing dependency, owner conflict, high-severity negative-test failure, irreversible migration, cost change or policy/legal decision. A milestone cannot be considered “complete” if a required dependency is `UNKNOWN`.

Prefer small working vertical increments (one protected web ingress, one authenticated record, one end-to-end report/inspect) to infrastructure/abstraction scaffolds. Retain one frontend package until a justified service split; derive TypeScript domain tests from canonical behavior rather than mirroring internal function signatures. Add only minimal server boundaries; do not simultaneously invent a separate event bus, generic microservice host, data lake, analytics platform, bespoke OAuth server, GraphQL gateway or permanent all-purpose MCP test platform.

**Documentation ownership:** this roadmap is the only delivery sequencing truth. [013-F](013-f-agentic-independent-test-control.md) remains agentic methodology, [013-E](013-e-concept-to-mvp-realization.md) remains behavior/acceptance, [013-G](013-g-architecture-mvp-delivery-decision.md) remains the conditional architecture ADR, and `aws-backbone` owns sensitive IAM trust changes. Update the smallest existing phase entry/exit on meaningful transition and source-code self-documentation for exact APIs/configuration. No new document for every commit, status check or defect.

**Review snapshot must be refreshed** after open PR #109 or companion #4 changes. Their current green PR checks and a successful historical apply are **not** the live C01-K negative tests, C02 budget decision, CDK bootstrap authorization or private deployed application.

**Program exit:** a reviewer can trace every claimed MVP behavior to one canonical purpose/action and independently verified synthetic AWS run; can demonstrate private tenancy, unknown outcomes, no implicit zero/disclosure, synthetic-only controls, bounded cost/abuse, rollback and explicit accepted omissions. Phase 018 produces a justified **candidate**, not a live-person production claim.
