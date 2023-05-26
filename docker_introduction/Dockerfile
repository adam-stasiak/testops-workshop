# pobrać obraz alpine i nazwać go builderem
FROM alpine as builder

# ustawić workdir /app
WORKDIR /app 
# stworzyć plik output.txt
RUN touch output.txt
RUN echo 123 > output.txt
# pobrać obraz pythona 
FROM python:3.9-slim-buster
# pobrać plik output.txt z buildera
COPY --from=builder /app/output.txt .
RUN echo zawartosc >> output.txt
COPY script.py .
# z pomocą pythonowej komendy python wyświetlić zawartość <- entrypoint
ENTRYPOINT ["python","script.py"]



