function simulateUSDIDR(scenario) {
    let base = 17000;
    let pressure = 0;

    // Oil shock
    if (scenario.oil_price > 100) {
        pressure += 0.3;
    }

    // Capital outflow
    if (scenario.capital_flow === "outflow") {
        pressure += 0.4;
    }

    // Inflation pressure
    if (scenario.inflation_pressure === "rising") {
        pressure += 0.2;
    }

    // Market sentiment / MSCI risk
    if (scenario.msci_sentiment === "negative") {
        pressure += 0.3;
    }

    // Reserve pressure
    if (scenario.reserve_pressure === "high") {
        pressure += 0.2;
    }

    let usd_idr = base + (pressure * 1500);

    return {
        usd_idr: Math.round(usd_idr),
        pressure_score: Number(pressure.toFixed(2)),
        regime:
            pressure < 0.5 ? "STABLE" :
            pressure < 1.0 ? "WATCH" :
            pressure < 1.5 ? "STRESS" : "CRITICAL"
    };
}
