// src/store/authSlice.js

/**
 * @file authSlice.js
 * 
 * This file defines the Redux slice for managing authentication-related state.
 * It handles user data, authentication tokens, loading states, and error messages.
 * The slice integrates with asynchronous thunk actions to perform login, signup,
 * profile fetching, updating, and logout operations.
 * 
 * Key Features:
 * - Manages `user`, `token`, `loading`, and `error` states.
 * - Handles pending, fulfilled, and rejected states for async actions.
 * - Persists authentication data in localStorage via `handleAuthStorage`.
 */

import { createSlice } from '@reduxjs/toolkit';
import { loginUser, signupUser, fetchUserProfile, updateUserProfile, logoutUser } 
  from './authThunks';
import handleAuthStorage from '../utils/handleAuthStorage';

/**
 * Initial state for the authentication slice.
 * @typedef {Object} AuthState
 * @property {Object|null} user - The current user's profile data or null.
 * @property {string|null} token - The authentication token or null.
 * @property {boolean} loading - Indicates if an auth operation is in progress.
 * @property {string|null} error - Error message for failed operations or null.
 */

/**
 * Initial state for the auth slice.
 * @type {AuthState}
 */
const initialState = {
  user: null,
  token: handleAuthStorage.getToken() || null,
  loading: false,
  error: null,
};

/**
 * Redux slice for managing authentication state.
 * @namespace authSlice
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * Handles the pending state of async actions.
     * Sets `loading` to true and clears previous errors.
     * @param {AuthState} state - The current state of the auth slice.
     */
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };

    /**
     * Handles the fulfilled state of async actions.
     * Updates `user` and `token` based on the action payload.
     * @param {AuthState} state - The current state of the auth slice.
     * @param {Object} action - The action object containing the payload.
     */
    const handleFulfilled = (state, action) => {
      state.loading = false;

      console.debug("✅ AuthSlice Fulfilled action object:", {
        actionType: action.type,
        actionPayloadUser: action.payload.user,
        stateUser: state.user,
        stateUserEmail: state.user?.email,
      });

      // Update user state if present in the payload
      if (action.payload?.user) {
        console.debug("✅ AuthSlice Fulfilled -> STATE user update:",
          action.payload.user);
        state.user = action.payload.user;

        // Persist user data in localStorage
        handleAuthStorage.set({
          token: action.payload.token,
          user: action.payload.user,
        });
      }

      // Update token state if it differs from the current token
      if (action.payload?.token && action.payload.token !== state.token) {
        state.token = action.payload.token;
        console.debug("✅ AuthSlice Fulfilled -> STATE token update OK");
      }
    };

    /**
     * Handles the rejected state of async actions.
     * Sets `loading` to false and updates the `error` state.
     * @param {AuthState} state - The current state of the auth slice.
     * @param {Object} action - The action object containing the error payload.
     */
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;

      console.debug("❌ AuthSlice Rejected, state.error UPDATED - action.payload:",
        action.payload);
    };

    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleFulfilled)
      .addCase(loginUser.rejected, handleRejected)

      .addCase(signupUser.pending, handlePending)
      .addCase(signupUser.fulfilled, handleFulfilled)
      .addCase(signupUser.rejected, handleRejected)

      .addCase(fetchUserProfile.pending, handlePending)
      .addCase(fetchUserProfile.fulfilled, handleFulfilled)
      .addCase(fetchUserProfile.rejected, handleRejected)

      .addCase(updateUserProfile.pending, handlePending)
      .addCase(updateUserProfile.fulfilled, handleFulfilled)
      .addCase(updateUserProfile.rejected, handleRejected)

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        handleAuthStorage.clear();
        console.debug("✅ AuthSlice LOGOUT - User logged out, auth data cleared.");
      });
  },
});

export default authSlice.reducer;