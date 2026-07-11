/*
 SEXTANT MEMORY CORE v1.0
 Industrial Control Screen Memory Layer
 OJK Sandbox Test Module

 Purpose:
 - Capture simulator events
 - Store operational history
 - Provide replay data
*/

const SextantMemoryCore = {

    version: "SMC-v1.0",

    storageKey: "sextant_memory_events",

    saveEvent(event) {

        let history = this.loadHistory();

        const record = {
            id: history.length + 1,
            timestamp: new Date().toISOString(),
            event: event
        };

        history.push(record);

        localStorage.setItem(
            this.storageKey,
            JSON.stringify(history)
        );

        return record;
    },


    loadHistory() {

        const data = localStorage.getItem(
            this.storageKey
        );

        return data ? JSON.parse(data) : [];

    },


    getLatestEvent() {

        const history = this.loadHistory();

        if (history.length === 0) {
            return null;
        }

        return history[history.length - 1];

    },


    clearMemory() {

        localStorage.removeItem(
            this.storageKey
        );

    },


    exportMemory() {

        return JSON.stringify(
            this.loadHistory(),
            null,
            2
        );

    }

};


// Export for browser and modules
if (typeof module !== "undefined") {
    module.exports = SextantMemoryCore;
}