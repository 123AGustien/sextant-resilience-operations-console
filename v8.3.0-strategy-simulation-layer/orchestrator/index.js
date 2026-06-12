import { SP00ManualQueryEngine } from "../SP-00-manual-query-engine/index.js";
import { SP01StrategyDefinition } from "../SP-01-strategy-definition/index.js";
import { SP02ScenarioExecution } from "../SP-02-scenario-execution/index.js";
import { SP03StressReplay } from "../SP-03-stress-replay/index.js";
import { SP04ResilienceAssessment } from "../SP-04-resilience-assessment/index.js";
import { SP05InstitutionalReview } from "../SP-05-institutional-review/index.js";

/**
 * SP-ORCHESTRATOR v2
 * Institutional-grade deterministic execution engine
 * Adds: modes, structured output, audit contract
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
     * PUBLIC ENTRY POINT
     * mode: live | batch | replay
     */
    run(input, mode = "live") {

        const trace = this._executePipeline(input);

        const packaged = this._package(trace, mode);

        // only store real runs, not replay duplication
        if (mode !== "replay") {
            this.execution_log.push(packaged);
        }

        return packaged;
    }

    /**
     * CORE PIPELINE (SP-00 → SP-05)
     */
    _executePipeline(input) {

        // SP-00: Input parsing
        const sp00 = this.sp00.parse(input);

        // SP-01: Strategy definition
        const sp01 = this.sp01.build(sp00);

        // SP-02: Scenario execution
        const sp02 = this.sp02.run(sp01);

        // SP-03: Stress replay simulation
        const sp03 = this.sp03.run(sp02);

        // SP-04: Risk assessment engine
        const sp04 = this.sp04.assess(sp02, sp03);

        // SP-05: Institutional decision layer
        const sp05 = this.sp05.review(sp04);

        return { sp00, sp01, sp02, sp03, sp04, sp05 };
    }

    /**
     * INSTITUTIONAL OUTPUT CONTRACT
     * Dashboard + reporting + API safe format
     */
    _package(trace, mode) {

        return {
            meta: {
                system: "Sextant Orchestrator v2",
                mode: mode,
                timestamp: Date.now(),
                pipeline_version: "SP-v8.3.0"
            },

            pipeline: trace,

            summary: {
                risk_score: trace.sp04.risk_score ?? null,
                risk_grade: trace.sp04.risk_grade ?? null,
                system_health: trace.sp04.system_health ?? null,
                decision: trace.sp05.decision_status ?? null,
                confidence: trace.sp05.confidence ?? null
            },

            audit: {
                sp_count: 6,
                deterministic: true,
                replayable: true
            }
        };
    }

    /**
     * HISTORY (AUDIT TRAIL)
     */
    getHistory() {
        return this.execution_log;
    }

    /**
     * REPLAY MODE (deterministic rerun)
     */
    replay(index) {

        const record = this.execution_log[index];

        if (!record) {
            return {
                error: "REPLAY_NOT_FOUND",
                index
            };
        }

        return this.run(
            record.pipeline.sp00.strategy_request,
            "replay"
        );
    }

    /**
     * RESET SYSTEM STATE
     */
    reset() {
        this.execution_log = [];
    }
}
