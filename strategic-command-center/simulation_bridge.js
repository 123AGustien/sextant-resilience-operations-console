/**
 * Sextant Simulation Bridge v2
 * Connects:
 * simulator-v4 → ControlRoom → Command Center → Audit Engine
 */

window.SextantBridge = {

  lastSimulation: null,

  /**
   * MAIN ENTRY POINT
   */
  captureSimulationResult(result) {

    // ==============================
    // 1. STORE RAW RESULT
    // ==============================

    this.lastSimulation = result;

    // ==============================
    // 2. AUDIT INTEGRATION (CRITICAL)
    // ==============================

    let audit = null;

    if (window.auditScenarioResult) {
        audit = window.auditScenarioResult(
            result.scenario || "unknown",
            {
                riskScore: result.riskIndex ?? result.shock ?? 0,
                impact: result.impact ?? result.exportIndex ?? 0,
                stability: 100 - (result.volatility ?? result.shock ?? 0)
            }
        );
    }

    // attach audit
    result.audit = audit;

    // ==============================
    // 3. PUSH TO COMMAND CENTER
    // ==============================

    if (window.SextantControlRoom) {
        window.SextantControlRoom.timeline.push({
            scenario: result.scenario,
            timestamp: Date.now(),
            engine: result,
            audit: audit
        });
    }

    // ==============================
    // 4. OPTIONAL GLOBAL EVENT HOOK
    // ==============================

    window.dispatchEvent(new CustomEvent("sextant:update", {
        detail: result
    }));

    return result;
  },

  /**
   * SAFE STATE ACCESS
   */
  getSimulationState() {
    return this.lastSimulation || {
      riskIndex: 0,
      impact: "No simulation run yet",
      volatility: 0,
      scenario: "none",
      audit: {
        grade: "NO_DATA",
        status: "DISCONNECTED"
      }
    };
  }
};
