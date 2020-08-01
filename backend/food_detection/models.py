from django.db import models
from backend.school.models import School
import datetime


class FileHash(models.Model):
    hash = models.CharField(max_length=70)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    datetime = models.DateTimeField(default=datetime.datetime.now())
