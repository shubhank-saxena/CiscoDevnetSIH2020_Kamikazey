# Generated by Django 2.2.10 on 2020-08-03 07:02

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('school', '0034_auto_20200803_0717'),
    ]

    operations = [
        migrations.AlterField(model_name='attendance', name='date', field=models.DateField(default=datetime.datetime(2020, 8, 3, 7, 2, 1, 614171, tzinfo=utc)),),
        migrations.AlterField(model_name='wastage', name='date', field=models.DateField(default=datetime.datetime(2020, 8, 3, 7, 2, 1, 614171, tzinfo=utc)),),
    ]
