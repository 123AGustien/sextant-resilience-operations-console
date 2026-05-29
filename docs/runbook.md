# 🧭 Sextant Resilience Platform
## Engineer Evaluation Runbook (Sandbox v1)

---

## 📘 Document Classification
Internal Evaluation Guide

---

## 🎯 Purpose

This runbook defines a deterministic execution procedure for:

- System setup via Docker
- Resilience simulation execution
- CI/CD governance validation (Guard v4)
- Audit log verification
- Failure scenario testing

This is a **sandbox-only engineering validation system**.

---

## ⚠️ System Boundary

This system does NOT:

- Interact with production banking systems
- Access external infrastructure
- Execute financial transactions
- Store persistent production data

It is strictly a deterministic simulation environment.

---

## 🧰 1. Prerequisites

Install:

- Git
- Docker + Docker Compose
- Python 3.10+ (optional)
- curl or Postman

---

## 📥 2. Clone Repository

```bash
git clone https://github.com/123AGustien/sextant-resilience-operations-console
