from phase8.network.graph_builder import InstitutionalGraph


class RegulatoryEngine:
    """
    Phase 8.2 Institutional Realism Layer.
    Simulates central bank + regulatory response.
    """

    def __init__(self, graph: InstitutionalGraph):
        self.graph = graph
        self.interventions = []

    # -------------------------
    # SYSTEM STRESS SCAN
    # -------------------------
    def scan_system(self):

        total_risk = 0
        critical_nodes = 0

        for node in self.graph.nodes.values():
            total_risk += node.risk_exposure

            if node.state == "CRITICAL":
                critical_nodes += 1

        avg_risk = total_risk / max(len(self.graph.nodes), 1)

        return {
            "avg_risk": avg_risk,
            "critical_nodes": critical_nodes
        }

    # -------------------------
    # POLICY RESPONSE ENGINE
    # -------------------------
    def apply_policy(self):

        scan = self.scan_system()

        avg_risk = scan["avg_risk"]
        critical_nodes = scan["critical_nodes"]

        # 🏦 Central Bank Liquidity Injection
        if avg_risk > 0.6:

            for node in self.graph.nodes.values():
                node.health_score += 0.05
                node.risk_exposure *= 0.95

            self.interventions.append({
                "type": "LIQUIDITY_INJECTION",
                "effect": "system_wide_stabilization",
                "magnitude": 0.05
            })

        # ⚠️ Emergency Capital Controls
        if critical_nodes >= 2:

            for node in self.graph.nodes.values():
                node.risk_exposure *= 0.9

            self.interventions.append({
                "type": "CAPITAL_CONTROL",
                "effect": "risk_suppression",
                "severity": "high"
            })

        # 🧊 System Cooling (macroprudential tightening)
        if avg_risk < 0.3:

            for node in self.graph.nodes.values():
                node.health_score += 0.02

            self.interventions.append({
                "type": "SYSTEM_STABILIZATION",
                "effect": "slow_recovery_support"
            })

        return {
            "scan": scan,
            "interventions": self.interventions
        }
