// src/services/authService.js
import api from '../api/axiosConfig';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    const token = response.data.body?.token;
    if (token) localStorage.setItem('token', token);
    return response.data;
  },

  signup: async (userData) => {
    const response = await api.post('/signup', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getProfile: async () => {
    const response = await api.get('/profile'); // Headers are handled by axiosConfig
    return response.data;
  }
};
