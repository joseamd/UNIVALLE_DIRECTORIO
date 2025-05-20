import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/directorio/edificios/';

export const getEdificios = () => axios.get(API_URL);

export const getEdificio = (id) => axios.get(`${API_URL}${id}/`);

export const createEdificio = (data) => axios.post(API_URL, data);

export const updateEdificio = (id, data) => axios.put(`${API_URL}${id}/`, data);

export const deleteEdificio = (id) => axios.delete(`${API_URL}${id}/`);
