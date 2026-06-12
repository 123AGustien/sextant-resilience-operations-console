import { runRP04 } from "../core_engine/rp04-engine-v10.js";

/**
 * Sextant Orchestra Layer v2
 * Control + Risk Report Generation Layer above RP-04 engine
 */

class SextantOrchestra {

    constructor() {
        this.timeline = [];
        this.scenario = "default";

        // 📊 latest generated risk report
        this.lastReport = null;
    }

    loadScenario(name) {
        this.scenario = name;
        this.timeline = [];
        this.lastReport = null;
    }

    runStep(type) {

        const engine = runRP04(type);

        const frame = {
            step: this.timeline.length,
            scenario: this.scenario,
            type,
            engine,

            fx: engine.system.fx,
            bank: engine.system.bank,
            liq: engine.system.liq,
            eq: engine.system.eq,
            conf: engine.system.conf,

            state: engine.state,
            timestamp: Date.now()
        };

        this.timeline.push(frame);

        // 🔥 AUTO-GENERATE REPORT AFTER EACH STEP
        this.lastReport = this.generateRiskReport();

        return frame;
    }

    reset() {
        this.timeline = [];
        this.lastReport = null;
    }

    /**
     * 📊 MAIN RISK REPORT GENERATOR
     */
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

            riskLevel: this.classifyRisk(latest.conf),

            cascadeDepth: this.timeline.length,

            systemState: latest.state,

            insights: this.generateInsights(latest),

            recommendation: this.generateRecommendations(latest)
        };
    }

    /**
     * ⚖️ RISK CLASSIFICATION ENGINE
     */
    classifyRisk(conf) {

        if (conf > 80) return "🟢 Stable";
        if (conf > 60) return "🟡 Controlled Stress";
        if (conf > 40) return "🟠 Elevated Risk";
        return "🔴 Systemic Instability";
    }

    /**
     * 💡 INSIGHTS ENGINE
     */
    generateInsights(latest) {

        const insights = [];

        if (latest.liq < 50) {
            insights.push("Liquidity stress is propagating across system layers.");
        }

        if (latest.bank < 50) {
            insights.push("Bank subsystem instability detected under current scenario.");
        }

        if (latest.fx < 50) {
            insights.push("FX volatility contributing to systemic pressure amplification.");
        }

        if (this.timeline.length > 3) {
            insights.push("Multi-step cascade propagation detected across dependency layers.");
        }

        if (latest.conf < 60) {
            insights.push("System confidence below operational threshold.");
        }

        return insights;
    }

    /**
     * 📌 RECOMMENDATION ENGINE (BANK-STYLE OUTPUT)
     */
    generateRecommendations(latest) {

        const recs = [];

        if (latest.liq < 50) {
            recs.push("Increase liquidity buffer thresholds and reserve stability mechanisms.");
        }

        if (latest.bank < 50) {
            recs.push("Introduce subsystem redundancy in banking/settlement layer.");
        }

        if (latest.conf < 60) {
            recs.push("Activate circuit-breaker logic for systemic stress containment.");
        }

        return recs;
    }

    /**
     * 📤 GET CURRENT REPORT (FOR UI OR EXPORT)
     */
    getLastReport() {
        return this.lastReport;
    }

    /**
     * 📊 GET FULL TIMELINE (FOR DEBUG / VISUALIZATION)
     */
    getTimeline() {
        return this.timeline;
    }
}

export const orchestra = new SextantOrchestra();
