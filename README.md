🧭 Sextant Resilience Platform (v1)

Deterministic infrastructure resilience simulation framework for testing system failure propagation, dependency breakdown, and recovery behavior in controlled environments.

---

## 🎯 Purpose

This system is designed for:

- SRE / Platform Engineering validation
- Infrastructure resilience testing
- CI/CD failure simulation
- Regulated system behavior analysis (FinTech / enterprise environments)

It provides a deterministic simulation environment for reproducible engineering evaluation.

---

## ⚙️ System Architecture

### 1. 🌐 Visual Simulation Layer (GitHub Pages)
Interactive control room UI running in browser:

👉 https://123agustien.github.io/sextant-resilience-operations-console/

Features:
- Node failure simulation
- Cascade failure simulation
- Deterministic UI-based outputs
- No installation required

---

### 2. 🧠 Offline Simulation Engine (Python)

Core logic implemented in Python modules:

- `cognitive_core/orchestrator.py`
- `cognitive_core/evidence_engine.py`
- `cognitive_core/replay_engine.py`

This engine runs locally using a Python runtime environment.

Recommended tool:
Pydroid 3

---

### 3. 🚫 Backend API (NOT IMPLEMENTED)

This project does NOT currently include:

- REST API server
- `/simulate` endpoint
- Docker deployment
- cloud backend execution

These are future expansion options.

---

## 🧪 Example Simulation Model

Input:

```json
{
  "scenario": "cascade_failure",
  "nodes": 5,
  "load": "high"
}
