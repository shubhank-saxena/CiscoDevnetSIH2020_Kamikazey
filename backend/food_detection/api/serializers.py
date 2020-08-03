from rest_framework.serializers import ModelSerializer
from backend.food_detection.models import Alert
from backend.school.models import School


class SchoolAlertSerializer(ModelSerializer):
    class Meta:
        model = School
        fields = ['organisation_id', 'district', 'name']


class AlertSerializer(ModelSerializer):

    school = SchoolAlertSerializer()

    class Meta:
        model = Alert
        fields = ['id', 'hash', 'URL', 'school', 'datetime', 'expected_item_name', 'provided_item']
