# Generated by Django 2.2.10 on 2020-08-01 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('school', '0010_auto_20200801_0950'),
    ]

    operations = [
        migrations.AddField(model_name='fooditem', name='nutrition', field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),),
    ]