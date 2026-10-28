
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const API_URL = `${API_BASE_URL}/sportscoaching`;

export const getAllSports = () => axios.get(`${API_URL}/displayall`);
export const getSportById = (id) => axios.get(`${API_URL}/display/${id}`);
export const addSport = (sports) => axios.post(`${API_URL}/add`, sports);
export const updateSport = (id, sports) => axios.put(`${API_URL}/update/${id}`, sports);
export const deleteSport = (id) => axios.delete(`${API_URL}/delete/${id}`);
