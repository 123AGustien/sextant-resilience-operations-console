from fastapi import FastAPI
from pydantic import BaseModel
from core.resilience_engine import ResilienceEngine
from core.validation_engine import ValidationEngine

app = FastAPI(title="Sextant Resilience API")

engine = ResilienceEngine()
validator = ValidationEngine()


# ---------------------------
# Input Schema
# ---------------------------
class InputSignal(BaseModel):
    risk: float = 0.0
    signal: str = "NORMAL_OPERATION"


# ---------------------------
# Main Resilience Endpoint
# ---------------------------
@app.post("/evaluate")
def evaluate_system(input_data: InputSignal):

    # Step 1 — Run resilience engine
    result = engine.evaluate(input_data.dict())

    # Step 2 — Validate output (audit layer)
    validated = validator.validate(result)

    # Step 3 — Return explainable response
    return {
        "input": input_data.dict(),
        "resilience_result": result,
        "validation": validated,
        "explainability": {
            "summary": "System evaluated risk and applied fallback logic if required.",
            "state_meaning": {
                "STABLE": "System operating normally",
                "DEGRADED": "Fallback mode activated"
            }
        }
    }
