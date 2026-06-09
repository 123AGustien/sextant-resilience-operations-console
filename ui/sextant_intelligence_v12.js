/**
 * Sextant Intelligence v12
 * Natural language → simulation control layer
 * STABLE RUNTIME VERSION (dashboard-safe)
 */

class SextantIntelligence {

    constructor(orchestra, reasoning) {
        this.orchestra = orchestra;
        this.reasoning = reasoning;
        this.lastIntent = null;
    }

    /**
     * Main AI entry point
     */
    ask(question) {

        // -------------------------
        // INPUT VALIDATION
        // -------------------------
        if (typeof question !== "string" || !question.trim()) {
            return this._error("EMPTY_INPUT", "No valid question provided");
        }

        const q = question.toLowerCase().trim();

        // -------------------------
        // DEPENDENCY CHECK
        // -------------------------
        if (!this._validateOrchestra()) {
            return this._error(
                "ORCHESTRA_INVALID",
                "Orchestra layer not properly initialized"
            );
        }

        // -------------------------
        // COMMAND ROUTING (SIMULATION)
        // -------------------------
        if (this._match(q, ["run", "simulate"])) {
            return this._run("normal", "SIMULATION_RUN");
        }

        if (this._match(q, ["failure"])) {
            return this._run("failure", "FAILURE_SIMULATION");
        }

        if (this._match(q, ["cascade"])) {
            return this._run("cascade", "CASCADE_SIMULATION");
        }

        // -------------------------
        // RESET
        // -------------------------
        if (this._match(q, ["reset"])) {
            this.orchestra.reset();
            return this._ok("RESET", "System reset completed");
        }

        // -------------------------
        // REASONING
        // -------------------------
        if (this._match(q, ["why", "explain"])) {

            if (!this._validateReasoning()) {
                return this._error("NO_REASONING", "Reasoning layer missing");
            }

            return {
                intent: "REASONING_QUERY",
                explanation: this.reasoning.explainLatest(),
                frame: this.orchestra.getLatest?.() || null
            };
        }

        // -------------------------
        // STATUS
        // -------------------------
        if (this._match(q, ["status", "state"])) {

            const latest = this.orchestra.getLatest?.() || null;

            return {
                intent: "STATUS_QUERY",
                state: latest?.state || "NO_DATA",
                frame: latest
            };
        }

        // -------------------------
        // DEFAULT
        // -------------------------
        return {
            intent: "GENERAL_QUERY",
            message: "Try: run, failure, cascade, explain, reset, status",
            latestFrame: this.orchestra.getLatest?.() || null
        };
    }

    // =====================================================
    // INTERNAL CORE HELPERS (STABILITY LAYER)
    // =====================================================

    _run(type, intent) {
        const frame = this.orchestra.runStep(type);

        this.lastIntent = intent;

        return {
            intent,
            frame
        };
    }

    _match(text, keywords) {
        return keywords.some(k => text.includes(k));
    }

    _ok(intent, message) {
        this.lastIntent = intent;
        return { intent, message };
    }

    _error(status, message) {
        return { status, message };
    }

    _validateOrchestra() {
        return (
            this.orchestra &&
            typeof this.orchestra.runStep === "function" &&
            typeof this.orchestra.reset === "function"
        );
    }

    _validateReasoning() {
        return (
            this.reasoning &&
            typeof this.reasoning.explainLatest === "function"
        );
    }
}

// expose globally (required for browser dashboard)
window.SextantIntelligence = SextantIntelligence;
