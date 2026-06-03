from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel

from app.api.auth import verify_api_key
from app.cognitive_core.orchestrator import CognitiveOrchestrator

router = APIRouter()


# ---------------------------
# REQUEST MODEL
# ---------------------------
class EvaluationRequest(BaseModel):
    scenario: str
    nodes: int
    load: str
    fx_shock: float
    liquidity_shock: float


# ---------------------------
# ENGINE FACTORY
# ---------------------------
def get_engine():
    return CognitiveOrchestrator()


# ---------------------------
# ENDPOINT
# ---------------------------
@router.post("/evaluate")
def evaluate(
    payload: EvaluationRequest,
    x_api_key: str = Header(None)
):

    # ---------------------------
    # AUTH LAYER
    # ---------------------------
    if not verify_api_key(x_api_key):
        raise HTTPException(status_code=401, detail="Invalid API key")

    # ---------------------------
    # EXECUTION LAYER
    # ---------------------------
    engine = get_engine()
    result = engine.evaluate(payload.dict())

    return {
        "status": "success",
        "result": result
    }
