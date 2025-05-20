from django.contrib import admin
from .models import (
    Sede, Edificio, Ubicacion,
    TipoDependencia, TipoDocumento, TipoContacto, TipoVinculacion, Cargo,
    Dependencia,
    Persona, ContactoPersona, ContactoDependencia,
    Vinculacion
)

# ---------------------------
# Catálogos básicos
# ---------------------------

@admin.register(TipoDependencia)
@admin.register(TipoDocumento)
@admin.register(TipoContacto)
@admin.register(TipoVinculacion)
@admin.register(Cargo)
class CatalogoAdmin(admin.ModelAdmin):
    list_display = ('nombre',)
    search_fields = ('nombre',)


# ---------------------------
# Entidades institucionales
# ---------------------------

@admin.register(Sede)
class SedeAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'ciudad', 'direccion')
    search_fields = ('nombre', 'ciudad')


@admin.register(Edificio)
class EdificioAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'nombre', 'sede')
    search_fields = ('codigo', 'nombre')
    list_filter = ('sede',)
    autocomplete_fields = ('sede',)


@admin.register(Ubicacion)
class UbicacionAdmin(admin.ModelAdmin):
    list_display = ('edificio', 'piso', 'latitud', 'longitud')
    list_filter = ('piso',)
    autocomplete_fields = ('edificio',)
    search_fields = ('edificio__nombre', 'edificio__codigo')


# ---------------------------
# Organización interna
# ---------------------------

@admin.register(Dependencia)
class DependenciaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo_dependencia', 'dependencia_padre')
    search_fields = ('nombre',)
    list_filter = ('tipo_dependencia',)
    autocomplete_fields = ('dependencia_padre', 'ubicacion')


# ---------------------------
# Personas y contactos
# ---------------------------

@admin.register(Persona)
class PersonaAdmin(admin.ModelAdmin):
    list_display = ('numero_documento', 'primer_nombre', 'primer_apellido')
    search_fields = (
        'numero_documento', 'primer_nombre', 'segundo_nombre',
        'primer_apellido', 'segundo_apellido'
    )
    list_filter = ('tipo_documento',)
    autocomplete_fields = ('tipo_documento',)


@admin.register(ContactoPersona)
class ContactoPersonaAdmin(admin.ModelAdmin):
    list_display = ('persona', 'tipo_contacto', 'valor', 'extension')
    search_fields = ('valor', 'persona__primer_nombre', 'persona__primer_apellido',)
    list_filter = ('tipo_contacto',)
    autocomplete_fields = ('persona', 'tipo_contacto')


@admin.register(ContactoDependencia)
class ContactoDependenciaAdmin(admin.ModelAdmin):
    list_display = ('dependencia', 'tipo_contacto', 'valor', 'extension')
    search_fields = ('valor',)
    list_filter = ('tipo_contacto',)
    autocomplete_fields = ('dependencia', 'tipo_contacto')


# ---------------------------
# Vinculaciones
# ---------------------------

@admin.register(Vinculacion)
class VinculacionAdmin(admin.ModelAdmin):
    list_display = ('get_nombre_persona', 'cargo', 'dependencia', 'estado_laboral', 'fecha_inicio', 'fecha_fin')
    list_filter = ('estado_laboral', 'tipo_vinculacion', 'cargo', 'dependencia')
    search_fields = ('persona__primer_nombre', 'persona__primer_apellido', 'persona__numero_documento')
    date_hierarchy = 'fecha_inicio'

    def get_nombre_persona(self, obj):
        return obj.persona.nombre_completo
    get_nombre_persona.short_description = 'Nombre Persona'
    get_nombre_persona.admin_order_field = 'persona__primer_apellido'
