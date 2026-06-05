window.RiskGraph = (function () {

    let canvas, ctx;
    let data = [];
    const MAX = 50;

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

    function push(result) {

        init();

        if (!result) return;

        const v = Number(result.impact ?? 0);

        data.push(v);
        if (data.length > MAX) data = data.slice(-MAX);

        draw();
    }

    function draw() {

        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        // grid
        ctx.strokeStyle = "#1c2a33";

        for (let i = 0; i <= 10; i++) {
            const y = (i / 10) * h;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }

        if (data.length < 2) {
            ctx.fillStyle = "#d7f3ff";
            ctx.fillText("Waiting for simulation...", 10, 20);
            return;
        }

        // line
        ctx.strokeStyle = "#2bd4ff";
        ctx.beginPath();

        for (let i = 0; i < data.length; i++) {

            const x = (i / (data.length - 1)) * w;
            const y = h - (Math.min(100, data[i]) / 100) * h;

            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        ctx.stroke();

        ctx.fillStyle = "#d7f3ff";
        ctx.fillText("Risk Impact Trend", 10, 18);
    }

    return { push };

})();
