from django.urls import path
from .views import FoodDetectionView, meraki_snapshot, mail

urlpatterns = [path('predict/', FoodDetectionView.as_view()), path('snapshot/', meraki_snapshot), path('mail/', mail)]
