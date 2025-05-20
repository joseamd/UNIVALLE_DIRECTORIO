import re
from pathlib import Path

# Paths
base_dir = Path(__file__).resolve().parents[1]
models_path = base_dir / 'directorio_univalle' / 'directorio' / 'models.py'
serializers_path = base_dir / 'directorio_univalle' / 'directorio' / 'serializers.py'

# Regex para encontrar clases de modelo
model_regex = re.compile(r'^class (\w+)\(models.Model\):')

# Leer modelos desde models.py
def parse_models():
    models = []

    with open(models_path, 'r', encoding='utf-8') as file:
        for line in file:
            model_match = model_regex.match(line.strip())
            if model_match:
                model_name = model_match.group(1)
                models.append(model_name)
    return models

# Generar serializers.py
def generate_serializers(models_list):
    with open(serializers_path, 'w', encoding='utf-8') as f:
        f.write("# Archivo generado automáticamente\n")
        f.write("from rest_framework import serializers\n")
        f.write("from .models import " + ", ".join(models_list) + "\n\n")

        for model in models_list:
            f.write(f"class {model}Serializer(serializers.ModelSerializer):\n")
            f.write(f"    class Meta:\n")
            f.write(f"        model = {model}\n")
            f.write(f"        fields = '__all__'\n\n")

# Ejecutar
if __name__ == '__main__':
    models = parse_models()
    if models:
        generate_serializers(models)
        print(f"✅ {serializers_path.name} generado con {len(models)} serializer(s).")
    else:
        print("❌ No se encontraron modelos en models.py.")
