class TimelineBuilder:
    """
    Phase 8.1 observability layer.
    Converts raw contagion history into readable institutional timeline.
    """

    def build(self, simulation_result: dict):

        history = simulation_result["result"]["history"]

        timeline = {}
        critical_events = []

        for event in history:

            step = event["step"]
            node = event["node"]
            state = event["state"]
            intensity = event["intensity"]

            # group by step
            if step not in timeline:
                timeline[step] = []

            timeline[step].append({
                "node": node,
                "state": state,
                "intensity": round(intensity, 4)
            })

            # capture systemic stress points
            if state in ["WARNING", "CRITICAL"]:
                critical_events.append({
                    "step": step,
                    "node": node,
                    "state": state,
                    "intensity": intensity
                })

        return {
            "timeline": timeline,
            "critical_events": critical_events,
            "summary": {
                "total_steps": len(timeline),
                "total_events": len(history),
                "critical_count": len(critical_events)
            }
        }
