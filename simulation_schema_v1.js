/* =========================================================
   SEXTANT SIMULATION SCHEMA v1 (STABLE TAG BASE)
========================================================= */

window.SEXTANT_SCHEMA_V1 = {
    version: "v1.0.0",
    mode: "STABLE",

    normalize(result) {
        if (!result) return null;

        return {
            state: result.state || "UNKNOWN",
            impact: Number(result.impact ?? 0),
            timestamp: Date.now()
        };
    }
};
