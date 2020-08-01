import cv2 as cv2

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read('data.yml')
cap = cv2.VideoCapture(0)
scale_factor = 1.3
ide = 0
while 1:
    ret, pic = cap.read()
    gray = cv2.cvtColor(pic, cv2.COLOR_BGR2GRAY)
    face = face_cascade.detectMultiScale(gray, scale_factor, 1)
    for (x, y, w, h) in face:
        cv2.rectangle(pic, (x, y), (x + w, y + h), (255, 0, 0), 2)
        ide, conf = recognizer.predict(gray[y : y + h, x : x + w])
        if ide == 1:
            name = 'mummy'
        elif ide == 2:
            name = 'Shubhank'
        elif ide == 3:
            name = 'Priyansh'
        cv2.putText(pic, name, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 1, cv2.LINE_AA)
        cv2.imshow('face', pic)
    k = cv2.waitKey(30) & 0xFF
    if k == 27:
        break
cap.release()
cv2.destroyAllWindows()
