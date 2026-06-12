export class SP01StrategyDefinition {

    /**
     * SP-01
     * Converts SP-00 output into structured institutional strategy model
     */

    build(sp00) {

        return {
            strategy_id: this.generateStrategyId(),

            base_request: sp00.strategy_request,

            scenario_type: sp00.scenario_type,
            stress_level: sp00.stress_level,
            intent: sp00.intent,

            risk_profile: this.mapRiskProfile(sp00),

            exposure_model: this.buildExposureModel(sp00),

            execution_mode: this.mapExecutionMode(sp00),

            timestamp: Date.now()
        };
    }

    /**
     * STRATEGY ID GENERATION
     */
    generateStrategyId() {

        return "STRAT-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    }

    /**
     * RISK PROFILE MAPPING
     * Converts SP-00 classification into institutional risk framing
     */
    mapRiskProfile(sp00) {

        if (sp00.scenario_type === "FX_SHOCK") return "MARKET_RISK_HIGH";
        if (sp00.scenario_type === "CURRENCY_DEPRECIATION") return "CURRENCY_RISK_HIGH";
        if (sp00.scenario_type === "LIQUIDITY_CONTRACTION") return "LIQUIDITY_RISK_MEDIUM";
        if (sp00.scenario_type === "VOLATILITY_SPIKE") return "MARKET_RISK_MEDIUM";

        return "GENERAL_RISK_LOW";
    }

    /**
     * EXPOSURE MODEL BUILDER
     * Defines system sensitivity profile
     */
    buildExposureModel(sp00) {

        return {
            market_exposure:
                sp00.scenario_type === "FX_SHOCK" ? 0.9 : 0.4,

            liquidity_exposure:
                sp00.scenario_type === "LIQUIDITY_CONTRACTION" ? 0.9 : 0.3,

            volatility_exposure:
                sp00.scenario_type === "VOLATILITY_SPIKE" ? 0.9 : 0.5,

            systemic_exposure:
                sp00.stress_level === "HIGH" ? 0.9 : 0.4
        };
    }

    /**
     * EXECUTION MODE SELECTION
     */
    mapExecutionMode(sp00) {

        if (sp00.stress_level === "HIGH") return "STRESS_TEST_MODE";
        if (sp00.stress_level === "MEDIUM") return "SIMULATION_MODE";

        return "BASELINE_MODE";
    }
}
