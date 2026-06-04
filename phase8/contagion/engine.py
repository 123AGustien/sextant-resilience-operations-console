from phase8.network.graph_builder import InstitutionalGraph


class ContagionEngine:
    """
    Phase 8.1 systemic contagion processor.
    Handles multi-step propagation and amplification.
    """

    def __init__(self, graph: InstitutionalGraph):
        self.graph = graph
        self.history = []

    # -------------------------
    # RUN CONTAGION SIMULATION
    # -------------------------
    def run(self, origin_node: str, initial_intensity: float, steps: int = 3):
        """
        Executes multi-step systemic contagion.
        """

        self.history = []

        current_intensity = initial_intensity
        current_sources = [origin_node]

        for step in range(steps):

            next_sources = []

            for node_id in current_sources:

                node = self.graph.get_node(node_id)
                if not node:
                    continue

                # Apply shock to current node
                node.apply_shock(current_intensity)

                self.history.append({
                    "step": step,
                    "node": node_id,
                    "intensity": current_intensity,
                    "state": node.state
                })

                # Propagate to connected nodes
                for target_id, weight in node.exposures.items():

                    target = self.graph.get_node(target_id)
                    if not target:
                        continue

                    # 🔥 CONTAGION FORMULA (core logic)
                    propagated = current_intensity * weight

                    # Amplification if node is degraded
                    if node.state == "DEGRADED":
                        propagated *= 1.2
                    elif node.state == "WARNING":
                        propagated *= 1.5
                    elif node.state == "CRITICAL":
                        propagated *= 1.8

                    # Damping to avoid infinite explosion
                    propagated *= 0.9

                    target.apply_shock(propagated)

                    next_sources.append(target_id)

            current_sources = next_sources

            # decay global intensity slightly each step
            current_intensity *= 0.85

        return {
            "final_snapshot": self.graph.system_snapshot(),
            "history": self.history
        }
