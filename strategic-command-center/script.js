/* Sextant Strategic Command Center - Portfolio Risk Engine v7 */

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

/* Probability Model */
function calculateProbability(score) {
if (score >= 90) return 0.85;
if (score >= 80) return 0.7;
if (score >= 65) return 0.5;
return 0.25;
}

/* Core Scenario Portfolio */
const scenarios = {

us_china_trade: {
name: "US–China Trade Escalation",
risk: 78,
weight: 0.25,
impact: "Global supply chain disruption"
},

taiwan_crisis: {
name: "Taiwan Strait Crisis",
risk: 92,
weight: 0.3,
impact: "Semiconductor supply shock"
},

semiconductor_shock: {
name: "Semiconductor Shock",
risk: 85,
weight: 0.2,
impact: "Chip supply breakdown"
},

energy_crisis: {
name: "Energy Crisis",
risk: 80,
weight: 0.15,
impact: "Energy inflation pressure"
},

global_recession: {
name: "Global Recession",
risk: 88,
weight: 0.1,
impact: "Global demand contraction"
}

};

/* SINGLE SCENARIO RUN */
function runScenario(type) {

const s = scenarios[type];
const level = getRiskLevel(s.risk);
const probability = calculateProbability(s.risk);

document.getElementById("riskIndex").innerText =
s.name +
" | Risk: " + s.risk +
" | " + level.toUpperCase() +
" | Probability: " + (probability * 100).toFixed(0) + "%";

document.getElementById("impactSummary").innerText =
s.impact;

document.getElementById("briefing").innerText =
"EXECUTIVE INTELLIGENCE REPORT\n\n" +
"Scenario: " + s.name + "\n" +
"Weighted Probability: " + (probability * 100).toFixed(0) + "%\n\n" +
"NOTE: Single scenario view active.";

applyRiskStyle(level);
}

/* PORTFOLIO RISK ENGINE */
function portfolioRisk() {

let totalRisk = 0;
let totalWeight = 0;

let report = "PORTFOLIO RISK ANALYSIS\n\n";

Object.keys(scenarios).forEach(key => {

const s = scenarios[key];

const contribution = s.risk * s.weight;
totalRisk += contribution;
totalWeight += s.weight;

report +=
  s.name + "\n" +
  "Risk: " + s.risk +
  " | Weight: " + (s.weight * 100).toFixed(0) + "%" +
  " | Contribution: " + contribution.toFixed(2) +
  "\n\n";

});

const portfolioScore = totalRisk / totalWeight;
const level = getRiskLevel(portfolioScore);

report =
"PORTFOLIO SCORE: " + portfolioScore.toFixed(2) +
" | " + level.toUpperCase() +
"\n\n" +
report;

document.getElementById("riskIndex").innerText =
"PORTFOLIO RISK: " + portfolioScore.toFixed(2) +
" | " + level.toUpperCase();

document.getElementById("impactSummary").innerText =
"System-wide weighted risk exposure";

document.getElementById("briefing").innerText = report;

applyRiskStyle(level);
}
