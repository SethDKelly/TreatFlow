---
okf_version: "0.2"
type: Phase Start Gate Execution
title: TreatFlow 012-A — Repository Audit Scope, OKF Baseline, Staleness Strategy and Agentic Preparation Planning
description: Project-specific post-closure repository inventory and bounded documentation, agent-governance, safety and handoff plan.
tags: [treatflow, phase-012, start-gate, okf, audit, staleness, agents]
---

# TreatFlow — 012-A Repository Audit Scope, OKF Baseline, Staleness Strategy & Agentic Preparation Planning

## Decision

**012-A START GATE PASS — READY TO BEGIN PROJECT-SPECIFIC PHASE 012 WORK; 012-B NEXT AFTER MERGE.** [011-F formal concept-design closure](../011/011-f-treatflow-exit-review.md) is merged and is the controlling qualified PASS for Phases 000–011. The closed design prioritizes quick **personal recording and private review**; community reporting/research remain optional, independently guarded. [011-E six residual obligations](../011/011-e-treatflow-execution.md) accompany the handoff. **Readiness: ready for pre-implementation preparation only. Execution: not started. Authorization: not granted.** No real participant collection, processing, external disclosure or app implementation is authorized.

This start gate scopes a project-specific **repository quality and agent-governance audit**, not an engineering design, launch checklist or declaration that the corpus already meets every standard. The inherited [Base 012-A template self-audit](012-a-base-template-execution.md) is precedent, not TreatFlow evidence.

## Repository inventory and scope (GitHub main tree inspection)

The repository's recursively listed main tree contains **184 tracked files** (GitHub tree reported nontruncated), of which **180 are under `docs/`**, including **18 under `docs/canonical/`** and **153 under `docs/phases/`**. Root surfaces: `README.md`, `AGENTS.md`, `CLAUDE.md`. One project-specific Cursor adapter exists at `.cursor/rules/okf-documentation.mdc`. This file-tree inventory found **no tracked application `.py`, `.ts`/`.tsx`, package manifest, Dockerfile or deployment/code surface**; absence of such names is not a security audit, proof against other implementation artifacts, or examination of remote branches/untracked files.

- **Authority:** `docs/canonical/` contains the current purpose, five retained concept specifications, adopted family, composition/dependency and mapping knowledge; `docs/methodology/` supplies governance.
- **History:** `docs/phases/` includes the full TreatFlow execution through 011-F, inherited templates and Base self-audit evidence. Template documents must never be mistaken for project accomplishments.
- **Entry:** `docs/index.md` was rebuilt at 011-D; `README.md` was corrected for the observation-first purpose.
- **Agents:** existing `AGENTS.md`, `CLAUDE.md` importing shared instructions and scoped `.cursor/rules/okf-documentation.mdc` are **retained and audited**, not recreated from scratch.

## OKF v0.2 verification plan

Governing documents: [documentation governance](../../methodology/documentation-governance.md), [knowledge authority](../../methodology/knowledge-authority.md), [Phase 012 readiness contract](pre-implementation-readiness-contract.md). `docs/` remains bundle root; only `docs/index.md` may carry `okf_version: "0.2"` index frontmatter; non-root `index.md` are frontmatter-free; nonreserved ordinary `.md` documents require parseable YAML with nonempty `type`; links provide knowledge navigation, and `sources` documents genuine material provenance.

**Baseline known:** edited 011-D documents/root index passed a targeted manual check. **Not yet evidenced:** exhaustive parse of all ordinary documents, all reserved-index distinctions, existence/resolution of all relative links, complete heading anchors, provenance quality, directory navigation coverage, outdated phase pointers, or orphan/non-current authority detection. 012-B must perform a file-by-file bounded verification using repository-visible evidence and distinguish checked from assumed; do not claim code execution if only connector text inspection was used.

## Staleness/supersession and progressive disclosure

Classify each finding as **current valid; intentionally historical; stale current authority; superseded/duplicated current authority; uncertain/review needed;** or **material closure regression requiring reentry**. Repair at the natural owner and update backlinks/indexes together; preserve historical phase documents as chronological decisions. Preserve older 010-H/J/L research-centric HOLD as history; the controlling status is 010-P and 011-F. Check former provisional status labels, duplicate phase-next statements, outdated agent lifecycle advice, historical template outcomes masquerading as TreatFlow progress, and P-01/P-02 primary recording priorities.

**Reader acceptance test:** from `README.md` or `docs/index.md`, navigate to current observation-first purpose, O specification, 29-action surface, integrated C/D guards, O experience mapping, protected affected-party limitations, and 011-F exit without scanning the chronological phase history. Do not turn root index into a complete catalog of 153 phase records.

## Agent instruction and anti-bloat plan

Audit **existing** [shared governance](../../methodology/agentic-development-governance.md) and actual `AGENTS.md`, `CLAUDE.md` and `.cursor/rules/okf-documentation.mdc`: verify Codex shared authority, Claude `@AGENTS.md` import, Cursor scoped OKF behavior and whether any new path-specific rule is truly necessary. Reuse and adjust, not multiply adapter files or duplicate policy text. Require inspect-before-edit, canonical-before-history, explicit lifecycle/authorization status, source verification, small targeted changes, evidence-graded verification and corrective reentry when semantics disagree. Rules must forbid real participant/household/minor data processing, public release, feature coding and infrastructure setup in Phase 012.

Agent-rule **testing is documentary/inspection-based here**: no feature code, executable application test harness, framework scaffold, production secrets, policies claiming official legal authority, or agent-autonomy permissions implied.

## Project-derived sequence and exit gates

| Workstream | Authoritative inputs / affected surfaces | Required durable evidence and boundary |
|---|---|---|
| **012-A — Start gate** | 011-F, 011-E, 012 contracts, GitHub tree and existing agents | This bounded baseline and dynamic plan; no app work |
| **012-B — Repository Inventory, OKF Structural & Reference Integrity Audit** | Entire tracked docs tree, `docs/index.md`, directory indexes and metadata | Actual file-by-file structural/frontmatter/reserved-path/relative-link checks, violations and exact repairs or owned queue; no fabricated exhaustive success |
| **012-C — Current Knowledge, Staleness, Supersession & Progressive Disclosure** | Canonical and methodology owners; indexes/README; 010-H–P and 011 history | Resolve obsolete current status, duplicate authority, broken navigation and shallow links; history untouched |
| **012-D — Agentic Governance, Shared Rules & Tool Adapters** | Current `AGENTS.md`, `CLAUDE.md`, Cursor `.mdc`, agent-governance method | Lean, stage-aware, no-real-data/no-code instructions; avoid new adapters unless concrete gap |
| **012-E — Architecture-Neutral Engineering Obligations & Safety Handoff** | Canonical O/S/V/R/D/C/D, mapping, 011-E R-P01–R-P06 | Discoverable constraints and pre-operation approval dependencies; preserve no-go, no architecture selection |
| **012-F — Repository Readiness Regression & Independent Phase 012 Exit** | 012-B–E merged corrections, current entire entry graph, exit template | Independent audit of OKF/navigation, agent rules, ownership, risks, lifecycle; PASS/HOLD, separate downstream engineering authorization required |

Sequence: **A→B→C→D→E→F**, with targeted reentry if a material current design contradiction is discovered. Phase 012 is not a program for new concept design; no duplicate generic templates or speculative implementation phases are added.

## Closure-regression triggers and mandatory stops

- Contradictory current purpose, concept/action/authority or family scope; orphaned purpose/concept or material missing behavior → **reopen natural canonical owner and Phase 011**.
- Missing guardian/minor/household eligibility, collection privacy basis, precise/repeated-release risk approval → **DO NOT collect/process or disclose real material** until appropriately authorized independently.
- Apparent Poisson rate inference from aggregate interval totals, opt-in sample treated as population, unsupported exact time/coverage → **prohibit claim**, reopen O/R/mapping if needed.
- Agent instructions that infer “readiness” grants coding, autonomous protected decisions or production launch → **repair in 012-D before agent use**.
- Existing non-document implementation contamination, if discovered → quarantine and assess conceptual bias per [design-only guardrails](../../methodology/design-only-guardrails.md).

**012-A PASS; 012-B NEXT ELIGIBLE AFTER MERGE. IMPLEMENTATION READINESS READY FOR PREPARATION, EXECUTION NOT STARTED, AUTHORIZATION NOT GRANTED.**
