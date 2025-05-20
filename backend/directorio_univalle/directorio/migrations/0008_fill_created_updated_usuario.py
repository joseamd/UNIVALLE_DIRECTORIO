from django.db import migrations
from django.utils.timezone import now

def fill_created_updated_usuario(apps, schema_editor):
    User = apps.get_model('auth', 'User')
    try:
        admin = User.objects.get(username='admin')
    except User.DoesNotExist:
        admin = None

    modelos = [
        'Sede', 'Edificio', 'Ubicacion',
        'Dependencia', 'Persona', 'ContactoPersona',
        'ContactoDependencia', 'Vinculacion'
    ]

    for modelo in modelos:
        Model = apps.get_model('directorio', modelo)
        for obj in Model.objects.all():
            if not obj.created:
                obj.created = now()
            if not obj.updated:
                obj.updated = now()
            if admin and not obj.usuario:
                obj.usuario = admin
            obj.save()

class Migration(migrations.Migration):

    dependencies = [
        ('directorio', '0007_contactodependencia_created_and_more'),
    ]

    operations = [
        migrations.RunPython(fill_created_updated_usuario),
    ]
