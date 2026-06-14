// Sextant Simulation Bridge
// Connects simulator-v4 → Strategic Command Center → Audit Engine

window.SextantBridge = {
  
  lastSimulation: null,

  captureSimulationResult(result) {
    this.lastSimulation = result;
    return result;
  },

  getSimulationState() {
    return this.lastSimulation || {
      riskIndex: 0,
      impact: "No simulation run yet",
      volatility: 0,
      scenario: "none"
    };
  }
};
