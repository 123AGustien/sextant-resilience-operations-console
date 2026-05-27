# 🧭 Sextant Resilience Platform

A real-time system resilience and failure-mode simulation engine with live risk scoring, validation layers, and streaming observability.

---

## ⚡ What it does

- Simulates system risk in real time
- Detects degraded / critical states
- Streams live updates via WebSocket
- Maintains full audit evidence logs
- Provides agent-based decision tracking

---

## 🧪 Live API Example

```bash
curl -X POST http://localhost:8000/evaluate \
-H "Content-Type: application/json" \
-d '{"risk":0.9,"signal":"CRITICAL"}'


---

# 🌐 Sextant Ecosystem — Connected Systems Layer

This repository is part of a broader distributed resilience intelligence ecosystem.

It is not a standalone system, but a node within a structured architecture of simulation, observability, and operational resilience tooling.

---

## 🧠 Core Systems

### 🧠 Resilience Engine (Core Simulation + Telemetry)
This system handles real-time computation, failure simulation, and telemetry streaming.

🔗 https://github.com/123AGustien/sextant-resilience-operations-console

---

### 🧭 Index / ORIP Platform (System Registry + Control Dashboard)
This system provides system mapping, registry control, and visual observability of the ecosystem.

🔗 https://github.com/123AGustien/sextant-index-portal

---

## 📊 Institutional Context

From an institutional perspective, this ecosystem is designed to support:

- Operational resilience modelling
- Infrastructure dependency visibility
- System degradation tracking (pre-failure state detection)
- Audit-ready event traceability structures

It aligns conceptually with enterprise resilience expectations commonly found in regulated financial environments.

---

## 🛰️ Deployment & Interfaces (Conceptual / Future Expansion)

- ORIP Dashboard (Live System View)
- Simulation Engine APIs (Backend telemetry layer)
- Future domain expansion layer (governance + institutional interfaces)

---

## ⚠️ Architectural Note

Each repository in this ecosystem represents a distinct system layer:

- Engine Layer → computation + simulation
- Control Layer → registry + observability
- Narrative Layer → institutional + external communication

Together they form a **system-of-systems resilience framework**, not a single application.
