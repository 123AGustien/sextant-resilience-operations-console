# 🧭 Sextant Resilience Platform (Enterprise v1)

Deterministic infrastructure resilience simulation API for failure modeling, dependency analysis, and system recovery validation.

Built for:
- SRE teams
- Infrastructure engineers
- FinTech / regulated system validation

---

## ⚡ Overview

Sextant Resilience Platform is a multi-agent deterministic simulation engine that evaluates infrastructure failure scenarios, tracks system state transitions, and maintains an audit-grade memory of all executions.

It models distributed system behavior under stress conditions such as:
- node failures
- cascading dependency breakdowns
- degraded system states
- recovery scenarios

---

## 🔌 API Contract (Production Interface)

### POST `/evaluate`

Simulates a resilience event across the system.

#### Request
```json
{
  "event": "node_failure",
  "node": "service_A"
}
