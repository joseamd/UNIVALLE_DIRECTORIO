import React from 'react';
import { useLocation } from 'react-router-dom';
import GenericTable from '../../components/genericTable/GenericTable';

const List = () => {
  const path = useLocation().pathname;
  const type = path.split('directorio/admin/')[1]; // "funcionarios", "dependencias", etc.

  return (
    <div className="listContainer">
      <GenericTable type={type} />
    </div>
  );
};

export default List;
