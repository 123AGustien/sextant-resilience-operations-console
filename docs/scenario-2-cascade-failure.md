🧪 Scenario 2 — Cascading Failure Simulation

Sextant Resilience Platform (Bank Evaluation Pack)

🎯 Purpose

This scenario validates multi-service failure propagation across dependent systems.

It is designed to simulate real-world banking infrastructure risk where a single failure spreads across multiple services.

---

⚠️ Scenario Classification

- Severity: HIGH
- Type: Dependency Cascade Failure
- Environment: Sandbox Only
- Reproducibility: Required

---

📥 Input Payload

{
  "scenario": "cascade_failure",
  "nodes": 5,
  "intensity": "high"
}

---

⚙️ Execution Description

The system will:

1. Initialize a 5-node dependency graph
2. Inject a primary node failure
3. Propagate failure across dependent services
4. Evaluate system degradation state
5. Generate deterministic audit output

---

📊 Expected System Behavior

- Failure spreads from root node to dependent services
- Partial system degradation occurs
- Non-critical services remain stable
- Recovery logic is not triggered automatically

---

📤 Expected Output

{
  "status": "DEGRADED",
  "failed_nodes": 2,
  "impact_scope": "multi-service",
  "state_transition": "HEALTHY → DEGRADED",
  "affected_services": [
    "auth-service",
    "payment-router"
  ],
  "dependency_depth": 3,
  "deterministic": true,
  "audit_trace_id": "trace-cascade-002"
}

---

📌 Validation Rules

Engineers must verify:

- Same input produces identical output
- Failure propagation is consistent
- Dependency chain behavior is reproducible
- Audit trace ID is generated
- No external systems are involved

---

🛡️ Banking Relevance

This scenario models:

- Payment system cascade risk
- Authentication service dependency failure
- API gateway propagation failure
- Microservice chain instability

---

⚠️ Safety Boundary

This simulation:

- Does NOT affect real systems
- Does NOT connect to production APIs
- Runs only in an isolated sandbox
- Is deterministic and replayable

---

✅ Success Criteria

The scenario is considered successful when:

- Failure propagation behaves consistently across runs
- Deterministic outputs are generated
- Audit records are created
- Results are reproducible by independent evaluators
- No external dependencies are required

---

📎 Related Documents

- docs/runbook.md
- docs/evidence-pack.md
- docs/scenario-1-node-failure.md

---

✅ END OF SCENARIO 2
