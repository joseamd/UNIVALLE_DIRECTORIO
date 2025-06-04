from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
import re

from .busquedas_utils import (
    buscar_personas,
    buscar_dependencias,
    buscar_ubicaciones,
    buscar_sedes,
)

# Create your views here.

# Función que valida si el texto contiene caracteres no permitidos
def contiene_caracteres_invalidos(texto):
    # Regex que valida que solo se permitan caracteres alfanuméricos, acentos, y algunos caracteres especiales
    return not re.match(r'^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜÑñ\s.,@-]*$', texto)

@api_view(['GET'])
@permission_classes([AllowAny])
def busquedad_publica(request):
    query = request.GET.get('buscar', '').strip()
    #Filtros avanzados para Personas
    filtro_cargo = request.GET.get('cargo', '').strip()
    filtro_correo = request.GET.get('correo', '').strip()
    filtro_dependencia = request.GET.get('dependencia', '').strip()

    #Filtros avanzados para Dependencias
    filtro_ubicacion = request.GET.get('ubicacion', '').strip()    

    #Filtros avanzados para Ubicaciones
    filtro_codigo = request.GET.get('codigo', '').strip()
    filtro_nombre = request.GET.get('nombre', '').strip()

    if contiene_caracteres_invalidos(query):
        return Response({'error': 'Parámetros de búsqueda inválidos.'}, status=400)

    data = {}

    if query:

        data['personas'] = buscar_personas(query, filtro_cargo, filtro_correo, filtro_dependencia)
        data['dependencias'] = buscar_dependencias(query, filtro_ubicacion)
        data['sedes'] = buscar_sedes(query)   
        data['ubicaciones'] = buscar_ubicaciones(query, filtro_codigo, filtro_nombre)     
    else:
        # Si el query está vacío, devolver un array vacío o no hacer la consulta
        data['personas'] = []
        data['dependencias'] = []
        data['sedes'] = []
        data['ubicaciones'] = []
        
    return Response(data)