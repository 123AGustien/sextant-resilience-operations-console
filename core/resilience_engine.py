class ResilienceEngine:
    def __init__(self, logger=None):
        self.state = "STABLE"
        self.logger = logger
        self.threshold = 0.7

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

        # Evidence logging (safe check)
        if self.logger:
            try:
                self.logger.log_event("RESILIENCE_EVAL", {
                    "input": input_signal,
                    "output": output
                })
            except:
                pass

        return output

    def _assess_risk(self, input_signal: dict):
        return float(input_signal.get("risk", 0.0))

    def _trigger_fallback(self, input_signal: dict):
        return "FALLBACK_WORKFLOW_INITIATED"
