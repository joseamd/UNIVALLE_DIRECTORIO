from rest_framework import viewsets, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Q
import re

from .models import (
    Sede, Edificio, Ubicacion,
    TipoDependencia, Dependencia,
    TipoDocumento, Persona,
    TipoContacto, ContactoPersona, ContactoDependencia,
    TipoVinculacion, Cargo, Vinculacion
)

from .serializers import (
    # Catálogos
    TipoDocumentoSerializer, TipoContactoSerializer, TipoDependenciaSerializer,
    TipoVinculacionSerializer, CargoSerializer,

    # Entidades
    SedeSerializer, EdificioSerializer, UbicacionSerializer,
    DependenciaSerializer, PersonaSerializer,
    ContactoPersonaSerializer, ContactoDependenciaSerializer,
    VinculacionSerializer,
    
)

from .busquedas_utils import (
    buscar_personas,
    buscar_dependencias,
    buscar_sedes,
    buscar_edificios
)


class SedeViewSet(viewsets.ModelViewSet):
    queryset = Sede.objects.all()
    serializer_class = SedeSerializer

class EdificioViewSet(viewsets.ModelViewSet):
    queryset = Edificio.objects.all()
    serializer_class = EdificioSerializer


class UbicacionViewSet(viewsets.ModelViewSet):
    queryset = Ubicacion.objects.all()
    serializer_class = UbicacionSerializer


class TipoDependenciaViewSet(viewsets.ModelViewSet):
    queryset = TipoDependencia.objects.all()
    serializer_class = TipoDependenciaSerializer


class DependenciaViewSet(viewsets.ModelViewSet):
    queryset = Dependencia.objects.all()
    serializer_class = DependenciaSerializer


class TipoDocumentoViewSet(viewsets.ModelViewSet):
    queryset = TipoDocumento.objects.all()
    serializer_class = TipoDocumentoSerializer


class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer


class TipoContactoViewSet(viewsets.ModelViewSet):
    queryset = TipoContacto.objects.all()
    serializer_class = TipoContactoSerializer


class ContactoPersonaViewSet(viewsets.ModelViewSet):
    queryset = ContactoPersona.objects.all()
    serializer_class = ContactoPersonaSerializer


class ContactoDependenciaViewSet(viewsets.ModelViewSet):
    queryset = ContactoDependencia.objects.all()
    serializer_class = ContactoDependenciaSerializer


class TipoVinculacionViewSet(viewsets.ModelViewSet):
    queryset = TipoVinculacion.objects.all()
    serializer_class = TipoVinculacionSerializer


class CargoViewSet(viewsets.ModelViewSet):
    queryset = Cargo.objects.all()
    serializer_class = CargoSerializer


class VinculacionViewSet(viewsets.ModelViewSet):
    queryset = Vinculacion.objects.all()
    serializer_class = VinculacionSerializer


# Función que valida si el texto contiene caracteres no permitidos
def contiene_caracteres_invalidos(texto):
    # Regex que valida que solo se permitan caracteres alfanuméricos, acentos, y algunos caracteres especiales
    return not re.match(r'^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜÑñ\s.,@-]*$', texto)

@api_view(['GET'])
@permission_classes([AllowAny])
def busquedad_publica(request):
    query = request.GET.get('buscar', '').strip()

    if contiene_caracteres_invalidos(query):
        return Response({'error': 'Parámetros de búsqueda inválidos.'}, status=400)

    data = {}

    if query:

        data['personas'] = buscar_personas(query)
        data['dependencias'] = buscar_dependencias(query)
        data['sedes'] = buscar_sedes(query)
        data['edificios'] = buscar_edificios(query)
    else:
        # Si el query está vacío, devolver un array vacío o no hacer la consulta
        data['personas'] = []
        data['dependencias'] = []
        data['sedes'] = []
        data['edificios'] = []
        
    return Response(data)
