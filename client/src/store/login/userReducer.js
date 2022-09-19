import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: "",
    name: ""
  },
  reducers: {},
  extraReducers: {}
})

export default userSlice.reducer;
