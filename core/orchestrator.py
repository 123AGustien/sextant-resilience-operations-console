from core.resilience_engine import ResilienceEngine
from core.validation_engine import ValidationEngine
from core.agent import ResilienceAgent


class Orchestrator:
    """
    Central control layer for Sextant Resilience System
    """

    def __init__(self, engine: ResilienceEngine, validator: ValidationEngine, agent: ResilienceAgent, logger=None):
        self.engine = engine
        self.validator = validator
        self.agent = agent
        self.logger = logger

        self.system_state = {
            "mode": "IDLE",
            "last_result": None,
            "last_validation": None,
            "agent_snapshot": None
        }

    def process(self, input_signal: dict):

        # -----------------------
        # 1. Engine evaluation
        # -----------------------
        result = self.engine.evaluate(input_signal)

        # -----------------------
        # 2. Validation layer
        # -----------------------
        validation = self.validator.validate(result)

        # -----------------------
        # 3. Agent step (memory + decision tracking)
        # -----------------------
        agent_output = self.agent.step(input_signal)

        # -----------------------
        # 4. Update system state
        # -----------------------
        self.system_state["mode"] = result.get("state", "UNKNOWN")
        self.system_state["last_result"] = result
        self.system_state["last_validation"] = validation
        self.system_state["agent_snapshot"] = agent_output

        # -----------------------
        # 5. Logging (evidence layer)
        # -----------------------
        if self.logger:
            self.logger.log_event("ORCHESTRATOR_STEP", {
                "input": input_signal,
                "result": result,
                "validation": validation,
                "agent": agent_output
            })

        # -----------------------
        # 6. Unified response
        # -----------------------
        return {
            "system_state": self.system_state,
            "resilience": result,
            "validation": validation,
            "agent": agent_output
        }

    def snapshot(self):
        return self.system_state
