import cv2

face_detection_videocam = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read('data.yml')
scale_factor = 1.3
ide = 0


class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)

    def __del__(self):
        self.video.release()

    def get_frame(self):
        success, image = self.video.read()
        while 1:
            ret, pic = self.video.read()
            print(pic)
            gray = cv2.cvtColor(pic, cv2.COLOR_BGR2GRAY)
            face = face_detection_videocam.detectMultiScale(gray, scale_factor, 1)
            for (x, y, w, h) in face:
                cv2.rectangle(pic, (x, y), (x + w, y + h), (255, 0, 0), 2)
                ide, conf = recognizer.predict(gray[y : y + h, x : x + w])
                if ide == 1:
                    name = 'Mummy'
                elif ide == 2:
                    name = 'Shubhank'
                elif ide == 3:
                    name = 'Priyansh'
                cv2.putText(pic, name, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 1, cv2.LINE_AA)
            k = cv2.waitKey(30) & 0xFF
            if k == 27:
                break
            frame_flip = cv2.flip(pic, 1)
            ret, jpeg = cv2.imencode('.jpg', frame_flip)
            return jpeg.tobytes()
