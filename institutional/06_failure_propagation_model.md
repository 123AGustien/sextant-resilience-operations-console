# Failure Propagation Model

## 1. Overview
This model defines how failures propagate through interconnected systems within the Sextant Resilience Platform.

## 2. Core Principle
Failures do not occur in isolation. They propagate through dependency chains and amplify across weakly coupled systems.

## 3. Propagation Behaviour
A failure typically follows this pattern:

- Local degradation begins in one subsystem  
- Dependency stress increases in connected components  
- Secondary systems begin to degrade  
- Cascading failure emerges across the network  

## 4. Key Observation
The earliest indicator of system failure is not collapse, but **degradation in dependent services**.

## 5. Detection Mechanisms
The system identifies propagation using:

- Latency increase across services  
- Error rate clustering  
- Dependency mapping graphs  
- Real-time telemetry streams  

## 6. Containment Strategy
To reduce propagation impact:

- Isolate failing nodes  
- Break dependency chains where possible  
- Trigger fallback simulation modes  
- Activate resilience routing logic  

## 7. Institutional Interpretation
This model supports:

- Financial infrastructure risk modelling  
- Systemic dependency mapping  
- Pre-failure detection in regulated environments  
- Operational continuity planning  

## 8. Summary
Failure propagation is a systemic phenomenon, not a single-event failure. Understanding dependency structure is essential for resilience.
