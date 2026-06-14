/**
 * Sextant Audit Bridge v4 — Control Layer Sync Core
 * Connects simulator-v4 → Control Room → Orchestra
 */

window.SextantBridge = window.SextantBridge || {};

/* =========================
   MAIN AUDIT ENTRY
========================= */
window.SextantBridge.captureSimulationResult = function (frame) {

    const audit = {
        scenario: frame?.scenario || "unknown",
        timestamp: Date.now(),

        // SAFE METRICS
        riskScore: normalize(frame?.system?.fx * 100),
        impact: normalize(frame?.system?.bank * 100),
        stability: normalize(frame?.rp04?.stability * 100),

        // INTELLIGENCE LAYER
        totalScore: computeTotal(frame),
        grade: computeGrade(frame),
        status: classifyRisk(frame)
    };

    console.log("🧠 V4 AUDIT:", audit);

    // push global hook (for Control Room sync)
    window.__SEXTANT_AUDIT__ = audit;

    return audit;
};

/* =========================
   SAFE NORMALIZER
========================= */
function normalize(v) {
    if (v === undefined || v === null || isNaN(v)) return 0;
    return Number(v);
}

/* =========================
   TOTAL SCORE ENGINE
========================= */
function computeTotal(frame) {

    const fx = normalize(frame?.system?.fx * 100);
    const bank = normalize(frame?.system?.bank * 100);
    const stability = normalize(frame?.rp04?.stability * 100);

    return fx + bank + (100 - stability);
}

/* =========================
   GRADE ENGINE
========================= */
function computeGrade(frame) {

    const score = computeTotal(frame);

    if (score > 250) return "CRITICAL";
    if (score > 200) return "HIGH";
    if (score > 150) return "MEDIUM";
    if (score > 100) return "LOW";
    return "STABLE";
}

/* =========================
   RISK CLASSIFIER
========================= */
function classifyRisk(frame) {

    const risk = normalize(frame?.system?.fx * 100);

    if (risk > 75) return "SYSTEMIC_RISK";
    if (risk > 50) return "ELEVATED_RISK";
    if (risk > 25) return "WATCHLIST";
    return "NORMAL";
}
