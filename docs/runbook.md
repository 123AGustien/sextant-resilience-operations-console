# 🧭 Sextant Resilience Platform  
## Engineer Evaluation Runbook (Sandbox v1)

**Document Classification:** Internal Evaluation Guide  
**Purpose:** Controlled execution procedure for validating deterministic resilience simulation, CI/CD governance behavior, and audit logging within an isolated sandbox environment.

---

# 1. PURPOSE

This runbook defines a step-by-step procedure for engineers to:

- Clone Sextant repositories
- Build and run a local sandbox environment
- Execute resilience simulation workflows
- Trigger and evaluate Guard Layer CI logic (V4)
- Observe deterministic system behavior
- Review logs and audit outputs

This environment is strictly intended for **non-production evaluation and research purposes only**.

---

# 2. SYSTEM OVERVIEW

Sextant operates as a multi-repository deterministic resilience simulation framework composed of:

- Operations Console → Execution & orchestration layer  
- Orbital Resilience Framework → Simulation engine  
- Python Engine → Backend service foundation  
- Guard Layer (V4) → CI/CD governance and validation logic  

Together, these components enable controlled simulation of infrastructure failure and recovery behavior.

---

# 3. PREREQUISITES

Ensure the following tools are installed:

- Git
- Docker & Docker Compose
- Python 3.10+
- curl or Postman (API testing)
- GitHub CLI (optional for workflow testing)

---

# 4. REPOSITORY CLONE

```bash
git clone https://github.com/123AGustien/sextant-resilience-operations-console
git clone https://github.com/123AGustien/sextant-orbital-resilience-framework
git clone https://github.com/123AGustien/sextant-python-engine

# 5. 🏗️ SYSTEM BUILD & START

## Step 1 — Start Core System

From the Operations Console repository:

```bash
docker compose up --build
