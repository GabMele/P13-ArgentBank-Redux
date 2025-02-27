// src/store/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../services/authService';

// Login User
/*
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      console.log("✅ AuthThunkLogin response:", response); 

      const token = response.body?.token;

      if (token) {
        localStorage.setItem('token', token);
        console.log("✅ Token saved, fetching profile..."); // Debug

        // const profileResponse = await dispatch(fetchUserProfile()).unwrap();
        const profileResponse = await dispatch(fetchUserProfile());
        

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
*/

export const loginUser = createAsyncThunk(
  'user/login', // Update the slice name to match `user`
  async (credentials, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      console.log("✅ Thunk LOGIN authService response:", response);

      const token = response.body?.token;

      if (token) {
        localStorage.setItem('token', token);
        console.log("✅ Thunk Login->Fetch - Token saved in localStorage, checking if profile is in state...");

        const state = getState(); 
        if (!state.user.user) { 
          console.log("✅ Thunk Login->Fetch - User not found in state, Fetching profile...");
          const profileResponse = await dispatch(fetchUserProfile()).unwrap();
          console.log("✅ Thunk Login->Fetch - Profile fetched:", profileResponse);
          return { user: profileResponse.user };
        } else {
          console.log("⏩ Profile already exists in state, skipped fetch.");
          return { user: state.user.user };
        }


      }

      throw new Error('No token received');
    } catch (error) {
      console.error("❌ Login error:", error);
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
  async (_, { getState,rejectWithValue }) => {
    try {
      // Only fetch if we have a token but no user
      const state = getState();
      console.log("✅ Thunk FETCH - check Redux state:", state);
      if (state.user.user) {
        console.log(`⏩ FetchThunk: User already in state, 
          skipping profile fetch `, state.user.user);
        return { user: state.user.user };
      }

      const response = await authService.getProfile();

      console.log("✅ AuthThunk FETCH Profile response:", response);
      console.log("✅ AuthThunk FETCH Profile body:", response.body);

      return { user: response.body }; 
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return rejectWithValue(error.response?.data?.message || 'Erreur de chargement du profil');
    }
  }
);


/*
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    
    // ✅ If user already exists, avoid fetching again
    if (state.user.user) {
      console.log("🛑 Skipping fetchUserProfile: User already exists.");
      return rejectWithValue("User already exists.");
    }

    try {
      const response = await authService.getProfile();
      return response.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
*/


// Logout User
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  authService.logout();
  return null;
});
