import { createSlice } from "@reduxjs/toolkit";

const lessonSlice = createSlice({
  name: 'lesson',
  initialState: {
    id: {
      name: "",
      notebookId: "",
      content: "",
      example: ""
    }
  },
  reducers: {},
  extraReducers: {}
});

export default lessonSlice.reducer;
