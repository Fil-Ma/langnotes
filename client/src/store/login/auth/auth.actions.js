import { createAsyncThunk } from "@reduxjs/toolkit";
import { isLoggedIn, login, register } from "../../../api/auth";

export const checkLoginStatus = createAsyncThunk(
  'auth/checkLogin',
  async () => {
    try {
      const response = await isLoggedIn();

      return {
        isAuthenticated: true,
        user: response.user
      }
    } catch(err) {
      throw err;
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {
    try {
      const response = await login(credentials);
      return {
        user: response,
        isAuthenticated: true
      }
    } catch(err) {
      throw err;
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials) => {
    try {
      await register(credentials);
      return {};
    } catch (err) {
      throw err;
    }
  }
);
