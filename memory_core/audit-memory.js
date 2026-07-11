/*
 SEXTANT MEMORY CORE v1.0
 Audit Memory Module

 Purpose:
 - Create operational audit records
 - Preserve traceability
 - Support validation review
*/


const AuditMemory = {

    version: "AUDIT-MEMORY-v1.0",

    auditLog: [],


    record(action, data) {

        const entry = {

            auditId: this.auditLog.length + 1,

            action: action,

            data: data,

            timestamp: new Date().toISOString(),

            integrity: "VALID"

        };


        this.auditLog.push(entry);

        return entry;

    },


    getAuditLog() {

        return this.auditLog;

    },


    getLatestRecord() {

        if (this.auditLog.length === 0) {
            return null;
        }


        return this.auditLog[
            this.auditLog.length - 1
        ];

    },


    exportAudit() {

        return JSON.stringify(
            this.auditLog,
            null,
            2
        );

    },


    clearAudit() {

        this.auditLog = [];

    }

};


if (typeof module !== "undefined") {
    module.exports = AuditMemory;
}