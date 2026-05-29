# 🧪 Scenario 2 — Cascading Failure Simulation
## Sextant Resilience Platform (Bank Evaluation Pack)

---

## 🎯 Purpose

This scenario validates **multi-service failure propagation** across dependent systems.

It is designed to simulate real-world banking infrastructure risk where a single failure spreads across multiple services.

---

## ⚠️ Scenario Classification

- Severity: HIGH
- Type: Dependency Cascade Failure
- Environment: Sandbox Only
- Reproducibility: Required

---

## 📥 Input Payload

```json id="cascade_input"
{
  "scenario": "cascade_failure",
  "nodes": 5,
  "intensity": "high"
}
