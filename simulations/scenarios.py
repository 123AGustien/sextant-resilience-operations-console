# Sextant Simulation Pack v1

SCENARIOS = [
    {
        "name": "Normal Operation",
        "steps": [
            {"risk": 0.1, "signal": "NORMAL"},
            {"risk": 0.2, "signal": "NORMAL"},
            {"risk": 0.3, "signal": "NORMAL"}
        ]
    },
    {
        "name": "Moderate Stress",
        "steps": [
            {"risk": 0.3, "signal": "LOAD_INCREASE"},
            {"risk": 0.5, "signal": "DEGRADATION_WARNING"},
            {"risk": 0.6, "signal": "STABILIZE"}
        ]
    },
    {
        "name": "Critical Failure Scenario",
        "steps": [
            {"risk": 0.4, "signal": "NORMAL"},
            {"risk": 0.7, "signal": "THRESHOLD_APPROACH"},
            {"risk": 0.9, "signal": "CRITICAL"},
            {"risk": 0.95, "signal": "FALLBACK_REQUIRED"}
        ]
    }
]
