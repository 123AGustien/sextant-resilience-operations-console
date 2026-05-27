from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

from core.resilience_engine import ResilienceEngine
from core.validation_engine import ValidationEngine
from evidence_engine.logger import EvidenceLogger
from core.agent import ResilienceAgent

# ---------------------------
# APP INIT
# ---------------------------
app = FastAPI(title="Sextant Resilience Control Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# CORE SYSTEM
# ---------------------------
logger = EvidenceLogger()
engine = ResilienceEngine(logger=logger)
validator = ValidationEngine()

agent = ResilienceAgent(engine=engine, validator=validator, logger=logger)

# ---------------------------
# SYSTEM MEMORY
# ---------------------------
system_memory = {
    "last_state": None,
    "last_risk": 0.0,
    "events": []
}

# ---------------------------
# INPUT MODEL (HARDENED)
# ---------------------------
class InputSignal(BaseModel):
    risk: float = Field(ge=0.0, le=1.0)
    signal: str = Field(min_length=1, max_length=50)

    class Config:
        extra = "forbid"


# ---------------------------
# SAFE EVALUATION CORE
# ---------------------------
@app.post("/evaluate")
def evaluate_system(input_data: InputSignal):

    try:
        input_dict = input_data.dict()

        result = engine.evaluate(input_dict)
        validation = validator.validate(result)

        # safe memory update
        system_memory["last_state"] = result.get("state", "UNKNOWN")
        system_memory["last_risk"] = result.get("risk_score", 0.0)
        system_memory["events"].append({
            "input": input_dict,
            "result": result
        })

        return {
            "status": "SUCCESS",
            "input": input_dict,
            "resilience_result": result,
            "validation": validation,
            "system_memory": system_memory
        }

    except Exception as e:
        return {
            "status": "FAILED",
            "error": str(e)
        }


# ---------------------------
# EVIDENCE LAYER
# ---------------------------
@app.get("/evidence")
def evidence():
    return {
        "total_records": len(logger.records),
        "records": logger.records[-50:]  # prevent overload
    }


# ---------------------------
# HEALTH CHECK
# ---------------------------
@app.get("/health")
def health():
    return {
        "status": "ACTIVE",
        "system": "Sextant Resilience Platform"
    }


# ---------------------------
# AGENT LAYER
# ---------------------------
@app.post("/agent/step")
def agent_step(input_data: InputSignal):
    return agent.step(input_data.dict())


@app.post("/agent/run")
def agent_run():

    input_stream = [
        {"risk": 0.1, "signal": "NORMAL"},
        {"risk": 0.3, "signal": "LOAD"},
        {"risk": 0.6, "signal": "WARNING"},
        {"risk": 0.9, "signal": "CRITICAL"},
        {"risk": 0.4, "signal": "RECOVERY"}
    ]

    return agent.run_loop(input_stream, interval=0.5, max_steps=10)


@app.get("/agent/state")
def agent_state():
    return agent.state_memory
