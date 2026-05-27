from fastapi import FastAPI
from pydantic import BaseModel

from core.resilience_engine import ResilienceEngine
from core.validation_engine import ValidationEngine
from evidence_engine.logger import EvidenceLogger


# ---------------------------
# App Initialization
# ---------------------------
app = FastAPI(title="Sextant Resilience API")

logger = EvidenceLogger()
engine = ResilienceEngine(logger=logger)
validator = ValidationEngine()


# ---------------------------
# Input Schema
# ---------------------------
class InputSignal(BaseModel):
    risk: float = 0.0
    signal: str = "NORMAL_OPERATION"


# ---------------------------
# Main Evaluation Endpoint
# ---------------------------
@app.post("/evaluate")
def evaluate_system(input_data: InputSignal):

    # Convert input to dict
    input_dict = input_data.dict()

    # Step 1 — Resilience evaluation
    result = engine.evaluate(input_dict)

    # Step 2 — Validation layer (audit / verification)
    validated = validator.validate(result)

    # Step 3 — Return structured explainable output
    response = {
        "input": input_dict,
        "resilience_result": result,
        "validation": validated,
        "explainability": {
            "summary": (
                "System evaluated risk score and executed resilience logic. "
                "Fallback is triggered when risk exceeds threshold."
            ),
            "state_meaning": {
                "STABLE": "System operating normally with no intervention required.",
                "DEGRADED": "System operating under fallback or degraded mode."
            }
        }
    }

    return response


# ---------------------------
# Evidence / Audit Endpoint
# ---------------------------
@app.get("/evidence")
def get_evidence():

    return {
        "total_records": len(logger.records),
        "records": logger.records
    }


# ---------------------------
# Health Check
# ---------------------------
@app.get("/health")
def health_check():

    return {
        "status": "ACTIVE",
        "system": "Sextant Resilience API"
    }
