from fastapi import FastAPI
from pydantic import BaseModel
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
# CORE SYSTEM COMPONENTS
# ---------------------------
logger = EvidenceLogger()
engine = ResilienceEngine(logger=logger)
validator = ValidationEngine()

agent = ResilienceAgent(
    engine=engine,
    validator=validator,
    logger=logger
)


# ---------------------------
# INPUT MODEL
# ---------------------------
class InputSignal(BaseModel):
    risk: float = 0.0
    signal: str = "NORMAL_OPERATION"


# ---------------------------
# 🟦 SYSTEM MEMORY (SINGLE SOURCE OF TRUTH)
# ---------------------------
system_memory = {
    "last_state": None,
    "last_risk": None,
    "events": []
}


# ---------------------------
# 🟦 CORE EVALUATION
# ---------------------------
@app.post("/evaluate")
def evaluate_system(input_data: InputSignal):

    input_dict = input_data.dict()

    result = engine.evaluate(input_dict)
    validation = validator.validate(result)

    # update system memory
    system_memory["last_state"] = result["state"]
    system_memory["last_risk"] = result["risk_score"]
    system_memory["events"].append({
        "input": input_dict,
        "result": result
    })

    return {
        "input": input_dict,
        "resilience_result": result,
        "validation": validation,
        "system_memory": system_memory
    }


# ---------------------------
# 🟦 EVIDENCE LAYER
# ---------------------------
@app.get("/evidence")
def evidence():
    return {
        "total_records": len(logger.records),
        "records": logger.records
    }


# ---------------------------
# 🟦 HEALTH CHECK
# ---------------------------
@app.get("/health")
def health():
    return {
        "status": "ACTIVE",
        "system": "Sextant Resilience Platform"
    }


# ---------------------------
# 🟦 AGENT CONTROL LAYER
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
