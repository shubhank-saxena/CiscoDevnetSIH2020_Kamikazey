from rest_framework.serializers import ModelSerializer, ImageField
from backend.user.models import Parent, Student


class StudentSerializer(ModelSerializer):

    aadhaar_card_image = ImageField(required=True, max_length=None, use_url=True)
    student_image = ImageField(required=True, max_length=None, use_url=True)

    class Meta:
        model = Student
        fields = ['id', 'name', 'of_school', 'aadhaar_card_image', 'student_image']


class ParentSerializer(ModelSerializer):
    class Meta:
        model = Parent
        fields = ['id', 'name', 'of_student', 'relation_with_student']
