/**
 * Sextant Simulator - App Controller
 * v1.1.0-simulator-app
 */

let currentScenario = SCENARIOS.baseline;

window.onload = function () {

  const select = document.getElementById("scenarioSelect");

  for (let key in SCENARIOS) {
    const opt = document.createElement("option");
    opt.value = key;
    opt.text = SCENARIOS[key].name;
    select.appendChild(opt);
  }

  select.onchange = (e) => {
    currentScenario = SCENARIOS[e.target.value];
    log("Scenario selected: " + currentScenario.name);
  };

  updateUI();
};

function runSimulation() {
  const result = runStep(currentScenario);
  updateUI(result);
}

function resetSimulation() {
  resetState();
  updateUI(state);
  log("System reset");
}

function updateUI(data = state) {

  document.getElementById("exportIndex").innerText =
    data.exportIndex.toFixed(2);

  document.getElementById("electronics").innerText =
    data.electronics.toFixed(2);

  document.getElementById("nonTech").innerText =
    data.nonTech.toFixed(2);

  document.getElementById("shock").innerText =
    data.shock.toFixed(2);
}

function log(msg) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += msg + "<br>";
  logBox.scrollTop = logBox.scrollHeight;
}
