import re
from pathlib import Path

# Paths
base_dir = Path(__file__).resolve().parents[1]
models_path = base_dir / 'directorio_univalle' / 'directorio' / 'models.py'
serializers_path = base_dir / 'directorio_univalle' / 'directorio' / 'serializers.py'
views_path = base_dir / 'directorio_univalle' / 'directorio' / 'views.py'

# Regex
model_regex = re.compile(r'^class (\w+)\(models.Model\):')
serializer_regex = re.compile(r'^class (\w+Serializer)\(serializers\.ModelSerializer\):')

def parse_models():
    models = []
    with open(models_path, 'r', encoding='utf-8') as file:
        for line in file:
            match = model_regex.match(line.strip())
            if match:
                models.append(match.group(1))
    return models

def parse_serializers():
    serializers = []
    with open(serializers_path, 'r', encoding='utf-8') as file:
        for line in file:
            match = serializer_regex.match(line.strip())
            if match:
                serializers.append(match.group(1))
    return serializers

def generate_views(models, serializers):
    if len(models) != len(serializers):
        print("⚠️ Advertencia: Número de modelos y serializers no coincide exactamente. Se usará solo los coincidentes.")
    pairs = zip(models, serializers)

    with open(views_path, 'w', encoding='utf-8') as f:
        f.write("# Archivo generado automáticamente\n")
        f.write("from rest_framework import viewsets\n")
        f.write("from .models import " + ", ".join(models) + "\n")
        f.write("from .serializers import " + ", ".join(serializers) + "\n\n")

        for model, serializer in pairs:
            f.write(f"class {model}ViewSet(viewsets.ModelViewSet):\n")
            f.write(f"    queryset = {model}.objects.all()\n")
            f.write(f"    serializer_class = {serializer}\n\n")

# Ejecutar
if __name__ == '__main__':
    models = parse_models()
    serializers = parse_serializers()
    if models and serializers:
        generate_views(models, serializers)
        print(f"✅ {views_path.name} generado con {min(len(models), len(serializers))} vistas.")
    else:
        print("❌ No se encontraron modelos o serializadores.")
