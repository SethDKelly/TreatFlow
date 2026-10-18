# TreatFlow

TreatFlow is a proposed community-driven Halloween observation application intended to collect voluntarily reported trick-or-treater timing and volume data for exploratory analysis, including whether arrivals resemble Poisson processes. Its design must balance interpretable observations, simple contributor identity and safe access to research data. **No app implementation has begun.**

The repository inherits the Base concept-design template and its methodology; its **project-specific Phase 000 intake is complete with carry-forwards, and Phase 001-A is the next eligible design gate**. Start with [current TreatFlow intake](docs/canonical/project/intake.md) and [Phase 000 exit/handoff](docs/phases/000/000-e-treatflow-exit-review.md).

The concept-design method is grounded in Daniel Jackson's software concept design methodology from *The Essence of Software*. The documentation corpus under [`docs/`](docs/index.md) is organized as an Open Knowledge Format (OKF) v0.2 knowledge bundle.

## Lifecycle

The inherited Base lifecycle deliberately separates conceptual design from implementation preparation and implementation execution.

### Concept design — Phases 000–011

- `000` — Project Intake & Product Definition
- `001–010` — Jackson-aligned concept discovery, definition, factoring, composition, scope, mapping, familiarity, integrity, and adversarial validation
- `011` — Methodology Completeness, Canonical Consolidation & Concept-Design Closure

The numbered sequence is a Base operationalization of Jackson's methodology; it is **not** presented as an official phase numbering prescribed by Jackson.

Before successful Phase 011 closure:

- **Implementation readiness:** not ready
- **Implementation execution:** not started
- **Implementation authorization:** not yet

A successful Phase 011 closure may move implementation readiness to **ready**, but implementation remains **not started** and this lifecycle does not itself authorize coding.

### Pre-implementation preparation — Phase 012

[`Phase 012`](docs/phases/012/) is a post-closure transition phase outside the Jackson-aligned concept-design lifecycle. It prepares a closed design repository for downstream engineering by:

- auditing OKF v0.2 structure and documentation quality;
- finding stale, superseded, duplicated, or misleading current documentation;
- checking indexes, links, provenance, and progressive disclosure;
- refreshing the repository README and lifecycle guidance;
- preparing shared agentic-development governance for Claude, Cursor, and Codex;
- verifying that implementation-facing obligations are discoverable without prematurely choosing architecture.

Successful Phase 012 completion means **pre-implementation preparation is complete**. It still does not mean feature implementation has started or been authorized by this lifecycle.

## TreatFlow design workflow

1. Begin from the [completed Phase 000 handoff](docs/phases/000/000-e-treatflow-exit-review.md) and proceed to [Phase 001](docs/phases/001/).
2. At each phase start gate (`NNN-A`), review incoming authority and derive only the dependency-safe subphases the project actually needs.
3. Keep durable current design meaning in [`docs/canonical/`](docs/canonical/) and chronological reasoning/evidence in [`docs/phases/`](docs/phases/).
4. Finish every phase with its consolidation/exit review and explicit handoff.
5. Complete the full concept-design lifecycle through Phase 011 before treating implementation as ready.
6. Complete Phase 012 to audit/polish the knowledge corpus and prepare agent/development governance.
7. Begin representation, architecture, implementation planning, and eventual implementation execution only under a separate downstream engineering process.

## Documentation model

The `docs/` bundle separates two kinds of knowledge:

- **Canonical knowledge** — current design truth: purposes, concepts, invariants, synchronizations, dependencies, authority boundaries, mappings, limitations, and other durable conclusions.
- **Phase records** — chronological evidence of discovery, alternatives, analysis, decisions, audits, validation, and handoffs.

Phase records are not current merely because they were written earlier. Durable conclusions are promoted into their natural canonical owners; superseded conclusions remain historical evidence.

Start with [`docs/index.md`](docs/index.md).

## Agentic development

The inherited methodology includes shared project instructions for common coding agents:

- [`AGENTS.md`](AGENTS.md) — shared operational instructions for Codex and compatible agents; Cursor also understands this format.
- [`CLAUDE.md`](CLAUDE.md) — Claude Code adapter that imports the shared instructions rather than duplicating them.
- [`.cursor/rules/okf-documentation.mdc`](.cursor/rules/okf-documentation.mdc) — focused Cursor rule for OKF/documentation work.
- [`Agentic Development Governance`](docs/methodology/agentic-development-governance.md) — durable shared policy and rationale.

Agents are expected to inspect current canonical knowledge before making substantive changes, distinguish current truth from phase history, preserve OKF/documentation authority, avoid speculative repository bloat, and surface design contradictions rather than silently coding around them.

## Authority reminder

Inherited Base phase definitions, including historical Base Phase 012 self-audit records, describe template methodology rather than TreatFlow project completion. Only the TreatFlow-specific phase execution records establish project progress.
