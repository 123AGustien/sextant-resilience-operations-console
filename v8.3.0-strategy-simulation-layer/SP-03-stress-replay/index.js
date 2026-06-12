export class SP03StressReplay {

    /**
     * SP-03 Stress Replay Layer
     * Simulates propagation of stress over time (cascade + decay model)
     */

    run(execution) {

        const base = execution.system_state;

        const timeline = this.generateTimeline(base);

        const cascade = this.calculateCascade(base);

        return {
            strategy_id: execution.strategy_id,

            scenario_type: execution.scenario_type,
            stress_level: execution.stress_level,

            cascade_depth: cascade.depth,
            cascade_intensity: cascade.intensity,

            stress_timeline: timeline,

            degradation_index: this.degradationIndex(base),

            timestamp: Date.now()
        };
    }

    /**
     * CASCADE MODEL
     * Converts system state into failure propagation depth
     */
    calculateCascade(state) {

        const risk_factor =
            (1 - state.conf) +
            (1 - state.liq) +
            state.pressure;

        return {
            depth: Math.min(10, Math.floor(risk_factor * 10)),
            intensity: Math.min(1, risk_factor)
        };
    }

    /**
     * TEMPORAL STRESS GENERATION
     * Simulates how system degrades over time steps
     */
    generateTimeline(state) {

        const steps = 5;
        const timeline = [];

        let fx = state.fx;
        let bank = state.bank;
        let liq = state.liq;
        let eq = state.eq;
        let conf = state.conf;

        for (let i = 0; i < steps; i++) {

            const decay = 0.85 - (i * 0.05);

            fx *= decay;
            bank *= decay;
            liq *= decay;
            eq *= decay;
            conf *= decay;

            timeline.push({
                step: i,
                fx,
                bank,
                liq,
                eq,
                conf
            });
        }

        return timeline;
    }

    /**
     * SYSTEM DEGRADATION SCORE
     */
    degradationIndex(state) {

        return (
            (1 - state.conf) * 0.4 +
            (1 - state.liq) * 0.3 +
            (state.fx) * 0.2 +
            (state.pressure) * 0.1
        );
    }
}
