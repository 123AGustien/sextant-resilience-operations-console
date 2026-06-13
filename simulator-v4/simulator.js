/**
 * Sextant v4.0 - Simulator Controller
 * Clean Control Room (Run + Reset Stable)
 */

/* =========================
   GLOBAL STATE
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
   INIT WORLD
========================= */

function initWorld() {
  if (!CURRENT_WORLD && typeof WORLD !== "undefined") {
    CURRENT_WORLD = JSON.parse(JSON.stringify(WORLD));
  }
}

/* =========================
   RUN SIMULATION (BUTTON)
========================= */

function runSimulation() {

  try {

    if (typeof WORLD === "undefined") {
      log("ERROR: WORLD missing");
      return;
    }

    initWorld();

    if (!CURRENT_WORLD) {
      log("ERROR: CURRENT_WORLD missing");
      return;
    }

    // Apply lens safely
    const view = applyLens(JSON.parse(JSON.stringify(CURRENT_WORLD)));

    // Shock model
    const shock = {
      trade: 0.05,
      policy: 0.03,
      energy: 0.04
    };

    // Propagation
    propagateShock(view, "usa", shock);

    // Compute results
    const index = computeGlobalIndex(view);
    const health = computeSystemHealth(view);

    // UI update
    const macroEl = document.getElementById("macroIndex");
    const decisionEl = document.getElementById("decision");

    if (macroEl) macroEl.innerText = index.toFixed(2);
    if (decisionEl) decisionEl.innerText = "System Health: " + health.toFixed(2);

    log("RUN | Macro Index: " + index.toFixed(2));

  } catch (err) {
    log("RUN ERROR: " + err.message);
  }
}

/* =========================
   RESET SIMULATION (BUTTON)
========================= */

function resetSimulation() {

  try {

    if (typeof WORLD === "undefined") {
      log("ERROR: WORLD missing");
      return;
    }

    // Reset world state
    CURRENT_WORLD = JSON.parse(JSON.stringify(WORLD));

    // Reset UI
    const macroEl = document.getElementById("macroIndex");
    const decisionEl = document.getElementById("decision");
    const logBox = document.getElementById("log");

    if (macroEl) macroEl.innerText = "0";
    if (decisionEl) decisionEl.innerText = "---";
    if (logBox) logBox.innerText += "RESET | System restored\n";

    log("RESET | Complete");

  } catch (err) {
    log("RESET ERROR: " + err.message);
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
   OPTIONAL BOOT LOG
========================= */

window.addEventListener("load", function () {
  console.log("Sextant Ready - Manual Mode");
});
