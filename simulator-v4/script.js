/**
 * Sextant Simulator v4 Controller
 * Main execution bridge: UI → Orchestra → Audit → Dashboard
 */

/**
 * RUN SCENARIO FROM BUTTONS
 * Called by HTML onclick handlers
 */
function runScenario(type) {

    try {
        // 1. Execute simulation step
        const frame = window.orchestra.runStep(type);

        // 2. Attach audit (if not already injected in orchestra layer)
        if (window.auditScenarioResult && !frame.audit) {
            frame.audit = window.auditScenarioResult(type, frame);
        }

        // 3. Update UI dashboard (THIS IS YOUR MISSING LINK)
        updateDashboard(frame);

    } catch (err) {
        console.error("Simulation error:", err);

        const errorFrame = {
            scenario: type,
            error: true,
            message: err.message,
            audit: {
                riskScore: 0,
                impact: 0,
                stability: 0,
                grade: "ERROR",
                status: "FAILED"
            }
        };

        updateDashboard(errorFrame);
    }
}

/**
 * OPTIONAL: compare scenarios hook (if button exists)
 */
function compareScenarios() {
    console.log("Compare mode not yet implemented");
}

/**
 * OPTIONAL: portfolio risk hook (if button exists)
 */
function portfolioRisk() {
    console.log("Portfolio risk analysis not yet implemented");
}

/**
 * DASHBOARD UPDATE (from ui.js)
 * Must exist globally
 */
function updateDashboard(frame) {

    const audit = frame.audit || {};

    document.getElementById("riskIndex").innerText =
        `Risk Score: ${audit.riskScore ?? 0} | Grade: ${audit.grade ?? "N/A"}`;

    document.getElementById("impactSummary").innerText =
        `Status: ${audit.status ?? "DISCONNECTED"} | Impact: ${audit.impact ?? 0}`;

    document.getElementById("briefing").innerText =
`Sextant Protocol Execution Report

Scenario: ${frame.scenario}
Step: ${frame.step ?? 0}

--- AUDIT ---
Risk Score: ${audit.riskScore ?? 0}
Impact: ${audit.impact ?? 0}
Stability: ${audit.stability ?? 0}
Grade: ${audit.grade ?? "N/A"}
Status: ${audit.status ?? "DISCONNECTED"}

--- SYSTEM ---
FX: ${frame.fx ?? 0}
Bank: ${frame.bank ?? 0}
Liquidity: ${frame.liq ?? 0}
Equity: ${frame.eq ?? 0}
Confidence: ${frame.conf ?? 0}
`;
}

/**
 * GLOBAL EXPORTS FOR HTML BUTTONS
 */
window.runScenario = runScenario;
window.compareScenarios = compareScenarios;
window.portfolioRisk = portfolioRisk;
