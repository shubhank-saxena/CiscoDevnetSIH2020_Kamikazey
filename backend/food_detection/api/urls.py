from django.urls import path
from .views import FoodDetectionView, meraki_snapshot

urlpatterns = [path('predict/', FoodDetectionView.as_view()), path('snapshot/', meraki_snapshot)]
