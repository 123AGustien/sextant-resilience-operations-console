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

/* AUTO AUDIT */
if (window.runAudit) {
window.runAudit({
system: {
fx: s.risk / 100,
bank: (s.risk / 100) * 0.85,
liq: (s.risk / 100) * 0.75,
eq: (s.risk / 100) * 0.65,
conf: (s.risk / 100) * 0.55
}
});
}

}
