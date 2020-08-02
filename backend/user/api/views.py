from rest_framework.viewsets import ModelViewSet
from backend.user.models import Student, Parent
from backend.user.api.serializers import StudentSerializer, ParentSerializer
from backend.user.api.permissions import IsSchoolPrincipal
from rest_framework.status import HTTP_403_FORBIDDEN
from rest_framework.authtoken.models import Token


class StudentViewset(ModelViewSet):

    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_class = [IsSchoolPrincipal]

    def get_queryset(self):
        user = Token.objects.filter(key=self.request.headers['Authorization'].split()[1])[0].user
        students_of_principal = []
        students = self.queryset.all()
        for student in students:
            if student.of_school.principal == user:
                students_of_principal.append(student)
        return students_of_principal

    def update(self, request, *args, **kwargs):
        try:
            self.get_queryset().get(id=kwargs['pk'])
            return super().update(request, *args, **kwargs)
        except Exception:
            raise HTTP_403_FORBIDDEN

    def destroy(self, request, *args, **kwargs):
        try:
            self.get_queryset().get(id=kwargs['pk'])
            return super().update(request, *args, **kwargs)
        except Exception:
            raise HTTP_403_FORBIDDEN


class ParentViewset(ModelViewSet):

    queryset = Parent.objects.all()
    serializer_class = ParentSerializer
    permission_class = [IsSchoolPrincipal]

    def get_queryset(self):
        user = Token.objects.filter(key=self.request.headers['Authorization'].split()[1])[0].user
        students_of_principal = []
        students = self.queryset.all()
        for student in students:
            if student.of_school.principal == user:
                students_of_principal.append(student)
        return students_of_principal

    def update(self, request, *args, **kwargs):
        try:
            self.get_queryset().get(id=kwargs['pk'])
            return super().update(request, *args, **kwargs)
        except Exception:
            raise HTTP_403_FORBIDDEN

    def destroy(self, request, *args, **kwargs):
        try:
            self.get_queryset().get(id=kwargs['pk'])
            return super().update(request, *args, **kwargs)
        except Exception:
            raise HTTP_403_FORBIDDEN
