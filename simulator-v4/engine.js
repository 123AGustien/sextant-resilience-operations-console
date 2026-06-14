/**
 * Sextant Simulator v4 — RP-04 Engine Bridge
 * This file connects simulator-v4 → RP-04 core engine
 *
 * MUST expose:
 * window.runRP04(type)
 */

(function () {

    /**
     * MAIN ENTRY POINT
     * Called by:
     * orchestra.runStep(type)
     */
    function runRP04(type) {

        let engine;

        // -----------------------------------
        // SAFETY CHECK: RP-04 must exist
        // -----------------------------------
        if (!window.RP04Engine) {
            console.warn("⚠️ RP-04Engine not found. Using fallback mock engine.");
            engine = createMockEngine(type);
        } else {
            engine = window.RP04Engine.run(type);
            engine = normalizeEngine(engine, type);
        }

        console.log("🧪 RP-04 RUN:", type, engine);

        return engine;
    }

    /**
     * NORMALISE ENGINE OUTPUT
     * Ensures audit + UI NEVER break
     */
    function normalizeEngine(engine, type) {

        return {
            state: engine?.state || "UNKNOWN",

            system: {
                fx: engine?.system?.fx ?? 0,
                bank: engine?.system?.bank ?? 0,
                liq: engine?.system?.liq ?? 0,
                eq: engine?.system?.eq ?? 0,
                conf: engine?.system?.conf ?? 0
            },

            meta: {
                type: type,
                timestamp: Date.now()
            },

            // 🧠 AUDIT COMPATIBILITY LAYER
            audit: {
                ready: true,
                version: "v4-bridge"
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
            },

            audit: {
                ready: false,
                version: "mock"
            }
        };
    }

    /**
     * GLOBAL EXPORT
     * This is what orchestra calls
     */
    window.runRP04 = runRP04;

})();
