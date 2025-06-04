import re
from pathlib import Path
import json

# Base del proyecto
BASE_DIR = Path(__file__).resolve().parent.parent

# Archivos fuente y destino
models_file = BASE_DIR / 'directorio_univalle' / 'directorio' / 'models.py'
services_dir = BASE_DIR.parent / 'frontend' / 'src' / 'services'
table_config_file = BASE_DIR.parent / 'frontend' / 'src' / 'config' / 'tableConfig.jsx'
custom_routes_file = BASE_DIR / 'scripts' / 'custom_routes.json'

# Regex
model_regex = re.compile(r'^\s*class\s+(\w+)\s*\((.*?)\):')
field_regex = re.compile(r'^\s+(\w+)\s+=\s+models\.(\w+)\((.*?)\)')

# Mapeo tipos
type_mapping = {
    'CharField': 'string',
    'TextField': 'string',
    'EmailField': 'string',
    'URLField': 'string',
    'IntegerField': 'number',
    'FloatField': 'number',
    'DecimalField': 'number',
    'BooleanField': 'boolean',
    'DateField': 'date',
    'DateTimeField': 'datetime',
    'ForeignKey': 'relation'
}

def load_custom_routes():
    with open(custom_routes_file, 'r', encoding='utf-8') as f:
        return json.load(f)

def get_plural_function_name(model, custom_routes):
    plural_route = custom_routes.get(model, model.lower() + 's') # e.g. 'tipo-vinculaciones'
    parts = plural_route.split('-')                              # ['tipo', 'vinculaciones']
    return ''.join(p.capitalize() for p in parts)                # 'TipoVinculaciones'

# Parsear modelos
def parse_models():
    table_configs = {}
    current_model = None

    with open(models_file, 'r', encoding='utf-8') as file:
        for line in file:
            model_match = model_regex.search(line)
            if model_match:
                current_model = model_match.group(1)
                table_configs[current_model] = []      # Crea incluso si no tiene campos aún
            elif current_model:
                field_match = field_regex.search(line)
                if field_match:
                    field_name = field_match.group(1)
                    field_type = type_mapping.get(field_match.group(2), 'string')
                    field_args = field_match.group(3)
                    is_optional = 'blank=True' in field_args or 'null=True' in field_args
                    table_configs[current_model].append({
                        'name': field_name,
                        'label': field_name.replace('_', ' ').title(),
                        'type': field_type,
                        'required': not is_optional
                    })
    return table_configs

#función auxiliar para detectar si ya existe el bloque
def model_config_exists(model_lower, content):
    return f"{model_lower}:" in content

# 1. Crear los archivos JS por cada modelo
def generate_service_files(table_configs, custom_routes):
    services_dir.mkdir(parents=True, exist_ok=True)

    for model, fields in table_configs.items():
        model_lower = model.lower()
        service_file = services_dir / f'{model_lower}.js'
        if service_file.exists():
            continue    # Ya existe, no sobrescribir

        plural = custom_routes.get(model, model_lower + 's')
        function_plural = get_plural_function_name(model, custom_routes)

        with open(service_file, 'w', encoding='utf-8') as f:
            f.write("import axios from 'axios';\n\n")
            f.write(f"const API_URL = 'http://127.0.0.1:8000/directorio/admin/{plural}/';\n\n")
            f.write(f"export const get{function_plural} = () => axios.get(API_URL);\n\n")
            f.write(f"export const get{model} = (id) => axios.get(`${{API_URL}}${{id}}/`);\n\n")
            f.write(f"export const create{model} = (data) => axios.post(API_URL, data);\n\n")
            f.write(f"export const update{model} = (id, data) => axios.put(`${{API_URL}}${{id}}/`, data);\n\n")
            f.write(f"export const delete{model} = (id) => axios.delete(`${{API_URL}}${{id}}/`);\n")

# 2. Crear el archivo tableConfig.jsx
def generate_table_config(table_configs, custom_routes):
    # 1. Leer contenido existente
    if table_config_file.exists():
        with open(table_config_file, 'r', encoding='utf-8') as f:
            existing_content = f.read()
    else:
        existing_content = ""

    # 2. Si el archivo está vacío o no tiene estructura mínima, crearla
    if "export const tableConfigs" not in existing_content:
        existing_content = (
            "// Archivo generado automáticamente\n"
            "\n"
            "export const tableConfigs = {\n};\n"
        )

    updated_imports = ""
    updated_configs = ""

    for model, fields in table_configs.items():
        model_lower = model.lower()
        if model_config_exists(model_lower, existing_content):
            continue

        function_plural = get_plural_function_name(model, custom_routes)

        # Añadir importación
        updated_imports += f"\nimport {{\n"
        updated_imports += f"  get{function_plural},\n"
        updated_imports += f"  create{model},\n"
        updated_imports += f"  update{model},\n"
        updated_imports += f"  delete{model}\n"
        updated_imports += f"}} from '../services/{model_lower}';\n"

        # Añadir configuración
        updated_configs += f"  {model_lower}: {{\n"
        updated_configs += f"    title: 'Gestión de {model}',\n"
        updated_configs += f"    columns: [\n"
        for field in fields:
            updated_configs += f"      {{ field: '{field['name']}', headerName: '{field['label']}' }},\n"
        updated_configs += "    ],\n"
        updated_configs += "    fields: [\n"
        for field in fields:
            updated_configs += f"      {{ name: '{field['name']}', label: '{field['label']}', required: {str(field['required']).lower()} }},\n"
        updated_configs += "    ],\n"
        updated_configs += f"    getData: get{function_plural},\n"
        updated_configs += f"    createRow: create{model},\n"
        updated_configs += f"    updateRow: update{model},\n"
        updated_configs += f"    deleteRow: delete{model},\n"
        updated_configs += "  },\n"

    # Insertar imports
    parts = existing_content.split("export const tableConfigs = {", 1)
    if len(parts) == 2:
        existing_content = parts[0] + updated_imports + "\nexport const tableConfigs = {" + parts[1]

    # Insertar configs
    existing_content = re.sub(
        r'(export const tableConfigs = {)(.*?)(\n};)',
        lambda m: m.group(1) + m.group(2) + '\n' + updated_configs + m.group(3),
        existing_content,
        flags=re.DOTALL
    )

    # Escribir archivo actualizado
    with open(table_config_file, 'w', encoding='utf-8') as js_file:
        js_file.write(existing_content)

def main():
    custom_routes = load_custom_routes()  # Cargar las rutas desde el archivo JSON  
    table_configs = parse_models()    # Ahora no pasa argumentos
    generate_service_files(table_configs, custom_routes)
    generate_table_config(table_configs, custom_routes)

    print("✅ Archivos generados correctamente:")
    print(f" - {table_config_file}")
    for model in table_configs:
        print(f" - {services_dir / f'{model.lower()}.js'}")

if __name__ == '__main__':
    main()
