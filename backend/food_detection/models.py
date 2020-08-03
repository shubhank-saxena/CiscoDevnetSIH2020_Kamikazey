from django.db import models
from backend.school.models import School
import datetime


class Alert(models.Model):
    hash = models.CharField(max_length=70)
    URL = models.URLField(max_length=200, blank=False)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    datetime = models.DateTimeField(default=datetime.datetime.now())
    expected_item_name = models.CharField(max_length=40)
    provided_item = models.CharField(max_length=40)
