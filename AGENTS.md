# Base Repository Agent Instructions

These instructions apply to coding agents working in repositories cloned from Base.

## Start with repository authority

Before making a substantive change, inspect the smallest relevant set of current repository knowledge:

1. `README.md`
2. `docs/index.md`
3. the relevant current documents under `docs/canonical/`
4. the active lifecycle/readiness state and relevant phase handoff
5. `docs/methodology/agentic-development-governance.md`

Do not treat phase history as current truth when a canonical owner exists.

## Knowledge authority

Interpret repository knowledge in this order:

1. current canonical knowledge;
2. current methodology/process contracts;
3. active phase handoff and explicitly provisional work;
4. historical phase records;
5. incidental notes or suggestions not promoted into the knowledge bundle.

If a requested change conflicts materially with current design authority, surface the conflict and update the natural design owner when the design itself is intentionally changing. Do not silently code around it.

## Lifecycle boundary

- Phases `000–011` are the Jackson-aligned concept-design lifecycle.
- Before successful Phase `011` closure, application implementation is not ready and must not begin.
- Phase `012` is post-closure pre-implementation preparation: documentation/OKF audit, stale-document cleanup, README/rule maintenance, and engineering handoff preparation.
- Phase `012` does not itself start feature implementation or authorize implementation execution.
- A separate downstream representation/architecture/engineering process must decide when implementation execution begins.

## OKF documentation rules

Treat `docs/` as an Open Knowledge Format (OKF) v0.2 bundle.

When editing it:

- ordinary concept documents require YAML frontmatter with non-empty `type`;
- non-root `index.md` files are frontmatter-free navigation documents;
- `docs/index.md` is the bundle root and may declare `okf_version: "0.2"`;
- `log.md`, if present, is reserved for chronological history;
- use `sources` when durable knowledge materially derives from another artifact;
- use lifecycle/freshness metadata only when it adds real maintenance value;
- update affected indexes and links after moves, renames, supersession, or new current knowledge;
- prefer links to current authority over copied summaries.

## Inspect before creating

Before adding a file, abstraction, service, helper, test, configuration, or document:

- inspect existing natural owners/patterns;
- confirm the new artifact has a current purpose;
- prefer modifying an existing owner over creating duplicate truth;
- avoid speculative scaffolding for hypothetical future needs.

Temporary reasoning or migration files should not remain unless they have durable value.

## Stale knowledge

Do not implement against documentation you know is stale.

Check whether a document:

- is canonical or historical;
- uses current terminology and paths;
- has been superseded by later current knowledge;
- carries lifecycle/freshness metadata that changes how it should be interpreted.

Correct stale current authority when it is within the requested change's scope.

## Design-to-implementation fidelity

Implementation should preserve current conceptual obligations, including relevant:

- purposes and concept semantics;
- application actions and synchronizations;
- authority boundaries;
- lifecycle/history/correction/recovery behavior;
- product/variant scope;
- user-visible mapping/disclosure requirements;
- accepted limitations/non-goals;
- conceptual safety/privacy/interoperability/consistency constraints.

If implementation work exposes a missing or contradictory design rule, update/reopen the natural design owner rather than making source code the only authority for new user-facing semantics.

## Agentic anti-bloat

- Make the smallest coherent change that satisfies the task.
- Do not create documentation merely to narrate work already represented by code or phase evidence.
- Do not duplicate canonical design into agent rules, source comments, or new summaries.
- Avoid speculative abstractions and premature generalization.
- Remove scratch artifacts before completion.
- Keep tool-specific rules thin; shared policy belongs in repository authority.

## Verification

Once implementation execution is actually authorized:

- use the narrowest meaningful verification for the changed behavior;
- broaden checks only when risk, failures, or repository policy justify it;
- update current documentation when public/user-facing semantics change;
- check affected references after renames/moves;
- report material uncertainty or intentionally unperformed validation.

Do not create tests that only mirror implementation details without meaningful behavioral value.

## Protected authority and security

Agent instructions are guidance, not a security boundary. Do not treat file-write capability as authorization to bypass protected human/organizational decisions, production controls, secrets handling, deployment approval, or other high-consequence authority established by the design.

## Canonical governance

For the full shared rule contract, read:

`docs/methodology/agentic-development-governance.md`
