import { createSlice } from "@reduxjs/toolkit";
import { checkLoginStatus, loginUser, registerUser, logoutUser } from './auth.actions';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // check login status
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { isAuthenticated } = action.payload;
        state.isAuthenticated = isAuthenticated;
      })
      // login success
      .addCase(loginUser.fulfilled, (state, action) => {
        const { isAuthenticated } = action.payload;
        state.isAuthenticated = isAuthenticated;
      })
      // login failure
      .addCase(loginUser.rejected, (state, action) => {
        const { error } = action.payload;
        state.isAuthenticated = false;
        state.error = error;
      })
      // registration success
      .addCase(registerUser.fulfilled, (state, action) => {
        const { isAuthenticated } = action.payload;
        state.isAuthenticated = isAuthenticated;
      })
      // registration failure
      .addCase(registerUser.rejected, (state, action) => {
        const { error } = action.payload;
        state.isAuthenticated = false;
        state.error = error;
      })
      // logout success
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
      })
  }
});

export default authSlice.reducer;
