from fastapi import APIRouter

from phase8.state.institution_state import InstitutionState
from phase8.scenario.scenario_engine import load_scenario
from phase8.kernel.isk import run_simulation
from phase8.evidence.evidence_pack import build_evidence_pack

router = APIRouter()


@router.post("/phase8/run")
def run_phase8_simulation(scenario_name: str):
    """
    Phase 8 Simulation API Endpoint
    """

    # 1. Initialize state
    state = InstitutionState()

    # 2. Load scenario
    scenario = load_scenario(scenario_name)

    # 3. Run simulation
    result = run_simulation(state, scenario)

    # 4. Build evidence pack
    evidence = build_evidence_pack(result)

    return {
        "simulation": result,
        "evidence": evidence
    }
