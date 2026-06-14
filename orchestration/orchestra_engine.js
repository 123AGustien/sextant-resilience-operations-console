// Optional global audit hook (safe browser mode)
window.auditScenarioResult = window.auditScenarioResult || null;

/**
 * Sextant Orchestra Layer v2
 * Browser-safe control layer above RP-04
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

    runStep(type) {

        // ✅ USE GLOBAL ENGINE (NO IMPORT)
        if (!window.runRP04) {
            throw new Error("RP-04 engine not loaded (window.runRP04 missing)");
        }

        const engine = window.runRP04(type);

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

        this.lastReport = this.generateRiskReport();

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

            riskLevel: this.classifyRisk(latest.conf),

            cascadeDepth: this.timeline.length,

            systemState: latest.state,

            insights: this.generateInsights(latest),

            recommendation: this.generateRecommendations(latest)
        };
    }

    classifyRisk(conf) {
        if (conf > 80) return "🟢 Stable";
        if (conf > 60) return "🟡 Controlled Stress";
        if (conf > 40) return "🟠 Elevated Risk";
        return "🔴 Systemic Instability";
    }

    generateInsights(latest) {
        const insights = [];

        if (latest.liq < 50) insights.push("Liquidity stress detected.");
        if (latest.bank < 50) insights.push("Bank instability detected.");
        if (latest.fx < 50) insights.push("FX volatility elevated.");
        if (this.timeline.length > 3) insights.push("Cascade propagation detected.");
        if (latest.conf < 60) insights.push("Confidence below threshold.");

        return insights;
    }

    generateRecommendations(latest) {
        const recs = [];

        if (latest.liq < 50) recs.push("Increase liquidity buffers.");
        if (latest.bank < 50) recs.push("Add banking redundancy.");
        if (latest.conf < 60) recs.push("Activate circuit breakers.");

        return recs;
    }

    getLastReport() {
        return this.lastReport;
    }

    getTimeline() {
        return this.timeline;
    }
}

// ✅ GLOBAL EXPORT FOR BROWSER
window.orchestra = new SextantOrchestra();
