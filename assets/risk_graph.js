/* =========================================================
   SEXTANT RISK GRAPH vFINAL
   - Stable DOM attach
   - Safe mobile rendering
   - Auto-init on first push
========================================================= */

window.RiskGraph = (function () {

    let canvas = null;
    let ctx = null;

    const data = {
        fx: [],
        bank: [],
        liq: [],
        eq: [],
        conf: []
    };

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
        const max = 50;
        Object.keys(data).forEach(k => {
            if (data[k].length > max) data[k].shift();
        });
    }

    function draw() {

        init();
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawGrid();

        drawLine(data.fx, "#2bd4ff");
        drawLine(data.bank, "#ff4d4d");
        drawLine(data.liq, "#ffa500");
        drawLine(data.eq, "#b388ff");
        drawLine(data.conf, "#00ff88");

        ctx.fillStyle = "#d7f3ff";
        ctx.fillText("Risk Graph (live)", 10, 15);
    }

    function drawGrid() {
        ctx.strokeStyle = "#1c2a33";
        ctx.lineWidth = 1;

        for (let i = 0; i < 10; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * 24);
            ctx.lineTo(900, i * 24);
            ctx.stroke();
        }
    }

    function drawLine(arr, color) {

        if (!arr.length) return;

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        ctx.beginPath();

        for (let i = 0; i < arr.length; i++) {

            const x = (i / 50) * canvas.width;
            const y = canvas.height - (arr[i] * canvas.height);

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();
    }

    return { push };

})();
