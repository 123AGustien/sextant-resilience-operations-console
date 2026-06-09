import { runRP04 } from "../core_engine/rp04-engine-v10.js";

/**
 * Sextant Orchestra Layer v1
 * Control layer above RP-04 engine
 */

class SextantOrchestra {

    constructor() {
        this.timeline = [];
        this.scenario = "default";
    }

    loadScenario(name) {
        this.scenario = name;
        this.timeline = [];
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
        return frame;
    }

    reset() {
        this.timeline = [];
    }
}

export const orchestra = new SextantOrchestra();
