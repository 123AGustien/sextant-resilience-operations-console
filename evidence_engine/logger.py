import json
import time
from datetime import datetime

class EvidenceLogger:
    def __init__(self):
        self.records = []

    def log_event(self, event_type: str, data: dict):

        record = {
            "timestamp": datetime.utcnow().isoformat(),
            "epoch": time.time(),
            "event_type": event_type,
            "data": data
        }

        self.records.append(record)

        return record

    def log_decision(self, input_data: dict, output_data: dict):

        record = {
            "timestamp": datetime.utcnow().isoformat(),
            "event_type": "DECISION_TRACE",
            "input": input_data,
            "output": output_data,
            "trace_id": f"trace_{int(time.time()*1000)}"
        }

        self.records.append(record)

        return record

    def export_json(self):

        return json.dumps(self.records, indent=2)

    def clear(self):
        self.records = []
