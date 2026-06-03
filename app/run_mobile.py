from app.cognitive_core.orchestrator import CognitiveOrchestrator


def run_mobile_simulation():
    """
    Mobile-friendly in-house simulator runner.
    No backend, no API, direct execution.
    """

    engine = CognitiveOrchestrator()

    # Simple test scenario (editable on phone)
    events = [
        {"type": "normal_operation", "node": "A"},
        {"type": "node_failure", "node": "B"},
        {"type": "cascade_failure", "node": "C"},
    ]

    print("\n🧠 SEXTANT SIMULATION START\n")

    for i, event in enumerate(events):
        result = engine.evaluate(event)

        print(f"STEP {i+1}")
        print("EVENT:", event)
        print("STATE:", result["system_state"])
        print("AGENTS:", result["simulation"]["agents_executed"])
        print("-" * 40)

    print("\n📊 FINAL STATE:", engine.state)
    print("📜 AUDIT ENTRIES:", len(engine.evidence.timeline))
    print("\n✅ SIMULATION COMPLETE\n")


# -----------------------------
# MOBILE RUN ENTRY POINT
# -----------------------------
if __name__ == "__main__":
    run_mobile_simulation()
