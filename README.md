# 🧭 Sextant Resilience Platform (Enterprise v1)

Deterministic infrastructure resilience simulation API for failure modeling, dependency analysis, and system recovery validation.

Built for:
- SRE teams
- Infrastructure engineers
- FinTech / regulated system validation

---

## 🔌 API Contract (Production Interface)

### POST /evaluate

**Request**
```json
{
  "event": "node_failure",
  "node": "service_A"
}
