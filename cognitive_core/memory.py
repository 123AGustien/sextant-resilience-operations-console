class CognitiveMemory:
    """
    Cognitive memory engine for multi-agent SRE system.
    Stores event + agent outputs for audit and learning.
    """

    def __init__(self):
        self._store = []

    def store(self, event: dict, outputs: list):
        entry = {
            "event": event,
            "outputs": outputs,
            "risk": event.get("risk", 0.0),
            "signal": event.get("signal", "UNKNOWN")
        }
        self._store.append(entry)

    def size(self) -> int:
        return len(self._store)

    def get_all(self) -> list:
        return self._store

    def get_latest(self):
        return self._store[-1] if self._store else None

    def clear(self):
        self._store = []

    # -----------------------------------
    # 🧠 NEW: Cognitive Intelligence Layer
    # -----------------------------------

    def risk_trend(self) -> dict:
        """
        Basic risk evolution analysis.
        """

        if not self._store:
            return {
                "trend": "stable",
                "average_risk": 0.0,
                "samples": 0
            }

        risks = [e["risk"] for e in self._store]

        avg = sum(risks) / len(risks)
        latest = risks[-1]

        if latest > avg and latest > 0.7:
            trend = "degrading"
        elif latest < avg:
            trend = "recovering"
        else:
            trend = "stable"

        return {
            "trend": trend,
            "average_risk": avg,
            "latest_risk": latest,
            "samples": len(risks)
        }

    def signal_distribution(self) -> dict:
        """
        Shows frequency of system signals (CRITICAL, OK, etc).
        """

        distribution = {}

        for entry in self._store:
            signal = entry.get("signal", "UNKNOWN")
            distribution[signal] = distribution.get(signal, 0) + 1

        return distribution
