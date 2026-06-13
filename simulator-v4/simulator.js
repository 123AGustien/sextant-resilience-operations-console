/**
 * Sextant v4.0 - Simulator Controller
 * Safe Runtime Version (FINAL STABLE)
 */

let isRunning = false;

/**
 * Logger helper
 */
function log(message) {
  const logBox = document.getElementById("log");
  if (!logBox) return;
  logBox.innerText += message + "\n";
}

/**
 * DIAGNOSTICS
 */
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

/**
 * WORLD STATE
 */
let CURRENT_WORLD = {};

if (typeof WORLD !== "undefined") {
  CURRENT_WORLD = JSON.parse(JSON.stringify(WORLD));
}

/**
 * MAIN SIMULATION RUN
 */
function runSimulation() {

  if (isRunning) return;
  isRunning = true;

  try {

    if (typeof WORLD === "undefined") {
      log("ERROR: WORLD missing");
      return;
    }

    if (typeof applyLens !== "function") {
      log("ERROR: applyLens missing");
      return;
    }

    if (typeof propagateShock !== "function") {
      log("ERROR: propagateShock missing");
      return;
    }

    if (typeof computeGlobalIndex !== "function") {
      log("ERROR: computeGlobalIndex missing");
      return;
    }

    if (typeof computeSystemHealth !== "function") {
      log("ERROR: computeSystemHealth missing");
      return;
    }

    // 1. Apply lens view
    const view = applyLens(
      JSON.parse(JSON.stringify(CURRENT_WORLD))
    );

    // 2. Base shock model
    const shock = {
      trade: 0.05,
      policy: 0.03,
      energy: 0.04
    };

    // 3. Propagate shock
    propagateShock(view, "usa", shock);

    // 4. Compute outputs
    const index = computeGlobalIndex(view);
    const health = computeSystemHealth(view);

    // 5. Update UI
    const macroEl = document.getElementById("macroIndex");
    const decisionEl = document.getElementById("decision");

    if (macroEl) {
      macroEl.innerText = index.toFixed(2);
    }

    if (decisionEl) {
      decisionEl.innerText =
        "System Health: " + health.toFixed(2);
    }

    // 6. Log output
    log("RUN | Macro Index: " + index.toFixed(2));

  } catch (err) {
    log("ERROR: " + err.message);
  } finally {
    isRunning = false;
  }
}

/**
 * RESET SIMULATION
 */
function resetSimulation() {

  if (typeof WORLD !== "undefined") {
    CURRENT_WORLD = JSON.parse(JSON.stringify(WORLD));
  }

  log("RESET | System restored");

  runSimulation();
}

/**
 * SAFE LENS SWITCH
 */
function changeLensSafe(lens) {

  if (typeof changeLens === "function") {
    changeLens(lens);
  }
}

/**
 * AUTO START
 */
window.addEventListener("load", function () {

  runDiagnostics();

  setTimeout(function () {
    runSimulation();
  }, 500);
});
