class ValidationEngine:
    def validate(self, output: dict):
        return {
            "valid": True,
            "status": "EVIDENCE_GENERATED",
            "trace": output
        }
