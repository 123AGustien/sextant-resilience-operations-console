function propagateShock(fxResult) {
    let fxStress = fxResult.pressure_score;

    // Banking sector reacts strongest
    let bankingStress = fxStress * 0.8;

    // Liquidity tightens after banking stress
    let liquidityStress = bankingStress * 0.7;

    // Equity market reacts to liquidity
    let equityStress = liquidityStress * 0.6;

    // Confidence decay (system-wide sentiment)
    let confidenceDrop = fxStress * 0.5;

    return {
        fxStress,
        bankingStress: Number(bankingStress.toFixed(2)),
        liquidityStress: Number(liquidityStress.toFixed(2)),
        equityStress: Number(equityStress.toFixed(2)),
        confidenceDrop: Number(confidenceDrop.toFixed(2)),
        systemState:
            fxStress < 0.5 ? "STABLE" :
            fxStress < 1.0 ? "WATCH" :
            fxStress < 1.5 ? "STRESS" : "CRITICAL"
    };
}
