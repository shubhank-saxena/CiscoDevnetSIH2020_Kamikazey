import cv2

face_detection_videocam = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')


class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)

    def __del__(self):
        self.video.release()

    def get_frame(self):
        success, image = self.video.read()
        # We are using Motion JPEG, but OpenCV defaults to capture raw images,
        # so we must encode it into JPEG in order to correctly display the
        # video stream.
        scale_factor = 1.3
        ide = 2
        sampleno = 0
        while 1:
            ret, pic = self.video.read()
            gray = cv2.cvtColor(pic, cv2.COLOR_BGR2GRAY)
            face = face_detection_videocam.detectMultiScale(gray, scale_factor, 1)
            for (x, y, w, h) in face:
                sampleno = sampleno + 1
                cv2.imwrite('dataset/User.' + str(ide) + '.' + str(sampleno) + '.jpg', gray[y : y + h, x : x + w])
                cv2.rectangle(pic, (x, y), (x + w, y + h), (255, 0, 0), 2)
                cv2.waitKey(100)
                if sampleno > 25:
                    break
            frame_flip = cv2.flip(pic, 1)
            ret, jpeg = cv2.imencode('.jpg', frame_flip)
            return jpeg.tobytes()
