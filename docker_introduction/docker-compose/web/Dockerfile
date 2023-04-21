# zacznij od oficjalnego obrazu Pythona 3.9
FROM python:3.9-slim-buster

# Set the working directory in the container to /app
WORKDIR /app

# Copy app.py templates/index.html requirements.txt into the container at /app
COPY app.py /app
COPY templates/index.html /app/templates/
COPY requirements.txt /app

# Install any dependencies in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt 

# Expose port 8000 for the application to listen on
EXPOSE 8000

# Set the command to run the application
CMD ["python", "app.py"]