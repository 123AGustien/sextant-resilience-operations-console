/* =========================================================
   SEXTANT RISK GRAPH vFINAL FIX
   - Actually binds to your simulation engine
   - Draws real-time canvas graph
   - Works with control_room.html
========================================================= */

window.RiskGraph = (function () {

    let canvas, ctx;

    const data = [];

    function init() {

        if (canvas) return;

        const container = document.getElementById("riskGraph");

        canvas = document.createElement("canvas");
        canvas.id = "riskCanvas";
        canvas.width = 900;
        canvas.height = 240;

        canvas.style.width = "100%";
        canvas.style.maxWidth = "900px";
        canvas.style.border = "1px solid #2bd4ff";
        canvas.style.background = "#0b0f14";
        canvas.style.display = "block";

        if (container) {
            container.innerHTML = "";
            container.appendChild(canvas);
        } else {
            document.body.appendChild(canvas);
        }

        ctx = canvas.getContext("2d");
    }

    function push(result) {

        if (!result) return;

        // unified risk value (THIS is why your old graph failed)
        const value =
            result.impact ??
            result.system?.fxStress ??
            result.system?.bankingStress ??
            0;

        data.push(value);

        if (data.length > 60) data.shift();

        draw();
    }

    function draw() {

        init();
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawGrid();
        drawLine();

        ctx.fillStyle = "#d7f3ff";
        ctx.fillText("Risk Impact (Live Simulation)", 10, 15);
    }

    function drawGrid() {

        ctx.strokeStyle = "#1c2a33";
        ctx.lineWidth = 1;

        for (let i = 0; i < 10; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * 24);
            ctx.lineTo(canvas.width, i * 24);
            ctx.stroke();
        }
    }

    function drawLine() {

        if (!data.length) return;

        ctx.strokeStyle = "#2bd4ff";
        ctx.lineWidth = 2;

        ctx.beginPath();

        for (let i = 0; i < data.length; i++) {

            const x = (i / 60) * canvas.width;
            const y = canvas.height - (data[i] / 100) * canvas.height;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();
    }

    return { push };

})();
