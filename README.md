# 🧭 Sextant Resilience Platform

A real-time system resilience and failure-mode simulation engine with live risk scoring, validation layers, and streaming observability.

---

## ⚡ What it does

- Simulates system risk in real time
- Detects degraded / critical states
- Streams live updates via WebSocket
- Maintains full audit evidence logs
- Provides agent-based decision tracking

---

## 🧪 Live API Example

```bash
curl -X POST http://localhost:8000/evaluate \
-H "Content-Type: application/json" \
-d '{"risk":0.9,"signal":"CRITICAL"}'
