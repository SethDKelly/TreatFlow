---
type: Purpose Knowledge
title: TreatFlow — Actor Needs and Participation Context
description: Provisional, need-focused purpose knowledge for relevant participants and affected nonparticipants.
tags: [treatflow, purpose, needs, context, phase-001]
---

# TreatFlow — Actor Needs and Participation Context

**Status:** provisional Phase 001-B current meaning; not an approved concept catalog, feature list or empirically verified user-need model. Read the [current project intake](../project/intake.md) for project scope and stakeholders. The supporting inquiry and evidentiary limits are in [001-B execution](../../phases/001/001-b-treatflow-execution.md).

## Need candidates and burdens

| Party | Need-focused interpretation | Context/burden | Evidence status |
|---|---|---|---|
| Voluntary observer | Contribute useful observations without sacrificing participation in Halloween activities | Interruptions, distractions, arrivals in groups, late recall, uncertainty about whether a period was actually watched | Sponsor intent; burden plausible but untested |
| Observer revisiting prior reports | Understand and remedy material mistakes without the correction misleading later analysis | Duplicate taps, wrong time, uncertain counts, retrospectively amended recollections | Inference; correction behavior untested |
| Hobbyist analyst / researcher | Distinguish defensible observations from missing or ambiguously interpreted records, enabling findings that could disagree with the initial hypothesis | Exposure time, group-versus-person measures, time precision, self-selection and reporting quality | Sponsor's analysis goal; interpretation need is analytic inference |
| Research data recipient | Use available information without obtaining unnecessary household-linked personal data | Fine geography and event times may enable linkage; public/raw access not decided | Sponsor's access and security aim; risk inference |
| Household member who did not report | Avoid involuntary exposure of residence/activity patterns because someone else participated | Household location and event-time combinations, repeated yearly publication | Plausible protective need; no consultation yet |
| Trick-or-treater / guardian | Avoid individual tracking, identification or collection of unnecessary visitor details | Children and companions may never interact with the service | Protective need inferred from observed-population context |
| Contributor who may be a minor | Avoid participation conditions inconsistent with appropriate age/privacy protections | Age/eligibility and guardian permissions unknown | Conditional risk; contributor population unresolved |
| Service operator | Be able to maintain a safe and credible small project without disproportionate operational burden | Abuse, misleading records, deletion requests, seasonal peaks, access controls, disclosure incidents | Necessary operating context; staffing/budget unknown |
| Wider public | Receive appropriately qualified conclusions rather than false certainty about local neighborhoods | Nonrandom reporting and data gaps can distort apparent trends | Potential downstream need, not demand evidence |

A participant may have several needs, and needs of different parties may conflict. The table does not create final user roles or mandate particular mechanisms.

## Context affecting these needs

- Halloween observation is time-bounded and competes with answering doors, social activity and caregiving.
- One group encounter and multiple individuals are not automatically the same statistical event; quiet observed intervals differ from monitoring gaps.
- Retrospective estimates can be useful if uncertainty is visible; falsely exact times may reduce trust.
- Coarse geography alone does not guarantee household anonymity when paired with precise timing or sparse geographic samples.
- Voluntary self-selected participation can make broad population claims misleading.
- An affected household member or visiting child may receive no direct benefit but could bear privacy cost.

## Provisional need tensions to analyze in 001-C/001-D

- Low-burden reporting versus trustworthy evidence of observation duration and precision.
- Analyst-level detail versus household unlinkability and restrained release.
- Contributor identification and correction versus pseudonymous re-identification and friction.
- Open exploratory access versus misuse, researcher misunderstanding and operator stewardship load.
- Exciting public conclusions versus disciplined treatment of missingness, nonrandom sampling and rejected hypotheses.

## Product-level purpose (provisional, 001-C)

**Enable willing community observers to turn everyday Halloween arrival experiences into interpretable evidence that others can explore responsibly, without making contribution unduly burdensome or exposing participating households and observed people to avoidable harm.**

The value is shared, qualified understanding rather than data volume, a particular interface, or proof that arrival patterns are Poisson. This purpose remains sponsor-derived and subject to scrutiny in 001-D.

## Distinct design-purpose obligations

These are **candidate independent obligations**, not named software concepts, requirements for specific mechanisms, or ranked features.

| ID | Purpose obligation: meaningful change | Beneficiaries / protected parties | Discriminating evaluation question |
|---|---|---|---|
| P-01 Participation without disproportionate burden | Volunteer observers | Can someone contribute meaningfully amid interruptions and grouped arrivals without becoming a dedicated data clerk? |
| P-02 Observational intelligibility | Observers and analysts | Can an analyst distinguish what was counted, when it occurred, what was actually monitored and what is unknown rather than treating ambiguity as evidence? |
| P-03 Honest research interpretation | Analysts and public | Can the resulting evidence support competing explanations, uncertainty or rejection of a Poisson hypothesis without asserting representativeness or false precision? |
| P-04 Protection against involuntary exposure | Contributors, co-residents, visitors and guardians | Can information be useful without unnecessarily disclosing people, household patterns, identifiable sites or stable account linkages? |
| P-05 Accountable contribution and correction | Contributors, analysts and operator | Can a contribution be distinguishable enough to address meaningful mistakes or abuse without making identities publicly traceable? |
| P-06 Sustainable trustworthy stewardship | Contributors, analysts and operator | Can the project handle foreseeable misuse, disclosures and lifecycle obligations without demands disproportionate to a small seasonal initiative? |

**Separability:** P-01 addresses effort, P-02 measurement meaning, P-03 inference, P-04 third-party protection, P-05 correction and attribution, and P-06 long-term operability. A proposed design could satisfy one and fail another. P-02 and P-03 interact but are not identical: interpretable data can still be interpreted dishonestly. P-04 and P-05 may conflict: accountability must not imply public persistent identity. P-06 is provisional because operating capacity is not yet measured.

**Provenance:** P-01, P-02 and P-03 derive from sponsor intent plus [001-B inquiry](../../phases/001/001-b-treatflow-execution.md) and [000-C measurement cautions](../../phases/000/000-c-treatflow-execution.md). P-04–P-06 follow the stakeholder/risk reasoning in [001-B](../../phases/001/001-b-treatflow-execution.md) and the [intake constraints](../project/intake.md). These are reasoned purpose candidates, not observed consumer requirements.

## Purpose quality and downstream validation

The six candidate obligations are stated in terms of improvements and safeguards, with questions capable of rejecting a superficially attractive feature. None requires a particular authentication provider, session model, export format, database, UI, or statistical test. Phase 001-D must test their joint success in plausible Halloween situations, how tradeoffs distribute across parties, whether obligations are too broad or overlapping, and whether evidence warrants regrouping. Phase 001-E must determine final purpose-readiness. Phase 002 alone may discover candidate concepts.

## Uncertainty and validation destinations

These are **candidate needs**, not observed participant behavior. The sponsor premise supports the opportunity; interview/pilot evidence, research-use scenario validation and privacy threat review remain needed before asserting widespread demand, calibrated burden or safe disclosure. Phase 001-C has derived provisional design-purpose obligations; 001-D must check meaningful success situations and conflicts. Later phases may reject or refine this provisional picture. Eligibility, consent, withdrawal, release and applicable law remain prelaunch concerns.

**No purpose here selects a sign-in provider, location field, interface, database, download policy or statistical test.**
