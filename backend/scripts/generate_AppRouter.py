import json
from pathlib import Path

# Rutas base
BASE_DIR = Path(__file__).resolve().parent.parent
CUSTOM_ROUTES_FILE = BASE_DIR / 'scripts' / 'custom_routes.json'
ROUTER_FILE = BASE_DIR.parent / 'frontend' / 'src' / 'router' / 'AppRouter.jsx'

# Cargar rutas personalizadas
with open(CUSTOM_ROUTES_FILE, 'r', encoding='utf-8') as f:
    custom_routes = json.load(f)

def generate_router_jsx(routes):
    header = """import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/home/Home';
import Login from '../pages/Login/Login';
import List from '../pages/list/List';
import Single from '../pages/single/Single';
import New from '../pages/new/New';
import BusquedaPublicaPage from '../pages/public/BusquedaPublicaPage';
import BusquedaGlobal from '../components/admin/BusquedaGlobal';

import "../styles/genericTable.scss";
import '../styles/dark.scss';
import { DarkModeContext } from '../context/darkModeContext';

const AppRouter = () => {

  const {darkMode} = useContext(DarkModeContext)

  return (
    <div className={darkMode ? "app dark" : "app"}>
       <BrowserRouter>
        <Routes>
          {/* Rutas principales con Layout */}
          <Route path="directorio/admin" element={<Layout />}>
"""

    body = ""
    for model in routes.keys():
        route_name = model.lower()  # singular y en minúsculas
        model_id = f"{route_name}Id"
        body += f"""            {{/* Ruta para {model} */}}
            <Route path="{route_name}">
              <Route index element={{<List endpoint="{route_name}" />}} />
              <Route path=":{model_id}" element={{<Single endpoint="{route_name}" />}} />
              <Route path="new" element={{<New endpoint="{route_name}" />}} />
            </Route>\n\n"""

    footer = """          </Route>
          <Route path="directorio/publica/buscar" element={<BusquedaPublicaPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
"""
    return header + body + footer

# Guardar archivo JSX
jsx_code = generate_router_jsx(custom_routes)
with open(ROUTER_FILE, 'w', encoding='utf-8') as f:
    f.write(jsx_code)

print("✅ AppRouter.jsx generado correctamente como el original (singular, minúscula).")
