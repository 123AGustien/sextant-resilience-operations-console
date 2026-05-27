import random
import time

class SimulationEngine:
    def __init__(self, resilience_engine, logger=None):
        self.engine = resilience_engine
        self.logger = logger

    def run_scenario(self, scenario: dict):

        """
        Runs a simulated resilience scenario.
        """

        steps = scenario.get("steps", [])
        results = []

        for step in steps:

            # simulate delay (real-world system behavior)
            time.sleep(0.1)

            input_signal = {
                "risk": step.get("risk", 0.0),
                "signal": step.get("signal", "SIMULATION")
            }

            result = self.engine.evaluate(input_signal)

            results.append({
                "input": input_signal,
                "output": result
            })

            if self.logger:
                self.logger.log_event("SIM_STEP", {
                    "input": input_signal,
                    "output": result
                })

        return {
            "scenario_name": scenario.get("name", "unnamed"),
            "results": results
        }
