function runSim(type) {

    const output = document.getElementById("output");
    const status = document.getElementById("status");

    if (!output || !status) return;

    if (typeof runSimulation !== "function") {
        status.innerText = "SAFE MODE";
        output.innerHTML = "Engine missing";
        return;
    }

    const result = runSimulation({
        name: "TEST"
    });

    window.lastSimulationResult = result;

    status.innerText = result.final_state || "UNKNOWN";

    output.innerHTML =
        "<pre>" + JSON.stringify(result, null, 2) + "</pre>";
}

function exportAudit() {
    if (!window.lastSimulationResult) return;

    const blob = new Blob(
        [JSON.stringify(window.lastSimulationResult, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "audit.json";
    a.click();

    URL.revokeObjectURL(url);
}
