import os
from predict import predict_main
import requests

from flask import Flask, request


app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/predict', methods=['POST', 'GET'])
def predict():
    # print(request.json)
    response_get = requests.get(request.json.get('image'))
    try:
        file = open("index.jpeg", "wb")
        file.write(response_get.content)
        file.close()
        food_class = predict_main()
        os.remove('index.jpeg')
        return food_class

    except Exception:
        os.remove('index.jpeg')
        return "Error in parsing"


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5000')
