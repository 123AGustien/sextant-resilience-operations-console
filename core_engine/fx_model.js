/* ======================================================
   FX MODEL - simulateUSDIDR (REQUIRED DEPENDENCY)
====================================================== */

function simulateUSDIDR(scenario) {

    const pressure =
        (scenario.oil_price || 100) > 110 ? 0.8 :
        (scenario.oil_price || 100) > 95 ? 0.4 :
        0.2;

    return {
        usd_idr: 15000 + (pressure * 2000),
        pressure_score: pressure,
        regime:
            pressure > 0.7 ? "STRESSED" :
            pressure > 0.4 ? "WATCH" :
            "STABLE"
    };
}

/* GLOBAL EXPORT */
window.simulateUSDIDR = simulateUSDIDR;
