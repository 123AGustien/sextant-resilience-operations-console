(function () {

    function boot() {

        if (!window.orchestra) {
            console.error("Orchestra not loaded");
            return;
        }

        if (!window.runRP04) {
            console.error("RP-04 engine not loaded");
            return;
        }

        console.log("🧭 Sextant Simulation Screen READY");
    }

    window.addEventListener("load", boot);

})();
