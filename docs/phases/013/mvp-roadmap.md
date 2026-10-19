---
type: Engineering Implementation Roadmap
title: TreatFlow — Candidate AWS MVP Delivery Phases
description: Proposed gated engineering realization through an independently assessed observation-first MVP candidate.
tags: [treatflow, aws, mvp, roadmap, engineering, candidate]
---
# Candidate MVP Implementation Roadmap — Subject to 013-H

## MVP candidate boundary
The candidate delivers **eligible participant private observation/reporting and inspection** with honest people-versus-group, time precision, monitored/unknown coverage and report outcome semantics. Privacy/identity protection, recovery, accessible feedback, safe error handling, budget guardrails and environment isolation are integral. The five concepts remain in the adopted *design family*, but S/V/R/D do not have to participate in every O report. Positive research findings, public dashboards, bulk disclosure, statistical Poisson claims, mandatory shared/community participation and real operational approvals are **not** MVP commitments.

Define **MVP candidate** as deployed to protected nonproduction with synthetic data and independently verified acceptance evidence. A production-ready or public-live-data release is a *different* gated decision.

## Proposed implementation phases
| Phase | Deliverable | Exit test / block |
|---|---|---|
| **014 — AWS foundation and environments** | Approved IaC, distinct nonprod/prod infrastructure definitions; S3+CloudFront, DNS/certs, IAM, budgets, secrets, alarms, gated preview and deployment pipeline | Nonprod isolation, denial and cost controls tested; production changes separately approved; no real data |
| **015 — Identity, protected state and contracts** | Selected participant authentication/entitlement, typed observation records, retention/recovery decisions, serverless API and access enforcement | Denial on cross-participant access; failure/retry and no-data-leak checks |
| **016 — Observation core** | O.Establish/Report/Qualify/AssertCoverage/Inspect/Close/InspectAfterClose realization and private UI; interval/group/time/coverage accuracy | Canonical semantics regression using synthetic fixtures and negative examples |
| **017 — Experience hardening and resilience** | Low-attention flows, accessibility, uncertainty/error feedback, idempotency/retry strategy, safe logging and operational protections | Recovery and adversarial/assistive evaluations without false claims of empirical usability |
| **018 — Nonproduction MVP qualification** | Independent end-to-end test corpus, negative controls, abuse/load/cost checks, vulnerability and permission assessment, ops readiness | **MVP CANDIDATE PASS/HOLD**, defects tracked, no public live-data operation presumed |
| **019 — Public production release decision (separate, conditional)** | DNS/CloudFront public deployment review and approvals, operational/incident policy, real participant safety approvals | May remain HOLD indefinitely; public static informational shell is separable from authorization to collect/process data |

## Parallelism and agent boundaries
014 environment/IaC and 015 domain/contract design can proceed separately **only** after their actual dependencies and authority are approved. 016 integrates on verified contracts. 017 evaluates reliability and human-facing behavior. 018 independent reviewer uses concealed holdouts/negative-control scenarios and inspects provenance, rather than approving merely because tests authored by implementation agents pass. Cursor/Codex may implement bounded PRs only after explicit authorization; do not allow one agent to self-approve or bypass branch protection. Narrow PRs, deterministic fixtures, automated checks, rollback and audit are required.

## Nonproduction test-control plane candidate
Evaluate a restricted MCP or equivalent testing adapter able to trigger synthetic-user actions and read safe health/error/cost/latency metrics, not production data or protected approvals. Require separate credentials, audited actions, limits, kill switches and independent negative-case evaluation. Phase 013-F must decide whether this is justified by MVP complexity; do not create a speculative server by default.

## Exit guardrails
R-P01 usability, R-P02 real-person collection legality/privacy, R-P03 disclosure protection, R-P04 scientific validity, R-P05 recovery and operator load, R-P06 historical corrections and exposed copies remain traceable. No cost, scheduling, or early MVP convenience may erase the six obligations or turn a public hostname into permission to ingest participant information.
