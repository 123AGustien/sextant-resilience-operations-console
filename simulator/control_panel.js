/**
 * Sextant Control Panel v1.0
 * COMMAND LAYER — UI → ORCHESTRA
 */

window.SextantControlPanel = {

    /* =========================
       RUN SINGLE SCENARIO
    ========================= */
    runScenario(scenario) {

        if (!window.orchestra) {
            console.error("Orchestra not loaded");
            return;
        }

        const frame = window.orchestra.run(scenario);

        this.render(frame);
    },

    /* =========================
       RUN FULL SYSTEM TEST
    ========================= */
    runFullSequence() {

        if (!window.orchestra) {
            console.error("Orchestra not loaded");
            return;
        }

        const result = window.orchestra.runAll();

        console.log("🚀 FULL SEQUENCE:", result);

        this.renderSequence(result);
    },

    /* =========================
       RESET SYSTEM
    ========================= */
    resetSystem() {

        window.orchestra?.reset();

        const auditLog = document.getElementById("auditLog");
        if (auditLog) auditLog.innerText = "Awaiting audit...";

        console.log("🔄 System reset complete");
    },

    /* =========================
       RENDER SINGLE FRAME
    ========================= */
    render(frame) {

        if (!frame) return;

        // UI update hook
        window.updateUI?.(frame);

        // Audit display
        const auditLog = document.getElementById("auditLog");

        if (auditLog && frame.audit) {
            auditLog.innerText =
                JSON.stringify(frame.audit, null, 2);
        }

        // Global sync
        window.__SEXTANT_FRAME__ = frame;
    },

    /* =========================
       RENDER SEQUENCE
    ========================= */
    renderSequence(result) {

        const auditLog = document.getElementById("auditLog");

        if (auditLog) {
            auditLog.innerText =
                JSON.stringify(result, null, 2);
        }

        window.__SEXTANT_SEQUENCE__ = result;
    }
};
