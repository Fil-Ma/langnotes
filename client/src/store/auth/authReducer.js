import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isFetching: false,
    isAuthenticated: false,
    error: null
  },
  reducers: {},
  extraReducers: {}
})

export default authSlice.reducer;
