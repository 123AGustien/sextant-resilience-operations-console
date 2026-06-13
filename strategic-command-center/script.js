/* Sextant Strategic Command Center - Probability Intelligence Engine v5 */

function getRiskLevel(score) {
if (score >= 90) return "critical";
if (score >= 80) return "high";
if (score >= 65) return "elevated";
return "stable";
}

function applyRiskStyle(level) {
const el = document.getElementById("riskIndex");

el.classList.remove(
"risk-critical",
"risk-high",
"risk-elevated",
"risk-stable"
);

el.classList.add("risk-" + level);
}

/* Cascading Engine */
function buildCascade(cascadeArray) {
let output = "CASCADE IMPACT CHAIN\n\n";
cascadeArray.forEach((step, i) => {
output += "Layer ${i + 1}: ${step}\n";
});
return output;
}

/* Probability Engine */
function calculateProbability(riskScore) {
if (riskScore >= 90) return "Very High (80–95%)";
if (riskScore >= 80) return "High (65–80%)";
if (riskScore >= 65) return "Medium (45–65%)";
return "Low (10–45%)";
}

function runScenario(type) {

const scenarios = {

us_china_trade: {
  risk: 78,
  impact: "High disruption to global supply chains.",
  cascade: [
    "Trade restrictions initiated",
    "Supply chain fragmentation begins",
    "Manufacturing delays spread globally",
    "Inflation pressure increases",
    "Market volatility rises"
  ]
},

taiwan_crisis: {
  risk: 92,
  impact: "Critical semiconductor production disruption.",
  cascade: [
    "Geopolitical escalation intensifies",
    "Export channels disrupted",
    "Semiconductor production halts",
    "Global tech shock spreads",
    "Recession risk escalates"
  ]
},

semiconductor_shock: {
  risk: 85,
  impact: "Global chip supply breakdown.",
  cascade: [
    "Chip bottlenecks emerge",
    "Automotive slowdown",
    "Cloud delays increase",
    "Electronics shortage expands",
    "Revenue contraction spreads"
  ]
},

energy_crisis: {
  risk: 80,
  impact: "Energy volatility drives inflation.",
  cascade: [
    "Energy supply tightens",
    "Oil price spike",
    "Industrial costs rise",
    "Inflation increases",
    "Demand weakens"
  ]
},

global_recession: {
  risk: 88,
  impact: "Global economic contraction.",
  cascade: [
    "Credit tightening begins",
    "Demand collapse spreads",
    "Earnings fall",
    "Investment slows",
    "Market downturn accelerates"
  ]
}

};

const data = scenarios[type];
const level = getRiskLevel(data.risk);
const probability = calculateProbability(data.risk);

document.getElementById("riskIndex").innerText =
"Risk Index: " + data.risk +
" | " + level.toUpperCase() +
" | Probability: " + probability;

document.getElementById("impactSummary").innerText =
"Impact: " + data.impact;

document.getElementById("briefing").innerText =
"EXECUTIVE INTELLIGENCE REPORT\n\n" +
"Probability Assessment: " + probability + "\n\n" +
buildCascade(data.cascade);

applyRiskStyle(level);
}
