// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: import.meta.env.MODE !== 'production', // Compatible Vite
});

