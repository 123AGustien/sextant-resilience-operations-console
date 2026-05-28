class CognitiveRegistry:
    def __init__(self):
        self.records = {}

    def register(self, key, value):
        self.records[key] = value

    def get(self, key):
        return self.records.get(key)
