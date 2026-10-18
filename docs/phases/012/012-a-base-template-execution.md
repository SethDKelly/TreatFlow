---
type: Phase Execution Record
title: 012-A Base Template Execution — Repository Audit Scope, OKF Baseline, Staleness Strategy & Subphase Plan
description: Executes the Phase 012 start gate against the Base template itself and derives the dependency-safe pre-implementation preparation work required by the current repository.
tags: [phase-012, execution, base-template, okf, audit, stale-documentation, agents, planning]
sources:
  - id: phase-012-gate
    resource: ./012-a-start-gate.md
    title: Phase 012-A Start Gate
  - id: phase-012-readiness
    resource: ./pre-implementation-readiness-contract.md
    title: Pre-Implementation Repository Readiness Contract
  - id: okf-v02
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: Open Knowledge Format v0.2 Specification
---

# 012-A Base Template Execution

## Decision context

This record executes the Phase 012 start gate against **Base itself as a template repository**.

Base is not a product instance that has executed a product-specific Phase 000–011 lifecycle. It must therefore not manufacture a Phase 011 product-closure result simply to satisfy the normal cloned-project prerequisite.

For this Base self-audit only, the Phase 012 prerequisite is interpreted as a **template-maintenance baseline**:

- Phase templates `000–011` are refined;
- the Jackson-aligned concept-design lifecycle authority is stable enough to audit;
- Phase 011 closure semantics are defined;
- Phase 012 is explicitly outside the Jackson-aligned concept-design lifecycle;
- no application implementation exists in the Base template;
- the audit is preparing the template for safe cloning and downstream use, not declaring a product implementation ready.

This exception applies only to Base template maintenance. A cloned project must still have a real successful Phase 011 closure before entering Phase 012.

## 1. Incoming repository baseline

Current root surfaces are intentionally small:

- `README.md` — repository orientation and lifecycle summary;
- `AGENTS.md` — shared operational agent instructions;
- `CLAUDE.md` — thin Claude adapter importing shared rules;
- `.cursor/rules/okf-documentation.mdc` — scoped Cursor documentation/OKF rule;
- `docs/` — the OKF v0.2 knowledge bundle.

No application source, schema, migration, infrastructure, runtime, deployment, or executable application-test surface is present in the Base template.

Within `docs/`:

- `docs/index.md` is the bundle root;
- `docs/methodology/` contains lifecycle, documentation, authority, guardrail, and agent-governance contracts;
- `docs/phases/000–011/` contain refined concept-design phase templates;
- `docs/phases/012/` contains the pre-implementation preparation template;
- `docs/canonical/` contains the canonical-knowledge navigation contract but intentionally no product-specific design corpus because Base is a template.

## 2. OKF v0.2 baseline

The adopted baseline remains OKF v0.2.

The current repository already reflects the intended high-level rules:

- `docs/index.md` declares `okf_version: "0.2"`;
- non-root indexes are intended to remain frontmatter-free progressive-disclosure documents;
- ordinary knowledge documents are expected to carry YAML frontmatter with non-empty `type`;
- Markdown links form the principal knowledge graph;
- `sources` is used when durable knowledge materially derives from source artifacts;
- lifecycle/freshness/trust metadata is optional and should be used only where it adds real maintenance value.

The start gate does **not** claim exhaustive conformance from sampling. A repository-wide structural pass is required before Phase 012 may exit.

## 3. Known documentation and staleness risks

The audit should begin with the following concrete risks rather than a generic checklist.

### 3.1 Lifecycle-language drift

The introduction of Phase 012 already exposed stale Phase 011 language that previously implied direct handoff from concept-design closure into engineering. Those authorities were corrected during Phase 012 template refinement.

This is evidence that lifecycle/readiness terminology can drift across many phase documents and must receive a systematic semantic-staleness review.

### 3.2 Repeated readiness/guardrail language

Many phase templates necessarily repeat implementation-readiness boundaries. Repetition is useful locally but increases the risk that one phase eventually retains an older state model.

The audit should reconcile material semantic differences while avoiding a destructive rewrite that removes useful local reminders.

### 3.3 Template-versus-project ambiguity

Base intentionally contains refined templates but no executed product design. Current documentation must consistently prevent agents or users from interpreting template refinement as evidence that a cloned project's design has completed.

### 3.4 Canonical-versus-phase authority ambiguity

`docs/canonical/` is intentionally sparse in Base because cloned projects create their own current design knowledge. The repository must make that intentional emptiness obvious enough that agents do not substitute phase templates or historical records for missing project-specific canonical truth.

### 3.5 Agent-tool freshness

Claude, Cursor, and Codex instruction mechanisms can change independently of Base's conceptual methodology. Tool-specific guidance and external-source references therefore need a focused freshness review.

The audit should consider whether selective lifecycle/freshness metadata is useful for agent-governance documents, but must not add pseudo-maintained timestamps mechanically.

### 3.6 Link and progressive-disclosure drift

The corpus has grown from a small methodology tree to `000–012`, several methodology contracts, and root agent files. Relative links, indexes, and handoffs must be checked as an actual graph rather than assumed correct because individual documents read well.

### 3.7 Audit-document bloat

Phase 012 itself could easily create permanent file inventories, stale-document spreadsheets, duplicated summaries, and tool-specific policy copies. Audit evidence must remain phase evidence; current policy must stay in natural owners.

## 4. Staleness and supersession strategy

Use the following disposition order during Phase 012:

1. **Correct in place** when a current authoritative document contains stale wording but still owns the semantic role.
2. **Update links/indexes** when authority remains valid but discoverability is stale.
3. **Consolidate duplicate current rules** when two current documents unintentionally compete; keep the natural owner and reduce the other to context plus reference.
4. **Retain as historical evidence** when an older statement belongs to a phase record and is clearly non-authoritative.
5. **Explicitly supersede/deprecate** only when consumers would otherwise reasonably mistake the old current artifact for valid authority.
6. **Remove** only when an artifact has no remaining historical, navigational, or governance value.
7. **Add lifecycle/freshness metadata selectively** when machine-readable freshness materially improves maintenance, especially for rapidly changing external tool behavior.

Age alone is not staleness. Semantic mismatch with current authority is the primary signal.

## 5. Progressive-disclosure review plan

Review navigation in dependency order:

1. repository `README.md`;
2. `docs/index.md`;
3. `docs/methodology/index.md`;
4. `docs/phases/index.md`;
5. each phase `index.md` as a local entry point;
6. `docs/canonical/index.md` as the project-current-truth contract;
7. Phase 011 closure and Phase 012 preparation entry points;
8. root agent instruction entry points.

The review should confirm that a reader can answer, without scanning phase history:

- what Base is;
- where concept design starts and ends;
- where pre-implementation preparation begins;
- what is current authority versus historical evidence;
- where a cloned project should put durable design truth;
- how an implementation agent finds current obligations after closure.

## 6. README refresh scope

The root README has already been refreshed during Phase 012 template definition. Treat it as **incoming candidate current state**, not automatically complete work.

The Phase 012 execution should verify that it remains consistent after all audit corrections and that it accurately states:

- Base's template purpose;
- `000–011` concept-design lifecycle;
- Phase 012's post-closure role;
- readiness versus execution authorization;
- clone/start instructions;
- canonical versus phase-record authority;
- agent instruction entry points;
- transition into a separate engineering process.

Any later Phase 012 change affecting these semantics must trigger README re-review.

## 7. Agentic-development preparation plan

Current incoming surfaces are:

- shared governance: `docs/methodology/agentic-development-governance.md`;
- portable/root operational rules: `AGENTS.md`;
- Claude adapter: `CLAUDE.md` importing `AGENTS.md`;
- Cursor scoped rule: `.cursor/rules/okf-documentation.mdc`.

The audit should verify rather than duplicate them.

Required checks:

- current tool conventions still support the chosen adapters;
- shared behavior has one natural policy owner;
- adapter wording is concise and does not fork shared policy;
- all tools are instructed to inspect current canonical knowledge before implementation;
- all tools understand lifecycle/readiness boundaries;
- all tools distinguish canonical truth from phase evidence;
- inspect-before-create and anti-bloat behavior is concrete;
- stale-document discovery behavior is actionable;
- design contradictions are surfaced/reopened rather than silently coded around;
- protected human/organizational authority cannot be replaced by agent file-write ability;
- verification guidance activates only after implementation execution is legitimately authorized.

Tool-specific freshness metadata should be considered only if it provides a maintainable signal.

## 8. Implementation-preparation audit scope

Because Base is a template, Phase 012 must verify the **handoff mechanism**, not invent a fake product handoff.

A Base-derived project reaching Phase 012 should be able to discover from its canonical corpus and closure records:

- product/variant scope;
- concept purposes and behavior;
- application actions and synchronizations;
- dependence/subset constraints;
- authority boundaries;
- lifecycle/history/correction/recovery semantics;
- user-visible mapping/disclosure obligations;
- accepted limitations/non-goals;
- conceptual safety/privacy/interoperability/consistency properties;
- validation scenarios and misfit lessons worth preserving;
- unresolved engineering questions whose conceptual obligations are clear.

The Base audit should confirm that Phase 011/012 templates and agent governance direct downstream work to those authorities without prescribing architecture.

## 9. Closure-regression triggers

During Base template preparation, any of the following is a blocker requiring correction before Phase 012 exit:

- current methodology documents contradicting the adopted `000–011` / `012` lifecycle boundary;
- OKF structural rules stated inconsistently with the adopted v0.2 specification;
- a phase template whose readiness/authorization semantics contradict repository guardrails;
- broken or misleading navigation that makes phase evidence appear canonical;
- tool adapters that duplicate or contradict shared governance;
- agent instructions that would authorize feature implementation before a downstream process does so;
- accidental application scaffolding or implementation artifacts in Base;
- a template rule that would allow a clone to bypass required Phase 011 closure.

A product-specific concept orphan or misfit is not applicable to Base itself because Base contains no product concept corpus; the template must nevertheless preserve the mechanisms that detect those defects in clones.

## 10. Dynamically derived Phase 012 subphases

### 012-B — OKF Structural Conformance & Corpus Integrity Audit

**Purpose:** perform the exhaustive structural pass that `012-A` intentionally does not claim from sampling.

**Authoritative inputs:** OKF v0.2 specification; documentation-governance contract; current repository tree.

**Surfaces:** all `docs/**/*.md`, reserved indexes/logs, frontmatter, source metadata, path structure.

**Completion evidence:** ordinary documents conform or have explicit disposition; reserved files are used correctly; root bundle declaration is correct; no malformed frontmatter or unjustified metadata remains.

**Implementation boundary:** documentation-only; no executable linter/tooling is required or authorized merely to prove conformance.

### 012-C — Semantic Staleness, Supersession & Authority Reconciliation

**Purpose:** find stale current wording, conflicting current rules, lifecycle drift, supersession mistakes, and phase-history leakage into present authority.

**Authoritative inputs:** knowledge-authority contract; current methodology/phase contracts; results from 012-B.

**Surfaces:** methodology contracts, Phase 000–012 definitions/start/exit contracts, canonical navigation, lifecycle/readiness terminology.

**Completion evidence:** material current contradictions resolved; historical evidence remains historical; duplicate authority consolidated where necessary; template-versus-project semantics remain explicit.

**Implementation boundary:** no code or implementation design.

### 012-D — Progressive Disclosure, Link Graph & Repository Orientation Polish

**Purpose:** make current authority navigable after semantic cleanup and validate the root README against the final audited lifecycle.

**Authoritative inputs:** corrected current corpus from 012-B/C; documentation-governance contract.

**Surfaces:** `README.md`, `docs/index.md`, methodology/phase/canonical indexes, Phase 011→012 navigation, material cross-links.

**Completion evidence:** concise current indexes; material links resolve to intended owners; no stale navigation foregrounds obsolete authority; README accurately matches final repository state.

**Implementation boundary:** orientation/navigation only.

### 012-E — Agentic Governance & Claude/Cursor/Codex Adapter Hardening

**Purpose:** verify current agent instruction mechanisms and harden the shared-policy/thin-adapter model against drift and agentic bloat.

**Authoritative inputs:** agentic-development governance; audited knowledge paths from 012-D; current official tool documentation where necessary.

**Surfaces:** `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/*.mdc`, agent-governance methodology contract.

**Completion evidence:** current tool conventions verified; shared policy is not forked; lifecycle/authority/OKF/staleness/anti-bloat rules are coherent; any freshness strategy is explicit and maintainable.

**Implementation boundary:** agent governance only; rules are not an implementation security boundary and do not authorize feature coding.

### 012-F — Downstream Engineering Handoff & Readiness-Surface Audit

**Purpose:** verify that a clone completing the lifecycle can hand conceptual obligations to engineering without reconstructing phase history or receiving premature architecture.

**Authoritative inputs:** Phase 011 closure contract/template; Phase 012 readiness contract; audited navigation and agent governance.

**Surfaces:** closure/preparation handoff language, canonical entry-point expectations, downstream-obligation guidance, readiness/execution terminology.

**Completion evidence:** required obligations are discoverable through templates; product-specific handoff content is not fabricated in Base; engineering boundary remains representation-independent; implementation execution remains outside Phase 012 authority.

### 012-G — Phase 012 Consolidation, Regression Recheck & Pre-Implementation Exit Review

**Purpose:** perform the mandatory final consolidation using `exit-review-template.md`.

**Authoritative inputs:** completed 012-B through 012-F records and corrected repository state.

**Completion evidence:** OKF/staleness/navigation/README/agent/handoff audits pass; temporary audit artifacts are dispositioned; no closure-regression trigger remains; Base is polished as a template for clones entering downstream engineering after their own successful lifecycle execution.

## 11. Documentation ownership and expected changes

Expected durable owners are existing files wherever possible:

- OKF/documentation policy → `docs/methodology/documentation-governance.md`;
- authority ordering → `docs/methodology/knowledge-authority.md`;
- lifecycle meaning → `docs/methodology/concept-design-lifecycle.md` and phase definitions;
- design/implementation boundary → `docs/methodology/design-only-guardrails.md`;
- agent policy → `docs/methodology/agentic-development-governance.md`;
- root orientation → `README.md` and `docs/index.md`;
- local navigation → existing `index.md` files.

Phase 012 audit records belong under `docs/phases/012/` as historical/preparation evidence. Do not create a parallel canonical audit encyclopedia.

## 12. Gate outcome

### READY TO BEGIN PHASE 012 TEMPLATE SUBPHASES

The Base repository has a stable enough template baseline for formal pre-implementation audit and no application implementation has begun.

The special Base self-audit prerequisite is explicitly bounded: this result does **not** claim that Base has executed a product-specific Phase 011 closure, and it does not weaken the real Phase 011 prerequisite for cloned projects.

The authorized next step is:

**012-B — OKF Structural Conformance & Corpus Integrity Audit**.

## Implementation state

For Base as a template:

- **Product implementation readiness:** not asserted by this self-audit;
- **Implementation execution:** not started;
- **Implementation execution authorization:** not granted;
- **Template pre-implementation audit:** ready to begin substantive Phase 012 work.
