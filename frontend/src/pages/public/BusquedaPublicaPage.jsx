import React, { useEffect } from 'react';
import '@/styles/busquedaPublica.scss'; 
import BusquedaPublica from '../../components/public/BusquedaPublica';

const BusquedaPublicaPage = () => {
  useEffect(() => {
    document.title = 'Directorio Público';
  }, []);
  return (
    <div className="pagina-busqueda">
      <BusquedaPublica />
    </div>
  );
};

export default BusquedaPublicaPage;
