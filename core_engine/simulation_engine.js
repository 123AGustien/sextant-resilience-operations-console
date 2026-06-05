/* ======================================================
   SEXTANT SIMULATION ENGINE v8.1 STABLE EXPORT
====================================================== */

function runSimulation(scenario) {

    if (!scenario || typeof scenario !== "object") {
        return fallback("Invalid scenario input");
    }

    const safeScenario = {
        name: scenario.name || scenario.type || "Unnamed Scenario",
        oil_price: scenario.oil_price ?? 100,
        capital_flow: scenario.capital_flow || "neutral",
        inflation_pressure: scenario.inflation_pressure || "stable"
    };

    const run_id =
        "SIM-" +
        safeScenario.name.replace(/\s+/g, "-").toUpperCase() +
        "-" +
        Date.now();

    try {

        const fxResult = simulateUSDIDR
            ? simulateUSDIDR(safeScenario)
            : { usd_idr: 0, pressure_score: 0, regime: "SAFE_MODE" };

        fxResult.pressure_score =
            Math.max(0, Math.min(1, fxResult.pressure_score || 0));

        const systemResult = propagateShock
            ? propagateShock(fxResult)
            : { systemState: "STABLE" };

        const finalState =
            systemResult.systemState || "STABLE";

        return {
            run_id,
            scenario: safeScenario.name,
            fx: fxResult,
            system: systemResult,
            final_state: finalState,
            impact: Math.round(fxResult.pressure_score * 100),
            interpretation: getInterpretation(finalState)
        };

    } catch (e) {
        return fallback("Engine crash: " + e.message);
    }
}

/* ======================================================
   CONTAGION MODEL
====================================================== */
function propagateShock(fxResult) {

    const p = fxResult.pressure_score ?? 0;

    return {
        fxStress: p,
        bankingStress: Math.min(1, p * 0.85),
        liquidityStress: Math.min(1, p * 0.65),
        equityStress: Math.min(1, p * 0.5),
        confidenceDrop: Math.min(1, p * 0.7),

        systemState:
            p > 0.85 ? "CRITICAL" :
            p > 0.60 ? "STRESS" :
            p > 0.30 ? "WATCH" :
            "STABLE"
    };
}

/* ======================================================
   INTERPRETATION
====================================================== */
function getInterpretation(state) {
    return {
        STABLE: "System stable",
        WATCH: "Early stress detected",
        STRESS: "System stress active",
        CRITICAL: "Critical breakdown"
    }[state] || "Unknown";
}

/* ======================================================
   FALLBACK
====================================================== */
function fallback(reason) {
    return {
        run_id: "FALLBACK",
        scenario: "FALLBACK",
        fx: { pressure_score: 0 },
        system: { systemState: "STABLE", note: reason },
        final_state: "STABLE",
        impact: 0,
        interpretation: reason
    };
}

/* ======================================================
   EXPORT
====================================================== */
window.runSimulation = runSimulation;
window.propagateShock = propagateShock;
window.getInterpretation = getInterpretation;
window.fallback = fallback;
