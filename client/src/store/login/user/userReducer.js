import { createSlice } from "@reduxjs/toolkit";

import { checkLoginStatus, loginUser } from '../auth/auth.actions';


const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: "",
    email: "",
    notebooks: {

    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Configure state in case of login
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.id = user.id;
        state.email = user.email;
      })
      // Configure state in case of check of login status
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { user, notebooks } = action.payload;
        state.id = user.id;
        state.email = user.email;
        state.notebooks = notebooks;
      })
  }
})

export default userSlice.reducer;
