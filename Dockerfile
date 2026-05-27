FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Prevent Python from writing .pyc files
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Upgrade pip first (better reliability)
RUN pip install --upgrade pip

# Copy only requirements first (better caching)
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy full project
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run API (production-safe uvicorn config)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
