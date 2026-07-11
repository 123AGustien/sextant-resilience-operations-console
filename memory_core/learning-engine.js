/*
 SEXTANT MEMORY CORE v1.0
 Learning Engine Module

 Purpose:
 - Compare historical scenarios
 - Identify repeating patterns
 - Provide explainable insights
 - Does not modify core rules
*/


const LearningEngine = {

    version: "LEARNING-ENGINE-v1.0",


    analyzeScenario(currentScenario, history) {

        const result = {

            scenario: currentScenario.name,

            matches: [],

            recommendation: "NO_PATTERN_FOUND",

            timestamp: new Date().toISOString()

        };


        if (!history || history.length === 0) {

            return result;

        }


        history.forEach(previous => {

            if (
                previous.name === currentScenario.name
            ) {

                result.matches.push({

                    id: previous.id,

                    status: previous.status,

                    result: previous.result || null

                });

            }

        });


        if (result.matches.length > 0) {

            result.recommendation =
                "PREVIOUS_SCENARIO_AVAILABLE";

        }


        return result;

    },


    calculateTrend(events) {

        if (!events || events.length === 0) {

            return {
                trend: "NO_DATA"
            };

        }


        let averageHealth = 0;


        events.forEach(event => {

            averageHealth +=
                event.system.health || 0;

        });


        averageHealth =
            averageHealth / events.length;


        return {

            averageHealth:
                averageHealth,

            condition:
                averageHealth >= 0.8
                ? "STABLE"
                : "DEGRADED"

        };

    },


    generateInsight(data) {

        return {

            type: "EXPLAINABLE_INSIGHT",

            message:
                "Historical data analysed successfully",

            source:
                data,

            timestamp:
                new Date().toISOString()

        };

    }

};


if (typeof module !== "undefined") {
    module.exports = LearningEngine;
}