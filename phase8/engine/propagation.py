def propagate(state):
    """
    Institutional propagation engine (Phase 8)
    Handles systemic cascade logic
    """

    # Latency stress reduces operational capacity
    if state.latency > 1.5:
        state.operational_capacity -= 0.1
        state.systemic_risk += 0.05

    # Dependency collapse amplification
    if state.dependency_health < 0.6:
        state.systemic_risk += 0.2
        state.latency += 0.1

    # Liquidity stress feedback loop
    if state.liquidity < 0.5:
        state.operational_capacity -= 0.2
        state.systemic_risk += 0.3

    # Risk saturation cap (stability boundary)
    if state.systemic_risk > 1.0:
        state.systemic_risk = 1.0

    return state
