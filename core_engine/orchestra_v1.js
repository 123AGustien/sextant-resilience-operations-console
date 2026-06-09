/**
 * Sextant Orchestra Layer v1
 * Sits ABOVE RP-04 engine
 * Controls timeline + scenario execution
 */

function SextantOrchestra() {

    this.timeline = [];
    this.scenario = "default";

    /**
     * Load scenario context
     */
    this.loadScenario = function(name) {
        this.scenario = name;
        this.timeline = [];
    };

    /**
     * Run one simulation step via RP-04 engine
     * (expects runRP04 already available globally)
     */
    this.runStep = function(type) {

        if (!window.runRP04) {
            throw new Error("RP-04 engine not loaded");
        }

        const engine = window.runRP04(type);

        const frame = {
            step: this.timeline.length,
            scenario: this.scenario,
            type: type,

            engine: engine,

            fx: engine.system.fx,
            bank: engine.system.bank,
            liq: engine.system.liq,
            eq: engine.system.eq,
            conf: engine.system.conf,

            state: engine.state,
            timestamp: Date.now()
        };

        this.timeline.push(frame);
        return frame;
    };

    /**
     * Get full simulation history
     */
    this.getTimeline = function() {
        return this.timeline;
    };

    /**
     * Reset simulation state
     */
    this.reset = function() {
        this.timeline = [];
    };
}

/**
 * GLOBAL INSTANCE (IMPORTANT for HTML wiring)
 */
window.orchestra = new SextantOrchestra();
