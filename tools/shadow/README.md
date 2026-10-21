# S-32-D — Offline shadow-review controller

This is a deliberately **non-operational contract harness**, not an installed review bot or a trusted evaluator. Its runtime imports only the Node 22 built-in crypto library: no HTTP client, filesystem, process runner, GitHub/Linear SDK, Actions launcher, secrets or provider API. It is not imported by the TreatFlow app.

## Run

Run npm run test:shadow for the Node test suite. The existing npm test command also runs shadow tests after Vitest; the existing Verify workflow needs no modification.

## Contract boundary

The offline evaluateOffline function accepts caller-provided synthetic JSON event, observations, policy and capture objects. It performs no authenticated GitHub/Linear calls or real Git graph retrieval. All asserted commits, checks, diffs and issue states originate in fixtures and remain **SYNTHETIC_UNATTESTED**.

An accepted fixture produces SHADOW_EVIDENCE_READY, never a real PASS. The snapshot is deterministically canonicalized, hashed with SHA-256 (including per-object hashes), copied and frozen; workKey correlates a simulated work unit. A hash does not authenticate a source, attest a workflow revision, or establish a durable claim.

Other states are SHADOW_IGNORED, SHADOW_HOLD and SHADOW_INSUFFICIENT_EVIDENCE. reviewWithMock records only SHADOW_REVIEW_RECORDED and binds its fake proposed PASS/HOLD to the snapshot digest. Every return sets canDispatch, canApprove and canWrite to false.

Text and nontext changes require explicit completeness and file digests, but this harness does not prove those assertions from Git. **Squash/rebase additionally require exact correspondence of synthetic authored vs. landed file descriptors** (path, rename provenance, change type, kind and text-patch/nontext-object digest), allowing file-order differences but holding unreconciled transformations. This is strict synthetic descriptor matching, **not authenticated patch/tree equivalence**; legitimate transformed patches without independent reconciliation also HOLD. Two-parent merge cases are modeled; a rebase requires a declared complete integrated range, and indirect/batch merges are unsupported. Phase records including active Phase 014 deployment authority and later numbered phases deliberately HOLD without a pre-merge authorization gate.

CI execution inputs (including `package.json`, lockfiles, `scripts/`, `vite.config.*`, `vitest.config.*`, `eslint.config.*`, `tsconfig*.json` and other standard Verify tool configurations) also HOLD as policy-sensitive. The simulated CI workflow path must name a directly contained `.yml` or `.yaml` file in `.github/workflows/`, and rename origins must be unique; copy provenance remains unsupported.

The input-copy resource limit reserves headroom for its later immutable evidence envelope: at most **4,096 input nodes / 768 KiB of serialized string values and property names**, versus **8,192 envelope nodes / 1 MiB**. Both UTF-8 keys and values count toward the byte cap before descriptor copying/canonicalization; malformed, deeply nested or oversized objects fail closed. These are resource guards for synthetic fixtures, not a production sandbox or an API quota.

## Safety and deferred work

- Never insert credentials or real participant data in test fixtures.
- Synthetic CI name/app identity/workflow revision is **not** an authenticated GitHub Actions provenance proof.
- Duplicate execution is only duplicate offline calculation; there is no persistent claim ledger or paid launch.
- No GitHub Actions workflow, provider token, MCP connection, GitHub check publisher, Linear writer, branch setting, production deployment or AWS call is installed here.
- Complete git diff collection, source-authenticated receipts, immutable retention, trusted reviewer identity, fresh no-write provider denial, protected workflow custody, parent-work launch fencing, budget limits and separately authorized Linear Done remain future gated work.

The controlling design is in Linear S-32: B (original + R1) and C (original + R1 + R2). This file describes the executable test tool, not a replacement agent governance policy.
