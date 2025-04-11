// src/services/apiService.js

/**
 * This is our main API service that handles all communication with the backend.
 * It automatically adds the auth token to requests and handles common errors.
 */

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1/user',
  headers: {
    'Content-Type': 'application/json',
  },
});

const debugPrefix = 'API Service ->';

// ========================
// REQUEST INTERCEPTORS
// ========================

/**
 * Runs before each request is sent
 * - Adds auth token if available
 * - Logs the request details
 */
const addAuthToken = (config) => {
  const token = localStorage.getItem('token');

  console.debug("📦 Token used for request:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.debug(debugPrefix, 'Request:', {
    method: config.method,
    url: config.url,
    data: config.data,
    // Don't log the actual auth header for security
    headers: { ...config.headers, Authorization: 'Bearer ***' }
  });

  return config;
};

/**
 * Handles errors that happen when preparing requests
 */
const handleRequestError = (error) => {
  console.error(debugPrefix, 'Request failed:', error);
  return Promise.reject(error);
};

// ========================
// RESPONSE INTERCEPTORS
// ========================

/**
 * Handles successful responses
 * - Just logs the response status
 */
const logResponse = (response) => {
  console.debug(debugPrefix, 'Response:', response.status, response.config.url);
  return response;
};

/**
 * Handles response errors
 * - Creates simple error info object
 * - Clears token if unauthorized (401)
 * - Logs the error
 */
const handleResponseError = (error) => {
  const errorInfo = {
    status: error.response?.status,
    message: error.response?.data?.message || error.message,
    isAuthError: error.response?.status === 401,
  };

  console.error(debugPrefix, 'Error:', errorInfo);

  // If auth error, clear the invalid token
  if (errorInfo.isAuthError) {
    localStorage.removeItem('token');
    console.warn(debugPrefix, '⚠️ Authentication invalid - token cleared');
  }

  return Promise.reject(errorInfo);
};

// Add our interceptors to the Axios instance
api.interceptors.request.use(addAuthToken, handleRequestError);
api.interceptors.response.use(logResponse, handleResponseError);

export default api;