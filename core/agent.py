import time
from core.resilience_engine import ResilienceEngine
from core.validation_engine import ValidationEngine


class ResilienceAgent:
    def __init__(self, engine: ResilienceEngine, validator: ValidationEngine, logger=None):
        self.engine = engine
        self.validator = validator
        self.logger = logger

        self.running = False
        self.state_memory = {
            "last_state": None,
            "last_risk": None,
            "events": []
        }

    def step(self, input_signal: dict):

        # 1. Evaluate
        result = self.engine.evaluate(input_signal)

        # 2. Validate
        validation = self.validator.validate(result)

        # 3. Update memory
        self.state_memory["last_state"] = result["state"]
        self.state_memory["last_risk"] = result["risk_score"]
        self.state_memory["events"].append({
            "input": input_signal,
            "result": result,
            "validation": validation
        })

        # 4. Log event
        if self.logger:
            self.logger.log_event("AGENT_STEP", {
                "input": input_signal,
                "result": result,
                "validation": validation
            })

        return {
            "result": result,
            "validation": validation,
            "memory": self.state_memory
        }

    def run_loop(self, input_stream, interval: float = 1.0, max_steps: int = 10):

        """
        Continuous agent execution loop (simulation mode)
        """

        self.running = True
        outputs = []

        for i, signal in enumerate(input_stream):

            if not self.running or i >= max_steps:
                break

            output = self.step(signal)
            outputs.append(output)

            time.sleep(interval)

        return {
            "status": "STOPPED",
            "trace": outputs
        }

    def stop(self):
        self.running = False
