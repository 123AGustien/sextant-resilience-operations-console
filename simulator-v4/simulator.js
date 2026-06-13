/**

* Sextant v4.0 - DIAGNOSTIC LAYER
  */

function runDiagnostics() {

const logBox = document.getElementById("log");
if (!logBox) return;

function report(label, status) {
logBox.innerText += label + ": " + (status ? "OK" : "MISSING") + "\n";
}

logBox.innerText = "=== SEXTANT V4 DIAGNOSTIC START ===\n\n";

report("WORLD", typeof WORLD !== "undefined");
report("CURRENT_WORLD", typeof CURRENT_WORLD !== "undefined");

report("propagateShock", typeof propagateShock === "function");
report("computeGlobalIndex", typeof computeGlobalIndex === "function");
report("computeSystemHealth", typeof computeSystemHealth === "function");

report("applyLens", typeof applyLens === "function");
report("changeLens", typeof changeLens === "function");

report("log()", typeof log === "function");

logBox.innerText += "\n=== END DIAGNOSTIC ===\n";
}

/**

* Logging Helper
  */

function log(message) {

const logBox = document.getElementById("log");

if (!logBox) return;

logBox.innerText += message + "\n";
}

/**

* Sextant v4.0 - Simulator Controller
  */

let CURRENT_WORLD = JSON.parse(JSON.stringify(WORLD));

function runSimulation() {

const view = applyLens(CURRENT_WORLD);

const shock = {
trade: 0.05,
policy: 0.03,
energy: 0.04
};

propagateShock(view, "usa", shock);

const index = computeGlobalIndex(view);
const health = computeSystemHealth(view);

const macroEl = document.getElementById("macroIndex");
const decisionEl = document.getElementById("decision");

if (macroEl) {
macroEl.innerText = index.toFixed(2);
}

if (decisionEl) {
decisionEl.innerText = "System Health: " + health.toFixed(2);
}

log("RUN | Macro Index: " + index.toFixed(2));
}

function resetSimulation() {

CURRENT_WORLD = JSON.parse(JSON.stringify(WORLD));

log("RESET | System restored to baseline");

runSimulation();
}

function changeLensSafe(lens) {

if (typeof changeLens === "function") {
changeLens(lens);
}
}

window.addEventListener("load", function () {
setTimeout(runDiagnostics, 300);
});
