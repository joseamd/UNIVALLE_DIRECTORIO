from rest_framework import viewsets
 
from .models import (
    Sede, Ubicacion, Espacio,
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
    SedeSerializer, UbicacionSerializer, EspacioSerializer,
    DependenciaSerializer, PersonaSerializer,
    ContactoPersonaSerializer, ContactoDependenciaSerializer,
    VinculacionSerializer,    
)

class SedeViewSet(viewsets.ModelViewSet):
    queryset = Sede.objects.all()
    serializer_class = SedeSerializer

class UbicacionViewSet(viewsets.ModelViewSet):
    queryset = Ubicacion.objects.all()
    serializer_class = UbicacionSerializer

class EspacioViewSet(viewsets.ModelViewSet):
    queryset = Espacio.objects.all()
    serializer_class = EspacioSerializer

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



