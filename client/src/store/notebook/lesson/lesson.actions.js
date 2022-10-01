import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadAllLessonsByNotebookId, addNewLesson, updateLessonData, deleteLessonById } from "../../../api/lesson";

export const loadAllLessons = createAsyncThunk(
  'lesson/loadAllLessons',
  async (notebookId) => {
    try {
      const response = await loadAllLessonsByNotebookId(notebookId);

      if (!response) {
        return;
      }

      return response;

    } catch(err) {
      throw err;
    }
  }
);

export const addLesson = createAsyncThunk(
  'lesson/addLesson',
  async (data) => {
    try {
      const response = await addNewLesson(data);

      return response;

    } catch(err) {
      throw err;
    }
  }
);

export const updateLesson = createAsyncThunk(
  'lesson/updateLesson',
  async (data) => {
    try {
      const response = await updateLessonData(data);

      return response;

    } catch(err) {
      throw err;
    }
  }
);

export const deleteLesson = createAsyncThunk(
  'lesson/deleteLesson',
  async (lessonId) => {
    try {
      const response = await deleteLessonById(lessonId);

      return response;

    } catch(err) {
      throw err;
    }
  }
);
