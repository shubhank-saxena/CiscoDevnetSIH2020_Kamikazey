from django.db import models
from backend.school.models import School


class Student(models.Model):
    name = models.CharField(max_length=50)
    of_school = models.ForeignKey(School, on_delete=models.CASCADE)


class Parent(models.Model):
    name = models.CharField(max_length=50)
    of_student = models.ForeignKey(Student, on_delete=models.CASCADE)

    FATHER = 'F'
    MOTHER = 'M'
    RELATION_CHOICES = [
        (FATHER, 'FATHER'),
        (MOTHER, 'MOTHER'),
    ]
    relation = models.CharField(max_length=10, choices=RELATION_CHOICES)
