let Phase8State = {
    nodes: {},
    system_risk: 0,
    interventions: [],
    timeline: {}
};

// -------------------------
// SCENARIO LIBRARY (NEW)
// -------------------------
const Scenarios = {

    bank_cascade: {
        origin: "Bank_A",
        shock: 0.8,
        edges: {
            "Bank_A": ["Bank_B"],
            "Bank_B": ["Liquidity_Hub"],
            "Liquidity_Hub": ["Bank_A"]
        }
    },

    liquidity_stress: {
        origin: "Liquidity_Hub",
        shock: 0.7,
        edges: {
            "Liquidity_Hub": ["Bank_A", "Bank_B"],
            "Bank_A": ["Bank_B"]
        }
    },

    bank_failure: {
        origin: "Bank_B",
        shock: 0.9,
        edges: {
            "Bank_B": ["Liquidity_Hub"]
        }
    },

    systemic_shock: {
        origin: "Bank_A",
        shock: 0.95,
        edges: {
            "Bank_A": ["Bank_B", "Liquidity_Hub"],
            "Bank_B": ["Liquidity_Hub"],
            "Liquidity_Hub": ["Bank_A", "Bank_B"]
        }
    }
};

// -------------------------
// MAIN SIMULATION RUNNER
// -------------------------
function runSimulation(scenarioKey = "bank_cascade") {

    const scenario = Scenarios[scenarioKey];

    if (!scenario) {
        console.error("Invalid scenario:", scenarioKey);
        return Phase8State;
    }

    // reset state
    Phase8State.nodes = {
        "Bank_A": { state: "STABLE", health: 1.0, risk: 0.1 },
        "Bank_B": { state: "STABLE", health: 1.0, risk: 0.1 },
        "Liquidity_Hub": { state: "STABLE", health: 1.0, risk: 0.1 }
    };

    Phase8State.interventions = [];

    // scenario config
    const origin = scenario.origin;
    const shock = scenario.shock;

    window.currentEdges = scenario.edges;

    // execution pipeline
    applyShock(origin, shock);
    propagateDynamic(origin, shock);
    regulatoryResponse();
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
// LEGACY PROPAGATION (optional fallback)
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
// SCENARIO-BASED PROPAGATION (NEW)
// -------------------------
function propagateDynamic(origin, intensity) {

    const edges = window.currentEdges || {};

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

    Phase8State.system_risk =
        total / Object.keys(Phase8State.nodes).length;
}
