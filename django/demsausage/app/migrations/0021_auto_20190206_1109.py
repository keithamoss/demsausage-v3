# Generated by Django 2.1.5 on 2019-02-06 11:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0020_auto_20190202_0821'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pollingplaces',
            name='noms',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='polling_place', to='app.PollingPlaceNoms'),
        ),
    ]
