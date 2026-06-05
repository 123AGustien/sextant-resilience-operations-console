window.RiskGraph = (function () {

    let canvas, ctx, data = [];

    function init() {
        const el = document.getElementById("riskGraph");
        if (!el) return;

        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.width = 900;
            canvas.height = 220;
            el.appendChild(canvas);
            ctx = canvas.getContext("2d");
        }
    }

    function push(result) {

        init();

        if (!result) return;

        data.push(result.impact ?? 0);
        if (data.length > 50) data = data.slice(-50);

        draw();
    }

    function draw() {

        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "#2bd4ff";
        ctx.beginPath();

        for (let i = 0; i < data.length; i++) {

            const x = (i / 50) * canvas.width;
            const y = canvas.height - (data[i] / 100) * canvas.height;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();
    }

    return { push };

})();
