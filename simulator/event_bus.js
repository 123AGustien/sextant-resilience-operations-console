/**
 * =====================================================
 * Sextant Unified Event Bus v1.1 (STABLE + DEBUG)
 * simulator/event_bus.js
 * SINGLE SOURCE OF TRUTH FOR ALL UI SYNC
 * =====================================================
 */

(function () {

    let listenerCount = 0;

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

            console.log("📡 SextantBus emit →", frame);

            try {

                window.dispatchEvent(
                    new CustomEvent("sextant:frame", {
                        detail: frame
                    })
                );

            } catch (err) {
                console.error("SextantBus emit failed:", err);
            }
        },

        /**
         * Subscribe to unified system output
         */
        on(handler) {

            if (typeof handler !== "function") {
                console.warn("SextantBus: invalid handler");
                return;
            }

            listenerCount++;

            console.log("👂 SextantBus listener registered (#" + listenerCount + ")");

            window.addEventListener("sextant:frame", (e) => {
                try {
                    handler(e.detail);
                } catch (err) {
                    console.error("SextantBus listener error:", err);
                }
            });
        },

        /**
         * Debug helper
         */
        test() {

            console.log("🧪 SextantBus TEST trigger");

            this.emit({
                test: true,
                message: "SextantBus OK",
                timestamp: Date.now()
            });
        },

        /**
         * Debug: check system health
         */
        status() {
            return {
                listeners: listenerCount,
                ready: true,
                timestamp: Date.now()
            };
        }
    };

    console.log("🧭 SextantBus v1.1 loaded (STABLE MODE)");

})();
