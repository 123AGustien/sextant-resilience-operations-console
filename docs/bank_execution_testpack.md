# 🧪 Bank-Grade Execution Test Pack (Deterministic Validation)

This document defines executable, reproducible API tests for engineering validation of the Sextant Resilience Platform.

It is designed for:
- SRE teams
- Infrastructure engineers
- Audit / compliance review
- Deterministic system validation

---

## 1. Health Check

### Request
```bash
curl -X GET http://localhost:8000/health
Expected Response

{
  "status": "healthy",
  "mode": "sandbox",
  "engine": "sextant-resilience-core",
  "determinism": true
}
Single Node Failure Simulation
Request
Expected Output
JSON
{
  "simulation_id": "sim-001",
  "state": "DEGRADED",
  "affected_nodes": ["auth-service"],
  "cascade": false,
  "recovery_time_ms": 1200,
  "audit_log": [
    "node_failure_detected",
    "isolation_triggered",
    "state_transition_DEGRADED"
  ]
}
3. Cascading Failure Simulation
Request
Bash
curl -X POST http://localhost:8000/simulate \
-H "Content-Type: application/json" \
-d '{
  "scenario": "cascade_failure",
  "entry_point": "payment-gateway",
  "depth": 3
}'
Expected Output
JSON
{
  "simulation_id": "sim-002",
  "state": "FAILED",
  "affected_nodes": [
    "payment-gateway",
    "ledger-service",
    "risk-engine"
  ],
  "cascade_detected": true,
  "system_state": "CRITICAL",
  "audit_log": [
    "entry_point_failure",
    "dependency_propagation",
    "multi_service_failure",
    "system_entered_FAILED_state"
  ]
}
4. Recovery Simulation
Request
Bash
curl -X POST http://localhost:8000/simulate \
-d '{
  "scenario": "recovery_test",
  "node": "ledger-service",
  "auto_heal": true
}'
Expected Output
JSON
{
  "state": "RECOVERED",
  "recovery_steps": [
    "checkpoint_restore",
    "dependency_relink",
    "state_verification"
  ],
  "recovery_time_ms": 3400
}
5. Determinism Rule (CRITICAL)
All outputs must obey:
Same input → same output
No randomness allowed
Same scenario → identical cascade path
Fully reproducible logs required
6. Success Criteria
System is valid only if:
All API calls execute successfully
All outputs match expected schema
Audit logs are consistent
Failure propagation is deterministic
No non-reproducible state exists
