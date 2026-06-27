SEXTANTNT MASTER CONSOLE</h1>
<p>Select System Module</p>

<!-- NAVIGATION BUTTONS -->
<button onclick="openPage('simulation')">
FX Cascade Simulation (v2)
</button>

<button onclick="openPage('industrial')">
Industrial Control Screen
</button>

<button onclick="openPage('router')">
Scenario Router
</button>

<button onclick="openPage('selftest')">
Self Test Module
</button>

<div class="status" id="status">SYSTEM: READY</div>

<div class="footer">
Unified Navigation Layer • Sextant Protocol • Master Control v1
</div>

<script>

/* =========================
   BASE URL (DEPLOYMENT ROOT)
========================= */
const BASE = "https://123agustien.github.io/sextant-resilience-operations-console/";

/* =========================
   ROUTE MAP (FINAL STABLE)
========================= */
const ROUTES = {
    simulation: "simulation_screen_v2.html",
    industrial: "industrial_control_screen_v1.html",
    router: "scenario-router.html",
    selftest: "self-test.html"
};

/* =========================
   NAVIGATION ENGINE
========================= */
function openPage(type) {

    const file = ROUTES[type];

    if (!file) {
        document.getElementById("status").innerText =
            "ERROR: Unknown module → " + type;
        return;
    }

    const url = BASE + file;

    document.getElementById("status").innerText =
        "LOADING: " + file;

    // direct navigation (stable for GitHub Pages)
    window.location.href = url;
}

/* =========================
   BOOT STATUS
========================= */
window.onload = function() {
    document.getElementById("status").innerText =
        "SYSTEM: MASTER CONSOLE ONLINE";
};

</script>

</body>
</html>esuitable for early-stage evaluation and prototyping.
🔷 Live System Access (Primary Interface)
https://123agustien.github.io/sextant-resilience-operations-console/
---

## Live Prototype Access

Control Gateway (System Entry)  
https://123agustien.github.io/sextant-self-generator/

Self Test Control Room  
https://123agustien.github.io/sextant-self-generator/self-test.html

Simulation Engine  
https://123agustien.github.io/sextant-self-generator/simulation_screen_v1.html

Scenario Router  
https://123agustien.github.io/sextant-self-generator/scenario-router.html

Operations Console  
https://123agustien.github.io/sextant-self-generator/sextant-offline-command-center/

---

## Technical Reference

GitHub Repository  
https://github.com/123AGustien/sextant-self-generator
TOCOLANT PROTOCOL ECOSYSTEM

Live URLs

Official Index (Documentation Layer)
https://123agustien.github.io/sextant-protocol-official-index/

Self Generator (Scenario Generation Engine)
https://123agustien.github.io/sextant-self-generator/

Self Test Control Room
https://123agustien.github.io/sextant-self-generator/self-test.html

Simulator v6.2 (Cascade Engine)
https://123agustien.github.io/sextant-self-generator/simulation_screen_v1.html

Scenario Router
https://123agustien.github.io/sextant-self-generator/scenario-router.html

Operations Console (Visualization Layer)
https://123agustien.github.io/sextant-self-generator/sextant-offline-command-center/

Institutional Narrative

Generate → Self Test → Simulate → Visualize → Document

Self Generator:
Creates resilience scenarios and failure cascades.

Self Test:
Validates core modules and boot sequence.

Simulator:
Executes scenarios and models cascade propagation.

Operations Console:
Visualizes system state, risk progression, and intervention pathways.

Official Index:
Documents architecture, repositories, and ecosystem structure.

Mission Statement

"Discovering pathways to failure and protecting the strategies that prevent them."

## 🧭 SEXTANT COMMAND CENTER v10

### Supported Scenario Tags

#### Core Scenarios
- NORMAL_FAILURE_CASCADE
- STABLE_MARKET
- BUSINESS_AS_USUAL
- CONTROLLED_RECOVERY

#### FX Stress Scenarios
- FX_SHOCK
- CURRENCY_DEVALUATION
- USD_SURGE
- IDR_STRESS
- CAPITAL_FLIGHT

#### Banking Stress Scenarios
- BANK_RUN
- INTERBANK_FREEZE
- CREDIT_CRUNCH
- BANK_INSOLVENCY
- COUNTERPARTY_FAILURE

#### Liquidity Stress Scenarios
- LIQUIDITY_SHOCK
- FUNDING_FREEZE
- CASH_SHORTAGE
- MARKET_ILLIQUIDITY

#### Equity Market Scenarios
- EQUITY_SELLOFF
- FLASH_CRASH
- VOLATILITY_SPIKE
- BEAR_MARKET_CASCADE

#### Confidence Scenarios
- CONFIDENCE_COLLAPSE
- SOCIAL_PANIC
- RUMOR_CONTAGION
- INSTITUTIONAL_DISTRUST

#### Systemic Cascade Scenarios
- BANKING_CRISIS
- EMERGING_MARKET_CRISIS
- FINANCIAL_CONTAGION
- SYSTEMIC_RISK_EVENT
- GLOBAL_RECESSION
- MULTI_SECTOR_FAILURE_CASCADE

#### Recovery Scenarios
- CENTRAL_BANK_INTERVENTION
- LIQUIDITY_INJECTION
- CONFIDENCE_RESTORATION
- COORDINATED_STABILIZATION
- RECOVERY_PHASE

#### Institutional Simulation Scenarios
- CROSS_BORDER_LIQUIDITY_STRESS
- DIGITAL_PAYMENT_DISRUPTION
- SOVEREIGN_DEBT_SHOCK
- INSTITUTIONAL_RESILIENCE_TEST
- SYSTEMIC_CASCADE_SCENARIO
- BLACK_SWAN_EVENT
- RESILIENCE_VALIDATION_RUN
SELF GENERATOR
↓
DISCOVER CASCADES
↓
SIMULATOR
↓
TEST INTERVENTIONS
↓
OPERATIONS CONSOLE
↓
VISUALIZE RESILIENCE

GitHub reprisory link to paste at the top

Stress Scale Methodology

In the current prototype, subsystem stress values are user-defined scenario inputs.

Each subsystem is assigned a normalized value between 0.00 and 1.00:

0.00–0.20 Stable

0.21–0.40 Watch

0.41–0.60 Stress

0.61–0.80 Severe Stress

0.81–1.00 Crisis

These values represent simulated pressure levels within the resilience model and are used to generate Risk, Impact, and Stability outputs.

Future versions may include automated scenario classification and event-driven stress assignment, allowing the system to derive subsystem values from predefined events and institutional stress templates.
Sextant Command Center v10 — Live Diagnostic
The Sextant Operations Console includes a real-time macro stress simulation and system resilience audit engine.
🔴 Live Diagnostic Console
Tap to open the active system:

👉https://123agustien.github.io/sextant-resilience-operations-console/

🧪 What it does
Runs macro stress scenarios (FX / BANK / LIQ / EQ / CONF)
Generates live system state (stability + pressure model)
Outputs automated risk / impact / stability scoring
🧠 Purpose
This module functions as a real-time resilience interpreter, mapping financial stress conditions into a structured system stability index for simulation and analysis.
🧪 Root Diagnostic Panel

Use the diagnostic page to verify runtime loading and deployment status.

Diagnostic URL:

https://123agustien.github.io/sextant-resilience-operations-console/diagnostic.html


Live Console (GitHub Pages)
This is your running upgraded system (simulator + dashboard + engine)
hthps://123agustien.github.io/sextant-self-generator/
Checks:

- RP-04 Engine
- Event Bus
- Orchestra Layer
- Scenario Runtime
- Live Frame Feed
- System State

Expected Status:

Engine: LOADED
Event Bus: LOADED
Orchestra: LOADED
Scenario: LOADED

Overview

Sextant Protocol is a strategic resilience simulation platform designed to support scenario analysis, systemic risk assessment, and operational decision support.

The platform enables governments, enterprises, critical infrastructure operators, and research institutions to simulate complex failure scenarios and evaluate system resilience under stress.

---

Core Architecture

1. RP-04 Engine (Simulation Core)

The RP-04 Engine serves as the single source of truth for all scenario execution.

Responsibilities:

- Execute scenario simulations
- Calculate systemic impacts
- Generate standardized simulation frames
- Maintain deterministic simulation outputs

Standard Frame:

{
  "rp04": {
    "stability": 0.82,
    "pressure": 0.28
  },
  "system": {
    "fx": 0.28,
    "bank": 0.23,
    "liq": 0.20,
    "eq": 0.18,
    "conf": 0.17
  },
  "state": "STABLE",
  "scenario": "normal",
  "timestamp": 1234567890
}

---

2. Audit Bridge (Verification Layer)

The Audit Bridge validates and interprets RP-04 simulation output.

Responsibilities:

- Receive simulation frames
- Generate audit assessments
- Produce risk scores
- Generate system grades
- Record execution history
- Support governance and review processes

Flow:

RP-04 Engine
→ Simulation Frame
→ Audit Bridge
→ Audit Report

---

3. Strategic Command Center

The Strategic Command Center provides the operational interface for scenario execution.

Capabilities:

- Scenario selection
- Risk dashboard visualization
- Executive briefing generation
- Audit review
- System monitoring
- Event stream analysis

Example scenarios:

- US–China Trade Escalation
- Taiwan Strait Crisis
- Semiconductor Supply Shock
- Energy Market Disruption
- Global Recession

---

4. System Self-Test Framework

Before scenario execution:

- RP-04 Engine validation
- Audit Bridge validation
- Dashboard validation
- Event pipeline validation

After scenario execution:

- Audit generation verification
- Dashboard synchronization verification
- Event logging verification
- System health verification

---

5. GitHub Pages Deployment

The platform is deployed through GitHub Pages.

Deployment Flow:

Repository
→ Main Branch
→ GitHub Pages
→ Live Strategic Command Center

Core deployment assets:

- index.html
- rp04-engine.js
- audit_bridge.js
- simulator/
- orchestration/

---

Operational Workflow

Scenario Selection
→ RP-04 Execution
→ Audit Generation
→ Dashboard Update
→ Executive Briefing
→ Audit Record

---

Mission

To provide a transparent, auditable, and extensible resilience intelligence platform capable of supporting strategic decision-making under uncertainty and systemic stress.

Sextant Protocol is designed as an operational framework for resilience analysis, scenario exploration, and institutional preparedness.

# 🌐 Sextant Protocol — Resilience Intelligence System

**Sextant Resilience Operations Console** is a real-time systems intelligence and resilience engineering framework designed for complex operational environments.

Resilience intelligence platform for failure-mode simulation, operational risk analysis, scenario modeling, and adaptive system orchestration.

It focuses on:

- Failure-mode simulation in interconnected systems  
- Operational risk and cascading system analysis  
- Scenario-based macro system modeling  
- Autonomous resilience and fallback orchestration  

---

## ⚡ Why this exists

Modern systems do not fail in isolation.

They fail through **cascading dependencies across multiple layers**.

Sextant Protocol models these interactions before real-world collapse occurs.

---

## 🚀 What this system does

- Simulates multi-layer system failures (S1–S5 resilience layers)
- Runs scenario-based stress testing of operational environments
- Visualizes instability before system breakdown
- Provides a command-style control interface for resilience analysis
- Supports macro-level system behavior modeling

---

## 🌍 Live System Access

- 🧠 Control Center  
  https://123agustien.github.io/sextant-resilience-operations-console/

- 🎯 Scenario Simulator  
  https://123agustien.github.io/sextant-resilience-operations-console/simulator.html

- 🛰 FX Risk Module  
  https://github.com/123AGustien/sextant-fx-dashboard

---

## 📂 Source Repository

Main System Repository:  
https://github.com/123AGustien/sextant-resilience-operations-console

---

## 🧭 System Positioning

Sextant Protocol is a **resilience intelligence system**, not a dashboard.

It is designed to model how complex systems fail before failure occurs.

## 🧠 Live Simulation Interfaces

### 🚀 Sextant Strategic Command Center (Audit + Failure Intelligence)
https://123agustien.github.io/sextant-resilience-operations-console/strategic-command-center/index.html

This is the **global failure analysis screen** for:
- US–China trade escalation
- Taiwan Strait crisis
- Semiconductor shock
- Energy disruption
- Global recession modeling

It provides:
- Risk Index
- Impact analysis
- Executive briefing
- System audit engine output

---

### ⚙️ Main Simulation Control Room
https://123agustien.github.io/sextant-resilience-operations-console/simulator.html

This is the **scenario execution layer** that triggers:
- Failure simulations
- Macro stress events
- System shock propagation

It feeds results into the Strategic Command Center via the audit pipeline.


---

## 🧠 Core Capabilities

- System-wide failure simulation
- Operational resilience mapping
- Multi-node dependency analysis
- Scenario-based predictive modeling
- Infrastructure stress testing logic

---

## 🏗 Architecture Overview

The system is structured into modular layers:

- `core_engine` — simulation and logic execution
- `cognitive_core` — decision and reasoning layer
- `backend` — operational API and processing
- `dashboard` — visualization and UI layer
- `simulator` — scenario execution engine
- `docs` — system documentation

---

## 📊 Current Platform Components

- Strategic Command Center  
- Scenario Intelligence Engine  
- Portfolio Risk Analysis Layer  
- Executive Intelligence Dashboard  
- FX Risk Simulation Module  
- Operational Resilience Framework  

---

## 🏷 Latest Release

- v4.0-stable-control-room  
https://github.com/123AGustien/sextant-resilience-operations-console/releases/tag/v4.0-stable-control-room

---

## 🌐 Extended Live Systems (v4)

- Control Room (Main Dashboard)  
  https://123agustien.github.io/sextant-resilience-operations-console/

- Scenario Simulator (S1–S5 Engine)  
  https://123agustien.github.io/sextant-resilience-operations-console/simulator.html

- v4 Global Macro Simulator  
  https://123agustien.github.io/sextant-resilience-operations-console/simulator-v4/

- FX Risk Dashboard  
  https://github.com/123AGustien/sextant-fx-dashboard

---

## 🗂 Related Repositories

- Core System  
  https://github.com/123AGustien/sextant-resilience-operations-console

- FX Module  
  https://github.com/123AGustien/sextant-fx-dashboard

---

## 🧭 Final Note

Sextant Protocol is built for environments where failure is not linear, but systemic.

It provides a structured way to simulate instability before it becomes reality.

🏷️ Repository Topics

- Resilience Engineering
- Operational Resilience
- Failure Mode Analysis
- Scenario Simulation
- Risk Analysis
- Complex Systems
- Systems Engineering
- Operational Intelligence
- Simulation Platform
- Decision Support
