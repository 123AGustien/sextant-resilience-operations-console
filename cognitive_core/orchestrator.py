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
        """
        Main cognitive execution loop:
        1. Broadcast event to all agents
        2. Collect outputs
        3. Store in cognitive memory
        4. Return structured audit response
        """

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

        # 🧠 Cognitive persistence layer
        self.memory.store(event, outputs)

        return {
            "event": event,
            "outputs": outputs,
            "memory_size": self.memory.size(),
            "status": "processed"
        }
