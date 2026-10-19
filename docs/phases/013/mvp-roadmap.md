---
type: Engineering Implementation Roadmap
title: TreatFlow — Candidate AWS MVP Delivery Phases and Critical Path
description: Single engineering-delivery owner for authorized 014–018 packages and independently gated 019 public-release assessment, downstream of 013-G/H.
tags: [treatflow, aws, mvp, roadmap, engineering, implementation, critical-path, candidate]
---

# Candidate MVP Implementation Roadmap — Subject to 013-H

## Role, dependency and MVP meaning

This is the **single natural owner** for the future staged delivery program. [013-G architecture decision](013-g-architecture-mvp-delivery-decision.md) owns architecture selection and its risk register; [013-F](013-f-agentic-independent-test-control.md) owns agentic/test-control methodology; [013-E](013-e-concept-to-mvp-realization.md) owns MVP behavior and negative-test obligations. None of these replaces [canonical Observation](../../canonical/concepts/observation.md) or [Phase 012-E six safety gates](../012/012-e-treatflow-handoff.md).

**Only a separate, explicit 013-H decision can authorize the first bounded implementation work.** Merely planning a package or merging this roadmap does not permit cloud provisioning, feature coding, CI credential creation, public site launch or real participant data intake/disclosure.

**MVP candidate = protected nonproduction with synthetic users and independently evidenced O-only private recording/review**, plus any authorized small protected V correction slice selected under 013-G/H. Reports preserve person-vs-group, near-present vs interval aggregate, coverage/uncertainty, provenance, closure and unknown submission outcomes. S/R/D are not prerequisites; protected R/D release and actual real-person collection are out of scope. The whole five-concept *design family* is still adopted; staged implementation is not a new one-concept product.

## Planned package contract

For every implementation package, specify before work: **owner and review agent, exact phase/package ID, base commit SHA, allowed changed paths, linked canonical invariants, dependencies already evidenced, resource/permission budget, visible and independent negative tests, expected safe artifacts, rollback, and explicit HOLD conditions**. Packages progress through independent PR review and CI; no self-approved deployment. Package labels below are planning names and do **not** authorize execution or create packages automatically.

## 014 — AWS foundation, governance, protected nonproduction

| Package | Bounded deliverable | Dependencies / independent exit criterion |
|---|---|---|
| **014-A — Entry inventory and authority** | Verify AWS account ownership and region, Route 53/SkellyHouse zone, hosted names/collisions, approved cost ceiling, GitHub protection/permissions and test principals; baseline repository and security decision record | **013-H scope-limited permission**; evidence of accessible identities, region/zone, budgets and blockers. **No deployment** if ownership/permissions absent |
| **014-B — Single IaC owner and secure CI** | Selected CDK TypeScript stacks, exact environment separation, unprivileged PR checks, approved dev deploy role via OIDC, denial on prod assumption, budget/alerts and dry-run diff | Verified actual account/permissions, reproducible synth and negative role tests; production role not assumed by implementation agents |
| **014-C — Protected synthetic dev delivery** | Dev CloudFront/private S3 and secure viewer access, API Gateway REST API stage + regional WAFv2, Lambda health/auth stub with no real writes, synthetic-only isolated state and certificates where authorized | Anonymous dev SPA/asset and direct S3 denied; API custom/default domain both guarded; WAF stage attached; no public real-person intake, cross-account denial |
| **014-D — Minimal observability and cost safeguards** | Redacted structured logs, bounded retention, rate controls, budget alerts, deployment provenance, synthetic health metrics and rollback procedure | Evidence of failures, safe rollback, alert destination and bounded abuse; no claim budgets enforce immediate hard caps |
| **014-E — Foundation independent exit** | Reviewer checks exact deployed synthetic dev build/account/role, access denials, cloud resource inventory and operating-cost sample | PASS/HOLD with evidence; **production resources NOT launched merely because dev passed** |

**Blocked dependency:** 014-C cannot proceed until authentic dev access and WAF ownership are approved; DNS changes separately require actual zone owner consent. Private nonprod viewer-side gate is mandatory independently of OAC. Any single-account fallback needs explicit risk exception, not a presumed equivalence.

## 015 — Identity, private state and bounded API contracts

| Package | Bounded deliverable | Dependencies / exit |
|---|---|---|
| **015-A — Principal/entitlement acceptance** | Synthetic approved tester vs guest/private Observation principal, issuer/expiry/revocation, owner binding and legitimate access contract without compulsory account registration | 013-G/H scope selection, 014 protected dev; proof A cannot access B or cross environments |
| **015-B — Meaningful records, history and attempt contract** | O evidence/coverage/qualifier/lifecycle and action outcomes; optional narrow V assertion/links if approved; retention and minimization decisions; DDB access pattern/capacity proof | Canonical meaning first, physical keys later; explicit observed-zero, no exact-time invention, no last-write-wins contradictions; cost estimate reconciled |
| **015-C — Protected API and persistence realization** | Guarded REST API Lambda authorizers, per-account entitlement and conditional storage; idempotency/unknown reconciliation endpoints only if justified | WAF/direct-origin checks; wrong/expired/foreign/modified replay rejected, private data not CDN cached, no open registration |
| **015-D — Identity/state independent exit** | Negative tests of session theft/expiry, unauthorized access, duplicate/timeout, close-vs-report and data minimization | Independent verification and REST API cost/latency regression; architecture defect returns to natural owner |

**No private principal can infer household rights, Contribution Stewardship standing or authority to amend another party's data merely from token possession.** If future real enrollment is proposed, R-P02 remains a separate hard gate.

## 016 — Observation-first behavior and bounded correction

| Package | Bounded deliverable | Dependencies / exit |
|---|---|---|
| **016-A — Minimal private UI shell** | Accessible static-first frontend and safe state/outcome representation for test users | 014 protected dev and 015-A/C guarded API contracts; source asset publicly cached only if not private and permissioned |
| **016-B — Core report and inspection** | O.Establish, near-present / bounded interval O.Report, O.Inspect, honest unit, reported time vs server time and uncertainty display | E-T01/02/03/04/09/10 plus independently varied counts and intervals |
| **016-C — Coverage, qualification and lifecycle** | O.AssertCoverage, O.Qualify, O.Close and O.InspectAfterClose, completeness and contested overlap | E-T05–08/15/16; closed direct additions fail, watched zero requires all explicit qualifiers |
| **016-D — Protected private factual correction slice (conditional)** | If authorized, legitimate V.EstablishSubject → V.Amend → V.InspectHistory, immutable predecessor + reason and entitled view | Separate amendment authority tested. **If not authorized, no destructive O edits; 013-H sponsor must record explicit noncorrecting candidate limitation** |
| **016-E — Behavioral exit** | E-T01–E-T22 mapped to actual code/UX results with independent semantic/authorization variants | Full O-only primary private recording/review works without S/R/D; no false success, research claims or exposure |

**Not in MVP:** full S standing/contest lifecycle, R evidence provisioning, D public release, automatic research/statistics, household geolocation, child/visitor identities or mandatory signup. Absence of optional S does not invalidate a permitted Observation.

## 017 — UX, fault recovery, security and cost resilience

| Package | Bounded deliverable | Dependencies / exit |
|---|---|---|
| **017-A — Low-burden/accessibility** | Reporting under divided attention, keyboard/assistive semantics, group/unit/uncertainty comprehensibility, mobile/reduced-motion and failure feedback | Recorded accessibility checks; do not claim real human usability tested unless independently authorized |
| **017-B — Fault and concurrency** | Simulated timeout before/after write, identical retry vs new claim, contention, post-close denial, restore and history; bounded test fault injection | No duplicate loss hidden as success, no exactly-once fiction; R-P05/P06 protected limits honored |
| **017-C — Abuse, cost, observability** | REST WAF direct-origin burst tests, rate/identity denial, log redaction, retention, CloudFront cost comparison and alert/kill-switch exercise in synthetic dev | Demonstrated budget/alert response, guard/rate effect and no cross-environment escalation, not a zero-loss financial guarantee |
| **017-D — Independent stabilization exit** | Signed bounded risk and failure scorecard; performance under selected S0–S3 synthetic scenarios | Block MVP if semantic, privacy, auth, recovery, operational guard or code-release regressions unresolved |

## 018 — Independent synthetic MVP candidate qualification

| Package | Bounded deliverable | Dependencies / exit |
|---|---|---|
| **018-A — Test authority and reproducibility** | Frozen canonical baseline, exact release SHA, independent fixture versions, separate holdout evaluator and synthetic-only access | Reviewer cannot be implementer self-approving; sealed variants are outside implementer context |
| **018-B — Behavior and safety qualification** | Replay 013-E E-T01–E-T22, additional unknown-outcome, observed-zero, cross-account, private dev and API WAF negative controls | No critical false positive, unauthorized data exposure, bogus arrival stream or public research/release; evidence insufficient = HOLD |
| **018-C — Operability, performance, cost and rollback** | Measured latency, simulated Halloween burst, budget/throttle/log/cold-start scenarios, access incident and immutable rollback | Compare actual observed against sponsor-approved targets; unapproved financial assumptions cannot be declared passing |
| **018-D — Independent candidate exit** | Consolidate design traceability, security findings, exceptions, evidence and independent PASS/HOLD | A PASS means **synthetic-only protected-nonprod MVP candidate**, not permission to admit public real participants |

## 019 — Public production delivery and real-operation decisions (conditionally later)

Later separate design and independent approval: validate SkellyHouse DNS, public CloudFront site, regional API protection, deployment role and human approval, incident/on-call and financial safety, plus participant eligibility/guardian/household/privacy R-P02 and independent data-release R-P03 when applicable. It may permit an informational static public shell while disabling data intake server-side. **No runtime production intake, exposure or release approval follows from 018 or the existence of a public hostname.**

## Dependency and parallelism summary

`013-H authorization → 014-A → 014-B → 014-C → 014-D/E → 015-A/B → 015-C/D → 016-A/B/C → [016-D only if approved] → 016-E → 017-A/B/C/D → 018-A/B/C/D`.

Permitted design overlap **after explicit authorization**: 015-A/B contract reasoning may run while 014 infrastructure work proceeds, and independently tested UI fixtures may be drafted before full backend integration. No 015-C deployment before protected 014 foundation; no 018 verdict before independently qualified 016 and 017; no public launch automatically from any phase.

**Critical path failure branches:** unresolved actual account/DNS control → infrastructure HOLD; unapproved total cost or API WAF plan → paid/production resource HOLD; no legitimate private guest/session entitlement → Observation service integration HOLD; inability to establish correction rights → protected V slice HOLD and explicit candidate limitation; missing independent review/holdout authority → 018 PASS HOLD.

## Agentic workflow, testing and decision integrity

Cursor and Codex may alternate implementing and reviewing bounded PRs, but need genuinely separate roles and contexts, unprivileged PR CI and strong human release authority. Use [013-F](013-f-agentic-independent-test-control.md) rather than copying its policy into each phase. The nonprod MCP-compatible control plane begins as **small CI/CLI-attached synthetic run/health/fixture adapter**, introduced only after permitted 014/015 resource boundaries are proven. Broader fault injection and sealed evaluator capabilities follow only as justified in 017/018, never general AWS shell, IAM, SQL, approval, production-data or disclosure tools.

Every phase exit records exact HEAD/build, AWS stage, verified role, real authorization and cost evidence, failed and not-run negative tests, and canonical owner links. Unverified or inconclusive is **HOLD**, not PASS. A success metric visible to the implementation agent may be known, but its independently varied test instances need not be disclosed.

## Risk/retention/operational invariants

R-P01 low-burden experience, R-P02 real-person participation privacy, R-P03 external disclosure safety, R-P04 scientific honesty, R-P05 recovery and uncertainty, and R-P06 factual history/recipient exposure remain separate obligations. No cost reduction, shortcut, required registration or new data field may silently overwrite these. Where implementing evidence reveals a product contradiction, reopen the relevant canonical concept/mapping through authorized governance rather than reinterpret it in code.

**Status: DELIVERY ROADMAP PROPOSED FOR 013-H REVIEW, NOT EXECUTABLE AUTHORIZATION.**
