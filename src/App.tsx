import { useState } from "react";
import {
  SYNTHETIC_PRINCIPAL_A,
  SYNTHETIC_PRINCIPAL_B,
  assertCoverage,
  createStore,
  establish,
  inspect,
  report,
  type ActionResult,
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

function formatExtent(view: InspectView["evidence"][number]["timeExtent"]): string {
  if (view.kind === "near_present") {
    return `${view.assertedLabel} (${view.precision})`;
  }
  return `${view.startLabel}–${view.endLabel} (${view.precision})`;
}

export function App() {
  const [store] = useState<ObservationStore>(() => createStore());
  const [principalId, setPrincipalId] = useState(SYNTHETIC_PRINCIPAL_A);
  const [observationId, setObservationId] = useState<string | null>(null);
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

  function refreshInspect(id: string) {
    const result = inspect(store, id, principalId);
    setStatus(describeResult(result));
    if (result.outcome === "confirmed_effected") {
      setView(result.value);
    } else {
      setView(null);
    }
  }

  function onEstablish() {
    const result = establish(store, principalId);
    setStatus(describeResult(result));
    if (result.outcome === "confirmed_effected") {
      setObservationId(result.value.id);
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
    const qty = Number(quantity);
    const result = report(store, observationId, principalId, {
      attemptId,
      simulateInterrupt: interrupt,
      provenance,
      measure: {
        unit,
        quantity: Number.isFinite(qty) ? qty : Number.NaN,
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
      setAttemptId((prev) => {
        const match = /^ui-attempt-(\d+)$/.exec(prev);
        if (!match) return `${prev}-next`;
        return `ui-attempt-${Number(match[1]) + 1}`;
      });
      refreshInspect(observationId);
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
    refreshInspect(observationId);
  }

  function onDemoObservedZero() {
    if (!observationId) {
      setStatus({
        tone: "bad",
        text: "Establish first to load the observed-zero demo path.",
      });
      return;
    }
    assertCoverage(store, observationId, principalId, {
      attemptId: `ui-cov-${Date.now()}`,
      status: "observed",
      completeness: "complete_claimed",
      unit: "groups",
      timeExtent: {
        kind: "interval",
        startLabel: "18:00",
        endLabel: "18:20",
        precision: "bounded",
      },
    });
    report(store, observationId, principalId, {
      attemptId: `ui-zero-${Date.now()}`,
      provenance: "contemporaneous",
      measure: { unit: "groups", quantity: 0, uncertainty: "none" },
      timeExtent: {
        kind: "interval",
        startLabel: "18:00",
        endLabel: "18:20",
        precision: "bounded",
      },
    });
    refreshInspect(observationId);
    setStatus({
      tone: "ok",
      text: "Added observed + complete_claimed coverage with a zero groups report (local demo).",
    });
  }

  return (
    <main>
      <div className="banner" role="note">
        <strong>Local synthetic prototype only</strong>
        In-memory TreatFlow Observation slice (014-B L01–L03). Not production,
        not authentication, no durable storage, no real participant data, and no
        public release or download of observation material.
      </div>

      <h1>TreatFlow</h1>
      <p className="lede">
        Effortless private recording and review — Establish, qualified Report,
        and Inspect on synthetic fixtures. Coverage without assertion stays
        unknown; equal counts are not automatic duplicates.
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
              <option value={SYNTHETIC_PRINCIPAL_A}>syn-principal-a (owner)</option>
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
          Current Observation id: {observationId ?? "(none)"}
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
          <button
            type="button"
            className="secondary"
            onClick={onDemoObservedZero}
          >
            Demo observed-zero path
          </button>
        </div>
      </section>

      <section className="panel" aria-labelledby="inspect-heading">
        <h2 id="inspect-heading">Inspect</h2>
        <button type="button" className="primary" onClick={onInspect}>
          Inspect entitled private state
        </button>
        {status ? (
          <p className={`status ${status.tone}`} role="status">
            {status.text}
          </p>
        ) : null}

        {view ? (
          <div>
            <p className="meta">
              Lifecycle: {view.status}. Unasserted monitoring:{" "}
              {view.unassertedMonitoring}.
            </p>
            <h3>Evidence</h3>
            {view.evidence.length === 0 ? (
              <p className="meta">No evidence items (unknown, not watched zero).</p>
            ) : (
              <ul className="evidence-list">
                {view.evidence.map((item) => (
                  <li key={item.id}>
                    <strong>
                      {item.measure.quantity} {item.measure.unit}
                    </strong>{" "}
                    · {formatExtent(item.timeExtent)} · {item.provenance}
                    <div className="meta">
                      Asserted activity time is separate from receipt{" "}
                      {item.receiptAt}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <h3>Coverage & interpretation</h3>
            <ul className="meta-list">
              <li>Coverage claims: {view.coverage.length}</li>
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
