from copy import deepcopy

from core.resilience_engine import ResilienceEngine
from core.validation_engine import ValidationEngine
from core.agent import ResilienceAgent


class Orchestrator:
    """
    SINGLE BRAIN CONTROL LAYER (Step 6)

    Owns system decisions, state, and trace consistency.
    """

    def __init__(
        self,
        engine: ResilienceEngine,
        validator: ValidationEngine,
        agent: ResilienceAgent,
        logger=None
    ):
        self.engine = engine
        self.validator = validator
        self.agent = agent
        self.logger = logger

        self.system_state = {
            "mode": "IDLE",
            "last_risk": 0.0,
            "last_state": "UNKNOWN",
            "last_action": None
        }

    def process(self, input_signal: dict):

        # -----------------------
        # 1. ENGINE EVALUATION
        # -----------------------
        result = self.engine.evaluate(input_signal)

        # -----------------------
        # 2. VALIDATION LAYER
        # -----------------------
        validation = self.validator.validate(result)

        # -----------------------
        # 3. AGENT STEP (memory tracking)
        # -----------------------
        agent_output = self.agent.step(input_signal)

        # -----------------------
        # 4. SAFE STATE UPDATE (NO MUTATION BUGS)
        # -----------------------
        self.system_state.update({
            "mode": result.get("state", "UNKNOWN"),
            "last_risk": result.get("risk_score", 0.0),
            "last_state": result.get("state", "UNKNOWN"),
            "last_action": result.get("action", None)
        })

        # -----------------------
        # 5. LOGGING (FULL TRACEABILITY)
        # -----------------------
        if self.logger:
            self.logger.log_event("ORCHESTRATOR_STEP", {
                "input": input_signal,
                "result": result,
                "validation": validation,
                "agent": agent_output
            })

        # -----------------------
        # 6. FINAL RESPONSE (IMMUTABLE OUTPUT)
        # -----------------------
        return {
            "system_state": deepcopy(self.system_state),
            "resilience": result,
            "validation": validation,
            "agent": agent_output
        }

    def snapshot(self):
        return deepcopy(self.system_state)
