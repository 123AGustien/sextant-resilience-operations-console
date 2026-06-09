/**
 * Sextant Simulation Boot v12
 * FINAL STABLE SYSTEM INITIALIZER
 */

(function () {

    function boot() {

        // -------------------------
        // HARD SAFETY CHECKS
        // -------------------------
        if (!window.runRP04) {
            console.error("[BOOT v12] RP-04 engine missing");
            return;
        }

        if (!window.SextantOrchestra) {
            console.error("[BOOT v12] Orchestra missing");
            return;
        }

        // -------------------------
        // INIT ORCHESTRA
        // -------------------------
        if (!window.orchestra) {
            window.orchestra = new SextantOrchestra();
        }

        // -------------------------
        // INIT REASONING (SAFE)
        // -------------------------
        if (window.SextantReasoning) {
            window.reasoning = new SextantReasoning(window.orchestra);
        }

        // -------------------------
        // INIT INTELLIGENCE (SAFE LATE BIND)
        // -------------------------
        if (window.SextantIntelligence && window.reasoning) {
            window.ai = new SextantIntelligence(window.orchestra, window.reasoning);
        }

        // -------------------------
        // FINAL STATUS
        // -------------------------
        console.log("SEXTANT v12 RUNTIME: STABLE ONLINE");
    }

    // expose
    window.SextantBoot = { boot };

})();
