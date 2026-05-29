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
