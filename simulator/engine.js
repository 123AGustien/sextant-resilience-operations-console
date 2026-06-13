/**
 * Sextant Simulator - Engine Module
 * v1.1.0-simulator-engine
 */

let state = JSON.parse(JSON.stringify(BASE_DATA));

function applyShock(state, scenario) {
  state.shock = scenario.shock * 10;
  return state;
}

function calculateModel(state, scenario) {

  let electronics = state.electronics * (1.05 / scenario.shock);
  let nonTech = state.nonTech * (0.98);

  let exportIndex = (electronics + nonTech) / scenario.shock;

  return {
    electronics,
    nonTech,
    exportIndex
  };
}

function runStep(scenario) {

  state = applyShock(state, scenario);

  const result = calculateModel(state, scenario);

  state.electronics = result.electronics;
  state.nonTech = result.nonTech;
  state.exportIndex = result.exportIndex;

  log("Simulation step: " + scenario.name);

  return state;
}

function resetState() {
  state = JSON.parse(JSON.stringify(BASE_DATA));
}
