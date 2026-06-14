/**
 * Sextant Simulator v4 — RP-04 Engine Bridge
 * This file connects simulator-v4 → RP-04 core engine
 *
 * MUST expose:
 * window.runRP04(type)
 */

/**
 * SAFE GLOBAL ENGINE WRAPPER
 * Prevents UI crash if RP-04 is missing
 */
(function () {

    /**
     * MAIN ENTRY POINT
     * Called by:
     * orchestra.runStep(type)
     */
    function runRP04(type) {

        // -----------------------------------
        // SAFETY CHECK: RP-04 must exist
        // -----------------------------------
        if (!window.RP04Engine) {
            console.warn("⚠️ RP-04Engine not found. Using fallback mock engine.");

            return createMockEngine(type);
        }

        // -----------------------------------
        // CALL REAL ENGINE
        // -----------------------------------
        const engine = window.RP04Engine.run(type);

        // Normalize structure (IMPORTANT for audit_bridge.js)
        return normalizeEngine(engine, type);
    }

    /**
     * NORMALISE ENGINE OUTPUT
     * Ensures audit layer NEVER breaks
     */
    function normalizeEngine(engine, type) {

        return {
            state: engine.state || "UNKNOWN",

            system: {
                fx: engine.system?.fx ?? 0,
                bank: engine.system?.bank ?? 0,
                liq: engine.system?.liq ?? 0,
                eq: engine.system?.eq ?? 0,
                conf: engine.system?.conf ?? 0
            },

            meta: {
                type: type,
                timestamp: Date.now()
            }
        };
    }

    /**
     * MOCK ENGINE (SAFE FALLBACK)
     * Used if RP-04 is not loaded yet
     */
    function createMockEngine(type) {

        return {
            state: "MOCK_MODE",

            system: {
                fx: 50,
                bank: 50,
                liq: 50,
                eq: 50,
                conf: 50
            },

            meta: {
                type: type,
                timestamp: Date.now(),
                warning: "RP-04 missing"
            }
        };
    }

    /**
     * GLOBAL EXPORT
     * THIS is what orchestra calls
     */
    window.runRP04 = runRP04;

})();
