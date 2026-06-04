import json


def generate_run_id(scenario_name):
    return f"SIM-{scenario_name}-RUN"


def serialize_timeline(timeline):
    return json.dumps(timeline)


def deserialize_timeline(serialized):
    return json.loads(serialized)


def replay_simulation(result):
    """
    Institutional replay engine (Phase 8)
    Reconstructs simulation output step-by-step
    """

    timeline = result["timeline"]

    for step in timeline:
        print(step)

    return {
        "replayed": True,
        "steps": len(timeline)
    }
