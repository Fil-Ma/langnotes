import { createSlice } from "@reduxjs/toolkit";
import { loadAllLessons, addLesson, updateLesson, deleteLesson } from "./lesson.actions";

const lessonSlice = createSlice({
  name: 'lesson',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAllLessons.fulfilled, (state, action) => {
        const { lessons } = action.payload; // object or array
        lessons.forEach(lesson => state[lesson.id] = {
          title: lesson.title,
          description: lesson.description,
          content: lesson.content,
          notebookId: lesson.notebookId
        })
      })
      .addCase(addLesson.fulfilled, (state, action) => {

      })
      .addCase(updateLesson.fulfilled, (state, action) => {

      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        
      })
  }
});

export default lessonSlice.reducer;
