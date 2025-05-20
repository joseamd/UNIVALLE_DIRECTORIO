import React from 'react';
import { Info } from "lucide-react";
import CustomSnackbar from '../genericTable/CustomSnackbar';

const SinResultados = ({ query, openAlert, handleCloseAlert }) => {
  return (
    <>
      <div className="mensaje-sin-resultados">
        <Info size={24} />
        <span>
          <strong>No se encontraron resultados para:</strong> "{query}"
        </span>
      </div>
      {/* <CustomSnackbar
        open={openAlert}
        onClose={handleCloseAlert}
        severity="error"
        message={`No se encontraron resultados para: "${query}"`}
      /> */}
    </>
  );
};

export default SinResultados;
