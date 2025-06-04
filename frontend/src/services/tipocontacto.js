import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/directorio/admin/tipo-contactos/';

export const getTipoContactos = () => axios.get(API_URL);

export const getTipoContacto = (id) => axios.get(`${API_URL}${id}/`);

export const createTipoContacto = (data) => axios.post(API_URL, data);

export const updateTipoContacto = (id, data) => axios.put(`${API_URL}${id}/`, data);

export const deleteTipoContacto = (id) => axios.delete(`${API_URL}${id}/`);
