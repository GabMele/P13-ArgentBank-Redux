// src/services/authService.js
// import api from '../api/axiosConfig';
import api from '@/services/apiService';


export const authService = {
  login: async (credentials) => {
    console.log("✅ authService.login() called");
    console.trace(); 
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
    console.log("✅ authService.getProfile() called");
    console.trace(); 
    const response = await api.post('/profile'); 
    return response.data;
  }
};
