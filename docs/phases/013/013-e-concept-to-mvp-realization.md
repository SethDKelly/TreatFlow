---
type: Engineering MVP Realization Contract
title: TreatFlow 013-E — Concept-to-MVP Realization, Identity, Observation and Scope
description: Bounded observation-first MVP contracts with provisional identity/access alternatives, semantic test cases, protected operational gates and cost-aware realization obligations.
tags: [treatflow, phase-013, mvp, observation, identity, eligibility, acceptance, engineering-design]
sources:
  - id: cognito-pkce
    resource: https://docs.aws.amazon.com/cognito/latest/developerguide/using-pkce-in-authorization-code.html
    title: Amazon Cognito — PKCE authorization code
  - id: api-jwt
    resource: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-jwt-authorizer.html
    title: API Gateway — HTTP API JWT authorizers and route scopes
  - id: ddb-conditional
    resource: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html
    title: DynamoDB — Conditional write behavior and idempotence considerations
---

# 013-E — Concept-to-MVP Realization Contracts, Identity, Observation Semantics & Scope Qualification

## Entry, purpose and qualified decision

**013-E CONTRACT DESIGN PASS WITH BLOCKING IDENTITY, CORRECTION AND OPERATION DECISIONS CARRIED TO 013-G/H; PENDING PR MERGE.** Phase 013-D merged on main at commit \`8aa55d6606139db85598dc0e809d981eb7c97e0a\`. Scope is **engineering realization contract definition**, not implementing a frontend, API, storage schema, authentication service or human-facing product.

This is a *downstream design translation*, not a new canonical concept. The binding design meanings remain [observation-first purpose](../../canonical/purpose/purposes.md), [adopted five-concept family and excluded mandatory identity registration](../../canonical/project/concept-family-scope.md), [Observation seven-action behavior](../../canonical/concepts/observation.md), [Observation representation](../../canonical/mapping/observation-representation.md), [29-action qualified surface](../../canonical/composition/application-action-surface.md), [integrated unknown outcomes](../../canonical/mapping/integrated-action-language.md), [optional contribution/correction composition](../../canonical/composition/observation-stewardship-revision.md) and [six residual safeguards](../012/012-e-treatflow-handoff.md). [013-B](013-b-aws-architecture-evaluation.md)–[013-D](013-d-aws-finops-operational-economics.md) provide AWS and cost hypotheses, not user-purpose authority.

**MVP candidate definition:** a legitimate *synthetic* participant in **access-restricted nonproduction** can establish an Observation, record a near-present count or bounded interval total, optionally assert/qualify monitoring attention and completeness, inspect qualified reports, close and inspect after close, while seeing truthful action outcomes and only their own entitled state. Research Provision, Controlled Disclosure, public sharing and Contribution Stewardship are not prerequisites for this independently sufficient O-only path. This does **not** adopt a second one-concept product; it is a staged realization within the existing five-concept product family.

**Two separate milestones:** (1) **Phase 018 synthetic-only, protected-nonprod MVP candidate** with independently tested fidelity, correctness, privacy and recovery; (2) any public production **real-person participation** is a later explicit eligibility/privacy/operational decision under R-P02; any external observation material availability is separately blocked under R-P03. A public informative production website may exist with server-side intake disabled.

## E01 — MVP outcome, usage boundaries and scope table

| Area | MVP candidate requirement | Decision / deferral |
|---|---|---|
| Observation O (all seven intrinsic actions) | Establish, Report, AssertCoverage, Qualify, Inspect, Close and InspectAfterClose are coherently representable with honest guards and state | **Core**; not necessarily seven dedicated pages or buttons; must be discoverable and testable |
| Primary low-burden two reporting modes | Qualified near-present person total; qualified aggregate person total across a bounded interval; explicit other declared unit only where supported | **Core**; no fabricated individual arrivals or monitoring |
| Attention, coverage and zero | Optional observed / not-observed / uncertain coverage; reporting-completeness complete claimed / partial / unknown; claim uncertainty remains visible | **Core semantic protection**; not an obligatory monitoring wizard for every report |
| Personal history and closure | Entitled private account inspection before/after close; closing prohibits further *direct O additions* | **Core**; no implicit delete/publication/consent |
| Legitimate technical access | Protected session/private entitlement, isolated users/environments, no public account-to-observation inference | **Core protection**; final guest/managed-identity choice remains a blocked decision |
| Action effects | Confirmed effected / confirmed not effected / unresolved; distinguish retries and possible duplicates; valid target references | **Core**; no silent exactly-once guarantee |
| Observation qualifiers vs factual corrections | O.Qualify adds/refines qualification without silently replacing incompatible factual assertions | **Core**. Actual factual count replacement/history is protected **Revision**, not free-form edit of an O item; product-path/deferral must be signed off |
| Stewardship S | Protected contributor standing and contest logic only with independently justified authority | **Deferred** from primary flow; cannot assume technical account = Party or automatically Associate |
| Revision V | Protected, history-preserving factual replacement/dispute adjudication | **Deferred candidate** beyond O-first MVP, but **not** replaced with destructive edits. 013-G must review impact on user correction needs and possibly move a minimal protected V slice into scope or HOLD candidate |
| Research R and disclosure D | Suitability qualification, research delivery and prospective disclosure guards | **Not in MVP**; explicit negative tests that API/UI cannot make records public or claim Poisson/representative findings |
| Public production & real operation | Public HTTPS shell may be independently reviewed; real participant intake and public data disclosure remain separate | **Not authorized** by MVP qualification |
| Location, people and household metadata | Minimum necessary context without inferred exact household, child/visitor identities, device fingerprints or tracking | **No precise location requirement**; any proposed scope/restriction re-evaluated under R-P02/R-P03 |
| Production ready vs candidate | Testable, synthetic, owner-isolated nonproduction realization | **Candidate only**. Observed usability, operational recovery and safety permissions remain unproven |

A deferred concept does not become absent from the *concept family*, and no separate O-only product or mandatory sign-up variant is invented. Scope can be reduced only when the primary experience still has coherent technical and semantic behavior.

## E02 — Identity and private entitlement are different from Contribution Stewardship

**Material conflict surfaced and explicitly NOT silently decided:** the [canonical family](../../canonical/project/concept-family-scope.md) excludes **mandatory identity registration**; [013-B](013-b-aws-architecture-evaluation.md) suggested Cognito sign-in as one implementation. A compulsory email/password or federated account for all reporting would need proof of compatibility or deliberate product-scope reentry. Cognito authentication may be used for **developers/testers**, but that does not authorize requiring a conventional login from all future public participants.

Separate four notions:
1. **Eligibility for real-person participation:** policy/age/guardian/household/consent constraints **not proven**; requires competent R-P02 decision independent of AWS credentials, before any real collection.
2. **Technical principal or capability:** cryptographic mechanism that can safely authenticate a returning client for a permitted private account. May be pseudonymous and not require public naming or conventional registration; a valid token is not household ownership or guardian permission.
3. **Entitlement to a particular Observation:** server-enforced relation between permitted technical principal/capability and that bounded Observation. Never infer from user-supplied IDs, shared geography, IP, email coincidence or a Cognito \`sub\` alone without an established binding.
4. **Contribution Stewardship Party / Revision authority:** distinct conceptual roles with separate guards. Technical ownership of an observation does **not** automatically create protected C-01 association, correction rights, release approval or another household member's standing.

**Identity alternatives for 013-G choice:**

| Candidate | Benefit | Critical limitation / test |
|---|---|---|
| **A — invitation-scoped pseudonymous guest session/capability in synthetic nonprod**, with owner binding | Exercises O-first flow without mandatory participant registration | Secret loss/device switch may lose access; secure issuance, entropy, theft/replay, expiry, revocation, persistence, browser XSS/CSRF and cross-user denial must be designed. Not a public self-registration or real-person intake permission |
| **B — voluntary account/linking for recovery**, possibly Cognito user pool + code/PKCE | Durable optional recovery and cross-device access; managed issuer for authenticated testers | Account linking must be opt-in and not compulsory for first O.Report. Sign-up messaging/MAU, privacy, proof of account-to-record binding and recovery takeover need validation |
| **C — compulsory registered Cognito participant** | Simplifies technical owner proof and session management | **Not approved** as default: likely conflicts with no mandatory registration. Requires sponsor-backed conceptual decision/reentry, not a feature-selection convenience |
| **D — local-only private data** | Low cloud spend, can work without sign-up | Private remote review, device loss, recovery and multi-device promises may fail. A distinct privacy/session contract would be required; not auto-adopted as product meaning |

**Recommendation for MVP qualification:** use **A** as a *provisional nonproduction-only synthetic test principal* (or verified equivalent) and evaluate optional recovery **B**; do not build a public anonymous-write service. The development **viewer gate** and **tester admission** from 013-C are independent of each app test principal; authorization must deny non-testers even with a syntactically valid token. Do not equate the availability of developer OIDC login to the participant onboarding contract.

If Cognito/PKCE is selected: use the OAuth 2 authorization-code flow with PKCE for public clients rather than putting credentials or tokens in query parameters; require the correct issuer/client/audience/scopes and protected state/nonce. HTTP API JWT authorizers validate issuer, audience and scopes, but **their success cannot replace per-Observation owner/eligibility checks**. Token storage choice (in-memory/BFF/secure cookie), CSRF/XSS posture, refresh/logout, session expiration, cross-tab and expired-session recovery are **013-G contract decisions**; no blanket claim that local storage is safe. AWS HTTP API JWT authorizers can accept ID tokens under some configurations unless routes properly constrain intended access-token scopes/issuer/audience; this must be explicitly tested.

**Gate:** if there is no implementation design that provides legitimate private access without unapproved mandatory registration, 013-G must **HOLD** or reopen the relevant canonical scope; it may not silently narrow the sponsor's primary purpose.

## E03 — Observation record semantics (conceptual contract, not physical schema)

An engineering representation, whatever its eventual API/storage names, must preserve:

| Conceptual field/category | Required meaning | Invalid coercion |
|---|---|---|
| Observation identity and lifecycle | Opaque account ID; legitimate source and context; \`open\` / \`closed\` | Identity of residence/person, lifetime public profile or automatic release |
| EvidenceItem / Measure | Distinct reported item/reference, declared unit (e.g. people vs group encounters), nonnegative reported quantity or event claim with relevant uncertainty | Five people treated as five separate group encounters/event timestamps |
| TimeExtent | Asserted approximate near-present occurrence or bounded period, time zone/offset and precision if relevant; separate server receipt/action time | Submission time converted into exact visit time; interval total expanded to timed arrivals |
| Provenance | Whether contemporaneous or recalled; qualifier of uncertainty, how evidence was known | Recalled report represented as exact real-time observation |
| Coverage | Explicit observed / not observed / uncertain assertions, with own time extent and precision | Unreported attention assumed watched, or coverage inferred from a positive count |
| Completeness | Complete claimed / partial / unknown for declared unit and extent; not independently verified | Claimed completeness used as proof of flawless counting |
| Conflict | Overlaps with incompatible claims remain marked unresolved/contested for entitled interpretation | Last-write-wins chronology hiding contradictory claims |
| Scope/owner binding | Entitled principal/capability to Observation; environment and ownership checked server-side | Supplied Observation ID or shared IP interpreted as sufficient owner authority |
| Outcome/attempt | Accepted item/ref or known denial/no effect, or unknown pending reconciliation; a retry's attempt identity separate from evidence identity | Timeout shown as successful, failed, safely retryable or new activity without evidence |

**Zero rule:** \`quantity=0\` alone does not establish watched quiet. A zero interpretable as *reported observed zero* requires explicit observed coverage over the relevant extent, complete-claimed reporting for the **same unit and extent**, and no unresolved contradictory activity. A new empty Observation is not a verified zero. A coverage claim by itself is not a new activity measure. Avoid cross-concept unit or identity collisions.

**Temporal examples to preserve:**
- \`NOW · TOTAL(4 people)\`: **one** near-present qualified person-count assertion, *not* four independently timed events; monitoring coverage remains unasserted/unknown unless separately stated.
- \`6 PM–10 PM · TOTAL(83 people)\`: **one** interval-total person-count assertion, *not* 83 event timestamps, a verified continuous four-hour observation, or an inferred rate.
- \`18:00–18:20 observed, complete claimed, 0 groups\`: a reported zero for the declared group unit/extent when no contradiction; other units remain unknown.
- \`18:20–18:35 not observed\`: not a zero; a later recalled total with low precision may coexist with unknown coverage without invented completeness.
- \`6 PM–7 PM observed\` and overlapping \`6:30 PM–7:30 PM not observed\`: report conflict/contested overlap, not a normalized uninterrupted coverage block.

**Persisting one count is not the same as preserving interpretation.** Data minimization is mandatory: do not add household geolocation, address, child/visitor identities, passive tracking, IP-derived observation coordinates or research export fields because the database can store them. Token/audit logs should avoid exposure of private contents.

## E04 — Core action/state/authorization realization matrix

| O action | Successful behavior and guard | Required denied/negative result | Acceptance evidence |
|---|---|---|---|
| \`Establish\` | Eligible synthetic test source in approved dev session establishes **open** private Observation and receives opaque ID; no S, V, R or D enrollment | No unauthenticated/non-tester access; no implicit coverage or evidence; no public record | Creation plus scoped empty Inspect |
| \`Report\` | Owner of open Observation asserts one qualified measure, extent, provenance and uncertainty, receiving evidence reference | Closed/foreign account, illegal unit/quantity or unauthorized real-data production intake denied; no auto-coverage | Near-present and interval synthetic fixture outputs |
| \`AssertCoverage\` | Owner of open Observation adds explicit attention and completeness qualifiers with extent/precision | No synthetic person count, no inferred watched-zero; after-close denied | Coverage state view and observed-zero composite guard |
| \`Qualify\` | Owner of open Observation adds/refines supported qualifiers with provenance | No factual count replacement, overlap erasure or hidden V.Amend; closed denied | Original retained and qualifiers inspectable |
| \`Inspect\` | Entitled party reviews open account's qualified evidence/coverage, conflicts, lifecycle and outcomes | Foreign/deleted/no-entitlement token sees no private state; no CDN public cache | Owner A/B isolation and history/meaning |
| \`Close\` | Legitimate owner transitions open to closed; previous items remain and \`InspectAfterClose\` works | Closed or unauthorized double close does not mutate; no implied deletion/release | Closure version and denial of new O additions |
| \`InspectAfterClose\` | Entitled party reviews closed account without creating new evidence | Foreign/non-closed scope denied appropriately; no reopened account | Same assertion meanings remain visible |

No specified path, JSON fields, DynamoDB keys or route count is mandated by this **semantic matrix**. Concrete API operations will be defined in the subsequent implementation contract after architecture approval, with explicit route auth, input validation, error semantics and resource costs.

## E05 — Effect outcomes, retries, persistence and recovery

**Canonical feedback states:** (1) **confirmed effected** with authorized evidence/account reference; (2) **confirmed not effected** when authoritative status establishes no effect; (3) **unresolved** when an interrupted attempt cannot be reconciled. **A network timeout alone proves neither success nor failure.**

Propose a future *bounded* attempt identity contract (not an extra Observation action): client sends a high-entropy unique attempt reference tied to principal, Observation, intended action and payload fingerprint; service checks same-attempt repeat versus conflicting re-use; returns a stable known effect or explicit unresolved state within a declared reconciliation window. **Never deduplicate distinct equal-looking visitor totals just because quantities/timestamps match.** Same idempotency key with modified payload should be rejected; key expiration and record retention must be clear. Attempt persistence, conditional write/transaction choice, atomic write effects, reconciliation endpoint semantics, concurrent device handling and cost are **013-G and 015 architectural choices**, not decided here.

DynamoDB conditional writes and optimistic locking are **candidates** for preventing silent overwrite/duplicate acceptance; AWS cautions unconditional item writes can overwrite and version-checked updates signal conflicts. But using DynamoDB does not by itself prove end-to-end exactly-once behavior or a particular protected policy.

**Required observable cases:** a dropped HTTP response *after committed report*; dropped request before arrival; identical replay of same attempt; deliberate separate new report with identical people count; modified replay payload; concurrent close-vs-report; two authorized browser tabs; data store throttle/error; expired guest capability with pending attempt. The client must not fabricate acceptance or prompt unsafe blind retry, and an entitled inspection must not falsely claim proof of a specific attempt without credible attempt-to-effect binding.

## E06 — Boundary between legitimate qualification, correction and deletion

**O.Qualify is not generic editing.** It adjusts qualifying information on an open Observation, does not silently change a fact from “five people” to “four”, and cannot overwrite an earlier reported total.

If the user wants to replace a factual assertion (or correct one after Close), the canonical [Revision](../../canonical/concepts/revision.md) and [O/S/V composition](../../canonical/composition/observation-stewardship-revision.md) require legitimate authority and a historical successor, never an invisible \`UPDATE count\`. A V slice may be deferred for an observation-first **synthetic** candidate, but the resulting inability to amend a wrong amount must be clearly labeled and tested, not hidden as a successful correction flow. 013-G must decide whether this limitation undermines P-01/P-05 enough to include a **minimal properly authorized Revision realization** in the MVP candidate or seek explicit sponsor scope reentry; no developer improvisation.

Deletion, withdrawal, retention and restored-account policy are distinct from O.Close and S.Relinquish. Avoid promising permanent retention, physical deletion, recovery after token loss, automatic exported-data recall or silent revision. Account/device loss and duplicate attempts must be explicitly covered in MVP risk scorecard.

## E07 — Acceptance / negative-control corpus for 014–018 qualification

All test participants and records are **synthetic**, with arbitrary locations/no real households and no child identities; holdout scenarios should not be given to the implementing agent. No real participant trial is authorized.

| ID | Scenario | Mandatory observable outcome |
|---|---|---|
| E-T01 | New entitled dev test participant, no S/V/R/D object | Creates/open and privately inspects a clean O account; no forced contribution registration |
| E-T02 | \`NOW · TOTAL(4 people)\` with approximate claim | One person-count EvidenceItem; no four arrival timestamps, invented precision or monitoring |
| E-T03 | \`6 PM–10 PM · TOTAL(83 people)\` recalled | One interval aggregate, provenance retained; unasserted watching remains unknown |
| E-T04 | Group encounter of five visitors | Group and person units distinguishable; no conversion to five independent events |
| E-T05 | Empty session / interval with no coverage | **Unknown**, never watched zero |
| E-T06 | Explicit zero without monitored coverage | Not interpreted as observed zero |
| E-T07 | Observed interval + complete claimed + zero same unit | Interpretable as *reported observed zero*, not certified perfect detection |
| E-T08 | Overlapping incompatible coverage | Mark contested; do not last-write-wins or silently fill intervals |
| E-T09 | Recalled uncertain activity time vs server receipt | Show distinct meanings; don't rewrite as exact occurrence |
| E-T10 | Unentitled second principal guesses observation ID | No record or private metadata leakage |
| E-T11 | Dev issuer/token against prod and converse | Environment/owner denial; no cross-account state |
| E-T12 | Drop response after write, then replay same attempt | No duplicate effect; show established result only with linked proof; otherwise unresolved |
| E-T13 | Two legitimate identical counts at different attempts | Both remain distinguishable, not suppressed by content-dedup |
| E-T14 | Same attempt token with changed payload | Denied/conflict; no silent altered fact |
| E-T15 | Close, then try Report, AssertCoverage, Qualify | All direct additions denied; entitled InspectAfterClose preserved |
| E-T16 | Attempt O.Qualify to change factual count | Does not silently replace count; protected Revision boundary explicit |
| E-T17 | Anonymous visitor to public production shell | May view informational static content; protected data API/intake denied absent separate R-P02 |
| E-T18 | R/D request, publication/export or inference on candidate | No raw/public data availability, no research or Poisson endorsement; R-P03 hard deny |
| E-T19 | Expired/lost guest capability | No foreign access or fake account recovery; explicit limitation and non-leaky next step |
| E-T20 | Low-attention user, assistive technology and failure feedback | Exposes count/unit/uncertainty/lifecycle without color-only meaning; empirical “effortless” remains unverified |
| E-T21 | API direct-origin bypass or auth/signup burst | Protected routes enforce auth, isolation and bounded cost under selected 013-G ingress controls |
| E-T22 | Disabled production-data operation | Server-side deny despite loaded public frontend or manipulated client |

**MVP-candidate exit:** every safety/meaning-critical case must pass or have a justified, independently accepted nonblocking deferral; **never waive E-T02/03/05/07/10/12/15/17/18/22**, nor the entitlement and no-real-intake controls. Formal detailed benchmarks, load, privacy and operational approval belong to 017/018 and later production gate. E-T20 is a *test objective*, not a claim of research with actual human participants.

## E08 — Realization delivery constraints and dependencies

- **014 infrastructure** may create a restricted **synthetic** dev environment only after 013-H bounded authorization. Build/deploy decisions must not enable real-person intake or an unapproved public data endpoint. [013-C isolation](013-c-aws-environment-deployment-trust.md) and [013-D abuse economics](013-d-aws-finops-operational-economics.md) are prerequisites.
- **015 identity/state contracts** must resolve technical ownership, no-mandatory-registration flow, expiry/recovery, data minimization, protected access and attempt lifecycle before choosing any physical storage key/index. Assess R-P05 unknown effects and R-P06 retention/historical obligations in the accepted slice.
- **016 Observation** realizes seven actions and O-first private UI using the exact semantic examples/negative cases, not feature count as evidence.
- **017 hardening** challenges divided attention, assistive technology, failure, concurrency, data exposure, cost and responsive degradation; R-P01 empirical burden remains a carry-forward.
- **018 independent qualification** uses synthetic fixtures plus reviewer-held negative controls, independently analyzes semantics/guards, and may HOLD the candidate even where implementation-owned tests pass.
- **019 separate public-production decision** needs confirmed domain and infrastructure approvals; actual real-person data requires R-P02 safeguard decisions and external disclosure additionally requires R-P03. The public website may remain an informational shell indefinitely.

Cost/performance inputs for 013-D revision: measurement units and typical payload sizes, optional vs required coverage actions, reports per account, average claims per Inspect, attempts per Report, token renewal/guest account recovery frequency, and potential extra V history writes. No quantified usage assumptions are stated as actual demand.

## E09 — Open decisions, risk treatment and gate

| Decision | Present 013-E recommendation | Required final owner / gate |
|---|---|---|
| Guest vs voluntary account | **Provisional A** pseudonymous invited dev capability + optional B recovery; prohibit compulsory C without concept reentry | 013-G/H sponsor acceptance; 015 security design |
| Cognito technical use | Appropriate candidate for dev tester admission/optional recovery, not proof that registered identity is a mandatory participant feature | 013-G/IAM threat acceptance |
| Exact identity lifetime / credentials | No invented duration; require explicit loss/recovery and XSS/CSRF/revocation test | 013-G then 015 |
| Whether minimal Revision must ship | **Material unresolved product/engineering scope tradeoff**; no silent amount edit | 013-G independent product-purpose challenge, 013-H HOLD if incoherent |
| Data/API schema, DynamoDB keys | Deferred after accepted semantic/access and cost contracts | 015 engineering, not Phase 013 |
| Direct API ingress/WAF bypass | **Unresolved high-consequence finding from 013-D** | 013-G/H must choose/test viable protection |
| Sponsor spending ceiling and AWS/DNS authority | Unapproved/unverified, remain strict construction/production gates | 013-G/H and permitted 014 preflight |
| Eligibility and protected disclosure | **Real-data no-go** and external disclosure no-go | Separate R-P02/R-P03 competent decisions; no agent approval |

**013-E EXIT:** documentary **PASS WITH CRITICAL OPEN DESIGN GATES** for identity, correction, privacy/authorization and API-origin economics; **013-F next eligible after review/checks/merge**. The document establishes no fixed web route, database schema, signup policy, retention duration, application implementation, AWS resource or deploy entitlement. Final implementation selection remains 013-G and start permission 013-H; real participant operations and disclosures remain separately unauthorized.
