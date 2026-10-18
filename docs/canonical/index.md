# Canonical Design Knowledge

This directory contains the **current authoritative design state** for a project created from Base. Phase records explain how conclusions were reached; canonical documents state what the design currently means.

## Typical knowledge families

A cloned project should create only the families its design actually needs. Common families may include:

- `project/` — current intake definition, context, actors, boundaries, constraints, assumptions, and unresolved project questions;
- `purpose/` — human purposes, needs, burdens, desired improvements, success framing, and purpose tensions;
- `concepts/` — concept definitions, operational principles, state, actions, invariants, and independence boundaries;
- `synchronizations/` — explicit cross-concept interactions;
- `dependencies/` — concept inclusion dependencies and product-family relationships;
- `authority/` — actors, protected decisions, authority seams, and non-substitutable responsibilities;
- `experience/` — mappings from concepts into user-visible behavior and experience contracts;
- `principles/` — project-specific design principles, accepted constraints, and durable policy;
- `decisions/` — durable design decisions not naturally owned elsewhere;
- `open-questions/` — unresolved design questions that remain current.

These are suggested knowledge families, not a mandatory taxonomy.

## Authority and documentation discipline

When a conclusion becomes durable, promote its stable meaning here rather than forcing future readers to reconstruct current truth from phase history. Prefer updating an existing natural owner and linking to it over creating duplicative canonical documents.

See [Canonical and Historical Knowledge Authority](../methodology/knowledge-authority.md) and [Documentation Integrity & OKF Governance](../methodology/documentation-governance.md).

## Navigation

- [Bundle root](../)
- [Phase records](../phases/)
- [Methodology](../methodology/)
