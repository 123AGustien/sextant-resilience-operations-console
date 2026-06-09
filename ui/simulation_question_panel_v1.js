/**
 * Sextant Simulation Question Panel v1
 * UI → Intelligence bridge layer
 *
 * Purpose:
 * - Capture user questions
 * - Send to SextantIntelligence
 * - Render simulation reasoning output
 */

(function () {

    /**
     * Initialize question panel
     */
    function initQuestionPanel(intelligenceInstance) {

        if (!intelligenceInstance) {
            console.error("Intelligence layer not found");
            return;
        }

        window.SEXTANT_AI = intelligenceInstance;
    }

    /**
     * Ask simulation question
     */
    function askSimulationQuestion() {

        const input = document.getElementById("sextant-question-input");

        if (!input) {
            console.error("Input field missing");
            return;
        }

        const question = input.value.trim();

        if (!question) return;

        const result = window.SEXTANT_AI.ask(question);

        renderResult(result);
    }

    /**
     * Render AI simulation response
     */
    function renderResult(result) {

        const output = document.getElementById("sextant-ai-output");

        if (!output) return;

        output.innerText = JSON.stringify(result, null, 2);
    }

    /**
     * Reset UI panel
     */
    function resetPanel() {

        const output = document.getElementById("sextant-ai-output");
        const input = document.getElementById("sextant-question-input");

        if (input) input.value = "";
        if (output) output.innerText = "Waiting for simulation input...";
    }

    // expose globally for HTML buttons
    window.SextantQuestionPanel = {
        init: initQuestionPanel,
        ask: askSimulationQuestion,
        reset: resetPanel
    };

})();
