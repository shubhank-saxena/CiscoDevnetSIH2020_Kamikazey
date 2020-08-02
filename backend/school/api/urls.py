from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'backend.school'
router = DefaultRouter()
router.register('school', views.SchoolViewset)
router.register('food_schedule', views.FoodScheduleViewset)
router.register('food_item', views.FoodItemViewset)
router.register('food_day_map', views.FoodItemDayMapViewset)
router.register('report', views.ReportViewset)
router.register('wastage', views.WastageViewset)


urlpatterns = [
    path('', include(router.urls)),
    path('attendance/<organisation_id>/', views.AttendanceViews.as_view()),
]
