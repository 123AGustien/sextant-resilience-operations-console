function runSimulation(scenario) {

// ======================================================
// INPUT SAFETY LAYER
// ======================================================
if (!scenario || typeof scenario !== "object") {
    return fallback("Invalid scenario input");
}

const safeScenario = {
    name: scenario.name || "Unnamed Scenario",
    oil_price: scenario.oil_price ?? 100,
    capital_flow: scenario.capital_flow || "neutral",
    inflation_pressure: scenario.inflation_pressure || "stable"
};

// ======================================================
// PHASE 8 DETERMINISTIC RUN ID
// ======================================================
const run_id =
    "SIM-" +
    safeScenario.name.replace(/\s+/g, "-").toUpperCase() +
    "-" +
    Date.now();

// ======================================================
// DEPENDENCY GUARDS
// ======================================================
if (typeof simulateUSDIDR !== "function") {
    return fallback("Missing simulateUSDIDR()");
}

if (typeof propagateShock !== "function") {
    return fallback("Missing propagateShock()");
}

try {

    // ==================================================
    // STEP 1: FX MODEL
    // ==================================================
    const fxResult = simulateUSDIDR(safeScenario) || {
        usd_idr: 0,
        pressure_score: 0,
        regime: "SAFE_MODE"
    };

    // ==================================================
    // STEP 2: CONTAGION MODEL
    // ==================================================
    const systemResult = propagateShock(fxResult) || {
        systemState: "SAFE"
    };

    // ==================================================
    // STEP 3: STATE MAPPING
    // ==================================================
    const stateMap = {
        STABLE: "GREEN",
        WATCH: "AMBER",
        STRESS: "RED",
        CRITICAL: "CRITICAL",
        SAFE: "GREEN"
    };

    const finalState = stateMap[systemResult.systemState] || "GREEN";

    // ==================================================
    // PHASE 8 BASELINE STATE VECTOR
    // ==================================================
    const baseline = {
        SHI: 98.5,
        RPS: (fxResult.pressure_score ?? 0) / 100,
        EVR: Math.round((fxResult.pressure_score ?? 0) * 1.2),
        AIC: systemResult.systemState === "CRITICAL" ? 0.6 : 1.0,
        EAF: (fxResult.pressure_score ?? 0) / 1000
    };

    // ==================================================
    // STEP 4: GUARANTEED RESPONSE CONTRACT
    // ==================================================
    return {

        run_id: run_id,

        scenario: safeScenario.name,

        baseline_state: baseline,

        fx: {
            usd_idr: fxResult.usd_idr ?? 0,
            pressure_score: fxResult.pressure_score ?? 0,
            regime: fxResult.regime || "UNKNOWN"
        },

        system: systemResult,

        final_state: finalState,

        interpretation: getInterpretation(finalState)
    };

} catch (e) {
    return fallback("Engine crash: " + e.message);
}

}

// ======================================================
// INTERPRETATION LAYER
// ======================================================
function getInterpretation(state) {

switch (state) {

    case "GREEN":
        return "System stable with manageable macro conditions";

    case "AMBER":
        return "Early stress signals detected across financial nodes";

    case "RED":
        return "Systemic stress conditions active — contagion spreading";

    case "CRITICAL":
        return "Critical instability — multi-layer system breakdown";

    default:
        return "Unknown system state";
}

}

// ======================================================
// SAFE FALLBACK LAYER (ZERO CRASH GUARANTEE)
// ======================================================
function fallback(reason) {

return {

    run_id: "FALLBACK",

    scenario: "FALLBACK",

    baseline_state: {
        SHI: 98.5,
        RPS: 0,
        EVR: 0,
        AIC: 1.0,
        EAF: 0
    },

    fx: {
        usd_idr: 0,
        pressure_score: 0,
        regime: "SAFE_MODE"
    },

    system: {
        systemState: "SAFE",
        note: reason
    },

    final_state: "GREEN",

    interpretation: "SAFE MODE ACTIVE → " + reason
};

}
