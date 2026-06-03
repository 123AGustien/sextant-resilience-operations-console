from typing import List, Dict, Any


class ReplayEngine:
    """
    Replays past simulation events from EvidenceEngine timeline.
    Enables forensic reconstruction of system behavior.
    """

    def __init__(self):
        self.snapshots: List[Dict[str, Any]] = []

    # -----------------------------
    # LOAD TIMELINE
    # -----------------------------
    def load(self, timeline: List[Dict[str, Any]]):
        self.snapshots = timeline
        return {
            "status": "loaded",
            "snapshots": len(timeline)
        }

    # -----------------------------
    # REPLAY ALL EVENTS (SEQUENTIAL)
    # -----------------------------
    def replay_all(self) -> List[Dict[str, Any]]:

        replay_output = []

        for index, entry in enumerate(self.snapshots):

            replay_output.append({
                "step": index,
                "timestamp": entry.get("timestamp"),
                "event": entry.get("event"),
                "result": entry.get("result"),
                "trace_id": entry.get("trace_id"),
                "state": self._derive_state(entry)
            })

        return replay_output

    # -----------------------------
    # FILTERED REPLAY
    # -----------------------------
    def replay_by_event_type(self, event_type: str) -> List[Dict[str, Any]]:

        filtered = [
            s for s in self.snapshots
            if s["event"].get("type") == event_type
        ]

        return [
            {
                "event": f["event"],
                "result": f["result"],
                "timestamp": f["timestamp"],
                "trace_id": f["trace_id"]
            }
            for f in filtered
        ]

    # -----------------------------
    # STATE RECONSTRUCTION (SIMPLIFIED)
    # -----------------------------
    def _derive_state(self, entry: Dict[str, Any]) -> str:

        event_type = entry["event"].get("type")

        if event_type == "node_failure":
            return "DEGRADED"
        elif event_type == "cascade_failure":
            return "CRITICAL"
        else:
            return "HEALTHY"
