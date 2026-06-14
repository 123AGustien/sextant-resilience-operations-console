/**
 * Sextant Control Room v2 — Unified Simulation Core
 * Merges RP-04 + Export Simulation + Audit Bridge
 */

class SextantControlRoom {

    constructor() {
        this.timeline = [];
        this.activeScenario = null;
    }

    runScenario(type) {

        // ==============================
        // 1. ROUTE TO ENGINE (UNIFIED)
        // ==============================

        let engineResult;

        if (this.isRP04Scenario(type)) {
            engineResult = window.runRP04(type);
        } else {
            engineResult = this.runExportSimulation(type);
        }

        // ==============================
        // 2. BUILD FRAME
        // ==============================

        const frame = {
            scenario: type,
            timestamp: Date.now(),
            engine: engineResult,

            fx: engineResult.system?.fx ?? 0,
            bank: engineResult.system?.bank ?? 0,
            liq: engineResult.system?.liq ?? 0,
            eq: engineResult.system?.eq ?? 0,
            conf: engineResult.system?.conf ?? 0
        };

        // ==============================
        // 3. AUDIT INJECTION (CRITICAL)
        // ==============================

        const audit = window.auditScenarioResult(type, {
            riskScore: frame.conf,
            impact: frame.bank + frame.fx,
            stability: frame.liq
        });

        frame.audit = audit;

        // ==============================
        // 4. STORE TIMELINE
        // ==============================

        this.timeline.push(frame);

        // ==============================
        // 5. RETURN FRAME
        // ==============================

        return frame;
    }

    // =========================================
    // ENGINE ROUTING LOGIC
    // =========================================

    isRP04Scenario(type) {
        return [
            "us_china_trade",
            "taiwan_crisis",
            "semiconductor_shock",
            "energy_crisis",
            "global_recession"
        ].includes(type);
    }

    runExportSimulation(type) {

        if (!window.runExportSimulation) {
            return this.mockExport(type);
        }

        return window.runExportSimulation(type);
    }

    mockExport(type) {
        return {
            state: "MOCK_EXPORT",
            system: {
                fx: 50,
                bank: 50,
                liq: 50,
                eq: 50,
                conf: 50
            },
            meta: { type }
        };
    }

    getTimeline() {
        return this.timeline;
    }
}

// ==============================
// GLOBAL EXPORT
// ==============================

window.SextantControlRoom = new SextantControlRoom();
