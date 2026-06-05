/* =========================================================
    SEXTANT RISK GRAPH v6 - PRODUCTION STABLE CORE
    CANVAS LAYER (CONTROL ROOM READY)
 ========================================================= */

window.RiskGraph = (function () {

    let canvas = null;
    let ctx = null;
    let data = [];

    const MAX_POINTS = 50;

    // ======================================================
    // INIT (SAFE SINGLETON + MOBILE SAFE)
    // ======================================================
    function init() {

        const container = document.getElementById("riskGraph");
        if (!container) return;

        const existing = document.getElementById("riskCanvas");

        if (existing) {
            canvas = existing;
            ctx = canvas.getContext("2d");
            return;
        }

        canvas = document.createElement("canvas");
        canvas.id = "riskCanvas";

        // responsive safe sizing (mobile friendly upgrade)
        const width = Math.min(900, window.innerWidth - 40);

        canvas.width = width;
        canvas.height = 220;

        canvas.style.border = "1px solid #2bd4ff";
        canvas.style.background = "#0b0f14";
        canvas.style.display = "block";
        canvas.style.margin = "10px auto";

        container.innerHTML = "";
        container.appendChild(canvas);

        ctx = canvas.getContext("2d");
    }

    // ======================================================
    // PUSH DATA (SAFE ENTRY)
    // ======================================================
    function push(result) {

        if (!result) return;

        init();

        const value = Number(result.impact ?? 0);

        data.push(value);

        if (data.length > MAX_POINTS) {
            data = data.slice(-MAX_POINTS);
        }

        draw();
    }

    // ======================================================
    // DRAW ENGINE (SAFE RENDER LOOP)
    // ======================================================
    function draw() {

        if (!ctx || !canvas) return;

        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        // ================= GRID =================
        ctx.strokeStyle = "#1c2a33";
        ctx.lineWidth = 1;

        for (let i = 0; i <= 10; i++) {
            const y = (i / 10) * h;

            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }

        // ================= EMPTY STATE =================
        if (data.length < 2) {
            ctx.fillStyle = "#d7f3ff";
            ctx.font = "12px Arial";
            ctx.fillText("Waiting for simulation data...", 10, 20);
            return;
        }

        // ================= LINE GRAPH =================
        ctx.strokeStyle = "#2bd4ff";
        ctx.lineWidth = 2;

        ctx.beginPath();

        for (let i = 0; i < data.length; i++) {

            const x = (i / (data.length - 1)) * w;

            const normalized = Math.max(0, Math.min(100, data[i]));
            const y = h - (normalized / 100) * h;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();

        // ================= LABEL =================
        ctx.fillStyle = "#d7f3ff";
        ctx.font = "12px Arial";
        ctx.fillText("Risk Impact Trend", 10, 18);
    }

    // ======================================================
    // PUBLIC API
    // ======================================================
    return {
        push
    };

})();
