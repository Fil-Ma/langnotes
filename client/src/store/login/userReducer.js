import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: "",
    name: "",
    notebooks: {
      id: {
        name: "",
        language: ""
      }
    }
  },
  reducers: {},
  extraReducers: {}
})

export default userSlice.reducer;
