/**
 * Sextant Audit Self Test v1.0
 * SELF-CHECK / GOVERNANCE LAYER
 * Validates RP-04 + Audit Bridge integrity
 */

window.SextantAuditTest = {

    runFullTest() {

        console.log("🧪 Sextant Self-Test Starting...");

        const scenarios = ["normal", "failure", "cascade"];

        const results = [];

        for (const scenario of scenarios) {

            // 1. RUN ENGINE
            const frame = window.runRP04?.(scenario);

            if (!frame) {
                results.push({
                    scenario,
                    status: "FAIL",
                    reason: "RP-04 engine missing"
                });
                continue;
            }

            // 2. RUN AUDIT BRIDGE
            const audit = window.SextantBridge?.captureSimulationResult(frame);

            if (!audit) {
                results.push({
                    scenario,
                    status: "FAIL",
                    reason: "Audit bridge missing"
                });
                continue;
            }

            // 3. VALIDATION CHECKS
            const valid =
                audit.riskScore !== undefined &&
                audit.impact !== undefined &&
                audit.stability !== undefined &&
                audit.grade !== undefined &&
                audit.status !== undefined;

            results.push({
                scenario,
                status: valid ? "PASS" : "FAIL",
                audit,
                frameValid: !!frame,
                auditValid: valid
            });
        }

        // 4. FINAL REPORT
        const passCount = results.filter(r => r.status === "PASS").length;

        const report = {
            timestamp: Date.now(),
            totalScenarios: scenarios.length,
            passed: passCount,
            failed: scenarios.length - passCount,
            systemStatus: passCount === scenarios.length ? "SYSTEM_OK" : "SYSTEM_FAIL",
            results
        };

        console.log("🧪 SELF TEST REPORT:", report);

        // Global hook for Control Room
        window.__SEXTANT_SELF_TEST__ = report;

        return report;
    }
};
