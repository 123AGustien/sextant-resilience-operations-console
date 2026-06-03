from cognitive_core.orchestrator import CognitiveOrchestrator


def run_simulation():

    engine = CognitiveOrchestrator()

    events = [
        {"type": "normal_operation", "node": "A"},
        {"type": "node_failure", "node": "B"},
        {"type": "cascade_failure", "node": "C"}
    ]

    for event in events:

        result = engine.evaluate(event)

        print("\nEVENT:")
        print(event)

        print("\nRESULT:")
        print(result)

        print("-" * 40)

    print("\nSIMULATION COMPLETE")


if __name__ == "__main__":
    run_simulation()
