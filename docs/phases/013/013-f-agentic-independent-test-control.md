---
type: Engineering Agentic and Test-Control Design
title: TreatFlow 013-F — Autonomous Development, Independent Verification and Nonproduction Test-Control
description: Bounded Cursor/Codex implementation-review roles, independent evidence and holdouts, governed CI, least-privilege synthetic-only MCP test plane, and explicit authorization gates.
tags: [treatflow, phase-013, engineering, autonomy, cursor, codex, mcp, ci, verification, synthetic, security]
sources:
  - id: github-environments
    resource: https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments
    title: GitHub Actions — Deployment environments, protection rules and plan restrictions
  - id: github-oidc
    resource: https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws
    title: GitHub Actions — Configure OpenID Connect in AWS
  - id: github-rulesets
    resource: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets
    title: GitHub — Ruleset policy and required verification
  - id: mcp-auth
    resource: https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization
    title: MCP — Authorization and resource server requirements
  - id: mcp-auth-security
    resource: https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations
    title: MCP — Token audience binding, least privilege and security considerations
---

# 013-F — Autonomous Development, Independent Verification & Nonproduction Test-Control Architecture

## 1. Source, intent, and qualified decision

**013-F DESIGN PASS WITH IMPLEMENTATION/ENFORCEMENT DEPENDENCIES; PENDING MERGE.** Source: Phase 013-E merged via PR #98 at main commit `e061550e970cb36a09122c1b5d92260c742aedb3`. This is an architecture and governance **design**, not an implemented, installed, or tested agent/MCP system. [013 phase definition](phase-definition.md), [013-E realization and negative tests](013-e-concept-to-mvp-realization.md), [013-C AWS trust boundaries](013-c-aws-environment-deployment-trust.md), [013-D abuse economics](013-d-aws-finops-operational-economics.md) and [012-E safety handoff](../012/012-e-treatflow-handoff.md) control scope. [Shared agent governance](../../methodology/agentic-development-governance.md) and root `AGENTS.md` remain existing rule authorities: **do not create a competing agent-policy corpus**.

TreatFlow's MVP candidate is evaluated on **protected synthetic nonproduction**, not on public real-person participation. The AWS accounts, Route 53 names, GitHub environments, branch protection, actual Cursor/Codex execution facilities, MCP implementation, CI checks, budgets and secrets have **not** been independently inspected or configured by 013-F. Do not describe proposed controls as active. Requirements for production and actual real-person processing/disclosure remain separate R-P02/R-P03 decisions.

**Decision principle:** agent automation may propose, implement, exercise narrowly permitted synthetic tests and produce evidence; it may **not** grant itself wider authority, assert independent approval based on its own tests, change production policies or deploy without approved human/technical gates.

## 2. Delegation and agent work isolation

| Role / principal | Default work and permission | Independence boundary |
|---|---|---|
| Human sponsor / product authority | Confirm scope, protected business decisions, budget ceiling, accepted risks and explicit phase authorizations | Cannot be replaced by a passing CI job, agent vote, PR merge or MCP call |
| Implementation agent (Cursor or Codex) | After 013-H, implement **one authorized bounded package** on its own branch/worktree with least relevant docs and synthetic data | No protected production/deployment privileges; may author visible unit/contract tests, not final acceptance verdict |
| Independent review agent (the other tool or separate isolated agent run) | Start from exact PR diff + current canonical contracts; test design traceability, security boundaries, invariants and code quality; suggest findings | No edits to the candidate branch while judging; no inherited implementer scratchpad or hidden holdout expected outputs; different model alone does not guarantee independence |
| CI validator (unprivileged for pull requests) | Lint/format/compile, dependency policy, secret scan, static security checks, bounded contract tests, docs/reference checks | No AWS role or secrets for untrusted PR code; no automatic acceptance from self-generated test artifacts |
| Independent test controller/verifier | Authoritative synthetic fixtures, behavior-based black-box evaluation, negative-control/holdout tests and safe nonprod metrics | No write to product code or production environment; owns separate evidence/fixture authority and independently interprets results |
| Human release authority | Approve protected merge, environment configuration, production release/rollback and exceptional actions according to actual GitHub/AWS protections | No agent may self-approve or override R-P02/R-P03 |

**Pairing convention:** Cursor implement → Codex review → separate CI/test verifier, then reverse roles on later packages where appropriate. For a contested PR, either side may demand a second independent review. Never claim rotation proves independence by itself: require role-specific credentials, fresh bounded context, separate authored evidence and protected approvals. If only a single operator can supply human review, document that staffing limitation, use automated non-bypass controls, and keep production approval **HOLD** where required independent human review cannot actually be obtained.

## 3. One-package autonomous implementation contract

Future authorization grants **exact scope**, not an open-ended "implement the app" mandate. An authorized package contains:

- **Identity:** phase/package ID, linked canonical purpose/concept/action owner, exact PR base SHA, expected changed paths, semantic outcome and explicitly deferred scope.
- **Entrypoint:** minimal file set from `docs/index.md`, relevant current owner(s), [013-E](013-e-concept-to-mvp-realization.md), applicable risk/architecture record and `AGENTS.md`. Historic design evidence only when necessary; no context flooding.
- **Permitted edits:** explicit owned paths, allowed dependencies/infra/resource budget and disallowed public API, DNS, release, new user-data field and protected action changes. Novel abstraction requires justification against existing owners.
- **Acceptance contract:** openly known functional invariants, safety requirements, error/unknown outcomes, observability and expected negative cases. Reviewers have separate *unreleased* holdout fixtures to reduce superficial overfitting; never conceal material product safety requirements.
- **Execution controls:** isolated branch/worktree, bounded resource/time tokens/cost and iteration count, no uncontrolled loops or merges, pause on scope drift, repeated failing tests, authentication ambiguity, unexpected cost or contradictory canonical authority.
- **Artifacts:** exact commit SHA, dependency/IaC change inventory, visible tests executed, exceptions, potential sensitive-data and privacy effects, code review findings, negative-test evidence, change/rollback strategy and unresolved decisions.
- **Human go/no-go:** PR approval and independent checks for merge; environment-specific deployment permission is **another** authorization, not entailed by merge.

A package is not complete solely because the implementing agent says tests pass. If the proposed implementation changes Observation semantics, protected authority or capability scope, stop and reopen the **natural canonical owner** rather than implicitly granting new product behavior.

## 4. PR, CI and GitHub/AWS enforcement architecture

**Recommended future protected default branch** (do not assume currently enabled): no direct pushes, force-pushes or deletion; require PR and up-to-date required checks; independent code review appropriate to staffing; resolve conversations; restrict bypass/administrator exceptions; protect workflow files, `AGENTS.md`, IaC, identity/authorization code and test-controller policy from unilateral changes. Do not add `pull_request.paths` restrictions that make a required universal knowledge validation check disappear on certain changes.

Separation of pipelines after 013-H:
1. **PR checks** run no privileged AWS deployment credentials. Run documentation/OKF link and frontmatter checks, dependency/license and secrets/SAST checks, compile, unit/contract tests, security-negative checks and IaC validation when their code exists. Use read-only token permissions, pinned actions/dependencies where justified, fork-safe event semantics and no access to protected holdout secrets. Don't use untrusted `pull_request_target` workflows to execute head code with secrets.
2. **Nonproduction release** uses immutable artifact from reviewed SHA, dedicated AWS dev role through short-lived GitHub OIDC, protected synthetic-only service and an auditable pipeline. Test-controller access follows separate principal and scopes, not the deploy role.
3. **Production release** uses a different AWS account/role and GitHub deployment environment with required human review and branch rules where the actual repository plan supports these controls. OIDC audience/subject must match the observed GitHub token form. GitHub documents different default `sub` shapes for environment versus branch, and immutable-ID claims for eligible repos created after July 2026 or opted in; verify **actual** subject policy rather than hard-code the wrong format. Use protected environment branch restrictions and self-review prevention if available. If required reviewers are unavailable for a private repo/account plan, **HOLD** production automation or provide independently enforceable approval outside GitHub; do not declare protection active.
4. **Agent autonomy circuit breakers:** an agent cannot edit/disable the required checks or test policy and then count their absence as passing. Independently approved security-sensitive workflow/IaC changes trigger validation. Never give general `id-token:write` or cloud deploy privilege to every PR validation job.
5. **Merge-to-deploy chain:** verified original SHA/artifact signature or digest → protected reviewer verdict → deployment role assumption → exact environment changes → nonproduction denial tests → monitor/rollback. A failed/undetermined check is not automatically green; report the actual pending/failed state.

**Current evidence limitation:** GitHub required-check list, branch ruleset effectiveness, Actions environments/reviewer eligibility, Actions workflow inventory, CI provenance and AWS OIDC roles have *not* been verified in this phase. Search snippets alone cannot prove these settings exist. Actual readiness requires an authorized configuration inspection and negative access tests.

## 5. Nonproduction MCP test-control plane: justified, bounded design

**Recommendation:** establish a **thin nonproduction-only test-control adapter** during approved Phase 014/015 work, with fuller fault-injection and held-out independent test capabilities in 017/018. Treat MCP as a transport/client interoperability option, not a reason to build an always-on orchestration platform. First qualify that the chosen agent clients can access the transport securely; a CLI/CI runner over the **same narrow operations** may be cheaper and simpler. Do not run an unauthenticated, public write-capable MCP server.

The controller interacts with **application-visible behavior and approved test-specific interfaces**; it is not a privileged bypass that silently patches the database. Model the following proposed test-plane concepts (NOT product concepts): `TestRun` (scope, owner, time expiry, budget), `SyntheticFixture` (version/provenance), `Invocation` (permitted command and target), `Observation` (redacted health/response/trace evidence), `FaultScenario` (approved bounded injection), `Attestation` (run/env/build identity and fixture hash). Keep a single owner for these operational testing objects; no new copies of TreatFlow's current concept specifications.

### Narrow capability/authorization matrix

| Proposed MCP/runner operation | Reader / implementer | Independent verifier | Protection and evidence |
|---|---|---|---|
| `get_environment_identity`, `get_health`, `get_metrics_summary` | Yes, sanitized synthetic-only views | Yes | Verify dev AWS account/stage, build SHA, tool schema version; no production response, token or identity leakage |
| `start_synthetic_run`, `seed_synthetic_fixture` | Narrow authorized dev namespace only | Narrow held-out namespace only | Trusted fixture catalog, unique run prefix, quota, TTL, operation audit; reject real or foreign data |
| `invoke_test_action`, `inspect_synthetic_result` | Authorized visible synthetic scenarios | Independently controlled test scenarios | Use product authentication/entitlement rather than writing directly to DynamoDB; prove expected denials as well as allowed effects |
| `inject_fault`, `reset_synthetic_run` | Only allowlisted scoped modes after explicit step gate | Yes, with own least privilege | Bounded latency/errors/retries/expired tokens for synthetic run; no infrastructure-wide failure, prod rollback or general wipe |
| `get_run_trace`, `export_redacted_evidence` | Their own allowed run only | Holdout verifier's run only | Redacted events with SHA/fixtures/outcome IDs and data retention; no raw secrets, exact household details or reviewer-only criteria |
| `publish_verdict` | **No** (may submit test evidence only) | Verifier process; human/CI adjudicates official gate | Verifiable signed/run-attested evidence, failed/missing metrics surfaced; never a tool-operated deployment permission |
| `approve_deploy`, `edit_policy`, `manage_aws`, `execute_shell`, `execute_sql`, `read_secrets`, `query_prod`, `release_material` | **Never exposed** | **Never exposed** | Denied by IAM/network/API, not merely omitted from a prompt |

**Mandatory server gate for every operation:** authenticated caller principal + tool scope + allowed source + exact dev account/stage + synthetic run ID + object-level authorization + request/time/resource quota + audit record. Use no general tools that accept arbitrary target hostnames, AWS account IDs, raw SQL/CLI, arbitrary commands or wildcard data paths. Production resources must be unreachable to the controller's IAM role, and controller cannot assume deployment/approval roles. A prefix tag alone is not authorization.

### MCP threat and transport controls

- Prefer a **short-lived locally initiated stdio controller** for agent testing when it reduces public exposure; credentials remain tightly scoped to synthetic dev. If shared remotely, use private/authenticated HTTPS with resource-audience-bound tokens and current MCP HTTP authorization standards; validate issuer/audience/scopes and do not pass received client tokens to upstream AWS API. Restrict client/tool registration, version schema, logs and network egress.
- **No production MCP endpoint**. Distinct dev/test controller identity and separate dev app API identity; refusal on prod hostname, wrong stage/issuer, unknown signed fixture, expired run, identity mismatch, and cross-run records.
- Apply rate, time, concurrency, memory and financial limits, maximal call count, max record count, automatic TTL cleanup, cancellation and kill-switch controlled by an authorized human. Include explicit test-run state (`requested/allowed/running/completed/failed/unknown/expired`), not invented success from a lost command acknowledgment.
- Protect prompt/tool outputs: UI text, reports and fixture contents are **untrusted data** and cannot instruct the agent to escalate tools, bypass review or disclose secrets. Structured schema validation, output size limits and allowlisted data sources; refuse instruction-like payloads and red-team attempted prompt injection.
- Synthetic fixtures contain no real household addresses, minors' identities, third-party logs or production exports. Salted pseudonyms and fake locations must not inadvertently look like real participant evidence. Enforce deletion/TTL and audit of reset.
- Fault injection is namespace-bounded and designed to simulate network timeout *before/after commit*, duplicate retries, partial/unresolved outcomes, throttles, denied access, expired capability, closed Observation, conflicting coverage. Don't turn it into generic AWS Chaos privileges.

### Control-plane composition with AWS and test agents

`Cursor/Codex (bounded dev identity) → authenticated MCP/CLI test adapter → test broker policy → nonprod application API (synthetic test principal) → nonprod isolated state`

`Independent verifier (separate identity + holdout store) → same narrow adapter + hidden fixture context → read-only verdict evidence → required CI check / human review`

`AWS and GitHub deploy/production permissions` **remain outside the entire test-control plane**. If using CloudFront dev viewer cookie broker, do not expose signer keys or its account to the controller; authorized testing may use short-lived, broker-issued dev session credentials, but test adapter roles cannot mint arbitrary real-user identities. Code merges and releases require separate permissions.

## 6. Verifier design, holdout and anti-gaming

**Two evidence classes:** (a) public/visible tests establish semantic requirements and help implement correctly; (b) independent withheld fixture variations, adversarial access attempts and unknown-outcome scenarios detect overfitting. Withholding is **not** permission to keep required behavior, privacy policy or pass criteria secret. A test author with access to the hidden corpus must not commit it in normal application docs, test fixtures or implementation agents' context.

- Holdouts stored **outside the implementer-visible repository and agent workspaces**, with separately controlled read rights, version pin/hash, retention and authorized rotation. Do not put hidden fixture plaintext in a PR, public Actions artifact, chatbot context or MCP `tools/list` metadata. Where source confidentiality cannot be ensured, mark evaluation as *visible*, not independent/hidden.
- Independently run 013-E's 22 scenarios and additional variants: `NOW · TOTAL(4 people)`, interval totals, observed-zero completeness, group vs person, contested overlap, owner A→B denial, prod→dev principal denial, fake claim/timeout-retry, concurrency, post-close write denial and no R/D release. Measure false positives, false negatives, latency/cost and evidence accuracy; no narrow test that simply checks one hard-coded string counts as semantic proof.
- Vary quantities, units, temporal boundaries, participant contexts, overlap patterns, attempt IDs, auth histories and negative inputs without changing the canonical invariant. Test production-intake-disabled and direct API/WAF bypass concerns from 013-D as **adversarial synthetic denials**.
- Use independent reviewer judgment for security/product defects that deterministic scoring misses. Agents can propose fixes but cannot see held-out expected output or overwrite holdout evidence. Tests authored by an implementer are *supporting* evidence, never solely the exit criterion.
- Evidence includes canonical owner and version, run ID, preconditions, exact build/deploy SHA, request/ref correlation (redacted), observed application response, backend-safe audit status, test-controller version, trace integrity and verifier decision. Missing or ambiguous evidence is **INSUFFICIENT EVIDENCE/HOLD**, not a pass.
- Negative controls include deliberate malformed input, unauthorized record access, duplicate attempts, direct-origin bypass, forged callback, forged MCP tool output instructing escalation, and agent attempts to skip checks. A safety-negative must fail reliably; avoid scoring only happy-path counts or superficial UI output.
- Evaluation baseline/thresholds must be justified, not manipulated to reach a milestone. Independently rerun flaky cases and document nondeterminism. No score inflation for rerunning until green without evidence or for excluding failed tests as `non-applicable`.

## 7. Proposed phase-specific realization and acceptance gates

| Phase | Agentic/test-control deliverable once authorized | Required qualification |
|---|---|---|
| **013-F** | This *design record only*: role contract, security boundary, candidate tool matrix, CI and holdout plan | No application code; 013-G resolves costs/tools/authority |
| **013-G/H** | Select minimal tool and CI topology with IAM, cost, repo protection, exact design unknowns and authorization | **HOLD** if no enforceable separation, safe origins or accepted budget |
| **014** | Implement foundation, protected branch/environment CI, synthetic-only dev, initial health/test-run adapter *if justified* | Fail test proving prod assumption, direct API bypass, unsigned dev content, unauthenticated adapter or PR privilege |
| **015** | Identity/entitlement and typed contract tests; synthetic fixture runner connected through private API | Owner A/B and env denial, token expiry, unknown outcome, no public participant data |
| **016** | Seven O behavior paths, accessible UI and supported synthetic fixtures | Visible behavioral regressions plus independently held semantic variants |
| **017** | Bounded fault injection, trace/metrics, concurrency/retry/accessibility and cost protection | Recovery and false-success tests, abuse circuit breakers, log redaction, kill-switch tests |
| **018** | Independent sealed holdouts and adversarial end-to-end qualification | Human/verifier signed PASS/HOLD for **synthetic nonprod MVP candidate**, not real-data/public-launch approval |
| **019** | Separate production/public-shell release and safeguards gate | Human review of actual release controls and R-P02/R-P03 before any corresponding real operation |

## 8. Decision ledger: blockers, deferrals and Phase 013-G inputs

| Decision | 013-F disposition | Blocking evidence before implementation/production |
|---|---|---|
| Cursor/Codex alternation | **Preferred**, no automatic independence | Independent context/roles, protected PR checks, reviewers with actual authority |
| MCP vs CLI/CI | **Narrow MCP-compatible synthetic test plane recommended conditionally**; build only after 013-H authorizes minimal package | Confirm client/transport compatibility, dev access, cost, tool threat model and runtime authorization |
| Agent-owned CI/tests | Allowed as supporting checks | Independently evaluated acceptance + confidential negative controls |
| Production deploy privileges | Explicitly **excluded** from agent and controller | Actual GitHub/AWS reviewer/branch/environments/STS protections, with plan eligibility verified |
| Test controller environment | **Dev synthetic only**; no prod deployment/test interface | Resource-level IAM deny and independent negative-access proof |
| Hidden success criteria | Hold back **test instances**, not important success requirements | Separate store/identity, no leak to implementer or public artifact |
| AWS cost ceilings, direct API origin abuse | Open from 013-D | Accepted estimate, bounded exposure, chosen secured ingress at 013-G/H |
| Mandatory registration vs O-only, minimal V correction | Open from 013-E | Sponsor-backed decision preserving purpose; HOLD if unresolved |
| Real participant collection / material release | Unapproved, independent protected gates | R-P02/R-P03 competent authorization; no agent or environment can grant it |

**013-F EXIT: PASS FOR BOUNDED AUTONOMOUS DEVELOPMENT/TEST-CONTROL DESIGN WITH IMPLEMENTATION AND INDEPENDENCE VERIFICATION OUTSTANDING. 013-G NEXT ELIGIBLE AFTER REVIEW/CHECKS/MERGE.** Phase 013-H is still required before *any* application/CI/controller/AWS implementation. Existing `AGENTS.md`, `CLAUDE.md` and Cursor rule remain the agent-instruction owners. Phase 013-G must turn unresolved design alternatives into explicit selected/approved decisions; no invented proof of active protections.

## 9. S-75 read-only GitHub permission evidence checkpoint — 2026-10-23

**Classification: observed source-only inventory / INCOMPLETE / HOLD.** This checkpoint supports [S-75](https://linear.app/s-kelly/issue/S-75) without modifying the historical 013-F design verdict. Read-only GitHub API observations were made against TreatFlow main at `01b2001fd0b40686b231171d91356080e91fb577`; neither a successful CI job nor the current GitHub connector's access establishes effective permissions for a future production reviewer, collector, publisher, or deployment identity.

| Read-only probe | Observed result | Permitted inference / unresolved requirement |
| --- | --- | --- |
| `GET /repos/SethDKelly/TreatFlow/git/ref/heads/main` | Main ref at `01b2001fd0b40686b231171d91356080e91fb577` | Repository baseline for this checkpoint only; re-read before any later decision. |
| `GET /repos/SethDKelly/TreatFlow/rulesets` | Returned an empty array to this integration | No rulesets were visible through this response; this **does not** prove the absence of all effective branch controls or bypass permissions. |
| `GET /repos/SethDKelly/TreatFlow/branches/main/protection` | HTTP 403: `Resource not accessible by integration` | **UNKNOWN / HOLD** for classic branch protection, required reviews/checks and bypass rules. Do not infer unprotected or protected main. |
| `GET /repos/SethDKelly/TreatFlow/contents/.cursor` | `.cursor/BUGBOT.md` and `.cursor/rules` visible | A repository instruction file is not evidence of Bugbot installation, effective transport, actor identity or reviewer independence. Bugbot qualification remains **UNKNOWN / HOLD**. |
| Draft PR [#121](https://github.com/SethDKelly/TreatFlow/pull/121) | Exact head `b08ac68bad683b7dd0222bfbf19260f09b04a12c`; [CI 39991749268](https://github.com/SethDKelly/TreatFlow/actions/runs/39991749268) succeeded | This is CI evidence for the offline S-78 candidate, **not** proof that its checks are required by branch protection or that a trusted provider collector exists. |
| Draft PR [#122](https://github.com/SethDKelly/TreatFlow/pull/122) | Exact head `043856590d33e75aa10eef66dc848d257679ff13`; [CI 40049750450](https://github.com/SethDKelly/TreatFlow/actions/runs/40049750450) succeeded; Codex no-major-issues and Cursor documentation PASS observed on that head | This is source-only review evidence, **not** independently authenticated provider identity or a security-activation decision. |

**Denied/unknown evidence is not a passing security control.** This integration cannot read main's classic protection settings; no privileged credential, AWS/IAM operation, branch-rule mutation, live provider dispatch, webhook, collector, or status writer was used. An authorized administrator or independently permitted read-only identity must supply current branch/ruleset/required-check/bypass evidence, followed by a source-linked effective-principal matrix, safe negative controls with separately authorized test identities, and independent S-75 security disposition. No live activation is authorized by this checkpoint. S-77 remains Verification/HOLD; S-78 acceptance and S-79 integration remain blocked by their stated dependencies.
