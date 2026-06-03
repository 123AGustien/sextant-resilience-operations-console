// ======================================================
// SEXTANT RESILIENCE ENGINE
// Stable Production Simulation Core (GitHub Pages Safe)
// ======================================================

function runSimulation(scenario) {

    // -----------------------------
    // INPUT SANITY CHECK
    // -----------------------------
    if (!scenario || typeof scenario !== "object") {
        return fallback("Invalid scenario input");
    }

    // -----------------------------
    // DEPENDENCY GUARD
    // -----------------------------
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
        const fxResult = simulateUSDIDR(scenario) || {};

        // ==================================================
        // STEP 2: CONTAGION MODEL
        // ==================================================
        const systemResult = propagateShock(fxResult) || {
            systemState: "SAFE"
        };

        // ==================================================
        // STEP 3: STATE MAPPING ENGINE
        // ==================================================
        const stateMap = {
            STABLE: "GREEN",
            WATCH: "AMBER",
            STRESS: "RED",
            CRITICAL: "CRITICAL",
            SAFE: "GREEN"
        };

        const finalState =
            stateMap[systemResult.systemState] || "GREEN";

        // ==================================================
        // STEP 4: RESPONSE PACKAGING
        // ==================================================
        return {
            scenario: scenario.name || "Unnamed Scenario",

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
// SAFE FALLBACK LAYER (CRASH PROTECTION)
// ======================================================
function fallback(reason) {

    return {
        scenario: "FALLBACK",

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
