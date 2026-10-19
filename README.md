# TreatFlow

TreatFlow is an observation-first Halloween application concept: effortless personal reporting and private review are its primary purpose; protected community summaries and qualified exploratory research are optional. **No app implementation has begun.**

The repository follows the Base concept-design methodology. **Phases 000–010 exited with carry-forwards and Phase 011-F closed concept design with explicit limitations. Phase 012-A–E have merged with bounded audit qualifications; 012-F is the independent repository-preparation exit review. Completion of Phase 012, if independently accepted, does not authorize application implementation or real participant-data operations.** Start with [current intake](docs/canonical/project/intake.md), [purposes](docs/canonical/purpose/purposes.md), [adopted concept family](docs/canonical/project/concept-family-scope.md) and the [current knowledge bundle](docs/index.md).

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

1. Follow the merged [Phase 011-F independent concept-design exit](docs/phases/011/011-f-treatflow-exit-review.md), [residual safety obligations](docs/phases/011/011-e-treatflow-execution.md), [Phase 012-A gate](docs/phases/012/012-a-treatflow-execution.md), and [Phase 012-B audit](docs/phases/012/012-b-treatflow-audit.md) through [012-C authority reconciliation](docs/phases/012/012-c-treatflow-audit.md), [012-D agent governance](docs/phases/012/012-d-treatflow-audit.md), and [012-E engineering/safety handoff](docs/phases/012/012-e-treatflow-handoff.md) into the independent 012-F exit review; never treat these results as collection, disclosure or coding authorization.
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

## Next engineering-design phase

[Phase 013 — AWS Engineering Foundation & MVP Program Design](docs/phases/013/) proposes AWS serverless/CDN-first options, cost guardrails, Route 53 subdomains, private nonproduction, public production and phased MVP qualification. This is **planning only**, not permission to start application implementation or real participant-data operations.

## Authority reminder

Inherited Base phase definitions, including historical Base Phase 012 self-audit records, describe template methodology rather than TreatFlow project completion. Only the TreatFlow-specific phase execution records establish project progress.
