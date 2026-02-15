from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('about', '0001_initial'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='leadership',
            constraint=models.UniqueConstraint(
                condition=models.Q(is_active=True),
                fields=('position',),
                name='unique_active_leadership_position',
            ),
        ),
    ]
