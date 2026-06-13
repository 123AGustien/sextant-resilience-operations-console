/**
 * Sextant v3.1 - History Engine
 * Tracks macro evolution over time
 */

let HISTORY = [];

function pushHistory(state) {

  HISTORY.push({
    semis: state.semis,
    industrial: state.industrial,
    nonTech: state.nonTech,
    macroIndex: state.macroIndex
  });

  if (HISTORY.length > 50) {
    HISTORY.shift();
  }
}

function getHistory() {
  return HISTORY;
}
