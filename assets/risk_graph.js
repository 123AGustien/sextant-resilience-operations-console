/* =========================================================
   SEXTANT RISK GRAPH v4 (FIXED + GUARANTEED RENDER)
========================================================= */

window.RiskGraph = (function () {

    let canvas, ctx;
    let data = [];

    function init() {

        const container = document.getElementById("riskGraph");
        if (!container) return;

        // prevent duplicate canvas
        if (document.getElementById("riskCanvas")) return;

        canvas = document.createElement("canvas");
        canvas.id = "riskCanvas";
        canvas.width = 900;
        canvas.height = 220;

        canvas.style.border = "1px solid #2bd4ff";
        canvas.style.background = "#0b0f14";
        canvas.style.display = "block";
        canvas.style.margin = "10px auto";

        container.appendChild(canvas);

        ctx = canvas.getContext("2d");

        draw(); // IMPORTANT: initial render
    }

    function push(result) {

        if (!result) return;

        init(); // IMPORTANT: ensure canvas exists BEFORE push

        const value = result.impact ?? 0;

        data.push(value);

        if (data.length > 50) data.shift();

        draw();
    }

    function draw() {

        if (!ctx || !canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // grid
        ctx.strokeStyle = "#1c2a33";
        for (let i = 0; i < 10; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * 22);
            ctx.lineTo(canvas.width, i * 22);
            ctx.stroke();
        }

        // line
        ctx.strokeStyle = "#2bd4ff";
        ctx.beginPath();

        for (let i = 0; i < data.length; i++) {

            const x = (i / 50) * canvas.width;
            const y = canvas.height - (data[i] / 100) * canvas.height;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();

        ctx.fillStyle = "#d7f3ff";
        ctx.fillText("Risk Impact Trend", 10, 15);
    }

    return { push };

})();
