from flask import Flask, render_template
import requests

app = Flask(__name__)

# Endpoint of the API
api_endpoint = "http://docker-compose_api_1:3000/hello"

@app.route('/')
def home():
    # Call the API to get the list of animals
    greetings = requests.get(api_endpoint).json()['msg']

    # Render the template with the list of animals
    return render_template('index.html', greetings=greetings)

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port=8000)