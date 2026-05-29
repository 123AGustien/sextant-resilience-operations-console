# 🧪 Scenario 3 — Recovery Validation

## Sextant Resilience Platform (Bank Evaluation Pack)

## 🎯 Purpose

This scenario validates system recovery behavior following a controlled service degradation event.

The objective is to determine whether the platform can transition from a degraded state back to a healthy state in a deterministic and reproducible manner.

---

## ⚠️ Scenario Classification

- Severity: MEDIUM
- Type: Recovery Validation
- Environment: Sandbox Only
- Reproducibility: Required

---

## 📥 Input Payload

```json
{
  "scenario": "recovery_validation",
  "failed_nodes": 2,
  "recovery_mode": "controlled"
}
