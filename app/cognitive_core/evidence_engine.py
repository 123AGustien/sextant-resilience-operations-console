from typing import Dict, Any, List
import time


class EvidenceEngine:
    """
    Stores and structures simulation history into audit-grade evidence logs.
    """

    def __init__(self):
        self.timeline: List[Dict[str, Any]] = []

    # -----------------------------
    # RECORD EVENT
    # -----------------------------
    def record(self, event: Dict[str, Any], result: Dict[str, Any]) -> Dict[str, Any]:

        entry = {
            "timestamp": self._timestamp(),
            "event": event,
            "result": result,
            "trace_id": self._generate_trace_id(event),
        }

        self.timeline.append(entry)

        return entry

    # -----------------------------
    # GET FULL HISTORY
    # -----------------------------
    def get_timeline(self) -> List[Dict[str, Any]]:
        return self.timeline

    # -----------------------------
    # SIMPLE FORENSIC QUERY
    # -----------------------------
    def find_by_event_type(self, event_type: str) -> List[Dict[str, Any]]:

        return [
            entry for entry in self.timeline
            if entry["event"].get("type") == event_type
        ]

    # -----------------------------
    # TIMESTAMP GENERATOR
    # -----------------------------
    def _timestamp(self) -> str:
        return time.strftime("%Y-%m-%d %H:%M:%S")

    # -----------------------------
    # TRACE ID GENERATOR (deterministic)
    # -----------------------------
    def _generate_trace_id(self, event: Dict[str, Any]) -> str:

        base = event.get("type", "unknown")
        node = event.get("node", "none")

        return f"{base}:{node}:{len(self.timeline)}"
