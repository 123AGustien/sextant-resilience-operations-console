/**
 * Sextant Question Panel v1
 * UI bridge layer for simulation intelligence
 *
 * Purpose:
 * - Accept user input
 * - Send to SextantIntelligence
 * - Render simulation response
 */

class SextantQuestionPanel {

    constructor(intelligence) {
        this.intelligence = intelligence;
    }

    /**
     * Ask question into simulation system
     */
    ask() {

        const input = document.getElementById("sextant-question-input");

        if (!input) {
            console.error("Missing input field: sextant-question-input");
            return;
        }

        const question = input.value.trim();

        if (!question) return;

        const result = this.intelligence.ask(question);

        this.render(result);
    }

    /**
     * Render output to UI
     */
    render(result) {

        const output = document.getElementById("sextant-ai-output");

        if (!output) return;

        output.innerText = JSON.stringify(result, null, 2);
    }

    /**
     * Reset panel
     */
    reset() {

        const input = document.getElementById("sextant-question-input");
        const output = document.getElementById("sextant-ai-output");

        if (input) input.value = "";
        if (output) output.innerText = "Waiting for simulation input...";
    }
}

/**
 * Global attach function
 */
window.SextantQuestionPanel = {

    instance: null,

    init: function (intelligenceInstance) {
        this.instance = new SextantQuestionPanel(intelligenceInstance);
    },

    ask: function () {
        if (!this.instance) {
            console.error("Panel not initialized");
            return;
        }
        this.instance.ask();
    },

    reset: function () {
        if (!this.instance) return;
        this.instance.reset();
    }
};
