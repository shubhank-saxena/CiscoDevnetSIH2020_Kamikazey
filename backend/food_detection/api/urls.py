from django.urls import path
from .views import FoodDetectionView, SnapshotView

urlpatterns = [path('predict/', FoodDetectionView.as_view()), path('snapshot/', SnapshotView.as_view())]
