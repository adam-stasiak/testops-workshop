# Start with official image Pythona 3.9 (python:3.9-slim-buster)
FROM python:3.9-slim-buster
# Set the working directory in the container to /app
WORKDIR /app
# Copy app.py templates/index.html requirements.txt into the container at /app
COPY app.py .
COPY templates/index.html ./templates/index.html
COPY requirements.txt .
# Install any dependencies in requirements.txt (pip)
RUN pip install -r requirements.txt
# Expose port 8000 for the application to listen on
EXPOSE 8000
# Set the command to run the application
ENTRYPOINT ["python","app.py"]
