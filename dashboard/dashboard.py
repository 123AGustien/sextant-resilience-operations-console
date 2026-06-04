from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def dashboard_home():
    return {
        "status": "dashboard active",
        "system": "Sextant Phase 8 Control Room",
        "mode": "simulation-only",
        "layer": "observability + readout"
    }
