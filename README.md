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

{
  "event": {
    "type": "node_failure",
    "node": "service_A"
  },
  "simulation": {
    "status": "completed",
    "mode": "deterministic",
    "agents_executed": [
      {
        "name": "sre_agent",
        "result": "DEGRADED_STATE_DETECTED"
      },
      {
        "name": "dependency_agent",
        "result": "CASCADE_ANALYSIS_COMPLETE"
      },
      {
        "name": "recovery_agent",
        "result": "RECOVERY_STRATEGY_IDENTIFIED"
      }
    ]
  },
  "system_state": {
    "current": "DEGRADED",
    "previous": "HEALTHY",
    "impact_level": "MEDIUM"
  },
  "memory": {
    "recorded": true,
    "memory_size": 12,
    "retention_mode": "audit_grade"
  },
  "access": {
    "tier": "free",
    "limits": {
      "memory_visibility": "restricted",
      "history_depth": 5
    }
  }
}


[
  {
    "event": {
      "type": "node_failure",
      "node": "service_A"
    },
    "simulation": {
      "status": "completed",
      "agents_executed": [
        {
          "name": "sre_agent",
          "result": "DEGRADED_STATE_DETECTED"
        }
      ]
    }
  }
]

x-api-key: free-tier-key | pro-tier-key

git clone https://github.com/123AGustien/sextant-resilience-operations-console
cd sextant-resilience-operations-console
docker compose up --build

curl -X POST http://localhost:8000/evaluate \
-H "Content-Type: application/json" \
-H "x-api-key: free-tier-key" \
-d '{
  "event": "node_failure",
  "node": "service_A"
}'

{
  "event": "node_failure",
  "node": "service_A"
}

{
  "event": "cascade_failure",
  "severity": 0.9
}
