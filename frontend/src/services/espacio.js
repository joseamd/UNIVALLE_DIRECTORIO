import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/directorio/espacios/';

export const getEspacios = () => axios.get(API_URL);

export const getEspacio = (id) => axios.get(`${API_URL}${id}/`);

export const createEspacio = (data) => axios.post(API_URL, data);

export const updateEspacio = (id, data) => axios.put(`${API_URL}${id}/`, data);

export const deleteEspacio = (id) => axios.delete(`${API_URL}${id}/`);
