function getSimulationReadout() {

    let nodes = Phase8State.nodes;

    let totalRisk = 0;
    let critical = 0;
    let warning = 0;
    let stable = 0;

    let breakdown = [];

    for (let id in nodes) {
        let n = nodes[id];

        totalRisk += n.risk;

        if (n.state === "CRITICAL") critical++;
        else if (n.state === "WARNING") warning++;
        else stable++;

        breakdown.push({
            node: id,
            state: n.state,
            risk: n.risk.toFixed(2),
            health: n.health.toFixed(2)
        });
    }

    let avgRisk = totalRisk / Object.keys(nodes).length;

    let systemStatus = "STABLE";

    if (critical >= 2 || avgRisk > 0.7) {
        systemStatus = "CRITICAL";
    } else if (warning > 0) {
        systemStatus = "DEGRADED";
    }

    return {
        system_status: systemStatus,
        average_risk: avgRisk.toFixed(3),
        node_summary: {
            stable,
            warning,
            critical
        },
        interventions: Phase8State.interventions,
        breakdown: breakdown,
        narrative: generateNarrative(systemStatus, avgRisk, critical)
    };
}

function generateNarrative(status, avgRisk, criticalCount) {

    if (status === "STABLE") {
        return "System operating within normal resilience thresholds. No cascade detected.";
    }

    if (status === "DEGRADED") {
        return "Localized stress detected. System is absorbing shocks with elevated sensitivity.";
    }

    return "Systemic instability detected. Multiple nodes in critical state. Cascade propagation active.";
}
