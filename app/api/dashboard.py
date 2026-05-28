from fastapi import APIRouter
from fastapi.responses import HTMLResponse

router = APIRouter()

@router.get("/dashboard", response_class=HTMLResponse)
def dashboard():
    return """
    <html>
        <head>
            <title>Sextant Resilience Dashboard</title>
            <style>
                body {
                    font-family: Arial;
                    background: #0f172a;
                    color: white;
                    padding: 20px;
                }
                .card {
                    background: #1e293b;
                    padding: 15px;
                    margin: 10px 0;
                    border-radius: 10px;
                }
            </style>
        </head>
        <body>
            <h1>🧠 Sextant Resilience Dashboard</h1>

            <div class="card">
                <h3>System Status</h3>
                <p>API: ONLINE</p>
                <p>Cognitive Engine: ACTIVE</p>
            </div>

            <div class="card">
                <h3>Endpoints</h3>
                <p>/evaluate → run multi-agent SRE simulation</p>
                <p>/memory → cognitive history</p>
            </div>

            <div class="card">
                <h3>Next Upgrade</h3>
                <p>Live event streaming + usage analytics</p>
            </div>
        </body>
    </html>
    """
