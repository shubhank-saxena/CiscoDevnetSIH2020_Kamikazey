# import os
from django.shortcuts import render
from django.http.response import StreamingHttpResponse
from backend.streamapp.camera import VideoCamera


def index(request):
    return render(request, 'streamapp/home.html')


def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


def video_feed(request):
    return StreamingHttpResponse(gen(VideoCamera()), content_type='multipart/x-mixed-replace; boundary=frame')


# def train_feed():
# 	Addd that third file os.


def attendance_feed(request):
    return StreamingHttpResponse(gen(VideoCamera()), content_type='multipart/x-mixed-replace; boundary=frame')
