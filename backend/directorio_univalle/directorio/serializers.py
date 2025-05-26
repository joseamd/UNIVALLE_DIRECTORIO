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

# -------------------------
# Búsqueda pública
# -------------------------

class DependenciaBusquedaPublicaSerializer(serializers.ModelSerializer):
    contactos_dependencia = serializers.SerializerMethodField()
    sede = serializers.SerializerMethodField()
    ubicacion = serializers.SerializerMethodField()

    class Meta:
        model = Dependencia
        fields = '__all__'

    def get_contactos_dependencia(self, obj):
        return [
            {
                'tipo': c.tipo_contacto.nombre,
                'valor': c.valor,
                'extension': c.extension
            } for c in obj.contactos.all()
        ]

    def get_sede(self, obj):
        try:
            sede = obj.ubicacion.sede
            return {
                'id': sede.id,
                'nombre': sede.nombre,
                'direccion': sede.direccion,
                'ciudad': sede.ciudad
            }
        except AttributeError:
            return None

    def get_ubicacion(self, obj):
        try:
            ubicacion = obj.ubicacion
            return {
                'id': ubicacion.id,
                'codigo': ubicacion.edificio_codigo,
                'nombre': ubicacion.edificio_nombre
            }
        except AttributeError:
            return None        


class PersonaBusquedaPublicaSerializer(serializers.ModelSerializer):
    nombre = serializers.SerializerMethodField()
    cargo = serializers.SerializerMethodField()
    dependencia = serializers.SerializerMethodField()
    contactos_persona = serializers.SerializerMethodField()
    sede = serializers.SerializerMethodField()
    ubicacion = serializers.SerializerMethodField()

    class Meta:
        model = Persona
        fields = [
            'id', 'nombre', 'cargo', 'dependencia',
            'contactos_persona', 'sede', 'ubicacion'
        ]

    def to_representation(self, instance):
        # Guardamos la vinculación para evitar múltiples llamadas
        self._vinculacion = instance.vinculacion_set.first()
        return super().to_representation(instance)

    def get_vinculacion(self, obj):
        return getattr(self, '_vinculacion', None)

    def get_nombre(self, obj):
        return obj.nombre_completo

    def get_cargo(self, obj):
        vinculacion = self.get_vinculacion(obj)
        return vinculacion.cargo.nombre if vinculacion and vinculacion.cargo else None

    def get_dependencia(self, obj):
        vinculacion = self.get_vinculacion(obj)
        dependencia = vinculacion.dependencia if vinculacion else None
        if dependencia:
            return {
                'id': dependencia.id,
                'nombre': dependencia.nombre
            }
        return None    
    
    def format_contactos(self, contactos):
        return [
            {
                'tipo': c.tipo_contacto.nombre,
                'valor': c.valor,
                'extension': c.extension
            } for c in contactos
        ]

    def get_contactos_persona(self, obj):
        return self.format_contactos(obj.contactos.all())
    

    def get_sede(self, obj):
        vinculacion = self.get_vinculacion(obj)
        try:
            sede = vinculacion.dependencia.ubicacion.edificio.sede
            return {
                'id': sede.id,
                'nombre': sede.nombre,
                'direccion': sede.direccion,
                'ciudad': sede.ciudad
            }
        except AttributeError:
            return None        


    def get_ubicacion(self, obj):
        vinculacion = self.get_vinculacion(obj)
        try:
            ubicacion = vinculacion.dependencia.ubicacion
            sede = ubicacion.sede
            return {
                'codigo': ubicacion.edificio_codigo,
                'nombre': ubicacion.edificio_nombre,
                'sede': {
                    'nombre': sede.nombre,
                    'direccion': sede.direccion,
                    'ciudad': sede.ciudad
                } if sede else None
            }
        except AttributeError:
            return None
        
class UbicacionConSedeSerializer(serializers.ModelSerializer):
    codigo = serializers.CharField(source='edificio_codigo')
    nombre = serializers.CharField(source='edificio_nombre')
    sede = serializers.SerializerMethodField()

    class Meta:
        model = Ubicacion
        fields = ['id', 'codigo', 'nombre', 'sede']

    def get_sede(self, obj):
        if obj.sede:
            return {
                'id': obj.sede.id,
                'nombre': obj.sede.nombre,
                'direccion': obj.sede.direccion,
                'ciudad': obj.sede.ciudad
            }
        return None