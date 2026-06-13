/**
 * Sextant v3.0 - Engine Core
 * Connects scenarios → shock → macro model → state update
 */

// import-like references (global scope in browser)
let currentState = JSON.parse(JSON.stringify(SECTOR_BASE));
let currentScenario = BASELINE_SCENARIO;

function selectScenario(name) {

  if (name === "AI Expansion Cycle") {
    currentScenario = AI_CYCLE_SCENARIO;
  }

  if (name === "Global Tariff War") {
    currentScenario = TARIFF_WAR_SCENARIO;
  }

  if (name === "Baseline Stability") {
    currentScenario = BASELINE_SCENARIO;
  }

  log("Scenario selected: " + currentScenario.name);
}

function runSimulation() {

  // 1. Generate shock
  const shock = generateShock(currentScenario.shock);

  // 2. Apply shock to state
  currentState = applyShock(currentState, shock);

  // 3. Run macro engine
  const result = computeMacroState(currentState, shock);

  // 4. Update state
  currentState.semis = result.semis;
  currentState.industrial = result.industrial;
  currentState.nonTech = result.nonTech;

  // 5. Compute decision signal
  const decision = generateDecision(result);

  // 6. Render UI
  updateUI(result, decision);

  log("Cycle executed: " + currentScenario.name);
}

function resetSimulation() {
  currentState = JSON.parse(JSON.stringify(SECTOR_BASE));
  log("System reset to baseline state");
}
