from django.urls import path
from backend.streamapp import views


urlpatterns = [path('', views.index, name='index'), path('video_feed', views.video_feed, name='video_feed'), path('attendance_feed', views.attendance_feed, name='attendance_feed')]
