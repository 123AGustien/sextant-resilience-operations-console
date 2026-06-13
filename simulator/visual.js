/**
 * Sextant v4.0 - Visual Layer (FIXED)
 * Connects simulation history → trend rendering
 */

let history = [];

/**
 * PUSH STATE INTO HISTORY
 * Called from simulator.js after each run
 */
function pushHistory(state) {

  history.push({
    semis: state.semis,
    industrial: state.industrial,
    nonTech: state.nonTech,
    macroIndex: state.macroIndex
  });

  // keep last 30 cycles only
  if (history.length > 30) {
    history.shift();
  }

  renderChart();
}

/**
 * RENDER SIMPLE CONTROL ROOM TREND VIEW
 */
function renderChart() {

  const logBox = document.getElementById("log");

  if (!logBox) return;

  let output = "📊 MACRO INDEX TREND (LAST 30 CYCLES)\n\n";

  history.forEach((h, i) => {

    const value = h.macroIndex || 0;

    const bar = "█".repeat(Math.max(1, Math.floor(value / 10)));

    output += `${String(i).padStart(2, "0")}: ${bar} (${value.toFixed(1)})\n`;
  });

  logBox.innerText = output;
}

/**
 * OPTIONAL: CLEAR HISTORY
 */
function clearHistory() {
  history = [];
  renderChart();
}
