/**
 * Sextant v4.0 - Lens System
 * Perspective layer for viewing global macro system
 */

const LENSES = {
  GLOBAL: "global",
  SINGAPORE: "singapore",
  USA: "usa",
  CHINA: "china"
};

let currentLens = LENSES.GLOBAL;

/**
 * Switch viewing perspective
 */
function setLens(lensName) {

  const key = lensName.toUpperCase();

  if (LENSES[key]) {
    currentLens = LENSES[key].toLowerCase();
    logGlobal("Lens switched to: " + currentLens);
  }
}

/**
 * Get world view based on lens
 */
function getLensView(world) {

  if (currentLens === "global") {
    return world;
  }

  const view = {};

  if (world[currentLens]) {
    view[currentLens] = world[currentLens];
  }

  return view;
}

/**
 * Compute index based on lens perspective
 */
function getLensIndex(world) {

  const view = getLensView(world);

  let total = 0;
  let count = 0;

  Object.values(view).forEach(country => {

    total +=
      (country.semis || 0) +
      (country.industrial || 0) +
      (country.nonTech || 0);

    count++;
  });

  return count > 0 ? total / count : 0;
}
/**
 * COMPATIBILITY LAYER (required by simulator.js)
 */

function changeLens(lens) {
  setLens(lens);
}

function applyLens(world) {
  return getLensView(world);
}
