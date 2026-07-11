/*
 SEXTANT MEMORY CORE v1.0
 Scenario Memory Module

 Purpose:
 - Store complete simulation scenarios
 - Track scenario lifecycle
 - Support replay and analysis
*/


const ScenarioMemory = {

    version: "SCENARIO-MEMORY-v1.0",

    scenarios: [],


    createScenario(name) {

        const scenario = {

            id: this.scenarios.length + 1,

            name: name,

            startTime: new Date().toISOString(),

            status: "RUNNING",

            events: []

        };


        this.scenarios.push(scenario);

        return scenario;

    },


    addEvent(scenarioId, event) {

        const scenario = this.scenarios.find(
            s => s.id === scenarioId
        );


        if (!scenario) {
            return null;
        }


        scenario.events.push(event);

        return scenario;

    },


    completeScenario(scenarioId, result) {

        const scenario = this.scenarios.find(
            s => s.id === scenarioId
        );


        if (!scenario) {
            return null;
        }


        scenario.status = "COMPLETED";

        scenario.endTime =
            new Date().toISOString();

        scenario.result = result;


        return scenario;

    },


    getScenario(id) {

        return this.scenarios.find(
            s => s.id === id
        );

    },


    getAllScenarios() {

        return this.scenarios;

    },


    clearScenarios() {

        this.scenarios = [];

    }

};


if (typeof module !== "undefined") {
    module.exports = ScenarioMemory;
}