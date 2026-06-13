/* Sextant Strategic Command Center - Visual Intelligence Layer v3 */

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

function runScenario(type) {

const scenarios = {

us_china_trade: {
  risk: 78,
  impact: "High disruption to global supply chains and semiconductor exports.",
  briefing: `

EXECUTIVE INTELLIGENCE REPORT

Scenario: US–China Trade Escalation

Key Risks:

- Semiconductor export restrictions
- Supply chain fragmentation
- FX volatility

Cascading Effects:
Trade barriers → Supply shock → Production delays → Inflation pressure

Recommended Actions:

- Diversify suppliers

- Increase inventory buffers

- Monitor FX exposure
  `
  },
  
  taiwan_crisis: {
  risk: 92,
  impact: "Critical semiconductor production disruption risk.",
  briefing: `
  EXECUTIVE INTELLIGENCE REPORT

Scenario: Taiwan Strait Crisis

Key Risks:

- Semiconductor supply collapse
- Global tech shock
- Shipping disruption

Cascading Effects:
Geopolitical escalation → Export disruption → Production halt → Global recession risk

Recommended Actions:

- Activate contingency sourcing

- Reduce dependency

- Hedge exposure
  `
  },
  
  semiconductor_shock: {
  risk: 85,
  impact: "Global chip supply chain breakdown.",
  briefing: `
  EXECUTIVE INTELLIGENCE REPORT

Scenario: Semiconductor Shock

Key Risks:

- Automotive disruption
- Cloud delays
- Electronics shortage

Cascading Effects:
Chip shortage → Production slowdown → Revenue decline → Market volatility

Recommended Actions:

- Secure long-term contracts

- Multi-source suppliers
  `
  },
  
  energy_crisis: {
  risk: 80,
  impact: "Energy price volatility driving inflation.",
  briefing: `
  EXECUTIVE INTELLIGENCE REPORT

Scenario: Energy Crisis

Key Risks:

- Oil & gas volatility
- Industrial cost surge
- Transport disruption

Cascading Effects:
Energy shortage → Inflation spike → Demand drop → Slowdown

Recommended Actions:

- Hedge energy exposure

- Optimize costs
  `
  },
  
  global_recession: {
  risk: 88,
  impact: "Global synchronized economic contraction.",
  briefing: `
  EXECUTIVE INTELLIGENCE REPORT

Scenario: Global Recession

Key Risks:

- Credit contraction
- Demand collapse
- Market downturn

Cascading Effects:
Credit crunch → Demand drop → Earnings decline → Downturn

Recommended Actions:

- Increase liquidity buffers

- Defensive positioning

- Reduce exposure
  `
  }
  
  };
  
  const data = scenarios[type];
  const level = getRiskLevel(data.risk);
  
  document.getElementById("riskIndex").innerText =
  "Risk Index: " + data.risk + " | " + level.toUpperCase();
  
  document.getElementById("impactSummary").innerText =
  "Impact: " + data.impact;
  
  document.getElementById("briefing").innerText =
  data.briefing;
  
  // VISUAL INTELLIGENCE BINDING
  applyRiskStyle(level);
  }
