// src/services/apiService.js

import axios from 'axios';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1/user',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to inject auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    //console.log("api config", config);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle expired tokens or authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Optionally redirect to login page
      // window.location.href = '/sign-in';
    }
    
    // Handle server errors
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response?.data);
    }
    
    return Promise.reject(error.response?.data || error);
  }
);

export default api;