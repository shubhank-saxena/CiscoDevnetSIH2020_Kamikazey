from django.db import models
from backend.school.models import School


class Student(models.Model):
    name = models.CharField(max_length=50)
    of_school = models.ForeignKey(School, on_delete=models.CASCADE)
    aadhaar_card_image = models.ImageField(upload_to='aadhaar_cards', null=True, blank=True)
    student_image = models.ImageField(upload_to='student_images', null=True, blank=True)

    class Meta:
        verbose_name = "Student"
        verbose_name_plural = "Students"

    def __str__(self):
        return f'{self.name} - {self.of_school}'


class Parent(models.Model):
    name = models.CharField(max_length=50)
    of_student = models.ForeignKey(Student, on_delete=models.CASCADE)

    FATHER = 'F'
    MOTHER = 'M'
    RELATION_CHOICES = [
        (FATHER, 'FATHER'),
        (MOTHER, 'MOTHER'),
    ]
    relation_with_student = models.CharField(max_length=10, choices=RELATION_CHOICES)

    class Meta:
        verbose_name = "Parent"
        verbose_name_plural = "Parents"

    def __str__(self):
        return f'{self.name} - {self.relation_with_student} of - {self.of_student}'
