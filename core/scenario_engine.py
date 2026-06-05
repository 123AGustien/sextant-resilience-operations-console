/* =========================================================
   SEXTANT SCENARIO ENGINE v1 (STABLE + CONTROL ROOM READY)
========================================================= */

import time
import uuid

class ScenarioEngine:

    def __init__(self, engine, validator, agent, logger=None):
        self.engine = engine
        self.validator = validator
        self.agent = agent
        self.logger = logger

    def run(self, scenario: dict):

        results = []
        stress_series = []

        scenario_name = scenario.get("name", "unnamed")

        run_id = f"SCN-{scenario_name.upper().replace(' ', '-')}-{uuid.uuid4().hex[:8]}"

        for step in scenario.get("steps", []):

            try:
                input_signal = step.get("input", {})

                # ======================================================
                # ENGINE EXECUTION
                # ======================================================
                engine_result = self.engine.evaluate(input_signal)

                # ======================================================
                # VALIDATION LAYER (SAFE GUARD)
                # ======================================================
                validation = self.validator.validate(engine_result) if self.validator else {
                    "status": "SKIPPED"
                }

                # ======================================================
                # AGENT STEP
                # ======================================================
                agent_result = self.agent.step(input_signal) if self.agent else {
                    "status": "NO_AGENT"
                }

                # ======================================================
                # NORMALIZED STRESS EXTRACTION
                # ======================================================
                stress = self._extract_stress(engine_result)
                stress_series.append(stress)

                # ======================================================
                # STEP RECORD
                # ======================================================
                record = {
                    "input": input_signal,
                    "engine": engine_result,
                    "validation": validation,
                    "agent": agent_result,
                    "stress": stress,
                    "timestamp": time.time()
                }

                results.append(record)

                if self.logger:
                    self.logger.log_event("SCENARIO_STEP", record)

            except Exception as e:

                fallback_record = {
                    "input": step.get("input", {}),
                    "error": str(e),
                    "stress": 0,
                    "engine": None,
                    "validation": {"status": "FAILED"},
                    "agent": {"status": "FAILED"}
                }

                results.append(fallback_record)

                if self.logger:
                    self.logger.log_event("SCENARIO_ERROR", fallback_record)

        # ======================================================
        # SYSTEM STATE AGGREGATION
        # ======================================================
        avg_stress = sum(stress_series) / len(stress_series) if stress_series else 0

        system_state = self._map_state(avg_stress)

        return {
            "run_id": run_id,
            "scenario": scenario_name,
            "total_steps": len(results),
            "average_stress": avg_stress,
            "system_state": system_state,
            "results": results
        }

    # ======================================================
    # STRESS NORMALIZER
    # ======================================================
    def _extract_stress(self, engine_result):

        if not engine_result:
            return 0

        if isinstance(engine_result, dict):

            if "stress" in engine_result:
                return float(engine_result["stress"])

            if "pressure" in engine_result:
                return float(engine_result["pressure"])

            if "impact" in engine_result:
                return float(engine_result["impact"]) / 100

        return 0

    # ======================================================
    # STATE MAPPER
    # ======================================================
    def _map_state(self, stress):

        if stress > 0.75:
            return "RED"
        elif stress > 0.4:
            return "AMBER"
        else:
            return "GREEN"
