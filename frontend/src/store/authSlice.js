// src/store/authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { loginUser, signupUser, 
  fetchUserProfile, updateUserProfile, logoutUser } from './authThunks';
import handleAuthStorage from '../utils/handleAuthStorage';

const initialState = {
  user: handleAuthStorage.getUser() || null,
  token: handleAuthStorage.getToken() || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };


const handleFulfilled = (state, action) => {
  state.loading = false; 
  
  console.debug("✅ AuthSlice Fulfilled action object:",
    { actionType: action.type, 
      actionPayloadUser: action.payload.user, 
      stateUser: state.user, 
      stateUserEmail: state.user?.email
    });
 
  // Handle user
  if (action.payload?.user) {
    console.debug("✅ AuthSlice Fulfilled -> STATE user update:", action.payload.user);
    state.user = action.payload.user;
    
    // handleAuthStorage.set({
    //   token: action.payload.token, 
    //   user: action.payload.user
    // });
  }

  // Handle token
  if (action.payload?.token && action.payload.token !== state.token) {
    state.token = action.payload.token;
    console.debug("✅ AuthSlice Fulfilled -> STATE token update OK");
  }
};


    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.debug("AuthSlice Rejected, state.error UPDATED - action.payload:", action.payload);
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
      });
  },
});

export default authSlice.reducer;