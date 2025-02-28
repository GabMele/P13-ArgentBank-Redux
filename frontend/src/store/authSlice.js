// src/store/authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { loginUser, signupUser, 
  fetchUserProfile, updateUserProfile, logoutUser } from './authThunks';

const initialState = {
  //user: JSON.parse(localStorage.getItem('user')) || null,
  user: null,
  token: localStorage.getItem('token') || null,
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


    /*
    const handleFulfilled = (state, action) => {
      state.loading = false;
      //state.user = action.payload;
      if (action.meta.arg && action.meta.arg.email) {
        // 🔥 Cas de login : on reçoit { token, user }
        state.token = action.payload.token;
        state.user = action.payload.user; // On stocke juste `user`
      } else {
        // 🔥 Cas de fetchUserProfile : on reçoit juste `user`
        state.user = action.payload.user ?? action.payload; 
      }
    };
    */


    /*
    const handleFulfilled = (state, action) => {
      state.loading = false;
      state.user = action.payload.user; 
      state.token = action.payload.token; 

      console.log("✅ AuthSlice Fulfilled response:", action.payload);
      console.log("✅ AuthSlice Fulfilled state:", state);
      console.log("✅ AuthSlice Fulfilled action:", action);

    };
    */

    /*
    const handleFulfilled = (state, action) => {
      state.loading = false;
      
      // Check if we have the expected data structure
      if (action.payload) {
        // If user data exists in payload, update the state
        if (action.payload.user) {
          state.user = action.payload.user;
        }
        
        // If token exists in payload, update the state
        if (action.payload.token) {
          state.token = action.payload.token;
        }
      }
    };
*/

/*
const handleFulfilled = (state, action) => {
  state.loading = false;
  
  console.log("✅ AuthSlice Fulfilled response action.payload:", action.payload);
  // Check if we have the expected data structure
  if (action.payload) {
    // If user data exists in payload, update the state
    if (action.payload.user) {
      state.user = action.payload.user;
    }
    
    // If token exists in payload, update the state
    if (action.payload.token) {
      state.token = action.payload.token;
    }
  }
};
*/

const handleFulfilled = (state, action) => {
  state.loading = false;
  
  console.log("✅ AuthSlice Fulfilled response action:", action);
  console.log("✅ AuthSlice Fulfilled response action.TYPE:", action.type);
  console.log("✅ AuthSlice Fulfilled response action.payload:", action.payload);
  console.log("✅ AuthSlice Fulfilled check state.user :", state.user);
  //console.log("✅ AuthSlice Fulfilled check state.user.email :", state.user.email);
  // Check if we have the expected data structure
  //if (action.payload) {
    // If user data exists in payload, update the state
    /*
    if (action.payload.user) {
      state.user = action.payload.user;
    }
*/
/*
    //if (action.payload.user && action.payload.user.email !== state.user?.email) {
      //state.user = action.payload.user;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      console.log("✅ AuthSlice Fulfilled + STATE UPDATING, action.payload:", action.payload);
      console.log("✅ AuthSlice Fulfilled + STATE UPDATED! state.user:", state.user);
    //}
*/

  //if (action.payload.user) {
      state.user = action.payload.user;
      //state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      console.log("✅ AuthSlice Fulfilled + STATE UPDATING, action.payload:", action.payload);
      console.log("✅ AuthSlice Fulfilled + STATE UPDATED! state.user:", state.user);
    //}

        
    /*
    if (action.payload.token && action.payload.token !== state.token) {
      console.log("✅ AuthSlice Fulfilled TOKEN STATE UPDATE response action.payload.token:", action.payload.token);
      state.token = action.payload.token;
    }
    */
   
    if (action.payload.token && action.payload.token !== state.token) {
      console.log("✅ AuthSlice Fulfilled action:", action.payload);
      console.log("✅ AuthSlice Fulfilled Redux STATE UPDATED! state.token:", state);
      state.token = action.payload.token;
    }



  //}
};


    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log("✅ AuthSlice Rejected STATE UPDATED! action.payload:", action.payload);
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
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      });
  },
});

export default authSlice.reducer;