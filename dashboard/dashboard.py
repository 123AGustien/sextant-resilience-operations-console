from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def dashboard_home():
    return {"status": "dashboard active"}
