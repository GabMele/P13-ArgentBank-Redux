// src/store/store.js

/**
 * @file store.js
 * 
 * This file configures the Redux store for the application using Redux Toolkit's 
 * `configureStore` function. The store serves as the central hub for managing the 
 * global state of the application.
 * 
 * Key Features:
 * - Configures the root reducer with slices for different parts of the state.
 * - Enables Redux DevTools in non-production environments for debugging purposes.
 * 
 */

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authSlice';

/**
 * Configures and exports the Redux store for the application.
 * 
 * @type {Object} - The Redux store instance.
 */
export const store = configureStore({
  /**
   * Root reducer combining all feature-specific reducers.
   * @property {Function} user - Reducer for managing authentication-related state.
   */
  reducer: {
    user: userReducer,
  },
  /**
   * Enables Redux DevTools for debugging in non-production environments.
   * Automatically disabled in production for performance and security reasons.
   */
  devTools: import.meta.env.MODE !== 'production', // Compatible with Vite
});
