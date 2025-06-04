from rest_framework import serializers
from .models import (
    Sede, Ubicacion, Espacio,
    TipoDependencia, Dependencia,
    TipoDocumento, Persona,
    TipoContacto, ContactoPersona, ContactoDependencia,
    TipoVinculacion, Cargo, Vinculacion
)

# -------------------------
# Catálogos
# -------------------------

class TipoDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoDocumento
        fields = '__all__'

class TipoContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoContacto
        fields = '__all__'

class TipoDependenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoDependencia
        fields = '__all__'

class TipoVinculacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoVinculacion
        fields = '__all__'

class CargoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cargo
        fields = '__all__'

# -------------------------
# Entidades y estructura
# -------------------------

class SedeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sede
        fields = '__all__'

class EspacioSerializer(serializers.ModelSerializer):
    codigo = serializers.CharField(source='espacio_codigo')
    nombre = serializers.CharField(source='espacio_nombre')
    sede = serializers.PrimaryKeyRelatedField(queryset=Sede.objects.all())

    class Meta:
        model = Espacio
        fields = ['id', 'codigo', 'nombre', 'sede']

class UbicacionSerializer(serializers.ModelSerializer):
    sede = serializers.PrimaryKeyRelatedField(queryset=Sede.objects.all()) # Esto incluye el objeto completo de la sede en la ubicacion
    class Meta:
        model = Ubicacion
        fields = '__all__'

# -------------------------
# Dependencias
# -------------------------

class DependenciaSerializer(serializers.ModelSerializer):
    tipo_dependencia = serializers.PrimaryKeyRelatedField(queryset=TipoDependencia.objects.all())
    dependencia_padre = serializers.PrimaryKeyRelatedField(queryset=Dependencia.objects.all(), allow_null=True, required=False)
    ubicacion = serializers.PrimaryKeyRelatedField(queryset=Ubicacion.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Dependencia
        fields = '__all__'

# -------------------------
# Personas y contactos
# -------------------------

class PersonaSerializer(serializers.ModelSerializer):
    tipo_documento = serializers.PrimaryKeyRelatedField(queryset=TipoDocumento.objects.all())

    class Meta:
        model = Persona
        fields = '__all__'


class ContactoPersonaSerializer(serializers.ModelSerializer):
    persona = serializers.PrimaryKeyRelatedField(queryset=Persona.objects.all())

    class Meta:
        model = ContactoPersona
        fields = '__all__'


class ContactoDependenciaSerializer(serializers.ModelSerializer):
    dependencia = serializers.PrimaryKeyRelatedField(queryset=Dependencia.objects.all())

    class Meta:
        model = ContactoDependencia
        fields = '__all__'

# -------------------------
# Vinculación
# -------------------------

class VinculacionSerializer(serializers.ModelSerializer):
    persona = serializers.PrimaryKeyRelatedField(queryset=Persona.objects.all())
    tipo_vinculacion = serializers.PrimaryKeyRelatedField(queryset=TipoVinculacion.objects.all())
    cargo = serializers.PrimaryKeyRelatedField(queryset=Cargo.objects.all())
    dependencia = serializers.PrimaryKeyRelatedField(queryset=Dependencia.objects.all())

    class Meta:
        model = Vinculacion
        fields = '__all__'
        