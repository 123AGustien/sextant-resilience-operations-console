class SREAgent:
    def __init__(self, role, memory):
        self.role = role
        self.memory = memory

    def act(self, event):
        output = {
            "role": self.role,
            "input": event,
            "decision": f"{self.role}_analysis",
            "confidence": 0.8
        }

        self.memory.write(output)
        return output
