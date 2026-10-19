# Phase 013 — Engineering Foundation & MVP Program Design

This is a **new downstream engineering design phase** after [Phase 012's qualified exit](../012/012-f-treatflow-exit-review.md). It does not itself authorize feature implementation or real-person operations.

- [Phase 013 definition and staged exit](phase-definition.md) — AWS deployment alternatives, cost/security requirements, B–H subphases.
- [013-A engineering design start gate](013-a-start-gate.md) — **PASS for planning only; merged**.
- [013-B architecture alternatives, security boundaries and conditional platform selection](013-b-aws-architecture-evaluation.md) — **preferred conditional AWS serverless candidate; merged**.
- [013-C environment isolation, Route 53, TLS, IAM and deployment trust](013-c-aws-environment-deployment-trust.md) — **documentary design PASS with external verification dependencies; merged**. Two-account preference, private dev access and guarded deployment trust.
- [013-D AWS FinOps, operational requirements, scaling and abuse economics](013-d-aws-finops-operational-economics.md) — **documentary evaluation PASS with unapproved cost/budget and API ingress dependencies, pending merge**. Includes S0–S3 assumption-led cost scenarios, CloudFront flat/PAYG tradeoffs, operational test targets, back-end WAF bypass analysis and budget/kill-switch gates; 013-E next after merge.
- [Candidate implementation roadmap](mvp-roadmap.md) — proposed 014–019 milestones, private nonprod MVP candidate and distinct public production release decision.

[Canonical product authority](../../canonical/) · [Phase 012 safety handoff](../012/012-e-treatflow-handoff.md) · [Knowledge bundle](../../index.md)
