function runSimulation(scenario) {

    // Step 1: FX model
    const fxResult = simulateUSDIDR(scenario);

    // Step 2: Contagion model
    const systemResult = propagateShock(fxResult);

    // Step 3: Final system interpretation
    const finalState =
        systemResult.systemState === "STABLE" ? "GREEN" :
        systemResult.systemState === "WATCH" ? "AMBER" :
        systemResult.systemState === "STRESS" ? "RED" : "CRITICAL";

    return {
        scenario: scenario.name || "Unnamed Scenario",

        fx: {
            usd_idr: fxResult.usd_idr,
            pressure_score: fxResult.pressure_score,
            regime: fxResult.regime
        },

        system: systemResult,

        final_state: finalState,

        interpretation:
            finalState === "GREEN"
                ? "System stable with manageable macro conditions"
                : finalState === "AMBER"
                ? "Early stress signals detected"
                : finalState === "RED"
                ? "Systemic stress conditions active"
                : "Critical systemic instability detected"
    };
}
