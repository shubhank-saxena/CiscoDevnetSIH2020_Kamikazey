from rest_framework.serializers import ModelSerializer, TimeField
from django.contrib.auth.models import User
from backend.school.models import School, FoodSchedule, FoodItem, FoodItemDayMap, Report, Wastage


class SupervisorSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'name']
        read_only_fields = ['id']


class SchoolSerializer(ModelSerializer):

    under_supervisor = SupervisorSerializer(required=True)

    class Meta:
        model = School
        fields = ['organisation_id', 'name', 'api_key', 'URL', 'email', 'contact_no', 'principal', 'workers_count', 'students_count', 'under_supervisor']
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
