/**
 * Sextant v4.0 - Simulator Controller
 * Connects UI ↔ World Model ↔ Lens ↔ Macro Engine
 */

let CURRENT_WORLD = JSON.parse(JSON.stringify(WORLD));

function runSimulation() {

  // 1. Apply lens view (non-destructive)
  const view = applyLens(CURRENT_WORLD);

  // 2. Define base shock scenario (can be upgraded later)
  const shock = {
    trade: 0.05,
    policy: 0.03,
    energy: 0.04
  };

  // 3. Propagate shock through system
  propagateShock(view, "usa", shock);

  // 4. Compute macro outputs
  const index = computeGlobalIndex(view);
  const health = computeSystemHealth(view);

  // 5. Update UI safely
  const macroEl = document.getElementById("macroIndex");
  const decisionEl = document.getElementById("decision");

  if (macroEl) {
    macroEl.innerText = index.toFixed(2);
  }

  if (decisionEl) {
    decisionEl.innerText = "System Health: " + health.toFixed(2);
  }

  // 6. Log system event
  log("RUN | Macro Index: " + index.toFixed(2));
}

function resetSimulation() {

  CURRENT_WORLD = JSON.parse(JSON.stringify(WORLD));

  log("RESET | System restored to baseline");

  runSimulation();
}

/**
 * Optional manual trigger for lens switching safety hook
 */
function changeLensSafe(lens) {
  if (typeof changeLens === "function") {
    changeLens(lens);
  }
}
