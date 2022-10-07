import { createSlice } from "@reduxjs/toolkit";
import { addNotebook } from "../../login/user/user.actions";
import { addNewTerm, loadVocabulary, updateTerm, deleteTerm } from "./vocabulary.actions";

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

        // sort terms in alphabetical order
        terms.sort((a, b) => {
          if ( a.content < b.content ){
            return -1;
          }
          if ( a.content > b.content ){
            return 1;
          }
          return 0;
        });
        state.terms = terms;
      })
      .addCase(addNewTerm.fulfilled, (state, action) => {
        const { term } = action.payload;
        state.terms.push(term);
      })
      .addCase(updateTerm.fulfilled, (state, action) => {
        const { term } = action.payload;
        const termToUpdateIndex = state.terms.findIndex(element => element.id === term.id);
        state.terms[termToUpdateIndex].content = term.content;
        state.terms[termToUpdateIndex].definition = term.definition;
      })
      .addCase(deleteTerm.fulfilled, (state, action) => {
        const { id } = action.payload;
        const termToDeleteIndex = state.terms.findIndex(element => element.id === term.id);
        // remove the element at index termToDeleteIndex
        state.terms.splice(termToDeleteIndex, 1);
      })
  }
});

export default vocabularySlice.reducer;
