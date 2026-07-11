/*
 SEXTANT MEMORY CORE v1.0
 Event Memory Module

 Purpose:
 - Capture industrial control events
 - Store telemetry snapshots
 - Link system state to memory records
*/


const EventMemory = {

    version: "EVENT-MEMORY-v1.0",


    createEvent(mode, system) {

        return {

            eventType: "SYSTEM_EVENT",

            mode: mode,

            system: {

                power: system.power,
                temp: system.temp,
                net: system.net,
                health: system.health

            },

            timestamp: new Date().toISOString()

        };

    },


    saveEvent(mode, system) {

        const event = this.createEvent(
            mode,
            system
        );


        if (typeof SextantMemoryCore !== "undefined") {

            return SextantMemoryCore.saveEvent(
                event
            );

        }


        return event;

    },


    classifyHealth(system) {

        if (system.health >= 0.8) {
            return "NORMAL";
        }

        if (system.health >= 0.5) {
            return "WARNING";
        }

        return "CRITICAL";

    },


    generateSnapshot(system) {

        return {

            power: system.power,
            thermal: system.temp,
            network: system.net,
            health: system.health,
            status: this.classifyHealth(system),
            timestamp: Date.now()

        };

    }

};


if (typeof module !== "undefined") {
    module.exports = EventMemory;
}