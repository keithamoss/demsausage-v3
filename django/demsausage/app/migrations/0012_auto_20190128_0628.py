# Generated by Django 2.1.5 on 2019-01-28 06:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_remove_elections_is_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='elections',
            name='old_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='historicalpollingplaces',
            name='old_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='historicalstalls',
            name='old_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='pollingplaces',
            name='old_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='stalls',
            name='old_id',
            field=models.IntegerField(null=True),
        ),
    ]
