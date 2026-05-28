from pydantic import BaseModel


class EvaluateRequest(BaseModel):
    system: str
    risk: float
    signal: str
