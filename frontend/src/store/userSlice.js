import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userProfile: null,
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.userProfile = action.payload;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
    },
  },
});

export const { loginSuccess, loginFailure, setLoading } = userSlice.actions;
export default userSlice.reducer;
