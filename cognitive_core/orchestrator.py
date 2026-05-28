from .agent import SREAgent
from .memory import CognitiveMemory
from .config import AGENT_ROLES


class CognitiveOrchestrator:
    """
    Multi-agent cognitive fan-out orchestrator.
    Executes all SRE agents in parallel reasoning mode.
    """

    def __init__(self):
        self.memory = CognitiveMemory()
        self.agents = [
            SREAgent(role=role, memory=self.memory)
            for role in AGENT_ROLES
        ]

    def process_event(self, event: dict) -> dict:
        outputs = []

        for agent in self.agents:
            try:
                result = agent.act(event)
                outputs.append({
                    "agent": getattr(agent, "role", "unknown"),
                    "output": result
                })
            except Exception as e:
                outputs.append({
                    "agent": getattr(agent, "role", "unknown"),
                    "error": str(e)
                })

        self.memory.store(event, outputs)

        return {
            "event": event,
            "outputs": outputs,
            "memory_size": self.memory.size()
        }
