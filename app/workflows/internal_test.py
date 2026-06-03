from app.cognitive_core.orchestrator import CognitiveOrchestrator


def run_workflow():
    """
    Internal simulator test runner (NO backend, NO API layer).
    """

    engine = CognitiveOrchestrator()

    # -----------------------------
    # TEST EVENTS (SIMULATION FLOW)
    # -----------------------------
    events = [
        {"type": "normal_operation", "node": "A"},
        {"type": "node_failure", "node": "B"},
        {"type": "cascade_failure", "node": "C"},
        {"type": "normal_operation", "node": "D"}
    ]

    results = []

    # -----------------------------
    # EXECUTE WORKFLOW
    # -----------------------------
    for event in events:
        result = engine.evaluate(event)
        results.append(result)

    # -----------------------------
    # OUTPUT SUMMARY
    # -----------------------------
    return {
        "workflow_status": "completed",
        "total_events": len(events),
        "results": results,
        "final_state": engine.state,
        "audit_trail_size": len(engine.evidence.timeline)
    }


# -----------------------------
# RUN DIRECTLY (NO SERVER)
# -----------------------------
if __name__ == "__main__":
    output = run_workflow()
    print(output)
