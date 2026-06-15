/**
 * =====================================================
 * Sextant Unified Event Bus v1.0
 * simulator/event_bus.js
 * SINGLE SOURCE OF TRUTH FOR ALL UI SYNC
 * =====================================================
 */

(function () {

    /**
     * GLOBAL EVENT CONTRACT
     * All systems MUST emit through this bus
     */
    window.SextantBus = {

        /**
         * Emit a simulation frame to ALL listeners
         */
        emit(frame) {

            if (!frame) {
                console.warn("SextantBus: empty frame ignored");
                return;
            }

            window.dispatchEvent(
                new CustomEvent("sextant:frame", {
                    detail: frame
                })
            );
        },

        /**
         * Subscribe to unified system output
         */
        on(handler) {

            if (typeof handler !== "function") {
                console.warn("SextantBus: invalid handler");
                return;
            }

            window.addEventListener("sextant:frame", (e) => {
                handler(e.detail);
            });
        },

        /**
         * Debug helper
         */
        test() {
            this.emit({
                test: true,
                message: "SextantBus OK",
                timestamp: Date.now()
            });
        }
    };

    console.log("🧭 SextantBus v1.0 loaded");

})();
