import { describe, expect, it } from "vitest";
import {
  SYNTHETIC_PRINCIPAL_A,
  SYNTHETIC_PRINCIPAL_B,
  assertCoverage,
  close,
  coverageNotObservedSixThirty,
  coverageObservedSixToSeven,
  createStore,
  equalCountSecondAttempt,
  establish,
  inspect,
  invalidNegativeQuantity,
  nearPresentPeopleFour,
  recalledUncertainTime,
  report,
} from "../../src/domain";

describe("L03 Observation transitions", () => {
  it("E-T01: establish then inspect yields a clean open account", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    expect(created.outcome).toBe("confirmed_effected");
    if (created.outcome !== "confirmed_effected") return;
    const viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    expect(viewed.outcome).toBe("confirmed_effected");
    if (viewed.outcome !== "confirmed_effected") return;
    expect(viewed.value.status).toBe("open");
    expect(viewed.value.evidence).toEqual([]);
  });

  it("E-T08: overlapping incompatible coverage is contested", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    expect(
      assertCoverage(
        store,
        created.value.id,
        SYNTHETIC_PRINCIPAL_A,
        coverageObservedSixToSeven,
      ).outcome,
    ).toBe("confirmed_effected");
    expect(
      assertCoverage(
        store,
        created.value.id,
        SYNTHETIC_PRINCIPAL_A,
        coverageNotObservedSixThirty,
      ).outcome,
    ).toBe("confirmed_effected");
    const viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    if (viewed.outcome !== "confirmed_effected") return;
    expect(viewed.value.contestedCoverage.length).toBeGreaterThan(0);
  });

  it("E-T09: recalled asserted time remains distinct from receipt time", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    const reported = report(
      store,
      created.value.id,
      SYNTHETIC_PRINCIPAL_A,
      recalledUncertainTime,
    );
    expect(reported.outcome).toBe("confirmed_effected");
    if (reported.outcome !== "confirmed_effected") return;
    expect(reported.value.provenance).toBe("recalled");
    expect(reported.value.timeExtent).toMatchObject({
      kind: "interval",
      startLabel: "18:35",
      endLabel: "18:50",
      precision: "uncertain",
    });
    expect(reported.value.receiptAt).toMatch(/T/);
    expect(reported.value.receiptAt).not.toBe("18:35");
  });

  it("E-T10: unentitled principal receives no private state", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    report(store, created.value.id, SYNTHETIC_PRINCIPAL_A, nearPresentPeopleFour);
    const denied = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_B);
    expect(denied.outcome).toBe("confirmed_not_effected");
  });

  it("E-T12/E-T13: interrupted attempt is unresolved; equal counts stay distinct", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;

    const interrupted = report(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
      ...nearPresentPeopleFour,
      attemptId: "interrupt-1",
      simulateInterrupt: true,
    });
    expect(interrupted.outcome).toBe("unresolved");

    const first = report(
      store,
      created.value.id,
      SYNTHETIC_PRINCIPAL_A,
      nearPresentPeopleFour,
    );
    const second = report(
      store,
      created.value.id,
      SYNTHETIC_PRINCIPAL_A,
      equalCountSecondAttempt,
    );
    expect(first.outcome).toBe("confirmed_effected");
    expect(second.outcome).toBe("confirmed_effected");
    const viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    if (viewed.outcome !== "confirmed_effected") return;
    expect(viewed.value.evidence).toHaveLength(2);
    expect(viewed.value.evidence.map((item) => item.measure.quantity)).toEqual([
      4, 4,
    ]);
  });

  it("E-T14: same attempt id with changed payload is rejected", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    expect(
      report(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        ...nearPresentPeopleFour,
        attemptId: "shared-attempt",
      }).outcome,
    ).toBe("confirmed_effected");
    const changed = report(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
      ...nearPresentPeopleFour,
      attemptId: "shared-attempt",
      measure: { unit: "people", quantity: 9, uncertainty: "low" },
    });
    expect(changed.outcome).toBe("confirmed_not_effected");
  });

  it("E-T15: close denies further Report additions", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    expect(
      close(store, created.value.id, SYNTHETIC_PRINCIPAL_A).outcome,
    ).toBe("confirmed_effected");
    const denied = report(
      store,
      created.value.id,
      SYNTHETIC_PRINCIPAL_A,
      nearPresentPeopleFour,
    );
    expect(denied.outcome).toBe("confirmed_not_effected");
  });

  it("rejects invalid quantity/unit reports", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    const denied = report(
      store,
      created.value.id,
      SYNTHETIC_PRINCIPAL_A,
      invalidNegativeQuantity,
    );
    expect(denied.outcome).toBe("confirmed_not_effected");
  });
});
