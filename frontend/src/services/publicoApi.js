import axios from 'axios';

const API_PUBLIC_URL = 'http://127.0.0.1:8000/directorio/publica/buscar/';
const API_BUSQUEDA_GENERAL = 'http://127.0.0.1:8000/directorio/public/busqueda-general/';

export const buscarPublica = (query, page = 1, filtros = {}) => {
  const params = {
    buscar: query,
    page,
    ...filtros  // Aquí se incluyen cargo, dependencia, etc.
  };

  return axios.get(API_PUBLIC_URL, { params });
};

export const buscarGeneral = (query) => {
  return axios.get(`${API_BUSQUEDA_GENERAL}?buscar=${query}`);
};
