/**
 * Sextant Audit Bridge v1.0
 * Receives RP-04 frame and generates audit output
 */

window.SextantBridge = {

    captureSimulationResult(frame) {

        if (!frame || !frame.system) {
            return {
                scenario: "invalid_frame",
                riskScore: 0,
                impact: 0,
                stability: 0,
                grade: "ERROR",
                status: "FRAME_MISSING"
            };
        }

        const system = frame.system;

        // Core scoring logic
        const riskScore = system.conf * 100;
        const impact = system.bank * 100;
        const stability = system.liq * 100;

        let grade = "STABLE";

        if (riskScore < 40) grade = "CRITICAL";
        else if (riskScore < 60) grade = "HIGH_RISK";
        else if (riskScore < 80) grade = "MODERATE_RISK";

        return {
            scenario: frame.scenario,
            riskScore: riskScore.toFixed(2),
            impact: impact.toFixed(2),
            stability: stability.toFixed(2),
            grade,
            status: "OK",
            timestamp: Date.now()
        };
    }
};
