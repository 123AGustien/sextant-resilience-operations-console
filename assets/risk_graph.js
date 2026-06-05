/* =========================================================
   SEXTANT RISK GRAPH v2 (REAL CHART)
   - Canvas line graph
   - Mobile safe
   - Live updates from simulation engine
========================================================= */

window.RiskGraph = (function () {

    let data = [];

    let canvas, ctx;

    function init() {

        if (document.getElementById("riskCanvas")) return;

        canvas = document.createElement("canvas");
        canvas.id = "riskCanvas";
        canvas.width = 900;
        canvas.height = 200;
        canvas.style.marginTop = "20px";
        canvas.style.border = "1px solid #2bd4ff";
        canvas.style.background = "#0b0f14";

        document.body.appendChild(canvas);

        ctx = canvas.getContext("2d");
    }

    function push(snapshot) {

        if (!snapshot) return;

        const value =
            snapshot.impact ||
            snapshot.system?.fxStress ||
            0;

        data.push(value);

        if (data.length > 50) data.shift();

        draw();
    }

    function draw() {

        init();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // background grid
        ctx.strokeStyle = "#1c2a33";
        for (let i = 0; i < 10; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * 20);
            ctx.lineTo(canvas.width, i * 20);
            ctx.stroke();
        }

        // line
        ctx.strokeStyle = "#2bd4ff";
        ctx.beginPath();

        for (let i = 0; i < data.length; i++) {

            let x = (i / 50) * canvas.width;
            let y = canvas.height - (data[i] / 100) * canvas.height;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();

        // label
        ctx.fillStyle = "#d7f3ff";
        ctx.fillText("Risk Impact Trend (live)", 10, 15);
    }

    return {
        push
    };

})();
