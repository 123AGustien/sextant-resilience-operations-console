/**
 * Sextant Protocol — Audit Bridge Layer (STABLE CORE)
 */

window.SextantBridge = {
  captureSimulationResult,
  auditScenarioResult
};

/* =========================
   MAIN ENTRY
========================= */
function captureSimulationResult(frame) {

  const auditReport = {
    scenario: frame?.scenario || "unknown",
    timestamp: new Date().toISOString(),

    // core metrics (SAFE)
    riskScore: normalize(frame?.riskScore ?? frame?.system?.fx * 100),
    impact: normalize(frame?.impact ?? frame?.rp04?.pressure * 100),
    stability: normalize(frame?.stability ?? frame?.rp04?.stability * 100),

    // intelligence layer
    totalScore: computeTotal(frame),
    grade: computeGrade(frame),
    status: classifyRisk(frame)
  };

  console.log("🧠 SEXTANT AUDIT REPORT:", auditReport);

  return auditReport;
}

/* =========================
   BACKWARD COMPATIBILITY
========================= */
function auditScenarioResult(scenarioName, result) {
  return captureSimulationResult({
    scenario: scenarioName,
    ...result
  });
}

/* =========================
   NORMALIZER (FIXED)
========================= */
function normalize(value) {
  if (value === undefined || value === null || isNaN(value)) {
    return 0;
  }
  return Number(value);
}

/* =========================
   TOTAL SCORE ENGINE
========================= */
function computeTotal(frame) {
  const risk = normalize(frame?.riskScore);
  const impact = normalize(frame?.impact);
  const stability = normalize(frame?.stability);

  return risk + impact + (100 - stability);
}

/* =========================
   GRADING ENGINE
========================= */
function computeGrade(frame) {
  const score = computeTotal(frame);

  if (score >= 250) return "CRITICAL";
  if (score >= 200) return "HIGH";
  if (score >= 150) return "MEDIUM";
  if (score >= 100) return "LOW";
  return "STABLE";
}

/* =========================
   RISK CLASSIFICATION
========================= */
function classifyRisk(frame) {
  const risk = normalize(frame?.riskScore);

  if (risk >= 75) return "SYSTEMIC_RISK";
  if (risk >= 50) return "ELEVATED_RISK";
  if (risk >= 25) return "WATCHLIST";
  return "NORMAL";
}
