from fastapi import FastAPI
from app.api.routes import router as api_router
from dashboard.dashboard import router as dashboard_router

app = FastAPI(
    title="Sextant Resilience Platform",
    version="1.0.0",
    description="Deterministic resilience simulation engine"
)

# API routes
app.include_router(api_router)

# Dashboard routes
app.include_router(dashboard_router)


@app.get("/")
def root():
    return {
        "platform": "Sextant Resilience Platform",
        "status": "online",
        "version": "Enterprise v1"
    }
