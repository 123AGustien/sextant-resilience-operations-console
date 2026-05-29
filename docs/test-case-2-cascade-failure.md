# 🧪 Sextant Test Case 2
## Cascade Failure — Deterministic Validation

**Classification:** Engineering Evidence  
**Purpose:** Validate multi-node failure propagation and system collapse behavior under deterministic execution.

---

# 🎯 Scenario Overview

This test validates how the system handles:

- Root node failure
- Dependency propagation
- Multi-service cascade impact
- Final system state transition

---

# ⚙️ Test Input

## Request

```json id="cascade_input_v1"
{
  "scenario": "cascade_failure",
  "root_node": "database",
  "failure_type": "latency_spike"
}

Expected API Response

{
  "simulation_id": "sim-002",
  "initial_state": "HEALTHY",
  "final_state": "FAILED",
  "affected_nodes": [
    "database",
    "api-gateway",
    "auth-service"
  ],
  "cascade_depth": 3,
  "deterministic": true

Expected Execution Logs

simulation started
failure injected: database
cascade propagation detected
node impacted: api-gateway
node impacted: auth-service
final state resolved: FAILED
audit snapshot stored


}
