/**
 * Sextant Intelligence v11
 * Natural language → simulation control layer
 * FINAL STABILIZED VERSION (FRONTEND ONLY SAFE + BANK UPGRADE S1–S5)
 */

class SextantIntelligence {

    constructor(orchestra, reasoning) {
        this.orchestra = orchestra;
        this.reasoning = reasoning;
    }

    /**
     * 🏦 BANK RISK CLASSIFIER (S1–S5)
     */
    getRiskClass(stability) {

        if (stability > 0.80) return "S1";
        if (stability > 0.65) return "S2";
        if (stability > 0.50) return "S3";
        if (stability > 0.35) return "S4";
        return "S5";
    }

    /**
     * Main AI entry point
     */
    ask(question) {

        // -------------------------
        // INPUT VALIDATION
        // -------------------------
        if (!question || typeof question !== "string") {
            return {
                status: "EMPTY_INPUT",
                message: "No valid question provided"
            };
        }

        const q = question.toLowerCase().trim();

        // -------------------------
        // ORCHESTRA SAFETY CHECK
        // -------------------------
        if (
            !this.orchestra ||
            typeof this.orchestra.runStep !== "function" ||
            typeof this.orchestra.reset !== "function"
        ) {
            return {
                status: "ORCHESTRA_INVALID",
                message: "Orchestra layer not properly initialized"
            };
        }

        // -------------------------
        // SIMULATION COMMANDS
        // -------------------------
        if (q.includes("run") || q.includes("simulate")) {

            const frame = this.orchestra.runStep("normal");

            return {
                intent: "SIMULATION_RUN",
                frame,
                riskClass: this.getRiskClass(frame?.stability || 0.8)
            };
        }

        if (q.includes("failure")) {

            const frame = this.orchestra.runStep("failure");

            return {
                intent: "FAILURE_SIMULATION",
                frame,
                riskClass: this.getRiskClass(frame?.stability || 0.55)
            };
        }

        if (q.includes("cascade")) {

            const frame = this.orchestra.runStep("cascade");

            return {
                intent: "CASCADE_SIMULATION",
                frame,
                riskClass: this.getRiskClass(frame?.stability || 0.25)
            };
        }

        // -------------------------
        // RESET COMMAND
        // -------------------------
        if (q.includes("reset")) {

            this.orchestra.reset();

            return {
                intent: "RESET",
                message: "System reset completed",
                riskClass: "S1"
            };
        }

        // -------------------------
        // REASONING LAYER
        // -------------------------
        if (q.includes("why") || q.includes("explain")) {

            if (!this.reasoning || typeof this.reasoning.explainLatest !== "function") {
                return {
                    status: "NO_REASONING",
                    message: "Reasoning layer missing",
                    riskClass: "S3"
                };
            }

            const explanation = this.reasoning.explainLatest();

            return {
                intent: "REASONING_QUERY",
                explanation,
                riskClass: "S3"
            };
        }

        // -------------------------
        // STATUS QUERY (SAFE + FULL BANK VIEW)
        // -------------------------
        if (q.includes("status") || q.includes("state")) {

            const latest =
                this.orchestra.getLastReport?.() ||
                this.orchestra.timeline?.at(-1) ||
                null;

            const stability =
                latest?.stability ||
                latest?.engine?.stability ||
                latest?.systemStability ||
                0.75;

            return {
                intent: "STATUS_QUERY",
                state:
                    latest?.state ||
                    latest?.engine?.state ||
                    latest?.systemState ||
                    "NO_DATA",

                riskClass: this.getRiskClass(stability),

                frame: latest
            };
        }

        // -------------------------
        // DEFAULT RESPONSE
        // -------------------------
        const latest =
            this.orchestra.getLastReport?.() ||
            this.orchestra.timeline?.at(-1) ||
            null;

        return {
            intent: "GENERAL_QUERY",
            message: "No mapping found. Try: run, failure, cascade, explain, reset, status",
            riskClass: "S3",
            latestFrame: latest
        };
    }
}

// expose globally (frontend only)
window.SextantIntelligence = SextantIntelligence;
