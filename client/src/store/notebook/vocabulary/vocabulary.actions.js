import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTermToVocabulary, loadVocabularyData } from "../../../api/vocabulary";

export const loadVocabulary = createAsyncThunk(
  'vocabulary/loadVocabulary',
  async (notebookId) => {
    try {
      const response = await loadVocabularyData(notebookId);

      return response;

    } catch(err) {
      throw err;
    }
  }
);

export const addNewTerm = createAsyncThunk(
  'vocabulary/addNewTerm',
  async (data) => {
    try {
      const response = await addTermToVocabulary(data);

      return response;

    } catch(err) {
      throw err;
    }
  }
);
