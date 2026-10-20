import { describe, expect, it } from "vitest";
import {
  SYNTHETIC_PRINCIPAL_A,
  SYNTHETIC_PRINCIPAL_B,
  assertCoverage,
  createStore,
  establish,
  explicitZeroWithoutCoverage,
  groupEncounterFive,
  inspect,
  intervalPeopleEightyThree,
  nearPresentPeopleFour,
  observedCompleteZeroCoverage,
  observedCompleteZeroReport,
  peopleInSameGroupEncounter,
  report,
} from "../../src/domain";

describe("L02 synthetic fixtures (013-E semantic owners)", () => {
  it("E-T02: NOW · TOTAL(4 people) is one person-count item, not four arrivals", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    expect(created.outcome).toBe("confirmed_effected");
    if (created.outcome !== "confirmed_effected") return;

    const reported = report(
      store,
      created.value.id,
      SYNTHETIC_PRINCIPAL_A,
      nearPresentPeopleFour,
    );
    expect(reported.outcome).toBe("confirmed_effected");
    if (reported.outcome !== "confirmed_effected") return;
    expect(reported.value.measure).toEqual({
      unit: "people",
      quantity: 4,
      uncertainty: "low",
    });
    expect(reported.value.timeExtent.kind).toBe("near_present");

    const viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    expect(viewed.outcome).toBe("confirmed_effected");
    if (viewed.outcome !== "confirmed_effected") return;
    expect(viewed.value.evidence).toHaveLength(1);
    expect(viewed.value.coverage).toHaveLength(0);
    expect(viewed.value.unassertedMonitoring).toBe("unknown");
  });

  it("E-T03: interval total retains recalled provenance; watching stays unknown", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    const reported = report(
      store,
      created.value.id,
      SYNTHETIC_PRINCIPAL_A,
      intervalPeopleEightyThree,
    );
    expect(reported.outcome).toBe("confirmed_effected");
    if (reported.outcome !== "confirmed_effected") return;
    expect(reported.value.provenance).toBe("recalled");
    expect(reported.value.measure.quantity).toBe(83);
    expect(reported.value.timeExtent.kind).toBe("interval");

    const viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    if (viewed.outcome !== "confirmed_effected") return;
    expect(viewed.value.unassertedMonitoring).toBe("unknown");
  });

  it("E-T04: group and person units stay distinguishable", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    expect(
      report(store, created.value.id, SYNTHETIC_PRINCIPAL_A, groupEncounterFive)
        .outcome,
    ).toBe("confirmed_effected");
    expect(
      report(
        store,
        created.value.id,
        SYNTHETIC_PRINCIPAL_A,
        peopleInSameGroupEncounter,
      ).outcome,
    ).toBe("confirmed_effected");
    const viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    if (viewed.outcome !== "confirmed_effected") return;
    const units = viewed.value.evidence.map((item) => item.measure.unit).sort();
    expect(units).toEqual(["groups", "people"]);
  });

  it("E-T05/E-T06: empty or zero without coverage is not watched zero", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;

    let viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    if (viewed.outcome !== "confirmed_effected") return;
    expect(viewed.value.evidence).toHaveLength(0);
    expect(viewed.value.unassertedMonitoring).toBe("unknown");
    expect(viewed.value.observedZeroInterpretations).toHaveLength(0);

    expect(
      report(
        store,
        created.value.id,
        SYNTHETIC_PRINCIPAL_A,
        explicitZeroWithoutCoverage,
      ).outcome,
    ).toBe("confirmed_effected");
    viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    if (viewed.outcome !== "confirmed_effected") return;
    expect(viewed.value.observedZeroInterpretations).toEqual([
      expect.objectContaining({
        interpretableAsReportedObservedZero: false,
      }),
    ]);
  });

  it("E-T07: observed + complete_claimed + zero same unit is reported observed zero", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    expect(
      assertCoverage(
        store,
        created.value.id,
        SYNTHETIC_PRINCIPAL_A,
        observedCompleteZeroCoverage,
      ).outcome,
    ).toBe("confirmed_effected");
    expect(
      report(
        store,
        created.value.id,
        SYNTHETIC_PRINCIPAL_A,
        observedCompleteZeroReport,
      ).outcome,
    ).toBe("confirmed_effected");
    const viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    if (viewed.outcome !== "confirmed_effected") return;
    expect(viewed.value.observedZeroInterpretations).toEqual([
      expect.objectContaining({
        interpretableAsReportedObservedZero: true,
      }),
    ]);
  });

  it("does not contest cross-unit completeness on the same interval", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    const extent = {
      kind: "interval" as const,
      startLabel: "18:00",
      endLabel: "18:20",
      precision: "bounded" as const,
    };
    expect(
      assertCoverage(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        attemptId: "attempt-cross-unit-groups",
        status: "observed",
        completeness: "complete_claimed",
        unit: "groups",
        timeExtent: extent,
      }).outcome,
    ).toBe("confirmed_effected");
    expect(
      assertCoverage(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        attemptId: "attempt-cross-unit-people",
        status: "observed",
        completeness: "partial",
        unit: "people",
        timeExtent: extent,
      }).outcome,
    ).toBe("confirmed_effected");
    expect(
      report(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        attemptId: "attempt-cross-unit-zero",
        provenance: "contemporaneous",
        measure: { unit: "groups", quantity: 0, uncertainty: "none" },
        timeExtent: extent,
      }).outcome,
    ).toBe("confirmed_effected");

    const viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    if (viewed.outcome !== "confirmed_effected") return;
    expect(viewed.value.contestedCoverage).toHaveLength(0);
    expect(viewed.value.observedZeroInterpretations).toEqual([
      expect.objectContaining({
        interpretableAsReportedObservedZero: true,
      }),
    ]);
  });

  it("blocks observed-zero when contained or equivalently labeled activity contradicts it", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    expect(
      assertCoverage(
        store,
        created.value.id,
        SYNTHETIC_PRINCIPAL_A,
        observedCompleteZeroCoverage,
      ).outcome,
    ).toBe("confirmed_effected");
    expect(
      report(
        store,
        created.value.id,
        SYNTHETIC_PRINCIPAL_A,
        observedCompleteZeroReport,
      ).outcome,
    ).toBe("confirmed_effected");
    expect(
      report(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        attemptId: "attempt-contained-positive",
        provenance: "contemporaneous",
        measure: { unit: "groups", quantity: 3, uncertainty: "none" },
        timeExtent: {
          kind: "interval",
          startLabel: "18:05",
          endLabel: "18:10",
          precision: "bounded",
        },
      }).outcome,
    ).toBe("confirmed_effected");

    let viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    if (viewed.outcome !== "confirmed_effected") return;
    expect(
      viewed.value.observedZeroInterpretations.every(
        (item) => !item.interpretableAsReportedObservedZero,
      ),
    ).toBe(true);

    const storeB = createStore();
    const createdB = establish(storeB, SYNTHETIC_PRINCIPAL_A);
    if (createdB.outcome !== "confirmed_effected") return;
    expect(
      assertCoverage(
        storeB,
        createdB.value.id,
        SYNTHETIC_PRINCIPAL_A,
        observedCompleteZeroCoverage,
      ).outcome,
    ).toBe("confirmed_effected");
    expect(
      report(
        storeB,
        createdB.value.id,
        SYNTHETIC_PRINCIPAL_A,
        observedCompleteZeroReport,
      ).outcome,
    ).toBe("confirmed_effected");
    expect(
      report(storeB, createdB.value.id, SYNTHETIC_PRINCIPAL_A, {
        attemptId: "attempt-equivalent-clock",
        provenance: "contemporaneous",
        measure: { unit: "groups", quantity: 3, uncertainty: "none" },
        timeExtent: {
          kind: "interval",
          startLabel: "6 PM",
          endLabel: "6:20 PM",
          precision: "bounded",
        },
      }).outcome,
    ).toBe("confirmed_effected");
    viewed = inspect(storeB, createdB.value.id, SYNTHETIC_PRINCIPAL_A);
    if (viewed.outcome !== "confirmed_effected") return;
    expect(
      viewed.value.observedZeroInterpretations.every(
        (item) => !item.interpretableAsReportedObservedZero,
      ),
    ).toBe(true);
  });

  it("blocks observed-zero when positive evidence contradicts the zero", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    expect(
      assertCoverage(
        store,
        created.value.id,
        SYNTHETIC_PRINCIPAL_A,
        observedCompleteZeroCoverage,
      ).outcome,
    ).toBe("confirmed_effected");
    expect(
      report(
        store,
        created.value.id,
        SYNTHETIC_PRINCIPAL_A,
        observedCompleteZeroReport,
      ).outcome,
    ).toBe("confirmed_effected");
    expect(
      report(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        attemptId: "attempt-contradict-positive",
        provenance: "contemporaneous",
        measure: { unit: "groups", quantity: 3, uncertainty: "none" },
        timeExtent: {
          kind: "interval",
          startLabel: "18:00",
          endLabel: "18:20",
          precision: "bounded",
        },
      }).outcome,
    ).toBe("confirmed_effected");

    const viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    if (viewed.outcome !== "confirmed_effected") return;
    const zeroViews = viewed.value.observedZeroInterpretations.filter(
      (item) => item.interpretableAsReportedObservedZero,
    );
    expect(zeroViews).toHaveLength(0);
    expect(
      viewed.value.observedZeroInterpretations.some((item) =>
        item.note.includes("contradictory activity"),
      ),
    ).toBe(true);
  });

  it("contests incompatible coverage with identical unparseable labels", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    const extent = {
      kind: "interval" as const,
      startLabel: "evening",
      endLabel: "later",
      precision: "approximate" as const,
    };
    expect(
      assertCoverage(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        attemptId: "attempt-nonclock-a",
        status: "observed",
        completeness: "complete_claimed",
        unit: "groups",
        timeExtent: extent,
      }).outcome,
    ).toBe("confirmed_effected");
    expect(
      assertCoverage(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        attemptId: "attempt-nonclock-b",
        status: "not_observed",
        completeness: "unknown",
        unit: "groups",
        timeExtent: extent,
      }).outcome,
    ).toBe("confirmed_effected");
    expect(
      report(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        attemptId: "attempt-nonclock-zero",
        provenance: "contemporaneous",
        measure: { unit: "groups", quantity: 0, uncertainty: "none" },
        timeExtent: extent,
      }).outcome,
    ).toBe("confirmed_effected");

    const viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    if (viewed.outcome !== "confirmed_effected") return;
    expect(viewed.value.contestedCoverage.length).toBeGreaterThan(0);
    expect(
      viewed.value.observedZeroInterpretations.every(
        (item) => !item.interpretableAsReportedObservedZero,
      ),
    ).toBe(true);
  });

  it("keeps synthetic principals distinct from real household identity", () => {
    expect(SYNTHETIC_PRINCIPAL_A.startsWith("syn-")).toBe(true);
    expect(SYNTHETIC_PRINCIPAL_B.startsWith("syn-")).toBe(true);
  });
});
