from .agent import SREAgent
from .memory import CognitiveMemory
from .config import AGENT_ROLES


class CognitiveOrchestrator:
    def __init__(self):
        self.memory = CognitiveMemory()
        self.agents = [SREAgent(role, self.memory) for role in AGENT_ROLES]

    def process_event(self, event):
        outputs = []

        for agent in self.agents:
            outputs.append(agent.act(event))

        return {
            "event": event,
            "outputs": outputs,
            "memory_size": self.memory.size()
        }
