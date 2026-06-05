let autoLoop = null;

/* -------------------------
   STATE STORAGE
------------------------- */
function saveState(data) {
    localStorage.setItem("SEXTANT_STATE", JSON.stringify(data));
}

function loadState() {
    return JSON.parse(localStorage.getItem("SEXTANT_STATE") || "null");
}

/* -------------------------
   MAIN SIMULATION ENGINE
------------------------- */
function run(type) {

    const status = document.getElementById("status");
    const output = document.getElementById("output");

    let scenario = {
        type: type,
        stress: 0
    };

    if (type === "failure") scenario.stress = 0.6;
    if (type === "cascade") scenario.stress = 0.9;

    const result = simulate(scenario);

    saveState(result);

    status.innerText = result.state;
    status.className = "status " + result.state.toLowerCase();

    output.innerHTML = "<pre>" + JSON.stringify(result, null, 2) + "</pre>";
}

/* -------------------------
   SIMPLE SIMULATION CORE
   (safe lightweight version)
------------------------- */
function simulate(scenario) {

    let base = 100;

    let impact = base - (scenario.stress * 60);

    let state = "GREEN";

    if (impact < 70) state = "AMBER";
    if (impact < 50) state = "RED";

    return {
        input: scenario,
        impact: impact,
        state: state,
        timestamp: Date.now()
    };
}

/* -------------------------
   AUTO LOOP (SAFE)
------------------------- */
function startAuto() {
    if (autoLoop) return;

    autoLoop = setInterval(() => {
        run("cascade");
    }, 4000);
}

function stopAuto() {
    clearInterval(autoLoop);
    autoLoop = null;
}

/* -------------------------
   RESTORE STATE
------------------------- */
window.onload = function () {
    const saved = loadState();

    if (saved) {
        document.getElementById("output").innerHTML =
            "<pre>" + JSON.stringify(saved, null, 2) + "</pre>";

        document.getElementById("status").innerText =
            saved.state || "GREEN";
    }
};
