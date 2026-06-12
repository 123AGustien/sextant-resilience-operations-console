import { runRP04 } from "../../../core_engine/rp04-engine-v10.js";

/**
 * SP-02 Scenario Execution Layer
 * Converts SP-01 strategy into deterministic system simulation
 */

export class SP02ScenarioExecution {

    /**
     * MAIN EXECUTION ENTRY
     */
    run(strategy) {

        const mode = this.mapMode(strategy);

        const engine = runRP04(mode);

        const systemState = this.buildSystemState(engine);

        return {
            strategy_id: strategy.strategy_id,

            scenario_type: strategy.scenario_type,
            stress_level: strategy.stress_level,
            execution_mode: strategy.execution_mode,

            system_state: systemState,

            engine_raw: engine,

            timestamp: Date.now()
        };
    }

    /**
     * MAP STRATEGY → RP-04 ENGINE MODE
     */
    mapMode(strategy) {

        if (strategy.execution_mode === "STRESS_TEST_MODE") {
            return "cascade";
        }

        if (strategy.scenario_type === "FX_SHOCK") {
            return "failure";
        }

        if (strategy.stress_level === "HIGH") {
            return "cascade";
        }

        return "normal";
    }

    /**
     * STRUCTURE ENGINE OUTPUT INTO INSTITUTIONAL STATE
     */
    buildSystemState(engine) {

        return {
            fx: engine.system.fx,
            bank: engine.system.bank,
            liq: engine.system.liq,
            eq: engine.system.eq,
            conf: engine.system.conf,

            state: engine.state,

            stability: engine.rp04.stability,
            pressure: engine.rp04.pressure
        };
    }
}
