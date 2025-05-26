import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columnasPorCategoria } from '../../config/columnasPorCategoria';
import localeTextES from '../../utils/localeTextES';        // Traducciones
import SinResultados from './SinResultados';
import '../../styles/BusquedaPublica.scss';


const ResultadosLista = ({ datos, categoria, busqueda  }) => {
  console.log('Datos recibidos para mostrar:', datos);
  const [paginationModel, setPaginationModel] = useState({pageSize: 10, page: 0, });

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

  const columnas = columnasPorCategoria[categoria] || [];
  

  return (
    <div className="tabla-resultados">
      <DataGrid
        className="mi-data-grid"
        rows={datos.map((item, index) => ({ id: index, ...item }))}
        columns={columnas}
        localeText={localeTextES}    //idioma español 
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
        pageSizeOptions={[5, 10]}
        // slots={{ toolbar: GridToolbar }}
        //   slotProps={{
        //     toolbar: {
        //       showQuickFilter: true,
        //       quickFilterProps: { debounceMs: 500 },
        //     },
        //   }}
      />      
    </div>
  );
};

export default ResultadosLista;
