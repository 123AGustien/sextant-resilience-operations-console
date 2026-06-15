/**
 * Sextant Scenario Trigger Layer v1.1 (STABLE)
 * SINGLE ENTRY POINT FOR COMMAND CENTER
 */

window.runScenario = function (scenario) {

    if (!window.orchestra) {
        console.error("Orchestra not loaded");
        return null;
    }

    // 1. EXECUTE SCENARIO
    const frame = window.orchestra.run(scenario);

    if (!frame) {
        console.error("Scenario failed:", scenario);
        return null;
    }

    // 2. SAFE FALLBACK DATA SOURCES
    const audit = frame.audit || {};
    const sys = frame.system || {};

    // =========================
    // UI UPDATE (ROBUST LAYERED FALLBACK)
    // =========================

    update("riskIndex",
        audit.riskScore ?? (sys.fx * 100).toFixed(2)
    );

    update("impact",
        audit.impact ?? (sys.bank * 100).toFixed(2)
    );

    update("auditStatus",
        audit.status ?? "RUNNING"
    );

    // =========================
    // GLOBAL STATE SYNC
    // =========================
    window.__SEXTANT_FRAME__ = frame;

    console.log("🚀 Scenario executed:", scenario, frame);

    return frame;
};

/* =========================
   SAFE UI UPDATER
========================= */
function update(id, value) {
    const el = document.getElementById(id);
    if (!el) return;

    el.innerText =
        value !== undefined && value !== null
            ? value
            : "--";
}

/* =========================
   BOOT CHECK (OPTIONAL)
========================= */
window.addEventListener("load", () => {
    console.log("🧠 Command Center Ready");

    if (window.selfTestRP04) {
        console.log("🧪 SELF TEST:", selfTestRP04());
    }
});
