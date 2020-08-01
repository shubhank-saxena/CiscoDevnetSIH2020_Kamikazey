from django.urls import path
from .views import FoodDetectionView

urlpatterns = [path('predict/', FoodDetectionView.as_view())]
