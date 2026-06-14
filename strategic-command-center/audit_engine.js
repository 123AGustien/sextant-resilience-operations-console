// =====================================
// SEXTANT AUDIT ENGINE v2.1 (CORRECTED)
// fully weighted system-level model
// =====================================

function runAudit(frame) {

    const system = frame?.system || frame || {};

    const fx = system.fx ?? 0;
    const bank = system.bank ?? 0;
    const liq = system.liq ?? 0;
    const eq = system.eq ?? 0;
    const conf = system.conf ?? 0;

    // -----------------------------
    // WEIGHTED SYSTEM RISK MODEL
    // -----------------------------
    const riskScore =
        (fx * 0.30 +
         bank * 0.25 +
         liq * 0.20 +
         eq * 0.15 +
         (1 - conf) * 0.10) * 100;

    const systemScore =
        ((bank + liq + eq + conf) / 4) * 10;

    const readiness =
        conf > 0.75 ? "HIGH"
        : conf > 0.5 ? "MEDIUM"
        : "LOW";

    const riskLevel =
        riskScore >= 80 ? "HIGH"
        : riskScore >= 60 ? "MEDIUM"
        : "LOW";

    return {
        systemScore,
        riskScore,
        readiness,
        riskLevel,
        simulatorStatus: frame ? "LIVE" : "STANDALONE",
        commandCenterStatus: "CONNECTED",
        lastCheck: new Date().toISOString()
    };
}

// -----------------------------
// FORMATTER
// -----------------------------
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

// -----------------------------
// UI HOOK
// -----------------------------
window.runAudit = function (frame) {

    const result = runAudit(frame);

    const el = document.getElementById("auditResults");

    if (el) {
        el.innerHTML = formatAuditReport(result);
    }

    return result;
};

// -----------------------------
// LIVE EVENT BRIDGE
// -----------------------------
window.addEventListener("sextant:run", function (e) {

    const frame = e.detail;

    const audit = runAudit(frame);

    const el = document.getElementById("auditResults");

    if (el) {
        el.innerHTML = formatAuditReport(audit);
    }
});
