class InstitutionState:
    def __init__(self):
        # Core resilience dimensions

        self.liquidity = 1.0
        self.latency = 1.0
        self.dependency_health = 1.0
        self.operational_capacity = 1.0

        # System-wide derived risk
        self.systemic_risk = 0.0

    def apply_shock(self, impact):
        """
        Applies external shock to institutional state
        """
        self.latency += impact.get("latency", 0)
        self.liquidity -= impact.get("liquidity", 0)

    def snapshot(self):
        """
        Returns deterministic state snapshot
        """
        return {
            "liquidity": self.liquidity,
            "latency": self.latency,
            "dependency_health": self.dependency_health,
            "operational_capacity": self.operational_capacity,
            "systemic_risk": self.systemic_risk
        }
