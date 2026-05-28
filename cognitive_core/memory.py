class CognitiveMemory:
    """
    Simple cognitive memory engine for multi-agent SRE system.
    Stores event + agent outputs for audit and learning.
    """

    def __init__(self):
        self._store = []

    def store(self, event: dict, outputs: list):
        """
        Persist a cognitive interaction snapshot.
        """
        entry = {
            "event": event,
            "outputs": outputs
        }
        self._store.append(entry)

    def size(self) -> int:
        """
        Returns number of stored cognitive records.
        """
        return len(self._store)

    def get_all(self) -> list:
        """
        Returns full memory history.
        """
        return self._store

    def get_latest(self):
        """
        Returns most recent cognitive event.
        """
        if not self._store:
            return None
        return self._store[-1]

    def clear(self):
        """
        Clears memory (useful for simulation resets).
        """
        self._store = []
