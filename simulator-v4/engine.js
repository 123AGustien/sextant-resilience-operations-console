/**
 * Sextant v4.0 - Global Engine
 * Multi-country shock propagation system
 */

// Ensure world is copied (avoid mutation bugs)
let worldState = JSON.parse(JSON.stringify(WORLD));

let currentScenario = GEO_CRISIS_SCENARIO;

function runGlobalSimulation() {

  // 1. Create shock
  const shock = currentScenario.shock;

  // 2. Apply shock at origin country
  const origin = currentScenario.shockOrigin;

  worldState = propagateShock(worldState, origin, shock);

  // 3. Compute global macro index
  const globalIndex = computeGlobalIndex(worldState);

  // 4. Render system
  updateGlobalUI(worldState, globalIndex);

  logGlobal("Shock applied from: " + origin);
  logGlobal("Global Index: " + globalIndex.toFixed(2));
}

function resetGlobalSimulation() {

  worldState = JSON.parse(JSON.stringify(WORLD));

  logGlobal("World reset to baseline state");
}
