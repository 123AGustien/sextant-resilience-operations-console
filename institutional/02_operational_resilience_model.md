
# Operational Resilience Model

---

## 1. Purpose of This Model

This document defines how the Sextant Operational Resilience Ecosystem conceptualises system resilience, degradation, and recovery.

It provides a structured model for understanding how complex infrastructure behaves under stress conditions.

---

## 2. Core Concept of Operational Resilience

Operational resilience is defined here as:

> The ability of interconnected systems to continue delivering critical functions despite degradation, partial failure, or disruption within supporting components.

This definition focuses on **system behaviour under stress**, not just system uptime.

---

## 3. Fundamental Assumption

Traditional systems assume:

- Systems are either “working” or “failed”

This model assumes:

- Systems degrade gradually
- Failures propagate through dependencies
- Partial failures are the most common state

---

## 4. Degradation Model

System behaviour is modelled across four states:

### 🟢 Healthy State
- All dependencies functional
- Normal system performance
- No observable stress indicators

### 🟡 Degraded State
- Minor performance reduction
- One or more dependencies under stress
- Increased latency or reduced efficiency

### 🟠 At-Risk State
- Multiple dependencies affected
- Cascading stress signals detected
- Increased probability of systemic failure

### 🔴 Failure State
- Critical function disruption
- Cascading dependency breakdown
- Loss of service continuity

---

## 5. Failure Propagation Model

Failures do not occur in isolation.

Instead, they propagate through dependency chains:
