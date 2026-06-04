from fastapi import FastAPI
from api_v1.routes import router as core_router
from api_v1.scenarios import router as scenarios_router
from api_v1.dashboard import router as dashboard_router

# -----------------------
# APP INIT
# -----------------------
app = FastAPI(
    title="Sextant Resilience API v1",
    version="1.0"
)

# -----------------------
# CORE ROUTES (RISK ENGINE, AUTH, ETC.)
# -----------------------
app.include_router(core_router, prefix="/v1")

# -----------------------
# SCENARIO REGISTRY (STEP 7)
# -----------------------
app.include_router(scenarios_router, prefix="/v1/scenarios")

# -----------------------
# DASHBOARD OBSERVABILITY LAYER
# -----------------------
app.include_router(dashboard_router, prefix="/v1/dashboard")
