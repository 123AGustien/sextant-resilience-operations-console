/**
 * Sextant Simulator App Controller
 * Connects UI → Engine
 */

function runSimulation(type) {
    if (!window.runEngine) return;

    const frame = window.runEngine(type);

    updateUI(frame);
}

function resetSimulation() {

    const fields = ["exportIndex", "electronics", "nonTech", "shock"];

    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = "--";
    });
}

function updateUI(frame) {

    if (!frame) return;

    const exportIndex = document.getElementById("exportIndex");
    if (exportIndex) exportIndex.innerText = frame.system?.fx ?? 0;

    const electronics = document.getElementById("electronics");
    if (electronics) electronics.innerText = frame.system?.liq ?? 0;

    const nonTech = document.getElementById("nonTech");
    if (nonTech) nonTech.innerText = frame.system?.bank ?? 0;

    const shock = document.getElementById("shock");
    if (shock) shock.innerText = frame.state ?? "NONE";
}

/* expose */
window.runSimulation = runSimulation;
window.resetSimulation = resetSimulation;
