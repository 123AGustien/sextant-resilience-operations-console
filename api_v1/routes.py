from fastapi import APIRouter, Depends
from pydantic import BaseModel
from api_v1.auth import verify_api_key

router = APIRouter()


class EvaluateRequest(BaseModel):
    system: str
    risk: float
    signal: str


@router.post("/evaluate")
def evaluate(req: EvaluateRequest, tier=Depends(verify_api_key)):

    base_risk = req.risk * 1.1
    multiplier = 1.2 if tier == "pro" else 1.0

    risk_score = base_risk * multiplier

    return {
        "tier": tier,
        "risk_score": min(risk_score, 1.0),
        "state": "CRITICAL" if risk_score > 0.7 else "STABLE",
        "cascade_probability": risk_score * 0.6,
        "recommendation": "Activate fallback node",
        "confidence": 0.78
    }
