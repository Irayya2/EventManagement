# Phase 4 Backend Dockerization
FROM python:3.11-slim

WORKDIR /app

# Ensure we don't write .pyc files and that logs stream properly
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run the Flask app on port 5000 using Gunicorn for production
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "run:app"]
