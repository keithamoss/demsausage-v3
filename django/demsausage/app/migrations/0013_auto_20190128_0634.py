# Generated by Django 2.1.5 on 2019-01-28 06:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_auto_20190128_0628'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalstalls',
            name='name',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='stalls',
            name='name',
            field=models.TextField(),
        ),
    ]
