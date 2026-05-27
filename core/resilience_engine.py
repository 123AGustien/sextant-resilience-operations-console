class ResilienceEngine:
    def __init__(self, logger=None, threshold: float = 0.7):
        self.state = "STABLE"
        self.logger = logger
        self.threshold = threshold

    def evaluate(self, input_signal: dict):

        risk = self._assess_risk(input_signal)

        if risk > self.threshold:
            self.state = "DEGRADED"
            action = self._trigger_fallback(input_signal)
        else:
            self.state = "STABLE"
            action = "NO_ACTION_REQUIRED"

        output = {
            "state": self.state,
            "risk_score": risk,
            "threshold": self.threshold,
            "action": action
        }

        # Structured audit logging
        if self.logger:
            self.logger.log_decision(input_signal, output)

        return output

    def _assess_risk(self, input_signal: dict) -> float:
        return float(input_signal.get("risk", 0.0))

    def _trigger_fallback(self, input_signal: dict) -> str:
        return "FALLBACK_WORKFLOW_INITIATED"
