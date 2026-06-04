function renderReadoutUI() {

    const data = getSimulationReadout();

    const container = document.getElementById("readout");

    if (!container) return;

    container.innerHTML = `
        <div class="summary status-${data.system_status}">
            <h2>${data.system_status}</h2>
            <p>${data.narrative}</p>
        </div>

        <div class="grid">
            <div>Avg Risk: ${data.average_risk}</div>
            <div>Stable: ${data.node_summary.stable}</div>
            <div>Warning: ${data.node_summary.warning}</div>
            <div>Critical: ${data.node_summary.critical}</div>
        </div>

        <div class="interventions">
            <h3>Interventions</h3>
            <ul>
                ${data.interventions.map(i => `<li>${i}</li>`).join("")}
            </ul>
        </div>

        <div class="table">
            <h3>Node Breakdown</h3>
            <table>
                <tr>
                    <th>Node</th>
                    <th>Status</th>
                    <th>Risk</th>
                    <th>Health</th>
                </tr>
                ${data.breakdown.map(n => `
                    <tr>
                        <td>${n.node}</td>
                        <td>${n.state}</td>
                        <td>${n.risk}</td>
                        <td>${n.health}</td>
                    </tr>
                `).join("")}
            </table>
        </div>
    `;
}
