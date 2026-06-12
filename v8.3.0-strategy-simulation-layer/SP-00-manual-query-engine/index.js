import rules from "./interpreter.rules.json" assert { type: "json" };

/**
 * SP-00 Manual Query Engine (Institutional v8.3.0)
 * Scenario classification + intent extraction + SP routing preparation
 */

export class SP00ManualQueryEngine {

    /**
     * ENTRY POINT
     */
    parse(input) {

        const text = input || "";

        // Base SP-00 contract
        let result = {
            strategy_request: text,
            timestamp: Date.now(),

            normalized: this.normalize(text),
            intent: this.extractIntent(text),

            scenario_type: "GENERAL_STRESS",
            stress_level: "LOW"
        };

        // Apply SP-00 rule engine (institutional upgrade)
        result = this.applyRules(result, text);

        return result;
    }

    /**
     * RULE ENGINE (SP-00 CORE LOGIC)
     */
    applyRules(result, text) {

        const input = text.toLowerCase();

        for (const rule of rules.rules) {

            if (input.includes(rule.if_contains.toLowerCase())) {

                result.scenario_type = rule.map_to.scenario_type;
                result.stress_level = rule.map_to.stress_level;
            }
        }

        return result;
    }

    /**
     * LEGACY INTENT ENGINE (kept for compatibility with SP-01)
     */
    extractIntent(input) {

        if (!input) return "unknown";

        const text = input.toLowerCase();

        if (text.includes("stress")) return "stress_simulation";
        if (text.includes("failure")) return "failure_mode";
        if (text.includes("cascade")) return "cascade_mode";

        return "general_simulation";
    }

    /**
     * NORMALIZATION LAYER
     */
    normalize(input) {

        if (!input) return "empty_request";

        return input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "_");
    }
}
