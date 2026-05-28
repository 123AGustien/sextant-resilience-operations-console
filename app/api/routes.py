from fastapi import APIRouter
from app.cognitive_core.orchestrator import CognitiveOrchestrator

router = APIRouter()

engine = CognitiveOrchestrator()


@router.post("/evaluate")
def evaluate(payload: dict):
    return engine.evaluate(payload)
