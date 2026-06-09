import { runRP04 } from "../core_engine/rp04-engine-v10.js";

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
