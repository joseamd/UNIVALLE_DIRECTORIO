import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/directorio/admin/personas/';

export const getPersonas = () => axios.get(API_URL);

export const getPersona = (id) => axios.get(`${API_URL}${id}/`);

export const createPersona = (data) => axios.post(API_URL, data);

export const updatePersona = (id, data) => axios.put(`${API_URL}${id}/`, data);

export const deletePersona = (id) => axios.delete(`${API_URL}${id}/`);
