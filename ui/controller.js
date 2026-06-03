function runSim(type) {

    const output = document.getElementById("output");
    const status = document.getElementById("status");

    // HARD SAFETY CHECK (prevents blank page crashes)
    if (!output || !status) {
        console.log("UI missing elements");
        return;
    }

    // ENGINE CHECK
    if (typeof runSimulation !== "function") {
        status.innerText = "SAFE MODE";
        output.innerHTML = "❌ Engine missing (simulation_engine.js not loaded)";
        return;
    }

    try {

        let scenario = { name: "TEST" };

        // optional scenario injection
        if (type === "cascade") {
            scenario = {
                name: "STRESS TEST",
                oil_price: 105,
                capital_flow: "outflow",
                inflation_pressure: "rising"
            };
        }

        const result = runSimulation(scenario);

        if (!result) throw new Error("Empty simulation result");

        window.lastSimulationResult = result;

        status.innerText = result.final_state || "UNKNOWN";

        status.style.color =
            result.final_state === "GREEN" ? "lime" :
            result.final_state === "AMBER" ? "orange" :
            result.final_state === "RED" ? "red" :
            "white";

        output.innerHTML =
            "<h3>SIMULATION OUTPUT</h3>" +
            "<pre>" + JSON.stringify(result, null, 2) + "</pre>";

    } catch (e) {

        console.error(e);

        status.innerText = "RECOVERY MODE";
        output.innerHTML = "❌ Simulation error → fallback active";
    }
}


// -------------------------
// EXPORT AUDIT (SAFE)
// -------------------------
function exportAudit() {

    if (!window.lastSimulationResult) {
        alert("No simulation data");
        return;
    }

    const report = {
        report_id: "SEXTANT-" + Date.now(),
        timestamp: new Date().toISOString(),
        simulation: window.lastSimulationResult
    };

    const blob = new Blob(
        [JSON.stringify(report, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = report.report_id + ".json";
    a.click();

    URL.revokeObjectURL(url);
}
