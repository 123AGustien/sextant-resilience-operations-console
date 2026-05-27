class ValidationEngine:
    def __init__(self):
        self.validation_state = "READY"

    def validate(self, output: dict):

        issues = []

        # Required fields check
        required_fields = ["state", "risk_score", "action"]

        for field in required_fields:
            if field not in output:
                issues.append(f"Missing field: {field}")

        # Type safety checks
        if "risk_score" in output:
            risk = output["risk_score"]

            if not isinstance(risk, (int, float)):
                issues.append("risk_score must be numeric")
            elif risk < 0 or risk > 1:
                issues.append("risk_score out of bounds (0–1)")

        # State validation
        valid_states = ["STABLE", "DEGRADED"]
        if "state" in output and output["state"] not in valid_states:
            issues.append(f"Invalid state: {output.get('state')}")

        # Final decision
        is_valid = len(issues) == 0

        return {
            "valid": is_valid,
            "status": "APPROVED" if is_valid else "FAILED",
            "issues": issues,
            "trace": output
        }
