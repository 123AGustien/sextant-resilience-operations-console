# core/validation_engine.py

class ValidationEngine:
    def __init__(self):
        self.validation_state = "READY"

    def validate(self, output: dict):

        issues = []

        # ---------------------------
        # STRUCTURE CHECK
        # ---------------------------
        if not isinstance(output, dict):
            return {
                "valid": False,
                "status": "FAILED",
                "issues": ["Output must be a dictionary"],
                "trace": output
            }

        # ---------------------------
        # SIMULATION BLOCK CHECK
        # ---------------------------
        if "simulation" not in output:
            issues.append("Missing simulation block")

        # ---------------------------
        # SYSTEM STATE CHECK
        # ---------------------------
        system_state = output.get("system_state", {})
        state = system_state.get("current")

        valid_states = ["HEALTHY", "DEGRADED", "CRITICAL"]

        if state and state not in valid_states:
            issues.append(f"Invalid state: {state}")

        # ---------------------------
        # IMPACT CHECK
        # ---------------------------
        impact = system_state.get("impact_level")
        valid_impacts = ["LOW", "MEDIUM", "HIGH"]

        if impact and impact not in valid_impacts:
            issues.append(f"Invalid impact_level: {impact}")

        # ---------------------------
        # AGENT CHECK
        # ---------------------------
        simulation = output.get("simulation", {})
        agents = simulation.get("agents_executed", [])

        if not isinstance(agents, list):
            issues.append("agents_executed must be a list")

        # ---------------------------
        # FINAL DECISION
        # ---------------------------
        is_valid = len(issues) == 0

        return {
            "valid": is_valid,
            "status": "APPROVED" if is_valid else "FAILED",
            "issues": issues,
            "trace": output
        }
