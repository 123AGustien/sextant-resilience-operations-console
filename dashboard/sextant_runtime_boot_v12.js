/**
 * Sextant Runtime v12
 * FULL SYSTEM STABILIZER
 * Fixes OFFLINE / Failed fetch / undefined engine issues
 */

(function () {

    // -------------------------
    // SYSTEM STATE
    // -------------------------
    const STATE = {
        engine: false,
        orchestra: false,
        reasoning: false,
        ready: false
    };

    // -------------------------
    // DEPENDENCY CHECK
    // -------------------------
    function checkDependencies() {

        STATE.engine = typeof window.runRP04 === "function";
        STATE.orchestra = typeof window.orchestra !== "undefined";
        STATE.reasoning = typeof window.SextantReasoning === "function";

        STATE.ready = STATE.engine && STATE.orchestra;

        return STATE.ready;
    }

    // -------------------------
    // STATUS UI
    // -------------------------
    function updateStatus() {

        const el = document.getElementById("status");
        if (!el) return;

        if (!STATE.ready) {
            el.innerText = "OFFLINE / DEGRADED";
            el.style.color = "red";
        } else {
            el.innerText = "ONLINE / READY";
            el.style.color = "lime";
        }
    }

    // -------------------------
    // SIMULATION RUNNER
    // -------------------------
    function run(type) {

        if (!STATE.ready) {
            console.error("System not ready", STATE);
            return {
                status: "OFFLINE",
                message: "Engine or Orchestra not loaded"
            };
        }

        const frame = window.orchestra.runStep(type);

        const output = document.getElementById("output");
        if (output) {
            output.innerText = JSON.stringify(frame, null, 2);
        }

        return frame;
    }

    // -------------------------
    // RESET SYSTEM
    // -------------------------
    function reset() {

        if (window.orchestra) {
            window.orchestra.reset();
        }

        const output = document.getElementById("output");
        if (output) output.innerText = "RESET";

        const status = document.getElementById("status");
        if (status) status.innerText = "RESET";
    }

    // -------------------------
    // SAFE GRAPH RENDER
    // -------------------------
    function safeGraph() {

        const canvas = document.getElementById("graph");
        if (!canvas || !window.logs) return;

        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.strokeStyle = "#2bd4ff";

        window.logs.forEach((l, i) => {

            const x = i * 40;
            const y = 180 - (l.system.fx * 150);

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });

        ctx.stroke();
    }

    // -------------------------
    // BOOT SEQUENCE (STABLE RETRY)
    // -------------------------
    function boot() {

        checkDependencies();
        updateStatus();

        setTimeout(() => {
            checkDependencies();
            updateStatus();
        }, 1000);

        setTimeout(() => {
            checkDependencies();
            updateStatus();
        }, 3000);

        console.log("Sextant Runtime v12 booted", STATE);
    }

    // -------------------------
    // GLOBAL EXPORT
    // -------------------------
    window.SextantRuntime = {
        run,
        reset,
        boot,
        safeGraph,
        state: STATE
    };

    window.addEventListener("load", boot);

})();
