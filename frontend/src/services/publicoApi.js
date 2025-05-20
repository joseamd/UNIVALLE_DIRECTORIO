import axios from 'axios';

const API_PUBLIC_URL = 'http://127.0.0.1:8000/directorio/publica/buscar/';
const API_BUSQUEDA_GENERAL = 'http://127.0.0.1:8000/directorio/public/busqueda-general/';

export const buscarPublica = (query) => {
  return axios.get(`${API_PUBLIC_URL}?buscar=${query}`);
};

export const buscarGeneral = (query) => {
  return axios.get(`${API_BUSQUEDA_GENERAL}?buscar=${query}`);
};
