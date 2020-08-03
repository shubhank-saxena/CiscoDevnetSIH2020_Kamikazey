from django.urls import path
from backend.face_detector import views


urlpatterns = [
    path('', views.index, name='index'),
    path('video_feed', views.video_feed, name='video_feed'),
    # path('webcam_feed', views.webcam_feed, name='webcam_feed'),
]
