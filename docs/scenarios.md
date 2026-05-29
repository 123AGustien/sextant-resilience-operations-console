# 🧪 Sextant Resilience Platform
## Scenario Test Suite (Bank Evaluation Pack v1)

---

## 🎯 Purpose

This document defines deterministic failure simulation scenarios used to evaluate:

- Infrastructure resilience
- Service dependency failure propagation
- Recovery behavior
- Audit-grade reproducibility

This is designed for **enterprise / banking system validation environments**.

---

## ⚠️ Execution Principle

All scenarios must be:

- Deterministic (same input → same output)
- Reproducible
- Isolated (sandbox only)
- Traceable via audit ID

---

# 🧪 SCENARIO 1 — SINGLE NODE FAILURE

## Description
Simulates failure of a single compute node in the system.

## Input Payload

```json
{
  "scenario": "single_node_failure",
  "nodes": 1,
  "intensity": "low"
}

Expected Output
JSON
{
  "status": "DEGRADED",
  "failed_nodes": 1,
  "impact_scope": "local",
  "services_affected": ["single-service"],
  "deterministic": true,
  "audit_trace_id": "trace-node-001"
}
