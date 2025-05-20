import { useEffect } from 'react';
import { useSearch } from '../../context/searchContext';
import { buscarGeneral } from '../../services/publicoApi';
import ResultadoLista from '../admin/ResultadoLista';
import SinResultado from '../admin/SinResultado';
import '../../styles/BusquedaGlobal.scss';

const BusquedaGlobal = () => {
  const { searchTerm, searchResults, setSearchResults } = useSearch();

  useEffect(() => {
    if (searchTerm) {
      buscarGeneral(searchTerm)
        .then(res => setSearchResults(res.data))
        .catch(err => {
          console.error('Error al buscar datos:', err);
          setSearchResults({}); // Asegura que no sea undefined en caso de error
        });
    } else {
      setSearchResults({}); // Reinicia resultados si se borra el término
    }
  }, [searchTerm]);

  const funcionarios = searchResults?.funcionarios || [];
  const dependencias = searchResults?.dependencias || [];

  const hayResultados = funcionarios.length > 0 || dependencias.length > 0;

  return (
    <div className="busqueda-global">
      <h2>Resultados para: {searchTerm}</h2>

      {hayResultados ? (
        <div>
          {funcionarios.length > 0 && (
            <ResultadoLista 
              title="Tabla Funcionarios"
              data={funcionarios}
            />
          )}

          {dependencias.length > 0 && (
            <ResultadoLista 
              title="Tabla Dependencias"
              data={dependencias}
            />
          )}

          {/* Agrega más bloques de resultados si necesitas */}
        </div>
      ) : (
        <SinResultado query={searchTerm} />
        
      )}
    </div>
  );
};

export default BusquedaGlobal;
