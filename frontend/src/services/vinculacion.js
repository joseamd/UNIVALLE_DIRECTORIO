import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/directorio/admin/vinculaciones/';

export const getVinculaciones = () => axios.get(API_URL);

export const getVinculacion = (id) => axios.get(`${API_URL}${id}/`);

export const createVinculacion = (data) => axios.post(API_URL, data);

export const updateVinculacion = (id, data) => axios.put(`${API_URL}${id}/`, data);

export const deleteVinculacion = (id) => axios.delete(`${API_URL}${id}/`);
