import { useState } from "react";
import {
  SYNTHETIC_PRINCIPAL_A,
  SYNTHETIC_PRINCIPAL_B,
  assertCoverage,
  close,
  createStore,
  establish,
  inspect,
  inspectAfterClose,
  parseQuantityInput,
  qualify,
  report,
  type ActionResult,
  type CompletenessClaim,
  type CoverageStatus,
  type InspectView,
  type MeasureUnit,
  type ObservationStore,
  type ProvenanceKind,
} from "./domain";

type StatusMessage =
  | { tone: "ok" | "bad" | "unknown"; text: string }
  | null;

function describeResult(result: ActionResult<unknown>): StatusMessage {
  if (result.outcome === "confirmed_effected") {
    return { tone: "ok", text: "Confirmed effected (local synthetic)." };
  }
  if (result.outcome === "confirmed_not_effected") {
    return { tone: "bad", text: `Confirmed not effected: ${result.reason}` };
  }
  return {
    tone: "unknown",
    text: `Unresolved: ${result.reason}`,
  };
}

function formatExtent(
  view: InspectView["evidence"][number]["timeExtent"],
): string {
  if (view.kind === "near_present") {
    return `${view.assertedLabel} (${view.precision})`;
  }
  return `${view.startLabel}–${view.endLabel} (${view.precision})`;
}

function nextAttempt(prev: string): string {
  const match = /^ui-attempt-(\d+)$/.exec(prev);
  if (!match) return `${prev}-next`;
  return `ui-attempt-${Number(match[1]) + 1}`;
}

export function App() {
  const [store] = useState<ObservationStore>(() => createStore());
  const [principalId, setPrincipalId] = useState(SYNTHETIC_PRINCIPAL_A);
  const [observationId, setObservationId] = useState<string | null>(null);
  const [lifecycle, setLifecycle] = useState<"open" | "closed" | null>(null);
  const [view, setView] = useState<InspectView | null>(null);
  const [status, setStatus] = useState<StatusMessage>(null);

  const [unit, setUnit] = useState<MeasureUnit>("people");
  const [quantity, setQuantity] = useState("4");
  const [mode, setMode] = useState<"near_present" | "interval">("near_present");
  const [provenance, setProvenance] =
    useState<ProvenanceKind>("contemporaneous");
  const [attemptId, setAttemptId] = useState("ui-attempt-1");
  const [interrupt, setInterrupt] = useState(false);
  const [startLabel, setStartLabel] = useState("6 PM");
  const [endLabel, setEndLabel] = useState("10 PM");

  const [covStatus, setCovStatus] = useState<CoverageStatus>("observed");
  const [covCompleteness, setCovCompleteness] =
    useState<CompletenessClaim>("complete_claimed");
  const [covUnit, setCovUnit] = useState<MeasureUnit>("groups");
  const [covStart, setCovStart] = useState("18:00");
  const [covEnd, setCovEnd] = useState("18:20");

  const [qualTarget, setQualTarget] = useState<"evidence" | "coverage">(
    "evidence",
  );
  const [qualTargetId, setQualTargetId] = useState("");
  const [qualUncertainty, setQualUncertainty] = useState<
    "none" | "low" | "high"
  >("high");
  const [qualCompleteness, setQualCompleteness] =
    useState<CompletenessClaim>("partial");
  const [qualNote, setQualNote] = useState("");
  const [tryRewriteCount, setTryRewriteCount] = useState(false);

  function refreshInspect(id: string, closed: boolean) {
    const result = closed
      ? inspectAfterClose(store, id, principalId)
      : inspect(store, id, principalId);
    setStatus(describeResult(result));
    if (result.outcome === "confirmed_effected") {
      setView(result.value);
      setLifecycle(result.value.status);
    } else {
      setView(null);
    }
  }

  function onEstablish() {
    const result = establish(store, principalId);
    setStatus(describeResult(result));
    if (result.outcome === "confirmed_effected") {
      setObservationId(result.value.id);
      setLifecycle("open");
      setView(null);
    }
  }

  function onReport() {
    if (!observationId) {
      setStatus({
        tone: "bad",
        text: "Establish a synthetic Observation before reporting.",
      });
      return;
    }
    const parsed = parseQuantityInput(quantity);
    if (!parsed.ok) {
      setStatus({ tone: "bad", text: parsed.reason });
      return;
    }
    const result = report(store, observationId, principalId, {
      attemptId,
      simulateInterrupt: interrupt,
      provenance,
      measure: {
        unit,
        quantity: parsed.quantity,
        uncertainty: provenance === "recalled" ? "high" : "low",
      },
      timeExtent:
        mode === "near_present"
          ? {
              kind: "near_present",
              assertedLabel: "NOW",
              precision: "approximate",
            }
          : {
              kind: "interval",
              startLabel,
              endLabel,
              precision: "approximate",
            },
    });
    setStatus(describeResult(result));
    if (result.outcome === "confirmed_effected") {
      setAttemptId(nextAttempt);
      refreshInspect(observationId, lifecycle === "closed");
    }
  }

  function onAssertCoverage() {
    if (!observationId) {
      setStatus({
        tone: "bad",
        text: "Establish a synthetic Observation before asserting coverage.",
      });
      return;
    }
    const result = assertCoverage(store, observationId, principalId, {
      attemptId,
      status: covStatus,
      completeness: covCompleteness,
      unit: covUnit,
      timeExtent: {
        kind: "interval",
        startLabel: covStart,
        endLabel: covEnd,
        precision: "bounded",
      },
    });
    setStatus(describeResult(result));
    if (result.outcome === "confirmed_effected") {
      setAttemptId(nextAttempt);
      refreshInspect(observationId, false);
    }
  }

  function onQualify() {
    if (!observationId) {
      setStatus({
        tone: "bad",
        text: "Establish a synthetic Observation before qualifying.",
      });
      return;
    }
    if (!qualTargetId.trim()) {
      setStatus({
        tone: "bad",
        text: "Select or enter an evidence/coverage id to qualify.",
      });
      return;
    }
    const result =
      qualTarget === "evidence"
        ? qualify(store, observationId, principalId, {
            attemptId,
            targetKind: "evidence",
            evidenceId: qualTargetId.trim(),
            uncertainty: qualUncertainty,
            note: qualNote || undefined,
            forbiddenQuantityChange: tryRewriteCount ? 99 : undefined,
          })
        : qualify(store, observationId, principalId, {
            attemptId,
            targetKind: "coverage",
            coverageId: qualTargetId.trim(),
            completeness: qualCompleteness,
            note: qualNote || undefined,
            forbiddenQuantityChange: tryRewriteCount ? 99 : undefined,
          });
    setStatus(describeResult(result));
    if (result.outcome === "confirmed_effected") {
      setAttemptId(nextAttempt);
      setTryRewriteCount(false);
      refreshInspect(observationId, false);
    }
  }

  function onClose() {
    if (!observationId) {
      setStatus({ tone: "bad", text: "No Observation to close." });
      return;
    }
    const result = close(store, observationId, principalId);
    setStatus(describeResult(result));
    if (result.outcome === "confirmed_effected") {
      setLifecycle("closed");
      refreshInspect(observationId, true);
    }
  }

  function onInspect() {
    if (!observationId) {
      setStatus({
        tone: "bad",
        text: "No Observation id to inspect.",
      });
      return;
    }
    refreshInspect(observationId, lifecycle === "closed");
  }

  return (
    <main>
      <div className="banner" role="note">
        <strong>Local synthetic prototype only</strong>
        In-memory TreatFlow Observation slice (016-B/C local). Not production,
        not authentication, no durable storage, no real participant data, and no
        public release or download of observation material. Qualify cannot
        rewrite factual counts.
      </div>

      <h1>TreatFlow</h1>
      <p className="lede">
        Local seven-action Observation surface: Establish, Report,
        AssertCoverage, Qualify, Inspect, Close, and InspectAfterClose.
        Coverage without assertion stays unknown; closed accounts deny further
        direct additions.
      </p>

      <section className="panel" aria-labelledby="principal-heading">
        <h2 id="principal-heading">Simulated principal</h2>
        <p className="meta">
          Switching principals only simulates entitlement locally. This is not
          security enforcement.
        </p>
        <div className="row">
          <label>
            Principal
            <select
              value={principalId}
              onChange={(event) => {
                setPrincipalId(event.target.value);
                setView(null);
              }}
            >
              <option value={SYNTHETIC_PRINCIPAL_A}>
                syn-principal-a (owner)
              </option>
              <option value={SYNTHETIC_PRINCIPAL_B}>
                syn-principal-b (unentitled)
              </option>
            </select>
          </label>
        </div>
      </section>

      <section className="panel" aria-labelledby="establish-heading">
        <h2 id="establish-heading">Establish</h2>
        <button type="button" className="primary" onClick={onEstablish}>
          Establish open Observation
        </button>
        <p className="meta">
          Current Observation id: {observationId ?? "(none)"} · lifecycle:{" "}
          {lifecycle ?? "(none)"}
        </p>
      </section>

      <section className="panel" aria-labelledby="report-heading">
        <h2 id="report-heading">Report</h2>
        <div className="row">
          <label>
            Unit
            <select
              value={unit}
              onChange={(event) => setUnit(event.target.value as MeasureUnit)}
            >
              <option value="people">people</option>
              <option value="groups">groups</option>
            </select>
          </label>
          <label>
            Quantity
            <input
              inputMode="numeric"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </label>
          <label>
            Time mode
            <select
              value={mode}
              onChange={(event) =>
                setMode(event.target.value as "near_present" | "interval")
              }
            >
              <option value="near_present">Near-present (NOW)</option>
              <option value="interval">Bounded interval total</option>
            </select>
          </label>
          <label>
            Provenance
            <select
              value={provenance}
              onChange={(event) =>
                setProvenance(event.target.value as ProvenanceKind)
              }
            >
              <option value="contemporaneous">Contemporaneous</option>
              <option value="recalled">Recalled</option>
            </select>
          </label>
          <label>
            Attempt id
            <input
              value={attemptId}
              onChange={(event) => setAttemptId(event.target.value)}
            />
          </label>
        </div>
        {mode === "interval" ? (
          <div className="row">
            <label>
              Start label
              <input
                value={startLabel}
                onChange={(event) => setStartLabel(event.target.value)}
              />
            </label>
            <label>
              End label
              <input
                value={endLabel}
                onChange={(event) => setEndLabel(event.target.value)}
              />
            </label>
          </div>
        ) : null}
        <div className="row">
          <label>
            <span className="sr-only">Simulate interrupted attempt</span>
            <span>
              <input
                type="checkbox"
                checked={interrupt}
                onChange={(event) => setInterrupt(event.target.checked)}
              />{" "}
              Simulate interrupted attempt (unresolved)
            </span>
          </label>
        </div>
        <div className="row">
          <button type="button" className="primary" onClick={onReport}>
            Submit report
          </button>
        </div>
      </section>

      <section className="panel" aria-labelledby="coverage-heading">
        <h2 id="coverage-heading">AssertCoverage</h2>
        <div className="row">
          <label>
            Status
            <select
              value={covStatus}
              onChange={(event) =>
                setCovStatus(event.target.value as CoverageStatus)
              }
            >
              <option value="observed">observed</option>
              <option value="not_observed">not_observed</option>
              <option value="uncertain">uncertain</option>
            </select>
          </label>
          <label>
            Completeness
            <select
              value={covCompleteness}
              onChange={(event) =>
                setCovCompleteness(event.target.value as CompletenessClaim)
              }
            >
              <option value="complete_claimed">complete_claimed</option>
              <option value="partial">partial</option>
              <option value="unknown">unknown</option>
            </select>
          </label>
          <label>
            Unit
            <select
              value={covUnit}
              onChange={(event) =>
                setCovUnit(event.target.value as MeasureUnit)
              }
            >
              <option value="groups">groups</option>
              <option value="people">people</option>
            </select>
          </label>
          <label>
            Start
            <input
              value={covStart}
              onChange={(event) => setCovStart(event.target.value)}
            />
          </label>
          <label>
            End
            <input
              value={covEnd}
              onChange={(event) => setCovEnd(event.target.value)}
            />
          </label>
        </div>
        <button type="button" className="primary" onClick={onAssertCoverage}>
          Assert coverage
        </button>
      </section>

      <section className="panel" aria-labelledby="qualify-heading">
        <h2 id="qualify-heading">Qualify</h2>
        <p className="meta">
          Refines uncertainty or completeness. Cannot change reported quantity
          (Revision boundary).
        </p>
        <div className="row">
          <label>
            Target kind
            <select
              value={qualTarget}
              onChange={(event) =>
                setQualTarget(event.target.value as "evidence" | "coverage")
              }
            >
              <option value="evidence">evidence</option>
              <option value="coverage">coverage</option>
            </select>
          </label>
          <label>
            Target id
            <input
              value={qualTargetId}
              onChange={(event) => setQualTargetId(event.target.value)}
              placeholder="syn-ev-1 or syn-cov-1"
            />
          </label>
          {qualTarget === "evidence" ? (
            <label>
              Uncertainty
              <select
                value={qualUncertainty}
                onChange={(event) =>
                  setQualUncertainty(
                    event.target.value as "none" | "low" | "high",
                  )
                }
              >
                <option value="none">none</option>
                <option value="low">low</option>
                <option value="high">high</option>
              </select>
            </label>
          ) : (
            <label>
              Completeness
              <select
                value={qualCompleteness}
                onChange={(event) =>
                  setQualCompleteness(event.target.value as CompletenessClaim)
                }
              >
                <option value="complete_claimed">complete_claimed</option>
                <option value="partial">partial</option>
                <option value="unknown">unknown</option>
              </select>
            </label>
          )}
          <label>
            Note
            <input
              value={qualNote}
              onChange={(event) => setQualNote(event.target.value)}
            />
          </label>
        </div>
        <div className="row">
          <label>
            <span>
              <input
                type="checkbox"
                checked={tryRewriteCount}
                onChange={(event) => setTryRewriteCount(event.target.checked)}
              />{" "}
              Attempt forbidden quantity rewrite (must deny)
            </span>
          </label>
        </div>
        <button type="button" className="primary" onClick={onQualify}>
          Apply qualification
        </button>
      </section>

      <section className="panel" aria-labelledby="lifecycle-heading">
        <h2 id="lifecycle-heading">Close / Inspect</h2>
        <div className="row">
          <button type="button" className="secondary" onClick={onClose}>
            Close Observation
          </button>
          <button type="button" className="primary" onClick={onInspect}>
            {lifecycle === "closed"
              ? "InspectAfterClose"
              : "Inspect entitled private state"}
          </button>
        </div>
        {status ? (
          <p className={`status ${status.tone}`} role="status">
            {status.text}
          </p>
        ) : null}

        {view ? (
          <div>
            <p className="meta">
              Lifecycle: {view.status}
              {view.closedAt ? ` (closed at ${view.closedAt})` : ""}. Unasserted
              monitoring: {view.unassertedMonitoring}.
            </p>
            <h3>Evidence</h3>
            {view.evidence.length === 0 ? (
              <p className="meta">
                No evidence items (unknown, not watched zero).
              </p>
            ) : (
              <ul className="evidence-list">
                {view.evidence.map((item) => (
                  <li key={item.id}>
                    <strong>
                      {item.id}: {item.measure.quantity} {item.measure.unit}
                    </strong>{" "}
                    · uncertainty {item.measure.uncertainty} ·{" "}
                    {formatExtent(item.timeExtent)} · {item.provenance}
                    <div className="meta">
                      Asserted activity time is separate from receipt{" "}
                      {item.receiptAt}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <h3>Coverage</h3>
            {view.coverage.length === 0 ? (
              <p className="meta">No coverage claims.</p>
            ) : (
              <ul className="evidence-list">
                {view.coverage.map((item) => {
                  const qualified = [...view.qualifications]
                    .reverse()
                    .find(
                      (q) =>
                        q.targetKind === "coverage" &&
                        q.targetId === item.id &&
                        q.appliedCompleteness !== undefined,
                    );
                  return (
                    <li key={item.id}>
                      <strong>
                        {item.id}: {item.status}
                      </strong>{" "}
                      · asserted {item.completeness}
                      {qualified?.appliedCompleteness
                        ? ` · qualified ${qualified.appliedCompleteness}`
                        : ""}{" "}
                      · {item.unit} · {formatExtent(item.timeExtent)}
                    </li>
                  );
                })}
              </ul>
            )}
            <h3>Qualifications</h3>
            {view.qualifications.length === 0 ? (
              <p className="meta">No qualifications applied.</p>
            ) : (
              <ul className="meta-list">
                {view.qualifications.map((item) => (
                  <li key={item.id}>
                    {item.id} → {item.targetKind} {item.targetId}
                    {item.appliedUncertainty
                      ? ` · uncertainty ${item.priorUncertainty}→${item.appliedUncertainty}`
                      : ""}
                    {item.appliedCompleteness
                      ? ` · completeness ${item.priorCompleteness}→${item.appliedCompleteness}`
                      : ""}
                    {item.note ? ` · ${item.note}` : ""}
                  </li>
                ))}
              </ul>
            )}
            <h3>Interpretation</h3>
            <ul className="meta-list">
              <li>Contested overlaps: {view.contestedCoverage.length}</li>
              {view.observedZeroInterpretations.map((item) => (
                <li key={`${item.evidenceId}-${item.coverageId}`}>
                  Zero {item.evidenceId}:{" "}
                  {item.interpretableAsReportedObservedZero
                    ? "interpretable as reported observed zero"
                    : "not observed zero"}{" "}
                  — {item.note}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </main>
  );
}
