from rest_framework.serializers import ModelSerializer, TimeField
from django.contrib.auth.models import User
from backend.school.models import School, FoodSchedule, FoodItem, FoodItemDayMap, Report, Wastage, Attendance, Contractor
from backend.user.models import Student


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email']
        read_only_fields = ['id']


class ContractorSerializer(ModelSerializer):
    class Meta:
        model = Contractor
        fields = ['username', 'name', 'school']


class SchoolCreateSerializer(ModelSerializer):
    class Meta:
        model = School
        fields = ['organisation_id', 'name', 'api_key', 'URL', 'email', 'contact_no', 'principal', 'workers_count', 'students_count', 'under_supervisor']
        read_only_fields = ['id']


class SchoolSerializer(ModelSerializer):

    under_supervisor = UserSerializer()
    contractor_set = ContractorSerializer(many=True, required=False)
    principal = UserSerializer()

    class Meta:
        model = School
        fields = ['organisation_id', 'name', 'api_key', 'URL', 'email', 'contact_no', 'principal', 'workers_count', 'students_count', 'under_supervisor', 'contractor_set']
        read_only_fields = ['id']


class WastageSerializer(ModelSerializer):
    class Meta:
        model = Wastage
        fields = ['id', 'quantity', 'date']
        read_only_fields = ['id']


class FoodScheduleSerializer(ModelSerializer):

    time = TimeField(format='%I:%M %p', input_formats=None)
    wastage_set = WastageSerializer(many=True)

    class Meta:
        model = FoodSchedule
        fields = ['id', 'school', 'category', 'time', 'wastage_set']
        read_only_fields = ['id']


class FoodItemSerializer(ModelSerializer):
    class Meta:
        model = FoodItem
        fields = ['id', 'food_item', 'nutrition']
        read_only_fields = ['id']


class FoodItemDayMapSerializer(ModelSerializer):
    class Meta:
        model = FoodItemDayMap
        fields = ['id', 'of_schedule', 'food_item', 'day']
        read_only_fields = ['id']


class ReportSerializer(ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'school', 'category', 'information']
        read_only_fields = ['id']


class AttendanceStudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name']
        read_only_fields = ['id']


class AttendanceSerializer(ModelSerializer):

    of_student = AttendanceStudentSerializer()

    class Meta:
        model = Attendance
        fields = ['id', 'student_present', 'date', 'of_student']
        read_only_fields = ['id']
