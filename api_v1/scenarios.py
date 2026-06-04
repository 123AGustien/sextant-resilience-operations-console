from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_scenarios():

    return {
        "system": "Sextant Phase 8 Simulation Engine",
        "scenarios": [
            {
                "id": "bank_cascade",
                "name": "Bank Cascade",
                "description": "Failure propagates from Bank_A through interconnected banking nodes.",
                "origin": "Bank_A",
                "severity": 0.8
            },
            {
                "id": "liquidity_stress",
                "name": "Liquidity Stress",
                "description": "Liquidity hub stress spreads to banking nodes via exposure network.",
                "origin": "Liquidity_Hub",
                "severity": 0.7
            },
            {
                "id": "bank_failure",
                "name": "Isolated Bank Failure",
                "description": "Single node failure with limited systemic propagation.",
                "origin": "Bank_B",
                "severity": 0.9
            },
            {
                "id": "systemic_shock",
                "name": "Systemic Shock",
                "description": "Multi-node cascading failure across full network topology.",
                "origin": "Bank_A",
                "severity": 0.95
            }
        ]
    }
