import { createSlice } from "@reduxjs/toolkit";
import { loadAllLessons, addLesson, updateLesson, deleteLesson } from "./lesson.actions";

const lessonSlice = createSlice({
  name: 'lesson',
  initialState: {
    lessons: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load all lessons assigned to the current notebook
      .addCase(loadAllLessons.fulfilled, (state, action) => {
        const { lessons } = action.payload;
        // reset state before loading lessons
        state.lessons = {};
        // add lessons to state with id as key
        lessons.forEach(lesson => state.lessons = {
          ...state.lessons,
          [lesson.id]: {
            title: lesson.title,
            description: lesson.description,
            content: lesson.content,
            notebookId: lesson.notebook_id
          }
        });
      })
      // Add new lesson
      .addCase(addLesson.fulfilled, (state, action) => {
        const { lesson } = action.payload;
        state.lessons = {
          ...state.lessons,
          [lesson.id]: {
            title: lesson.title,
            description: lesson.description,
            content: lesson.content,
            notebookId: lesson.notebook_id
          }
        };
      })
      // Update lesson
      .addCase(updateLesson.fulfilled, (state, action) => {
        const { lesson } = action.payload;
        state.lessons[lesson.id].title = lesson.title;
        state.lessons[lesson.id].description = lesson.description;
        state.lessons[lesson.id].content = lesson.content;
      })
      // Delete lesson
      .addCase(deleteLesson.fulfilled, (state, action) => {
        const { id } = action.payload;
        const currentState = { ...state.lessons };
        delete currentState[id];
        state.lessons = currentState;
      })
  }
});

export default lessonSlice.reducer;
