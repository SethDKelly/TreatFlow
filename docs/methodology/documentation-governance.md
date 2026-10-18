---
type: Documentation Governance Contract
title: Documentation Integrity & OKF Governance Contract
description: Defines repository-wide rules for OKF conformance, progressive disclosure, canonical ownership, lifecycle/freshness handling, cross-linking, anti-duplication, and documentation-drift control.
tags: [okf, documentation, governance, drift, coherence, indexing, references, staleness]
sources:
  - id: okf-v02
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: Open Knowledge Format v0.2 Specification
---

# Documentation Integrity & OKF Governance Contract

## Purpose

A Base-derived repository must remain useful as a knowledge system throughout design, pre-implementation preparation, and later development. Correct conclusions are not enough if current truth becomes hard to find, indexes become stale, references break, lifecycle state becomes ambiguous, or many phase documents restate conflicting versions of the same rule.

This contract therefore governs every Base phase alongside the concept-design/preparation lifecycle.

## OKF bundle contract

`docs/` is the OKF v0.2 bundle root.

The bundle must follow these structural rules from OKF v0.2:[^okf-v02]

- every non-reserved `.md` concept document has parseable YAML frontmatter with a non-empty `type`;
- `index.md` and `log.md` are reserved filenames and are not ordinary concept documents;
- a non-root `index.md` contains no frontmatter;
- the bundle-root `docs/index.md` may carry `okf_version` and should otherwise remain a progressive-disclosure entry point;
- standard Markdown links connect knowledge documents and form traversable graph edges;
- `sources` records provenance when a concept materially derives from another artifact;
- optional trust/lifecycle/freshness metadata may be used where it adds durable meaning;
- unknown producer-defined frontmatter may be used sparingly when it adds durable value.

[^okf-v02]: Open Knowledge Format v0.2 Specification.

## Progressive disclosure and indexes

Every directory that contains multiple knowledge documents or meaningful child directories should have an `index.md` unless omission is deliberately justified.

An index should answer quickly:

- what knowledge exists here;
- which documents are authoritative entry points;
- what each linked document contributes;
- which child areas should be traversed next.

Indexes must remain concise. They navigate knowledge; they must not become duplicate canonical documents.

When a concept/process document is created, moved, renamed, deprecated, or superseded, affected indexes must be reviewed in the same phase of work.

## Canonical ownership: one current rule, one natural home

Every durable design/process statement should have a natural current owner.

Before creating a new document, ask:

1. Does an existing canonical/methodology document already own this meaning?
2. Can that document be refined instead of creating another source of truth?
3. Is the proposed document a genuinely distinct semantic unit that merits its own identity and links?
4. Will a future reader know which document is authoritative if both exist?

Prefer a reference to existing knowledge over restating it.

A short local summary is acceptable when it materially aids comprehension, but it should link to the authoritative statement and must not introduce subtly different semantics.

## Phase records versus current knowledge

Phase records may repeat enough context to make historical reasoning understandable, but they must not become alternative canonical repositories.

Substantive phase work should:

- link to incoming current knowledge instead of copying it wholesale;
- record new analysis, alternatives, evidence, decisions, audits, and unresolved issues;
- promote durable conclusions into their natural current owners;
- leave rejected or superseded reasoning in phase history rather than canonical current truth.

The [Canonical and Historical Knowledge Authority](knowledge-authority.md) governs conflicts between these layers.

## Cross-linking and reference discipline

Use standard Markdown links to express meaningful relationships among documents. OKF consumers may treat links as directed graph edges.[^okf-v02]

References should be purposeful rather than decorative. Link when the target supplies authority, prerequisite context, a dependency, rationale, evidence, a superseding rule, or the next relevant knowledge node.

Prefer stable bundle-relative or valid relative paths supported by OKF. When a file is moved or renamed, review inbound and outbound links affected by its path identity.

Use `sources` for provenance when a document derives claims or rules materially from external or internal source artifacts. Do not create a redundant bibliography when links or structured provenance already express the relationship.

## Frontmatter discipline

Use the smallest useful frontmatter. `type` is the only universally required field for ordinary concept documents under OKF v0.2.[^okf-v02]

Base concept/process documents should normally also provide concise `title` and `description` values because they improve indexing, search snippets, and generated navigation. `tags` should be meaningful rather than exhaustive.

Do not invent verification, freshness, provenance, or lifecycle metadata that cannot be supported.

## Lifecycle, trust, and freshness metadata

OKF v0.2 supports optional metadata families such as `sources`, `generated`, `verified`, `status`, and `stale_after`.[^okf-v02]

Base uses these selectively:

- `sources` is appropriate when material knowledge derives from identifiable artifacts;
- `generated` is appropriate when machine/process generation provenance materially matters;
- `verified` is appropriate when verification evidence is actually maintained;
- `status` may be useful where machine-readable lifecycle state such as deprecated/superseded meaning adds value;
- `stale_after` may be useful for time-sensitive knowledge whose validity predictably expires.

Stable hand-authored methodology and conceptual design documents generally should not receive arbitrary expiration dates or synthetic verification fields merely for metadata completeness.

Freshness metadata never substitutes for correcting known-stale current authority.

## Staleness and supersession discipline

Treat staleness as a semantic/documentation-authority problem, not just an age problem.

Potential stale-current signals include:

- terminology that no longer matches current concept identities;
- links or indexes that point to retired paths or obsolete entry points;
- older readiness/lifecycle wording after process changes;
- provisional conclusions that appear current without qualification;
- phase records being used as the primary current answer after canonical knowledge changed;
- duplicate current rules that have drifted;
- tool-specific agent instructions based on obsolete product/tool behavior;
- external facts whose validity changed or whose explicit `stale_after` has passed.

Disposition stale findings as one of:

- corrected current authority;
- superseded/deprecated current knowledge with a clear replacement;
- intentionally retained historical phase evidence;
- removed from current navigation;
- unresolved owner review/blocker.

Do not delete useful historical evidence merely because it is old. Do not preserve stale current authority merely because it has history.

## Drift and coherence hazards

Treat the following as documentation defects requiring disposition:

- two current documents asserting incompatible rules;
- the same current rule copied into many documents and drifting independently;
- phase history being cited as current truth after canonical knowledge changed;
- stale terminology surviving after a canonical rename or conceptual refinement;
- an index omitting important current knowledge or pointing at superseded material as primary;
- broken or misleading internal links;
- orphan concept documents with no discoverable incoming navigation or meaningful graph relationship;
- provisional conclusions losing their provisional status through repetition;
- deprecated knowledge lacking a clear current replacement where one exists;
- frontmatter or reserved-file usage that violates the adopted OKF version;
- lifecycle/freshness metadata that is unsupported or no longer maintained;
- agent instruction files that duplicate and conflict with repository authority.

## Start-gate documentation check

Every `NNN-A` phase start gate must include a documentation/coherence planning check that:

- identifies the incoming canonical/methodology documents the phase will rely on;
- identifies unresolved or historical records that matter without treating them as current authority;
- determines expected current owners for durable outputs;
- identifies likely new documents only where distinct semantic identities are justified;
- identifies indexes and cross-links likely to require updates;
- checks for known documentation conflicts or drift that could bias the phase;
- checks whether staleness/freshness concerns are relevant to the phase;
- confirms planned subphases will reference rather than needlessly restate established knowledge.

## Subphase documentation discipline

Each substantive subphase should state which existing knowledge it consumes, which current documents it may change, and what new semantic knowledge—if any—requires a new document.

Do not create a document merely because a subphase exists. A subphase record and a canonical/process concept are different things.

## Exit-gate documentation integrity audit

Every phase exit review must verify:

- durable conclusions have been promoted to their natural current owners;
- current documents are mutually coherent to the extent affected by the phase;
- known superseded current statements have been corrected or explicitly lifecycle-managed;
- phase records remain historical evidence rather than competing authority;
- required indexes reflect the current corpus;
- important internal references resolve and point to intended authority;
- new concept/process documents are discoverable through indexes and/or meaningful graph links;
- avoidable duplication introduced during the phase has been consolidated;
- ordinary concept documents and reserved files conform to adopted OKF structural rules;
- lifecycle/freshness metadata, where used, is meaningful and maintained;
- carry-forwards name both their design/process destination and, where relevant, current knowledge destination.

A phase is not ready to exit merely because its planned phase files exist.

Phase 012 performs the lifecycle-wide pre-implementation version of this audit after concept-design closure.

## Refactoring documentation without rewriting history

Documentation structure may be improved as the repository grows. When refactoring:

- preserve phase history;
- move current meaning to the clearest owner;
- update links and indexes;
- avoid preserving duplicates solely for path nostalgia;
- record supersession when readers could otherwise mistake old material for current truth;
- review agent adapters and README/navigation when paths or authority entry points change.

Knowledge coherence takes precedence over maintaining an accidental early file layout.

## Agent-maintained corpus discipline

Because OKF is explicitly human- and agent-friendly, agent-authored changes must preserve the same authority rules as human-authored changes.

Agents should:

- inspect current owners before writing;
- avoid mass metadata additions without maintenance value;
- avoid generating one document per task or finding by default;
- keep tool-specific instruction files thin;
- correct stale current knowledge when in scope rather than creating a new workaround document;
- preserve meaningful provenance when external material drives a durable conclusion.

See [Agentic Development Governance](agentic-development-governance.md).

## Implementation boundary

This contract governs knowledge organization only. During concept design and Phase 012 preparation, it does not authorize documentation generators, linters, CI checks, indexes produced by code, or other executable implementation tooling merely to prove conformance.

Such tooling may be considered by a separate downstream engineering process after concept-design closure and pre-implementation preparation, if it is actually useful.
