---
type: Engineering Phase Entry Contract
title: TreatFlow 014-A — Authority, Environment Inventory and Cost Preflight
description: Documentary-only entry gate to resolve AWS and GitHub actual authority, architecture cost, DNS ownership and protected implementation sequencing.
tags: [treatflow, phase-014, entry, inventory, aws, finops, github, authorization]
---

# 014-A — Repository & AWS Authority Inventory, Cost and Dependency Preflight

## Eligibility and non-executable scope

**014-A NEXT ELIGIBLE AFTER [013-H](../013/013-h-independent-exit-authorization.md) IS MERGED; NOT EXECUTED OR EXITED.** Read [canonical and lifecycle entry](../../index.md), [G architecture baseline](../013/013-g-architecture-mvp-delivery-decision.md), [MVP delivery roadmap](../013/mvp-roadmap.md), and [Phase 012-E safeguarded obligations](../012/012-e-treatflow-handoff.md). The independent 013-H decision permits preparation and factual inventory only; cloud writes, new executable CI/IaC/app/MCP code, user intake and disclosure are **not authorized**.

## Evidence to collect without secrets

| Authority surface | Minimum verification and required outcome | Status at 013-H |
|---|---|---|
| GitHub project | Exact HEAD, repository visibility, effective `main` protection/rulesets, branch bypass, named required checks, trusted CI workflows and permissions, reviewer availability, environments/approved approvers | **Partial**: public repo/HEAD known; protections and deploy environment rules **unverified** |
| AWS environment | Authorized ownership/control, dev/prod account isolation, target Region, identity/role and short-lived access feasibility | **Unknown**: no AWS connection or account-side evidence |
| Domain and TLS | Actual authoritative SkellyHouse DNS hosted zone/delegation, collisions, change rights, certificate region and intended production/dev/API names | **Unknown**; do not alter existing www services |
| Cost and spend rights | Full S0–S3 architecture total for REST API+WAF, Lambda/DynamoDB, private dev broker, CloudFront choices, logs, auth, DNS, backups, two accounts; owner-accepted budget/alarm recipients | **Unknown**: old estimates were partial; $50/$150 hypotheses unapproved |
| Admission/privacy | Synthetic-only tester entitlement, private frontend, independent API policy, no public writes; non-mandatory participant registration | **Design candidate only**, not deployed or tested |
| Amendment and continuity | Product-owner decision on protected V slice vs explicitly noncorrecting synthetic MVP; no destructive O count edit | **Decision pending** |
| CI/verification | Independent implement/review pairing and holdouts, route-by-route negative tests, deployment rights separate from PR checks | **Design only**, enforcement unverified |

Data handling: no AWS account numbers, raw DNS management credentials, IAM access keys, secrets, private household addresses or real participant data in public repository notes. A future explicitly authorized read-only connection may provide sanitized evidence; **none is assumed**. Do not interpret refusal/absence as success.

## 014-A permitted work products

One concise source-linked **inventory and issue register** at its natural owner, a reviewable access/decision checklist for the sponsor, a documented scoped 014-B proposal naming exact paths, requested permission roles and financial exposure, and a PASS/HOLD assessment of readiness to seek **separate** 014-B authorization. Prefer updating this entry contract rather than creating redundant logs. Record which facts are user-attested versus connector-verified. Any proposed AWS API read requires an appropriate owner-granted read-only connection before execution; no guessing.

## Mandatory 014-A stop / exit conditions

**STOP** on demand to: alter AWS, DNS, certificates, auth, bills, GitHub protected policy, deploy role or environment; create product code/CI/CDK/MCP services; create synthetic accounts against a public service; reuse live participant data; or assume production approval. Document the requested action and route it to the sponsor as a distinct authorization decision.

**Exit criterion (future):** verified or explicitly unknown environment and GitHub inventory; full-cost modeling plan, explicit human decisions still needed, production and dev access denial requirements, scoped 014-B candidate and independent evidence review. `UNKNOWN` and `NOT TESTED` are acceptable *inventory findings*, never proof of readiness for a paid deployment.

**Current 014-A state: NEXT ELIGIBLE / NOT STARTED. 014-B: NOT AUTHORIZED.**
