# Este archivo fue generado automáticamente por generate_urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'sedes', SedeViewSet)
router.register(r'ubicaciones', UbicacionViewSet)
router.register(r'espacios', EspacioViewSet)
router.register(r'tipo-dependencias', TipoDependenciaViewSet)
router.register(r'dependencias', DependenciaViewSet)
router.register(r'tipo-documentos', TipoDocumentoViewSet)
router.register(r'personas', PersonaViewSet)
router.register(r'tipo-contactos', TipoContactoViewSet)
router.register(r'contactos-persona', ContactoPersonaViewSet)
router.register(r'contactos-dependencia', ContactoDependenciaViewSet)
router.register(r'tipo-vinculaciones', TipoVinculacionViewSet)
router.register(r'cargos', CargoViewSet)
router.register(r'vinculaciones', VinculacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('publica/buscar/', busquedad_publica),
    # Nueva ruta para búsqueda pública de funcionarios
]