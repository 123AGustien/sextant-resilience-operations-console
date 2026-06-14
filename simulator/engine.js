/**
 * Sextant Simulator Engine — Bridge Native Core
 * Outputs standardized frame → auto audit + Control Room sync
 */

/* =========================
   FRAME CONTRACT
=========================

frame = {
  rp04: { stability, pressure },
  system: { fx, bank, liq, eq, conf },
  state: "STABLE" | "RISK",
  scenario: "normal" | "failure" | "cascade",
  timestamp: number
}

========================= */

function runEngine(type) {

    const rp04 = {
        stability: type === "cascade" ? 0.25 : type === "failure" ? 0.55 : 0.82,
        pressure: type === "cascade" ? 0.95 : type === "failure" ? 0.60 : 0.28
    };

    const fx = rp04.pressure;

    const system = {
        fx,
        bank: fx * 0.83,
        liq: fx * 0.83 * 0.88,
        eq: fx * 0.83 * 0.88 * 0.91,
        conf: fx * 0.83 * 0.83 * 0.91 * 0.94
    };

    const state = rp04.stability > 0.6 ? "STABLE" : "RISK";

    const frame = {
        rp04,
        system,
        state,
        scenario: type,
        timestamp: Date.now()
    };

    return emitFrame(frame);
}

/* =========================
   BRIDGE EMITTER (CORE)
========================= */
function emitFrame(frame) {

    // UI event stream
    window.dispatchEvent(new CustomEvent("sextant:run", {
        detail: frame
    }));

    // Audit bridge (CONTROL ROOM LINK)
    if (window.SextantBridge?.captureSimulationResult) {
        window.SextantBridge.captureSimulationResult(frame);
    }

    return frame;
}

/* expose */
window.runEngine = runEngine;
