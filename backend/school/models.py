from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.exceptions import PermissionDenied


class School(models.Model):
    organisation_id = models.CharField(max_length=50, primary_key=True)
    district = models.CharField(max_length=50, blank=True)
    name = models.CharField(max_length=50, blank=False)
    api_key = models.CharField(max_length=150, blank=False, unique=True)
    URL = models.URLField(max_length=200, blank=False, unique=True)
    email = models.EmailField(max_length=255, unique=True, verbose_name='email address of any school person', blank=True)
    contact_no = models.PositiveIntegerField()
    principal = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='principal_set')
    workers_count = models.PositiveIntegerField(blank=True)
    students_count = models.PositiveIntegerField(blank=True)
    under_supervisor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='supervisor_set')

    class Meta:
        verbose_name = "School"
        verbose_name_plural = "Schools"

    def __str__(self):
        return f'{self.organisation_id} - {self.name}'

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if self.under_supervisor.groups.first().name == "Supervisor" and self.principal.groups.first().name == "Principal":
            return super().save(force_insert=force_insert, force_update=force_update, using=using, update_fields=update_fields)
        else:
            raise PermissionDenied


class FoodSchedule(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE)

    BREAKFAST = 'BR'
    LUNCH = 'LN'
    DINNER = 'DN'
    CATEGORY_CHOICES = [
        (BREAKFAST, 'BREAKFAST'),
        (LUNCH, 'LUNCH'),
        (DINNER, 'DINNER'),
    ]
    category = models.CharField(max_length=20, blank=False, choices=CATEGORY_CHOICES)

    time = models.TimeField(blank=False)

    class Meta:
        verbose_name = "Food Schedule"
        verbose_name_plural = "Food Schedules"

    def __str__(self):
        return f'{self.school} - {self.category} - {self.time}'


class Wastage(models.Model):
    quantity = models.DecimalField(max_digits=6, decimal_places=2)
    food_schedule = models.ForeignKey(FoodSchedule, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateField(default=timezone.now())

    class Meta:
        verbose_name = "Food Wastage in kg/week"
        verbose_name_plural = "Food Wastages"

    def __str__(self):
        return f'{self.quantity}'


class FoodItem(models.Model):
    food_item = models.CharField(max_length=40, blank=False)
    nutrition = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, verbose_name='nutrition in calories/100g')

    class Meta:
        verbose_name = "Food Item"
        verbose_name_plural = "Food Items"

    def __str__(self):
        return f'{self.food_item}'


class FoodItemDayMap(models.Model):
    of_schedule = models.ForeignKey(FoodSchedule, on_delete=models.CASCADE)
    food_item = models.ManyToManyField(FoodItem)

    MONDAY = 'MON'
    TUESDAY = 'TUE'
    WEDNESDAY = 'WED'
    THURSDAY = 'THU'
    FRIDAY = 'FRI'
    SATURDAY = 'SAT'
    SUNDAY = 'SUN'
    DAY_CHOICES = [
        (MONDAY, 'MONDAY'),
        (TUESDAY, 'TUESDAY'),
        (WEDNESDAY, 'WEDNESDAY'),
        (THURSDAY, 'THURSDAY'),
        (FRIDAY, 'FRIDAY'),
        (SATURDAY, 'SATURDAY'),
        (SUNDAY, 'SUNDAY'),
    ]
    day = models.CharField(max_length=10, choices=DAY_CHOICES, blank=False)

    class Meta:
        verbose_name = "Food Item Day Map"
        verbose_name_plural = "Food Item Day Maps"

    def __str__(self):
        return f'{self.day} - {self.of_schedule}'


class Report(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    MENU = 'MENU'
    WORKER = 'WORKER'
    CAMERA = 'CAMERA'
    OTHER = 'OTHER'
    CATEGORY_CHOICES = [
        (MENU, 'MENU ISSUE'),
        (WORKER, 'WORKER ISSUE'),
        (CAMERA, 'CAMERA ISSUE'),
        (OTHER, 'OTHER'),
    ]
    category = models.CharField(max_length=20, blank=False, choices=CATEGORY_CHOICES)
    information = models.TextField(blank=False)

    class Meta:
        verbose_name = "Report Issue"
        verbose_name_plural = "Report Issues"

    def __str__(self):
        return f'{self.school.name} - {self.category}'


class Attendance(models.Model):
    student_present = models.BooleanField(default=False)
    date = models.DateField(default=timezone.now())
    of_student = models.ForeignKey('user.Student', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Attendance'
        verbose_name_plural = 'Attendances'

    def __str__(self):
        return f'{self.of_student} - {self.date} - {self.student_present}'


class Contractor(models.Model):
    username = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=50)
    school = models.ForeignKey(School, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Contractor'
        verbose_name_plural = 'Contractors'

    def __str__(self):
        return f'{self.username}, {self.name} - school: {self.school}'
