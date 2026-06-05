/* ======================================================
   SEXTANT RISK GRAPH v8.2 STABLE CANVAS LAYER (FIXED)
====================================================== */

window.RiskGraph = (function () {

    let canvas = null;
    let ctx = null;
    let data = [];

    const MAX = 50;

    // -----------------------------
    // INIT (MOBILE SAFE + DELAY SAFE)
    // -----------------------------
    function init() {

        const container = document.getElementById("riskGraph");
        if (!container) return;

        if (!canvas) {
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
        }
    }

    // -----------------------------
    // PUSH DATA (FORCE RENDER SAFE)
    // -----------------------------
    function push(r) {

        init();

        if (!r) return;

        const value = Number(r.impact ?? 0);

        data.push(value);

        if (data.length > MAX) {
            data = data.slice(-MAX);
        }

        draw();
    }

    // -----------------------------
    // DRAW (FIXED SAFE RENDER LOOP)
    // -----------------------------
    function draw() {

        if (!ctx || !canvas) return;

        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        // GRID
        ctx.strokeStyle = "#1c2a33";
        ctx.lineWidth = 1;

        for (let i = 0; i <= 10; i++) {
            const y = (i / 10) * h;

            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }

        // WAIT STATE (IMPORTANT FIX)
        if (data.length < 1) {
            ctx.fillStyle = "#d7f7ff";
            ctx.font = "12px Arial";
            ctx.fillText("Waiting for simulation data...", 10, 20);
            return;
        }

        // LINE
        if (data.length > 1) {

            ctx.strokeStyle = "#2bd4ff";
            ctx.lineWidth = 2;

            ctx.beginPath();

            for (let i = 0; i < data.length; i++) {

                const x = (i / (data.length - 1)) * w;
                const normalized = Math.min(100, Math.max(0, data[i]));
                const y = h - (normalized / 100) * h;

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }

            ctx.stroke();
        }

        // LABEL
        ctx.fillStyle = "#d7f7ff";
        ctx.font = "12px Arial";
        ctx.fillText("Risk Impact Trend", 10, 18);
    }

    // -----------------------------
    // SAFE BOOT HOOK (CRITICAL FIX)
    // -----------------------------
    window.addEventListener("load", () => {
        setTimeout(() => {
            init();
            push({ impact: 0 });
        }, 300);
    });

    return { push };

})();
