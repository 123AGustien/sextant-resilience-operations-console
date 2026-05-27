import time

class RequestLogger:
    def __init__(self, logger=None):
        self.logger = logger

    async def __call__(self, request, call_next):
        start = time.time()

        response = await call_next(request)

        duration = time.time() - start

        if self.logger:
            self.logger.log_event("REQUEST", {
                "path": request.url.path,
                "method": request.method,
                "duration": duration
            })

        return response
