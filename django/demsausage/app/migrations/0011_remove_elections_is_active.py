# Generated by Django 2.1.5 on 2019-01-28 02:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_auto_20190127_1033'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='elections',
            name='is_active',
        ),
    ]