import re
from pathlib import Path

# Paths
#base_dir = Path(__file__).resolve().parents[2]
#models_path = base_dir / 'directorio_univalle' / 'directorio' / 'models.py'
#router_path = base_dir / 'frontend' / 'src' / 'router' / 'AppRouter.jsx'  # Ajusta esta ruta si es necesario
BASE_DIR = Path(__file__).resolve().parent.parent

# Archivos fuente y destino
models_path = BASE_DIR / 'directorio_univalle' / 'directorio' / 'models.py'
router_path = BASE_DIR.parent / 'frontend' / 'src' / 'router' / 'AppRouter.jsx'

# Regex
model_regex = re.compile(r'^class (\w+)\(models.Model\):')

def parse_models():
    models = []
    with open(models_path, 'r', encoding='utf-8') as file:
        for line in file:
            match = model_regex.match(line.strip())
            if match:
                models.append(match.group(1))
    return models

def generate_react_router(models):
    with open(router_path, 'w', encoding='utf-8') as f:
        # Encabezado
        f.write("import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';\n")
        for model in models:
            f.write(f"import {model}Page from './pages/{model}Page';\n")
        f.write("\n")
        f.write("export default function AppRouter() {\n")
        f.write("  return (\n")
        f.write("    <Router>\n")
        f.write("      <Routes>\n")

        # Rutas
        for model in models:
            url_path = model.lower()
            f.write(f"        <Route path='/{url_path}' element={{<{model}Page />}} />\n")

        # Cierre
        f.write("      </Routes>\n")
        f.write("    </Router>\n")
        f.write("  );\n")
        f.write("}\n")

# Ejecutar
if __name__ == '__main__':
    models = parse_models()
    if models:
        generate_react_router(models)
        print(f"✅ AppRouter.jsx generado con {len(models)} rutas.")
    else:
        print("❌ No se encontraron modelos en models.py.")
