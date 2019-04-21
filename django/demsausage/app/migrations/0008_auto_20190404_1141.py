# Generated by Django 2.1.7 on 2019-04-04 11:41

import demsausage.app.enums
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_auto_20190403_0930'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pollingplaces',
            name='chance_of_sausage',
            field=models.IntegerField(choices=[(demsausage.app.enums.PollingPlaceChanceOfSausage(0), 0), (demsausage.app.enums.PollingPlaceChanceOfSausage(1), 1), (demsausage.app.enums.PollingPlaceChanceOfSausage(2), 2), (demsausage.app.enums.PollingPlaceChanceOfSausage(3), 3)], null=True),
        ),
    ]