from fastapi import APIRouter, Depends
from app.api.auth import verify_api_key
from app.cognitive_core.orchestrator import CognitiveOrchestrator

router = APIRouter()
engine = CognitiveOrchestrator()


@router.post("/evaluate")
def evaluate(event: dict, tier: str = Depends(verify_api_key)):
    """
    Multi-agent SRE evaluation with tier awareness
    """

    result = engine.process_event(event)

    # 🧠 Add commercial tier metadata
    result["tier"] = tier

    # 💡 Example: limit free tier behavior
    if tier == "free":
        result["memory_size"] = min(result["memory_size"], 10)

    return result


@router.get("/memory")
def memory(tier: str = Depends(verify_api_key)):
    """
    Tier-controlled memory access
    """
    data = engine.memory.get_all()

    if tier == "free":
        return data[-5:]  # limit exposure

    return data
