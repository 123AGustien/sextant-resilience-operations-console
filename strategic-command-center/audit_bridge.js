/**
 * Sextant Live Audit Bridge Connector (FIXED)
 * simulator-v4 → audit → command center
 */

window.addEventListener("sextant:run", function (e) {

    const payload = e.detail || {};

    const frame = payload.frame || {};
    const audit = payload.audit || {};
    const system = frame.system || {};

    const scenario = frame.meta?.type || "unknown";

    /* =========================
       RISK INDEX (SAFE)
    ========================= */
    const riskEl = document.getElementById("riskIndex");

    if (riskEl) {

        const score = audit.riskScore ?? (system.conf * 100) ?? 0;

        const level = getRiskLevel(score);

        riskEl.innerText =
            scenario + " | Risk: " +
            score.toFixed(2) +
            " | " + level.toUpperCase();

        applyRiskStyle(level);
    }

    /* =========================
       IMPACT SUMMARY
    ========================= */
    const impactEl = document.getElementById("impactSummary");

    if (impactEl) {
        impactEl.innerText =
            audit.impact ||
            "System operating within simulated bounds";
    }

    /* =========================
       EXECUTIVE BRIEFING
    ========================= */
    const briefingEl = document.getElementById("briefing");

    if (briefingEl) {

        briefingEl.innerText =
`EXECUTIVE INTELLIGENCE REPORT

Scenario: ${scenario}
State: ${frame.state || "UNKNOWN"}

Risk Score: ${audit.riskScore ?? (system.conf * 100)}
Impact: ${audit.impact || "N/A"}
Stability: ${(system.conf ?? 0).toFixed(2)}

Grade: ${audit.grade || "N/A"}
Status: ${audit.status || frame.state || "N/A"}

FX: ${(system.fx ?? 0).toFixed(2)}
BANK: ${(system.bank ?? 0).toFixed(2)}
LIQ: ${(system.liq ?? 0).toFixed(2)}
EQ: ${(system.eq ?? 0).toFixed(2)}
CONF: ${(system.conf ?? 0).toFixed(2)}
`;
    }

});
