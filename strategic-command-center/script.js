/* Sextant Strategic Command Center - Multi-Scenario Intelligence Engine v6 */

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

function calculateProbability(score) {
if (score >= 90) return "Very High (80–95%)";
if (score >= 80) return "High (65–80%)";
if (score >= 65) return "Medium (45–65%)";
return "Low (10–45%)";
}

/* Core Scenario Library */
const scenarios = {

us_china_trade: {
name: "US–China Trade Escalation",
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
name: "Taiwan Strait Crisis",
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
name: "Semiconductor Shock",
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
name: "Energy Crisis",
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
name: "Global Recession",
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

/* SINGLE SCENARIO RUN */
function runScenario(type) {

const data = scenarios[type];
const level = getRiskLevel(data.risk);
const probability = calculateProbability(data.risk);

document.getElementById("riskIndex").innerText =
data.name +
" | Risk: " + data.risk +
" | " + level.toUpperCase() +
" | Probability: " + probability;

document.getElementById("impactSummary").innerText =
data.impact;

document.getElementById("briefing").innerText =
formatBriefing(data, probability, level);

applyRiskStyle(level);
}

/* MULTI-SCENARIO COMPARISON ENGINE */
function compareScenarios() {

let output = "MULTI-SCENARIO COMPARISON\n\n";

Object.keys(scenarios).forEach(key => {

const s = scenarios[key];
const level = getRiskLevel(s.risk);
const prob = calculateProbability(s.risk);

output +=
  "---------------------------\n" +
  s.name + "\n" +
  "Risk: " + s.risk + " | " + level + "\n" +
  "Probability: " + prob + "\n" +
  "Impact: " + s.impact + "\n\n";

});

document.getElementById("riskIndex").innerText =
"COMPARISON MODE ACTIVE";

document.getElementById("impactSummary").innerText =
"Viewing system-wide scenario comparison";

document.getElementById("briefing").innerText = output;
}

/* FORMATTED BRIEFING ENGINE */
function formatBriefing(data, probability, level) {

return (
`EXECUTIVE INTELLIGENCE REPORT

Scenario: ${data.name}

Risk Level: ${level.toUpperCase()}
Probability: ${probability}

CASCADING IMPACT:
${data.cascade.map((c, i) => "Layer ${i+1}: ${c}").join("\n")}

RECOMMENDED ACTIONS:

- Diversify exposure
- Strengthen supply resilience
- Monitor escalation indicators
  `
  );
  }
