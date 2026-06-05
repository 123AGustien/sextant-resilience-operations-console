/* =========================================================
   SEXTANT RISK GRAPH v4 (STABLE PRODUCTION BUILD)
   - Fixed scaling
   - Safe DOM attach
   - Mobile-safe rendering
   - Clean redraw lifecycle
========================================================= */

window.RiskGraph = (function () {

    let canvas, ctx;

    const data = {
        fx: [],
        bank: [],
        liq: [],
        eq: [],
        conf: []
    };

    function init() {

        if (canvas) return;

        canvas = document.createElement("canvas");
        canvas.id = "riskCanvas";
        canvas.width = 900;
        canvas.height = 240;

        canvas.style.display = "block";
        canvas.style.margin = "20px auto";
        canvas.style.border = "1px solid #2bd4ff";
        canvas.style.background = "#0b0f14";

        const target = document.getElementById("riskGraph");

        if (target) {
            target.innerHTML = ""; // prevent duplicates
            target.appendChild(canvas);
        } else {
            document.body.appendChild(canvas);
        }

        ctx = canvas.getContext("2d");
    }

    function push(result) {

        if (!result) return;

        const sys = result.system || {};

        data.fx.push(sys.fxStress || 0);
        data.bank.push(sys.bankingStress || 0);
        data.liq.push(sys.liquidityStress || 0);
        data.eq.push(sys.equityStress || 0);
        data.conf.push(sys.confidenceDrop || 0);

        trimAll();

        draw();
    }

    function trimAll() {
        limit(data.fx);
        limit(data.bank);
        limit(data.liq);
        limit(data.eq);
        limit(data.conf);
    }

    function limit(arr) {
        if (arr.length > 40) arr.shift();
    }

    function draw() {

        init();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawGrid();

        drawLine(data.fx, "#2bd4ff");
        drawLine(data.bank, "#ff4d4d");
        drawLine(data.liq, "#ffa500");
        drawLine(data.eq, "#b388ff");
        drawLine(data.conf, "#00ff88");

        // label
        ctx.fillStyle = "#d7f3ff";
        ctx.font = "12px Arial";
        ctx.fillText("SEXTANT RISK STREAM (LIVE)", 10, 15);
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

    function normalize(v) {
        // SAFE SCALE FIX (critical)
        if (v > 1) return v / 100;  // impact-style values
        return v;                   // already normalized
    }

    function drawLine(arr, color) {

        if (!arr.length) return;

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        ctx.beginPath();

        for (let i = 0; i < arr.length; i++) {

            const x = (i / 40) * canvas.width;
            const y = canvas.height - (normalize(arr[i]) * canvas.height);

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();
    }

    return { push };

})();
