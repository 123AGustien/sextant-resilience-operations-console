

## 📘 Documentation

This repository includes structured engineering evaluation documentation:

- 📄 Runbook (Engineer Execution Guide)  
  `docs/runbook.md`  
  → Step-by-step clone → build → run → simulate → log workflow

- 🛡️ Guard Policy (CI/CD Governance Rules)  
  `docs/v4-policy.md`  
  → Defines SAFE / MAINTENANCE / NORMAL execution behavior

- 🧭 Architecture Overview  
  `docs/architecture-v4.md`  
  → High-level system design and layer separation model

---

## 🔧 Evaluation Quick Start

Clone → Build → Run → Simulate → Observe Logs

Full execution steps: `docs/runbook.md`
# 🧭 Sextant Resilience Platform (Enterprise v1)

Deterministic infrastructure resilience simulation API for failure modeling, dependency analysis, and system recovery validation.

Built for:
- SRE teams
- Infrastructure engineers
- FinTech / regulated system validation

---

## ⚡ What this system does

Sextant Resilience Platform simulates infrastructure failure scenarios in a deterministic way to evaluate:

- Node failures
- Cascading dependency breakdowns
- System degradation states
- Recovery behavior under controlled conditions

It provides reproducible outputs for engineering validation and resilience testing.

---

## 🔌 Core Capability

- Deterministic simulation engine
- Multi-agent evaluation model
- System state tracking (HEALTHY → DEGRADED → FAILED)
- Audit-grade execution memory
- Reproducible API responses

---

## 📡 API Documentation

Full API specification:

👉 `docs/api.md`

---

## 🧪 Test Scenarios

Validation cases:

👉 `docs/scenarios.md`

---

## 🚀 Quick Start

```bash
git clone https://github.com/123AGustien/sextant-resilience-operations-console
cd sextant-resilience-operations-console
docker compose up --build
