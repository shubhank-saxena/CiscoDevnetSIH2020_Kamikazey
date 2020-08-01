We have trained an image classifier to recognize different varities of foods. We used [Kaggle's data set for Indian food](https://www.kaggle.com/sandy1112/indiafood21categoriessmall) for training. Each class consists of between 40 and 258 images.<br/>

We used [ResNet](https://arxiv.org/abs/1512.03385) as our pre-trained model for feature extraction and the following structure is of the classifier model layers on top of it 

```
(classifier): Sequential(
    (fc1): Linear(in_features=9216, out_features=4096, bias=True)
    (relu1): ReLU()
    (dropout1): Dropout(p=0.3, inplace=False)
    (fc2): Linear(in_features=4096, out_features=2048, bias=True)
    (relu2): ReLU()
    (dropout2): Dropout(p=0.3, inplace=False)
    (fc3): Linear(in_features=2048, out_features=102, bias=True)
    (output): LogSoftmax()
  )
```

For list of all the classes, you can refer to [cat_to_name.json file](https://github.com/shubhank-saxena/foodClassification/blob/master/backend/cat_to_name.json)


## Installation and Setup

### Setup and running of project (Backend)

- Fork the repo and clone it.
- Go in the repo and setup virtualenvironment using
  `python -m virtualenv env`
- Then activate the environment using
  `source env/Scripts/activate` (Use only `env/Scripts/activate` if on cmd or powershell)
- For Linux Users it will be `source env/bin/activate`
- At the root of your project directory <br>

```bash
pip install -r requirements.txt
pre-commit install
```

- This will setup the project requirements and pre-commit test hooks!
- Install [Pytorch](https://pytorch.org/) if you want to work on the model/training part.
- Start the backend server
  `python backend/app.py`
  
**This runs the backend server at default port `5000`.
  Open [http://localhost:5000](http://localhost:5000) to view it in the browser.**<br />

### Setup and running of project (Frontend)

- At your root directory run `yarn install` to install all the dependencies
- To start react dev server `yarn start`

This runs the app in the development mode.<br />
**Open [http://localhost:3000](http://localhost:3000) to view it in the browser.**
