from django.contrib import admin
from auditlog.models import LogEntry
from auditlog.admin import LogEntryAdmin as BaseLogEntryAdmin
from .models import (
    Sede, Ubicacion, Espacio,
    TipoDependencia, TipoDocumento, TipoContacto, TipoVinculacion, Cargo,
    Dependencia,
    Persona, ContactoPersona, ContactoDependencia,
    Vinculacion
)

# ---------------------------
# Auditoría con Auditlog
# ---------------------------

# Desregistrar si fue registrado automáticamente
try:
    admin.site.unregister(LogEntry)
except admin.sites.NotRegistered:
    pass  # No estaba registrado aún

# Crear una clase admin más descriptiva
@admin.register(LogEntry)
class CustomLogEntryAdmin(BaseLogEntryAdmin):
    list_display = ('timestamp', 'actor', 'content_type', 'object_repr', 'action', 'changes_summary')
    list_filter = ('content_type', 'action', 'actor')
    search_fields = ('object_repr', 'changes')

    def changes_summary(self, obj):
        """Resumen amigable de los cambios."""
        if isinstance(obj.changes, dict):
            return ", ".join(obj.changes.keys())
        return ""
    changes_summary.short_description = "Campos modificados"

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
    readonly_fields = ('user_creation', 'user_updated')


@admin.register(Ubicacion)
class UbicacionAdmin(admin.ModelAdmin):
    list_display = ('edificio_codigo','edificio_nombre', 'num_piso', 'latitud', 'longitud')
    list_filter = ('sede',)
    autocomplete_fields = ('sede',)
    search_fields = ('edificio_nombre', 'edificio_codigo')
    readonly_fields = ('user_creation', 'user_updated')


@admin.register(Espacio)
class EspacioAdmin(admin.ModelAdmin):
    list_display = ('espacio_codigo', 'espacio_nombre')
    search_fields = ('espacio_codigo', 'espacio_nombre')
    readonly_fields = ('user_creation', 'user_updated')


# ---------------------------
# Organización interna
# ---------------------------

@admin.register(Dependencia)
class DependenciaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo_dependencia', 'dependencia_padre')
    search_fields = ('nombre',)
    list_filter = ('tipo_dependencia',)
    autocomplete_fields = ('dependencia_padre', 'ubicacion')
    readonly_fields = ('user_creation', 'user_updated')

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
    readonly_fields = ('user_creation', 'user_updated')


@admin.register(ContactoPersona)
class ContactoPersonaAdmin(admin.ModelAdmin):
    list_display = ('persona', 'tipo_contacto', 'valor', 'extension')
    search_fields = ('valor', 'persona__primer_nombre', 'persona__primer_apellido',)
    list_filter = ('tipo_contacto',)
    autocomplete_fields = ('persona', 'tipo_contacto')
    readonly_fields = ('user_creation', 'user_updated')

@admin.register(ContactoDependencia)
class ContactoDependenciaAdmin(admin.ModelAdmin):
    list_display = ('dependencia', 'tipo_contacto', 'valor', 'extension')
    search_fields = ('valor',)
    list_filter = ('tipo_contacto',)
    autocomplete_fields = ('dependencia', 'tipo_contacto')
    readonly_fields = ('user_creation', 'user_updated')

# ---------------------------
# Vinculaciones
# ---------------------------

@admin.register(Vinculacion)
class VinculacionAdmin(admin.ModelAdmin):
    list_display = ('get_nombre_persona', 'cargo', 'dependencia', 'estado_laboral', 'fecha_inicio', 'fecha_fin')
    list_filter = ('estado_laboral', 'tipo_vinculacion', 'cargo', 'dependencia')
    search_fields = ('persona__primer_nombre', 'persona__primer_apellido', 'persona__numero_documento')
    date_hierarchy = 'fecha_inicio'
    readonly_fields = ('user_creation', 'user_updated')

    def get_nombre_persona(self, obj):
        return obj.persona.nombre_completo
    get_nombre_persona.short_description = 'Nombre Persona'
    get_nombre_persona.admin_order_field = 'persona__primer_apellido'
