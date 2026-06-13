/* Sextant Strategic Command Center - Intelligence Layer v2 */

function getRiskLevel(score) {
if (score >= 90) return "🔴 CRITICAL";
if (score >= 80) return "🟠 HIGH";
if (score >= 65) return "🟡 ELEVATED";
return "🟢 STABLE";
}

function runScenario(type) {

const scenarios = {

us_china_trade: {
  risk: 78,
  impact: "High disruption to global supply chains and semiconductor exports.",
  probability: "Medium-High",
  cascade: [
    "Trade restrictions",
    "Supply chain shock",
    "Manufacturing delays",
    "Inflation pressure"
  ],
  briefing: `

EXECUTIVE INTELLIGENCE REPORT

Scenario: US–China Trade Escalation

Risk Level: ${getRiskLevel(78)}

Probability: Medium-High

Key Risks:

- Semiconductor export restrictions
- Global supply chain fragmentation
- FX volatility

Cascading Path:
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
  probability: "High",
  cascade: [
  "Geopolitical escalation",
  "Export disruption",
  "Production halt",
  "Global recession pressure"
  ],
  briefing: `
  EXECUTIVE INTELLIGENCE REPORT

Scenario: Taiwan Strait Crisis

Risk Level: ${getRiskLevel(92)}

Probability: High

Key Risks:

- Semiconductor supply collapse
- Global tech shock
- Shipping route disruption

Cascading Path:
Geopolitical escalation → Export disruption → Production halt → Global recession

Recommended Actions:

- Activate contingency sourcing

- Reduce semiconductor dependency

- Hedge equity exposure
  `
  },
  
  semiconductor_shock: {
  risk: 85,
  impact: "Global chip supply chain breakdown.",
  probability: "High",
  cascade: [
  "Chip shortage",
  "Production slowdown",
  "Revenue contraction",
  "Market volatility"
  ],
  briefing: `
  EXECUTIVE INTELLIGENCE REPORT

Scenario: Semiconductor Shock

Risk Level: ${getRiskLevel(85)}

Probability: High

Key Risks:

- Automotive disruption
- Cloud infrastructure delays
- Electronics shortage

Cascading Path:
Chip shortage → Production slowdown → Revenue decline → Market volatility

Recommended Actions:

- Secure long-term chip contracts

- Multi-source suppliers
  `
  },
  
  energy_crisis: {
  risk: 80,
  impact: "Energy price volatility driving inflation.",
  probability: "Medium-High",
  cascade: [
  "Energy shortage",
  "Cost inflation",
  "Demand reduction",
  "Economic slowdown"
  ],
  briefing: `
  EXECUTIVE INTELLIGENCE REPORT

Scenario: Energy Crisis

Risk Level: ${getRiskLevel(80)}

Probability: Medium-High

Key Risks:

- Oil & gas volatility
- Industrial cost surge
- Transport disruption

Cascading Path:
Energy shortage → Inflation spike → Reduced demand → Slowdown

Recommended Actions:

- Hedge energy exposure

- Optimize operational costs
  `
  },
  
  global_recession: {
  risk: 88,
  impact: "Global synchronized economic contraction.",
  probability: "High",
  cascade: [
  "Credit contraction",
  "Demand drop",
  "Earnings decline",
  "Market downturn"
  ],
  briefing: `
  EXECUTIVE INTELLIGENCE REPORT

Scenario: Global Recession

Risk Level: ${getRiskLevel(88)}

Probability: High

Key Risks:

- Demand collapse
- Credit tightening
- Equity drawdown

Cascading Path:
Credit contraction → Demand drop → Earnings decline → Market downturn

Recommended Actions:

- Increase liquidity buffers

- Reduce risk exposure

- Defensive positioning
  `
  }
  
  };
  
  const data = scenarios[type];
  
  document.getElementById("riskIndex").innerText =
  "Risk Index: " + data.risk + " | " + getRiskLevel(data.risk);
  
  document.getElementById("impactSummary").innerText =
  "Impact: " + data.impact;
  
  document.getElementById("briefing").innerText =
  data.briefing;
  }
