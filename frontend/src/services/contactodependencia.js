import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/directorio/contactos-dependencia/';

export const getContactosDependencia = () => axios.get(API_URL);

export const getContactoDependencia = (id) => axios.get(`${API_URL}${id}/`);

export const createContactoDependencia = (data) => axios.post(API_URL, data);

export const updateContactoDependencia = (id, data) => axios.put(`${API_URL}${id}/`, data);

export const deleteContactoDependencia = (id) => axios.delete(`${API_URL}${id}/`);
