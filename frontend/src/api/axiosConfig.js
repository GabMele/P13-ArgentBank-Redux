// src/api/axiosConfig.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/user';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Automatically attach Authorization token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
