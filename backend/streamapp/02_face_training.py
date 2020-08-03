import os
import cv2
from PIL import Image
import numpy as np

recognizer = cv2.face.LBPHFaceRecognizer_create()
path = 'dataset'


def getImageswithID(path):
    Imagespath = [os.path.join(path, f) for f in os.listdir(path)]
    faces = []
    IDs = []
    for imagepaths in Imagespath:
        faceImage = Image.open(imagepaths).convert('L')
        faceNp = np.array(faceImage, 'uint8')
        ID = int(os.path.split(imagepaths)[-1].split('.')[1])
        faces.append(faceNp)
        IDs.append(ID)
        cv2.imshow('train', faceNp)
        cv2.waitKey(10)
    return np.array(IDs), faces


IDs, faces = getImageswithID(path)
recognizer.train(faces, IDs)
recognizer.save('data.yml')
cv2.destroyAllWindows()
