/**
 * Sextant Bootstrap Layer
 * Prevents silent OFFLINE states on GitHub Pages
 * Ensures RP-04 + Orchestra are loaded correctly
 */

(function () {

    const status = {
        rp04: false,
        orchestra: false,
        ready: false
    };

    function log(msg) {
        console.log("[SEXTANT BOOT]", msg);
    }

    function checkRP04() {
        if (typeof window.runRP04 === "function") {
            status.rp04 = true;
            log("RP-04 engine detected");
        } else {
            console.error("[SEXTANT BOOT] ERROR: RP-04 missing (window.runRP04)");
        }
    }

    function checkOrchestra() {
        if (typeof window.orchestra !== "undefined") {
            status.orchestra = true;
            log("Orchestra engine detected");
        } else {
            console.warn("[SEXTANT BOOT] WARNING: Orchestra not loaded yet");
        }
    }

    function updateUI() {

        const el = document.getElementById("status");

        if (!el) return;

        if (status.rp04 && status.orchestra) {
            status.ready = true;
            el.innerText = "ONLINE • SEXTANT SYSTEM READY";
            el.style.color = "lime";
        }

        else if (status.rp04) {
            el.innerText = "DEGRADED • ORCHESTRA MISSING";
            el.style.color = "orange";
        }

        else {
            el.innerText = "OFFLINE • ENGINE MISSING";
            el.style.color = "red";
        }
    }

    function boot() {

        log("Boot sequence started...");

        checkRP04();
        checkOrchestra();
        updateUI();

        // 🔁 re-check after short delay (fixes script load order issues)
        setTimeout(() => {
            checkOrchestra();
            updateUI();
        }, 500);

        setTimeout(() => {
            checkOrchestra();
            updateUI();
        }, 1500);
    }

    // Run bootstrap after DOM ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }

})();
