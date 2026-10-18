---
type: Design Guardrail
title: Design-Only Guardrails
description: Prevents implementation work from beginning before complete concept-design closure and clarifies the post-closure Phase 012 preparation boundary.
tags: [design, guardrail, implementation, readiness, pre-implementation]
---

# Design-Only Guardrails

## Governing invariant

The Base concept-design lifecycle is design-only until the complete concept-design process has closed.

Before successful Phase 011 closure, implementation is always:

- **Implementation readiness:** not ready
- **Implementation execution:** not started
- **Implementation authorization:** not yet

The purpose of the concept-design lifecycle is to reach a state in which downstream engineering can be constrained by a coherent and reviewed design. It is not itself an implementation lifecycle.

## Prohibited work during concept design

The following must not be created as executable or implementation artifacts during Phases `000–011`:

- application source code;
- production or prototype feature implementation;
- database schemas intended for execution;
- migrations;
- persistence implementations;
- API handlers or executable API contracts;
- authentication or authorization implementation;
- infrastructure-as-code;
- deployment configuration;
- CI/CD pipelines whose purpose is application delivery;
- executable test harnesses for application behavior;
- framework or package bootstrapping intended to begin implementation;
- runtime configuration;
- service topology implementation;
- production secrets or secret-management setup;
- implementation-enforcing repository rules that prematurely constrain unresolved design.

## Allowed implementation-facing design work

Design may identify and record:

- implementation implications;
- architectural consequences;
- required qualities or constraints;
- technical risks;
- capability needs;
- data or consistency semantics;
- security properties;
- interoperability needs;
- migration or compatibility concerns;
- unresolved technical questions for later engineering.

These remain **design knowledge or downstream considerations**. They are not permission to instantiate a solution.

## Avoiding premature architecture lock-in

Concept design may expose architectural forces, but the design process must not turn contingent implementation choices into concept semantics.

Where a design conclusion could be satisfied by multiple architectures, record the required property rather than selecting machinery prematurely.

For example:

- prefer “the action must be atomic with respect to X” over prescribing a specific transaction technology;
- prefer “historical references must remain resolvable” over selecting a storage engine;
- prefer “authorization must preserve this authority boundary” over choosing an identity provider.

## Phase 011 readiness transition

Only successful Phase 011 concept-design closure may change implementation readiness from **not ready** to **ready**.

After successful closure:

- implementation readiness may be **ready**;
- implementation execution remains **not started**;
- Base has not granted implementation execution authorization;
- a separate downstream process is still required before application implementation begins.

The Phase 011 handoff should therefore communicate:

> **Implementation readiness: ready / execution: not started**

and never “implementation underway,” “bootstrap complete,” or equivalent wording.

## Phase 012 pre-implementation preparation

Phase 012 occurs only after successful concept-design closure.

It may perform:

- repository/documentation audits;
- OKF conformance and progressive-disclosure hardening;
- stale/superseded/duplicate documentation reconciliation;
- README and knowledge-navigation polish;
- agentic development governance and tool-specific instruction adapters;
- downstream implementation-handoff preparation;
- non-executable engineering obligation/question capture.

Phase 012 must **not** use “preparation” as permission to begin feature implementation, architecture bootstrap, schema/API construction, framework setup, executable test harnesses, infrastructure, or other application implementation.

A successful Phase 012 exit preserves:

- **Implementation readiness:** ready
- **Implementation execution:** not started
- **Implementation execution authorization:** not granted by Phase 012
- **Pre-implementation preparation:** complete

A separate representation/architecture/engineering process decides when implementation execution is actually authorized.

## Violation handling

If implementation work is discovered during concept design or Phase 012 preparation:

1. stop extending it;
2. classify whether the artifact contains useful design/preparation evidence;
3. preserve only the relevant durable conclusions in their natural knowledge owners;
4. quarantine or remove executable implementation artifacts as appropriate;
5. record the correction in the relevant phase history;
6. re-evaluate whether any design conclusions or preparation decisions were biased by the premature implementation choice.
