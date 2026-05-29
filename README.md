
# 🧭 Sextant Resilience Platform (Enterprise v1)

Deterministic infrastructure resilience simulation and governance evaluation framework for modeling system failure propagation, dependency analysis, and audit-grade operational resilience testing.

Built for:
- SRE / Platform Engineering teams
- Infrastructure resilience validation
- FinTech / regulated system testing
- CI/CD governance and reliability engineering

---

## ⚡ Evaluation Quick Start (Primary Entry Point)

Clone → Build → Run → Simulate → Observe Logs

```bash
git clone https://github.com/123AGustien/sextant-resilience-operations-console
cd sextant-resilience-operations-console
docker compose up --build
Then:
Run API locally
Trigger simulation endpoint
Observe deterministic outputs
Review logs and Guard Layer behavior
👉 Full execution steps: docs/runbook.md
🧠 What This System Does
Sextant simulates controlled infrastructure failure scenarios to evaluate:
Node failures
Cascading dependency breakdowns
System degradation states (HEALTHY → DEGRADED → FAILED)
Recovery behavior under deterministic execution
Audit-traceable simulation outputs
This enables reproducible resilience testing in isolated environments.
🔧 Core Capabilities
Deterministic simulation engine
Multi-node dependency modeling
Reproducible execution state machine
Audit-grade logging and traceability
CI/CD governance layer (Guard v4)
Sandbox-only execution environment
🛡️ Governance Layer (Guard v4)
Mode
Behavior
NORMAL
Logging + analysis
SAFE
Observation only
MAINTENANCE
Enforcement disabled
Purpose:
Prevent recursive CI failures
Enable controlled workflow evaluation
Support safe governance testing
👉 Policy: docs/v4-policy.md
🧭 System Architecture
Operations Console → API orchestration layer
Orbital Resilience Framework → Simulation engine
Python Engine → Backend service foundation
Together they form a deterministic resilience evaluation stack.
👉 Architecture: docs/architecture-v4.md
📡 API Interface
Key endpoints:
/simulate → failure propagation simulation
/health → system status check
All outputs are deterministic and replayable.
👉 API spec: docs/api.md
🧪 Test Scenarios
Single node failure
Cascading dependency collapse
System recovery simulation
Stress propagation modeling
👉 Scenarios: docs/scenarios.md
📘 Documentation
This repository includes structured engineering evaluation documentation:
📄 Runbook (Engineer Execution Guide)
docs/runbook.md
→ Step-by-step clone → build → run → simulate → log workflow
🛡️ Guard Policy (CI/CD Governance Rules)
docs/v4-policy.md
→ Defines SAFE / MAINTENANCE / NORMAL execution behavior
🧭 Architecture Overview
docs/architecture-v4.md
→ High-level system design and layer separation model
⚠️ System Boundary
This platform is strictly:
Sandbox execution only
Non-production evaluation environment
Deterministic simulation framework
Research / engineering validation tool
It does NOT:
Control production systems
Access external infrastructure
Provide enterprise SLAs
🧭 Repository Entry Point
Start here: https://github.com/123AGustien/sextant-resilience-operations-console

---

