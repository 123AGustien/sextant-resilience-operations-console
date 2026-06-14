/**
 * Sextant Simulator v3 — Controller Layer (RESTORED)
 * Step 2: Safe wiring into SextantRun pipeline
 */

/**
 * MAIN SIMULATION ENTRY POINT
 */
function runSimulation(type) {

    // Single safe pipeline entry
    const result = window.SextantRun(type, {
        onUpdate: updateUI
    });

    updateUI(result);
}

/**
 * RESET UI
 */
function resetSimulation() {

    const fields = [
        "exportIndex",
        "electronics",
        "nonTech",
        "shock"
    ];

    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = "--";
    });
}

/**
 * UI UPDATE FUNCTION
 */
function updateUI(frame) {

    if (!frame) return;

    // Export Index
    const exportIndex = document.getElementById("exportIndex");
    if (exportIndex) {
        exportIndex.innerText = frame.audit?.riskScore ?? 0;
    }

    // Electronics
    const electronics = document.getElementById("electronics");
    if (electronics) {
        electronics.innerText = frame.audit?.impact ?? 0;
    }

    // Non-Tech
    const nonTech = document.getElementById("nonTech");
    if (nonTech) {
        electronics.innerText = frame.system?.liq ?? 0;
    }

    // Shock Level
    const shock = document.getElementById("shock");
    if (shock) {
        shock.innerText = frame.audit?.grade ?? "NONE";
    }
}
