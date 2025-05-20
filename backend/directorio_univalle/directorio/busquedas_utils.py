# directorio/utils/busquedas_utils.py

from django.db.models import Q
from directorio.models import Persona, Dependencia, Sede, Edificio
from .serializers import (   

    # Búsqueda pública
    PersonaBusquedaPublicaSerializer,
    DependenciaBusquedaPublicaSerializer,
    EdificioConSedeSerializer,
    SedeSerializer
)

def buscar_personas(query_param):
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
        contactos__tipo_contacto__nombre__iexact='Correo Institucional',
        contactos__valor__icontains=query_param
    )

    # Unimos ambos conjuntos con OR y eliminamos duplicados
    personas = (personas_por_nombre | personas_por_correo).distinct()[:10]

    return PersonaBusquedaPublicaSerializer(personas, many=True).data

def buscar_dependencias(query_param):
    dependencias = Dependencia.objects.extra(
        where=["unaccent(lower(nombre)) ILIKE unaccent(lower(%s))"],
        params=[query_param]
    )[:10]
    return DependenciaBusquedaPublicaSerializer(dependencias, many=True).data

def buscar_sedes(query):
    sedes = Sede.objects.filter(
        Q(nombre__icontains=query)
    )[:10]
    return SedeSerializer(sedes, many=True).data

def buscar_edificios(query):
    edificios = Edificio.objects.filter(
        Q(nombre__icontains=query)
    )[:10]
    return EdificioConSedeSerializer(edificios, many=True).data
