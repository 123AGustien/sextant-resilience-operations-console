/**
 * Sextant v4.0 - Simulator Controller
 * Clean Control Room Runtime (Stable Build)
 */

/* =========================
   STATE
========================= */

let CURRENT_WORLD = null;

/* =========================
   LOGGER
========================= */

function log(message) {
  const logBox = document.getElementById("log");
  if (!logBox) return;
  logBox.innerText += message + "\n";
}

/* =========================
   DIAGNOSTICS (OPTIONAL)
========================= */

function runDiagnostics() {

  const logBox = document.getElementById("log");
  if (!logBox) return;

  logBox.innerText = "=== SEXTANT V4 DIAGNOSTIC START ===\n\n";

  function report(name, ok) {
    logBox.innerText += name + ": " + (ok ? "OK" : "MISSING") + "\n";
  }

  report("WORLD", typeof WORLD !== "undefined");
  report("propagateShock", typeof propagateShock === "function");
  report("computeGlobalIndex", typeof computeGlobalIndex === "function");
  report("computeSystemHealth", typeof computeSystemHealth === "function");
  report("applyLens", typeof applyLens === "function");
  report("changeLens", typeof changeLens === "function");

  logBox.innerText += "\n=== END DIAGNOSTIC ===\n";
}

/* =========================
   INIT WORLD SAFELY
========================= */

function initWorld() {
  if (!CURRENT_WORLD && typeof WORLD !== "undefined") {
    CURRENT_WORLD = JSON.parse(JSON.stringify(WORLD));
  }
}

/* =========================
   MAIN SIMULATION ENGINE
========================= */

function runSimulation() {

  try {

    if (typeof WORLD === "undefined") {
      log("ERROR: WORLD missing");
      return;
    }

    initWorld();

    if (!CURRENT_WORLD) {
      log("ERROR: CURRENT_WORLD not initialized");
      return;
    }

    // Apply lens view
    const view = applyLens(JSON.parse(JSON.stringify(CURRENT_WORLD)));

    // Base shock model
    const shock = {
      trade: 0.05,
      policy: 0.03,
      energy: 0.04
    };

    // Propagate shock
    propagateShock(view, "usa", shock);

    // Compute outputs
    const index = computeGlobalIndex(view);
    const health = computeSystemHealth(view);

    // UI update
    const macroEl = document.getElementById("macroIndex");
    const decisionEl = document.getElementById("decision");

    if (macroEl) macroEl.innerText = index.toFixed(2);
    if (decisionEl) decisionEl.innerText = "System Health: " + health.toFixed(2);

    // Log
    log("RUN | Macro Index: " + index.toFixed(2));

  } catch (err) {
    log("ERROR: " + err.message);
  }
}

/* =========================
   RESET SYSTEM
========================= */

function resetSimulation() {

  initWorld();

  log("RESET | System restored");

  runSimulation();
}

/* =========================
   LENS SAFETY WRAPPER
========================= */

function changeLensSafe(lens) {
  if (typeof changeLens === "function") {
    changeLens(lens);
  }
}

/* =========================
   BOOT (SAFE ONLY)
========================= */

window.addEventListener("load", function () {

  runDiagnostics();

  initWorld();

  log("SYSTEM READY");
});
