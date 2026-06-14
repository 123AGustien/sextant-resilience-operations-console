/**
 * Sextant Protocol — Audit Bridge Layer (ROOT)
 * Central grading system for all simulation engines
 * Connects simulator outputs to orchestration + dashboard
 */

export function auditScenarioResult(scenarioName, result) {

  const auditReport = {
    scenario: scenarioName,
    timestamp: new Date().toISOString(),

    // core simulation outputs
    riskScore: normalize(result?.riskScore),
    impact: normalize(result?.impact),
    stability: normalize(result?.stability),

    // derived intelligence
    totalScore: computeTotal(result),
    grade: computeGrade(result),
    status: classifyRisk(result)
  };

  console.log("🧠 AUDIT REPORT GENERATED:", auditReport);

  return auditReport;
}

/**
 * Prevents undefined / NaN issues from breaking dashboard
 */
function normalize(value) {
  if (value === undefined || value === null || isNaN(value)) {
    return 0;
  }
  return value;
}

/**
 * Core scoring logic (used for grading system)
 */
function computeTotal(result) {
  const risk = normalize(result?.riskScore);
  const impact = normalize(result?.impact);
  const stability = normalize(result?.stability);

  return risk + impact + (100 - stability);
}

/**
 * Grade classification engine
 */
function computeGrade(result) {
  const score = computeTotal(result);

  if (score >= 250) return "CRITICAL";
  if (score >= 200) return "HIGH";
  if (score >= 150) return "MEDIUM";
  if (score >= 100) return "LOW";
  return "STABLE";
}

/**
 * Risk classification
 */
function classifyRisk(result) {
  const risk = normalize(result?.riskScore);

  if (risk >= 75) return "SYSTEMIC_RISK";
  if (risk >= 50) return "ELEVATED_RISK";
  if (risk >= 25) return "WATCHLIST";
  return "NORMAL";
}
