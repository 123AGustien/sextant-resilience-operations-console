from cognitive_core import CognitiveOrchestrator

core = CognitiveOrchestrator()

event = {
    "type": "incident",
    "service": "api-gateway",
    "severity": 0.9,
    "signal": "CRITICAL"
}

result = core.process_event(event)

print(result)
