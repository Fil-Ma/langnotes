import { createSlice } from "@reduxjs/toolkit";
import { addNotebook } from "../../login/user/user.actions";
import { addNewTerm, loadVocabulary } from "./vocabulary.actions";

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState: {
    id: "",
    language: "",
    terms: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNotebook.fulfilled, (state, action) => {
        const { vocabulary } = action.payload;
        state.id = vocabulary.id;
        state.language = vocabulary.language;
      })
      .addCase(loadVocabulary.fulfilled, (state, action) => {
        const { vocabulary, terms } = action.payload;
        state.id = vocabulary.id;
        state.language = vocabulary.language;
        state.terms = terms;
      })
      .addCase(addNewTerm.fulfilled, (state, action) => {
        const { term } = action.payload;
        state.terms.push(term);
      })
  }
});

export default vocabularySlice.reducer;
