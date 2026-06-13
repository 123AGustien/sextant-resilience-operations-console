/**
 * Sextant v4.0 - Simulator Controller
 * Stable Run + Reset (No ghost execution)
 */

/* =========================
   GLOBAL SAFETY FLAGS
========================= */

let isRunning = false;
window.__RUN_LOCK = false;

/* =========================
   WORLD STATE
========================= */

let CURRENT_WORLD = null;

/* =========================
   INIT WORLD SAFELY
========================= */

function initWorld() {
  if (!CURRENT_WORLD && typeof WORLD !== "undefined") {
    CURRENT_WORLD = JSON.parse(JSON.stringify(WORLD));
  }
}

/* =========================
   LOGGING
========================= */

function log(message) {
  const logBox = document.getElementById("log");
  if (!logBox) return;
  logBox.innerText += message + "\n";
}

/* =========================
   RUN SIMULATION (SAFE)
========================= */

function runSimulation() {

  try {

    // BLOCK MULTIPLE RUNS
    if (window.__RUN_LOCK) return;
    window.__RUN_LOCK = true;

    if (isRunning) return;
    isRunning = true;

    // ENSURE DEPENDENCIES
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

    // INIT STATE
    initWorld();

    const worldCopy = JSON.parse(JSON.stringify(CURRENT_WORLD));

    // APPLY LENS
    const view = applyLens(worldCopy);

    // SHOCK MODEL
    const shock = {
      trade: 0.05,
      policy: 0.03,
      energy: 0.04
    };

    // PROPAGATE
    propagateShock(view, "usa", shock);

    // COMPUTE OUTPUTS
    const index = computeGlobalIndex(view);
    const health = computeSystemHealth(view);

    // UI UPDATE
    const macroEl = document.getElementById("macroIndex");
    const decisionEl = document.getElementById("decision");

    if (macroEl) macroEl.innerText = index.toFixed(2);
    if (decisionEl) decisionEl.innerText = "System Health: " + health.toFixed(2);

    log("RUN | Macro Index: " + index.toFixed(2));

  } catch (err) {
    log("RUN ERROR: " + err.message);

  } finally {
    isRunning = false;
    window.__RUN_LOCK = false;
  }
}

/* =========================
   RESET SIMULATION (FIXED)
========================= */

function resetSimulation() {

  try {

    // HARD STOP EVERYTHING
    isRunning = false;
    window.__RUN_LOCK = false;

    if (typeof WORLD === "undefined") {
      log("ERROR: WORLD missing");
      return;
    }

    // RESET STATE
    CURRENT_WORLD = JSON.parse(JSON.stringify(WORLD));

    // UI RESET ONLY (NO RUN CALL)
    const macroEl = document.getElementById("macroIndex");
    const decisionEl = document.getElementById("decision");
    const logBox = document.getElementById("log");

    if (macroEl) macroEl.innerText = "0";
    if (decisionEl) decisionEl.innerText = "---";

    if (logBox) {
      logBox.innerText += "RESET | System restored cleanly\n";
    }

    console.log("RESET SUCCESS");

  } catch (err) {
    console.log("RESET ERROR:", err.message);
  }
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
   OPTIONAL BOOT (NO AUTO RUN)
========================= */

window.addEventListener("load", function () {
  console.log("Sextant Ready - Manual Control Mode");
});
