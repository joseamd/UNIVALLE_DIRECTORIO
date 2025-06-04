import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/directorio/admin/tipo-documentos/';

export const getTipoDocumentos = () => axios.get(API_URL);

export const getTipoDocumento = (id) => axios.get(`${API_URL}${id}/`);

export const createTipoDocumento = (data) => axios.post(API_URL, data);

export const updateTipoDocumento = (id, data) => axios.put(`${API_URL}${id}/`, data);

export const deleteTipoDocumento = (id) => axios.delete(`${API_URL}${id}/`);
