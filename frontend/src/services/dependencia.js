import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/directorio/admin/dependencias/';

export const getDependencias = () => axios.get(API_URL);

export const getDependencia = (id) => axios.get(`${API_URL}${id}/`);

export const createDependencia = (data) => axios.post(API_URL, data);

export const updateDependencia = (id, data) => axios.put(`${API_URL}${id}/`, data);

export const deleteDependencia = (id) => axios.delete(`${API_URL}${id}/`);

export const getDependenciasHijas = () => axios.get(`${API_URL}hijas/`);
