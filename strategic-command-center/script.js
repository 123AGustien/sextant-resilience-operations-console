/* Sextant Strategic Command Center - Cascading Intelligence Engine v4 */

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
cascadeArray.forEach((step, index) => {
output += "Layer ${index + 1}: ${step}\n";
});
return output;
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
  ],
  briefing: `

EXECUTIVE INTELLIGENCE REPORT

Scenario: US–China Trade Escalation

Key Risks:

- Semiconductor export restrictions
- Global supply chain fragmentation
- FX volatility

${buildCascade([
"Trade restrictions initiated",
"Supply chain fragmentation begins",
"Manufacturing delays spread globally",
"Inflation pressure increases",
"Market volatility rises"
])}

Recommended Actions:

- Diversify suppliers

- Increase inventory buffers

- Monitor FX exposure
  `
  },
  
  taiwan_crisis: {
  risk: 92,
  impact: "Critical semiconductor production disruption.",
  cascade: [
  "Geopolitical escalation intensifies",
  "Export channels disrupted",
  "Semiconductor production halts",
  "Global tech supply shock",
  "Recession risk escalates"
  ],
  briefing: `
  EXECUTIVE INTELLIGENCE REPORT

Scenario: Taiwan Strait Crisis

Key Risks:

- Semiconductor collapse
- Global tech shock
- Shipping disruption

${buildCascade([
"Geopolitical escalation intensifies",
"Export channels disrupted",
"Semiconductor production halts",
"Global tech supply shock",
"Recession risk escalates"
])}

Recommended Actions:

- Activate contingency sourcing

- Reduce dependency on single region

- Hedge equity exposure
  `
  },
  
  semiconductor_shock: {
  risk: 85,
  impact: "Global chip supply breakdown.",
  cascade: [
  "Chip production bottlenecks emerge",
  "Automotive manufacturing slows",
  "Cloud infrastructure delays increase",
  "Consumer electronics shortage expands",
  "Revenue contraction spreads"
  ],
  briefing: `
  EXECUTIVE INTELLIGENCE REPORT

Scenario: Semiconductor Shock

Key Risks:

- Automotive disruption
- Cloud delays
- Electronics shortage

${buildCascade([
"Chip production bottlenecks emerge",
"Automotive manufacturing slows",
"Cloud infrastructure delays increase",
"Consumer electronics shortage expands",
"Revenue contraction spreads"
])}

Recommended Actions:

- Secure long-term chip contracts

- Multi-source suppliers
  `
  },
  
  energy_crisis: {
  risk: 80,
  impact: "Energy volatility drives inflation.",
  cascade: [
  "Energy supply tightens",
  "Oil & gas prices spike",
  "Industrial costs rise",
  "Consumer inflation increases",
  "Demand weakens"
  ],
  briefing: `
  EXECUTIVE INTELLIGENCE REPORT

Scenario: Energy Crisis

Key Risks:

- Energy price volatility
- Industrial cost surge
- Transport disruption

${buildCascade([
"Energy supply tightens",
"Oil & gas prices spike",
"Industrial costs rise",
"Consumer inflation increases",
"Demand weakens"
])}

Recommended Actions:

- Hedge energy exposure

- Optimize operational costs
  `
  },
  
  global_recession: {
  risk: 88,
  impact: "Global economic contraction.",
  cascade: [
  "Credit tightening begins",
  "Demand collapse spreads",
  "Corporate earnings fall",
  "Investment slows",
  "Market downturn accelerates"
  ],
  briefing: `
  EXECUTIVE INTELLIGENCE REPORT

Scenario: Global Recession

Key Risks:

- Credit contraction
- Demand collapse
- Market downturn

${buildCascade([
"Credit tightening begins",
"Demand collapse spreads",
"Corporate earnings fall",
"Investment slows",
"Market downturn accelerates"
])}

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
  
  applyRiskStyle(level);
  }
