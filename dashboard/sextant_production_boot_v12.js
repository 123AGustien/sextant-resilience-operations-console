/**
 * Sextant Production Runtime v12
 * FINAL STABILIZED CONTROL ROOM ENGINE
 * Eliminates OFFLINE, missing scripts, and race conditions
 */

(function () {

    // -------------------------
    // SYSTEM CORE STATE
    // -------------------------
    const STATE = {
        engine: false,
        orchestra: false,
        ready: false,
        bootAttempts: 0,
        maxBootAttempts: 5
    };

    // -------------------------
    // SAFE CHECK
    // -------------------------
    function check() {

        STATE.engine = typeof window.runRP04 === "function";
        STATE.orchestra = typeof window.orchestra !== "undefined";

        STATE.ready = STATE.engine && STATE.orchestra;

        return STATE.ready;
    }

    // -------------------------
    // UI STATUS ENGINE
    // -------------------------
    function renderStatus() {

        const el = document.getElementById("status");
        if (!el) return;

        if (!STATE.ready) {
            el.innerText = "SYSTEM BOOTING / DEGRADED";
            el.style.color = "orange";
        } else {
            el.innerText = "CONTROL ROOM ONLINE";
            el.style.color = "lime";
        }
    }

    // -------------------------
    // SAFE RUNNER
    // -------------------------
    function run(type) {

        if (!STATE.ready) {
            console.warn("System not ready yet", STATE);
            return null;
        }

        const frame = window.orchestra.runStep(type);

        const out = document.getElementById("output");
        if (out) out.innerText = JSON.stringify(frame, null, 2);

        return frame;
    }

    // -------------------------
    // RESET SYSTEM
    // -------------------------
    function reset() {

        window.orchestra?.reset?.();

        const out = document.getElementById("output");
        if (out) out.innerText = "RESET";

        const status = document.getElementById("status");
        if (status) status.innerText = "RESET COMPLETE";
    }

    // -------------------------
    // HARD BOOT ENGINE (KEY FIX)
    // -------------------------
    function bootCycle() {

        STATE.bootAttempts++;

        check();
        renderStatus();

        // keep retrying until stable or max attempts
        if (!STATE.ready && STATE.bootAttempts < STATE.maxBootAttempts) {

            setTimeout(bootCycle, 800);
            return;
        }

        if (STATE.ready) {
            console.log("🟢 Sextant v12 PRODUCTION ONLINE", STATE);
        } else {
            console.error("🔴 Sextant failed to stabilize", STATE);
        }
    }

    // -------------------------
    // SAFE GRAPH HOOK
    // -------------------------
    function drawGraph() {

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
    // GLOBAL API (PRODUCTION LOCK)
    // -------------------------
    window.SextantProduction = {
        run,
        reset,
        drawGraph,
        state: STATE
    };

    // AUTO BOOT (CRITICAL)
    window.addEventListener("load", bootCycle);

})();
// =============================
// FORCE GLOBAL BINDING (FIX)
// =============================
window.runAudit = function () {

    // optional: allow live simulator frame later
    const frame = window.lastSimulationFrame || {};

    const result = runAudit(frame);

    const el = document.getElementById("auditResults");

    if (el) {
        el.innerHTML = formatAuditReport(result);
    }

    return result;
};

