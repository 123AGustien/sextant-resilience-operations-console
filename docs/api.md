Paste:

```md id="api_full"
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
