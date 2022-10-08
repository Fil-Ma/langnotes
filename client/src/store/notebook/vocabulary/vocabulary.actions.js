import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadVocabularyData } from "../../../api/vocabulary";
import {
  addTermToVocabulary,
  updateVocabularyTerm,
  deleteVocabularyTerm } from "../../../api/terms";

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

export const updateTerm = createAsyncThunk(
  'vocabulary/updateTerm',
  async (data) => {
    try {
      const response = await updateVocabularyTerm(data);

      return response;

    } catch(err) {
      throw err;
    }
  }
);

export const deleteTerm = createAsyncThunk(
  'vocabulary/deleteTerm',
  async (termId) => {
    try {
      const response = await deleteVocabularyTerm(termId);

      return response;

    } catch(err) {
      throw err;
    }
  }
);
