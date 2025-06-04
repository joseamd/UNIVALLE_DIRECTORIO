import React, { useState } from 'react';
import { esES } from '@mui/x-data-grid/locales'; // Traducciones
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { columnasPorCategoria } from '../../config/columnasPorCategoria';
import SinResultados from './SinResultados';
import PersonaModal from './modales/PersonaModal';
import '../../styles/BusquedaPublica.scss';


const ResultadosLista = ({ datos, categoria, busqueda  }) => {
  //console.log('Datos recibidos para mostrar:', datos);
  const [paginationModel, setPaginationModel] = useState({pageSize: 10, page: 0, });

  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (persona) => {
    setPersonaSeleccionada(persona);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Si no hay búsqueda (menos de 3 caracteres), no mostramos nada
  if (!busqueda || busqueda.length < 3) return null;
  
  // Si hay búsqueda pero no hay resultados
  if (datos.length === 0) {
    return (
      <SinResultados
        query={busqueda}
        openAlert={true}
        handleCloseAlert={() => {}}
      />
    );
  }

  const columnas = columnasPorCategoria(handleOpenModal)[categoria] || [];
  
  // Toolbar personalizada con filtros, columnas, densidad y filtro rápido
  function CustomToolbar() {
    return (
      <div className="mi-toolbar">
          <div className="mi-toolbar-botones">
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
          </div>
          <GridToolbarQuickFilter debounceMs={500} />
        </div>
    );
  }

  return (
    <div className="tabla-resultados">
      <DataGrid
        className="mi-data-grid"
        rows={datos.map((item, index) => ({ id: index, ...item }))}
        columns={columnas}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}   //idioma español 
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
        pageSizeOptions={[5, 10]}
        slots={{ toolbar: CustomToolbar }}        
      />
      <PersonaModal
        open={openModal}
        onClose={handleCloseModal}
        persona={personaSeleccionada}
      />      
    </div>
  );
};

export default ResultadosLista;
