import { createSlice } from "@reduxjs/toolkit";

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState: {
    id: {
      content: "",
      description: "",
      type: ""
    }
  },
  reducers: {},
  extraReducers: {}
});

export default vocabularySlice.reducer;
