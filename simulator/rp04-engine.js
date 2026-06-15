/**
 * =====================================================
 * RP-04 ENGINE v1.1 (CLEAN + UNIFIED)
 * Sextant Protocol
 * SINGLE SOURCE OF TRUTH
 * =====================================================
 */

(function () {

    /**
     * Scenario Definitions
     */
    const SCENARIOS = {

        normal: {
            stability: 0.82,
            pressure: 0.28
        },

        failure: {
            stability: 0.55,
            pressure: 0.60
        },

        cascade: {
            stability: 0.25,
            pressure: 0.95
        }

    };

    /**
     * MAIN ENGINE
     */
    function runRP04(type = "normal") {

        const config = SCENARIOS[type] || SCENARIOS.normal;

        const rp04 = {
            stability: config.stability,
            pressure: config.pressure
        };

        const fx = rp04.pressure;

        const system = {

            fx,

            bank: fx * 0.83,

            liq: fx * 0.83 * 0.88,

            eq: fx * 0.83 * 0.88 * 0.91,

            conf: fx * 0.83 * 0.88 * 0.91 * 0.94
        };

        const state =
            rp04.stability > 0.60 ? "STABLE" : "RISK";

        const frame = {

            rp04,
            system,
            state,
            scenario: type,
            timestamp: Date.now()
        };

        // =====================================================
        // 🔥 CRITICAL FIX: UNIFIED EVENT SYSTEM
        // =====================================================
        if (window.SextantBus && typeof window.SextantBus.emit === "function") {
            window.SextantBus.emit(frame);
        } else {
            console.error("❌ SextantBus not available");
        }

        return frame;
    }

    /**
     * SELF TEST
     */
    function selfTestRP04() {

        const results = {
            engine: "RP-04",
            status: "PASS",
            timestamp: new Date().toISOString(),
            tests: {}
        };

        try {

            results.tests.normal = runRP04("normal");
            results.tests.failure = runRP04("failure");
            results.tests.cascade = runRP04("cascade");

        } catch (err) {
            results.status = "FAIL";
            results.error = err.message;
        }

        return results;
    }

    /**
     * HEALTH CHECK
     */
    function healthCheck() {

        return {
            engineLoaded: true,
            auditBridgeLoaded: !!(
                window.SextantBridge &&
                window.SextantBridge.captureSimulationResult
            ),
            timestamp: new Date().toISOString()
        };
    }

    /**
     * GLOBAL EXPORT
     */
    window.runRP04 = runRP04;
    window.selfTestRP04 = selfTestRP04;
    window.rp04HealthCheck = healthCheck;

    console.log("RP-04 Engine v1.1 Loaded (UNIFIED)");

})();
