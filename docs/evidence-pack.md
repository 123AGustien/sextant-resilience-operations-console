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
