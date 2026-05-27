class ScenarioRunner:
    def __init__(self, engine, validator, agent, logger=None):
        self.engine = engine
        self.validator = validator
        self.agent = agent
        self.logger = logger

    def run(self, scenario: dict):

        results = []

        for step in scenario.get("steps", []):

            input_signal = step["input"]

            engine_result = self.engine.evaluate(input_signal)
            validation = self.validator.validate(engine_result)
            agent_result = self.agent.step(input_signal)

            record = {
                "input": input_signal,
                "engine": engine_result,
                "validation": validation,
                "agent": agent_result
            }

            results.append(record)

            if self.logger:
                self.logger.log_event("SCENARIO_STEP", record)

        return {
            "scenario_name": scenario.get("name", "unnamed"),
            "results": results
        }
