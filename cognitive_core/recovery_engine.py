class RecoveryEngine:
    """
    Autonomous SRE recovery decision engine.
    Converts cognitive memory signals into actions.
    """

    def __init__(self, memory):
        self.memory = memory

    def evaluate(self) -> dict:
        """
        Evaluate system state and decide recovery action.
        """

        trend_data = self.memory.risk_trend()
        latest = self.memory.get_latest()

        if not latest:
            return {
                "action": "NO_OP",
                "reason": "No data in memory"
            }

        trend = trend_data["trend"]
        avg_risk = trend_data["average_risk"]
        latest_risk = trend_data["latest_risk"]

        # ---------------------------
        # 🧠 Decision Rules (SRE logic)
        # ---------------------------

        if latest_risk >= 0.9:
            return {
                "action": "EMERGENCY_FAILOVER",
                "reason": "Critical risk threshold exceeded",
                "risk": latest_risk
            }

        if trend == "degrading" and latest_risk > 0.7:
            return {
                "action": "SCALE_UP_RESOURCES",
                "reason": "System degrading trend detected",
                "risk": latest_risk
            }

        if trend == "recovering":
            return {
                "action": "STABILIZE_MONITOR",
                "reason": "System recovering",
                "risk": latest_risk
            }

        return {
            "action": "NO_OP",
            "reason": "System stable",
            "risk": latest_risk
        }
