/* ========================================================
   SEXTANT RISK GRAPH MODULE (Phase 8/9 Light)
   - Lightweight state graphing
   - Mobile-safe (no heavy libraries)
   - Works with control_room.html
======================================================== */

window.RiskGraph = (function () {

    let history = [];

    /* ---------------------------
       Push simulation snapshot
    ----------------------------*/
    function push(snapshot) {

        if (!snapshot) return;

        const state = snapshot.final_state || "UNKNOWN";

        const entry = {
            time: Date.now(),
            state: state,
            fx: snapshot?.fx?.usd_idr || 0,
            liquidity: snapshot?.system?.liquidityStress || 0,
            banking: snapshot?.system?.bankingStress || 0
        };

        history.push(entry);

        // keep last 20 points only (mobile safe)
        if (history.length > 20) {
            history.shift();
        }

        render();
    }

    /* ---------------------------
       Render simple graph (DOM)
    ----------------------------*/
    function render() {

        let container = document.getElementById("riskGraph");

        if (!container) {
            container = document.createElement("div");
            container.id = "riskGraph";
            container.style.marginTop = "20px";
            container.style.padding = "10px";
            container.style.border = "1px solid #2bd4ff";
            container.style.fontSize = "12px";
            container.style.textAlign = "left";

            document.body.appendChild(container);
        }

        let html = "<b>RISK HISTORY (last 20)</b><br><br>";

        history.forEach((h, i) => {

            let color = "lime";
            if (h.state === "RED") color = "red";
            if (h.state === "RISK") color = "orange";
            if (h.state === "CRITICAL") color = "magenta";

            html += `
                <div style="margin-bottom:4px;">
                    <span style="color:${color};">
                        ${i + 1}. ${h.state}
                    </span>
                    | FX: ${h.fx}
                    | LIQ: ${h.liquidity}
                    | BANK: ${h.banking}
                </div>
            `;
        });

        container.innerHTML = html;
    }

    /* ---------------------------
       Public API
    ----------------------------*/
    return {
        push,
        getHistory: () => history
    };

})();
