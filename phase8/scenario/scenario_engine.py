def load_scenario(name):
    """
    Returns deterministic institutional stress scenarios
    """

    if name == "baseline_stress":
        return {
            "name": "baseline_stress",
            "duration": 100,

            # Time-based event injection model
            "events": {
                10: {
                    "type": "latency_spike",
                    "impact": {
                        "latency": 0.4
                    }
                },

                30: {
                    "type": "liquidity_shock",
                    "impact": {
                        "liquidity": 0.3
                    }
                },

                60: {
                    "type": "dependency_degradation",
                    "impact": {
                        "dependency_health": 0.5
                    }
                }
            }
        }

    if name == "fx_stress":
        return {
            "name": "fx_stress",
            "duration": 80,

            "events": {
                5: {
                    "type": "fx_spike",
                    "impact": {
                        "latency": 0.2,
                        "liquidity": 0.2
                    }
                },
                40: {
                    "type": "market_volatility",
                    "impact": {
                        "latency": 0.3
                    }
                }
            }
        }

    return {
        "name": "default",
        "duration": 50,
        "events": {}
    }
