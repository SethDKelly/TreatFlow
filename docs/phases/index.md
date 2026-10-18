# Lifecycle Phase Records

This directory contains high-level lifecycle contracts and, in cloned projects, chronological records of design and pre-implementation preparation work. Phase records explain how conclusions were reached; durable current truth belongs under [canonical knowledge](../canonical/).

Every phase uses the [Phase Lifecycle Contract](../methodology/phase-lifecycle.md) control structure where applicable and is governed by the [Documentation Integrity & OKF Governance Contract](../methodology/documentation-governance.md).

## Jackson-aligned concept-design lifecycle

- [000 — Project Intake & Product Definition](000/) — pre-methodology project definition and intake. **Refined.**
- [001 — Purpose, Context, Need & Success Framing](001/) — establish why the product should exist and what purposes the design must serve. **Refined.**
- [002 — Concept Discovery, Candidate Inventory & Divergent Exploration](002/) — explore alternative candidate concepts without premature convergence. **Refined.**
- [003 — Concept Definition, Operational Principles & Behavioral Specification](003/) — specify viable concepts through purpose and observable behavior. **Refined.**
- [004 — Concept Modularity, Boundary, Specificity, Completeness & Independence](004/) — challenge and stabilize concept factoring before composition. **Refined.**
- [005 — Concept Composition, Synchronization, Automation & Synergy](005/) — define explicit cross-concept behavior while preserving independence. **Refined.**
- [006 — Concept Dependence, Product-Family, Subset & Scope Analysis](006/) — distinguish concept independence from application inclusion dependence and scope. **Refined.**
- [007 — Concept Mapping, Interaction Semantics & User-Visible Representation](007/) — map conceptual semantics into understandable user-facing behavior without implementation. **Refined.**
- [008 — Familiarity, Reuse, Genericity & Concept-Catalog Refinement](008/) — challenge unnecessary novelty and improve reuse, naming, and genericity. **Refined.**
- [009 — Concept Integrity, Cross-Concept Coherence & Interference Audit](009/) — verify that composed concepts preserve their independent promises. **Refined.**
- [010 — Scenario, Misfit, Exception, Failure & Adversarial Design Validation](010/) — attack the mature design with scenarios likely to expose conceptual weakness or misfit. **Refined.**
- [011 — Methodology Completeness, Canonical Consolidation & Concept-Design Closure](011/) — perform whole-methodology completion audit and, if justified, close concept design for downstream handoff. **Refined.**

Concept design ends at Phase 011.

## Post-closure pre-implementation transition

- [012 — Pre-Implementation Audit, OKF Hardening & Agentic Development Preparation](012/) — audit/polish documentation and OKF structure, reconcile stale current knowledge, refresh repository orientation, prepare Claude/Cursor/Codex governance, and produce a clean engineering handoff without beginning feature implementation. **Refined.**

Phase 012 is a Base transition phase, not part of Jackson's concept-design methodology.

## Phase control

Each high-level phase begins with `NNN-A`, which reviews phase intention, incoming authority, documentation state, and dependencies before deriving only the substantive subphases required by that project. The final project-specific subphase performs consolidation, documentation-integrity review, exit decision, and handoff.

The high-level sequence is fixed; the B–X work inside a phase is not. Phase 012 may reopen Phase 011 or earlier design work if its audit discovers a material closure regression.

## Template refinement status

All Base lifecycle phase templates `000–012` are refined. Phases `000–011` define the concept-design process; Phase `012` defines pre-implementation repository preparation.

Cloned projects must still execute the lifecycle from their own `000` intake onward. Template refinement is not evidence that any cloned project's design or preparation work has already been performed.