from backend.school.models import School, FoodSchedule, FoodItem, FoodItemDayMap, Supervisor, Report, Wastage
from .serializers import SchoolSerializer, FoodScheduleSerializer, FoodItemDayMapSerializer, FoodItemSerializer, SupervisorSerializer, ReportSerializer, WastageSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets


class SchoolViewset(viewsets.ModelViewSet):
    """Manage schools in the database"""

    serializer_class = SchoolSerializer
    queryset = School.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]


class FoodScheduleViewset(viewsets.ModelViewSet):
    """Manage Food Schedule in the database"""

    serializer_class = FoodScheduleSerializer
    queryset = FoodSchedule.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]


class FoodItemViewset(viewsets.ModelViewSet):
    """Manage food Items in the database"""

    serializer_class = FoodItemSerializer
    queryset = FoodItem.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]


class FoodItemDayMapViewset(viewsets.ModelViewSet):
    """Manage Food-item and Day mapping in the database"""

    serializer_class = FoodItemDayMapSerializer
    queryset = FoodItemDayMap.objects.all()
    permission_class = [
        IsAuthenticated,
    ]


class SupervisorViewset(viewsets.ModelViewSet):
    """Manage Suepervisors in database"""

    serializer_class = SupervisorSerializer
    queryset = Supervisor.objects.all()
    permission_class = [
        IsAuthenticated,
    ]


class ReportViewset(viewsets.ModelViewSet):
    """Manage Reports in the database"""

    serializer_class = ReportSerializer
    queryset = Report.objects.all()
    permission_class = [
        IsAuthenticated,
    ]


class WastageViewset(viewsets.ModelViewSet):
    """Manage Wastage in database"""

    serializer_class = WastageSerializer
    queryset = Wastage.objects.all()
    permission_class = [
        IsAuthenticated,
    ]
