import React, { useState, useEffect } from 'react';
import { Tabs, Tab, TextField, Box, CircularProgress, Typography } from '@mui/material';
import { buscarPublica } from '../../services/publicoApi';
import ResultadosLista from '../../components/public/ResultadosLista';
import '../../styles/BusquedaPublica.scss';
import logo from '@/assets/logo.jpg';
import { Info } from "lucide-react";
import CustomSnackbar from '../genericTable/CustomSnackbar';
import Autocomplete from '@mui/material/Autocomplete';
import { getCargos } from '../../services/cargo';
import { getDependenciasHijas } from '../../services/dependencia';

const categorias = ['personas', 'dependencias', 'ubicaciones', 'sedes'];

const BusquedaPublicaTabs = () => {
  const [query, setQuery] = useState('');
  const [categoria, setCategoria] = useState('personas');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  // Filtros
  const [cargos, setCargos] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [columnaFiltro] = useState('');
  const [valorFiltro] = useState('');

  const showSnackbar = (message, severity = 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  // Busqueda principal: Solo hacer la búsqueda si el query tiene al menos 3 caracteres
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length < 3) {        
        setResults({});  // Limpiar resultados cuando la búsqueda está vacía o tiene menos de 3 caracteres
        return;
      }
        
      setLoading(true);
      // Preparar filtros adicionales si están seleccionados
      const filtros = {};
      if (columnaFiltro && valorFiltro) {
        filtros[columnaFiltro] = valorFiltro;
      }

      buscarPublica(query, 1, filtros)
        .then(res => {
          //console.log('Respuesta API:', res.data);  // Ver estructura aquí
          setResults(res.data);
        })
        .catch(err => {
          console.error('Error en búsqueda:', err);
          setResults({});
        })
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, valorFiltro, columnaFiltro]);


  //Carga los Cargos desde el backend
  useEffect(() => {
    getCargos()
      .then((res) => {
        setCargos(res.data);
      })
      .catch((err) => {
        console.error('Error al obtener cargos:', err);
      });
  }, []);

  //Carga las Dependencias hijas desde el backend
  useEffect(() => {
    getDependenciasHijas()
      .then(res => setDependencias(res.data))
      .catch(err => console.error('Error al cargar Dependencias:', err));
  }, []);
  

  const validarQuery = (texto) => {
    const regex = /^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜÑñ\s.,@-]*$/;
    return regex.test(texto);
  };


  // Filtro avanzado por Cargos, dependencias  
  const [cargoSeleccionado, setCargoSeleccionado] = useState(null);
  const [dependenciaSeleccionada, setDependenciaSeleccionada] = useState(null);

  // Filtramos los datos según cargo, dependencia seleccionado
  const datosFiltrados = (results[categoria] || []).filter(item => {
    const coincideCargo = !cargoSeleccionado || item.cargo === cargoSeleccionado.nombre;
    const coincideDependencia = !dependenciaSeleccionada || item.dependencia?.nombre === dependenciaSeleccionada.nombre;
    return coincideCargo && coincideDependencia;
  });


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

        {/* Tabs para categorías */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={categoria}
            onChange={(e, newValue) => {
              setCategoria(newValue);
              setCargoSeleccionado([]); // Limpia filtro al cambiar categoría
            }}
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

        {/* Sección de filtros avanzados */}
        {categoria === 'personas' && (results.personas?.length > 0) && (
          <>
            <div className="filtros-avanzados-titulo">Filtros Avanzados</div>
            <Box className="filtros-avanzados-container">
              <Autocomplete
                disablePortal
                id="filtro-cargo"
                size="small"
                options={cargos}
                getOptionLabel={(option) => option.nombre}
                onChange={(event, newValue) => {
                  setCargoSeleccionado(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filtrar por cargo"
                    placeholder="Selecciona un cargo"
                    variant="outlined"
                    sx={{
                      mt: 0,
                      '& .MuiInputBase-root': {
                        marginTop: 0,
                      },
                    }}
                  />
                )}
                sx={{ width: 190 }}
              />

              <Autocomplete
                disablePortal
                id="filtro-dependencia"
                size="small"
                options={dependencias}
                getOptionLabel={(option) => option.nombre}
                onChange={(event, newValue) => {
                  setDependenciaSeleccionada(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filtrar por dependencia"
                    placeholder="Selecciona una dependencia"
                    variant="outlined"
                    sx={{
                      mt: 0,
                      '& .MuiInputBase-root': {
                        marginTop: 0,
                      },
                    }}
                  />
                )}
                sx={{ width: 250 }}
              />
            </Box>
          </>
        )}
        

        {/* Mostrar Tabla primer busqueda o resultados filtrados */}
        {loading ? (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box className="tabla-resultados" sx={{ mt: 2 }}>
            <ResultadosLista
              datos={categoria === 'personas' ? datosFiltrados : results[categoria] || []}
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
