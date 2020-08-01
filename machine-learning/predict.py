import torch
from torchvision import models
import numpy as np
from PIL import Image


def loading_model(file_path):
    checkpoint = torch.load(file_path)  # loading checkpoint from a file
    model = models.alexnet(pretrained=True)

    model.classifier = checkpoint['classifier']
    model.load_state_dict(checkpoint['state_dict'])
    model.class_to_idx = checkpoint['mapping']

    for param in model.parameters():
        param.requires_grad = False  # turning off tuning of the model

    return model


model_verify = loading_model('food_project_checkpoint.pth')


def process_image(image):
    ''' Scales, crops, and normalizes a PIL image for a PyTorch model,
        returns an Numpy array
    '''
    # size = 256, 256
    im = Image.open(image)  # loading image
    width, height = im.size  # original size
    # proportion = width/ float (height) #to keep aspect ratio

    if width > height:
        height = 256
        im.thumbnail((50000, height), Image.ANTIALIAS)
    else:
        width = 256
        im.thumbnail((width, 50000), Image.ANTIALIAS)

    width, height = im.size  # new size of im
    # crop 224x224 in the center
    reduce = 224
    left = (width - reduce) / 2
    top = (height - reduce) / 2
    right = left + 224
    bottom = top + 224
    im = im.crop((left, top, right, bottom))

    # preparing numpy array
    np_image = np.array(im) / 255  # to make values from 0 to 1
    np_image -= np.array([0.485, 0.456, 0.406])
    np_image /= np.array([0.229, 0.224, 0.225])

    np_image = np_image.transpose((2, 0, 1))
    # np_image.transpose (1,2,0)
    return np_image


def predict(image_path, model, topkl):
    ''' Predict the class (or classes) of an image using a trained deep learning model.
    '''
    image = process_image(image_path)  # loading image and processing it using above defined function

    # we cannot pass image to model.forward 'as is' as it is expecting tensor, not numpy array
    # converting to tensor
    im = torch.from_numpy(image).type(torch.FloatTensor)

    im = im.unsqueeze(dim=0)  # used to make size of torch as expected. as forward method is working with batches,
    # doing that we will have batch size = 1

    with torch.no_grad():
        output = model.forward(im)
    output_prob = torch.exp(output)  # converting into a probability

    probs, indeces = output_prob.topk(topkl)
    probs = probs.numpy()  # converting both to numpy array
    indeces = indeces.numpy()

    probs = probs.tolist()[0]  # converting both to list
    indeces = indeces.tolist()[0]

    mapping = {val: key for key, val in model.class_to_idx.items()}

    classes = [mapping[item] for item in indeces]
    # classes = pd.DataFrame ([mapping [item] for item in indeces]) #replacing indeces with classes
    classes = np.array(classes)  # converting to Numpy array

    return probs, classes


def predict_main():
    model = model_verify
    file_path = 'index.jpeg'
    probs, classes = predict(file_path, model, 5)

    max_prob_index = probs.index(max(probs))
    food_class = classes[max_prob_index]

    return food_class
