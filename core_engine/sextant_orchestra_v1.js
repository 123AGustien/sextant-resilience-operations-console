/**
 * Sextant Orchestra Layer v1 (BROWSER SAFE)
 * Control layer above RP-04 engine
 * Bridges dashboard ↔ engine with timeline + scenario logic
 */

class SextantOrchestra {

    constructor() {
        this.timeline = [];
        this.scenario = "default";
    }

    /**
     * Load a simulation scenario
     */
    loadScenario(name) {
        this.scenario = name;
        this.timeline = [];
    }

    /**
     * Execute one simulation step via RP-04 engine
     */
    runStep(type) {

        if (!window.runRP04) {
            throw new Error("RP-04 engine not loaded");
        }

        const engine = window.runRP04(type);

        const frame = {
            step: this.timeline.length,
            scenario: this.scenario,
            type,

            rp04: engine.rp04,
            system: engine.system,
            state: engine.state,

            fx: engine.system.fx,
            bank: engine.system.bank,
            liq: engine.system.liq,
            eq: engine.system.eq,
            conf: engine.system.conf,

            timestamp: Date.now()
        };

        this.timeline.push(frame);

        return frame;
    }

    /**
     * Reset simulation history
     */
    reset() {
        this.timeline = [];
    }

    /**
     * Get full simulation timeline
     */
    getTimeline() {
        return this.timeline;
    }

    /**
     * Get latest frame
     */
    getLatest() {
        return this.timeline[this.timeline.length - 1] || null;
    }
}

// expose globally (IMPORTANT for browser dashboards)
window.orchestra = new SextantOrchestra();
