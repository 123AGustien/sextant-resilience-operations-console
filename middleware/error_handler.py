from fastapi import Request
from fastapi.responses import JSONResponse

class ErrorHandler:
    async def __call__(self, request: Request, call_next):
        try:
            response = await call_next(request)
            return response
        except Exception as e:
            return JSONResponse(
                status_code=500,
                content={
                    "status": "ERROR",
                    "message": str(e)
                }
            )
