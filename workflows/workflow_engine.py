class WorkflowEngine:
    def __init__(self, logger=None):
        self.logger = logger

    def execute(self, workflow: dict, input_signal: dict):

        steps = workflow.get("steps", [])
        results = []

        context = input_signal.copy()

        for i, step in enumerate(steps):

            action = step.get("action")

            result = self._run_action(action, context)

            context.update(result)

            record = {
                "step": i,
                "action": action,
                "input": dict(context),
                "output": result
            }

            results.append(record)

            if self.logger:
                self.logger.log_event("WORKFLOW_STEP", record)

        return {
            "workflow_name": workflow.get("name", "unnamed"),
            "final_state": context,
            "trace": results
        }

    def _run_action(self, action, context):

        if action == "EVALUATE_RISK":
            return {
                "risk_score": context.get("risk", 0.0)
            }

        elif action == "TRIGGER_FALLBACK":
            return {
                "state": "FALLBACK_ACTIVE"
            }

        elif action == "VALIDATE":
            return {
                "validation": True
            }

        else:
            return {
                "status": f"UNKNOWN_ACTION_{action}"
            }
