from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def model(scenario: str):
    if scenario == "bank":
        return 0.9
    if scenario == "cloud":
        return 1.1
    if scenario == "satellite":
        return 1.3
    return 1.0

@app.get("/simulate")
def simulate(scenario: str = "cloud"):

    seed = len(scenario) * 17
    base = (seed % 100) / 100

    risk = round(base * model(scenario), 2)

    return {
        "id": f"INC-{random.randint(10000,99999)}",
        "scenario": scenario,
        "risk": risk,
        "severity": "HIGH" if risk > 0.6 else "MEDIUM",
        "engine": "cascade-v3",
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ")
    }
