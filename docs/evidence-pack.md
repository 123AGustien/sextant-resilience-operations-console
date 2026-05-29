# 🧾 Sextant Evidence Pack
## Deterministic Execution Proof (Bank Evaluation Standard)

This document defines expected outputs, logs, and validation artifacts for institutional review.

---

# 🎯 Purpose

To provide verifiable proof that:

- Simulation outputs are deterministic
- Failure propagation is reproducible
- System state transitions are consistent
- Logs match execution behavior

---

# 🧪 Test Case 1 — Single Node Failure

## Request

```json
{
  "scenario": "single_node_failure",
  "node": "auth-service",
  "failure_type": "crash"
}


{

Expected Response
  "simulation_id": "sim-001",
  "initial_state": "HEALTHY",
  "final_state": "DEGRADED",
  "affected_nodes": ["auth-service"],
  "cascade_triggered": false,
  "deterministic": true
}


Expected Logs

simulation started
node failure injected: auth-service
dependency graph evaluated
no cascade triggered
final state: DEGRADED
audit snapshot stored
