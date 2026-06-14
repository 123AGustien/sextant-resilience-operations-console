/**
 * Sextant Simulator v4 — UI Dashboard Layer
 * Renders live simulation + audit results
 */

function updateDashboard(frame) {

    // -----------------------------------
    // STEP 1: BASIC UI ELEMENTS
    // -----------------------------------
    const riskIndexEl = document.getElementById("riskIndex");
    const impactEl = document.getElementById("impactSummary");
    const briefingEl = document.getElementById("briefing");

    // -----------------------------------
    // STEP 2: SAFETY CHECK
    // -----------------------------------
    if (!frame) return;

    // -----------------------------------
    // STEP 3: ENGINE DATA DISPLAY
    // -----------------------------------
    const fx = frame.fx ?? 0;
    const bank = frame.bank ?? 0;
    const liq = frame.liq ?? 0;
    const conf = frame.conf ?? 0;

    // -----------------------------------
    // STEP 4: AUDIT DATA DISPLAY
    // -----------------------------------
    const audit = frame.audit || {};

    const grade = audit.grade || "NO_GRADE";
    const status = audit.status || "UNKNOWN";
    const riskScore = audit.riskScore || 0;
    const impact = audit.impact || 0;
    const stability = audit.stability || 0;

    // -----------------------------------
    // STEP 5: RISK INDEX DISPLAY
    // -----------------------------------
    if (riskIndexEl) {
        riskIndexEl.innerHTML =
            `Risk Index: ${riskScore} | Grade: ${grade} | Status: ${status}`;
    }

    // -----------------------------------
    // STEP 6: IMPACT DISPLAY
    // -----------------------------------
    if (impactEl) {
        impactEl.innerHTML =
            `Impact: ${impact} | FX:${fx} Bank:${bank} LIQ:${liq} CONF:${conf}`;
    }

    // -----------------------------------
    // STEP 7: EXECUTIVE BRIEFING
    // -----------------------------------
    if (briefingEl) {

        let insights = [];

        if (frame.liq < 50) insights.push("Liquidity stress detected.");
        if (frame.bank < 50) insights.push("Banking instability detected.");
        if (frame.fx < 50) insights.push("FX volatility elevated.");
        if (conf < 60) insights.push("Confidence below threshold.");

        if (status === "SYSTEMIC_RISK") {
            insights.push("SYSTEM UNDER STRESS — IMMEDIATE ACTION REQUIRED");
        }

        briefingEl.innerHTML =
            `Scenario: ${frame.scenario}\n` +
            `State: ${frame.state}\n\n` +
            `Insights:\n- ${insights.join("\n- ")}`;
    }
}

/**
 * OPTIONAL: GLOBAL EXPORT
 */
window.updateDashboard = updateDashboard;
