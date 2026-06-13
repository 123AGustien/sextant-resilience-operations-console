/**
 * Sextant v4.0 - Simulator Controller
 * Unified control layer (run / reset / lens switching)
 */

// Ensure safe defaults
let worldState = (typeof WORLD !== "undefined")
  ? JSON.parse(JSON.stringify(WORLD))
  : {};

let currentLens = "global";

/**
 * MAIN RUN FUNCTION
 */
function runSimulation() {

  if (typeof runGlobalSimulation === "function") {
    runGlobalSimulation();
  }

  const view = (typeof getLensView === "function")
    ? getLensView(worldState)
    : worldState;

  const index = (typeof getLensIndex === "function")
    ? getLensIndex(worldState)
    : 0;

  if (typeof updateGlobalUI === "function") {
    updateGlobalUI(view, index);
  }

  if (typeof logGlobal === "function") {
    logGlobal("Simulation cycle executed");
  }
}

/**
 * RESET SYSTEM
 */
function resetSimulation() {

  if (typeof WORLD !== "undefined") {
    worldState = JSON.parse(JSON.stringify(WORLD));
  }

  if (typeof resetGlobalSimulation === "function") {
    resetGlobalSimulation();
  }

  if (typeof updateGlobalUI === "function") {
    updateGlobalUI(worldState, 0);
  }

  if (typeof logGlobal === "function") {
    logGlobal("System reset to baseline state");
  }
}

/**
 * LENS SWITCHING FROM UI
 */
function changeLens(lens) {

  currentLens = lens;

  if (typeof setLens === "function") {
    setLens(lens);
  }

  const view = (typeof getLensView === "function")
    ? getLensView(worldState)
    : worldState;

  const index = (typeof getLensIndex === "function")
    ? getLensIndex(worldState)
    : 0;

  if (typeof updateGlobalUI === "function") {
    updateGlobalUI(view, index);
  }

  if (typeof logGlobal === "function") {
    logGlobal("Lens changed to: " + lens);
  }
}
