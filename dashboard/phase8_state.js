let Phase8State = {
    nodes: {},
    system_risk: 0,
    interventions: [],
    timeline: {}
};


// -------------------------
// SIMPLE SIMULATION RUNNER (FRONTEND)
// -------------------------
function runSimulation() {

    // reset state
    Phase8State.nodes = {
        "Bank_A": { state: "STABLE", health: 1.0, risk: 0.1 },
        "Bank_B": { state: "STABLE", health: 1.0, risk: 0.1 },
        "Liquidity_Hub": { state: "STABLE", health: 1.0, risk: 0.1 }
    };

    Phase8State.interventions = [];

    // -------------------------
    // STEP 1: SHOCK INJECTION
    // -------------------------
    applyShock("Bank_A", 0.8);

    // -------------------------
    // STEP 2: CONTAGION PROPAGATION
    // -------------------------
    propagate("Bank_A", 0.8);

    // -------------------------
    // STEP 3: POLICY RESPONSE
    // -------------------------
    regulatoryResponse();

    // -------------------------
    // STEP 4: RISK CALCULATION
    // -------------------------
    computeRisk();

    return Phase8State;
}


// -------------------------
// SHOCK FUNCTION
// -------------------------
function applyShock(nodeId, intensity) {

    let node = Phase8State.nodes[nodeId];

    node.risk += intensity;
    node.health -= intensity * 0.4;

    if (node.health < 0.3) node.state = "CRITICAL";
    else if (node.health < 0.6) node.state = "WARNING";
    else node.state = "STABLE";
}


// -------------------------
// PROPAGATION (SIMPLE GRAPH)
// -------------------------
function propagate(origin, intensity) {

    const edges = {
        "Bank_A": ["Bank_B"],
        "Bank_B": ["Liquidity_Hub"],
        "Liquidity_Hub": ["Bank_A"]
    };

    let targets = edges[origin] || [];

    for (let t of targets) {

        let spread = intensity * 0.7;

        applyShock(t, spread);
    }
}


// -------------------------
// REGULATORY RESPONSE
// -------------------------
function regulatoryResponse() {

    let riskSum = 0;
    let criticalCount = 0;

    for (let id in Phase8State.nodes) {
        let n = Phase8State.nodes[id];
        riskSum += n.risk;
        if (n.state === "CRITICAL") criticalCount++;
    }

    let avgRisk = riskSum / Object.keys(Phase8State.nodes).length;

    if (avgRisk > 0.6) {
        Phase8State.interventions.push("LIQUIDITY_INJECTION");

        for (let id in Phase8State.nodes) {
            Phase8State.nodes[id].health += 0.05;
        }
    }

    if (criticalCount >= 2) {
        Phase8State.interventions.push("CAPITAL_CONTROL");
    }
}


// -------------------------
// RISK METRIC
// -------------------------
function computeRisk() {

    let total = 0;

    for (let id in Phase8State.nodes) {
        total += Phase8State.nodes[id].risk;
    }

    Phase8State.system_risk = total / Object.keys(Phase8State.nodes).length;
}
