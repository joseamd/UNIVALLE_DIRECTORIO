# directorio/utils/busquedas_utils.py

from django.db.models import Q
from directorio.models import Persona, Dependencia, Sede, Ubicacion
from .serializers import (   
    # Búsqueda pública
    PersonaBusquedaPublicaSerializer,
    DependenciaBusquedaPublicaSerializer,
    UbicacionConSedeSerializer,
)
from directorio.serializers import (
    SedeSerializer
)

def buscar_personas(query_param, filtro_cargo=None, filtro_correo=None, filtro_dependencia=None):
    query_param_like = f"%{query_param}%"

    # Personas por nombre completo (usando extra para unaccent + lower)
    personas_por_nombre = Persona.objects.extra(
        where=[
            "unaccent(lower(concat_ws(' ', primer_nombre, segundo_nombre, primer_apellido, segundo_apellido))) ILIKE unaccent(lower(%s))"
        ],
        params=[query_param_like]
    )

    # Personas por correo institucional
    personas_por_correo = Persona.objects.filter(
        contactos__tipo_contacto__nombre__iexact='correo_institucional',
        contactos__valor__icontains=query_param
    )

    # Personas por cargo
    personas_por_cargo = Persona.objects.filter(
        vinculacion__cargo__nombre__icontains=query_param
    )

    # Unimos ambos conjuntos con OR y eliminamos duplicados
    personas = (personas_por_nombre | personas_por_correo | personas_por_cargo).distinct()

    # Si filtro_cargo se envía, agregar filtro adicional:
    if filtro_cargo:
        personas = personas.filter(vinculacion__cargo__nombre__icontains=filtro_cargo)

    # Si filtro_correo se envía, agregar filtro adicional:
    if filtro_correo:
        personas = personas.filter(
            contactos__tipo_contacto__nombre__iexact='correo_institucional',
            contactos__valor__icontains=filtro_correo
        )

    # Si filtro_dependencia se envía, agregar filtro adicional:
    if filtro_dependencia:
        personas = personas.filter(vinculacion__dependencia__nombre__icontains=filtro_dependencia)

    personas = personas[:10]

    return PersonaBusquedaPublicaSerializer(personas, many=True).data

def buscar_dependencias(query_param, filtro_ubicacion=None):
    query_param_like = f"%{query_param}%"
    
    dependencias = Dependencia.objects.extra(
        where=["unaccent(lower(nombre)) ILIKE unaccent(lower(%s))"],
        params=[query_param_like]
    )[:10]
    return DependenciaBusquedaPublicaSerializer(dependencias, many=True).data

def buscar_sedes(query):
    sedes = Sede.objects.filter(
        Q(nombre__icontains=query) | Q(ciudad__icontains=query)
    )[:10]
    return SedeSerializer(sedes, many=True).data

def buscar_ubicaciones(query, filtro_codigo=None, filtro_nombre=None):
    # Filtro general, por nombre o código
    filtros = Q()
    if query:
        filtros |= Q(edificio_codigo__icontains=query)
        filtros |= Q(edificio_nombre__icontains=query)        
    
    # Filtros específicos aplicados con AND (refinan la búsqueda)
    if filtro_codigo:
        filtros &= Q(edificio_codigo__icontains=filtro_codigo)
    if filtro_nombre:
        filtros &= Q(edificio_nombre__icontains=filtro_nombre)
    
    ubicaciones = Ubicacion.objects.filter(filtros).select_related('sede').distinct()[:10]

    return UbicacionConSedeSerializer(ubicaciones, many=True).data

    
