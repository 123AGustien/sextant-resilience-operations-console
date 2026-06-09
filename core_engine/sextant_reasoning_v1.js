/**
 * Sextant Reasoning Layer v1
 * Converts orchestration frames into explanations
 */

class SextantReasoning {

    constructor(orchestra) {
        this.orchestra = orchestra;
    }

    /**
     * Analyze latest simulation frame
     */
    explainLatest() {

        const frame = this.orchestra.getLatest();

        if (!frame) {
            return {
                status: "NO_DATA",
                explanation: "No simulation frames available"
            };
        }

        return this._analyzeFrame(frame);
    }

    /**
     * Core reasoning engine
     */
    _analyzeFrame(frame) {

        const fx = frame.system.fx;
        const bank = frame.system.bank;
        const liq = frame.system.liq;
        const eq = frame.system.eq;
        const conf = frame.system.conf;

        const instabilityScore =
            (fx * 0.30) +
            (bank * 0.25) +
            (liq * 0.20) +
            (eq * 0.15) +
            (conf * 0.10);

        let state = "STABLE";
        if (instabilityScore > 0.65) state = "RISK";
        if (instabilityScore > 0.80) state = "CRITICAL";

        const weakestNode = this._findWeakest(frame.system);

        return {
            state,
            instabilityScore: Number(instabilityScore.toFixed(3)),
            weakestNode,
            explanation: this._generateNarrative(frame, weakestNode, state)
        };
    }

    /**
     * Identify weakest system node
     */
    _findWeakest(system) {

        let minNode = "fx";
        let minValue = system.fx;

        for (const key of Object.keys(system)) {
            if (system[key] < minValue) {
                minValue = system[key];
                minNode = key;
            }
        }

        return { node: minNode, value: minValue };
    }

    /**
     * Generate human-readable reasoning
     */
    _generateNarrative(frame, weakest, state) {

        return `
Scenario: ${frame.scenario}
Step: ${frame.step}
Type: ${frame.type}

System State: ${state}

Primary Weak Point: ${weakest.node.toUpperCase()} (${weakest.value.toFixed(2)})

Propagation:
FX → BANK → LIQ → EQ → CONF

Interpretation:
${state === "STABLE"
    ? "System is within controlled bounds. No cascading instability detected."
    : "System shows stress propagation through financial layers. Weak node amplifying risk."}
        `.trim();
    }
}

// expose globally
window.SextantReasoning = SextantReasoning;
