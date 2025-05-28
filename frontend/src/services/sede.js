import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/directorio/admin/sedes/';

export const getSedes = () => axios.get(API_URL);

export const getSede = (id) => axios.get(`${API_URL}${id}/`);

export const createSede = (data) => axios.post(API_URL, data);

export const updateSede = (id, data) => axios.put(`${API_URL}${id}/`, data);

export const deleteSede = (id) => axios.delete(`${API_URL}${id}/`);
