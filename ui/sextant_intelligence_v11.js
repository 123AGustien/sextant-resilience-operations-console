/**
 * Sextant Intelligence Layer v11
 * FINAL AI INTERFACE ABOVE ORCHESTRA + REASONING
 *
 * Purpose:
 * - Accept natural language questions
 * - Convert into simulation commands
 * - Run RP-04 via Orchestra
 * - Return reasoning explanation
 */

class SextantIntelligence {

    constructor(orchestra, reasoning) {
        this.orchestra = orchestra;
        this.reasoning = reasoning;
        this.history = [];
    }

    /**
     * MAIN ENTRY: ask a question in natural language
     */
    ask(question) {

        const intent = this._parseIntent(question);
        const type = intent.simulationType;

        // 1. run simulation through orchestra
        const frame = this.orchestra.runStep(type);

        // 2. run reasoning layer
        const explanation = this.reasoning._analyzeFrame(frame);

        // 3. build AI response
        const response = {
            question,
            intent,
            frame,
            explanation
        };

        this.history.push(response);

        return response;
    }

    /**
     * SIMPLE NLP → SIMULATION MAPPER
     */
    _parseIntent(question) {

        const q = question.toLowerCase();

        let simulationType = "normal";

        if (q.includes("collapse") || q.includes("crash") || q.includes("fail")) {
            simulationType = "failure";
        }

        if (q.includes("cascade") || q.includes("systemic") || q.includes("domino")) {
            simulationType = "cascade";
        }

        if (q.includes("stable") || q.includes("safe")) {
            simulationType = "normal";
        }

        return {
            simulationType,
            confidence: 0.7
        };
    }

    /**
     * GET HISTORY
     */
    getHistory() {
        return this.history;
    }

    /**
     * RESET AI STATE
     */
    reset() {
        this.history = [];
    }
}

// expose globally
window.SextantIntelligence = SextantIntelligence;
