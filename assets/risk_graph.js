/* =========================================================
   SEXTANT RISK GRAPH v3 (LIVE DASHBOARD STREAM)
   - Auto-attaches to control system
   - Multi-metric financial risk visualization
   - No manual push required
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

        document.body.appendChild(canvas);

        ctx = canvas.getContext("2d");

        draw();
    }

    function push(result) {

        if (!result) return;

        const sys = result.system || {};

        data.fx.push(sys.fxStress || 0);
        data.bank.push(sys.bankingStress || 0);
        data.liq.push(sys.liquidityStress || 0);
        data.eq.push(sys.equityStress || 0);
        data.conf.push(sys.confidenceDrop || 0);

        limit(data.fx);
        limit(data.bank);
        limit(data.liq);
        limit(data.eq);
        limit(data.conf);

        draw();
    }

    function limit(arr) {
        if (arr.length > 40) arr.shift();
    }

    function draw() {

        init();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawGrid();

        drawLine(data.fx, "#2bd4ff");     // FX stress
        drawLine(data.bank, "#ff4d4d");   // Banking
        drawLine(data.liq, "#ffa500");    // Liquidity
        drawLine(data.eq, "#b388ff");     // Equity
        drawLine(data.conf, "#00ff88");   // Confidence
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

    function drawLine(arr, color) {

        if (!arr.length) return;

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        ctx.beginPath();

        for (let i = 0; i < arr.length; i++) {

            const x = (i / 40) * canvas.width;
            const y = canvas.height - (arr[i] * canvas.height);

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();
    }

    return { push };

})();
