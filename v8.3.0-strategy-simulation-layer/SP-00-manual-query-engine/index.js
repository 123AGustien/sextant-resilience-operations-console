export class SP00ManualQueryEngine {

    /**
     * SP-00
     * Converts raw user intent into structured strategy request
     */

    parse(input) {

        return {
            strategy_request: input || "undefined",
            timestamp: Date.now(),

            normalized: this.normalize(input),
            intent: this.extractIntent(input)
        };
    }

    normalize(input) {

        if (!input) return "empty_request";

        return input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "_");
    }

    extractIntent(input) {

        if (!input) return "unknown";

        if (input.includes("stress")) return "stress_simulation";
        if (input.includes("failure")) return "failure_mode";
        if (input.includes("cascade")) return "cascade_mode";

        return "general_simulation";
    }
}
