/**
 * Sextant Reasoning Layer v1
 * Converts orchestration frames into structured explanations
 *
 * DEPENDS ON:
 * - window.orchestra (SextantOrchestra)
 */

class SextantReasoning {

    constructor(orchestra) {
        if (!orchestra) {
            throw new Error("Orchestra instance required");
        }

        this.orchestra = orchestra;
    }

    /**
     * Explain latest simulation frame
     */
    explainLatest() {

        const frame = this.orchestra.getLatest();

        if (!frame) {
            return {
                status: "NO_DATA",
                state: "EMPTY",
                explanation: "No simulation frames available yet"
            };
        }

        return this.analyzeFrame(frame);
    }

    /**
     * Core reasoning engine
     */
    analyzeFrame(frame) {

        const { fx, bank, liq, eq, conf } = frame.system;

        const instabilityScore =
            (fx * 0.30) +
            (bank * 0.25) +
            (liq * 0.20) +
            (eq * 0.15) +
            (conf * 0.10);

        let state = "STABLE";
        if (instabilityScore > 0.65) state = "RISK";
        if (instabilityScore > 0.80) state = "CRITICAL";

        const weakestNode = this.findWeakestNode(frame.system);

        return {
            state,
            instabilityScore: Number(instabilityScore.toFixed(3)),
            weakestNode,
            explanation: this.generateNarrative(frame, weakestNode, state)
        };
    }

    /**
     * Find weakest system node
     */
    findWeakestNode(system) {

        let minNode = "fx";
        let minValue = system.fx;

        for (const key in system) {
            if (system[key] < minValue) {
                minValue = system[key];
                minNode = key;
            }
        }

        return {
            node: minNode,
            value: Number(minValue.toFixed(3))
        };
    }

    /**
     * Human-readable reasoning output
     */
    generateNarrative(frame, weakest, state) {

        return `
SEXTANT REASONING ENGINE

Scenario: ${frame.scenario}
Step: ${frame.step}
Type: ${frame.type}

-------------------------
SYSTEM STATE: ${state}
-------------------------

FX:   ${frame.system.fx.toFixed(3)}
BANK: ${frame.system.bank.toFixed(3)}
LIQ:  ${frame.system.liq.toFixed(3)}
EQ:   ${frame.system.eq.toFixed(3)}
CONF: ${frame.system.conf.toFixed(3)}

Weakest Node: ${weakest.node.toUpperCase()} (${weakest.value})

Propagation Model:
FX → BANK → LIQ → EQ → CONF

Interpretation:
${
    state === "STABLE"
        ? "System remains within controlled thresholds. No cascading instability detected."
        : state === "RISK"
            ? "Stress signals detected. Early cascade propagation possible across financial layers."
            : "CRITICAL STATE: cascading instability active across system nodes."
}
        `.trim();
    }
}

/**
 * GLOBAL EXPORT (browser dashboard safe)
 */
window.SextantReasoning = SextantReasoning;

/**
 * OPTIONAL INIT HELPER (for Step 10 wiring)
 */
window.initReasoning = function () {
    if (!window.orchestra) {
        console.error("Orchestra not found");
        return;
    }

    window.reasoning = new SextantReasoning(window.orchestra);
};
