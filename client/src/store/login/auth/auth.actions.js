import { createAsyncThunk } from "@reduxjs/toolkit";
import { isLoggedIn, login, register, logout } from "../../../api/auth";

export const checkLoginStatus = createAsyncThunk(
  'auth/checkLogin',
  async () => {
    try {
      const response = await isLoggedIn();

      return {
        isAuthenticated: true,
        user: response.user,
        notebooks: response.notebooks
      }
    } catch(err) {
      throw err;
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {

    // check if password satisfies regex format
    if (!credentials.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/g)) {
      throw new Error("Password format is not valid");
    }

    try {
      const response = await login(credentials);

      if (response.message) {
        throw new Error(response.message);
      }

      return {
        user: response.user,
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

    // check if email satisfies regex format
    if (!credentials.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g)) {
      throw new Error("Email format is not valid");
    }

    // check if password satisfies regex format
    if (!credentials.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/g)) {
      throw new Error("Password format is not valid");
    }

    try {
      await register(credentials);
      return {};
    } catch (err) {
      throw err;
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    try {
      await logout();
      return;

    } catch(err) {
      throw err;
    }
  }
)
