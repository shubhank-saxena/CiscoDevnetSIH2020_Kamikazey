from django.contrib import admin
from . import models

admin.site.register(models.School)
admin.site.register(models.FoodSchedule)
admin.site.register(models.FoodItem)
admin.site.register(models.FoodItemDayMap)
admin.site.register(models.Supervisor)
admin.site.register(models.Report)
admin.site.register(models.Wastage)
