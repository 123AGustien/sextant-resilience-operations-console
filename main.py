from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

import asyncio

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

agent = ResilienceAgent(
    engine=engine,
    validator=validator,
    logger=logger
)


# ---------------------------
# SYSTEM MEMORY
# ---------------------------
system_memory = {
    "last_state": "UNKNOWN",
    "last_risk": 0.0,
    "events": []
}

MAX_MEMORY = 100


# ---------------------------
# WEBSOCKET MANAGER
# ---------------------------
class StreamManager:
    def __init__(self):
        self.connections = set()

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.connections.add(websocket)

    def disconnect(self, websocket: WebSocket):
        self.connections.discard(websocket)

    async def broadcast(self, message: dict):
        if not self.connections:
            return

        dead = set()

        for conn in list(self.connections):
            try:
                await conn.send_json(message)
            except:
                dead.add(conn)

        self.connections -= dead


stream = StreamManager()


# ---------------------------
# INPUT MODEL
# ---------------------------
class InputSignal(BaseModel):
    risk: float = Field(ge=0.0, le=1.0)
    signal: str = Field(min_length=1, max_length=50)

    class Config:
        extra = "forbid"


# ---------------------------
# RESILIENCE ENGINE
# ---------------------------
@app.post("/evaluate")
async def evaluate_system(input_data: InputSignal):

    try:
        input_dict = input_data.dict()

        # Engine execution
        result = engine.evaluate(input_dict)

        # Validation
        validation = validator.validate(result)

        state = result.get("state", "UNKNOWN")
        risk = float(result.get("risk_score", 0.0))

        # Memory update
        system_memory["last_state"] = state
        system_memory["last_risk"] = risk

        system_memory["events"].append({
            "input": input_dict,
            "result": result
        })

        if len(system_memory["events"]) > MAX_MEMORY:
            system_memory["events"] = system_memory["events"][-MAX_MEMORY:]

        # WebSocket broadcast
        await stream.broadcast({
            "type": "RISK_UPDATE",
            "state": state,
            "risk": risk,
            "action": result.get("action", "NONE")
        })

        return {
            "status": "SUCCESS",
            "input": input_dict,
            "resilience_result": result,
            "validation": validation,
            "system_memory": system_memory
        }

    except Exception as e:
        logger.log({
            "type": "ERROR",
            "error": str(e),
            "input": input_data.dict() if input_data else None
        })

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
        "records": logger.records[-50:]
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
# AGENT ENDPOINTS
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


# ---------------------------
# WEBSOCKET ENDPOINT
# ---------------------------
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    await stream.connect(websocket)

    try:
        while True:
            try:
                await asyncio.wait_for(websocket.receive_text(), timeout=30)
            except asyncio.TimeoutError:
                await websocket.send_json({"type": "PING"})

    except WebSocketDisconnect:
        stream.disconnect(websocket)
