import cv2

face_detection_videocam = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
face_detection_webcam = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')


class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(-1)

    def __del__(self):
        self.video.release()

    def get_frame(self):
        scale_factor = 1.3
        ide = 2
        sampleno = 0
        while 1:
            ret, pic = self.video.read()
            gray = cv2.cvtColor(pic, cv2.COLOR_BGR2GRAY)
            face = face_detection_videocam.detectMultiScale(gray, scale_factor, 1)
            # os.mkdir('dataset')
            for (x, y, w, h) in face:
                sampleno = sampleno + 1
                cv2.imwrite('dataset/User.' + str(ide) + '.' + str(sampleno) + '.jpg', gray[y : y + h, x : x + w])
                cv2.rectangle(pic, (x, y), (x + w, y + h), (255, 0, 0), 2)
                cv2.imshow('face', pic)
                cv2.waitKey(100)
            if sampleno > 25:
                break
        self.video.release()
