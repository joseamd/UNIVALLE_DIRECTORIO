import React, { useEffect } from 'react';
import '@/styles/busquedaGlobal.scss'; 
import BusquedaGlobal from '../../components/admin/BusquedaGlobal';

const BusquedaGlobalPage = () => {
  useEffect(() => {
    document.title = 'Directorio Admin';
  }, []);
  
  return (
    <div className="busqueda-global">
      <BusquedaGlobal />
    </div>
  );
};

export default BusquedaGlobalPage;
