# S-32-D — Offline shadow-review controller

This is a deliberately **non-operational contract harness**, not an installed review bot or a trusted evaluator. Its runtime imports only the Node 22 built-in crypto library: no HTTP client, filesystem, process runner, GitHub/Linear SDK, Actions launcher, secrets or provider API. It is not imported by the TreatFlow app.

## Run

Run npm run test:shadow for the Node test suite. The existing npm test command also runs shadow tests after Vitest; the existing Verify workflow needs no modification.

## Contract boundary

The offline evaluateOffline function accepts caller-provided synthetic JSON event, observations, policy and capture objects. It performs no authenticated GitHub/Linear calls or real Git graph retrieval. All asserted commits, checks, diffs and issue states originate in fixtures and remain **SYNTHETIC_UNATTESTED**.

An accepted fixture produces SHADOW_EVIDENCE_READY, never a real PASS. The snapshot is deterministically canonicalized, hashed with SHA-256 (including per-object hashes), copied and frozen; workKey correlates a simulated work unit. A hash does not authenticate a source, attest a workflow revision, or establish a durable claim.

Other states are SHADOW_IGNORED, SHADOW_HOLD and SHADOW_INSUFFICIENT_EVIDENCE. reviewWithMock records only SHADOW_REVIEW_RECORDED and binds its fake proposed PASS/HOLD to the snapshot digest. Every return sets canDispatch, canApprove and canWrite to false.

Text and nontext changes require explicit completeness and file digests, but this harness does not prove those assertions from Git. Squash and two-parent merge cases are modeled; a rebase requires a claimed complete integrated range, and indirect/batch merges are unsupported. Trusted policy, Actions, IAM and infrastructure path changes intentionally HOLD without a pre-merge authorization gate.

## Safety and deferred work

- Never insert credentials or real participant data in test fixtures.
- Synthetic CI name/app identity/workflow revision is **not** an authenticated GitHub Actions provenance proof.
- Duplicate execution is only duplicate offline calculation; there is no persistent claim ledger or paid launch.
- No GitHub Actions workflow, provider token, MCP connection, GitHub check publisher, Linear writer, branch setting, production deployment or AWS call is installed here.
- Complete git diff collection, source-authenticated receipts, immutable retention, trusted reviewer identity, fresh no-write provider denial, protected workflow custody, parent-work launch fencing, budget limits and separately authorized Linear Done remain future gated work.

The controlling design is in Linear S-32: B (original + R1) and C (original + R1 + R2). This file describes the executable test tool, not a replacement agent governance policy.
