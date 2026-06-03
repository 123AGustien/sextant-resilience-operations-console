from typing import Dict, Any, List


class CognitiveOrchestrator:
    """
    Deterministic resilience simulation engine.
    Stateful multi-agent system for cascade simulation.
    """

    def __init__(self):
        self.state = "HEALTHY"
        self.previous_state = None
        self.memory: List[Dict[str, Any]] = []

    # -----------------------------
    # MAIN ENTRY
    # -----------------------------
    def evaluate(self, event: Dict[str, Any]) -> Dict[str, Any]:

        event_type = event["type"]
        node = event.get("node", "unknown")

        self.previous_state = self.state

        # -----------------------------
        # STATE TRANSITION LOGIC
        # -----------------------------
        if event_type == "node_failure":
            self.state = "DEGRADED"
            agents = self._run_agents(node, failure=True)

        elif event_type == "cascade_failure":
            self.state = "CRITICAL"
            agents = self._run_agents(node, failure=True, cascade=True)

        else:
            self.state = "HEALTHY"
            agents = [{"name": "noop_agent", "result": "NO_ACTION"}]

        # -----------------------------
        # RESPONSE BUILD
        # -----------------------------
        result = {
            "event": event,
            "simulation": {
                "status": "completed",
                "mode": "deterministic",
                "agents_executed": agents
            },
            "system_state": {
                "current": self.state,
                "previous": self.previous_state,
                "impact_level": self._impact_level()
            }
        }

        # -----------------------------
        # AUDIT MEMORY
        # -----------------------------
        self.memory.append(result)

        return result

    # -----------------------------
    # AGENT LAYER
    # -----------------------------
    def _run_agents(self, node: str, failure: bool = False, cascade: bool = False):

        return [
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

    # -----------------------------
    # IMPACT LOGIC
    # -----------------------------
    def _impact_level(self):

        if self.state == "HEALTHY":
            return "LOW"
        elif self.state == "DEGRADED":
            return "MEDIUM"
        return "HIGH"
