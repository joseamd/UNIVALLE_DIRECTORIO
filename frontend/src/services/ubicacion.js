import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/directorio/admin/ubicaciones/';

export const getUbicaciones = () => axios.get(API_URL);

export const getUbicacion = (id) => axios.get(`${API_URL}${id}/`);

export const createUbicacion = (data) => axios.post(API_URL, data);

export const updateUbicacion = (id, data) => axios.put(`${API_URL}${id}/`, data);

export const deleteUbicacion = (id) => axios.delete(`${API_URL}${id}/`);
