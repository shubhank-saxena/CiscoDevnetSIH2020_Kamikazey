# Generated by Django 2.2.10 on 2020-08-01 17:55

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('school', '0023_auto_20200801_2223'),
    ]

    operations = [
        migrations.AlterModelOptions(name='attendance', options={'verbose_name': 'Attendance', 'verbose_name_plural': 'Attendances'},),
        migrations.AlterModelOptions(name='contractor', options={'verbose_name': 'Contractor', 'verbose_name_plural': 'Contractors'},),
        migrations.AlterField(model_name='attendance', name='date', field=models.DateField(default=datetime.datetime(2020, 8, 1, 17, 55, 13, 637338, tzinfo=utc)),),
        migrations.AlterField(model_name='wastage', name='date', field=models.DateField(default=datetime.datetime(2020, 8, 1, 17, 55, 13, 634339, tzinfo=utc)),),
    ]
