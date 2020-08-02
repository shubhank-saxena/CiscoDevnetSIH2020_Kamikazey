from rest_framework.permissions import BasePermission
from rest_framework.authtoken.models import Token


class IsSchoolPrincipal(BasePermission):
    message = "You must be the school principal to perform this operation"

    def has_permission(self, request, view):
        return Token.objects.filter(key=request.headers['Authorization'].split()[1])[0].user.groups.first().name == "Principal"
