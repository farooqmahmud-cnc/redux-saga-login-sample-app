import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  user: null,
  token: null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { login, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;
