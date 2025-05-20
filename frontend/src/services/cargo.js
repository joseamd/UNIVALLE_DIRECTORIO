import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/directorio/cargos/';

export const getCargos = () => axios.get(API_URL);

export const getCargo = (id) => axios.get(`${API_URL}${id}/`);

export const createCargo = (data) => axios.post(API_URL, data);

export const updateCargo = (id, data) => axios.put(`${API_URL}${id}/`, data);

export const deleteCargo = (id) => axios.delete(`${API_URL}${id}/`);
