# Base

Base is a cloneable repository template for taking a software product from project intake through completed concept design, then through a final pre-implementation repository audit before downstream engineering begins.

The concept-design method is grounded in Daniel Jackson's software concept design methodology from *The Essence of Software*. The documentation corpus under [`docs/`](docs/index.md) is organized as an Open Knowledge Format (OKF) v0.2 knowledge bundle.

## Lifecycle

Base deliberately separates conceptual design from implementation preparation and implementation execution.

### Concept design — Phases 000–011

- `000` — Project Intake & Product Definition
- `001–010` — Jackson-aligned concept discovery, definition, factoring, composition, scope, mapping, familiarity, integrity, and adversarial validation
- `011` — Methodology Completeness, Canonical Consolidation & Concept-Design Closure

The numbered sequence is a Base operationalization of Jackson's methodology; it is **not** presented as an official phase numbering prescribed by Jackson.

Before successful Phase 011 closure:

- **Implementation readiness:** not ready
- **Implementation execution:** not started
- **Implementation authorization:** not yet

A successful Phase 011 closure may move implementation readiness to **ready**, but implementation remains **not started** and Base does not itself authorize coding.

### Pre-implementation preparation — Phase 012

[`Phase 012`](docs/phases/012/) is a post-closure transition phase outside the Jackson-aligned concept-design lifecycle. It prepares a closed design repository for downstream engineering by:

- auditing OKF v0.2 structure and documentation quality;
- finding stale, superseded, duplicated, or misleading current documentation;
- checking indexes, links, provenance, and progressive disclosure;
- refreshing the repository README and lifecycle guidance;
- preparing shared agentic-development governance for Claude, Cursor, and Codex;
- verifying that implementation-facing obligations are discoverable without prematurely choosing architecture.

Successful Phase 012 completion means **pre-implementation preparation is complete**. It still does not mean feature implementation has started or been authorized by this lifecycle.

## How to use this template

1. Clone or create a repository from Base.
2. Begin with [`Phase 000`](docs/phases/000/).
3. At each phase start gate (`NNN-A`), review incoming authority and derive only the dependency-safe subphases the project actually needs.
4. Keep durable current design meaning in [`docs/canonical/`](docs/canonical/) and chronological reasoning/evidence in [`docs/phases/`](docs/phases/).
5. Finish every phase with its consolidation/exit review and explicit handoff.
6. Complete the full concept-design lifecycle through Phase 011 before treating implementation as ready.
7. Complete Phase 012 to audit/polish the knowledge corpus and prepare agent/development governance.
8. Begin representation, architecture, implementation planning, and eventual implementation execution only under a separate downstream engineering process.

## Documentation model

The `docs/` bundle separates two kinds of knowledge:

- **Canonical knowledge** — current design truth: purposes, concepts, invariants, synchronizations, dependencies, authority boundaries, mappings, limitations, and other durable conclusions.
- **Phase records** — chronological evidence of discovery, alternatives, analysis, decisions, audits, validation, and handoffs.

Phase records are not current merely because they were written earlier. Durable conclusions are promoted into their natural canonical owners; superseded conclusions remain historical evidence.

Start with [`docs/index.md`](docs/index.md).

## Agentic development

Base includes shared project instructions for common coding agents:

- [`AGENTS.md`](AGENTS.md) — shared operational instructions for Codex and compatible agents; Cursor also understands this format.
- [`CLAUDE.md`](CLAUDE.md) — Claude Code adapter that imports the shared instructions rather than duplicating them.
- [`.cursor/rules/okf-documentation.mdc`](.cursor/rules/okf-documentation.mdc) — focused Cursor rule for OKF/documentation work.
- [`Agentic Development Governance`](docs/methodology/agentic-development-governance.md) — durable shared policy and rationale.

Agents are expected to inspect current canonical knowledge before making substantive changes, distinguish current truth from phase history, preserve OKF/documentation authority, avoid speculative repository bloat, and surface design contradictions rather than silently coding around them.

## Important template rule

The fact that Base itself contains refined phase templates does **not** mean a cloned project's design is complete. Each cloned project must execute the lifecycle against its own product, evidence, actors, purposes, concepts, risks, and constraints.
