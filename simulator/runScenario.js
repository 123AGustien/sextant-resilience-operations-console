/**
 * Sextant Scenario Trigger Layer v1.0
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

    // 2. EXTRACT AUDIT
    const audit = frame.audit || {};

    // 3. UPDATE DASHBOARD (SAFE DOM BINDING)
    update("riskIndex", audit.riskScore);
    update("impact", audit.impact);
    update("auditStatus", audit.status);

    // 4. GLOBAL STATE SYNC
    window.__SEXTANT_FRAME__ = frame;

    console.log("🚀 Scenario executed:", scenario);

    return frame;
};

/* =========================
   SAFE UI UPDATER
========================= */
function update(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value ?? "--";
}
