import React, { useState, useEffect } from 'react';
import { Tabs, Tab, TextField, Box, CircularProgress } from '@mui/material';
import { buscarPublica } from '../../services/publicoApi';
import ResultadosLista from '../../components/public/ResultadosLista';
import '../../styles/BusquedaPublica.scss';
import logo from '@/assets/logo.jpg';
import { Info } from "lucide-react";
import CustomSnackbar from '../genericTable/CustomSnackbar';

const categorias = ['personas', 'dependencias', 'edificios', 'sedes'];

const BusquedaPublicaTabs = () => {
  const [query, setQuery] = useState('');
  const [categoria, setCategoria] = useState('personas');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

const showSnackbar = (message, severity = 'info') => {
  setSnackbarMessage(message);
  setSnackbarSeverity(severity);
  setOpenSnackbar(true);
};

const handleCloseSnackbar = (_, reason) => {
  if (reason === 'clickaway') return;
  setOpenSnackbar(false);
};

  // Solo hacer la búsqueda si el query tiene al menos 3 caracteres
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length < 3) {        
        setResults({});  // Limpiar resultados cuando la búsqueda está vacía o tiene menos de 3 caracteres
        return;
      }
        
      setLoading(true);
      buscarPublica(query, 1)
        .then(res => setResults(res.data))
        .catch(err => {
          console.error('Error en búsqueda:', err);
          setResults({});
        })
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const validarQuery = (texto) => {
    const regex = /^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜÑñ\s.,@-]*$/;
    return regex.test(texto);
  };

  return (
    <>
      <div className="busqueda-publica">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-universidad" />
        </div>

        <h1>Buscar Información</h1>

        <TextField
          fullWidth
          label="Escriba nombre de Persona (correo, cargo), dependencia, Edificio o Sede "
          variant="outlined"
          className="input-busqueda"
          value={query}
          onChange={(e) => {
            const texto = e.target.value;
            if (validarQuery(texto)) {
              setQuery(texto);
            } else {
              showSnackbar("La búsqueda contiene caracteres no válidos.", "error");
            }
          }}
          sx={{ marginBottom: 2 }}
        />

        <button className="info-btn" onClick={() => setShowModal(true)}>
          <Info className="inline mr-1" size={18} />
          Información de uso
        </button>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={categoria}
            onChange={(e, newValue) => setCategoria(newValue)}
            variant="scrollable"
            allowScrollButtonsMobile
          >
            {categorias.map(cat => (
              <Tab
                key={cat}
                label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                value={cat}
              />
            ))}
          </Tabs>
        </div>

        {loading ? (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box className="tabla-resultados" sx={{ mt: 2 }}>
            <ResultadosLista
              datos={results[categoria] || []}
              categoria={categoria}
              busqueda={query}
            />
          </Box>
        )}

        {/* Modal de información */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-contenido">
              <h2>Guía de búsqueda</h2>
              <p>
                Utilice el campo de búsqueda para consultar información relacionada con el personal administrativo, las dependencias, los edificios o las sedes de la Universidad del Valle. Por defecto, la búsqueda se realiza sobre la categoría <strong>Personas</strong>.
              </p>
              <p>
                <strong>Categorías disponibles:</strong><br />
                - <strong>Personas:</strong> puede buscar por nombre o apellido.<br />
                - <strong>Dependencias, Edificios y Sedes:</strong> puede buscar por nombre.
              </p>
              <p>
                Una vez ingresado el término de búsqueda, seleccione la categoría correspondiente (Personas, Dependencias, Edificios o Sedes) para obtener resultados más precisos.<br />
                - En la categoría <strong>Personas</strong>, es posible filtrar por nombre, apellido, cargo, dependencia o correo institucional.<br />
                - En las demás categorías, se puede filtrar por cada una de las columnas disponibles.
              </p>
              <p>
                La búsqueda no distingue entre mayúsculas, minúsculas ni tildes. Solo se mostrarán resultados que coincidan con todos los términos ingresados, considerando todos los campos de la categoría seleccionada.
              </p>
              <p>
                <strong>Ejemplos de búsqueda:</strong> juliana, ANDRES, GUSTAVO, RUIZ, pérez, secretaria, facultad ciencias, @correo.edu.co, 1234
              </p>
              <button className="cerrar-btn" onClick={() => setShowModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>

      <CustomSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </>
  );
};

export default BusquedaPublicaTabs;
