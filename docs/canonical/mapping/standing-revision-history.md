---
okf_version: "0.2"
type: Canonical Concept Mapping
title: TreatFlow — Protected Standing, Factual Revision and Historical Representation
description: Semantically faithful mapping obligations for responsibility, factual standing, protected actions and correction history.
tags: [treatflow, mapping, stewardship, revision, phase-007]
---

# Protected Standing, Revision & Historical Representation

**Authority:** [007-C evidence](../../phases/007/007-c-treatflow-execution.md). This document owns **representation**, not behavior. The intrinsic [Contribution Stewardship](../concepts/contribution-stewardship.md) and [Revision](../concepts/revision.md) specifications and guarded [C-01–C-03 composition](../composition/observation-stewardship-revision.md) control action meaning; [Phase 005 action surface](../composition/application-action-surface.md) controls exposure. [007-B Observation mapping](observation-representation.md) remains owner of reporting and coverage semantics. No universal public view or verified identity is authorized.

## Core state/view questions

| Entitled perspective | State question to represent | Authoritative source | Required distinction |
|---|---|---|---|
| Contributor claiming legitimate responsibility | Which specific contributed Item am I associated with, and is standing active, contested or relinquished? | Stewardship.Item, Party, Standing, Determination | Association is private protected responsibility, not identity verification or editing rights |
| Affected standing challenger | Which Party–Item association is challenged, and what determination/rationale, if any, exists? | Stewardship contested Standing and Determination | Contest is neither factual assertion challenge nor automatic transfer of control |
| Entitled factual amender | Which Revision.Subject, prior Assertion, permitted amendment scope and rationale apply? | Revision.Subject, Assertion, authority and RevisionLink | Being reporter/Party/household occupant is not itself amendment authority |
| Legitimate factual challenger or reviewer | Which Assertion is disputed; what is unresolved/accepted/rejected; which successor branches disagree? | Revision.Challenge, Disposition, RevisionLink history | Unresolved challenge is not amendment, falsehood certification or a new corrected fact |
| Entitled interpreter of revised observation | What did Observation originally assert, which qualified Revision versions are related, and what currentness is genuinely supportable? | Guarded C-02 EvidenceItem↔Subject/Assertion binding and Revision.InspectHistory | Original evidence remains intact; no silent successor chosen during conflicts |
| Observer with closed account | Can the old account be viewed, and can a separate legitimate Revision amend its assertion? | Observation.Lifecycle + qualified C-02 / Revision history | Closed Observation cannot accept new Report; eligible Revision remains separate |
| Nonparticipant or public observer | What responsibility/identity and factual material are actually permitted to be seen? | Entitled scope and existing protected action guards | No universal publication of private Party, source or revision history |

Views must distinguish **no association**, **unknown entitlement**, **contested standing**, **relinquished standing**, **pending factual challenge**, **disputed branch currentness**, and **not entitled to view** without presenting them as the same state. Absence from an entitled view must not be presented as proof that private state does not exist.

## Stewardship action/feedback contract

| Action | Before invocation or participation | Faithful outcome / denial |
|---|---|---|
| `Associate` (internal/optional C-01 participant) | A separately justified EvidenceItem↔Item correspondence and legitimate Party; not a public independent action | Private association established if guards hold; if absent, Observation.Report is unaffected |
| `Recognize` (direct, protected) | Scope of the Party's legitimately associated items and current standing | Returns scoped active/contested/relinquished association; no public identity or amendment entitlement |
| `ContestStanding` (direct, protected) | Specific association, affected-challenger basis and rationale | Standing becomes contested; no reassignment or altered Observation |
| `DetermineStanding` (protected) | Legitimate adjudicator, affected association, contest and grounds | Records determination or explicitly unresolved/declined outcome, never a silent edit right |
| `Relinquish` (direct, protected) | Legitimate current holder and exact association | Standing relinquished; item remains, with no implied deletion or permission withdrawal |

A protected action may be discoverable to an eligible actor only as its authority permits. The mapping must not convert "administrative" status or shared household residence into entitlement.

## Revision action/feedback contract

| Action | Availability and target | Faithful result / denial |
|---|---|---|
| `EstablishSubject` (internal/conditional) | Justified registration of a particular revisable qualified assertion, not the whole Observation account | Creates Revision.Subject and initial Assertion only if legitimate; unavailable does not remove the original report |
| `Amend` (protected/composed) | Legitimate amender, identified predecessor and rationale, coherent C-02 binding | Adds a **successor** and link; prior Assertion and Observation report remain; otherwise no destructive fallback |
| `InspectHistory` (direct, qualified) | Entitled subject/scope, including branch and challenge limits | Returns ordered/related assertions and factual dispositions without claiming unique truth where unsupported |
| `Challenge` (direct, protected) | Legitimate challenger, specified Assertion and reason | Records unresolved challenge; does not replace content or transfer amendment rights |
| `ResolveChallenge` (protected) | Authorized resolver and justifiable challenge disposition | Records accepted/rejected rationale; does not manufacture successor assertion |
| `MarkSuperseded` (internal/conditional) | Valid successor/currentness designation with no unresolved incompatible fork | Does not publicly select winner or erase predecessor; if conflict remains, currentness remains contested |

## Cross-concept semantic contrasts

1. **Observer ≠ Party ≠ Amender.** Reporting provenance, legitimate protected responsibility and protected factual-amendment authority require separately warranted connections.
2. **EvidenceItem ≠ Item ≠ Subject ≠ Assertion.** A precise, legitimate C-01 or C-02 application binding is necessary; similar labels or shared locations are not evidence of identity.
3. **Responsibility contested ≠ assertion challenged.** C-03 does not synchronize their decisions or convert one resolution into the other.
4. **Amendment ≠ overwrite.** An old group-size claim of five followed by four retains both qualified assertions and their directed reasoned relationship.
5. **Challenge ≠ correction.** Challenge alone cannot generate a replacement value or choose a current branch.
6. **Competing successors ≠ automatically latest truth.** Materially incompatible terminal alternatives require contested-currentness representation until authorized resolution.
7. **Observation.Close ≠ prohibition on legitimate historical Revision.** Closure stops direct Observation additions, not independently eligible Revision actions.
8. **Relinquish ≠ delete, withdrawal, release suspension or recall.** Nor does an amendment repair past copies or automatically notify recipients.
9. **Association unavailable ≠ invalid report.** Optional association/revision enrollment cannot make Observation.Report unavailable.

## Linguistic and structural constraints

Responsibility standing, factual correctness, source provenance and future disclosure consent must be **distinguishable in label and explanatory context**; one generic "owner," "verified," "approved" or "corrected" status would conceal material differences. A mapping must enable entitled actors to relate a successor to its specific predecessor and distinguish original versus revised evidence, challenged versus resolved standing, and accepted versus contested factual branches. If a combined history is presented, its separate concept ownership and permissions remain intelligible; views need not reveal private party identity merely to show that a factual assertion is contested. Do not rely only on color, physical placement or an assumed screen sequence to express consequential state.

## Failure/negative-control tests

- Two volunteers at one home are represented as the same accountable Party — **reject**.
- A reporter is presented as automatically authorized to amend another Party's evidence — **reject**.
- A contested Party association is displayed as verified authorship — **reject**.
- `DetermineStanding` is represented as changing a reported group count — **reject**.
- `Challenge` is displayed as a completed correction — **reject**.
- A five-to-four amendment replaces all history with four — **reject**.
- Two incompatible successors display one unqualified "latest truth" — **reject**.
- Closing Observation appears to erase access to legitimate historical correction — **reject**.
- Relinquishing standing is described as deleting previous releases — **reject**.
- An ineligible protected action is displayed as an ordinary universally available command — **reject**.

**Handoff:** 007-D maps qualification/availability of material after changed factual standing; 007-E reconciles action vocabulary/structural accessibility; 007-F adversarially tests cross-concept views. Where actual eligibility or adjudicator authority is unknown, the representation must not invent a rule: it remains an unresolved protected-policy prerequisite. No UI implementation, identity system, history storage or data release is specified.
