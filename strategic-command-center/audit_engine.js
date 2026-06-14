// =====================================
// SEXTANT AUDIT ENGINE v2 (INTEGRATED)
// simulator + command center aware
// =====================================

/* =========================
   CORE AUDIT FUNCTION
========================= */
function runAudit(frame) {

    // If simulator frame is passed, use it
    const system = frame?.frame?.system || frame?.system || {};

    const fx = system.fx ?? 0;
    const bank = system.bank ?? 0;
    const liq = system.liq ?? 0;
    const eq = system.eq ?? 0;
    const conf = system.conf ?? 0;

    const riskScore = (fx * 100);

    const readiness =
        conf > 0.7 ? "HIGH"
        : conf > 0.5 ? "MEDIUM"
        : "LOW";

    const riskLevel =
        riskScore >= 80 ? "HIGH"
        : riskScore >= 60 ? "MEDIUM"
        : "LOW";

    return {
        systemScore: conf * 10,
        riskScore,
        readiness,
        riskLevel,
        simulatorStatus: frame ? "LIVE" : "STANDALONE",
        commandCenterStatus: "CONNECTED",
        lastCheck: new Date().toISOString()
    };
}

/* =========================
   HTML REPORT FORMATTER
========================= */
function formatAuditReport(audit) {

    return `
        <h3>System Audit Report</h3>
        <p><b>System Score:</b> ${audit.systemScore.toFixed(2)} / 10</p>
        <p><b>Risk Score:</b> ${audit.riskScore.toFixed(2)}</p>
        <p><b>Readiness:</b> ${audit.readiness}</p>
        <p><b>Risk Level:</b> ${audit.riskLevel}</p>
        <p><b>Simulator:</b> ${audit.simulatorStatus}</p>
        <p><b>Command Center:</b> ${audit.commandCenterStatus}</p>
        <p><b>Last Check:</b> ${audit.lastCheck}</p>
    `;
}

/* =========================
   UI HOOK (MANUAL TRIGGER)
========================= */
window.runAudit = function (frame) {

    const result = runAudit(frame);

    const el = document.getElementById("auditResults");

    if (el) {
        el.innerHTML = formatAuditReport(result);
    }

    return result;
};

/* =========================
   LIVE EVENT INTEGRATION
========================= */
window.addEventListener("sextant:run", function (e) {

    const frame = e.detail;

    const audit = runAudit(frame);

    const el = document.getElementById("auditResults");

    if (el) {
        el.innerHTML = formatAuditReport(audit);
    }
});
