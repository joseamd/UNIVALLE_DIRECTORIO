import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/directorio/tipo-vinculaciones/';

export const getTipoVinculaciones = () => axios.get(API_URL);

export const getTipoVinculacion = (id) => axios.get(`${API_URL}${id}/`);

export const createTipoVinculacion = (data) => axios.post(API_URL, data);

export const updateTipoVinculacion = (id, data) => axios.put(`${API_URL}${id}/`, data);

export const deleteTipoVinculacion = (id) => axios.delete(`${API_URL}${id}/`);
