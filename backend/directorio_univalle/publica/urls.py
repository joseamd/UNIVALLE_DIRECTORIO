from django.urls import path
from .views import busquedad_publica 

urlpatterns = [
    path('buscar/', busquedad_publica, name='busqueda-publica'),
]