from cognitive_core.orchestrator import CognitiveOrchestrator
from cognitive_core.replay_engine import ReplayEngine


class ControlRoomApp:
    """
    Offline simulation control room (Replit-style runner but local only).
    """

    def __init__(self):
        self.engine = CognitiveOrchestrator()
        self.replay = ReplayEngine()

    def run(self):

        while True:

            print("\n======================")
            print(" SEXTANT CONTROL ROOM ")
            print("======================")
            print("1. Normal Operation")
            print("2. Node Failure")
            print("3. Cascade Failure")
            print("4. Replay History")
            print("5. Exit")

            choice = input("Select: ")

            if choice == "1":
                self.execute({"type": "normal_operation", "node": "A"})

            elif choice == "2":
                self.execute({"type": "node_failure", "node": "B"})

            elif choice == "3":
                self.execute({"type": "cascade_failure", "node": "C"})

            elif choice == "4":
                self.replay_history()

            elif choice == "5":
                break

    def execute(self, event):

        result = self.engine.evaluate(event)

        print("\n--- RESULT ---")
        print(result)

    def replay_history(self):

        print("\n--- REPLAY ---")

        timeline = self.engine.evidence.timeline
        self.replay.load(timeline)

        output = self.replay.replay_all()

        for item in output:
            print(item)


if __name__ == "__main__":
    app = ControlRoomApp()
    app.run()
