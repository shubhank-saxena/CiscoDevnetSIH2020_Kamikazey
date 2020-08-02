from backend.school.models import School, FoodSchedule, Wastage, FoodItem, FoodItemDayMap, Report, Attendance, Contractor
from backend.school.api.permissions import IsCiscoAdmin, IsSchoolPrincipal, IsCiscoAdminOrSupervisor, IsSchoolPrincipalOrSupervisor
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
from rest_framework.authtoken.models import Token


class SchoolViewset(viewsets.ModelViewSet):
    """Manage schools in the database"""

    serializer_action_classes = {
        'create': SchoolCreateSerializer,
        'list': SchoolSerializer,
        'retrieve': SchoolSerializer,
        'update': SchoolSerializer,
        'partial_update': SchoolSerializer,
    }
    permission_classes_by_action = {
        'create': [IsAuthenticated, IsCiscoAdmin],
        'list': [IsAuthenticated, IsCiscoAdminOrSupervisor],
        'retrieve': [IsAuthenticated, IsSchoolPrincipal],
        'partial_update': [IsAuthenticated],
        'destroy': [IsAuthenticated],
    }
    queryset = School.objects.all()

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except Exception:
            return [permission() for permission in self.permission_classes]

    def get_serializer_class(self):
        return self.serializer_action_classes[self.action]

    def get_queryset(self):
        user = Token.objects.filter(key=self.request.headers['Authorization'].split()[1])[0].user
        if user.groups.first().name == "Cis-Admin":
            return self.queryset.all()
        elif user.groups.first().name == "Supervisor":
            return self.queryset.filter(under_supervisor=user)
        elif user.groups.first().name == "Principal":
            return self.queryset.filter(principal=user)


class FoodScheduleViewset(viewsets.ModelViewSet):
    """Manage Food Schedule in the database"""

    serializer_class = FoodScheduleSerializer
    queryset = FoodSchedule.objects.all()
    permission_classes = [
        IsSchoolPrincipalOrSupervisor,
    ]

    def get_queryset(self):
        user = Token.objects.filter(key=self.request.headers['Authorization'].split()[1])[0].user
        if user.groups.first().name == "Supervisor":
            return self.queryset.filter(school=user)
        elif user.groups.first().name == "Principal":
            return self.queryset.filter(principal=user)


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
    permission_classes_by_action = {
        'create': [IsAuthenticated, IsCiscoAdmin],
        'list': [IsAuthenticated],
        'retrieve': [IsAuthenticated],
        'partial_update': [IsAuthenticated, IsCiscoAdmin],
        'destroy': [IsAuthenticated, IsCiscoAdmin],
    }

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except Exception:
            return [permission() for permission in self.permission_classes]


class FoodItemDayMapViewset(viewsets.ModelViewSet):
    """Manage Food-item and Day mapping in the database"""

    serializer_class = FoodItemDayMapSerializer
    queryset = FoodItemDayMap.objects.all()
    permission_class = [
        IsSchoolPrincipalOrSupervisor,
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
        IsSchoolPrincipal,
    ]
