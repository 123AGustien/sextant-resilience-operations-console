/* =========================================================
   SEXTANT RISK GRAPH v2 (STABLE BUILD)
   - Canvas live line chart
   - Mobile safe
   - Auto-init safe guard
   - Simulation-compatible
========================================================= */

window.RiskGraph = (function () {

    let data = [];
    let canvas = null;
    let ctx = null;
    let initialized = false;

    /* =========================
       INIT CANVAS (SAFE)
    ========================= */
    function init() {

        if (initialized) return;

        canvas = document.getElementById("riskCanvas");

        // If missing, create automatically
        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.id = "riskCanvas";
            canvas.width = 900;
            canvas.height = 220;

            canvas.style.marginTop = "20px";
            canvas.style.border = "1px solid #2bd4ff";
            canvas.style.background = "#0b0f14";

            document.body.appendChild(canvas);
        }

        ctx = canvas.getContext("2d");
        initialized = true;
    }

    /* =========================
       PUSH NEW DATA POINT
    ========================= */
    function push(snapshot) {

        if (!snapshot) return;

        init();

        const value =
            snapshot.impact ??
            snapshot.system?.fxStress ??
            snapshot.stress ??
            0;

        data.push(value);

        if (data.length > 50) {
            data.shift();
        }

        draw();
    }

    /* =========================
       DRAW GRAPH
    ========================= */
    function draw() {

        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // GRID
        ctx.strokeStyle = "#1c2a33";

        for (let i = 0; i < 10; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * 22);
            ctx.lineTo(canvas.width, i * 22);
            ctx.stroke();
        }

        // LINE
        ctx.strokeStyle = "#2bd4ff";
        ctx.lineWidth = 2;

        ctx.beginPath();

        for (let i = 0; i < data.length; i++) {

            const x = (i / 50) * canvas.width;
            const y = canvas.height - (data[i] / 100) * canvas.height;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();

        // LABEL
        ctx.fillStyle = "#d7f3ff";
        ctx.font = "12px Arial";
        ctx.fillText("Risk Impact Trend (live)", 10, 15);
    }

    return {
        push
    };

})();
