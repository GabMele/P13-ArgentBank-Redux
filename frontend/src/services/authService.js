// src/services/authService.js

import api from '@/services/apiService';
import handleAuthStorage from '@/utils/handleAuthStorage';

const debugPrefix = 'authService -> ';

/**
 * Authentication service for handling user authentication and profile management
 * @namespace authService
 */
const authService = {
  // ========================
  // AUTHENTICATION METHODS
  // ========================

  /**
   * Logs in a user with provided credentials
   * @param {Object} credentials - User credentials
   * @param {string} credentials.email - User's email
   * @param {string} credentials.password - User's password
   * @returns {Promise<{token: string, user: Object}>} Object containing auth token and user profile
   * @throws {Error} If login fails or network error occurs
   */
  async login(credentials) {
    try {
      console.debug(debugPrefix, 'login() called with:', { 
        email: credentials.email, 
        password: '(hidden)' 
      });

      const response = await api.post('/login', credentials);

      if (!response.data) {
        throw new Error('No data received from server');
      }

      const token = response.data.body?.token;
      console.debug(debugPrefix, '✅ login() successful, token received : ', token);

      if (!token) {
        throw new Error('No token received');
      }

      handleAuthStorage.set({token: token});
      
      const userProfileResponse = await this.getProfile();
      console.debug(debugPrefix, '✅ login()->getProfile(), user profile loaded:', {
        email: userProfileResponse.body.email
      });
      
      return { token, user: userProfileResponse.body };
    } catch (error) {
      console.error(debugPrefix, 'login() error:', error);
      
      if (error.code === "ECONNREFUSED" || 
          error.code === "ERR_NETWORK" || 
          error.message.includes("Network Error")) {
        throw new Error("No response from server");
      }
  
      if (error.response) {
        throw {
          message: error.response.data?.message || "Login failed",
          status: error.response.status
        };
      }

      throw {
        message: error.message || "Unknown login error",
        status: error.status || 500
      };
    }
  },

  /**
   * Registers a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Response data from the server
   * @throws {Error} If registration fails
   */
  async signup(userData) {
    try {
      console.debug(debugPrefix, 'signup() called with:', {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName
      });

      const response = await api.post('/signup', userData);
      console.debug(debugPrefix, '✅ signup() successful for:', userData.email);
      return response.data;
    } catch (error) {
      console.error(debugPrefix, 'signup() error:', error);
      throw {
        message: error.response?.data?.message || "Registration failed",
        status: error.response?.status || 500
      };
    }
  },

  // ========================
  // SESSION MANAGEMENT
  // ========================

  /**
   * Logs out the current user by removing the auth token
   */
  logout() {
    console.debug(debugPrefix, 'logout() called, removing token...');
    localStorage.removeItem('token');
  },

  // ========================
  // PROFILE METHODS
  // ========================

  /**
   * Retrieves the current user's profile
   * @returns {Promise<Object>} User profile data
   * @throws {Error} If profile retrieval fails
   */
  async getProfile() {
    try {
      console.debug(debugPrefix, 'getProfile() called');
      const response = await api.post('/profile');
      console.debug(debugPrefix, '✅ getProfile() successful with' + response.data);
      return response.data;
    } catch (error) {
      console.error(debugPrefix, 'getProfile() error:', error);
      throw {
        message: error.response?.data?.message || "Failed to fetch profile",
        status: error.response?.status || 500
      };
    }
  },

  /**
   * Updates the current user's profile
   * @param {Object} userData - Updated user data
   * @returns {Promise<{user: Object}>} Updated user profile
   * @throws {Error} If profile update fails
   */
  async updateProfile(userData) {
    try {
      console.debug(debugPrefix, 'updateProfile() called with:', {
        firstName: userData.firstName,
        lastName: userData.lastName
      });

      const response = await api.put('/profile', userData);
      console.debug(debugPrefix, '✅ updateProfile() successful');
      return { user: response.data.body };
    } catch (error) {
      console.error(debugPrefix, 'updateProfile() error:', error);
      throw {
        message: error.response?.data?.message || "Failed to update profile",
        status: error.response?.status || 500
      };
    }
  }
};

export default authService;