# Generated by Django 2.2 on 2019-04-21 11:07

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_auto_20190404_1315'),
    ]

    operations = [
        migrations.AddField(
            model_name='elections',
            name='geom2',
            field=django.contrib.gis.db.models.fields.PolygonField(null=True, srid=4326),
        ),
    ]