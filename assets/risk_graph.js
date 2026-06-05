/* =========================================================
   SEXTANT RISK GRAPH v6 - STABLE PRODUCTION CORE
========================================================= */

window.RiskGraph = (function () {

    let canvas = null;
    let ctx = null;
    let data = [];
    let initialized = false;

    const MAX_POINTS = 50;

    // -----------------------------
    // INIT (SAFE SINGLETON + REUSE)
    // -----------------------------
    function init() {

        const container = document.getElementById("riskGraph");
        if (!container) return;

        // reuse existing canvas if present
        const existing = document.getElementById("riskCanvas");

        if (existing) {
            canvas = existing;
            ctx = canvas.getContext("2d");
            initialized = true;
            return;
        }

        canvas = document.createElement("canvas");
        canvas.id = "riskCanvas";

        canvas.width = 900;
        canvas.height = 220;

        canvas.style.border = "1px solid #2bd4ff";
        canvas.style.background = "#0b0f14";
        canvas.style.display = "block";
        canvas.style.margin = "10px auto";

        container.innerHTML = "";
        container.appendChild(canvas);

        ctx = canvas.getContext("2d");

        initialized = true;

        draw();
    }

    // -----------------------------
    // PUSH DATA (SAFE ENTRY)
    // -----------------------------
    function push(result) {

        if (!result) return;

        init();

        const value = Number(result?.impact ?? 0);

        data.push(value);

        if (data.length > MAX_POINTS) {
            data.splice(0, data.length - MAX_POINTS);
        }

        draw();
    }

    // -----------------------------
    // DRAW ENGINE (STABLE RENDER)
    // -----------------------------
    function draw() {

        if (!ctx || !canvas) return;

        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        // background grid
        ctx.strokeStyle = "#1c2a33";
        ctx.lineWidth = 1;

        for (let i = 0; i <= 10; i++) {
            const y = (i / 10) * h;

            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }

        if (data.length < 2) {
            ctx.fillStyle = "#d7f3ff";
            ctx.font = "12px Arial";
            ctx.fillText("Waiting for simulation data...", 10, 20);
            return;
        }

        // line graph
        ctx.strokeStyle = "#2bd4ff";
        ctx.lineWidth = 2;

        ctx.beginPath();

        for (let i = 0; i < data.length; i++) {

            const x = (i / (data.length - 1)) * w;
            const normalized = Math.min(Math.max(data[i], 0), 100);
            const y = h - (normalized / 100) * h;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();

        // label
        ctx.fillStyle = "#d7f3ff";
        ctx.font = "12px Arial";
        ctx.fillText("Risk Impact Trend", 10, 18);
    }

    // -----------------------------
    // PUBLIC API
    // -----------------------------
    return {
        push
    };

})();
