# app/api/routes.py

from fastapi import APIRouter, Header, HTTPException
from app.api.auth import verify_api_key
from app.cognitive_core.orchestrator import CognitiveOrchestrator

router = APIRouter()

engine = CognitiveOrchestrator()


@router.post("/evaluate")
def evaluate(payload: dict, x_api_key: str = Header(None)):

    # ---------------------------
    # AUTH LAYER
    # ---------------------------
    if not verify_api_key(x_api_key):
        raise HTTPException(status_code=401, detail="Invalid API key")

    # ---------------------------
    # EXECUTION LAYER
    # ---------------------------
    result = engine.evaluate(payload)

    return {
        "status": "SUCCESS",
        "result": result
    }
