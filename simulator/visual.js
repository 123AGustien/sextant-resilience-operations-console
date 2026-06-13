/**
 * Sextant Simulator - Visual Layer
 * v1.2.0-simulator-visual
 */

let history = [];

function pushHistory(state) {

  history.push({
    exportIndex: state.exportIndex,
    electronics: state.electronics,
    nonTech: state.nonTech
  });

  if (history.length > 30) history.shift();

  renderChart();
}

function renderChart() {

  const logBox = document.getElementById("log");

  let output = "EXPORT INDEX TREND (LAST 30 CYCLES)\n\n";

  history.forEach((h, i) => {
    let bar = "█".repeat(Math.max(1, Math.floor(h.exportIndex / 10)));
    output += i + ": " + bar + "\n";
  });

  logBox.innerText = output;
}
