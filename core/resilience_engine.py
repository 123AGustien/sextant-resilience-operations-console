class ResilienceEngine:
    def __init__(self, logger=None):
        self.state = "STABLE"
        self.logger = logger

    def evaluate(self, input_signal: dict):

        risk = self._assess_risk(input_signal)

        if risk > 0.7:
            self.state = "DEGRADED"
            action = self._trigger_fallback(input_signal)
        else:
            self.state = "STABLE"
            action = "NO_ACTION_REQUIRED"

        output = {
            "state": self.state,
            "risk_score": risk,
            "action": action
        }

        # LOGGING STEP (IMPORTANT)
        if self.logger:
            self.logger.log_decision(input_signal, output)

        return output

    def _assess_risk(self, input_signal):
        return input_signal.get("risk", 0.0)

    def _trigger_fallback(self, input_signal):
        return "FALLBACK_WORKFLOW_INITIATED"
