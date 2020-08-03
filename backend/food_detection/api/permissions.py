from rest_framework.permissions import BasePermission
from rest_framework.authtoken.models import Token


class IsSupervisor(BasePermission):
    message = "You must be a supervisor to perform this operation"

    def has_permission(self, request, view):
        return Token.objects.filter(key=request.headers['Authorization'].split()[1])[0].user.groups.first().name == "Supervisor"
