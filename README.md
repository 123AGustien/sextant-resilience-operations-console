# 🧭 Sextant Control Room

## Operational Resilience Simulation & Audit Evidence Engine

A deterministic browser-based simulation system for modeling infrastructure failures, cascade propagation, risk scoring, and regulatory-style audit reporting.

---

## 🚀 Live Demo

👉 https://123agustien.github.io/sextant-resilience-operations-console/

---

## 🎬 How to Use (Institutional Demo Flow)

Click:

👉 Run Institutional Demo

The system will automatically simulate:

1. Healthy system state
2. Core banking failure injection
3. Cascade failure across dependent systems
4. Risk score calculation (0–100)
5. Audit report generation (JSON structured output)

---

## 📊 Core Capabilities

### ✔ Dependency Simulation
Models relationships between core banking, payment, and mobile services.

### ✔ Cascade Failure Engine
Simulates how a single failure propagates through dependent systems.

### ✔ Risk Scoring Engine
Quantifies system impact on a 0–100 scale:
- Low (0–29)
- Medium (30–59)
- High (60–84)
- Critical (85–100)

### ✔ Audit Evidence Generator
Produces structured incident reports including:
- Scenario ID
- Timestamp
- System state
- Node-level impact
- Risk classification
- Interpretation summary

---

## 🧠 Example Output

```json
{
  "reportId": "DEMO-12345",
  "timestamp": "2026-06-03T...",
  "systemState": "CRITICAL",
  "riskScore": 85,
  "riskLevel": "CRITICAL",
  "interpretation": "System-wide cascading failure across core banking infrastructure."
}
