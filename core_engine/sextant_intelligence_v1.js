/**
 * Sextant Intelligence Layer v1
 * "Reasoning layer above Orchestra"
 *
 * Purpose:
 * - Accept questions
 * - Convert to simulation actions
 * - Run Orchestra steps
 * - Produce interpretation
 */

class SextantIntelligence {

    constructor(orchestra) {
        this.orchestra = orchestra;
        this.history = [];
    }

    /**
     * MAIN ENTRY: ask a question about system
     */
    ask(question) {

        const intent = this.parseIntent(question);

        const result = this.executeIntent(intent);

        const response = {
            question,
            intent,
            result,
            timestamp: Date.now()
        };

        this.history.push(response);
        return response;
    }

    /**
     * Convert natural language → simulation intent
     */
    parseIntent(question) {

        const q = question.toLowerCase();

        // FX shock scenario
        if (q.includes("fx") && (q.includes("spike") || q.includes("shock"))) {
            return {
                type: "cascade",
                steps: 3,
                mode: "stress_fx"
            };
        }

        // failure mode
        if (q.includes("failure")) {
            return {
                type: "failure",
                steps: 2,
                mode: "stress_failure"
            };
        }

        // cascade mode
        if (q.includes("cascade")) {
            return {
                type: "cascade",
                steps: 4,
                mode: "stress_cascade"
            };
        }

        // default normal simulation
        return {
            type: "normal",
            steps: 1,
            mode: "baseline"
        };
    }

    /**
     * Execute simulation through Orchestra
     */
    executeIntent(intent) {

        const frames = [];

        for (let i = 0; i < intent.steps; i++) {
            const frame = this.orchestra.runStep(intent.type);
            frames.push(frame);
        }

        const latest = frames[frames.length - 1];

        return {
            mode: intent.mode,
            frames,
            finalState: latest.state,
            fx: latest.fx,
            stability: latest.rp04.stability,
            interpretation: this.interpret(latest)
        };
    }

    /**
     * Convert numeric output → readable meaning
     */
    interpret(frame) {

        if (frame.state === "RISK" && frame.fx > 0.8) {
            return "High FX pressure detected. System entering stress regime.";
        }

        if (frame.state === "RISK") {
            return "System degraded but stable under controlled stress.";
        }

        return "System stable. No cascade propagation detected.";
    }

    reset() {
        this.history = [];
    }
}

// expose globally
window.SextantIntelligence = SextantIntelligence;
