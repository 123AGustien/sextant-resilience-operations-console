/**
 * Sextant v3.1 - History Engine
 * Tracks macro evolution over time
 * (Production-safe browser module)
 */

(function () {

  const HISTORY = [];

  window.pushHistory = function (state) {

    if (!state) return;

    HISTORY.push({
      semis: Number(state.semis) || 0,
      industrial: Number(state.industrial) || 0,
      nonTech: Number(state.nonTech) || 0,
      macroIndex: Number(state.macroIndex) || 0,
      timestamp: Date.now()
    });

    if (HISTORY.length > 50) {
      HISTORY.shift();
    }
  };

  window.getHistory = function () {
    return HISTORY;
  };

})();
