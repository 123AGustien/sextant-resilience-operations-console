/**
 * Sextant Simulator v4 — Orchestration Layer
 * CONNECTS:
 * UI → RP-04 → Audit → Dashboard
 */

class SextantOrchestra {

    constructor() {
        this.timeline = [];
        this.scenario = "default";
        this.lastReport = null;
    }

    loadScenario(name) {
        this.scenario = name;
        this.timeline = [];
        this.lastReport = null;
    }

    /**
     * MAIN EXECUTION PIPELINE
     * UI calls this function
     */
    runStep(type) {

        // -----------------------------------
        // STEP 1: RUN ENGINE
        // -----------------------------------
        if (!window.runRP04) {
            throw new Error("RP-04 engine not loaded");
        }

        const engine = window.runRP04(type);

        // -----------------------------------
        // STEP 2: BUILD FRAME
        // -----------------------------------
        let frame = {
            step: this.timeline.length,
            scenario: this.scenario,
            type,

            fx: engine.system.fx,
            bank: engine.system.bank,
            liq: engine.system.liq,
            eq: engine.system.eq,
            conf: engine.system.conf,

            state: engine.state,
            meta: engine.meta,
            timestamp: Date.now()
        };

        // -----------------------------------
        // STEP 3: AUDIT INTEGRATION (CRITICAL)
        // -----------------------------------
        if (window.auditScenarioResult) {
            frame.audit = window.auditScenarioResult(
                type,
                {
                    riskScore: engine.system.fx,
                    impact: engine.system.bank,
                    stability: engine.system.conf
                }
            );
        } else {
            frame.audit = {
                scenario: type,
                riskScore: 0,
                impact: 0,
                stability: 0,
                grade: "NO_AUDIT",
                status: "DISCONNECTED"
            };
        }

        // -----------------------------------
        // STEP 4: STORE TIMELINE
        // -----------------------------------
        this.timeline.push(frame);

        // -----------------------------------
        // STEP 5: GENERATE REPORT
        // -----------------------------------
        this.lastReport = this.generateRiskReport();

        // -----------------------------------
        // STEP 6: UPDATE UI (HOOK)
        // -----------------------------------
        if (typeof window.updateDashboard === "function") {
            window.updateDashboard(frame);
        }

        return frame;
    }

    reset() {
        this.timeline = [];
        this.lastReport = null;
    }

    generateRiskReport() {

        if (this.timeline.length === 0) return null;

        const latest = this.timeline[this.timeline.length - 1];

        return {
            title: "Sextant Protocol Risk Report",
            scenario: this.scenario,
            timestamp: Date.now(),

            summary: {
                fx: latest.fx,
                bank: latest.bank,
                liquidity: latest.liq,
                equity: latest.eq,
                confidence: latest.conf
            },

            riskLevel: latest.audit?.status || "UNKNOWN",

            grade: latest.audit?.grade || "NO_GRADE",

            cascadeDepth: this.timeline.length,

            systemState: latest.state
        };
    }

    getLastReport() {
        return this.lastReport;
    }

    getTimeline() {
        return this.timeline;
    }
}

// -----------------------------------
// GLOBAL EXPORT
// -----------------------------------
window.orchestra = new SextantOrchestra();
