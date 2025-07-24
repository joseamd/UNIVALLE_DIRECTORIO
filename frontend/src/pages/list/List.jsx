import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GenericTable from '../../components/genericTable/GenericTable';

function capitalizarPrimeraLetra(texto) {
  if (!texto) return '';
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

const List = () => {
  const path = useLocation().pathname;
  const type = path.split('directorio/admin/')[1]; // "funcionarios", "dependencias", etc.

  useEffect(() => {
    const pagina = capitalizarPrimeraLetra(type)
    document.title = `${pagina} | Directorio Admin`;
  }, [type]);
      
  return (
    <div className="listContainer">
      <GenericTable type={type} />
    </div>
  );
};

export default List;
