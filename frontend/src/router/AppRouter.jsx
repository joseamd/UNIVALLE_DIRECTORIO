import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/home/Home';
import Login from '../pages/Login/Login';
import List from '../pages/list/List';
import Single from '../pages/single/Single';
import New from '../pages/new/New';
import BusquedaPublicaPage from '../pages/public/BusquedaPublicaPage';

import "../styles/genericTable.scss";
import '../styles/dark.scss';
import { DarkModeContext } from '../context/darkModeContext';
import BusquedaGlobal from '../components/admin/BusquedaGlobal';

const AppRouter = () => {

  const { darkMode } = useContext(DarkModeContext);
  const isAdminRoute = window.location.pathname.startsWith("/directorio/admin");

  return (
    <div className={isAdminRoute && darkMode ? "app dark" : "app"}>
       <BrowserRouter>
        <Routes>
          {/* Rutas principales con Layout */}
          <Route path="directorio/admin" element={<Layout />}>
            {/* Ruta para Sedes */}
            <Route path="sede">
              <Route index element={<List endpoint="sede" />} />
              <Route path=":sedeId" element={<Single endpoint="sede" />} />
              <Route path="new" element={<New endpoint="sede" />} />
            </Route>

            {/* Ruta para Espacios */}
            <Route path="espacio">
              <Route index element={<List endpoint="Espacio" />} />
              <Route path=":EspacioId" element={<Single endpoint="Espacio" />} />
              <Route path="new" element={<New endpoint="Espacio" />} />
            </Route>

            {/* Ruta para Ubicaciones */}
            <Route path="ubicacion">
              <Route index element={<List endpoint="ubicacion" />} />
              <Route path=":ubicacionId" element={<Single endpoint="ubicacion" />} />
              <Route path="new" element={<New endpoint="ubicacion" />} />
            </Route>

            {/* Ruta para TipoDependencia */}
            <Route path="tipodependencia">
              <Route index element={<List endpoint="tipodependencia" />} />
              <Route path=":tipodependenciaId" element={<Single endpoint="tipodependencia" />} />
              <Route path="new" element={<New endpoint="tipodependencia" />} />
            </Route>

            {/* Ruta para Dependencias */}
            <Route path="dependencia">
              <Route index element={<List endpoint="dependencia" />} />
              <Route path=":dependenciaId" element={<Single endpoint="dependencia" />} />
              <Route path="new" element={<New endpoint="dependencia" />} />
            </Route>

            {/* Ruta para Personas */}
            <Route path="persona">
              <Route index element={<List endpoint="persona" />} />
              <Route path=":personaId" element={<Single endpoint="persona" />} />
              <Route path="new" element={<New endpoint="persona" />} />
            </Route>

            {/* Ruta para TipoDocumento */}
            <Route path="tipodocumento">
              <Route index element={<List endpoint="tipodocumento" />} />
              <Route path=":tipodocumentoId" element={<Single endpoint="tipodocumento" />} />
              <Route path="new" element={<New endpoint="tipodocumento" />} />
            </Route>

            {/* Ruta para Vinculaciones */}
            <Route path="vinculacion">
              <Route index element={<List endpoint="vinculacion" />} />
              <Route path=":vinculacionId" element={<Single endpoint="vinculacion" />} />
              <Route path="new" element={<New endpoint="vinculacion" />} />
            </Route>

            {/* Ruta para TipoContacto */}
            <Route path="tipocontacto">
              <Route index element={<List endpoint="tipocontacto" />} />
              <Route path=":tipocontactoId" element={<Single endpoint="tipocontacto" />} />
              <Route path="new" element={<New endpoint="tipocontacto" />} />
            </Route>

            {/* Ruta para Contactos Persona */}
            <Route path="contactopersona">
              <Route index element={<List endpoint="contactopersona" />} />
              <Route path=":contactopersonaId" element={<Single endpoint="contactopersona" />} />
              <Route path="new" element={<New endpoint="contactopersona" />} />
            </Route>

            {/* Ruta para Contactos Dependencia */}
            <Route path="contactodependencia">
              <Route index element={<List endpoint="contactodependencia" />} />
              <Route path=":contactodependenciaId" element={<Single endpoint="contactodependencia" />} />
              <Route path="new" element={<New endpoint="contactodependencia" />} />
            </Route>

            {/* Ruta para TipoVinculacion */}
            <Route path="tipovinculacion">
              <Route index element={<List endpoint="tipovinculacion" />} />
              <Route path=":tipovinculacionId" element={<Single endpoint="tipovinculacion" />} />
              <Route path="new" element={<New endpoint="tipovinculacion" />} />
            </Route>

            {/* Ruta para Cargos */}
            <Route path="cargo">
              <Route index element={<List endpoint="cargo" />} />
              <Route path=":cargoId" element={<Single endpoint="cargo" />} />
              <Route path="new" element={<New endpoint="cargo" />} />
            </Route>

            {/* Rutas adicionales si es necesario */}
            {/* Agrega aquí el resto de las tablas si es necesario */}
          </Route>
          <Route path="directorio/publica/buscar" element={<BusquedaPublicaPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;