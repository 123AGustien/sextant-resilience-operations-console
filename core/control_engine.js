/* =========================================================
   SEXTANT CONTROL ROOM CORE ENGINE v1 (STABLE)
========================================================= */

let autoLoop = null;

/* -------------------------
   STATE STORAGE (SAFE)
------------------------- */
function saveState(data) {
    try {
        localStorage.setItem("SEXTANT_STATE", JSON.stringify(data));
    } catch (e) {
        console.warn("Storage failed:", e);
    }
}

function loadState() {
    try {
        return JSON.parse(localStorage.getItem("SEXTANT_STATE") || "null");
    } catch (e) {
        return null;
    }
}

/* -------------------------
   MAIN RUN FUNCTION
------------------------- */
function run(type) {

    const status = document.getElementById("status");
    const output = document.getElementById("output");

    if (!status || !output) return;

    const scenario = {
        type,
        stress: type === "cascade" ? 0.9 :
                type === "failure" ? 0.6 : 0
    };

    const result = simulate(scenario);

    saveState(result);

    // UI STATE UPDATE
    status.innerText = result.state || "GREEN";
    status.className = "status " + (result.state || "green").toLowerCase();

    output.innerHTML = "<pre>" + JSON.stringify(result, null, 2) + "</pre>";

    // 🔥 GRAPH HOOK (IMPORTANT)
    if (window.RiskGraph && typeof window.RiskGraph.push === "function") {
        window.RiskGraph.push(result);
    }
}

/* -------------------------
   SIMULATION CORE (STABLE)
------------------------- */
function simulate(scenario) {

    const stress = scenario.stress ?? 0;

    let impact = 100 - (stress * 60);

    let state = "GREEN";

    if (impact < 70) state = "AMBER";
    if (impact < 50) state = "RED";

    return {
        input: scenario,
        impact: Math.max(0, Math.min(100, impact)),
        state,
        timestamp: Date.now()
    };
}

/* -------------------------
   AUTO LOOP (SAFE GUARD)
------------------------- */
function startAuto() {
    if (autoLoop) return;

    autoLoop = setInterval(() => {
        run("cascade");
    }, 4000);
}

function stopAuto() {
    if (!autoLoop) return;
    clearInterval(autoLoop);
    autoLoop = null;
}

/* -------------------------
   RESTORE STATE (MOBILE SAFE)
------------------------- */
window.addEventListener("load", () => {

    const saved = loadState();
    if (!saved) return;

    const output = document.getElementById("output");
    const status = document.getElementById("status");

    if (output) {
        output.innerHTML = "<pre>" + JSON.stringify(saved, null, 2) + "</pre>";
    }

    if (status) {
        status.innerText = saved.state || "GREEN";
        status.className = "status " + (saved.state || "green").toLowerCase();
    }

    // restore graph feed
    if (window.RiskGraph && saved) {
        window.RiskGraph.push(saved);
    }
});
