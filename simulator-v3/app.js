/**
 * Sextant v3.0 - App Controller
 * Connects UI ↔ Engine ↔ Rendering
 */

window.onload = function () {

  const select = document.getElementById("scenarioSelect");

  // populate dropdown
  const scenarios = [
    BASELINE_SCENARIO,
    AI_CYCLE_SCENARIO,
    TARIFF_WAR_SCENARIO
  ];

  scenarios.forEach(sc => {
    const opt = document.createElement("option");
    opt.value = sc.name;
    opt.text = sc.name;
    select.appendChild(opt);
  });

  // default selection
  select.onchange = (e) => {
    selectScenario(e.target.value);
  };

  selectScenario(BASELINE_SCENARIO.name);

  updateUI({
    semis: 0,
    industrial: 0,
    nonTech: 0,
    macroIndex: 0
  }, "---");
};

function updateUI(data, decision) {

  document.getElementById("semis").innerText =
    data.semis.toFixed(2);

  document.getElementById("industrial").innerText =
    data.industrial.toFixed(2);

  document.getElementById("nonTech").innerText =
    data.nonTech.toFixed(2);

  document.getElementById("macroIndex").innerText =
    data.macroIndex.toFixed(2);

  document.getElementById("decision").innerText =
    decision;
}

function log(msg) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += msg + "<br>";
  logBox.scrollTop = logBox.scrollHeight;
}
