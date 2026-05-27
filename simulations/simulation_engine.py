import time


class SimulationEngine:
    def __init__(self, resilience_engine, logger=None, delay: float = 0.1):
        self.engine = resilience_engine
        self.logger = logger
        self.delay = delay

    def run_scenario(self, scenario: dict):
        """
        Runs a simulated resilience scenario with step-by-step evaluation.
        """

        steps = scenario.get("steps", [])
        results = []

        for index, step in enumerate(steps):

            # simulate real-world timing variability
            time.sleep(self.delay)

            input_signal = {
                "risk": float(step.get("risk", 0.0)),
                "signal": step.get("signal", "SIMULATION"),
                "step_index": index
            }

            output = self.engine.evaluate(input_signal)

            record = {
                "step_index": index,
                "input": input_signal,
                "output": output
            }

            results.append(record)

            # structured audit logging
            if self.logger:
                self.logger.log_event("SIM_STEP", record)

        return {
            "scenario_name": scenario.get("name", "unnamed"),
            "total_steps": len(results),
            "results": results
        }
