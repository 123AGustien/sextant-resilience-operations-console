import asyncio
import json
from collections import defaultdict

class StreamManager:
    def __init__(self):
        self.connections = set()

    async def connect(self, websocket):
        await websocket.accept()
        self.connections.add(websocket)

    def disconnect(self, websocket):
        self.connections.remove(websocket)

    async def broadcast(self, message: dict):
        data = json.dumps(message)

        to_remove = []

        for conn in self.connections:
            try:
                await conn.send_text(data)
            except:
                to_remove.append(conn)

        for conn in to_remove:
            self.connections.remove(conn)
