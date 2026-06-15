/**
 * Sextant v4.0 - Visual Layer (CONTROL ROOM OBSERVABILITY)
 * FULL RP-04 INTEGRATION VERSION
 * - Live system trend tracking
 * - Orchestra event binding
 * - Control room log rendering
 */

let history = [];

/**
 * PUSH FRAME INTO HISTORY
 * Triggered on every orchestration cycle
 */
function pushHistory(frame) {

  if (!frame || !frame.system) return;

  const s = frame.system;

  history.push({
    fx: Number(s.fx || 0),
    bank: Number(s.bank || 0),
    liq: Number(s.liq || 0),
    eq: Number(s.eq || 0),
    conf: Number(s.conf || 0),
    timestamp: frame.timestamp || Date.now()
  });

  // Keep last 30 cycles only
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

  let output = "📊 RP-04 SYSTEM TREND (LAST 30 CYCLES)\n\n";

  for (let i = 0; i < history.length; i++) {

    const h = history[i];

    // use confidence as main stability indicator
    const value = (h.conf || 0) * 100;

    const barLength = Math.max(1, Math.floor(value / 10));
    const bar = "█".repeat(barLength);

    output +=
      String(i).padStart(2, "0") +
      ": " +
      bar +
      " (" +
      value.toFixed(1) +
      "%)\n";
  }

  logBox.innerText = output;
}

/**
 * CLEAR HISTORY (RESET FUNCTION)
 */
function clearHistory() {
  history = [];
  renderChart();
}

/**
 * ORCHESTRA EVENT BINDING
 * Automatically listens to simulation output
 */
window.addEventListener("sextant:orchestrate", function (e) {
  pushHistory(e.detail);
});

/**
 * OPTIONAL: DIRECT RUN EVENT SUPPORT
 */
window.addEventListener("sextant:run", function (e) {
  pushHistory(e.detail);
});
