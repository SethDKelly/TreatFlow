---
type: Knowledge Authority Contract
title: Canonical and Historical Knowledge Authority
description: Defines how current design truth is separated from phase evidence and how conclusions are promoted, superseded, corrected, and preserved.
tags: [knowledge, authority, canonical, history, okf]
---

# Canonical and Historical Knowledge Authority

## Principle

The repository maintains two intentionally different knowledge layers:

1. **Canonical knowledge** — the best current statement of what the design means.
2. **Phase records** — evidence of how the design was explored, debated, refined, validated, and handed off.

They serve different purposes and must not be treated as interchangeable.

## Canonical knowledge

Canonical documents should contain durable current truth such as:

- product purposes and needs;
- concept definitions;
- operational principles;
- state and action semantics;
- invariants;
- synchronizations;
- dependencies;
- authority boundaries;
- lifecycle and temporal semantics;
- mappings and experience contracts;
- design principles and accepted constraints;
- explicit open questions that remain current.

Canonical documents should be concise enough for progressive disclosure and agent retrieval, while linking to supporting phase evidence where deeper rationale is needed.

## Phase records

Phase records may contain:

- candidate ideas;
- rejected alternatives;
- exploratory reasoning;
- comparison tables;
- evidence gathered;
- provisional hypotheses;
- review findings;
- discovered conflicts;
- corrections;
- exit decisions;
- handoff state.

A statement appearing in a phase record is not automatically current merely because the phase was completed.

## Promotion rule

A durable conclusion discovered in phase work should be promoted into the appropriate canonical document.

Promotion means more than copying prose. The canonical form should express the stable design meaning without unnecessary process history.

The originating phase record should link to the canonical result where practical.

## Supersession rule

When a canonical conclusion changes:

- update the canonical statement to reflect current truth;
- preserve the historical phase record that led to the older conclusion;
- record the supersession or correction where needed for traceability;
- review dependent canonical knowledge for impact.

Do not preserve contradictory statements as equally authoritative merely to avoid editing an older canonical file.

## Authority order

When sources conflict, use the following interpretation:

1. current canonical knowledge;
2. current methodology/process contracts;
3. active phase handoff and explicitly provisional work;
4. historical phase records;
5. incidental discussion or external notes not promoted into the bundle.

This ordering does not make canonical knowledge infallible. It identifies what the repository currently asserts so that corrections can be deliberate and traceable.

## Progressive disclosure

Directory `index.md` files should answer, at minimum:

- what knowledge exists here;
- which documents are current entry points;
- what should be read next;
- where deeper historical evidence can be found.

Readers and agents should not need to scan every historical phase file to discover the current rule.

## Phase completion requirement

A high-level phase cannot successfully exit unless it verifies that:

- durable conclusions have a canonical home;
- canonical documents do not knowingly contain superseded truth;
- historical records remain available for rationale and traceability;
- unresolved items are clearly distinguished from accepted design.

## Anti-bloat rule

Canonical knowledge should not become a duplicate archive of every phase artifact.

Prefer:

- one authoritative concept document plus links to evidence,

over:

- many nearly identical phase summaries all restating the same current rule.

The goal is a compact, traversable knowledge graph with a separate auditable history.
