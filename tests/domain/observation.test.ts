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
  inspectAfterClose,
  invalidNegativeQuantity,
  nearPresentPeopleFour,
  qualify,
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

  it("E-T15: close denies Report/AssertCoverage/Qualify; InspectAfterClose preserved", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    const reported = report(
      store,
      created.value.id,
      SYNTHETIC_PRINCIPAL_A,
      nearPresentPeopleFour,
    );
    expect(reported.outcome).toBe("confirmed_effected");
    expect(
      close(store, created.value.id, SYNTHETIC_PRINCIPAL_A).outcome,
    ).toBe("confirmed_effected");

    expect(
      report(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        ...nearPresentPeopleFour,
        attemptId: "after-close-report",
      }).outcome,
    ).toBe("confirmed_not_effected");
    expect(
      assertCoverage(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        attemptId: "after-close-cov",
        status: "observed",
        completeness: "unknown",
        unit: "people",
        timeExtent: {
          kind: "interval",
          startLabel: "18:00",
          endLabel: "18:20",
          precision: "bounded",
        },
      }).outcome,
    ).toBe("confirmed_not_effected");
    if (reported.outcome === "confirmed_effected") {
      expect(
        qualify(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
          attemptId: "after-close-qual",
          targetKind: "evidence",
          evidenceId: reported.value.id,
          uncertainty: "high",
        }).outcome,
      ).toBe("confirmed_not_effected");
    }

    expect(
      inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A).outcome,
    ).toBe("confirmed_not_effected");
    const afterClose = inspectAfterClose(
      store,
      created.value.id,
      SYNTHETIC_PRINCIPAL_A,
    );
    expect(afterClose.outcome).toBe("confirmed_effected");
    if (afterClose.outcome !== "confirmed_effected") return;
    expect(afterClose.value.status).toBe("closed");
    expect(afterClose.value.evidence).toHaveLength(1);
  });

  it("Qualify-introduced completeness conflict contests and blocks observed-zero", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    const extent = {
      kind: "interval" as const,
      startLabel: "18:00",
      endLabel: "18:20",
      precision: "bounded" as const,
    };
    const first = assertCoverage(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
      attemptId: "qual-intro-a",
      status: "observed",
      completeness: "complete_claimed",
      unit: "groups",
      timeExtent: extent,
    });
    const second = assertCoverage(
      store,
      created.value.id,
      SYNTHETIC_PRINCIPAL_A,
      {
        attemptId: "qual-intro-b",
        status: "observed",
        completeness: "complete_claimed",
        unit: "groups",
        timeExtent: extent,
      },
    );
    expect(first.outcome).toBe("confirmed_effected");
    expect(second.outcome).toBe("confirmed_effected");
    if (first.outcome !== "confirmed_effected") return;
    if (second.outcome !== "confirmed_effected") return;

    expect(
      report(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        attemptId: "qual-intro-zero",
        provenance: "contemporaneous",
        measure: { unit: "groups", quantity: 0, uncertainty: "none" },
        timeExtent: extent,
      }).outcome,
    ).toBe("confirmed_effected");

    let viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    expect(viewed.outcome).toBe("confirmed_effected");
    if (viewed.outcome !== "confirmed_effected") return;
    expect(viewed.value.contestedCoverage).toHaveLength(0);

    expect(
      qualify(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        attemptId: "qual-intro-partial",
        targetKind: "coverage",
        coverageId: first.value.id,
        completeness: "partial",
      }).outcome,
    ).toBe("confirmed_effected");

    viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    expect(viewed.outcome).toBe("confirmed_effected");
    if (viewed.outcome !== "confirmed_effected") return;
    expect(viewed.value.contestedCoverage.length).toBeGreaterThan(0);
    expect(
      viewed.value.observedZeroInterpretations.every(
        (item) => !item.interpretableAsReportedObservedZero,
      ),
    ).toBe(true);
  });

  it("repeated Qualify records priorCompleteness from preceding effective value", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    const coverage = assertCoverage(
      store,
      created.value.id,
      SYNTHETIC_PRINCIPAL_A,
      {
        attemptId: "qual-hist-assert",
        status: "observed",
        completeness: "complete_claimed",
        unit: "groups",
        timeExtent: {
          kind: "interval",
          startLabel: "18:00",
          endLabel: "18:20",
          precision: "bounded",
        },
      },
    );
    expect(coverage.outcome).toBe("confirmed_effected");
    if (coverage.outcome !== "confirmed_effected") return;

    expect(
      qualify(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        attemptId: "qual-hist-1",
        targetKind: "coverage",
        coverageId: coverage.value.id,
        completeness: "partial",
      }).outcome,
    ).toBe("confirmed_effected");
    expect(
      qualify(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        attemptId: "qual-hist-2",
        targetKind: "coverage",
        coverageId: coverage.value.id,
        completeness: "unknown",
      }).outcome,
    ).toBe("confirmed_effected");

    const viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    expect(viewed.outcome).toBe("confirmed_effected");
    if (viewed.outcome !== "confirmed_effected") return;
    expect(viewed.value.coverage[0]?.completeness).toBe("complete_claimed");
    expect(viewed.value.qualifications).toHaveLength(2);
    expect(viewed.value.qualifications[0]).toMatchObject({
      priorCompleteness: "complete_claimed",
      appliedCompleteness: "partial",
    });
    expect(viewed.value.qualifications[1]).toMatchObject({
      priorCompleteness: "partial",
      appliedCompleteness: "unknown",
    });
  });

  it("Qualify completeness cannot erase contested AssertCoverage claims", () => {
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
        attemptId: "qual-erase-complete",
        status: "observed",
        completeness: "complete_claimed",
        unit: "groups",
        timeExtent: extent,
      }).outcome,
    ).toBe("confirmed_effected");
    expect(
      report(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        attemptId: "qual-erase-zero",
        provenance: "contemporaneous",
        measure: { unit: "groups", quantity: 0, uncertainty: "none" },
        timeExtent: extent,
      }).outcome,
    ).toBe("confirmed_effected");
    const partial = assertCoverage(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
      attemptId: "qual-erase-partial",
      status: "observed",
      completeness: "partial",
      unit: "groups",
      timeExtent: extent,
    });
    expect(partial.outcome).toBe("confirmed_effected");
    if (partial.outcome !== "confirmed_effected") return;

    let viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    expect(viewed.outcome).toBe("confirmed_effected");
    if (viewed.outcome !== "confirmed_effected") return;
    expect(viewed.value.contestedCoverage.length).toBeGreaterThan(0);
    expect(
      viewed.value.observedZeroInterpretations.every(
        (item) => !item.interpretableAsReportedObservedZero,
      ),
    ).toBe(true);

    expect(
      qualify(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
        attemptId: "qual-erase-upgrade",
        targetKind: "coverage",
        coverageId: partial.value.id,
        completeness: "complete_claimed",
        note: "attempted conflict resolution via Qualify",
      }).outcome,
    ).toBe("confirmed_effected");

    viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    expect(viewed.outcome).toBe("confirmed_effected");
    if (viewed.outcome !== "confirmed_effected") return;
    expect(viewed.value.contestedCoverage.length).toBeGreaterThan(0);
    const partialClaim = viewed.value.coverage.find(
      (item) => item.id === partial.value.id,
    );
    expect(partialClaim?.completeness).toBe("partial");
    expect(viewed.value.qualifications).toHaveLength(1);
    expect(
      viewed.value.observedZeroInterpretations.every(
        (item) => !item.interpretableAsReportedObservedZero,
      ),
    ).toBe(true);
  });

  it("E-T16: Qualify cannot replace factual counts (Revision boundary)", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    const reported = report(
      store,
      created.value.id,
      SYNTHETIC_PRINCIPAL_A,
      nearPresentPeopleFour,
    );
    expect(reported.outcome).toBe("confirmed_effected");
    if (reported.outcome !== "confirmed_effected") return;

    const denied = qualify(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
      attemptId: "attempt-et16-rewrite",
      targetKind: "evidence",
      evidenceId: reported.value.id,
      uncertainty: "high",
      forbiddenQuantityChange: 99,
    });
    expect(denied.outcome).toBe("confirmed_not_effected");
    if (denied.outcome === "confirmed_not_effected") {
      expect(denied.reason).toMatch(/Revision/i);
    }

    const refined = qualify(store, created.value.id, SYNTHETIC_PRINCIPAL_A, {
      attemptId: "attempt-et16-qualify",
      targetKind: "evidence",
      evidenceId: reported.value.id,
      uncertainty: "high",
      note: "recalled precision reduced",
    });
    expect(refined.outcome).toBe("confirmed_effected");
    const viewed = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    expect(viewed.outcome).toBe("confirmed_effected");
    if (viewed.outcome !== "confirmed_effected") return;
    expect(viewed.value.evidence[0]?.measure.quantity).toBe(4);
    expect(viewed.value.evidence[0]?.measure.uncertainty).toBe("high");
    expect(viewed.value.qualifications).toHaveLength(1);
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

  it("does not announce demo success when unentitled mutations are denied", () => {
    const store = createStore();
    const created = establish(store, SYNTHETIC_PRINCIPAL_A);
    if (created.outcome !== "confirmed_effected") return;
    const coverageDenied = assertCoverage(
      store,
      created.value.id,
      SYNTHETIC_PRINCIPAL_B,
      {
        attemptId: "demo-denied-cov",
        status: "observed",
        completeness: "complete_claimed",
        unit: "groups",
        timeExtent: {
          kind: "interval",
          startLabel: "18:00",
          endLabel: "18:20",
          precision: "bounded",
        },
      },
    );
    expect(coverageDenied.outcome).toBe("confirmed_not_effected");
    const reportDenied = report(store, created.value.id, SYNTHETIC_PRINCIPAL_B, {
      attemptId: "demo-denied-report",
      provenance: "contemporaneous",
      measure: { unit: "groups", quantity: 0, uncertainty: "none" },
      timeExtent: {
        kind: "interval",
        startLabel: "18:00",
        endLabel: "18:20",
        precision: "bounded",
      },
    });
    expect(reportDenied.outcome).toBe("confirmed_not_effected");
    const ownedView = inspect(store, created.value.id, SYNTHETIC_PRINCIPAL_A);
    if (ownedView.outcome !== "confirmed_effected") return;
    expect(ownedView.value.coverage).toHaveLength(0);
    expect(ownedView.value.evidence).toHaveLength(0);
  });
});
