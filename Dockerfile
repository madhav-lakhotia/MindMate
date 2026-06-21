FROM python:3.10-slim

WORKDIR /app

# Sabse pehle system dependencies install karte hain (agar scikit-learn ko chahiye ho)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Saari files copy karo
COPY . .

# Dependencies install karo
RUN pip install --no-cache-dir -r requirements.txt

# Port setup (Hugging Face default port 7860 use karta hai)
ENV PORT=7860
EXPOSE 7860

# Gunicorn se backend ke andar ki app.py run karo
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--chdir", "backend", "app:app"]