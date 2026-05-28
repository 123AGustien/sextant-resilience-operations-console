# 🧪 Sextant Resilience Platform Test Scenarios

This document defines deterministic validation scenarios for infrastructure resilience simulation testing.

---

# Scenario 1 — Node Failure

## Input

```json
{
  "event": "node_failure",
  "node": "service_A"
}

#Scenario 2 — Cascading Failure
{
  "event": "cascade_failure",
  "severity": 0.9
}
