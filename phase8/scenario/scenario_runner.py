from phase8.network.institution_node import InstitutionNode
from phase8.network.graph_builder import InstitutionalGraph
from phase8.contagion.engine import ContagionEngine


class ScenarioRunner:
    """
    Phase 8.1 institutional simulation entrypoint.
    """

    def __init__(self):
        self.graph = InstitutionalGraph()
        self.engine = ContagionEngine(self.graph)

    # -------------------------
    # BUILD DEFAULT SYSTEM
    # -------------------------
    def _build_default_network(self):
        """
        Creates baseline institutional network.
        """

        bank_a = InstitutionNode(id="Bank_A", type="bank")
        bank_b = InstitutionNode(id="Bank_B", type="bank")
        liquidity_hub = InstitutionNode(id="Liquidity_Hub", type="infrastructure")

        self.graph.add_node(bank_a)
        self.graph.add_node(bank_b)
        self.graph.add_node(liquidity_hub)

        # exposures (critical system dependencies)
        self.graph.add_exposure("Bank_A", "Bank_B", 0.7)
        self.graph.add_exposure("Bank_B", "Liquidity_Hub", 0.6)
        self.graph.add_exposure("Liquidity_Hub", "Bank_A", 0.4)

    # -------------------------
    # RUN SCENARIO
    # -------------------------
    def run_scenario(self, scenario_name: str, intensity: float = 0.8):

        self._build_default_network()

        # choose shock origin
        origin = "Bank_A"

        if scenario_name == "liquidity_stress":
            origin = "Liquidity_Hub"
        elif scenario_name == "bank_cascade":
            origin = "Bank_B"

        # run contagion simulation
        result = self.engine.run(
            origin_node=origin,
            initial_intensity=intensity,
            steps=4
        )

        return {
            "scenario": scenario_name,
            "origin": origin,
            "result": result
        }
