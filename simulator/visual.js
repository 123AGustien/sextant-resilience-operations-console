/**
 * Sextant v4.0 - Visual Layer (CONTROL ROOM OBSERVABILITY)
 * Tracks macro simulation evolution over time
 */

let history = [];

/**
 * PUSH STATE INTO HISTORY
 * Called from simulator.js after each run cycle
 */
function pushHistory(state) {

  if (!state) return;

  history.push({
    semis: Number(state.semis || 0),
    industrial: Number(state.industrial || 0),
    nonTech: Number(state.nonTech || 0),
    macroIndex: Number(state.macroIndex || 0)
  });

  // keep last 30 cycles
  if (history.length > 30) {
    history.shift();
  }

  renderChart();
}

/**
 * RENDER CONTROL ROOM TREND VIEW
 */
function renderChart() {

  const logBox = document.getElementById("log");
  if (!logBox) return;

  let output = "📊 MACRO INDEX TREND (LAST 30 CYCLES)\n\n";

  for (let i = 0; i < history.length; i++) {

    const h = history[i];
    const value = h.macroIndex;

    const barLength = Math.max(1, Math.floor(value / 10));
    const bar = "█".repeat(barLength);

    output +=
      String(i).padStart(2, "0") +
      ": " +
      bar +
      " (" +
      value.toFixed(1) +
      ")\n";
  }

  logBox.innerText = output;
}

/**
 * CLEAR HISTORY (CONTROL RESET FUNCTION)
 */
function clearHistory() {
  history = [];
  renderChart();
}
