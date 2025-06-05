from rest_framework import serializers
from directorio.models import (
    Ubicacion, Dependencia, Persona
)

# -------------------------
# Búsqueda pública
# -------------------------

class DependenciaBusquedaPublicaSerializer(serializers.ModelSerializer):
    contactos_dependencia = serializers.SerializerMethodField()
    sede = serializers.SerializerMethodField()
    ubicacion = serializers.SerializerMethodField()
    personas = serializers.SerializerMethodField() 

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

    def get_personas(self, obj):
        vinculaciones = obj.vinculacion_set.select_related('persona', 'cargo') \
            .filter(estado_laboral='activo')

        return [
            {
                'id': v.persona.id,
                'nombre': v.persona.nombre_completo,
                'cargo': v.cargo.nombre
            }
            for v in vinculaciones
        ]

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
    
