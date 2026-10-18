---
type: Project Intake
title: TreatFlow — Current Project Context
description: Current, provisional project context, affected parties, intended outcomes and open intake boundaries.
tags: [treatflow, intake, product, actors, outcomes]
---

# TreatFlow — Current Project Context

## Product identity and origin

**Sponsor-stated intent:** TreatFlow is a proposed crowdsourced Halloween observation service through which people report trick-or-treater volume and timing alongside coarse geographic context (examples: state, metro area, urban/suburban/rural classification). Secure, simple contributor identification and safe access to downloadable observations are sought so a dataset can support playful exploratory analysis, especially whether arrivals are consistent with Poisson-process models.

This is a project **intake framing**, not an approved feature list, research validation, or implemented product. The application format (website and/or app), identity methods and data-access approach remain open for later design.

## Motivating situation

Halloween foot traffic varies by place, hour, neighborhood and household; the sponsor proposes to make voluntarily observed activity available as structured data rather than leaving it as anecdote or isolated recollection. The project is motivated by curiosity, participatory measurement and downstream analysis, not a documented commercial requirement. No validated user demand or quality baseline is currently available.

## Actor and affected-party context

| Party | Relevance | Status |
|---|---|---|
| Volunteer observer/contributor | Reports trick-or-treater activity at a location or during a period; may need to recognize or correct their own contributions | Sponsor-implied primary participant |
| Dataset consumer / hobbyist / researcher | Examines or downloads records to study timing, volume and geographic variation | Sponsor-implied primary beneficiary; eligibility undecided |
| Project maintainer/operator | Maintains reliability, governs data release, responds to misuse and handles account/data requests | Necessary operating context; responsibility details undecided |
| Other members of a reporting household | May be affected by published timing and location patterns without personally contributing | Potentially affected; protective concern |
| Trick-or-treaters and accompanying people | Observed population, not automatically account holders or consenting subjects; counting must not imply personal tracking | Indirectly affected |
| Minors | Common among visitors and possible would-be contributors; special attention to participation and identifiability | Population/consent model unresolved |
| Broader public / community | May see analyses and infer local patterns; could benefit or be exposed to misleading or sensitive interpretations | Potential audience, not assumed participant |

These are **stakeholder categories, not authentication roles or software concept boundaries**. One person may occupy multiple categories.

## Intended outcomes and tensions

1. **Contribute conveniently:** willing observers can report meaningful Halloween arrival observations without undue burden.
2. **Support interpretable research:** downloaded data retain enough observational context to distinguish meaningful timing/count patterns from incomplete or biased reporting.
3. **Enable exploration:** analysts can investigate a Poisson-arrival hypothesis, compare alternatives and understand limits rather than being steered toward a predetermined finding.
4. **Preserve safety and trust:** the released information should not expose participant identity or households through account, location, timestamp or small-sample combinations.
5. **Keep the initiative appropriately small:** favor an approachable, fun, operable initial effort over speculative platform complexity.

**Tensions to carry forward:** fine-grained timing versus household privacy; detailed geography versus re-identification risk; strong contributor uniqueness versus low participation friction; ease of reporting versus data quality; open downloads versus misuse and withdrawal expectations.

## Observation and research distinctions (provisional, 000-C)

The proposed dataset must distinguish **group encounters** from **individual visitors**, **event time** from **report submission time**, and **actively observed zero-arrival time** from unmonitored or missing time. The relevant observation unit, acceptable reporting accuracy and reporting mode remain undecided. Observation duration, pauses, delayed entries and timezones matter for interpreting arrivals.

The Poisson-process question is exploratory, not an assumed result: a constant arrival rate is only one model candidate, alongside time-varying rates, group dependence, clustering and reporting distortion. A Poisson-distributed count does not by itself establish a Poisson process. Voluntary, nonrepresentative reporting also limits population inference.

Contributor identity, location/context and dataset publication must be considered separately. Sparse geography combined with precise timing, stable pseudonyms or multiple releases can reveal participating households even without direct address data. No public-export granularity or safe anonymity level has been determined.

See [000-C supporting evidence](../../phases/000/000-c-treatflow-execution.md).

## Initial boundary, constraints and deferrals (000-D)

The intake mandate is a **small, voluntary, Halloween observation and exploratory research** project, not individual visitor tracking, commercial data brokerage or a claim to representative scientific conclusions. Sponsor expectations include simple secure contributor distinction, geographically contextualized reporting and safely downloadable analytical data. The precise interface, observation unit, authentication method, internal geographic detail and download policy are **not selected**.

**Provisional initial-scope candidates** (subject to purpose/concept validation) include adult household observers, a single initial season, coarse location categories, web-first reporting and non-live dataset access. Proposed non-goals include gathering names/photos/routes of visiting children, exact household address publication, personal visitor tracking, public identity leaderboards and speculative platform features.

**Material constraints to qualify:** data usefulness depends on actual observation exposure and unit clarity; identity and research release need distinct treatment; sparse timestamps and geography can expose households; children may require participation safeguards; applicable legal duties depend on operating circumstances. No particular jurisdiction-specific legal conclusion or safe release granularity is established.

**Working assumptions:** willingness to contribute, feasible low-burden measurement, coarse geography's usefulness, and manageable operation remain untested. Self-selection, group effects, reporting error and time-varying arrival rates are plausible research limitations.

**Question ownership:** Initial audience/eligibility, observational unit, missingness, geographic collection-versus-release, download eligibility, stable identifiers, corrections/withdrawal, retention, quality controls and analytic methodology remain assigned to Phase 001 and later concept/design work. Applicable consent, disclosure and operational policies must be resolved before launch; deferral is not approval.

See [000-D scope and question dispositions](../../phases/000/000-d-treatflow-execution.md).

## What is not established

- A validated audience size, a public versus gated download policy, or a particular account architecture.
- That hourly arrivals are stationary, independent, Poisson distributed, or precisely reported.
- That any geographic combination is privacy-safe merely because it omits a street address.
- That the project requires real-time dashboards, mobile-native applications, geolocation, leaderboards or monetary incentives.
- Whether observers themselves are exclusively adults.

## Open intake destinations

- **000-C:** completed intake distinctions and risk exploration; unresolved reporting units and data release policy carried forward.
- **000-D:** scope and uncertainty assessed; unresolved policy and design questions have downstream owners.
- **000-E:** audit intake integrity and decide Phase 000 exit; explicitly address inherited Base identity/documentation carry-forward.
- **001 onward:** independently validate human purposes and discover concepts rather than assuming the initial interface or data model.

## Provenance and authority

Derived from the sponsor's initial TreatFlow premise and the [000-A project-specific intake gate](../../phases/000/000-a-treatflow-execution.md). This is **provisional current intake knowledge**, refined by [000-B evidence](../../phases/000/000-b-treatflow-execution.md) [000-C evidence](../../phases/000/000-c-treatflow-execution.md), and [000-D evidence](../../phases/000/000-d-treatflow-execution.md), not verified empirical research. Process rules remain under [methodology](../../methodology/). Inherited Base template completion records do not evidence TreatFlow product completion.
