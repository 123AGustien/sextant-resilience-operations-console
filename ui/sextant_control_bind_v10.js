/**
 * Sextant Control Bind v10
 * FINAL INTEGRATION LAYER
 *
 * Wires together:
 * - RP-04 Engine
 * - Orchestra Layer
 * - Reasoning Layer
 * - Dashboard UI
 */

(function () {

    /**
     * SYSTEM BOOT
     */
    function initSextantSystem() {

        if (!window.runRP04) {
            console.error("RP-04 engine missing");
            return;
        }

        if (!window.orchestra) {
            console.error("Orchestra layer missing");
            return;
        }

        if (!window.SextantReasoning) {
            console.error("Reasoning layer missing");
            return;
        }

        // attach reasoning layer on top of orchestra
        window.reasoning = new SextantReasoning(window.orchestra);

        console.log("Sextant System v10: FULLY WIRED");
    }

    /**
     * RUN FULL PIPELINE (ENGINE → ORCHESTRA → REASONING → UI)
     */
    function runFullSimulation(type) {

        const frame = window.orchestra.runStep(type);

        // update UI nodes if they exist
        if (typeof window.setNode === "function") {
            window.setNode("rp04", frame.rp04.stability);
            window.setNode("fx", frame.fx);
            window.setNode("bank", frame.bank);
            window.setNode("liq", frame.liq);
            window.setNode("eq", frame.eq);
            window.setNode("conf", frame.conf);
        }

        // update status
        const status = document.getElementById("status");
        if (status) status.innerText = frame.state;

        // update output
        const output = document.getElementById("output");
        if (output) {
            output.innerText = JSON.stringify(frame, null, 2);
        }

        return frame;
    }

    /**
     * RUN REASONING EXPLANATION
     */
    function runReasoning() {

        if (!window.reasoning) return;

        const result = window.reasoning.explainLatest();

        const output = document.getElementById("output");

        if (output) {
            output.innerText = JSON.stringify(result, null, 2);
        }
    }

    /**
     * RESET FULL SYSTEM
     */
    function resetSystem() {

        if (window.orchestra) {
            window.orchestra.reset();
        }

        const output = document.getElementById("output");
        if (output) output.innerText = "RESET";

        const status = document.getElementById("status");
        if (status) status.innerText = "RESET";

        console.log("Sextant System Reset");
    }

    /**
     * EXPOSE GLOBAL API
     */
    window.SextantSystem = {
        init: initSextantSystem,
        run: runFullSimulation,
        explain: runReasoning,
        reset: resetSystem
    };

})();
