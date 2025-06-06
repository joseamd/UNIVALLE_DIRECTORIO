import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { esES } from '@mui/x-data-grid/locales'; // Traducciones al español para DataGrid
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { CircularProgress, Box} from '@mui/material'; // Para fallback más profesional
import { columnasPorCategoria } from '../../config/columnasPorCategoria';
import SinResultados from './SinResultados';
import '../../styles/BusquedaPublica.scss';
// Carga diferida (lazy loading) para optimizar bundle inicial y mejorar performance
const PersonaModal = lazy(() => import('./modales/PersonaModal'));
const DependenciaModal = lazy(() => import('./modales/DependenciaModal'));

// Prefetch anticipado cuando hay resultados para evitar lag al abrir modal
const prefetchModales = () => {
  import('./modales/PersonaModal');
  import('./modales/DependenciaModal');
};

// Toolbar con memo para evitar renders innecesarios
const CustomToolbar = React.memo(() => (
  <div className="mi-toolbar">
    <div className="mi-toolbar-botones">
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
    </div>
    <GridToolbarQuickFilter debounceMs={500} />
  </div>
));


const ResultadosLista = ({ datos, categoria, busqueda  }) => {
  //console.log('Datos recibidos para mostrar:', datos);
  // Estado para controlar paginación en DataGrid
  const [paginationModel, setPaginationModel] = useState({pageSize: 10, page: 0, });

  // Estados para control de modales y el item seleccionado en cada uno
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [dependenciaSeleccionada, setDependenciaSeleccionada] = useState(null);
  const [openDependenciaModal, setOpenDependenciaModal] = useState(false);

  // Función memoizada para abrir modal según categoría, evita re-creación en cada render
  const handleOpenModal = useCallback((item) => {
    if (categoria === 'personas') {
      setPersonaSeleccionada(item);
      setOpenModal(true);
    } else if (categoria === 'dependencias') {
      setDependenciaSeleccionada(item);
      setOpenDependenciaModal(true);
    }
  }, [categoria]);

  // Funciones para cerrar modales
  const handleCloseModal = () => setOpenModal(false);
  const handleCloseDependenciaModal = () => setOpenDependenciaModal(false);

  // Precargar modales en segundo plano si hay datos
  useEffect(() => {
    if (datos.length > 0) {
      prefetchModales();
    }
  }, [datos]);

  // Columnas calculadas solo cuando cambian la función o la categoría, para optimizar render
  const columnas = useMemo(() => {
    return columnasPorCategoria(handleOpenModal)[categoria] || [];
  }, [handleOpenModal, categoria]);

  // Filas mapeadas para incluir un id único para DataGrid (usa id del item si existe)
  const filas = useMemo(() => {
    return datos.map((item, index) => ({
      ...item,
      id: item.id || index, // usa `item.id` si existe
    }));
  }, [datos]);

  // Si no hay búsqueda (menos de 3 caracteres), no mostramos nada
  if (!busqueda || busqueda.length < 3) return null;
  
  // Mostrar mensaje personalizado si no hay resultados para la búsqueda
  if (datos.length === 0) {
    return (
      <SinResultados
        query={busqueda}
        // openAlert={true}     //Opcional: activar alerta personalizada
        // handleCloseAlert={() => {}}
      />
    );
  }
  
  // Renderizado tabla de resultados
  return (
    <div className="tabla-resultados">
      <DataGrid
        className="mi-data-grid"
        rows={filas}
        columns={columnas}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}   //idioma español 
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
        pageSizeOptions={[5, 10]}
        slots={{ toolbar: CustomToolbar }}        
      />
      {/* Suspense para cargar modales solo cuando se necesiten */}
      <Suspense fallback={<Box p={2}><CircularProgress size={28} /></Box>}>
        <PersonaModal
          open={openModal}
          onClose={handleCloseModal}
          persona={personaSeleccionada}
        />
      </Suspense>

      <Suspense fallback={<Box p={2}><CircularProgress size={28} /></Box>}>
        <DependenciaModal
          open={openDependenciaModal}
          onClose={handleCloseDependenciaModal}
          dependencia={dependenciaSeleccionada}
        />
      </Suspense>
    </div>
  );
};

export default ResultadosLista;
