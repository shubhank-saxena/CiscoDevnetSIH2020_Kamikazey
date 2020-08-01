from rest_framework.serializers import ModelSerializer, CharField
from rest_framework.authtoken.models import Token


class LoginResponseSerializer(ModelSerializer):

    groups = CharField(source='user.groups.first')

    class Meta:
        model = Token
        fields = ['key', 'groups']
