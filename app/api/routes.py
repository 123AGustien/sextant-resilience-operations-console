from fastapi import APIRouter, Depends
from app.api.auth import verify_api_key
from app.cognitive_core.orchestrator import CognitiveOrchestrator

router = APIRouter()
engine = CognitiveOrchestrator()


@router.post("/evaluate")
def evaluate(event: dict, tier: str = Depends(verify_api_key)):
    """
    Multi-agent SRE evaluation with tier-aware execution.
    Core monetisable endpoint of the system.
    """

    result = engine.process_event(event)

    # 🧠 Attach subscription tier metadata
    result["tier"] = tier

    # 💡 Free-tier constraints (usage control logic)
    if tier == "free":
        result["memory_size"] = min(result["memory_size"], 10)

    return result


@router.get("/memory")
def memory(tier: str = Depends(verify_api_key)):
    """
    Tier-controlled access to cognitive memory store.
    """

    data = engine.memory.get_all()

    # 🔒 Limit visibility for free tier users
    if tier == "free":
        return data[-5:]

    return data
