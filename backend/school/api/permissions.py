from rest_framework.permissions import BasePermission
from rest_framework.authtoken.models import Token


class IsCiscoAdmin(BasePermission):
    message = "You must be the CISCO Admin to perform this operation"

    def has_permission(self, request, view):
        return Token.objects.filter(key=request.headers['Authorization'].split()[1])[0].user.groups.first().name == "Cis-Admin"


class IsCiscoAdminOrSupervisor(BasePermission):
    message = "You must be the CISCO Admin or Supervisor to perform this operation"

    def has_permission(self, request, view):
        group_name = Token.objects.filter(key=request.headers['Authorization'].split()[1])[0].user.groups.first().name
        return group_name == "Cis-Admin" or group_name == "Supervisor"


class IsSchoolPrincipal(BasePermission):
    message = "You must be the school principal to perform this operation"

    def has_permission(self, request, view):
        return Token.objects.filter(key=request.headers['Authorization'].split()[1])[0].user.groups.first().name == "Principal"


class IsSchoolPrincipalOrSupervisor(BasePermission):
    message = "You must be the school principal or Supervisor to perform this operation"

    def has_permission(self, request, view):
        return (
            Token.objects.filter(key=request.headers['Authorization'].split()[1])[0].user.groups.first().name == "Principal"
            or Token.objects.filter(key=request.headers['Authorization'].split()[1])[0].user.groups.first().name == "Supervisor"
        )
