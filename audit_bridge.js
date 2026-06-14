/**
 * Sextant Protocol — Audit Bridge Layer (ROOT)
 * Global browser runtime (GitHub Pages compatible)
 * Connects simulation engine → audit layer → future dashboards
 */

window.SextantBridge = {
  captureSimulationResult,
  auditScenarioResult
};

/**
 * MAIN ENTRY — called by Control Room v10
 */
function captureSimulationResult(frame) {

  const auditReport = {
    scenario: frame?.scenario || "unknown",
    timestamp: new Date().toISOString(),

    // core simulation outputs (safe mapping)
    riskScore: normalize(frame?.riskScore ?? frame?.system?.fx * 100),
    impact: normalize(frame?.impact ?? frame?.rp04?.pressure * 100),
    stability: normalize(frame?.stability ?? frame?.rp04?.stability * 100),

    // derived intelligence layer
    totalScore: computeTotal(frame),
    grade: computeGrade(frame),
    status: classifyRisk(frame)
  };

  console.log("🧠 SEXTANT AUDIT REPORT:", auditReport);

  return auditReport;
}

/**
 * BACKWARD COMPATIBILITY WRAPPER
 */
function auditScenarioResult(scenarioName, result) {
  return captureSimulationResult({
    scenario: scenarioName,
    ...result
  });
}

/**
 * SAFE NORMALIZER (prevents NaN crash)
 */
function normalize(value) {
  if (value === undefined || value === null || isNaN(value)) {
    return 0;
  }
  return Number(value);
}

/**
 * TOTAL RISK ENGINE
 */
function computeTotal(frame) {
  const risk = normalize(frame?.riskScore ?? 0);
  const impact = normalize(frame?.impact ?? 0);
  const stability = normalize(frame?.stability ?? 0);

  return risk + impact + (100 - stability);
}

/**
 * GRADING ENGINE
 */
function computeGrade(frame) {
  const score = computeTotal(frame);

  if (score >= 250) return "CRITICAL";
  if (score >= 200) return "HIGH";
  if (score >= 150) return "MEDIUM";
  if (score >= 100) return "LOW";
  return "STABLE";
}

/**
 * RISK CLASSIFICATION ENGINE
 */
function classifyRisk(frame) {
  const risk = normalize(frame?.riskScore ?? 0);

  if (risk >= 75) return "SYSTEMIC_RISK";
  if (risk >= 50) return "ELEVATED_RISK";
  if (risk >= 25) return "WATCHLIST";
  return "NORMAL";
}
