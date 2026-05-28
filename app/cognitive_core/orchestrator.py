from typing import Dict, Any


class CognitiveOrchestrator:
    """
    Deterministic resilience simulation engine.
    """

    def __init__(self):
        self.state = "HEALTHY"
        self.memory = []

    def evaluate(self, event: Dict[str, Any]) -> Dict[str, Any]:
        event_type = event.get("type", event.get("event"))
        node = event.get("node", "unknown")

        # 1. State transition logic
        if event_type == "node_failure":
            self.state = "DEGRADED"
            agents = self._run_agents(node, failure=True)

        elif event_type == "cascade_failure":
            self.state = "CRITICAL"
            agents = self._run_agents(node, failure=True, cascade=True)

        else:
            self.state = "HEALTHY"
            agents = [{"name": "noop_agent", "result": "NO_ACTION"}]

        # 2. Build deterministic response
        result = {
            "event": event,
            "simulation": {
                "status": "completed",
                "mode": "deterministic",
                "agents_executed": agents
            },
            "system_state": {
                "current": self.state,
                "previous": "HEALTHY",
                "impact_level": self._impact_level()
            }
        }

        # 3. store memory (audit-style)
        self.memory.append(result)

        return result

    def _run_agents(self, node: str, failure: bool = False, cascade: bool = False):
        agents = [
            {
                "name": "sre_agent",
                "result": "DEGRADED_STATE_DETECTED" if failure else "OK"
            },
            {
                "name": "dependency_agent",
                "result": "CASCADE_ANALYSIS_COMPLETE" if cascade else "DEPENDENCY_STABLE"
            },
            {
                "name": "recovery_agent",
                "result": "RECOVERY_STRATEGY_IDENTIFIED" if failure else "NO_ACTION_REQUIRED"
            }
        ]
        return agents

    def _impact_level(self):
        if self.state == "HEALTHY":
            return "LOW"
        if self.state == "DEGRADED":
            return "MEDIUM"
        return "HIGH"
