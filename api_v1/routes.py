from fastapi import APIRouter

from api_v1.evaluate import router as evaluate_router
from api_v1.auth import router as auth_router
from api_v1.phase8_routes import router as phase8_router

# -----------------------
# MASTER API ROUTER
# -----------------------
router = APIRouter()

# LIVE SYSTEM (v7)
router.include_router(auth_router, prefix="/auth")
router.include_router(evaluate_router, prefix="/risk")

# PHASE 8 (SANDBOX SYSTEM)
router.include_router(phase8_router, prefix="/phase8")
