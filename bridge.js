window.SextantBridge = {

  lastSimulation: null,

  /**
   * MAIN ENTRY POINT
   * Receives simulation frames from Control Room
   */
  captureSimulationResult(result) {

    // Store latest state
    this.lastSimulation = result;

    console.log("📡 SextantBridge received frame:", result);

    // =========================
    // OPTIONAL: DASHBOARD HOOK
    // =========================
    if (window.SextantDashboard && typeof window.SextantDashboard.update === "function") {
      try {
        window.SextantDashboard.update(result);
      } catch (err) {
        console.warn("Dashboard update failed:", err);
      }
    }

    // =========================
    // OPTIONAL: EVENT BROADCAST
    // =========================
    window.dispatchEvent(new CustomEvent("sextant:bridge:update", {
      detail: result
    }));

    return result;
  },

  /**
   * SAFE ACCESS METHOD
   */
  getLastSimulation() {
    return this.lastSimulation || {
      status: "NO_DATA",
      message: "No simulation has been recorded yet"
    };
  },

  /**
   * RESET STATE
   */
  reset() {
    this.lastSimulation = null;
    console.log("SextantBridge reset");
  }
};
