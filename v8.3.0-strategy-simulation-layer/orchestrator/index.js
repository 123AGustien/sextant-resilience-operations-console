import { SP00ManualQueryEngine } from "../SP-00-manual-query-engine/index.js";
import { SP01StrategyDefinition } from "../SP-01-strategy-definition/index.js";
import { SP02ScenarioExecution } from "../SP-02-scenario-execution/index.js";
import { SP03StressReplay } from "../SP-03-stress-replay/index.js";
import { SP04ResilienceAssessment } from "../SP-04-resilience-assessment/index.js";
import { SP05InstitutionalReview } from "../SP-05-institutional-review/index.js";

/**
 * SP-ORCHESTRATOR
 * Institutional pipeline controller for Sextant System
 */

export class SextantOrchestrator {

    constructor() {

        this.sp00 = new SP00ManualQueryEngine();
        this.sp01 = new SP01StrategyDefinition();
        this.sp02 = new SP02ScenarioExecution();
        this.sp03 = new SP03StressReplay();
        this.sp04 = new SP04ResilienceAssessment();
        this.sp05 = new SP05InstitutionalReview();

        this.execution_log = [];
    }

    /**
     * MAIN PIPELINE EXECUTION
     */
    run(input) {

        // -------------------
        // SP-00: Parse input
        // -------------------
        const parsed = this.sp00.parse(input);

        // -------------------
        // SP-01: Strategy build
        // -------------------
        const strategy = this.sp01.build(parsed);

        // -------------------
        // SP-02: Execution
        // -------------------
        const execution = this.sp02.run(strategy);

        // -------------------
        // SP-03: Stress replay
        // -------------------
        const stress = this.sp03.run(execution);

        // -------------------
        // SP-04: Risk assessment
        // -------------------
        const risk = this.sp04.assess(execution, stress);

        // -------------------
        // SP-05: Final decision
        // -------------------
        const decision = this.sp05.review(risk);

        // -------------------
        // FULL TRACE RECORD
        // -------------------
        const trace = {
            timestamp: Date.now(),

            sp00: parsed,
            sp01: strategy,
            sp02: execution,
            sp03: stress,
            sp04: risk,
            sp05: decision
        };

        this.execution_log.push(trace);

        return trace;
    }

    /**
     * GET FULL HISTORY
     */
    getHistory() {
        return this.execution_log;
    }

    /**
     * RESET PIPELINE STATE
     */
    reset() {
        this.execution_log = [];
    }
}
