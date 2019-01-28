# Generated by Django 2.1.5 on 2019-01-27 10:18

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_auto_20190127_0826'),
    ]

    operations = [
        migrations.AlterField(
            model_name='elections',
            name='geom',
            field=django.contrib.gis.db.models.fields.PointField(geography=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='historicalpollingplaces',
            name='geom',
            field=django.contrib.gis.db.models.fields.PointField(geography=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='pollingplaces',
            name='geom',
            field=django.contrib.gis.db.models.fields.PointField(geography=True, srid=4326),
        ),
    ]