from app.cognitive_core.orchestrator import CognitiveOrchestrator


class MobileControlRoom:
    """
    Simple text-based control room UI for mobile (Oppo / Pydroid).
    """

    def __init__(self):
        self.engine = CognitiveOrchestrator()

    # -----------------------------
    # MAIN MENU
    # -----------------------------
    def run(self):
        while True:

            print("\n============================")
            print(" SEXTANT CONTROL ROOM (MOBILE)")
            print("============================")
            print("1. Normal Operation")
            print("2. Node Failure")
            print("3. Cascade Failure")
            print("4. View Exit")
            print("============================")

            choice = input("Select option: ")

            if choice == "1":
                self.execute({"type": "normal_operation", "node": "A"})

            elif choice == "2":
                self.execute({"type": "node_failure", "node": "B"})

            elif choice == "3":
                self.execute({"type": "cascade_failure", "node": "C"})

            elif choice == "4":
                print("Exiting Control Room...")
                break

            else:
                print("Invalid selection")

    # -----------------------------
    # EXECUTE SIMULATION STEP
    # -----------------------------
    def execute(self, event):

        result = self.engine.evaluate(event)

        print("\n--- SIMULATION RESULT ---")
        print("EVENT:", event)
        print("STATE:", result["system_state"])
        print("AGENTS:", result["simulation"]["agents_executed"])
        print("IMPACT:", result["system_state"]["impact_level"])
        print("--------------------------")


# -----------------------------
# RUN MOBILE UI
# -----------------------------
if __name__ == "__main__":
    app = MobileControlRoom()
    app.run()
