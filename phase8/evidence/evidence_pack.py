import json
import hashlib
from datetime import datetime


def generate_hash(data):
    return hashlib.sha256(json.dumps(data, sort_keys=True).encode()).hexdigest()


def build_evidence_pack(simulation_result):
    """
    Institutional Evidence Pack Generator (Phase 8)
    Converts simulation output into audit-grade structure
    """

    timestamp = datetime.utcnow().isoformat()

    pack = {
        "metadata": {
            "generated_at": timestamp,
            "scenario": simulation_result["scenario"],
            "run_type": "deterministic_institutional_simulation"
        },

        "final_state": simulation_result["final_state"],

        "timeline_summary": {
            "steps": len(simulation_result["timeline"])
        },

        "risk_analysis": {
            "final_systemic_risk": simulation_result["final_state"]["systemic_risk"]
        }
    }

    pack["evidence_hash"] = generate_hash(pack)

    return pack


def export_evidence_pack(pack, filename="evidence_pack.json"):
    """
    Saves evidence pack to file
    """

    with open(filename, "w") as f:
        json.dump(pack, f, indent=2)

    return filename
