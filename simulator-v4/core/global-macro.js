/**
 * Sextant v4.0 - Lens System
 * Geopolitical perspective filter layer
 */

let ACTIVE_LENS = "global";

function changeLens(lens) {
  ACTIVE_LENS = lens;
  log("Lens switched → " + lens);
}

function applyLens(world) {

  // deep copy so we don't mutate original world state
  const modified = JSON.parse(JSON.stringify(world));

  Object.keys(modified).forEach(countryKey => {

    const c = modified[countryKey];

    // default = global (no change)
    if (ACTIVE_LENS === "global") return;

    // Singapore lens → export-sensitive economy boost
    if (ACTIVE_LENS === "singapore") {
      c.semis *= 1.25;
      c.nonTech *= 1.05;
    }

    // USA lens → industrial + policy strength emphasis
    if (ACTIVE_LENS === "usa") {
      c.industrial *= 1.3;
      c.nonTech *= 0.95;
    }

    // China lens → manufacturing-heavy view
    if (ACTIVE_LENS === "china") {
      c.industrial *= 1.35;
      c.semis *= 0.9;
    }

  });

  return modified;
}
