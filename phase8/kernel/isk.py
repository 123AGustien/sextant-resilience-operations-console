from phase8.state.institution_state import InstitutionState


def apply_event(state, event):
    impact = event.get("impact", {})

    state.liquidity -= impact.get("liquidity", 0)
    state.latency += impact.get("latency", 0)
    state.dependency_health -= impact.get("dependency_health", 0)

    return state


def propagate(state):
    """
    Simple deterministic propagation rules
    """

    # If latency increases, system stability decreases
    if state.latency > 1.5:
        state.operational_capacity -= 0.1

    # If dependency health drops, systemic risk increases
    if state.dependency_health < 0.6:
        state.systemic_risk += 0.2

    return state


def run_simulation(state, scenario):
    """
    Institutional Simulation Kernel (ISK v0)
    Deterministic time-step execution engine
    """

    timeline = []

    for t in range(scenario["duration"]):

        if t in scenario["events"]:
            event = scenario["events"][t]
            state = apply_event(state, event)

        state = propagate(state)

        timeline.append(state.snapshot())

    return {
        "scenario": scenario["name"],
        "final_state": state.snapshot(),
        "timeline": timeline
    }
