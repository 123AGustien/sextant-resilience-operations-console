/**
 * Sextant v4.0 - RUNTIME BOOTSTRAP + SIMULATOR
 * Guaranteed Run Button Stability Layer
 */

let isRunning = false;

/* =========================
   BOOTSTRAP GUARANTEE LAYER
========================= */

window.SEXTANT_BOOT = {
  ready: false,
  attempts: 0
};

function ensureEngineReady() {

  window.SEXTANT_BOOT.attempts++;

  // Auto-initialize WORLD safely
  if (!window.CURRENT_WORLD && typeof WORLD !== "undefined") {
    window.CURRENT_WORLD = JSON.parse(JSON.stringify(WORLD));
  }

  // Validate dependencies
  const ok =
    typeof WORLD !== "undefined" &&
    typeof propagateShock === "function" &&
    typeof computeGlobalIndex === "function" &&
    typeof computeSystemHealth === "function" &&
    typeof applyLens === "function";

  window.SEXTANT_BOOT.ready = ok;

  return ok;
}

/* =========================
   LOGGER
========================= */

function log(message) {
  const logBox = document.getElementById("log");
  if (!logBox) return;
  logBox.innerText += message + "\n";
}

/* =========================
   DIAGNOSTICS
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
   WORLD STATE (SAFE INIT)
========================= */

let CURRENT_WORLD = window.CURRENT_WORLD || null;

/* =========================
   MAIN SIMULATION ENGINE
========================= */

function runSimulation() {

  if (isRunning) return;
  isRunning = true;

  try {

    // 🔥 GUARANTEE ENGINE IS READY
    if (!ensureEngineReady()) {

      log("BOOTSTRAP | Engine not ready, retrying...");

      setTimeout(() => {
        isRunning = false;
        runSimulation();
      }, 300);

      return;
    }

    if (!window.CURRENT_WORLD && typeof WORLD !== "undefined") {
      window.CURRENT_WORLD = JSON.parse(JSON.stringify(WORLD));
    }

    const worldRef = window.CURRENT_WORLD;

    if (!worldRef) {
      log("ERROR: WORLD not available");
      return;
    }

    // Apply lens safely
    const view = applyLens(JSON.parse(JSON.stringify(worldRef)));

    // Shock model
    const shock = {
      trade: 0.05,
      policy: 0.03,
      energy: 0.04
    };

    // Propagate system shock
    propagateShock(view, "usa", shock);

    // Compute outputs
    const index = computeGlobalIndex(view);
    const health = computeSystemHealth(view);

    // Update UI
    const macroEl = document.getElementById("macroIndex");
    const decisionEl = document.getElementById("decision");

    if (macroEl) {
      macroEl.innerText = index.toFixed(2);
    }

    if (decisionEl) {
      decisionEl.innerText = "System Health: " + health.toFixed(2);
    }

    // Log output
    log("RUN | Macro Index: " + index.toFixed(2));

  } catch (err) {
    log("ERROR: " + err.message);
  } finally {
    isRunning = false;
  }
}

/* =========================
   RESET ENGINE
========================= */

function resetSimulation() {

  if (typeof WORLD !== "undefined") {
    window.CURRENT_WORLD = JSON.parse(JSON.stringify(WORLD));
  }

  log("RESET | System restored");

  isRunning = false;
  runSimulation();
}

/* =========================
   SAFE LENS SWITCH
========================= */

function changeLensSafe(lens) {

  if (typeof changeLens === "function") {
    changeLens(lens);
  }
}

/* =========================
   BOOT SEQUENCE
========================= */

window.addEventListener("load", function () {

  runDiagnostics();

  ensureEngineReady();

  setTimeout(function () {
    runSimulation();
  }, 500);
});
