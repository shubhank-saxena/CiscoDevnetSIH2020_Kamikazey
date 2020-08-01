from backend.school.models import School, FoodSchedule, Wastage, FoodItem, FoodItemDayMap, Report, Attendance, Contractor
from .serializers import (
    SchoolSerializer,
    SchoolCreateSerializer,
    FoodScheduleSerializer,
    FoodItemDayMapSerializer,
    FoodItemSerializer,
    ReportSerializer,
    WastageSerializer,
    AttendanceSerializer,
    ContractorSerializer,
)

from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, generics


class SchoolViewset(viewsets.ModelViewSet):
    """Manage schools in the database"""

    # serializer_class = SchoolSerializer
    serializer_action_classes = {
        'create': SchoolCreateSerializer,
        'list': SchoolSerializer,
        'retrieve': SchoolSerializer,
        'update': SchoolSerializer,
        'partial_update': SchoolSerializer,
    }
    queryset = School.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]

    def get_serializer_class(self):
        return self.serializer_action_classes[self.action]


class FoodScheduleViewset(viewsets.ModelViewSet):
    """Manage Food Schedule in the database"""

    serializer_class = FoodScheduleSerializer
    queryset = FoodSchedule.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]


class WastageViewset(viewsets.ModelViewSet):
    """Manage Wastage in database"""

    serializer_class = WastageSerializer
    queryset = Wastage.objects.all()
    permission_class = [
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


class ReportViewset(viewsets.ModelViewSet):
    """Manage Reports in the database"""

    serializer_class = ReportSerializer
    queryset = Report.objects.all()
    permission_class = [
        IsAuthenticated,
    ]


class AttendanceViews(generics.ListCreateAPIView):
    """List and Create attendance"""

    serializer_class = AttendanceSerializer
    queryset = Attendance.objects.all()
    permission_class = [
        IsAuthenticated,
    ]

    def get_queryset(self):
        attendances = self.queryset.all()
        attendance_of_school = []
        for attendance in attendances:
            if attendance.of_student.of_school.organisation_id == self.kwargs['organisation_id']:
                attendance_of_school.append(attendance)
        return attendance_of_school


class ContractorViewset(viewsets.ModelViewSet):
    """Manage Reports in the database"""

    serializer_class = ContractorSerializer
    queryset = Contractor.objects.all()
    permission_class = [
        IsAuthenticated,
    ]
