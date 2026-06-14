/**
 * Sextant Orchestra Layer v2.1 — Bridge Native Clean
 */

window.auditScenarioResult = window.auditScenarioResult || function () {
    return {
        scenario: "audit_not_loaded",
        riskScore: 0,
        impact: 0,
        stability: 0,
        grade: "NO_AUDIT",
        status: "DISCONNECTED"
    };
};

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

        if (!window.runRP04) {
            throw new Error("RP-04 engine not loaded (window.runRP04 missing)");
        }

        const engine = window.runRP04(type);

        // ✅ STANDARD FRAME (MATCHS BRIDGE EXACTLY)
        const frame = {
            rp04: engine.rp04,
            system: engine.system,
            state: engine.state,
            scenario: type,
            timestamp: Date.now()
        };

        // ================================
        // ✅ AUDIT (FIXED: FULL FRAME INPUT)
        // ================================
        const audit = window.auditScenarioResult(type, frame);

        frame.audit = audit;

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
                fx: latest.system.fx,
                bank: latest.system.bank,
                liquidity: latest.system.liq,
                equity: latest.system.eq,
                confidence: latest.system.conf
            },

            riskLevel: this.classifyRisk(latest.system.conf),
            cascadeDepth: this.timeline.length,
            systemState: latest.state,

            audit: latest.audit,
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
        const s = latest.system;
        const insights = [];

        if (s.liq < 0.5) insights.push("Liquidity stress detected.");
        if (s.bank < 0.5) insights.push("Bank instability detected.");
        if (s.fx < 0.5) insights.push("FX volatility elevated.");
        if (this.timeline.length > 3) insights.push("Cascade propagation detected.");
        if (s.conf < 0.6) insights.push("Confidence below threshold.");

        return insights;
    }

    generateRecommendations(latest) {
        const s = latest.system;
        const recs = [];

        if (s.liq < 0.5) recs.push("Increase liquidity buffers.");
        if (s.bank < 0.5) recs.push("Add banking redundancy.");
        if (s.conf < 0.6) recs.push("Activate circuit breakers.");

        return recs;
    }

    getLastReport() {
        return this.lastReport;
    }

    getTimeline() {
        return this.timeline;
    }
}

// GLOBAL EXPORT
window.orchestra = new SextantOrchestra();
