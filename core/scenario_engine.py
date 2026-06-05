function simulateUSDIDR() {
    return {
        usd_idr: 17000,
        pressure_score: Math.random(),
        regime: "SIMULATION"
    };
}

/* =========================================================
   SEXTANT SIMULATION ENGINE v8 - STABLE CORE
========================================================= */

function runSimulation(scenario) {

    if (!scenario || typeof scenario !== "object") {
        return fallback("Invalid scenario input");
    }

    const safeScenario = {
        name: scenario.name || "Unnamed Scenario",
        oil_price: scenario.oil_price ?? 100,
        capital_flow: scenario.capital_flow || "neutral",
        inflation_pressure: scenario.inflation_pressure || "stable"
    };

    const run_id =
        "SIM-" +
        safeScenario.name.replace(/\s+/g, "-").toUpperCase() +
        "-" +
        Date.now();

    if (typeof simulateUSDIDR !== "function") {
        return fallback("Missing simulateUSDIDR()");
    }

    if (typeof propagateShock !== "function") {
        return fallback("Missing propagateShock()");
    }

    try {

        const fxResult = simulateUSDIDR(safeScenario) || {
            usd_idr: 0,
            pressure_score: 0,
            regime: "SAFE_MODE"
        };

        fxResult.pressure_score =
            Math.max(0, Math.min(1, fxResult.pressure_score || 0));

        const systemResult = propagateShock(fxResult);

        const stateMap = {
            STABLE: "GREEN",
            WATCH: "AMBER",
            STRESS: "RED",
            CRITICAL: "CRITICAL",
            SAFE: "GREEN"
        };

        const finalState = stateMap[systemResult.systemState] || "GREEN";

        const baseline = {
            SHI: 98.5,
            RPS: fxResult.pressure_score / 100,
            EVR: Math.round(fxResult.pressure_score * 120),
            AIC: systemResult.systemState === "CRITICAL" ? 0.6 : 1.0,
            EAF: fxResult.pressure_score / 1000
        };

        return {
            run_id,
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

function propagateShock(fxResult) {

    const pressure = fxResult.pressure_score ?? 0;

    return {
        fxStress: pressure,
        bankingStress: Math.min(1, pressure * 0.85),
        liquidityStress: Math.min(1, pressure * 0.65),
        equityStress: Math.min(1, pressure * 0.50),
        confidenceDrop: Math.min(1, pressure * 0.70),

        systemState:
            pressure > 0.85 ? "CRITICAL" :
            pressure > 0.60 ? "STRESS" :
            pressure > 0.30 ? "WATCH" :
            "STABLE"
    };
}

function getInterpretation(state) {
    switch (state) {
        case "GREEN":
            return "System stable";
        case "AMBER":
            return "Early stress detected";
        case "RED":
            return "Systemic stress active";
        case "CRITICAL":
            return "Critical breakdown risk";
        default:
            return "Unknown state";
    }
}

function fallback(reason) {
    return {
        run_id: "FALLBACK",
        scenario: "FALLBACK",
        fx: { usd_idr: 0, pressure_score: 0, regime: "SAFE_MODE" },
        system: { systemState: "SAFE", note: reason },
        final_state: "GREEN",
        interpretation: reason
    };
}

/* ✅ CRITICAL FIX */
window.runSimulation = runSimulation;
