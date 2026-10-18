---
type: Methodology Authority
title: Concept Design Methodology Authority
description: Defines the methodological authority and interpretation rules for the Base concept-design lifecycle and its boundary with post-closure preparation.
tags: [methodology, concept-design, authority, pre-implementation]
---

# Concept Design Methodology Authority

## Primary design authority

The repository adopts Daniel Jackson's software concept design methodology, principally as developed in *The Essence of Software* and Jackson's associated concept-design materials.

The methodology is used for **concept design**, not application implementation.

Its central concerns include:

- identifying human purposes that software must serve;
- discovering concepts that fulfill those purposes;
- describing each concept through its purpose, operational principle, state, and actions;
- preserving concept independence and genericity;
- making concept interactions explicit through synchronization rather than collapsing concepts into one another;
- analyzing dependencies and composition;
- mapping concepts to user-visible product behavior;
- refining designs through specificity, familiarity, integrity, and related design-quality considerations;
- validating the design against representative scenarios, failures, misfits, authority boundaries, and completeness concerns.

## Numbered lifecycle interpretation

Jackson does not prescribe the numbered phase lifecycle used by this repository.

Phases `000–011` are therefore a Base **operationalization** of the methodology: a dependency-safe structure for ensuring that its concept-design work is performed thoroughly and audibly.

No repository document may present the Base phase numbering as official Jackson phase numbering.

## Phase 012 boundary

[Phase 012 — Pre-Implementation Audit, OKF Hardening & Agentic Development Preparation](../phases/012/) is a Base process phase **outside** Jackson's concept-design methodology.

It exists only after successful Phase 011 concept-design closure to audit/polish the repository, reconcile stale/current documentation, harden OKF navigation/authority, refresh repository orientation, prepare agentic development rules, and improve the downstream engineering handoff.

Phase 012 must not be described as an additional Jackson concept-design phase, and it must not begin feature implementation.

## Method over inherited process habit

When there is tension between:

1. a prior project's customary phase structure, and
2. the actual needs of concept design,

the methodology takes precedence.

A cloned repository must derive its phase substructure from the design problem at hand rather than mechanically reproduce the number or names of subphases used by earlier projects.

## Design-object discipline

Concept-design artifacts should describe observable design semantics rather than internal implementation choices.

A concept specification may define, as appropriate:

- purpose;
- operational principle;
- state;
- actions;
- invariants;
- dependencies;
- synchronization relationships;
- actor or authority implications;
- lifecycle semantics;
- correction or historical semantics;
- product-facing mappings;
- known limitations or unresolved design questions.

These are design statements. They must not be converted into implementation artifacts during the concept-design lifecycle.

## Quality principles

The design lifecycle must repeatedly consider, rather than defer entirely to the end:

- **Specificity** — whether purposes and concepts are appropriately separated and whether one concept is being made to serve unrelated purposes.
- **Familiarity** — whether established, understandable concepts can satisfy the intended purpose rather than introducing unnecessary novelty.
- **Integrity** — whether concepts preserve coherent independent meaning when combined with the rest of the design.

Concept independence, composition, synchronization, and dependency analysis are similarly cross-cutting concerns and may require revisiting earlier conclusions.

## Template authority

This document governs methodology interpretation for repositories cloned from Base unless the cloned project deliberately supersedes it with a documented methodological decision.

Any such supersession must remain explicit about where concept design ends, what process follows, and what implementation activity is or is not authorized.
