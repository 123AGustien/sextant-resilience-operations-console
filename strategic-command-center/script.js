/* Sextant Strategic Command Center - Logic Layer */

function runScenario(type) {

const scenarios = {

us_china_trade: {
  risk: 78,
  impact: "High disruption to global supply chains and semiconductor exports.",
  briefing: `

EXECUTIVE BRIEFING

US–China Trade Escalation Detected

Key Risks:

- Semiconductor export restrictions
- Supply chain fragmentation
- FX volatility (USD / CNY / SGD)

Cascading Effects:
Trade barriers → Supply shock → Manufacturing delays → Inflation pressure

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
  EXECUTIVE BRIEFING

Taiwan Strait Crisis Scenario

Key Risks:

- Semiconductor supply collapse
- Global tech market shock
- Shipping route disruption

Cascading Effects:
Geopolitical escalation → Export disruption → Production halt → Global recession pressure

Recommended Actions:

- Activate contingency sourcing

- Reduce semiconductor dependency

- Hedge equity exposure
  `
  },
  
  semiconductor_shock: {
  risk: 85,
  impact: "Global chip supply chain breakdown.",
  briefing: `
  EXECUTIVE BRIEFING

Semiconductor Supply Shock

Key Risks:

- Automotive production slowdown
- Cloud infrastructure delays
- Consumer electronics shortage

Cascading Effects:
Chip shortage → Production slowdown → Revenue contraction → Market volatility

Recommended Actions:

- Secure long-term chip contracts

- Multi-source suppliers
  `
  },
  
  energy_crisis: {
  risk: 80,
  impact: "Energy price shock driving global inflation.",
  briefing: `
  EXECUTIVE BRIEFING

Energy Market Disruption

Key Risks:

- Oil & gas price volatility
- Industrial cost surge
- Transport disruption

Cascading Effects:
Energy shortage → Inflation spike → Demand reduction → Economic slowdown

Recommended Actions:

- Hedge energy exposure

- Optimize operational costs
  `
  },
  
  global_recession: {
  risk: 88,
  impact: "Global synchronized economic contraction.",
  briefing: `
  EXECUTIVE BRIEFING

Global Recession Scenario

Key Risks:

- Demand collapse
- Credit tightening
- Equity market drawdown

Cascading Effects:
Credit contraction → Demand drop → Earnings decline → Market downturn

Recommended Actions:

- Increase liquidity buffers

- Reduce high-risk exposure

- Defensive positioning
  `
  }
  
  };
  
  const data = scenarios[type];
  
  document.getElementById("riskIndex").innerText =
  "Risk Index: " + data.risk;
  
  document.getElementById("impactSummary").innerText =
  "Impact: " + data.impact;
  
  document.getElementById("briefing").innerText =
  data.briefing;
  }
