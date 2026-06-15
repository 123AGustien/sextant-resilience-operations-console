/**
 * Sextant Orchestra Engine v1.0 (CLEAN)
 * CONTROL LAYER ONLY — NO SIMULATION LOGIC
 */

window.SextantOrchestra = function () {

    this.timeline = [];
    this.lastFrame = null;
    this.currentScenario = null;

    /* =========================
       RUN SINGLE SCENARIO
    ========================= */
    this.run = (scenario) => {

        if (!window.runRP04) {
            console.error("RP-04 engine not found");
            return null;
        }

        // 1. RUN ENGINE (source of truth)
        const frame = window.runRP04(scenario);

        if (!frame) {
            console.error("Engine returned null frame");
            return null;
        }

        // 2. AUDIT PIPELINE
        const audit =
            window.SextantBridge?.captureSimulationResult(frame);

        frame.audit = audit;

        // 3. STORE STATE
        this.timeline.push(frame);
        this.lastFrame = frame;
        this.currentScenario = scenario;

        // 4. GLOBAL SYNC (Control Room + Dashboard)
        window.__SEXTANT_FRAME__ = frame;

        window.dispatchEvent(
            new CustomEvent("sextant:orchestrate", {
                detail: frame
            })
        );

        return frame;
    };

    /* =========================
       RUN FULL SCENARIO SEQUENCE
    ========================= */
    this.runAll = () => {

        const scenarios = ["normal", "failure", "cascade"];

        const results = [];

        for (const s of scenarios) {
            const frame = this.run(s);
            if (frame) results.push(frame);
        }

        return {
            type: "sequence",
            frames: results,
            count: results.length
        };
    };

    /* =========================
       RESET SYSTEM
    ========================= */
    this.reset = () => {
        this.timeline = [];
        this.lastFrame = null;
        this.currentScenario = null;
    };

    /* =========================
       GET STATE
    ========================= */
    this.getState = () => ({
        currentScenario: this.currentScenario,
        timelineLength: this.timeline.length,
        lastFrame: this.lastFrame
    });
};

/* =========================
   GLOBAL INSTANCE
========================= */
window.orchestra = new window.SextantOrchestra();
