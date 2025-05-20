import re
import json
from pathlib import Path

# Rutas base
BASE_DIR = Path(__file__).resolve().parent.parent
APP_NAME = 'directorio'
MODELS_FILE = BASE_DIR / 'directorio_univalle' / 'directorio' / 'models.py'
URLS_FILE = BASE_DIR / 'directorio_univalle' / 'directorio' / 'urls.py'
CUSTOM_ROUTES_FILE = BASE_DIR / 'scripts' / 'custom_routes.json'

def load_custom_routes():
    with open(CUSTOM_ROUTES_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def parse_models():
    model_pattern = re.compile(r'^class (\w+)\(models\.Model\):')
    models = []

    with open(MODELS_FILE, 'r', encoding='utf-8') as f:
        for line in f:
            match = model_pattern.match(line)
            if match:
                models.append(match.group(1))
    return models

def generate_urls_py(models, custom_routes):
    header = [
        "from django.urls import path, include",
        "from rest_framework.routers import DefaultRouter",
        "from .views import *",
        "",
        "router = DefaultRouter()"
    ]

    registrations = []
    for model in models:
        route = custom_routes.get(model, model.lower() + 's')
        registrations.append(f"router.register(r'{route}', {model}ViewSet)")

    urlpatterns = [
        "",
        "urlpatterns = [",
        "    path('', include(router.urls)),",
        "    # Nueva ruta para búsqueda pública de funcionarios",
        "]",
        ""
    ]

    return "\n".join(header + registrations + urlpatterns)

def main():
    models = parse_models()
    custom_routes = load_custom_routes()
    content = generate_urls_py(models, custom_routes)

    with open(URLS_FILE, 'w', encoding='utf-8') as f:
        f.write("# Este archivo fue generado automáticamente por generate_urls.py\n\n")
        f.write(content)

    print("✅ Archivo urls.py generado correctamente.")

if __name__ == "__main__":
    main()
