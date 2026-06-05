window.generateETOReport = function (result) {

    if (!result) return { error: "No result" };

    return {
        report_id: "ETO-" + Date.now(),

        scenario: result.scenario || "unknown",
        final_state: result.final_state || "UNKNOWN",
        impact: result.impact || 0,

        fx: {
            usd_idr: result.fx?.usd_idr || 0,
            pressure_score: result.fx?.pressure_score || 0,
            regime: result.fx?.regime || "UNKNOWN"
        },

        system: {
            fxStress: result.system?.fxStress || 0,
            liquidityStress: result.system?.liquidityStress || 0,
            bankingStress: result.system?.bankingStress || 0
        },

        interpretation: result.interpretation || "N/A",

        conclusion:
            "System state is " +
            (result.final_state || "UNKNOWN") +
            " with impact " +
            (result.impact || 0)
    };
};
