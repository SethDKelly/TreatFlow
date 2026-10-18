---
okf_version: "0.2"
---

# Base Knowledge Bundle

This directory is the Open Knowledge Format (OKF) v0.2 knowledge bundle for Base. It guides a cloned project from project intake through completed Jackson-aligned software concept design, then through a post-closure pre-implementation repository preparation phase before downstream engineering begins.

## Start here

- [Methodology](methodology/) — design authority, lifecycle, documentation/knowledge governance, design-only guardrails, and agentic development governance.
- [Lifecycle phases](phases/) — Phases 000–011 for concept design plus Phase 012 for post-closure pre-implementation preparation.
- [Canonical knowledge](canonical/) — the compact current design truth produced by a cloned project.

## Governing contracts

- [Concept Design Methodology Authority](methodology/authority.md) — methodological authority and interpretation rules.
- [Jackson-Aligned Concept Design Lifecycle](methodology/concept-design-lifecycle.md) — reviewed high-level concept-design lifecycle and its boundary with Phase 012.
- [Phase Lifecycle Contract](methodology/phase-lifecycle.md) — mandatory start gate, dynamic subphase derivation, exit review, reopening, and handoff structure.
- [Documentation Integrity & OKF Governance Contract](methodology/documentation-governance.md) — OKF conformance, progressive disclosure, freshness/staleness discipline, cross-linking, anti-duplication, and drift control.
- [Canonical and Historical Knowledge Authority](methodology/knowledge-authority.md) — current truth versus phase evidence.
- [Design-Only Guardrails](methodology/design-only-guardrails.md) — implementation prohibition and readiness/execution states.
- [Agentic Development Governance](methodology/agentic-development-governance.md) — shared Claude/Cursor/Codex behavior for consuming and maintaining the OKF-grounded repository.

## Knowledge model

Durable current design meaning belongs under [canonical knowledge](canonical/). Chronological discovery, alternatives, reviews, validation, audits, and handoffs belong under [phase records](phases/). Phase records are evidence, not automatically current truth.

Documents should link to existing authoritative knowledge rather than restating it. Directory indexes provide progressive disclosure; ordinary concept documents carry OKF frontmatter and form a traversable graph through standard Markdown links.

## Lifecycle invariant

Until successful Phase 011 concept-design closure:

- **Implementation readiness:** not ready
- **Implementation execution:** not started
- **Implementation authorization:** not yet

Successful Phase 011 closure may change readiness to **ready** while execution remains **not started**.

Phase 012 then performs repository/OKF audit, stale-document reconciliation, README polish, agentic-rule preparation, and engineering-handoff hardening. Phase 012 does not itself begin feature implementation or grant implementation execution authorization.
