import React from 'react';
import { Info } from "lucide-react";

const SinResultados = ({ query }) => {
  return (
    <div className="sin-resultados">
      <Info className="text-blue-500 inline mr-2" />
      <span>No se encontraron resultados para "<strong>{query}</strong>".</span>
    </div>
  );
};

export default SinResultados;