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
        if (action.payload) {
          const { lessons } = action.payload;
          lessons.forEach(lesson => state.lessons = {
            ...state.lessons,
            [lesson.id]: {
              title: lesson.title,
              description: lesson.description,
              content: lesson.content,
              notebookId: lesson.notebook_id
            }
          })
        }
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
        state[lesson.id].title = lesson.title;
        state[lesson.id].description = lesson.description;
        state[lesson.id].content = lesson.content;
        state[lesson.id].notebookId = lesson.notebook_id;
      })
      // Delete lesson
      .addCase(deleteLesson.fulfilled, (state, action) => {
        const { id } = action.payload;
        const currentState = { ...state };
        delete currentState[id];
        state.lessons = currentState;
      })
  }
});

export default lessonSlice.reducer;
