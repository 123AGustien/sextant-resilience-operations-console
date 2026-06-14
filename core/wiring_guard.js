/**
 * Sextant Wiring Guard — Auto-Safe Layer
 * Prevents broken simulation flows across UI screens
 */

(function () {

    /**
     * SAFE GLOBAL RUNNER
     * Replaces ALL direct simulation calls
     */
    window.SextantRun = function(type, options = {}) {

        // ==============================
        // 1. CONTROL ROOM EXECUTION
        // ==============================

        if (!window.SextantControlRoom) {
            throw new Error("ControlRoom missing — system not initialized");
        }

        const frame = window.SextantControlRoom.runScenario(type);

        // ==============================
        // 2. BRIDGE ENFORCEMENT
        // ==============================

        const finalFrame = window.SextantBridge
            ? window.SextantBridge.captureSimulationResult(frame)
            : frame;

        // ==============================
        // 3. AUTO UI HOOK (IF EXISTS)
        // ==============================

        if (options.onUpdate && typeof options.onUpdate === "function") {
            options.onUpdate(finalFrame);
        }

        // ==============================
        // 4. GLOBAL EVENT STREAM
        // ==============================

        window.dispatchEvent(new CustomEvent("sextant:run", {
            detail: finalFrame
        }));

        return finalFrame;
    };

})();
