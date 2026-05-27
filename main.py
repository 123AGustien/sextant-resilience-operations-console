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
# SYSTEM MEMORY (SAFE BOUNDARY)
# ---------------------------
system_memory = {
    "last_state": "UNKNOWN",
    "last_risk": 0.0,
    "events": []
}

MAX_MEMORY = 100

# ---------------------------
# WEB SOCKET STREAM MANAGER
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
        dead = []

        for conn in self.connections:
            try:
                await conn.send_json(message)
            except:
                dead.append(conn)

        for conn in dead:
            self.connections.discard(conn)


stream = StreamManager()

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
async def evaluate_system(input_data: InputSignal):

    try:
        input_dict = input_data.dict()

        # 1. Engine evaluation
        result = engine.evaluate(input_dict)

        # 2. Validation
        validation = validator.validate(result)

        # 3. Safe extraction
        state = result.get("state", "UNKNOWN")
        risk = result.get("risk_score", 0.0)

        # 4. Memory update (bounded)
        system_memory["last_state"] = state
        system_memory["last_risk"] = risk

        system_memory["events"].append({
            "input": input_dict,
            "result": result
        })

        if len(system_memory["events"]) > MAX_MEMORY:
            system_memory["events"] = system_memory["events"][-MAX_MEMORY:]

        # 5. REAL-TIME STREAM BROADCAST (STEP 11 CORE FEATURE)
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

# ---------------------------
# WEBSOCKET CONTROL ROOM (STEP 11)
# ---------------------------
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    await stream.connect(websocket)

    try:
        while True:
            # keep connection alive
            await websocket.receive_text()

    except WebSocketDisconnect:
        stream.disconnect(websocket)
