// src/store/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '@/services/authService';
import handleAuthStorage from '@/utils/handleAuthStorage';

const debugPrefix = 'authThunks -> ';

/**
 * This module contains asynchronous thunk actions for authentication 
 * (login, signup, profile fetching, updating, and logout) as well as 
 * utility function for managing authentication-related data in localStorage.
 * 
 * It uses Redux Toolkit's `createAsyncThunk` for handling asynchronous 
 * actions and error handling. Each action interacts with the `authService` 
 * to perform the necessary API calls for user authentication and profile management.
 * 
 * The following actions are available:
 * - loginUser: Logs in a user and stores the authentication token.
 * - signupUser: Registers a new user.
 * - fetchUserProfile: Fetches the current user's profile.
 * - updateUserProfile: Updates the user's profile.
 * - logoutUser: Logs out the user and clears the authentication data from storage.
 * 
 */

// ========================
// LOGIN THUNK
// ========================

/**
 * Asynchronous thunk action for logging in a user.
 * @function
 * @param {Object} credentials - User credentials for login.
 * @param {Object} param1 - Thunk API helpers.
 * @param {Function} param1.getState - Function to get the current Redux state.
 * @param {Function} param1.rejectWithValue - Function to reject the action with a specific value.
 * @returns {Promise<Object>} - The user's data and authentication token if successful.
 * @throws {Error} - If login fails or no token is received.
 */
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { getState, rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      console.debug(debugPrefix + '✅ LOGIN authService response OK');

      if (!response.token) throw new Error('No token received');

      // Prefer fresh user data from login response, 
      // but fall back to existing state if for some reason 
      // the response doesn't contain user data
      const user = response.user || getState().user.user;
      
      if (!user) {
        console.warn('Login successful but no user data received');
        // Optionally fetch profile here if needed
      }

      return { user, token: response.token };      

    } catch (error) {
      handleAuthStorage.clear();
      console.error(debugPrefix + '❌ LOGIN error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Login failed'
      );
    }
  }
);

// ========================
// SIGNUP THUNK
// ========================

/**
 * Asynchronous thunk action for registering a new user.
 * @function
 * @param {Object} userData - The data required for user registration.
 * @param {Object} param1 - Thunk API helpers.
 * @param {Function} param1.rejectWithValue - Function to reject the action with a specific value.
 * @returns {Promise<Object>} - The response body from the registration service.
 * @throws {Error} - If the registration fails.
 */
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.signup(userData);
      console.debug(debugPrefix + '✅ SIGNUP successful for:', userData.email);
      return response.body;
    } catch (error) {
      console.error(debugPrefix + '❌ SIGNUP error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

// ========================
// FETCH PROFILE THUNK
// ========================

/**
 * Asynchronous thunk action for fetching the user's profile.
 * @function
 * @param {undefined} _ - Unused parameter (required for consistency with `createAsyncThunk`).
 * @param {Object} param1 - Thunk API helpers.
 * @param {Function} param1.getState - Function to get the current Redux state.
 * @param {Function} param1.rejectWithValue - Function to reject the action with a specific value.
 * @returns {Promise<Object>} - The user's profile data.
 * @throws {Error} - If fetching the profile fails.
 */
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    const currentUser = getState().user.user;

    if (currentUser) {
      console.debug(`${debugPrefix}⏩ FetchProfile: user already in state`);
      return { user: currentUser };
    }

    try {
      const response = await authService.getProfile();
      console.debug(debugPrefix + '✅ FETCH PROFILE response:')
      return { user: response.body };
    } catch (error) {
      console.error(debugPrefix + "❌ FetchProfile error:", error);
      handleAuthStorage.clear();
      return rejectWithValue(
        error.response?.data?.message || 'Failed to load profile'
      );
    }
  }
);

// ========================
// UPDATE PROFILE THUNK
// ========================

/**
 * Asynchronous thunk action for updating the user's profile.
 * @function
 * @param {Object} userData - The updated user profile data.
 * @param {Object} param1 - Thunk API helpers.
 * @param {Function} param1.rejectWithValue - Function to reject the action with a specific value.
 * @returns {Promise<Object>} - The updated user profile response.
 * @throws {Error} - If updating the profile fails.
 */
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.updateProfile(userData);
      console.debug(debugPrefix + '✅ UPDATE PROFILE response OK');
      return response;
    } catch (error) {
      console.error(debugPrefix + '❌ UPDATE PROFILE error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Update failed'
      );
    }
  }
);

// ========================
// LOGOUT THUNK
// ========================

/**
 * Asynchronous thunk action for logging out the user.
 * @function
 * @returns {null} - No return value, as the user is logged out and storage is cleared.
 */
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    console.debug(debugPrefix + '▶ LOGOUT called');
    authService.logout();
    return null;
  }
);
