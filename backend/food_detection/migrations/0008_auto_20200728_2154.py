# Generated by Django 2.2.10 on 2020-07-28 16:24

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food_detection', '0007_auto_20200728_2153'),
    ]

    operations = [
        migrations.AlterField(model_name='filehash', name='datetime', field=models.DateTimeField(default=datetime.datetime(2020, 7, 28, 21, 54, 0, 540009)),),
    ]
