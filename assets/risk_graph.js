/* =========================================================
   SEXTANT RISK GRAPH v5 (CLEAN STABLE)
========================================================= */

window.RiskGraph = (function () {

    let canvas = null;
    let ctx = null;
    let data = [];

    function init() {

        const container = document.getElementById("riskGraph");
        if (!container) return;

        // prevent duplicate canvas
        let existing = document.getElementById("riskCanvas");
        if (existing) {
            canvas = existing;
            ctx = canvas.getContext("2d");
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

        container.appendChild(canvas);

        ctx = canvas.getContext("2d");
        draw();
    }

    function push(result) {

        if (!result) return;

        init();

        const value = result?.impact ?? 0;

        data.push(value);
        if (data.length > 50) data.shift();

        draw();
    }

    function draw() {

        if (!ctx || !canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // grid
        ctx.strokeStyle = "#1c2a33";
        for (let i = 0; i <= 10; i++) {
            const y = i * (canvas.height / 10);
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // line
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

        // label
        ctx.fillStyle = "#d7f3ff";
        ctx.font = "12px Arial";
        ctx.fillText("Risk Impact Trend", 10, 18);
    }

    return { push };

})();
