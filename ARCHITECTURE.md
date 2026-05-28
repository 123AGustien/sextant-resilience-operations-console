# 🏗 Sextant Resilience Platform Architecture

## Overview

Sextant Resilience Platform is a deterministic infrastructure resilience simulation system designed to model distributed system failures, dependency propagation, and recovery workflows.

The architecture is modular and separated into distinct operational layers for clarity, scalability, and auditability.

---

# Core Architecture Layers

## 1. API Layer

Handles all inbound requests and external integrations.

### Responsibilities
- Request validation
- Authentication
- Tier enforcement
- Simulation triggering
- Response formatting

### Technologies
- FastAPI
- REST API
- JSON interfaces

### Main Endpoints
- POST `/evaluate`
- GET `/memory`
- GET `/dashboard`

---

## 2. Cognitive Orchestrator Layer

Central execution engine coordinating all simulation agents.

### Responsibilities
- Multi-agent coordination
- Deterministic execution
- Failure propagation routing
- Simulation lifecycle management

### Current Agent Roles
- sre_agent
- dependency_agent
- recovery_agent

---

## 3. Agent Execution Layer

Executes specialized resilience analysis logic.

### Responsibilities
- Infrastructure state evaluation
- Dependency analysis
- Recovery strategy generation
- Risk interpretation

### Execution Model
Each agent independently evaluates the incoming event and returns structured outputs.

---

## 4. Cognitive Memory Layer

Persistent audit-grade event
