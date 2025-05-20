import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/directorio/tipo-dependencias/';

export const getTipoDependencias = () => axios.get(API_URL);

export const getTipoDependencia = (id) => axios.get(`${API_URL}${id}/`);

export const createTipoDependencia = (data) => axios.post(API_URL, data);

export const updateTipoDependencia = (id, data) => axios.put(`${API_URL}${id}/`, data);

export const deleteTipoDependencia = (id) => axios.delete(`${API_URL}${id}/`);
