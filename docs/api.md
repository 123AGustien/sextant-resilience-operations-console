# 🔌 API Documentation

## POST `/evaluate`

Simulates a resilience event across infrastructure.

---

## 📥 Request

```json
{
  "event": "node_failure",
  "node": "service_A"
}
📤 Response
JSON
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
📚 Example
JSON
{
  "event": "cascade_failure",
  "severity": 0.9
}
🔐 Authentication

x-api-key: free-tier-key | pro-tier-key
🚀 cURL Example
Bash
curl -X POST http://localhost:8000/evaluate \
-H "Content-Type: application/json" \
-H "x-api-key: free-tier-key" \
-d '{
  "event": "node_failure",
  "node": "service_A"
}'
