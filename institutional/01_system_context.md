# System Context & Architecture Overview

---

## 1. Purpose of This Document

This document explains how the Sextant Operational Resilience Ecosystem is structured as a system-of-systems architecture.

It defines the roles, boundaries, and interactions between each component in the ecosystem.

---

## 2. System-of-Systems Structure

The ecosystem is composed of three primary layers:

### 🧠 1. Engine Layer (Core Computation System)

This layer is responsible for:

- Real-time resilience computation
- Failure simulation logic
- Telemetry and event processing
- Operational state tracking

It represents the **execution and intelligence layer** of the system.

Example repository:
https://github.com/123AGustien/sextant-resilience-operations-console

---

### 🧭 2. Control Layer (Index & Observability System)

This layer provides:

- System registry and mapping
- Visualisation of system relationships
- High-level operational overview
- Dashboard and navigation structure

It acts as the **control and observability interface**.

Example repository:
https://github.com/123AGustien/sextant-index-portal

---

### 🧾 3. Institutional Layer (Narrative & Evaluation Layer)

This layer provides:

- System explanation for external stakeholders
- Regulatory and institutional framing
- Risk and resilience narrative structure
- Pilot and evaluation documentation

It acts as the **communication and evaluation interface**.

---

## 3. Interaction Model Between Layers

The ecosystem operates in a structured flow:
