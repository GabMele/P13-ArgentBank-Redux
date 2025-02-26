// src/store/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../services/authService';

// Login User
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);

      console.log("✅ AuthThunkLogin response:", response); // Debug

      const token = response.body?.token;

      if (token) {
        localStorage.setItem('token', token);
        console.log("✅ Token saved, fetching profile..."); // Debug

        const profileResponse = await dispatch(fetchUserProfile()).unwrap();

        console.log("✅ Profile fetched:", profileResponse); // Debug

        return { user: profileResponse.user };
      }

      throw new Error('No token received');
    } catch (error) {
      console.error("❌ Login error:", error); // Debug
      return rejectWithValue(error.response?.data?.message || 'Erreur de connexion');
    }
  }
);



// Signup User
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.signup(userData);
      return response.body;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur d\'inscription');
    }
  }
);

// Fetch User Profile
/*
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getProfile();
      return response.body;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur de chargement du profil');
    }
  }
);
*/


export const fetchUserProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getProfile();

      console.log("✅ AuthThunkFetchProfile response:", response);
      console.log("✅ AuthThunkFetchProfile body:", response.body);

      return { user: response.body }; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur de chargement du profil');
    }
  }
);



// Logout User
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  authService.logout();
  return null;
});
