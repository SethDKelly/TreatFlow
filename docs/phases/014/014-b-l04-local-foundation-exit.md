---
type: Engineering Local Foundation Exit
title: TreatFlow 014-B-L04 — Independent Local Foundation Exit Checklist and 015/016 Handoff
description: Evidence-calibrated exit of Track L L01–L03 local synthetic Observation scaffold; reproducible commands, semantic coverage, debt register, and bounded next-package handoff without cloud authorization.
tags: [treatflow, phase-014, l04, local-first, exit, observation, handoff]
---

# 014-B-L04 — Independent Local Foundation Exit & 015/016 Handoff

## L01 — Decision and baseline

**STATUS: LOCAL FOUNDATION EXIT PROPOSED PASS WITH BOUNDED CARRY-FORWARD, EFFECTIVE ONLY AFTER THIS PR MERGES AND INDEPENDENT REVIEW ACCEPTS THE CHECKLIST.**

**Baseline:** merged `main` commit `3dab068d6824ce0a9d56bb88cf960bfa8832f452` containing PR #104 (`014-B` L01–L03 local Observation scaffold). Authority owners remain [014-B start contract](014-b-local-first-implementation-plan.md), [013 MVP roadmap](../013/mvp-roadmap.md), [canonical Observation](../../canonical/concepts/observation.md), and [013-E](../013/013-e-concept-to-mvp-realization.md).

**Independence disclosure:** this is a documentation exit scorecard against the L04 milestone in 014-B, with commands re-run on the baseline tree. It is not a second human assessor, sealed holdout evaluation, production security certification, or authorization for Track C / AWS / real-person operation.

**What L04 authorizes upon merge:** Track L local foundation is **exited** for handoff into separately scoped source-only 015/016 packages. **What L04 does not authorize:** AWS writes, GitHub deploy workflows, CDK/Terraform, CI secrets, public hosting, real participant data, protected disclosure, or Revision factual correction.

## L02 — Exit checklist (reviewer-facing)

Use this table as the independent review surface. Mark PASS only with evidence; missing or failed evidence = HOLD.

| ID | Criterion | Evidence / how to check | Proposed disposition |
|---|---|---|---|
| **L04-01** | L01–L03 merged on `main` | PR #104 merge commit `3dab068…`; branch contains single npm app (`package.json`), `src/`, `tests/`, no monorepo | **PASS** |
| **L04-02** | Clean install from lockfile | `npm ci` on Node within `engines` (`^22.12.0 \|\| ^24.0.0 \|\| >=26.0.0`); lockfile present; audit clean for installed tree | **PASS** (Node `v24.21.0`, `npm ci`, `npm audit` → 0 vulnerabilities on this run) |
| **L04-03** | Reproducible local commands | README “Local development” documents `npm ci`, `typecheck`, `lint`, `test`, `build`, `dev`; scripts exist in `package.json` | **PASS** |
| **L04-04** | Typecheck / lint / tests / build | On baseline: `npm run typecheck`, `lint`, `test` (28 tests / 4 files), `build` all succeed without network runtime calls | **PASS** (re-run 2026-10-20 local) |
| **L04-05** | No cloud / deploy / secret surface | No `.github/workflows`; no CDK/Terraform; no `.env` committed; `src/` has no `fetch`, `localStorage`, `sessionStorage`, AWS SDK, or deploy config | **PASS** (tracked-tree inspection) |
| **L04-06** | Localhost-only tooling intent | Vite `server`/`preview` host `127.0.0.1`; README states synthetic localhost prototype | **PASS** (binding is not a security boundary if someone overrides `--host`) |
| **L04-07** | Synthetic-only identity | Principals/ids use `syn-` namespaces; UI banner states simulation is not authentication | **PASS** with carry-forward: entitlement is local simulation only |
| **L04-08** | Semantic fixtures & negatives | Tests cover E-T01–E-T09-class cases plus PR #104 regressions (blank quantity, contradictory/contained/equivalent-clock/overnight zeros, cross-unit completeness, interrupted attempt, equal-count non-dedupe, unentitled denial) | **PASS** for L03 scope; **not** full E-T01–E-T22 closure |
| **L04-09** | Dependency / lockfile review | Runtime deps: `react`, `react-dom` only; tooling pinned via lockfile; engines aligned with Vitest 5 | **PASS** with maintenance note (ESLint 9 deprecated advisory is tooling, not runtime) |
| **L04-10** | Technical debt & handoff explicit | Debt register and next-package contract in L03–L04 below; no silent claim of seven-action MVP completion | **PASS** if this document merges unchanged in substance |
| **L04-11** | Track C remains HOLD | No TreatFlow OIDC onboarding, no AWS resource, no deploy role creation in this exit | **PASS / HOLD cloud** (intentional) |

**Independent reviewer kickoff (pasteable):**

> Independently review TreatFlow 014-B-L04 against `docs/phases/014/014-b-l04-local-foundation-exit.md` and merged `main` SHA above. Re-run `npm ci`, `typecheck`, `lint`, `test`, `build`. Confirm no AWS/CI deploy/secrets/real-data surfaces. Verify checklist L04-01–L04-11 with PASS/HOLD and cite evidence. Do not merge Track C or authorize 015 cloud packages. Do not treat L04 as completion of all seven Observation actions.

## L03 — Technical debt register (accepted for handoff)

| Debt ID | Description | Why accepted now | Natural next owner |
|---|---|---|---|
| **D-01** | Only Establish, Report, Inspect (plus AssertCoverage helper) are productized in UI; Close/Qualify/InspectAfterClose incomplete as first-class UX | L03 contract limited the vertical slice | **016-B/C** local packages |
| **D-02** | In-memory store only; no persistence, multi-tab sync, or recovery | Track L forbids durable user data / backend | **015-B/C** after cloud gate, or explicit local-only persistence contract if separately authorized |
| **D-03** | Principal switching is simulated entitlement, not cryptographic session security | Stated in UI and 014-B; prevents false security claims | **015-A** entitlement design |
| **D-04** | Attempt/interrupt model is local mock; no reconciliation window or sealed holdouts | Sufficient for unresolved-outcome honesty in L03 | **015-B**, **017-B**, **018** holdouts |
| **D-05** | Time model is fixture clock labels + overnight unwrap; not timezone/DST/calendar dates | Matches synthetic fixture scope; avoids invented precision | Revisit when real calendars enter **015/016** contracts |
| **D-06** | No GitHub Actions CI yet | Track C / repo-protection work separately gated; local commands are CI-independent by design | **014-B-C01** / maintainer CI design after approval |
| **D-07** | Accessibility and divided-attention UX unproven | E-T20 / R-P01 remain empirical carry-forwards | **017-A** |
| **D-08** | Revision / factual count correction absent (correctly) | Destructive O edits forbidden; V slice undecided | **016-D** or explicit noncorrecting limitation |

## L04 — 015/016 source-only handoff contract

After this exit merges, **source-only** Observation completion may proceed under **new explicit package authorizations**. Prefer preserving roadmap package IDs rather than inventing a parallel architecture.

| Next local package (candidate) | Bounded intent | Must not include |
|---|---|---|
| **015-A (local-semantic)** | Clarify synthetic guest/principal vs Observation entitlement rules in pure domain terms (still no cloud IdP) | Cognito/OIDC deploy, mandatory registration, real users |
| **016-B/C (local)** | Complete remaining O actions in domain + localhost UI: AssertCoverage, Qualify, Close, InspectAfterClose with E-T15/16 negatives | API/DynamoDB, public shell, S/R/D |
| **016 debt follow-ups** | Stronger attempt identity, contested-coverage UX, honest unknown outcomes | Silent count overwrite |

**Cloud packages (C01+, 014-C–E, 015-C API)** remain unauthorized until backbone security, budget, DNS, and separate sponsor approval.

## L05 — Exit decision

**Proposed decision upon merge + independent checklist acceptance:**

- Track L **L01–L03 foundation: EXITED WITH BOUNDED DEBT**
- Implementation execution for **additional** local Observation semantics: **eligible for new scoped authorization**
- Track C / AWS / CI deploy / real-person / disclosure: **HOLD**

If independent review finds a checklist FAIL (especially L04-04, L04-05, or false completion claims), **HOLD L04**, repair at the natural code or doc owner, and re-run verification before declaring the local foundation exited.
