import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/directorio/contactos-persona/';

export const getContactosPersona = () => axios.get(API_URL);

export const getContactoPersona = (id) => axios.get(`${API_URL}${id}/`);

export const createContactoPersona = (data) => axios.post(API_URL, data);

export const updateContactoPersona = (id, data) => axios.put(`${API_URL}${id}/`, data);

export const deleteContactoPersona = (id) => axios.delete(`${API_URL}${id}/`);
