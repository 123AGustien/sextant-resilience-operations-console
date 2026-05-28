from fastapi import FastAPI
from api_v1.routes import router

app = FastAPI(
    title="Sextant Resilience API v1",
    version="1.0"
)

app.include_router(router, prefix="/v1")
