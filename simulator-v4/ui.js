/**
 * Sextant Simulator v4 UI Bridge
 * Connects orchestration frames → audit → live dashboard
 */

/**
 * MAIN ENTRY: called after every simulation step
 */
function updateDashboard(frame) {

    // safety check
    if (!frame) return;

    const audit = frame.audit || {
        riskScore: 0,
        impact: 0,
        stability: 0,
        grade: "NO_DATA",
        status: "DISCONNECTED"
    };

    // -----------------------------
    // RISK INDEX DISPLAY
    // -----------------------------
    const riskIndexEl = document.getElementById("riskIndex");
    if (riskIndexEl) {
        riskIndexEl.innerText =
            `Risk Score: ${audit.riskScore} | Grade: ${audit.grade}`;
    }

    // -----------------------------
    // IMPACT SUMMARY DISPLAY
    // -----------------------------
    const impactEl = document.getElementById("impactSummary");
    if (impactEl) {
        impactEl.innerText =
            `Status: ${audit.status} | Impact: ${audit.impact}`;
    }

    // -----------------------------
    // EXECUTIVE BRIEFING PANEL
    // -----------------------------
    const briefingEl = document.getElementById("briefing");
    if (briefingEl) {
        briefingEl.innerText =
            `Sextant Protocol Audit Report

Scenario: ${frame.scenario}
Step: ${frame.step}

Risk Score: ${audit.riskScore}
Impact: ${audit.impact}
Stability: ${audit.stability}

Grade: ${audit.grade}
Status: ${audit.status}

System State:
FX: ${frame.fx}
Bank: ${frame.bank}
Liquidity: ${frame.liq}
Equity: ${frame.eq}
Confidence: ${frame.conf}
`;
    }
}

/**
 * OPTIONAL: global hook for simulator buttons
 * Use this if UI calls orchestra directly
 */
window.updateDashboard = updateDashboard;
