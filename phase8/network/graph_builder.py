from typing import Dict
from phase8.network.institution_node import InstitutionNode


class InstitutionalGraph:
    """
    Phase 8.1 Multi-node institutional network graph.
    """

    def __init__(self):
        self.nodes: Dict[str, InstitutionNode] = {}

    # -------------------------
    # NODE MANAGEMENT
    # -------------------------
    def add_node(self, node: InstitutionNode):
        self.nodes[node.id] = node

    def get_node(self, node_id: str):
        return self.nodes.get(node_id)

    # -------------------------
    # EDGE / EXPOSURE CREATION
    # -------------------------
    def add_exposure(self, from_id: str, to_id: str, weight: float):
        """
        Defines financial / systemic dependency between nodes.
        """
        if from_id in self.nodes:
            self.nodes[from_id].exposures[to_id] = weight

    # -------------------------
    # SHOCK PROPAGATION (BASIC)
    # -------------------------
    def apply_shock(self, node_id: str, intensity: float):
        """
        Apply initial shock to a node.
        """
        node = self.get_node(node_id)

        if not node:
            return

        node.apply_shock(intensity)

        # propagate to connected nodes
        for target_id, weight in node.exposures.items():
            target = self.get_node(target_id)

            if target:
                propagated_intensity = intensity * weight * 0.6
                target.apply_shock(propagated_intensity)

    # -------------------------
    # SYSTEM STATE VIEW
    # -------------------------
    def system_snapshot(self):
        """
        Returns full institutional state vector.
        """
        return {
            node_id: {
                "state": node.state,
                "health_score": node.health_score,
                "risk_exposure": node.risk_exposure
            }
            for node_id, node in self.nodes.items()
        }
