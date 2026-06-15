/**
 * =====================================================
 * Sextant Orchestra Engine v1.0 (CLEAN + UNIFIED)
 * SINGLE CONTROL LAYER FOR ALL SCENARIOS
 * =====================================================
 */

(function () {

    function Orchestra() {

        this.timeline = [];
        this.lastFrame = null;
        this.currentScenario = null;

        /**
         * RUN SINGLE SCENARIO
         */
        this.run = (scenario) => {

            try {

                console.log("🎼 Orchestra running scenario:", scenario);

                // 1. CHECK RP-04 ENGINE
                if (typeof window.runRP04 !== "function") {
                    console.error("❌ RP-04 engine not found (runRP04 missing)");
                    return null;
                }

                // 2. EXECUTE SIMULATION
                const frame = window.runRP04(scenario);

                if (!frame) {
                    console.error("❌ Engine returned empty frame");
                    return null;
                }

                // 3. SAFE AUDIT PIPELINE (optional)
                if (window.SextantBridge?.captureSimulationResult) {
                    try {
                        frame.audit =
                            window.SextantBridge.captureSimulationResult(frame);
                    } catch (err) {
                        console.error("⚠️ Audit bridge failed:", err);
                    }
                }

                // 4. STORE STATE
                this.timeline.push(frame);
                this.lastFrame = frame;
                this.currentScenario = scenario;

                // 5. GLOBAL STATE SYNC
                window.__SEXTANT_FRAME__ = frame;

                // 6. 🔥 CRITICAL FIX: UNIFIED EVENT BUS EMISSION
                if (window.SextantBus && typeof window.SextantBus.emit === "function") {
                    window.SextantBus.emit(frame);
                } else {
                    console.error("❌ SextantBus not available");
                }

                console.log("✅ Frame produced:", frame);

                return frame;

            } catch (err) {
                console.error("❌ Orchestra runtime error:", err);
                return null;
            }
        };

        /**
         * RUN FULL SCENARIO SEQUENCE
         */
        this.runAll = () => {

            const scenarios = [
                "US–China Trade Escalation",
                "Taiwan Strait Crisis",
                "Semiconductor Supply Shock",
                "Energy Market Disruption",
                "Global Recession"
            ];

            const results = [];

            for (const s of scenarios) {
                const frame = this.run(s);
                if (frame) results.push(frame);
            }

            return {
                type: "sequence",
                frames: results,
                count: results.length
            };
        };

        /**
         * RESET SYSTEM STATE
         */
        this.reset = () => {
            this.timeline = [];
            this.lastFrame = null;
            this.currentScenario = null;

            console.log("🔄 Orchestra reset complete");
        };

        /**
         * GET SYSTEM STATE
         */
        this.getState = () => ({
            currentScenario: this.currentScenario,
            timelineLength: this.timeline.length,
            lastFrame: this.lastFrame
        });
    }

    // GLOBAL INSTANCE
    window.orchestra = new Orchestra();

    console.log("🎼 Sextant Orchestra Engine v1.0 loaded");

})();
