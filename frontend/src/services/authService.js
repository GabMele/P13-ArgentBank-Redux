// src/services/authService.js

/**
 * Authentication Service (authService)
 * 
 * This service manages the authentication flow for the user, including login,
 * signup, session management (login/logout), and user profile management.
 * 
 * It interacts with the backend API for user authentication, handling user
 * credentials during login and retrieving/updating
 * the user's profile.
 * 
 * ## Key Features:
 * - **Login:** Authenticates the user by sending credentials (email, password)
 *   to the backend. If successful, it stores the authentication token and
 *   retrieves the user profile.
 * - **Signup:** Allows a new user to register by submitting their details (email,
 *   name) to the backend, enabling the creation of a new account.
 * - **Logout:** Clears the authentication token from storage, logging the user
 *   out and terminating the session.
 * - **Profile Management:** Allows retrieval and updating of the authenticated
 *   user's profile information, such as first name, last name, etc.
 * 
 */

import api from '@/services/apiService';
import handleAuthStorage from '@/utils/handleAuthStorage';

const debugPrefix = 'authService -> ';

const authService = {
  // ========================
  // AUTHENTICATION METHODS
  // ========================

  /**
   * Logs in a user with provided credentials.
   * This method sends a POST request to the server with the user's credentials 
   * and handles the response
   *
   * @param {Object} credentials - User credentials
   * @param {string} credentials.email - User's email address
   * @param {string} credentials.password - User's password
   * @returns {Promise<{token: string, user: Object}>} An object containing the auth token and the user profile data
   * @throws {Error} Throws an error if login fails, the network is unavailable, or server response is invalid
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
      console.debug(debugPrefix, '✅ login() successful, token received:', token);

      if (!token) {
        throw new Error('No token received');
      }

      handleAuthStorage.set({ token: token });
      
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
   * Registers a new user by sending a POST request with the user data.
   * If successful, returns the server's response data.
   * 
   * @param {Object} userData - New user registration data
   * @param {string} userData.email - User's email address
   * @param {string} userData.firstName - User's first name
   * @param {string} userData.lastName - User's last name
   * @returns {Promise<Object>} The server's response data from the registration request
   * @throws {Error} Throws an error if registration fails
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
   * Logs out the current user by clearing the auth token from storage.
   * This action removes the user's session and prevents unauthorized access.
   */
  logout() {
    console.debug(debugPrefix, 'logout() called, removing token...');
    handleAuthStorage.clear();
  },

  // ========================
  // PROFILE METHODS
  // ========================

  /**
   * Retrieves the current user's profile
   * The server is expected to return the profile data associated with the authenticated user.
   *
   * @returns {Promise<Object>} The user's profile data
   * @throws {Error} Throws an error if profile retrieval fails
   */
  async getProfile() {
    try {
      console.debug(debugPrefix, 'getProfile() called');
      const response = await api.post('/profile');
      console.debug(debugPrefix, '✅ getProfile() successful with', response.data);
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
   * Updates the current user's profile with new data.
   * The method sends a PUT request with the updated user information and returns 
   * the updated profile data.
   *
   * @param {Object} userData - Updated user profile data
   * @param {string} userData.firstName - Updated first name
   * @param {string} userData.lastName - Updated last name
   * @returns {Promise<{user: Object}>} The updated user profile data
   * @throws {Error} Throws an error if profile update fails
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
